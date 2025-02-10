import { Module } from "@nestjs/common";
import { OrderChatService } from "./orderChat.service";
import { OrderChatController } from "./orderChat.controller";
import { OrderChatGateway } from "../../shared/gateways/orderChat.gateway";

@Module({
  controllers: [OrderChatController],
  providers: [
    {
      provide: OrderChatGateway,
      useClass: OrderChatGateway,
    },
    OrderChatService,
  ],
  exports: [OrderChatService, OrderChatGateway],
})
export class OrderChatModule {}
