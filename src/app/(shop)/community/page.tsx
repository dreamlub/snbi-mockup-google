'use client';

import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const CommunityPage = () => {
  const posts = [
    { id: 1, title: '[공지] SNBI 프리미엄 구독 서비스 혜택 안내', author: '관리자', date: '2024-04-01', views: 1250, type: 'NOTICE' },
    { id: 2, title: '세종 3공장 방문기: 최고의 퀄리티를 유지하는 비결', author: '박효신', date: '2024-04-05', views: 450, type: 'INFO' },
    { id: 3, title: '빠사쥬 에센스 사용 2주 만에 피부 광채가 달라졌어요!', author: '이미주', date: '2024-04-07', views: 890, type: 'REVIEW' },
    { id: 4, title: '네트워크 수당 지급일에 대해 궁금합니다.', author: '김광석', date: '2024-04-08', views: 210, type: 'QNA' },
  ];

  return (
    <div className={`${styles.container} container`}>
      <h1 className={styles.title}>커뮤니티</h1>
      <p className={styles.subtitle}>SNBI 파트너들과 함께 정보를 나누고 소통하세요.</p>

      <div className={styles.boardHeader}>
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${styles.activeTab}`}>전체</button>
          <button className={styles.tab}>공지사항</button>
          <button className={styles.tab}>정보공유</button>
          <button className={styles.tab}>구매후기</button>
        </div>
        <div className={styles.search}>
          <input type="text" placeholder="검색어를 입력하세요" />
        </div>
      </div>

      <div className={`${styles.boardTable} glass`}>
        <div className={styles.tableHeader}>
          <span>번호</span>
          <span>제목</span>
          <span>작성자</span>
          <span>날짜</span>
          <span>조회수</span>
        </div>
        
        {posts.map(post => (
          <div key={post.id} className={styles.tableRow}>
            <span>{post.id}</span>
            <Link href={`/community/${post.id}`} className={styles.postTitle}>
              {post.type === 'NOTICE' && <span className={styles.noticeBadge}>공지</span>}
              {post.title}
            </Link>
            <span>{post.author}</span>
            <span>{post.date}</span>
            <span>{post.views}</span>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <button className="btn-primary">글쓰기</button>
      </div>
    </div>
  );
};

export default CommunityPage;
