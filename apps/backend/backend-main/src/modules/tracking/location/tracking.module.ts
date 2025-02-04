import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { OnboardingGuard } from "../../../shared/guards/onboarding.guard";
import { AuthModule } from "../../auth/auth.module";
import { RedisModule } from "../../redis/redis.module";
import { LocationController } from "./location.controller";
import { LocationService } from "./location.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    RedisModule,
  ],
  controllers: [LocationController],
  providers: [LocationService, OnboardingGuard],
  exports: [LocationService],
})
export class TrackingModule {}
