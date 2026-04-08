export type UserGrade = 'NORMAL' | 'SILVER' | 'GOLD' | 'VIP';

export interface User {
  id: string;
  name: string;
  email: string;
  grade: UserGrade;
  referralCode: string;
  phoneNumber: string;
  bankAccount?: string;
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
