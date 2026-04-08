'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MOCK_USER } from '@/data/mock';
import styles from './MyPageLayout.module.css';

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: '마이페이지 홈', href: '/mypage' },
    { name: '주문/배송 조회', href: '/orders' },
    { name: '개인정보 수정', href: '/mypage/profile' },
    { name: '추천인 코드', href: '/mypage/referral' },
    { name: '수당 계좌 관리', href: '/mypage/bank' },
    { name: '1:1 문의', href: '/mypage/inquiries' },
  ];

  return (
    <div className={`${styles.container} container`}>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={`${styles.profileCard} glass`}>
            <div className={styles.avatar}>👤</div>
            <div className={styles.name}>{MOCK_USER.name}님</div>
            <div className={`${styles.grade} ${styles.gold}`}>GOLD</div>
          </div>
          <nav className={styles.sideNav}>
            {navItems.map(item => (
              <Link 
                key={item.href} 
                href={item.href}
                className={pathname === item.href ? styles.active : ''}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </aside>
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  );
}
