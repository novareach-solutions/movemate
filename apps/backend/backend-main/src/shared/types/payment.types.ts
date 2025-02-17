import { PaymentStatusEnum, PaymentTypeEnum } from "../enums";

// -- Entity Specific ---
export type TPayment = {
  stripePaymentIntentId: string;
  type: PaymentTypeEnum;
  amount: number;
  orderId?: number;
  agentId?: number;
  status: PaymentStatusEnum;
  commissionAmount?: number;
  failureReason?: string;
};

export type TCreatePaymentIntent = {
  type: PaymentTypeEnum;
  amount: number;
  orderId?: number;
  agentId?: number;
  description?: string;
};

// -- Controller Specific ---
export type TConnectAccountRequest = {
  agentId: number;
  email: string;
  country: string;
  businessType?: "individual" | "company";
};

export type TCreateVirtualCardRequest = {
  agentId: number;
  orderId: number;
  amount: number;
};

export type TCreateSubscriptionRequest = {
  agentId: number;
  plan: string;
  amount: number;
};

export type TWithdrawalRequest = {
  agentId: number;
  amount: number;
  isExpress: boolean;
};

export type TBalanceResponse = {
  balance: number;
  pendingBalance: number;
};

export type TCreateOrderRequest = {
  agentId?: number;
  amount: number;
  currency: string;
  customerId: number;
  orderId: number;
};

export type TOrderResponse = {
  clientSecret: string;
  orderId: number;
  paymentIntentId: string;
};

// Customer Payment Specific Types

export type TCreatePaymentIntentRequest = {
  orderId: number;
  amount: number;
  currency: string;
  paymentMethodId?: string;
};

export type TPaymentIntentResponse = {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
  status: string; // TODO: Change to PaymentStatusEnum
};

export type TPaymentStatus = {
  id: string;
  status: PaymentStatusEnum;
  amount: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
  failureReason?: string;
};

export type TRefundRequest = {
  reason: string;
  amount?: number; // Optional for partial refunds
};

export type TRefundResponse = {
  id: string;
  amount: number;
  status: "pending" | "succeeded" | "failed";
  createdAt: Date;
};
