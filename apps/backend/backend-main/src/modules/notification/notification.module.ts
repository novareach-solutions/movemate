import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { CustomerNotificationGateway } from "../../shared/gateways";
import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";

@Module({
  imports: [ConfigModule],
  providers: [NotificationService, CustomerNotificationGateway],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}
