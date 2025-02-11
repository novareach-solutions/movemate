import { Controller, Req, Res, Sse, UseGuards } from "@nestjs/common";
import { Response } from "express";

import { AuthGuard } from "../../shared/guards/auth.guard";
import { NotificationService } from "./notification.service";
import { ICustomRequest } from "../../shared/interface";
import { UserRoleEnum } from "../../shared/enums";
import { Roles } from "../../shared/decorators/roles.decorator";

@Controller("notifications")
@UseGuards(AuthGuard)
@Roles(UserRoleEnum.CUSTOMER)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Sse("events")
  async subscribeToEvents(
    @Req() request: ICustomRequest,
    @Res() response: Response
  ): Promise<void> {
    const userId = request.user.id;
    await this.notificationService.createSSEConnection(userId, response);
  }
}
