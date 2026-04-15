'use client';

import React from 'react';
import styles from './page.module.css';

const AboutPage = () => {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className="text-gradient">SNBI: Future of Beauty & Network</h1>
          <p>우리는 혁신적인 뷰티 솔루션을 통해 모두가 경제적 자유를 누리는 세상을 꿈꿉니다.</p>
        </div>
      </section>

      {/* Philosophy */}
      <section className={`${styles.section} container`}>
        <div className={styles.philosophyGrid}>
          <div className={`${styles.card} glass`}>
            <h3>Innovation</h3>
            <p>세종 3공장과의 협업을 통해 최첨단 바이오 기술이 접목된 제품을 개발합니다.</p>
          </div>
          <div className={`${styles.card} glass`}>
            <h3>Sharing</h3>
            <p>수익의 정당한 분배를 통해 파트너와 함께 성장하는 공유 경제를 실천합니다.</p>
          </div>
          <div className={`${styles.card} glass`}>
            <h3>Trust</h3>
            <p>투명한 네트워크 관리와 검증된 원료 사용으로 고객의 신뢰를 최우선으로 합니다.</p>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className={`${styles.partners} container`}>
        <h2>Our Partners</h2>
        <div className={styles.partnerGrid}>
          <div className={styles.partner}>SEJONG 3RD FACTORY</div>
          <div className={styles.partner}>OREVE JEJU</div>
          <div className={styles.partner}>THE SIENA</div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
