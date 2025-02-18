import { Body, Controller, Logger, Param, Post, Sse } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Observable } from "rxjs";

import { NotificationService } from "./notification.service";
import { IServerSentEvent } from "./types/notification.interface";

@Controller("notifications")
// @UseGuards(AuthGuard)
// @Roles(UserRoleEnum.CUSTOMER)
@ApiTags("Notifications")
export class NotificationController {
  private readonly logger = new Logger(NotificationController.name);

  constructor(private readonly notificationService: NotificationService) {}

  @Sse("events/:userId")
  async subscribeToEvents(
    @Param("userId") userId: number,
  ): Promise<Observable<IServerSentEvent>> {
    this.logger.debug(`Subscribing to events for user ${userId}`);
    return await this.notificationService.createSSEConnection(userId);
  }

  // Test endpoints
  @Post("test/order-accepted")
  // @Roles(UserRoleEnum.ADMIN)
  async testOrderAccepted(
    @Body() data: { customerId: number; orderId: number; agentId: number },
  ): Promise<{ success: boolean; message: string }> {
    const mockOrder = {
      id: data.orderId,
      customerId: data.customerId,
      agentId: data.agentId,
      status: "ACCEPTED",
    };

    await this.notificationService.notifyOrderAccepted(mockOrder as any);
    return { success: true, message: "Test notification sent" };
  }

  @Post("test/order-completed")
  // @Roles(UserRoleEnum.ADMIN)
  async testOrderCompleted(
    @Body() data: { customerId: number; orderId: number },
  ): Promise<{ success: boolean; message: string }> {
    const mockOrder = {
      id: data.orderId,
      customerId: data.customerId,
      status: "COMPLETED",
    };

    await this.notificationService.notifyOrderCompleted(mockOrder as any);
    return { success: true, message: "Test notification sent" };
  }

  @Post("test/order-cancelled")
  // @Roles(UserRoleEnum.ADMIN)
  async testOrderCancelled(
    @Body()
    data: {
      customerId: number;
      orderId: number;
      reason: string;
      canceledBy: string;
    },
  ): Promise<{ success: boolean; message: string }> {
    const mockOrder = {
      id: data.orderId,
      customerId: data.customerId,
      status: "CANCELLED",
      canceledBy: data.canceledBy,
      cancellationReason: data.reason,
    };

    await this.notificationService.notifyOrderCancelled(mockOrder as any);
    return { success: true, message: "Test notification sent" };
  }
}
