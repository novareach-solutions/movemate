import { Column, Entity, ManyToOne } from "typeorm";

import { NotificationTypeEnum } from "../modules/notification/types/notification.interface";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity()
export class Notification extends BaseEntity {
  @Column()
  type: NotificationTypeEnum;

  @Column("jsonb")
  data: any;

  @Column({ default: false })
  read: boolean;

  @ManyToOne(() => User)
  user: User;

  @Column()
  userId: number;
}
