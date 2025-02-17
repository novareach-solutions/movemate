import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";

import { Roles } from "../../shared/decorators/roles.decorator";
import { UserRoleEnum } from "../../shared/enums";
import { AuthGuard } from "../../shared/guards/auth.guard";
import { RoleGuard } from "../../shared/guards/roles.guard";
import { IApiResponse, ICustomRequest } from "../../shared/interface";
import {
  TCreatePaymentIntentRequest,
  TPayment,
  TPaymentIntentResponse,
  TPaymentStatus,
  TRefundRequest,
  TRefundResponse,
} from "../../shared/types/payment.types";
import { PaymentService } from "./payment.service";
import { StripeService } from "./stripe.service";

// Customer Payment Specific Types

@Controller("payments")
@UseGuards(AuthGuard, RoleGuard)
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly stripeService: StripeService,
  ) {}

  @Post("create-intent")
  @Roles(UserRoleEnum.CUSTOMER)
  async createPaymentIntent(
    @Body() data: TCreatePaymentIntentRequest,
  ): Promise<IApiResponse<TPaymentIntentResponse>> {
    const result = await this.stripeService.createPaymentIntent(data);
    return {
      success: true,
      message: "Payment intent created successfully",
      data: {
        clientSecret: result.client_secret,
        paymentIntentId: result.id,
        amount: result.amount,
        currency: result.currency,
        status: result.status,
      },
    };
  }

  @Get("history")
  @Roles(UserRoleEnum.CUSTOMER)
  async getPaymentHistory(
    @Req() request: ICustomRequest,
  ): Promise<IApiResponse<TPayment[]>> {
    const payments = await this.paymentService.getCustomerPayments(
      request.user.id,
    );
    return {
      success: true,
      message: "Payment history retrieved successfully",
      data: payments,
    };
  }

  @Get(":paymentId/status")
  @Roles(UserRoleEnum.CUSTOMER)
  async getPaymentStatus(
    @Param("paymentId") paymentId: string,
  ): Promise<IApiResponse<TPaymentStatus>> {
    const status = await this.paymentService.getPaymentStatus(paymentId);
    return {
      success: true,
      message: "Payment status retrieved successfully",
      data: status,
    };
  }

  @Post(":paymentId/refund")
  @Roles(UserRoleEnum.CUSTOMER)
  async requestRefund(
    @Param("paymentId") paymentId: string,
    @Body() data: TRefundRequest,
  ): Promise<IApiResponse<TRefundResponse>> {
    const refund = await this.paymentService.requestRefund(paymentId, data);
    return {
      success: true,
      message: "Refund requested successfully",
      data: refund,
    };
  }
}
