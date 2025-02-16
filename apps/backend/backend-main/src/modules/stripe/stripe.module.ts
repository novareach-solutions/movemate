import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";
import { StripeController } from "./stripe.controller";
import { StripeService } from "./stripe.service";

@Module({
  imports: [ConfigModule],
  controllers: [StripeController, PaymentController],
  providers: [StripeService, PaymentService, JwtService],
  exports: [StripeService],
})
export class StripeModule {}
