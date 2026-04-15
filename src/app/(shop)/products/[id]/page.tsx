'use client';

import React, { useState, use } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { MOCK_PRODUCTS, MOCK_USER } from '@/data/mock';
import ProductCard from '@/components/products/ProductCard';
import styles from './page.module.css';

interface Props {
  params: Promise<{ id: string }>;
}

const ProductDetailPage = ({ params }: Props) => {
  const { id } = use(params);
  const router  = useRouter();
  const product = MOCK_PRODUCTS.find(p => p.id === id);

  const [purchaseType, setPurchaseType] = useState<'normal' | 'subscription'>('normal');
  const [qty, setQty]                   = useState(1);
  const [addedToCart, setAddedToCart]   = useState(false);

  if (!product) notFound();

  const userPrice        = product.gradePrices[MOCK_USER.grade];
  const subPrice         = Math.floor(userPrice * 0.95); // 구독 5% 추가 할인
  const displayPrice     = purchaseType === 'subscription' ? subPrice : userPrice;
  const discountAmount   = product.price - displayPrice;
  const recommendedProducts = MOCK_PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);

  const handleCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuy = () => {
    if (purchaseType === 'subscription') {
      router.push(`/checkout/subscription?productId=${product.id}`);
    } else {
      router.push(`/checkout?productId=${product.id}&qty=${qty}`);
    }
  };

  return (
    <div className={`${styles.wrapper} container`}>
      <div className={styles.mainInfo}>
        {/* 이미지 */}
        <div className={styles.imageSection}>
          <div className={`${styles.imageContainer} glass`}>
            <img src={product.image} alt={product.name} />
          </div>
        </div>

        {/* 정보 */}
        <div className={styles.detailSection}>
          <div className={styles.categoryBadge}>{product.category}</div>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.description}>{product.description}</p>

          {/* 구매 타입 탭 */}
          <div className={styles.purchaseTabs}>
            <button
              className={`${styles.tabBtn} ${purchaseType === 'normal' ? styles.activeTab : ''}`}
              onClick={() => setPurchaseType('normal')}
            >
              일반 구매
            </button>
            <button
              className={`${styles.tabBtn} ${purchaseType === 'subscription' ? styles.activeTab : ''}`}
              onClick={() => setPurchaseType('subscription')}
            >
              정기구독
              <span className={styles.subDiscount}>추가 5%↓</span>
            </button>
          </div>

          {/* 가격 카드 */}
          <div className={`${styles.priceCard} glass`}>
            <div className={styles.priceRow}>
              <span>정가</span>
              <span className={styles.originalPrice}>₩{product.price.toLocaleString()}</span>
            </div>
            <div className={styles.priceRow}>
              <span className={styles.gradeLabel}>{MOCK_USER.grade} 등급가</span>
              <span className={styles.userPrice}>₩{displayPrice.toLocaleString()}</span>
            </div>
            {purchaseType === 'subscription' && (
              <div className={styles.subBenefitRow}>
                <span className={styles.subBenefitLabel}>🔄 정기구독 혜택</span>
                <span className={styles.subBenefitValue}>매월 자동배송 + 추가 5% 할인</span>
              </div>
            )}
            <div className={styles.savings}>
              현재 <span className={styles.highlight}>₩{discountAmount.toLocaleString()}</span> 절약 중
            </div>
          </div>

          {/* 수량 (일반구매만) */}
          {purchaseType === 'normal' && (
            <div className={styles.options}>
              <label>수량</label>
              <div className={styles.quantity}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
                <input type="number" value={qty} readOnly />
                <button onClick={() => setQty(q => q + 1)}>+</button>
              </div>
            </div>
          )}

          {/* 정기구독 안내 */}
          {purchaseType === 'subscription' && (
            <div className={styles.subGuide}>
              <div className={styles.subGuideItem}>📦 매월 {Math.floor(displayPrice).toLocaleString()}원 자동 결제</div>
              <div className={styles.subGuideItem}>🚚 다음 달부터 정기 배송 시작</div>
              <div className={styles.subGuideItem}>✏️ 마이페이지에서 언제든 해지 가능</div>
            </div>
          )}

          {/* 구매 버튼 */}
          <div className={styles.actions}>
            {purchaseType === 'normal' && (
              <button
                className={`${styles.cartBtn} ${addedToCart ? styles.cartAdded : ''}`}
                onClick={handleCart}
              >
                {addedToCart ? '✓ 담겼습니다' : '장바구니'}
              </button>
            )}
            <button className="btn-primary" style={{ flex: 2 }} onClick={handleBuy}>
              {purchaseType === 'subscription' ? '정기구독 신청하기' : '바로 구매하기'}
            </button>
          </div>
        </div>
      </div>

      {/* 연관 상품 */}
      <section className={styles.related}>
        <h2>이런 상품은 어떠세요?</h2>
        <div className={styles.relatedGrid}>
          {recommendedProducts.map(p => (
            <ProductCard key={p.id} product={p} userGrade={MOCK_USER.grade} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;
