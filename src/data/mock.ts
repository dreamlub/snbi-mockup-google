import { Product, User, NetworkNode, Commission, Order, Payment, Subscription } from '../types';

export const MOCK_USER: User = {
  id: 'u1',
  name: '홍길동',
  email: 'hong@example.com',
  grade: 'GOLD',
  referralCode: 'SNBI-2024-HGD',
  phoneNumber: '010-1234-5678',
  bankAccount: '국민은행 123-456-789012',
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: '빠사쥬 프리미엄 에센스',
    category: 'SKIN',
    description: '피부 깊숙이 스며드는 고농축 영양 에센스입니다.',
    price: 120000,
    memberPrice: 96000,
    gradePrices: {
      NORMAL: 120000,
      SILVER: 108000,
      GOLD: 96000,
      VIP: 84000,
    },
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=400',
    stock: 50,
  },
  {
    id: 'p2',
    name: '아스릭손 센트럴 로션',
    category: 'SKIN',
    description: '하루 종일 촉촉함을 유지해주는 데일리 로션.',
    price: 85000,
    memberPrice: 68000,
    gradePrices: {
      NORMAL: 85000,
      SILVER: 76500,
      GOLD: 68000,
      VIP: 59500,
    },
    image: '/images/products/asrixon-lotion.png',
    stock: 100,
  },
  {
    id: 'p3',
    name: '수리모 리페어링 샴푸',
    category: 'HAIR',
    description: '탈모 증상 완화 및 모발 영양 공급에 탁월합니다.',
    price: 45000,
    memberPrice: 36000,
    gradePrices: {
      NORMAL: 45000,
      SILVER: 40500,
      GOLD: 36000,
      VIP: 31500,
    },
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=400',
    stock: 200,
  },
  {
    id: 'sub1',
    name: '빠사쥬 평생 구독 플랜',
    category: 'SKIN',
    description: '매월 정기적으로 배송되는 프리미엄 피부 관리 솔루션.',
    price: 99000,
    memberPrice: 79000,
    gradePrices: {
      NORMAL: 99000,
      SILVER: 89000,
      GOLD: 79000,
      VIP: 69000,
    },
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=400',
    isSubscription: true,
    stock: 1000,
  },
];

export const MOCK_NETWORK: NetworkNode = {
  id: 'u1',
  name: '홍길동 (나)',
  grade: 'GOLD',
  level: 0,
  performance: 12500000,
  children: [
    {
      id: 'u2',
      name: '김철수',
      grade: 'SILVER',
      level: 1,
      performance: 4500000,
      children: [
        { id: 'u4', name: '이영희', grade: 'NORMAL', level: 2, performance: 1200000 },
        { id: 'u5', name: '박민준', grade: 'NORMAL', level: 2, performance: 800000 },
      ],
    },
    {
      id: 'u3',
      name: '최지우',
      grade: 'GOLD',
      level: 1,
      performance: 8000000,
    },
  ],
};

export const MOCK_COMMISSIONS: Commission[] = [
  { id: 'c1', userId: 'u1', month: '2024-03', amount: 1250000, source: '다단게 수당 (추천인)', status: 'PAID' },
  { id: 'c2', userId: 'u1', month: '2024-03', amount: 450000, source: '직접 판매 수당', status: 'PAID' },
  { id: 'c3', userId: 'u1', month: '2024-04', amount: 1800000, source: '다단계 수당 (네트워크)', status: 'UNPAID' },
];

