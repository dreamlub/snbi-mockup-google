'use client';

import React from 'react';
import styles from './page.module.css';

export default function VisionPage() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className="container">
          <h1 className="text-gradient">SNBI 비전</h1>
          <p className={styles.slogan}>더불어 함께하는 신뢰의 기업</p>
          <p className={styles.subSlogan}>고객과의 신뢰를 통해 성장을 추구하는 기업</p>
        </div>
      </section>

      <section className={`${styles.section} container`}>
        <div className={styles.coreGrid}>
          <div className={`${styles.coreCard} glass`}>
            <div className={styles.coreIcon}>🔬</div>
            <h3>연구개발 중심</h3>
            <p>고객지향적 제품 개발</p>
            <span className={styles.tag}>R&amp;D 우수기업</span>
          </div>
          <div className={`${styles.coreCard} glass`}>
            <div className={styles.coreIcon}>💎</div>
            <h3>고객중심</h3>
            <p>미래지향적 가치 공유</p>
            <span className={styles.tag}>성장동력</span>
          </div>
          <div className={`${styles.coreCard} glass`}>
            <div className={styles.coreIcon}>🌏</div>
            <h3>글로벌 경영</h3>
            <p>세계를 향한 힘찬 도약</p>
            <span className={styles.tag}>글로벌기업</span>
          </div>
        </div>
      </section>

      <section className={`${styles.section} container`}>
        <h2 className={styles.sectionTitle}>기업가치</h2>
        <div className={styles.valueList}>
          <div className={`${styles.valueItem} glass`}>
            <div className={styles.valueNumber}>01</div>
            <div>
              <h3>당신의 생각에 도전하는 기업가치</h3>
              <p>
                변화와 차별화, 창의적 디자인을 추구하며 역동적이면서도 심플한 기능성으로
                사용자 편의를 제공합니다. 신뢰 기반의 파트너십과 함께 비즈니스를 디자인합니다.
              </p>
            </div>
          </div>
          <div className={`${styles.valueItem} glass`}>
            <div className={styles.valueNumber}>02</div>
            <div>
              <h3>생각에 공감하며 상생하는 기업가치</h3>
              <p>
                과거에 안주하지 않는 태도, 변화와 혁신을 추구하는 기업 정신으로
                신뢰 기반 파트너 관계를 구축하며 함께 성장합니다.
              </p>
            </div>
          </div>
          <div className={`${styles.valueItem} glass`}>
            <div className={styles.valueNumber}>03</div>
            <div>
              <h3>당신의 생각을 존중하는 기업가치</h3>
              <p>
                창의적 디자인 지향과 웹표준 준수, 신뢰 기반 경영 철학으로
                고객과 파트너 모두가 존중받는 기업 문화를 만들어 갑니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
