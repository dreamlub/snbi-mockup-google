'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_USER, MOCK_COMMISSIONS } from '@/data/mock';
import styles from './page.module.css';

/* ── Mock Data ── */
const QUICK_STATS = [
  { label: '주문 내역',  count: 3,  unit: '건', icon: '📦', href: '/mypage/orders' },
  { label: '찜한 상품', count: 12, unit: '개', icon: '❤️', href: '/products' },
  { label: '나의 리뷰', count: 5,  unit: '개', icon: '✏️', href: '/mypage/orders' },
];

const ATTENDANCE = {
  streak: 7,
  total: 18,
  daysInMonth: 30,
  checked: [1,2,3,5,6,7,8,9,14,15,16,21,22,23,24,25,26,28],
};

const RECENT_ORDERS = [
  { id: 'ORD-20240409-12345', date: '2024-04-09', name: '빠사쥬 프리미엄 에센스 外 1건', price: 132000, status: '배송중',  statusColor: 'info' },
  { id: 'ORD-20240405-99881', date: '2024-04-05', name: '수리모 리페어링 샴푸',           price: 36000,  status: '배송완료', statusColor: 'success' },
  { id: 'ORD-20240328-77612', date: '2024-03-28', name: '아스릭손 센트럴 로션',           price: 68000,  status: '구매확정', statusColor: 'muted' },
];

const SUBSCRIPTION = {
  name: '빠사쥬 평생 구독 플랜',
  nextDate: '2024-05-10',
  amount: 79000,
  status: '활성',
};

/* ── Component ── */
export default function MyPageHome() {
  const [copied, setCopied] = useState(false);
  const thisMonthCommission = MOCK_COMMISSIONS
    .filter(c => c.month === '2024-04')
    .reduce((s, c) => s + c.amount, 0);

  const handleCopy = () => {
    navigator.clipboard.writeText(MOCK_USER.referralCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const today = 10; // mock: 오늘 날짜

  return (
    <div className={styles.dashboard}>

      {/* ── 상단 헤더 배너 ── */}
      <section className={`${styles.heroBanner} glass`}>
        <div className={styles.heroLeft}>
          <p className={styles.heroGreeting}>안녕하세요, <strong>{MOCK_USER.name}</strong>님 👋</p>
          <p className={styles.heroSub}>오늘도 SNBi와 함께하는 하루 되세요.</p>
          <div className={styles.referralRow}>
            <span className={styles.referralLabel}>나의 추천코드</span>
            <code className={styles.referralValue}>{MOCK_USER.referralCode}</code>
            <button onClick={handleCopy} className={styles.copyBtn} id="copy-referral-btn">
              {copied ? '✅ 복사됨' : '복사'}
            </button>
          </div>
        </div>
        <div className={styles.heroRight}>
          <div className={styles.commissionCard}>
            <span className={styles.commissionLabel}>이달 예정 수당</span>
            <strong className={styles.commissionAmount}>
              ₩{thisMonthCommission.toLocaleString()}
            </strong>
            <Link href="/commission" className={styles.commissionLink}>
              수당 내역 보기 →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 빠른 조회 위젯 ── */}
      <section className={styles.quickGrid}>
        {QUICK_STATS.map(stat => (
          <Link key={stat.label} href={stat.href} className={`${styles.quickCard} glass`} id={`quick-${stat.label}`}>
            <span className={styles.quickIcon}>{stat.icon}</span>
            <strong className={styles.quickCount}>{stat.count}<em>{stat.unit}</em></strong>
            <span className={styles.quickLabel}>{stat.label}</span>
          </Link>
        ))}
      </section>

      {/* ── 출석체크 현황 ── */}
      <section className={`${styles.attendanceSection} glass`}>
        <div className={styles.sectionHeader}>
          <h2>📅 출석 체크 현황</h2>
          <div className={styles.streakBadge}>🔥 {ATTENDANCE.streak}일 연속</div>
        </div>
        <p className={styles.attendanceSub}>이번 달 총 <strong>{ATTENDANCE.total}일</strong> 출석</p>
        <div className={styles.calendarGrid}>
          {Array.from({ length: ATTENDANCE.daysInMonth }, (_, i) => i + 1).map(day => {
            const checked = ATTENDANCE.checked.includes(day);
            const isToday = day === today;
            return (
              <div
                key={day}
                className={`${styles.calDay} ${checked ? styles.calChecked : ''} ${isToday ? styles.calToday : ''}`}
              >
                {day}
              </div>
            );
          })}
        </div>
        <div className={styles.attendanceProgress}>
          <div
            className={styles.progressBar}
            style={{ width: `${(ATTENDANCE.total / ATTENDANCE.daysInMonth) * 100}%` }}
          />
        </div>
        <p className={styles.progressLabel}>
          {ATTENDANCE.total}/{ATTENDANCE.daysInMonth}일 달성
        </p>
      </section>

      {/* ── 최근 주문 ── */}
      <section className={`${styles.orderSection} glass`}>
        <div className={styles.sectionHeader}>
          <h2>📦 최근 주문 내역</h2>
          <Link href="/mypage/orders" className={styles.moreLink} id="link-all-orders">전체보기 →</Link>
        </div>
        <div className={styles.orderList}>
          {RECENT_ORDERS.map(order => (
            <div key={order.id} className={styles.orderRow}>
              <div className={styles.orderMeta}>
                <span className={styles.orderDate}>{order.date}</span>
                <span className={styles.orderId}>{order.id}</span>
              </div>
              <span className={styles.orderName}>{order.name}</span>
              <div className={styles.orderRight}>
                <span className={styles.orderPrice}>₩{order.price.toLocaleString()}</span>
                <span className={`${styles.statusBadge} ${styles[`status_${order.statusColor}`]}`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 구독 현황 ── */}
      <section className={`${styles.subscriptionSection} glass`}>
        <div className={styles.sectionHeader}>
          <h2>🔄 구독 현황</h2>
          <Link href="/mypage/subscriptions" className={styles.moreLink} id="link-subscriptions">관리하기 →</Link>
        </div>
        <div className={styles.subscriptionCard}>
          <div className={styles.subInfo}>
            <p className={styles.subName}>{SUBSCRIPTION.name}</p>
            <p className={styles.subMeta}>다음 결제일: <strong>{SUBSCRIPTION.nextDate}</strong> &nbsp;|&nbsp; ₩{SUBSCRIPTION.amount.toLocaleString()}/월</p>
          </div>
          <span className={styles.subStatus}>{SUBSCRIPTION.status}</span>
        </div>
      </section>

    </div>
  );
}
