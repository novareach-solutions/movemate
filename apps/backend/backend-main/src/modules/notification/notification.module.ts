import { Module } from "@nestjs/common";

import { CustomerNotificationGateway } from "../../shared/gateways/customer.notification.gateway";
import { NotificationService } from "./notification.service";

@Module({
  providers: [NotificationService, CustomerNotificationGateway],
  exports: [NotificationService],
})
export class NotificationModule {}
