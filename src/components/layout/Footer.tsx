import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} container`}>
        <div className={styles.top}>
          <div className={styles.info}>
            <h2 className="text-gradient">SNBi</h2>
            <p>(주) 에스엔비아이 | 대표이사: 홍길동</p>
            <p>서울특별시 강남구 테헤란로 123 SNBi 빌딩</p>
            <p>사업자등록번호: 123-45-67890 | 통신판매업신고: 제2024-서울강남-1234호</p>
          </div>
          <div className={styles.links}>
            <div>
              <h3>고객센터</h3>
              <p>1588-1234</p>
              <p>평일 09:00 ~ 18:00 (주말/공휴일 휴무)</p>
            </div>
            <nav className={styles.footerNav}>
              <a href="#">이용약관</a>
              <a href="#">개인정보처리방침</a>
              <a href="#">운영정책</a>
            </nav>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>© 2024 SNBi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
