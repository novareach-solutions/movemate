import { Module } from "@nestjs/common";

import {
  AgentNotificationGateway,
  CustomerNotificationGateway,
} from "../../shared/gateways";
import { ChatSupportGateway } from "../../shared/gateways/chat.support.gateway";
import { OrderChatGateway } from "../../shared/gateways/orderChat.gateway";
import { OrderChatModule } from "../orderChat/orderChat.module";
import { NotificationService } from "../support/notification.service";
import { SupportService } from "../support/support.service";

@Module({
  imports: [OrderChatModule],
  providers: [
    AgentNotificationGateway,
    ChatSupportGateway,
    CustomerNotificationGateway,
    SupportService,
    NotificationService,
    OrderChatGateway,
  ],
  exports: [ChatSupportGateway, CustomerNotificationGateway, OrderChatGateway],
})
export class GatewayModule {}
