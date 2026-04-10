'use client';

import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function NoticePage() {
  const notices = [
    { id: 36, title: '회원별 수당내역(2026년 2월)', date: '2026.03.16', views: 18 },
    { id: 35, title: 'SNBI 개인정보처리방침 전면 개정 안내', date: '2026.02.06', views: 24 },
    { id: 34, title: '후원수당의 산정 및 지급기준 변경 안내', date: '2025.11.03', views: 109 },
    { id: 33, title: '신용카드 결제문자 안내', date: '2025.10.20', views: 67 },
    { id: 32, title: '회원별 수당내역(2026년 1월)', date: '2026.02.19', views: 38 },
    { id: 31, title: '설 연휴 배송안내', date: '2026.02.03', views: 18 },
    { id: 30, title: '회원별 수당내역(2025년 12월)', date: '2026.01.26', views: 47 },
    { id: 29, title: '추석연휴 배송안내', date: '2025.09.22', views: 63 },
    { id: 28, title: '택배 없는 날 및 광복절 배송공지', date: '2025.08.12', views: 66 },
    { id: 27, title: '신규고객 첫 구매 프로모션 안내', date: '2025.04.07', views: 228 },
  ];

  return (
    <div className={`${styles.container} container`}>
      <h1 className={styles.title}>공지사항</h1>
      <p className={styles.subtitle}>SNBI의 주요 공지와 안내사항을 확인하세요.</p>

      <div className={styles.boardHeader}>
        <span className={styles.total}>총 <strong>{notices.length}</strong>건</span>
        <div className={styles.search}>
          <input type="text" placeholder="검색어를 입력하세요" />
        </div>
      </div>

      <div className={`${styles.boardTable} glass`}>
        <div className={styles.tableHeader}>
          <span>번호</span>
          <span>제목</span>
          <span>날짜</span>
          <span>조회수</span>
        </div>

        {notices.map(notice => (
          <div key={notice.id} className={styles.tableRow}>
            <span>{notice.id}</span>
            <Link href={`/community/notice/${notice.id}`} className={styles.postTitle}>
              {notice.title}
            </Link>
            <span>{notice.date}</span>
            <span>{notice.views}</span>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        <button className={styles.pageActive}>1</button>
        <button>2</button>
        <button>3</button>
      </div>
    </div>
  );
}
