import {AgentStatusEnum, ApprovalStatusEnum} from './enums';

export interface Agent {
  id: number;
  userId: number;
  agentType: string;
  abnNumber: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: number;
  profilePhoto?: string;
  status: AgentStatusEnum;
  approvalStatus: ApprovalStatusEnum;
}
