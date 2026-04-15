'use client';

import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const CompletePage = () => {
  const orderNumber = `SNB-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.floor(Math.random()*90000+10000)}`;
  const paidAt      = new Date().toLocaleString('ko-KR');

  return (
    <div className={`${styles.container} container`}>
      <div className={`${styles.card} glass`}>
        <div className={styles.icon}>🎉</div>
        <h1 className={styles.title}>주문이 완료되었습니다!</h1>
        <p className={styles.message}>
          SNBI와 함께해 주셔서 감사합니다.<br />
          정성을 다해 빠르게 배송해 드리겠습니다.
        </p>

        <div className={styles.orderInfo}>
          <div className={styles.infoRow}>
            <span>주문번호</span>
            <strong>{orderNumber}</strong>
          </div>
          <div className={styles.infoRow}>
            <span>결제금액</span>
            <strong className={styles.amount}>₩168,000</strong>
          </div>
          <div className={styles.infoRow}>
            <span>결제일시</span>
            <strong>{paidAt}</strong>
          </div>
          <div className={styles.infoRow}>
            <span>배송 예정</span>
            <strong>영업일 기준 2~3일</strong>
          </div>
        </div>

        <div className={styles.notice}>
          📦 평일 오전 3시 이전 결제 시 당일 출발
        </div>

        <div className={styles.actions}>
          <Link href="/mypage/orders" className="btn-primary">주문 내역 확인</Link>
          <Link href="/products" className={styles.secondaryBtn}>계속 쇼핑하기</Link>
        </div>
      </div>
    </div>
  );
};

export default CompletePage;
