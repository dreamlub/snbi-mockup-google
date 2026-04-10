'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_PRODUCTS, MOCK_USER } from '@/data/mock';
import styles from './page.module.css';

const CartPage = () => {
  // 초기 목업 데이터로 상태 구성 (실제로는 Context나 Store 사용)
  const [cartItems, setCartItems] = useState([
    { productId: 'p1', quantity: 1 },
    { productId: 'p3', quantity: 2 },
  ]);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => 
      item.productId === id 
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.productId !== id));
  };

  const getProduct = (id: string) => MOCK_PRODUCTS.find(p => p.id === id)!;

  const subtotal = cartItems.reduce((acc, item) => {
    const p = getProduct(item.productId);
    const price = p.gradePrices[MOCK_USER.grade] || p.price;
    return acc + (price * item.quantity);
  }, 0);

  const shippingFee = subtotal > 50000 || cartItems.length === 0 ? 0 : 3000;
  const total = subtotal + shippingFee;

  return (
    <div className={`${styles.container} container`}>
      <h1 className={styles.title}>Cart</h1>
      
      {cartItems.length > 0 ? (
        <div className={styles.cartContent}>
          <div className={styles.listSection}>
            <div className={styles.headerRow}>
              <span>상품 정보</span>
              <span>수량</span>
              <span>주문금액</span>
              <span></span>
            </div>
            
            {cartItems.map(item => {
              const product = getProduct(item.productId);
              const price = product.gradePrices[MOCK_USER.grade] || product.price;
              
              return (
                <div key={item.productId} className={`${styles.cartItem} glass`}>
                  <div className={styles.productInfo}>
                    <img src={product.image} alt={product.name} />
                    <div>
                      <h3>{product.name}</h3>
                      <p className={styles.category}>{product.category}</p>
                    </div>
                  </div>
                  
                  <div className={styles.quantityControl}>
                    <button onClick={() => updateQuantity(item.productId, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, 1)}>+</button>
                  </div>
                  
                  <div className={styles.priceColumn}>
                    <p className={styles.unitPrice}>₩{price.toLocaleString()}</p>
                    <p className={styles.totalPrice}>₩{(price * item.quantity).toLocaleString()}</p>
                  </div>
                  
                  <button className={styles.removeBtn} onClick={() => removeItem(item.productId)}>✕</button>
                </div>
              );
            })}
          </div>

          <aside className={styles.summarySection}>
            <div className={`${styles.summaryCard} glass`}>
              <h2>결제 예정 금액</h2>
              <div className={styles.summaryRow}>
                <span>총 상품 금액</span>
                <span>₩{subtotal.toLocaleString()}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>배송비</span>
                <span>₩{shippingFee.toLocaleString()}</span>
              </div>
              <div className={styles.summaryRow + " " + styles.totalRow}>
                <span>최종 결제 금액</span>
                <span className={styles.finalAmount}>₩{total.toLocaleString()}</span>
              </div>
              
              <Link href="/checkout" className="btn-primary" style={{ display: 'block', textAlign: 'center', marginTop: '20px' }}>
                주문하기
              </Link>
              
              <p className={styles.note}>
                {MOCK_USER.grade} 등급 혜택이 적용된 금액입니다.
              </p>
            </div>
          </aside>
        </div>
      ) : (
        <div className={styles.empty}>
          <p>장바구니가 비어 있습니다.</p>
          <Link href="/products" className="btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>
            쇼핑하러 가기
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
