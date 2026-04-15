'use client';

import React, { useState } from 'react';
import { MOCK_USER } from '@/data/mock';
import styles from './page.module.css';

const ReferralPage = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(MOCK_USER.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>나의 추천인 코드</h1>
      <p className={styles.subtitle}>지인에게 SNBI를 추천하고 함께 성장하는 기쁨을 누리세요.</p>

      <div className={`${styles.codeCard} glass`}>
        <div className={styles.label}>나의 고유 코드</div>
        <div className={styles.codeRow}>
          <span className={styles.code}>{MOCK_USER.referralCode}</span>
          <button className={styles.copyBtn} onClick={handleCopy}>
            {copied ? '복사됨!' : '코드 복사'}
          </button>
        </div>
      </div>

      <div className={styles.benefitSection}>
        <h2>추천인 혜택 안내</h2>
        <div className={styles.benefitGrid}>
          <div className={`${styles.benefitItem} glass`}>
            <h3>구매 수당 적립</h3>
            <p>직접 추천한 지인이 상품 구매 시, 결제 금액의 5~10%가 수당으로 실시간 적립됩니다.</p>
          </div>
          <div className={`${styles.benefitItem} glass`}>
            <h3>네트워크 보너스</h3>
            <p>추천한 지인이 또 다른 회원을 추천할 경우, 하위 네트워크 실적에 따른 추가 보너스가 지급됩니다.</p>
          </div>
        </div>
      </div>

      <div className={styles.shareSection}>
        <p>친구에게 바로 공유하기</p>
        <div className={styles.shareIcons}>
          <button className={styles.kakao}>카카오톡</button>
          <button className={styles.link}>URL 링크</button>
        </div>
      </div>
    </div>
  );
};

export default ReferralPage;
