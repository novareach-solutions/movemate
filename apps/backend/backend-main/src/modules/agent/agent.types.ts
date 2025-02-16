import { AgentStatusEnum, AgentTypeEnum, ApprovalStatusEnum } from "../../shared/enums";
import { TCreateUser, TUpdateUser } from "../user/user.types";

export type TAgent = {
  user: TCreateUser;
  agentType: AgentTypeEnum;
  abnNumber: string;
  profilePhoto?: string;
  status: AgentStatusEnum;
  vehicles?: TAgentVehicle[];
  driverLicenseNumber?: string;
  driverLicenseExpiryDate?: Date;
};


export type TAgentPartial = {
  user?: TUpdateUser;
  agentType?: AgentTypeEnum;
  abnNumber?: string;
  profilePhoto?: string;
  status?: AgentStatusEnum;
  vehicles?: TAgentVehicle[];
};

export type TAgentDocument = {
  name: string;
  description?: string;
  url: string;
  agentId?: number;
  expiry?: Date;
};

export type TAgentVehicle = {
  vehicleMake: string;
  vehicleModel: string;
  licensePlateNumber: string;
  registrationExpiryDate?: Date;
  vehicleRegoImageUrl: string;
  approvalStatus: ApprovalStatusEnum;
}

export type DocumentError = {
  id: string;
  heading: string;
  text: string;
};
