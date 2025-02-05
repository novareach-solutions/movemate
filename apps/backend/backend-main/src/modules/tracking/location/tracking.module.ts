import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { RedisModule } from "@nestjs-modules/ioredis";

import { LiveTrackingGateway } from "../../../shared/gateways";
import { OnboardingGuard } from "../../../shared/guards/onboarding.guard";
import { AuthModule } from "../../auth/auth.module";
import { LocationController } from "./location.controller";
import { LocationService } from "./location.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    RedisModule.forRoot({
      type: "single",
      url: "redis://localhost:6379",
    }),
  ],
  controllers: [LocationController],
  providers: [LocationService, OnboardingGuard, LiveTrackingGateway],
  exports: [LocationService],
})
export class TrackingModule {}
