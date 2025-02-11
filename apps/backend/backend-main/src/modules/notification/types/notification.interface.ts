export interface INotificationEvent {
  data: any;
  id: string;
  read: boolean;
  timestamp: Date;
  type: NotificationTypeEnum;
  userId: number;
}

export enum NotificationTypeEnum {
  AGENT_ASSIGNED = "agent.assigned",
  CONNECTION = "connection",
  ORDER_ACCEPTED = "order.accepted",
  ORDER_CANCELLED = "order.cancelled",
  ORDER_COMPLETED = "order.completed",
  PAYMENT_RECEIVED = "payment.received",
}

export interface ISSEClient {
  id: string;
  response: any;
  userId: number;
}
