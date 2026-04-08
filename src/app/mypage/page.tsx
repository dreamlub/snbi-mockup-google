'use client';

import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const MyPageHome = () => {
  const recentOrders = [
    { id: 'ORD-101', date: '2024-03-28', name: '빠사쥬 프리미엄 에센스 外 1건', price: 132000, status: '배송완료' },
    { id: 'ORD-102', date: '2024-04-05', name: '수리모 리페어링 샴푸', price: 36000, status: '배송중' },
  ];

  return (
    <div className={styles.main}>
      {/* Dashboard Summary */}
      <section className={styles.summaryGrid}>
        <div className={`${styles.summaryBox} glass`}>
          <span>보유 쿠폰</span>
          <strong>3장</strong>
        </div>
        <div className={`${styles.summaryBox} glass`}>
          <span>적립 포인트</span>
          <strong>12,500 P</strong>
        </div>
        <div className={`${styles.summaryBox} glass`}>
          <span>이달의 수당</span>
          <strong>₩1,250,000</strong>
        </div>
      </section>

      {/* Recent Orders */}
      <section className={`${styles.orderSection} glass`}>
        <div className={styles.sectionHeader}>
          <h2>최근 주문 내역</h2>
          <Link href="/orders" className={styles.more}>전체보기 &gt;</Link>
        </div>
        <div className={styles.orderTable}>
          {recentOrders.map(order => (
            <div key={order.id} className={styles.orderRow}>
              <div className={styles.orderLeft}>
                <span className={styles.date}>{order.date}</span>
                <span className={styles.orderId}>{order.id}</span>
              </div>
              <div className={styles.orderName}>{order.name}</div>
              <div className={styles.orderPrice}>₩{order.price.toLocaleString()}</div>
              <div className={styles.orderStatus}>{order.status}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Referral Banner */}
      <section className={`${styles.referralBanner} glass`}>
        <div>
          <h3>나의 추천인 코드를 공유하고 혜택을 받으세요!</h3>
          <p>지인이 가입 시 코드를 입력하면 구매 금액의 일부가 수당으로 적립됩니다.</p>
        </div>
        <Link href="/mypage/referral" className="btn-primary">코드 확인</Link>
      </section>
    </div>
  );
};

export default MyPageHome;
