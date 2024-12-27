import {
  Column,
  Entity,
  Index,
  ManyToOne,
  RelationId,
  Unique,
} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { ApprovalStatus } from "../shared/enums";
import { Agent } from "./Agent";

@Index("IDX_agent_document_agentId", ["agentId"], {
  where: '"deletedAt" IS NULL',
})
@Unique("UQ_agent_document_agentId", ["agentId"])
@Entity()
export class AgentDocument extends BaseEntity {
  @Column({ type: "varchar", nullable: false })
  name: string;

  @Column({ type: "varchar", nullable: true })
  description: string;

  @Column({ type: "varchar", nullable: false })
  url: string;

  @ManyToOne(() => Agent, {
    cascade: true,
    deferrable: "INITIALLY IMMEDIATE",
    onDelete: "CASCADE",
  })
  agent: Agent;

  @RelationId((doc: AgentDocument) => doc.agent)
  @Column({ type: "integer" })
  agentId: number;

  @Column({
    type: "enum",
    enum: ApprovalStatus,
    default: ApprovalStatus.PENDING,
  })
  approval: ApprovalStatus;

  @Column({ type: "timestamp", nullable: true })
  expiryDate?: Date;
}
