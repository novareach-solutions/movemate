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
  ): Promise<TAgentVehicle> {
    this.logger.debug(
      `Checking if vehicle with license plate ${vehicleData.licensePlateNumber} already exists.`,
    );

    const existingVehicle = await dbReadRepo(AgentVehicle).findOne({
      where: { licensePlateNumber: vehicleData.licensePlateNumber },
    });

    if (existingVehicle) {
      this.logger.error(
        `Vehicle with license plate ${vehicleData.licensePlateNumber} already exists.`,
      );
      throw new UserLicensePlateAlreadyExistsError(
        "This car is already registered.",
      );
    }

    this.logger.debug(`Creating new vehicle record for agent ID ${agentId}.`);

    const newVehicle = dbRepo(AgentVehicle).create({
      ...vehicleData,
      agentId,
      registrationExpiryDate: vehicleData.registrationExpiryDate
        ? new Date(vehicleData.registrationExpiryDate)
            .toISOString()
            .split("T")[0] // Convert to YYYY-MM-DD
        : null,
    });

    const savedVehicle = await dbRepo(AgentVehicle).save(newVehicle);

    this.logger.debug(
      `Vehicle with license plate ${savedVehicle.licensePlateNumber} registered successfully.`,
    );

    // ✅ Convert `registrationExpiryDate` from Date to string before returning
    return {
      ...savedVehicle,
      registrationExpiryDate: savedVehicle.registrationExpiryDate
        ? savedVehicle.registrationExpiryDate.toISOString().split("T")[0]
        : null,
    };
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
