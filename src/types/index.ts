export type UserGrade = 'NORMAL' | 'SILVER' | 'GOLD' | 'VIP';

export interface User {
  id: string;
  name: string;
  email: string;
  grade: UserGrade;
  referralCode: string;
  phoneNumber: string;
  bankAccount?: string;
  createdAt?: string;
  isActive?: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: 'SKIN' | 'BODY' | 'HAIR' | 'OTHER';
  description: string;
  price: number; // Regular price
  memberPrice: number; // Price based on grade (calculated or stored)
  gradePrices: Record<UserGrade, number>;
  image: string;
  isSubscription?: boolean;
  stock: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedOption?: string;
}

export type OrderStatus = 'PENDING' | 'PAID' | 'SHIPPING' | 'DELIVERED' | 'CANCELLED' | 'RETURNED';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  shippingAddress: string;
  trackingNumber?: string;
}

export interface NetworkNode {
  id: string;
  name: string;
  grade: UserGrade;
  level: number;
  children?: NetworkNode[];
  performance: number; // Volume
}

export interface Commission {
  id: string;
  userId: string;
  month: string;
  amount: number;
  source: string; // "Direct" or "Network"
  status: 'PAID' | 'UNPAID';
}

export type PaymentMethod = 'CARD' | 'KAKAO' | 'NAVER' | 'BANK_TRANSFER';
export type PaymentStatus = 'SUCCESS' | 'PARTIAL_CANCEL' | 'FULL_CANCEL' | 'FAILED';

export interface Payment {
  id: string;
  orderId: string;
  userId: string;
  amount: number;
  cancelledAmount?: number;
  method: PaymentMethod;
  status: PaymentStatus;
  isSubscription: boolean;
  paidAt: string;
  pgTransactionId: string;
}

export type SubscriptionStatus = 'ACTIVE' | 'PAUSED' | 'CANCELLED' | 'EXPIRED';

export interface Subscription {
  id: string;
  userId: string;
  productId: string;
  status: SubscriptionStatus;
  amount: number;
  startedAt: string;
  nextBillingAt: string;
  endedAt?: string;
  grade: UserGrade;
}
