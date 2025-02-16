import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { finalize, Observable, Subject } from "rxjs";

import { Notification } from "../../entity/Notification";
import { SendPackageOrder } from "../../entity/SendPackageOrder";
import { User } from "../../entity/User";
import { dbRepo } from "../database/database.service";
import {
  INotificationEvent,
  IServerSentEvent,
  NotificationTypeEnum,
} from "./types/notification.interface";

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);
  private clients: Map<number, Subject<IServerSentEvent>> = new Map();

  async createSSEConnection(
    userId: number,
  ): Promise<Observable<IServerSentEvent>> {
    // Clean up any existing connection
    const existingSubject = this.clients.get(userId);
    if (existingSubject) {
      existingSubject.complete();
      this.clients.delete(userId);
    }

    // Create new subject
    const subject = new Subject<IServerSentEvent>();
    this.clients.set(userId, subject);

    // Send initial connection success
    const connectionEvent = this.createMessageEvent({
      type: NotificationTypeEnum.CONNECTION,
      data: { message: "Connected to notification service" },
      timestamp: new Date(),
      userId,
      read: true,
    });

    subject.next(connectionEvent);

    // Fetch and send unread notifications
    const unreadNotifications = await dbRepo(Notification).find({
      where: {
        userId,
        read: false,
      },
      order: {
        createdAt: "DESC",
      },
    });

    this.logger.debug("Unread notifications", unreadNotifications);

    for (const notification of unreadNotifications) {
      const event: INotificationEvent = {
        id: notification.id,
        type: notification.type,
        data: notification.data,
        timestamp: notification.createdAt,
        userId: notification.userId,
        read: false,
      };

      const messageEvent = this.createMessageEvent(event);
      subject.next(messageEvent);

      // Mark as read
      await dbRepo(Notification).update(
        { id: notification.id },
        { read: true },
      );
    }

    this.logger.debug(
      `SSE connection established for user ${userId} with ${unreadNotifications.length} unread notifications`,
    );

    return subject.asObservable().pipe(
      finalize(() => {
        this.logger.debug(`SSE connection closed for user ${userId}`);
        this.clients.delete(userId);
      }),
    );
  }

  async notifyOrderAccepted(order: SendPackageOrder): Promise<void> {
    const event: INotificationEvent = {
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
    this.logger.debug("Sending notification", event);
    await this.sendNotification(event);
  }

  async notifyOrderCancelled(order: SendPackageOrder): Promise<void> {
    const event: INotificationEvent = {
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

  private async sendNotification(event: INotificationEvent): Promise<void> {
    // Store notification in database
    await this.persistNotification(event);

    // Send through SSE
    const subject = this.clients.get(event.userId);
    if (subject) {
      const messageEvent = this.createMessageEvent(event);
      subject.next(messageEvent);
    }
  }

  private createMessageEvent(event: INotificationEvent): IServerSentEvent {
    this.logger.debug("Creating message event", event);
    return {
      data: JSON.stringify(event),
      id: event.id?.toString(),
      type: event.type,
    };
  }

  private async persistNotification(event: INotificationEvent): Promise<void> {
    // Check if user exists
    const user = await dbRepo(User).findOne({
      where: { id: event.userId },
    });

    if (!user) {
      this.logger.error(`User with ID ${event.userId} not found`);
      throw new NotFoundException(`User with ID ${event.userId} not found`);
    }

    await dbRepo(Notification).save({
      userId: event.userId,
      type: event.type,
      data: event.data,
      read: false,
    });
  }
}
