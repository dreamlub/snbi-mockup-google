'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const OrdersPage = () => {
  const [filter, setFilter] = useState('ALL');

  const orders = [
    { id: 'ORD-20240409-12345', date: '2024-04-09', name: '빠사쥬 프리미엄 에센스 外 1건', price: 132000, status: '주문완료', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=200' },
    { id: 'ORD-20240405-99881', date: '2024-04-05', name: '수리모 리페어링 샴푸', price: 36000, status: '배송중', image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=200' },
    { id: 'ORD-20240328-77612', date: '2024-03-28', name: '아스릭손 센트럴 로션', price: 68000, status: '배송완료', image: 'https://images.unsplash.com/photo-1594125350485-3b94107198bb?q=80&w=200' },
  ];

  const filteredOrders = filter === 'ALL' ? orders : orders.filter(o => o.status === filter);

  return (
    <div className={`${styles.container} container`}>
      <h1 className={styles.title}>주문/배송 조회</h1>

      <div className={styles.statusTabs}>
        {['ALL', '주문완료', '배송중', '배송완료', '취소/반품'].map(s => (
          <button 
            key={s} 
            className={`${styles.tab} ${filter === s ? styles.activeTab : ''}`}
            onClick={() => setFilter(s)}
          >
            {s === 'ALL' ? '전체' : s}
          </button>
        ))}
      </div>

      <div className={styles.orderList}>
        {filteredOrders.map(order => (
          <div key={order.id} className={`${styles.orderCard} glass`}>
            <div className={styles.orderHeader}>
              <span className={styles.date}>{order.date}</span>
              <span className={styles.orderId}>주문번호: {order.id}</span>
              <Link href={`/orders/${order.id}`} className={styles.detailLink}>주문상세 &gt;</Link>
            </div>
            <div className={styles.orderBody}>
              <img src={order.image} alt={order.name} className={styles.productThumb} />
              <div className={styles.orderInfo}>
                <div className={styles.statusBadge}>{order.status}</div>
                <h3 className={styles.orderName}>{order.name}</h3>
                <p className={styles.price}>₩{order.price.toLocaleString()}</p>
              </div>
              <div className={styles.actions}>
                <button className={styles.actionBtn}>배송조회</button>
                {order.status === '배송완료' && <button className={styles.actionBtn}>교환/반품 신청</button>}
              </div>
            </div>
          </div>
        ))}
        {filteredOrders.length === 0 && (
          <div className={styles.empty}>
            <p>해당하는 주문 내역이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
