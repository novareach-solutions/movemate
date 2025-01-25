import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";

import { DatabaseModule } from "../modules/database/database.module";
import { HealthController } from "./health.controller";

@Module({
  imports: [TerminusModule, HttpModule, DatabaseModule],
  controllers: [HealthController],
})
export class HealthModule {}
