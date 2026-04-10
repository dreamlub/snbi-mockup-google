'use client';

import React from 'react';
import styles from './page.module.css';

const historyData = [
  {
    year: '2023',
    title: '힘찬 도약의 시작',
    events: ['한국특수판매공제조합 가입'],
  },
  {
    year: '2022',
    title: '법인 설립',
    events: ['법인 사업자 등록 (12. 20.)'],
  },
  {
    year: '2018',
    title: '준비하는 2018',
    events: ['기능성 화장품 카라엔톡 출시'],
  },
  {
    year: '2010',
    title: '연구개발의 시작',
    events: ['기능성 화장품 연구개발 착수'],
  },
];

export default function HistoryPage() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className="container">
          <h1 className="text-gradient">SNBI 연혁</h1>
          <p>에스엔비아이가 걸어온 혁신의 여정을 소개합니다.</p>
        </div>
      </section>

      <section className={`${styles.section} container`}>
        <div className={styles.timeline}>
          {historyData.map((item) => (
            <div key={item.year} className={styles.timelineItem}>
              <div className={styles.yearSide}>
                <div className={styles.year}>{item.year}</div>
                <div className={styles.yearTitle}>{item.title}</div>
              </div>
              <div className={styles.lineWrap}>
                <div className={styles.dot} />
                <div className={styles.line} />
              </div>
              <div className={`${styles.events} glass`}>
                {item.events.map((event, i) => (
                  <div key={i} className={styles.event}>{event}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
