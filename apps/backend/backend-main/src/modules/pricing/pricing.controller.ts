import { Body, Controller, Post, UseGuards } from "@nestjs/common";

import { Roles } from "../../shared/decorators/roles.decorator";
import { UserRoleEnum } from "../../shared/enums";
import { AuthGuard } from "../../shared/guards/auth.guard";
import { RoleGuard } from "../../shared/guards/roles.guard";
import { IApiResponse } from "../../shared/interface";
import { PricingService } from "./pricing.service";
import { TFareCalculation } from "./pricing.type";

@Controller("pricing")
@UseGuards(AuthGuard, RoleGuard)
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Post("calculate")
  @Roles(UserRoleEnum.CUSTOMER, UserRoleEnum.AGENT, UserRoleEnum.ADMIN)
  calculateFare(@Body() body: TFareCalculation): IApiResponse<string> {
    const fare = this.pricingService.calculateFare(body);
    return {
      success: true,
      message: "All agents retrieved successfully.",
      data: `${fare.toFixed(2)}`,
    };
  }
}
