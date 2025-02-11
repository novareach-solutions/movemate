import { Injectable, Logger } from "@nestjs/common";
import { Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { Notification } from "../../entity/Notification";
import { SendPackageOrder } from "../../entity/SendPackageOrder";
import { CustomerNotificationGateway } from "../../shared/gateways/customer.notification.gateway";
import { dbRepo } from "../database/database.service";
import {
  INotificationEvent,
  ISSEClient,
  NotificationTypeEnum,
} from "./types/notification.interface";

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);
  private clients: Map<number, ISSEClient[]> = new Map();

  constructor(
    private readonly customerNotificationGateway: CustomerNotificationGateway,
  ) {}

  // Public methods first
  createSSEConnection(userId: number, response: Response): void {
    const client: ISSEClient = {
      id: uuidv4(),
      userId,
      response,
    };

    if (!this.clients.has(userId)) {
      this.clients.set(userId, []);
    }
    this.clients.get(userId).push(client);

    this.setupSSEConnection(client);
    this.logger.debug(`SSE connection established for user ${userId}`);
  }

  async notifyOrderAccepted(order: SendPackageOrder): Promise<void> {
    const event: INotificationEvent = {
      id: uuidv4(),
      type: NotificationTypeEnum.ORDER_ACCEPTED,
      data: {
        orderId: order.id,
        agentId: order.agentId,
        status: order.status,
        message: `Your order has been accepted by Agent ID ${order.agentId}.`,
      },
      timestamp: new Date(),
      userId: order.customerId,
      read: false,
    };

    await this.sendNotification(event);
  }

  async notifyOrderCancelled(order: SendPackageOrder): Promise<void> {
    const event: INotificationEvent = {
      id: uuidv4(),
      type: NotificationTypeEnum.ORDER_CANCELLED,
      data: {
        orderId: order.id,
        status: order.status,
        canceledBy: order.canceledBy,
        reason: order.cancellationReason,
        message: `Your order has been cancelled. Reason: ${order.cancellationReason}`,
      },
      timestamp: new Date(),
      userId: order.customerId,
      read: false,
    };

    await this.sendNotification(event);
  }

  async notifyOrderCompleted(order: SendPackageOrder): Promise<void> {
    const event: INotificationEvent = {
      id: uuidv4(),
      type: NotificationTypeEnum.ORDER_COMPLETED,
      data: {
        orderId: order.id,
        status: order.status,
        message: "Your order has been completed successfully.",
      },
      timestamp: new Date(),
      userId: order.customerId,
      read: false,
    };

    await this.sendNotification(event);
  }

  // Private methods last
  private setupSSEConnection(client: ISSEClient): void {
    const { response } = client;

    response.writeHead(200, {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache",
    });

    // Send initial connection success
    this.sendSSEEvent(client, {
      id: uuidv4(),
      type: NotificationTypeEnum.CONNECTION,
      data: { message: "Connected to notification service" },
      timestamp: new Date(),
      userId: client.userId,
      read: true,
    });

    // Handle client disconnect
    response.on("close", () => {
      this.removeClient(client);
      this.logger.debug(`Client ${client.id} disconnected`);
    });
  }

  private removeClient(client: ISSEClient): void {
    const userClients = this.clients.get(client.userId) || [];
    const updatedClients = userClients.filter((c) => c.id !== client.id);

    if (updatedClients.length === 0) {
      this.clients.delete(client.userId);
    } else {
      this.clients.set(client.userId, updatedClients);
    }
  }

  private async sendNotification(event: INotificationEvent): Promise<void> {
    // Store notification in database
    await this.persistNotification(event);

    // Send through WebSocket
    this.customerNotificationGateway.sendMessageToClient(
      event.userId.toString(),
      event.type,
      event.data,
    );

    // Send through SSE
    const userClients = this.clients.get(event.userId) || [];
    userClients.forEach((client) => this.sendSSEEvent(client, event));
  }

  private sendSSEEvent(client: ISSEClient, event: INotificationEvent): void {
    const sseData = `data: ${JSON.stringify(event)}\n\n`;
    client.response.write(sseData);
  }

  private async persistNotification(event: INotificationEvent): Promise<void> {
    await dbRepo(Notification).save({
      userId: event.userId,
      type: event.type,
      data: event.data,
      read: false,
    });
  }
}
