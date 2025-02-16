export interface INotificationEvent {
  data: any;
  id?: number;
  read: boolean;
  timestamp: Date;
  type: NotificationTypeEnum;
  userId: number;
}

export enum NotificationTypeEnum {
  AGENT_ASSIGNED = "AGENT_ASSIGNED",
  CONNECTION = "CONNECTION",
  ORDER_ACCEPTED = "ORDER_ACCEPTED",
  ORDER_CANCELLED = "ORDER_CANCELLED",
  ORDER_COMPLETED = "ORDER_COMPLETED",
  PAYMENT_RECEIVED = "PAYMENT_RECEIVED",
}

export interface ISSEClient {
  id: string;
  response: any;
  userId: number;
}

export interface IServerSentEvent {
  data: string;
  id?: string;
  type: string;
}
