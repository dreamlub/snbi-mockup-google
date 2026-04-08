import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={`${styles.header} glass`}>
      <div className={`${styles.container} container`}>
        <div className={styles.left}>
          <Link href="/" className={styles.logo}>
            <span className="text-gradient">SNBi</span>
          </Link>
          <nav className={styles.nav}>
            <Link href="/products">쇼핑</Link>
            <Link href="/about">회사소개</Link>
            <Link href="/community">커뮤니티</Link>
            <Link href="/network">나의 네트워크</Link>
          </nav>
        </div>
        
        <div className={styles.right}>
          <div className={styles.searchBar}>
            <input type="text" placeholder="검색어를 입력하세요..." />
          </div>
          <div className={styles.icons}>
            <Link href="/cart">🛒</Link>
            <Link href="/mypage">👤</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
