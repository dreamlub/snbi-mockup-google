'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_USER, MOCK_PRODUCTS } from '@/data/mock';
import styles from './page.module.css';

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  // 간단한 장바구니 요약 (실제로는 서버/상태에서 가져옴)
  const items = [
    { id: 'p1', name: '빠사쥬 프리미엄 에센스', price: 96000, quantity: 1 },
    { id: 'p3', name: '수리모 리페어링 샴푸', price: 36000, quantity: 2 },
  ];

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal;

  return (
    <div className={`${styles.container} container`}>
      <h1 className={styles.title}>Checkout</h1>
      
      <div className={styles.content}>
        <div className={styles.formSection}>
          {/* Shipping Address */}
          <section className={`${styles.card} glass`}>
            <h2>배송지 정보</h2>
            <div className={styles.addressBox}>
              <div className={styles.addressHeader}>
                <span className={styles.name}>{MOCK_USER.name}</span>
                <span className={styles.defaultBadge}>기본배송지</span>
              </div>
              <p className={styles.addressText}>서울특별시 강남구 테헤란로 123 (역삼동)</p>
              <p className={styles.phone}>{MOCK_USER.phoneNumber}</p>
              <button className={styles.changeBtn}>배송지 변경</button>
            </div>
            <div className={styles.memo}>
              <select className={styles.select}>
                <option>배송 요청사항을 선택해주세요</option>
                <option>문 앞에 놓아주세요</option>
                <option>직접 받겠습니다</option>
                <option>부재 시 경비실에 맡겨주세요</option>
              </select>
            </div>
          </section>

          {/* Payment Method */}
          <section className={`${styles.card} glass`}>
            <h2>결제 수단</h2>
            <div className={styles.paymentGrid}>
              <label className={`${styles.paymentItem} ${paymentMethod === 'card' ? styles.activePayment : ''}`}>
                <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                신용/체크카드
              </label>
              <label className={`${styles.paymentItem} ${paymentMethod === 'transfer' ? styles.activePayment : ''}`}>
                <input type="radio" name="payment" value="transfer" checked={paymentMethod === 'transfer'} onChange={() => setPaymentMethod('transfer')} />
                실시간 계좌이체
              </label>
              <label className={`${styles.paymentItem} ${paymentMethod === 'kakao' ? styles.activePayment : ''}`}>
                <input type="radio" name="payment" value="kakao" checked={paymentMethod === 'kakao'} onChange={() => setPaymentMethod('kakao')} />
                카카오페이
              </label>
              <label className={`${styles.paymentItem} ${paymentMethod === 'tosspay' ? styles.activePayment : ''}`}>
                <input type="radio" name="payment" value="tosspay" checked={paymentMethod === 'tosspay'} onChange={() => setPaymentMethod('tosspay')} />
                토스페이
              </label>
            </div>
          </section>
        </div>

        <aside className={styles.summarySection}>
          <div className={`${styles.summaryCard} glass`}>
            <h2>주문 상품 ({items.length})</h2>
            <div className={styles.itemList}>
              {items.map(item => (
                <div key={item.id} className={styles.item}>
                  <span>{item.name} x {item.quantity}</span>
                  <span>₩{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            
            <div className={styles.priceSummary}>
              <div className={styles.row}>
                <span>총 상품 금액</span>
                <span>₩{subtotal.toLocaleString()}</span>
              </div>
              <div className={styles.row}>
                <span>배송비</span>
                <span>무료</span>
              </div>
              <div className={styles.row + " " + styles.totalRow}>
                <span>최종 결제 금액</span>
                <span className={styles.totalAmount}>₩{total.toLocaleString()}</span>
              </div>
            </div>

            <div className={styles.agreement}>
              <label>
                <input type="checkbox" /> 위 주문 내용을 확인하였으며, 결제에 동의합니다.
              </label>
            </div>

            <Link href="/checkout/complete" className="btn-primary" style={{ display: 'block', textAlign: 'center', marginTop: '20px' }}>
              {total.toLocaleString()}원 결제하기
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CheckoutPage;
