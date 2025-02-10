import { Controller, Get, Param, NotFoundException } from "@nestjs/common";
import { OrderChatService } from "./orderChat.service";

@Controller("order-chat")
export class OrderChatController {
  constructor(private readonly orderChatService: OrderChatService) {}

  @Get(":orderId/messages")
  async getOrderMessages(@Param("orderId") orderId: number) {
    const messages = await this.orderChatService.getMessages(orderId);
    if (!messages) {
      throw new NotFoundException("No messages found for this order");
    }
    return messages;
  }
}
