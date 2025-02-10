import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

import appConfig from "./config/app.config";
import configuration from "./config/configuration";
import databaseConfig from "./config/database.config";
import jwtConfig from "./config/jwt.config";
import redisConfig from "./config/redis.config";
import { HealthModule } from "./health/health.module";
import { AgentModule } from "./modules/agent/agent.module";
import { AuthModule } from "./modules/auth/auth.module";
import { DatabaseModule } from "./modules/database/database.module";
import { GatewayModule } from "./modules/gateway/gateway.module";
import { MediaModule } from "./modules/media/media.module";
import { SendAPackageModule } from "./modules/order/sendPackage/sendPackage.module";
import { RedisModule } from "./modules/redis/redis.module";
import { StripeModule } from "./modules/stripe/stripe.module";
import { SupportModule } from "./modules/support/support.module";
import { TrackingModule } from "./modules/tracking/location/tracking.module";
import { UserModule } from "./modules/user/user.module";
import { AuthGuard } from "./shared/guards/auth.guard";
import { OnboardingGuard } from "./shared/guards/onboarding.guard";
import { RoleGuard } from "./shared/guards/roles.guard";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration, databaseConfig, jwtConfig, redisConfig, appConfig],
    }),
    DatabaseModule,
    HealthModule,
    RedisModule,
    AuthModule,
    AgentModule,
    SupportModule,
    GatewayModule,
    UserModule,
    StripeModule,
    SendAPackageModule,
    MediaModule,
    TrackingModule,
  ],
  providers: [RoleGuard, OnboardingGuard, AuthGuard, JwtService],
})
export class AppModule {}
