import { Controller, Req, Sse, UseGuards } from "@nestjs/common";

import { AuthGuard } from "../../shared/guards/auth.guard";
import { NotificationService } from "./notification.service";

@Controller("notifications")
@UseGuards(AuthGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Sse("events")
  async subscribeToEvents(@Req() request: any): Promise<void> {
    const userId = request.user.id;
    await this.notificationService.createSSEConnection(userId, request.res);
  }
}
