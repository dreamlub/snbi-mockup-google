'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_PRODUCTS, MOCK_USER } from '@/data/mock';
import styles from './page.module.css';

const SubscriptionPage = () => {
  const [selectedProduct, setSelectedProduct] = useState('sub1');
  
  const subProducts = MOCK_PRODUCTS.filter(p => p.isSubscription || p.category === 'SKIN');

  return (
    <div className={`${styles.container} container`}>
      <div className={styles.header}>
        <h1 className={styles.title}>정기구독 신청</h1>
        <p>매월 정해진 날짜에 가장 신선한 프리미엄 솔루션을 경험하세요.</p>
      </div>

      <div className={styles.benefitSection}>
        <div className={`${styles.benefitCard} glass`}>
          <span className={styles.icon}>🏷️</span>
          <h3>추가 5% 할인</h3>
          <p>회원 등급 할인가에 추가 5% 혜택이 더해집니다.</p>
        </div>
        <div className={`${styles.benefitCard} glass`}>
          <span className={styles.icon}>🚚</span>
          <h3>무료 정기 배송</h3>
          <p>단 한 품목만 구독하셔도 배송비는 SNBI가 부담합니다.</p>
        </div>
        <div className={`${styles.benefitCard} glass`}>
          <span className={styles.icon}>🎁</span>
          <h3>특별 기프트</h3>
          <p>구독 3/6/12개월 유지 시 특별한 선물을 드립니다.</p>
        </div>
      </div>

      <div className={styles.planGrid}>
        {subProducts.map(product => (
          <div 
            key={product.id} 
            className={`${styles.planCard} glass ${selectedProduct === product.id ? styles.activePlan : ''}`}
            onClick={() => setSelectedProduct(product.id)}
          >
            <div className={styles.planImage}>
              <img src={product.image} alt={product.name} />
            </div>
            <div className={styles.planInfo}>
              <h3>{product.name}</h3>
              <p className={styles.price}>
                월 <strong>₩{(product.gradePrices[MOCK_USER.grade] * 0.95).toLocaleString()}</strong>
              </p>
              <p className={styles.originalPrice}>
                (정가 ₩{product.price.toLocaleString()})
              </p>
              <ul className={styles.features}>
                <li>✓ 필수 영양 에센스 포함</li>
                <li>✓ 피부 장벽 리페어 솔루션</li>
                <li>✓ 월 1회 정기 배송</li>
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.action}>
        <p className={styles.totalInfo}>
          최종 월 결제 금액: <strong>₩{(MOCK_PRODUCTS.find(p => p.id === selectedProduct)?.gradePrices[MOCK_USER.grade]! * 0.95).toLocaleString()}</strong>
        </p>
        <Link href="/checkout" className="btn-primary">선택한 플랜으로 구독하기</Link>
      </div>
    </div>
  );
};

export default SubscriptionPage;
