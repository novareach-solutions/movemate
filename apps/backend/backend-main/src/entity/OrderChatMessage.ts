import { Column, Entity, JoinColumn, ManyToOne, RelationId } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { SendPackageOrder } from "./SendPackageOrder";
import { User } from "./User";

@Entity("order_chat_message")
export class OrderChatMessage extends BaseEntity {
  @ManyToOne(() => SendPackageOrder)
  @JoinColumn({ name: "orderId" })
  order: SendPackageOrder;

  @RelationId((message: OrderChatMessage) => message.order)
  @Column({ type: "integer", nullable: false })
  orderId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "senderId" })
  sender: User;

  @RelationId((message: OrderChatMessage) => message.sender)
  @Column({ type: "integer", nullable: false })
  senderId: number;

  @Column({ type: "varchar", default: "TEXT" })
  type: string;

  @Column({ type: "text" })
  content: string;

  @Column({ type: "boolean", default: false })
  isRead: boolean;
}
