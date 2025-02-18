import { Column, Entity, Index, ManyToOne, RelationId } from "typeorm";

import { ApprovalStatusEnum } from "../shared/enums";
import { Agent } from "./Agent";
import { BaseEntity } from "./BaseEntity";

@Entity()
@Index("IDX_agent_vehicle_agentId", ["agentId"])
export class AgentVehicle extends BaseEntity {
  @ManyToOne(() => Agent, (agent) => agent.vehicles, {
    deferrable: "INITIALLY IMMEDIATE",
    onDelete: "CASCADE",
  })
  agent: Agent;

  @RelationId((vehicle: AgentVehicle) => vehicle.agent)
  @Column({ type: "integer" })
  agentId: number;

  @Column({ type: "varchar", nullable: false })
  vehicleMake: string;

  @Column({ type: "varchar", nullable: false })
  vehicleModel: string;

  @Column({ type: "varchar", nullable: false })
  licensePlateNumber: string;

  @Column({ type: "date", nullable: true })
  registrationExpiryDate: Date;

  @Column({ type: "varchar", nullable: true })
  vehicleRegoImageUrl: string;

  @Column({
    type: "varchar",
    default: ApprovalStatusEnum.PENDING,
    nullable: false,
  })
  approvalStatus: ApprovalStatusEnum;
}
