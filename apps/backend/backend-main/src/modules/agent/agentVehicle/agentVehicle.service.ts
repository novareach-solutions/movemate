import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { DeleteResult, UpdateResult } from "typeorm";

import { AgentVehicle } from "../../../entity/AgentVehicle";
import { ApprovalStatusEnum } from "../../../shared/enums";
import { UserLicensePlateAlreadyExistsError } from "../../../shared/errors/user";
import { dbReadRepo, dbRepo } from "../../database/database.service";
import { TAgentVehicle } from "../agent.types";

@Injectable()
export class AgentVehicleService {
  private readonly logger = new Logger(AgentVehicleService.name);

  async createVehicle(
    agentId: number,
    vehicleData: TAgentVehicle,
  ): Promise<AgentVehicle> {
    const existingVehicle = await dbReadRepo(AgentVehicle).findOne({
      where: { licensePlateNumber: vehicleData.licensePlateNumber },
    });
    if (existingVehicle) {
      throw new UserLicensePlateAlreadyExistsError(
        "This Car is already registered",
      );
    }
    const newVehicle = dbRepo(AgentVehicle).create({ ...vehicleData, agentId });
    return await dbRepo(AgentVehicle).save(newVehicle);
  }

  async updateVehicle(
    agentId: number,
    vehicleId: number,
    updateData: Partial<TAgentVehicle>,
  ): Promise<UpdateResult> {
    return await dbRepo(AgentVehicle).update(
      { id: vehicleId, agentId },
      updateData,
    );
  }

  async getVehiclesByAgent(agentId: number): Promise<AgentVehicle[]> {
    return await dbReadRepo(AgentVehicle).find({ where: { agentId } });
  }

  async deleteVehicle(
    agentId: number,
    vehicleId: number,
  ): Promise<DeleteResult> {
    return await dbRepo(AgentVehicle).delete({ id: vehicleId, agentId });
  }

  async updateVehicleApprovalStatus(
    agentId: number,
    vehicleId: number,
    approvalStatus: ApprovalStatusEnum,
  ): Promise<void> {
    const vehicle = await dbReadRepo(AgentVehicle).findOne({
      where: { id: vehicleId, agentId },
    });
    if (!vehicle) {
      throw new InternalServerErrorException("Vehicle not found");
    }
    vehicle.approvalStatus = approvalStatus;
    await dbRepo(AgentVehicle).save(vehicle);
  }
}
