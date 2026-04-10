'use client';

import React from 'react';
import styles from './page.module.css';

export default function DirectionsPage() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className="container">
          <h1 className="text-gradient">SNBI 오시는 길</h1>
          <p>주식회사 에스엔비아이 본사를 방문하시는 방법을 안내드립니다.</p>
        </div>
      </section>

      <section className={`${styles.section} container`}>
        <div className={styles.grid}>
          <div className={`${styles.mapPlaceholder} glass`}>
            <iframe
              src="https://www.google.com/maps?q=대구광역시+동구+매여로2길+53&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '16px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SNBI 본사 위치"
            />
          </div>

          <div className={styles.info}>
            <div className={`${styles.infoCard} glass`}>
              <h3>본사 주소</h3>
              <p>대구광역시 동구 매여로2길 53(매여동)</p>
            </div>
            <div className={`${styles.infoCard} glass`}>
              <h3>버스 이용</h3>
              <p><strong>정류소</strong> — 용계삼거리</p>
              <p><strong>버스번호</strong> — 동구5</p>
            </div>
            <div className={`${styles.infoCard} glass`}>
              <h3>지하철 이용</h3>
              <p><strong>노선</strong> — 1호선</p>
              <p><strong>역</strong> — 용계역 또는 율하역</p>
              <p>용계역 또는 율하역에서 내려 매여동 방향 버스 또는 택시 이용</p>
            </div>
            <div className={`${styles.infoCard} glass`}>
              <h3>자가용 이용</h3>
              <p>동대구IC에서 12분 소요</p>
              <p>내비게이션: 매여로2길 53</p>
            </div>
            <div className={`${styles.infoCard} glass`}>
              <h3>연락처</h3>
              <p><strong>대표번호</strong> — 1600-1559</p>
              <p><strong>이메일</strong> — master@snbi.co.kr</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
