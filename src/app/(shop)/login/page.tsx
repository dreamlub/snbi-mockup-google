'use client';

import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.card} glass`}>
        <div className={styles.header}>
          <Link href="/" className={styles.logo}>
            <span className="text-gradient">SNBI</span>
          </Link>
          <h1>환영합니다</h1>
          <p>프리미엄 뷰티 솔루션 SNBI에 로그인하세요.</p>
        </div>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.group}>
            <label>이메일</label>
            <input type="email" placeholder="example@email.com" />
          </div>
          <div className={styles.group}>
            <label>비밀번호</label>
            <input type="password" placeholder="••••••••" />
          </div>
          
          <div className={styles.extra}>
            <label className={styles.checkbox}>
              <input type="checkbox" /> 로그인 상태 유지
            </label>
            <Link href="/forgot-password" className={styles.link}>비밀번호 찾기</Link>
          </div>

          <button type="submit" className="btn-primary">로그인</button>
        </form>

        <div className={styles.divider}>
          <span>OR</span>
        </div>

        <div className={styles.social}>
          <button className={styles.kakao}>카카오 로그인</button>
          <button className={styles.naver}>네이버 로그인</button>
        </div>

        <div className={styles.footer}>
          계정이 없으신가요? <Link href="/signup" className={styles.signupLink}>회원가입</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
