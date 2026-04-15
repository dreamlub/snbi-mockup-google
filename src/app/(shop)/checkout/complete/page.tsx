'use client';

import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const CompletePage = () => {
  const orderNumber = 'SNB-20240409-12345';
  
  return (
    <div className={`${styles.container} container`}>
      <div className={`${styles.card} glass`}>
        <div className={styles.icon}>🎉</div>
        <h1 className={styles.title}>주문이 완료되었습니다!</h1>
        <p className={styles.message}>
          SNBI와 함께해 주셔서 감사합니다. <br />
          주문하신 상품은 정성을 다해 배송해 드리겠습니다.
        </p>
        
        <div className={styles.orderInfo}>
          <div className={styles.infoRow}>
            <span>주문번호</span>
            <strong>{orderNumber}</strong>
          </div>
          <div className={styles.infoRow}>
            <span>결제금액</span>
            <strong>₩132,000</strong>
          </div>
        </div>

        <div className={styles.actions}>
          <Link href="/orders" className="btn-primary">주문 내역 확인</Link>
          <Link href="/" className={styles.secondaryBtn}>계속 쇼핑하기</Link>
        </div>
      </div>
    </div>
  );
};

export default CompletePage;