export const MOCK_ADMIN_USERS: User[] = [
  { id: 'u1', name: '홍길동', email: 'hong@example.com', grade: 'GOLD', referralCode: 'SNBI-HGD01', phoneNumber: '010-1234-5678', createdAt: '2023-11-20', isActive: true },
  { id: 'u2', name: '김철수', email: 'kim123@example.com', grade: 'SILVER', referralCode: 'SNBI-KCS02', phoneNumber: '010-2345-6789', createdAt: '2024-01-15', isActive: true },
  { id: 'u3', name: '최지우', email: 'jiwoo@example.com', grade: 'GOLD', referralCode: 'SNBI-CJW03', phoneNumber: '010-3456-7890', createdAt: '2023-08-05', isActive: true },
  { id: 'u4', name: '이영희', email: 'young@example.com', grade: 'NORMAL', referralCode: 'SNBI-LYH04', phoneNumber: '010-4567-8901', createdAt: '2024-02-28', isActive: false },
  { id: 'u5', name: '박민준', email: 'minjun@example.com', grade: 'NORMAL', referralCode: 'SNBI-PMJ05', phoneNumber: '010-5678-9012', createdAt: '2024-03-10', isActive: true },
  { id: 'u6', name: '강동원', email: 'kangdw@example.com', grade: 'VIP', referralCode: 'SNBI-KDW06', phoneNumber: '010-6789-0123', createdAt: '2023-01-20', isActive: true },
  { id: 'u7', name: '정유미', email: 'yumi@example.com', grade: 'SILVER', referralCode: 'SNBI-JYM07', phoneNumber: '010-7890-1234', createdAt: '2024-01-05', isActive: true },
  { id: 'u8', name: '송중기', email: 'song@example.com', grade: 'NORMAL', referralCode: 'SNBI-SJK08', phoneNumber: '010-8901-2345', createdAt: '2024-04-01', isActive: true },
];

export const MOCK_ADMIN_ORDERS: Order[] = [
  { id: 'ORD-20240410-001', userId: 'u1', items: [{ productId: 'p1', quantity: 1 }, { productId: 'p2', quantity: 2 }], totalAmount: 221000, status: 'PAID',      createdAt: '2026-04-10T06:20:00', shippingAddress: '서울 강남구 테헤란로 123길 45', trackingNumber: undefined },
  { id: 'ORD-20240409-002', userId: 'u2', items: [{ productId: 'sub1', quantity: 1 }],              totalAmount: 99000,  status: 'SHIPPING',  createdAt: '2026-04-09T14:10:00', shippingAddress: '부산 해운대구 쫘동 7수길 88', trackingNumber: 'CJ-1234567890' },
  { id: 'ORD-20240408-003', userId: 'u3', items: [{ productId: 'p3', quantity: 3 }],              totalAmount: 108000, status: 'DELIVERED', createdAt: '2026-04-08T09:05:00', shippingAddress: '인체시 남동구 인하로 200', trackingNumber: 'LT-9876543210' },
  { id: 'ORD-20240407-004', userId: 'u4', items: [{ productId: 'p1', quantity: 1 }],              totalAmount: 120000, status: 'CANCELLED', createdAt: '2026-04-07T11:45:00', shippingAddress: '대구시 중구 동성로 10', trackingNumber: undefined },
  { id: 'ORD-20240406-005', userId: 'u5', items: [{ productId: 'p2', quantity: 1 }],              totalAmount: 85000,  status: 'RETURNED',  createdAt: '2026-04-06T16:30:00', shippingAddress: '성남시 분당구 판교로 235', trackingNumber: 'HJ-1122334455' },
  { id: 'ORD-20240405-006', userId: 'u6', items: [{ productId: 'sub1', quantity: 1 }],            totalAmount: 79000,  status: 'SHIPPING',  createdAt: '2026-04-05T08:00:00', shippingAddress: '광주구 능주구 의재로 55', trackingNumber: 'CJ-0011223344' },
  { id: 'ORD-20240404-007', userId: 'u7', items: [{ productId: 'p3', quantity: 2 }, { productId: 'p1', quantity: 1 }], totalAmount: 210000, status: 'PAID', createdAt: '2026-04-04T13:22:00', shippingAddress: '대전시 유성구 은하로 77', trackingNumber: undefined },
  { id: 'ORD-20240403-008', userId: 'u8', items: [{ productId: 'p2', quantity: 2 }],              totalAmount: 170000, status: 'DELIVERED', createdAt: '2026-04-03T10:10:00', shippingAddress: '언양시 달서구 철실 대로 8', trackingNumber: 'LT-5566778899' },
];

