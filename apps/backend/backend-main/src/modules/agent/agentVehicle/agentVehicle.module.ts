import { Module } from "@nestjs/common";

import { AgentController } from "../agent.controller";
import { AgentService } from "../agent.service";
import { AgentVehicleController } from "./agentVehicle.controller";
import { AgentVehicleService } from "./agentVehicle.service";

@Module({
  controllers: [AgentController, AgentVehicleController],
  providers: [AgentService, AgentVehicleService],
  exports: [AgentService, AgentVehicleService],
})
export class AgentModule {}
