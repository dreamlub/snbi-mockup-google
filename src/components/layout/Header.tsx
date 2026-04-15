'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

// 목업: 로그인 상태 (실제 구현 시 auth context로 교체)
const IS_LOGGED_IN = false;

const Header = () => {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const aboutTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const communityTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleAboutEnter = () => {
    if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
    setAboutOpen(true);
  };

  const handleAboutLeave = () => {
    aboutTimeoutRef.current = setTimeout(() => setAboutOpen(false), 150);
  };

  const handleCommunityEnter = () => {
    if (communityTimeoutRef.current) clearTimeout(communityTimeoutRef.current);
    setCommunityOpen(true);
  };

  const handleCommunityLeave = () => {
    communityTimeoutRef.current = setTimeout(() => setCommunityOpen(false), 150);
  };

  return (
    <header className={`${styles.header} glass`}>
      <div className={`${styles.container} container`}>
        <div className={styles.left}>
          <Link href="/" className={styles.logo}>
            <span className="text-gradient">SNBI</span>
          </Link>
          <nav className={styles.nav}>
            <div
              className={styles.dropdown}
              onMouseEnter={handleAboutEnter}
              onMouseLeave={handleAboutLeave}
            >
              <Link href="/about" className={styles.dropdownTrigger}>
                회사소개 <span className={styles.arrow}>▼</span>
              </Link>
              {aboutOpen && (
                <div className={`${styles.dropdownMenu} glass`}>
                  <Link href="/about/intro">SNBI 소개</Link>
                  <Link href="/about/vision">SNBI 비전</Link>
                  <Link href="/about/history">SNBI 연혁</Link>
                  <Link href="/about/organization">SNBI 조직</Link>
                  <Link href="/about/directions">SNBI 오시는 길</Link>
                </div>
              )}
            </div>
            <Link href="/products">쇼핑몰</Link>
            <div
              className={styles.dropdown}
              onMouseEnter={handleCommunityEnter}
              onMouseLeave={handleCommunityLeave}
            >
              <Link href="/community" className={styles.dropdownTrigger}>
                커뮤니티 <span className={styles.arrow}>▼</span>
              </Link>
              {communityOpen && (
                <div className={`${styles.dropdownMenu} glass`}>
                  <Link href="/community/notice">공지사항</Link>
                  <Link href="/community/media">미디어</Link>
                  <Link href="/community/contact-us">Contact Us</Link>
                </div>
              )}
            </div>
            <Link href="/network">나의 네트워크</Link>
            <Link href="/search/members">조합원 검색</Link>
          </nav>
        </div>

        <div className={styles.right}>
          <div className={styles.searchBar}>
            <input type="text" placeholder="검색어를 입력하세요..." />
          </div>
          {IS_LOGGED_IN ? (
            <div className={styles.icons}>
              <Link href="/cart" title="장바구니">🛒</Link>
              <Link href="/mypage" title="마이페이지">👤</Link>
            </div>
          ) : (
            <div className={styles.authBtns}>
              <Link href="/login" className={styles.loginBtn}>로그인</Link>
              <Link href="/signup" className={styles.signupBtn}>회원가입</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