export const MOCK_PAYMENTS: Payment[] = [
  { id: 'PAY-001', orderId: 'ORD-20240410-001', userId: 'u1', amount: 221000, method: 'CARD',          status: 'SUCCESS',        isSubscription: false, paidAt: '2026-04-10T06:21:00', pgTransactionId: 'TXN-A1B2C3D4' },
  { id: 'PAY-002', orderId: 'ORD-20240409-002', userId: 'u2', amount: 99000,  method: 'KAKAO',         status: 'SUCCESS',        isSubscription: true,  paidAt: '2026-04-09T14:11:00', pgTransactionId: 'TXN-B2C3D4E5' },
  { id: 'PAY-003', orderId: 'ORD-20240408-003', userId: 'u3', amount: 108000, method: 'NAVER',         status: 'SUCCESS',        isSubscription: false, paidAt: '2026-04-08T09:06:00', pgTransactionId: 'TXN-C3D4E5F6' },
  { id: 'PAY-004', orderId: 'ORD-20240407-004', userId: 'u4', amount: 120000, method: 'CARD',          status: 'FULL_CANCEL',    isSubscription: false, paidAt: '2026-04-07T11:46:00', pgTransactionId: 'TXN-D4E5F6G7', cancelledAmount: 120000 },
  { id: 'PAY-005', orderId: 'ORD-20240406-005', userId: 'u5', amount: 85000,  method: 'BANK_TRANSFER', status: 'PARTIAL_CANCEL', isSubscription: false, paidAt: '2026-04-06T16:31:00', pgTransactionId: 'TXN-E5F6G7H8', cancelledAmount: 42500 },
  { id: 'PAY-006', orderId: 'ORD-20240405-006', userId: 'u6', amount: 79000,  method: 'CARD',          status: 'SUCCESS',        isSubscription: true,  paidAt: '2026-04-05T08:01:00', pgTransactionId: 'TXN-F6G7H8I9' },
  { id: 'PAY-007', orderId: 'ORD-20240404-007', userId: 'u7', amount: 210000, method: 'KAKAO',         status: 'SUCCESS',        isSubscription: false, paidAt: '2026-04-04T13:23:00', pgTransactionId: 'TXN-G7H8I9J0' },
  { id: 'PAY-008', orderId: 'ORD-20240403-008', userId: 'u8', amount: 170000, method: 'CARD',          status: 'SUCCESS',        isSubscription: false, paidAt: '2026-04-03T10:11:00', pgTransactionId: 'TXN-H8I9J0K1' },
];

export const MOCK_SUBSCRIPTIONS: Subscription[] = [
  { id: 'SUB-001', userId: 'u2', productId: 'sub1', status: 'ACTIVE',    amount: 99000,  startedAt: '2026-01-09', nextBillingAt: '2026-05-09', grade: 'SILVER' },
  { id: 'SUB-002', userId: 'u6', productId: 'sub1', status: 'ACTIVE',    amount: 79000,  startedAt: '2025-12-05', nextBillingAt: '2026-05-05', grade: 'VIP' },
  { id: 'SUB-003', userId: 'u1', productId: 'sub1', status: 'PAUSED',    amount: 96000,  startedAt: '2025-11-20', nextBillingAt: '2026-06-20', grade: 'GOLD' },
  { id: 'SUB-004', userId: 'u3', productId: 'sub1', status: 'CANCELLED', amount: 96000,  startedAt: '2025-08-05', nextBillingAt: '—',          endedAt: '2026-03-05', grade: 'GOLD' },
  { id: 'SUB-005', userId: 'u7', productId: 'sub1', status: 'EXPIRED',   amount: 108000, startedAt: '2025-07-01', nextBillingAt: '—',          endedAt: '2026-01-01', grade: 'SILVER' },
];


