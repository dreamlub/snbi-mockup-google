'use client';

import React from 'react';
import styles from './page.module.css';

export default function IntroPage() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className="container">
          <p className={styles.subtitle}>Simple and Beauty International</p>
          <h1 className="text-gradient">고객과의 신뢰를 통해<br />성장을 추구하는 에스엔비아이</h1>
        </div>
      </section>

      <section className={`${styles.section} container`}>
        <div className={`${styles.messageBox} glass`}>
          <p className={styles.message}>
            더불어 함께 살아가야하는 세상을 만들고 함께 나누는 에스앤비아이입니다.<br />
            언제나 변화와 차별화, 창의적인 기업가 정신으로 미래를 향해 전진하겠습니다.
          </p>
          <p className={styles.policy}>
            오직 소비자 중심 — 소비자의 이익을 위하여 최선을 다하는 기업이 되도록 하겠습니다.
          </p>
          <p className={styles.ceo}>대표이사 정영재</p>
        </div>
      </section>

      <section className={`${styles.section} container`}>
        <h2 className={styles.sectionTitle}>SNBI만의 차별화</h2>
        <div className={styles.featureGrid}>
          <div className={`${styles.featureCard} glass`}>
            <div className={styles.featureNumber}>01</div>
            <h3>판매강요를 않는다</h3>
            <p>좋은 제품을 사용 후 3명에게만 추천하면 됩니다. 부담 없는 자연스러운 공유가 SNBI의 방식입니다.</p>
          </div>
          <div className={`${styles.featureCard} glass`}>
            <div className={styles.featureNumber}>02</div>
            <h3>쌓아 둘 필요 없다</h3>
            <p>1인 1세트 구매 제한으로 불필요한 재고 부담이 없습니다. 필요한 만큼만 구매하세요.</p>
          </div>
          <div className={`${styles.featureCard} glass`}>
            <div className={styles.featureNumber}>03</div>
            <h3>나만 쓰면 되니까</h3>
            <p>개인이 직접 사용하고 만족한 후 소개만 진행하면 됩니다. 진정한 체험 기반 추천입니다.</p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} container`}>
        <h2 className={styles.sectionTitle}>기업 가치</h2>
        <div className={styles.valueGrid}>
          <div className={`${styles.valueCard} glass`}>
            <h3>도전하는 기업가치</h3>
            <p>
              과감한 R&amp;D 투자와 세계최초 CIDS 기술 적용 프리미엄 화장품 &lsquo;빠사쥬&rsquo;를 개발하며,
              끊임없는 연구개발로 차별화된 제품을 선보입니다.
            </p>
          </div>
          <div className={`${styles.valueCard} glass`}>
            <h3>변화하는 미래가치</h3>
            <p>
              고객 만족을 기반으로 성장하며, 판매공제조합 가입과 네트워크시스템 도입을 통해
              신뢰 기반 파트너십의 선순환 비즈니스 모델을 구축합니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
