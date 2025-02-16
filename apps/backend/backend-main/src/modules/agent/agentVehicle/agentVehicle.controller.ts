import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { ApprovalStatusEnum } from "../../../shared/enums";
import { AuthGuard } from "../../../shared/guards/auth.guard";
import { RoleGuard } from "../../../shared/guards/roles.guard";
import { IApiResponse, ICustomRequest } from "../../../shared/interface";
import { TAgentVehicle } from "../agent.types";
import { AgentVehicleService } from "./agentVehicle.service";

@ApiTags("Agent Vehicle")
@Controller("agent")
export class AgentVehicleController {
  constructor(private readonly agentVehicleService: AgentVehicleService) {}

  // Agent APIs
  @Post("vehicle")
  @UseGuards(AuthGuard, RoleGuard)
  // Role: AGENT
  async createVehicle(
    @Body() vehicleData: TAgentVehicle,
    @Req() request: ICustomRequest,
  ): Promise<IApiResponse<TAgentVehicle>> {
    const agentId = request.user.agent.id;
    const vehicle = await this.agentVehicleService.createVehicle(
      agentId,
      vehicleData,
    );
    return {
      success: true,
      message: "Vehicle created successfully.",
      data: vehicle,
    };
  }

  @Patch("vehicle/:vehicleId")
  @UseGuards(AuthGuard, RoleGuard)
  // Role: AGENT
  async updateVehicle(
    @Param("vehicleId", ParseIntPipe) vehicleId: number,
    @Body() updateData: Partial<TAgentVehicle>,
    @Req() request: ICustomRequest,
  ): Promise<IApiResponse<any>> {
    const agentId = request.user.agent.id;
    const result = await this.agentVehicleService.updateVehicle(
      agentId,
      vehicleId,
      updateData,
    );
    return {
      success: true,
      message: "Vehicle updated successfully.",
      data: result,
    };
  }

  @Get("vehicle")
  @UseGuards(AuthGuard, RoleGuard)
  // Role: AGENT
  async getMyVehicles(
    @Req() request: ICustomRequest,
  ): Promise<IApiResponse<TAgentVehicle[]>> {
    const agentId = request.user.agent.id;
    const vehicles = await this.agentVehicleService.getVehiclesByAgent(agentId);
    return {
      success: true,
      message: "Vehicles retrieved successfully.",
      data: vehicles,
    };
  }

  @Delete("vehicle/:vehicleId")
  @UseGuards(AuthGuard, RoleGuard)
  // Role: AGENT
  async deleteVehicle(
    @Param("vehicleId", ParseIntPipe) vehicleId: number,
    @Req() request: ICustomRequest,
  ): Promise<IApiResponse<null>> {
    const agentId = request.user.agent.id;
    await this.agentVehicleService.deleteVehicle(agentId, vehicleId);
    return {
      success: true,
      message: "Vehicle deleted successfully.",
      data: null,
    };
  }

  // Admin APIs
  @Patch("admin/agent/:agentId/vehicle/:vehicleId/approval")
  @UseGuards(AuthGuard, RoleGuard)
  // Role: ADMIN
  async updateVehicleApproval(
    @Param("agentId", ParseIntPipe) agentId: number,
    @Param("vehicleId", ParseIntPipe) vehicleId: number,
    @Body() body: { approvalStatus: ApprovalStatusEnum },
  ): Promise<IApiResponse<null>> {
    await this.agentVehicleService.updateVehicleApprovalStatus(
      agentId,
      vehicleId,
      body.approvalStatus,
    );
    return {
      success: true,
      message: `Vehicle approval status updated to ${body.approvalStatus}.`,
      data: null,
    };
  }
}
