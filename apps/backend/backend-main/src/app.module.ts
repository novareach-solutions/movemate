import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { TerminusModule } from "@nestjs/terminus";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import configuration from "./config/configuration";
import { AgentModule } from "./modules/agent/agent.module";
import { AuthModule } from "./modules/auth/auth.module";
import { DatabaseModule } from "./modules/database/database.module";
import { GatewayModule } from "./modules/gateway/gateway.module";
import { SendAPackageModule } from "./modules/order/sendPackage/sendPackage.module";
import { RedisModule } from "./modules/redis/redis.module";
import { SupportModule } from "./modules/support/support.module";
import { UserModule } from "./modules/user/user.module";
import { AuthGuard } from "./shared/guards/auth.guard";
import { OnboardingGuard } from "./shared/guards/onboarding.guard";
import { RoleGuard } from "./shared/guards/roles.guard";
import { MediaModule } from "./modules/media/media.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule,
    RedisModule,
    AuthModule,
    AgentModule,
    SupportModule,
    GatewayModule,
    UserModule,
    SendAPackageModule,
    TerminusModule,
    HttpModule,
    MediaModule,
  ],
  controllers: [AppController],
  providers: [AppService, RoleGuard, OnboardingGuard, AuthGuard, JwtService],
})
export class AppModule {}
