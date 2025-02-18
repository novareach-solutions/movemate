import { Module } from "@nestjs/common";

import { OrderChatGateway } from "../../shared/gateways/orderChat.gateway";
import { OrderChatController } from "./orderChat.controller";
import { OrderChatService } from "./orderChat.service";

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
