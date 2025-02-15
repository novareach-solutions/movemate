import {Agent} from './agent';
import {DropLocation} from './dropLocation';
import {
  OrderStatusEnum,
  OrderTypeEnum,
  PaymentStatusEnum,
  UserRoleEnum,
} from './enums';
import {OrderReview} from './orderReview';
import {PickupLocation} from './pickupLocation';
import {Report} from './report';
import {User} from './user';

export interface SendPackageOrder {
  id: number;
  senderName: string;
  senderPhoneNumber: string;
  receiverName: string;
  receiverPhoneNumber: string;
  packageType: string;
  itemVerifiedPhoto: string;
  deliveryInstructions?: string;
  status: OrderStatusEnum;
  type: OrderTypeEnum;
  pickupLocation?: PickupLocation;
  pickupLocationId?: number;
  dropLocation?: DropLocation;
  dropLocationId?: number;
  estimatedDistance?: number;
  estimatedTime: string;
  customer?: User;
  customerId?: number;
  agent?: Agent;
  agentId?: number;
  price?: number;
  actualDistance?: number;
  actualTime?: number;
  cancellationReason?: string;
  canceledBy?: UserRoleEnum;
  completionPhoto?: string;
  acceptedAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
  paymentStatus: PaymentStatusEnum;
  report?: Report;
  reportId?: number;
  review?: OrderReview;
  orderReviewId?: number;
}
