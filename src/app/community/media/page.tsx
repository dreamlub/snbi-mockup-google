'use client';

import React from 'react';
import styles from './page.module.css';

export default function MediaPage() {
  const mediaItems = [
    {
      id: 1,
      title: 'SNBI 빠사쥬 브랜드 런칭 행사',
      description: 'SNBI의 프리미엄 스킨케어 브랜드 빠사쥬의 공식 런칭 행사 현장을 전합니다.',
      date: '2025.04.01',
      category: '행사',
    },
    {
      id: 2,
      title: '세종 3공장 CIDS 기술 소개',
      description: '세계최초 CIDS 기술이 적용된 빠사쥬 제품의 생산과정과 기술력을 소개합니다.',
      date: '2025.03.15',
      category: '기술',
    },
    {
      id: 3,
      title: 'SNBI 파트너 성공 사례 인터뷰',
      description: 'SNBI 네트워크를 통해 경제적 자유를 실현한 파트너들의 생생한 이야기.',
      date: '2025.02.20',
      category: '인터뷰',
    },
    {
      id: 4,
      title: '2025 SNBI 비전 컨퍼런스',
      description: '2025년 사업 비전과 신제품 로드맵을 공유한 연례 컨퍼런스 현장.',
      date: '2025.01.10',
      category: '행사',
    },
    {
      id: 5,
      title: '빠사쥬 에센스 사용법 가이드',
      description: '빠사쥬 에센스의 올바른 사용법과 최적의 스킨케어 루틴을 안내합니다.',
      date: '2024.12.05',
      category: '가이드',
    },
    {
      id: 6,
      title: 'SNBI 사회공헌 활동 보고',
      description: '지역사회와 함께하는 SNBI의 나눔 활동을 소개합니다.',
      date: '2024.11.18',
      category: '사회공헌',
    },
  ];

  return (
    <div className={`${styles.container} container`}>
      <h1 className={styles.title}>미디어</h1>
      <p className={styles.subtitle}>SNBI의 다양한 소식과 미디어 자료를 만나보세요.</p>

      <div className={styles.grid}>
        {mediaItems.map(item => (
          <div key={item.id} className={`${styles.card} glass`}>
            <div className={styles.thumbnail}>
              <span className={styles.playIcon}>▶</span>
            </div>
            <div className={styles.cardBody}>
              <span className={styles.category}>{item.category}</span>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.description}</p>
              <span className={styles.date}>{item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
