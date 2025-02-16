import { Entity, Column, ManyToOne, JoinColumn, Index } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Index("IDX_saved_address_userId", ["userId"], { where: '"deletedAt" IS NULL' })
@Entity()
export class SavedAddress extends BaseEntity {
  @Column({ type: "int", nullable: false })
  userId: number;

  @ManyToOne(() => User, { deferrable: "INITIALLY IMMEDIATE", onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ type: "varchar", length: 255, nullable: false })
  title: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  addressLine1: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  addressLine2: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  landmark: string;

  @Column({ type: "float", nullable: false })
  latitude: number;

  @Column({ type: "float", nullable: false })
  longitude: number;
}
