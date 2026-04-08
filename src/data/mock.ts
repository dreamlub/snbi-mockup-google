import { Product, User, NetworkNode, Commission } from '../types';

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
