'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MOCK_USER } from '@/data/mock';
import styles from './MyPageLayout.module.css';

const gradeConfig: Record<string, { label: string; className: string }> = {
  NORMAL: { label: 'NORMAL', className: styles.gradeNormal },
  SILVER: { label: 'SILVER', className: styles.gradeSilver },
  GOLD:   { label: 'GOLD',   className: styles.gradeGold },
  VIP:    { label: 'VIP',    className: styles.gradeVip },
};

const navItems = [
  { name: '마이페이지 홈',   href: '/mypage',                icon: '🏠' },
  { name: '주문/배송 조회', href: '/mypage/orders',          icon: '📦' },
  { name: '구독 관리',       href: '/mypage/subscriptions',  icon: '🔄' },
  { name: '개인정보 수정',   href: '/mypage/profile',        icon: '✏️' },
  { name: '1:1 문의',        href: '/mypage/inquiries',      icon: '💬' },
];

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const grade = gradeConfig[MOCK_USER.grade] ?? gradeConfig.NORMAL;

  return (
    <div className={`${styles.container} container`}>
      <div className={styles.layout}>
        {/* ── Sidebar ── */}
        <aside className={styles.sidebar}>
          <div className={`${styles.profileCard} glass`}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatar}>👤</div>
              <div className={styles.avatarRing} />
            </div>
            <div className={styles.name}>{MOCK_USER.name}님</div>
            <span className={`${styles.gradeBadge} ${grade.className}`}>
              {grade.label}
            </span>
            <div className={styles.referralCode}>
              <span>{MOCK_USER.referralCode}</span>
            </div>
          </div>

          <nav className={styles.sideNav}>
            {navItems.map(item => {
              const isActive =
                item.href === '/mypage'
                  ? pathname === '/mypage'
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span>{item.name}</span>
                  {isActive && <span className={styles.activeIndicator} />}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* ── Main ── */}
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
