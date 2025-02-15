import { Injectable, NotFoundException } from "@nestjs/common";

import { OrderChatMessage } from "../../entity/OrderChatMessage";
import { SendPackageOrder } from "../../entity/SendPackageOrder";
import { User } from "../../entity/User";
import { dbReadRepo, dbRepo } from "../database/database.service";

export interface IOrderChatMessageInput {
  content: string;
  orderId: number;
  senderId: number;
  type?: string;
}

@Injectable()
export class OrderChatService {
  async addMessage(input: IOrderChatMessageInput): Promise<OrderChatMessage> {
    const order = await dbReadRepo(SendPackageOrder).findOne({
      where: { id: input.orderId },
    });
    if (!order) {
      throw new NotFoundException("Order not found");
    }

    const message = new OrderChatMessage();
    message.order = order;
    message.sender = { id: input.senderId } as User;
    message.content = input.content;
    message.type = input.type || "TEXT";

    return await dbRepo(OrderChatMessage).save(message);
  }

  async getMessages(orderId: number): Promise<OrderChatMessage[]> {
    const order = await dbRepo(SendPackageOrder).findOne({
      where: { id: orderId },
    });
    if (!order) {
      throw new NotFoundException("Order not found");
    }

    return await dbRepo(OrderChatMessage)
      .createQueryBuilder("message")
      .where("message.orderId = :orderId", { orderId })
      .orderBy("message.createdAt", "ASC")
      .getMany();
  }
}
