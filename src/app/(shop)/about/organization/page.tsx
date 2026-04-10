'use client';

import React from 'react';
import styles from './page.module.css';

export default function OrganizationPage() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className="container">
          <h1 className="text-gradient">SNBI 조직</h1>
          <p>주식회사 에스엔비아이의 조직 구성을 소개합니다.</p>
        </div>
      </section>

      <section className={`${styles.section} container`}>
        {/* 대표이사 */}
        <div className={styles.orgChart}>
          <div className={`${styles.ceoCard} glass`}>
            <h3>대표이사</h3>
            <p>정영재</p>
          </div>

          {/* 이사회 라인 */}
          <div className={styles.boardRow}>
            <div className={`${styles.boardCard} glass`}>이사회</div>
            <div className={`${styles.boardCard} glass`}>사외고문</div>
            <div className={`${styles.boardCard} glass`}>사외이사</div>
          </div>

          <div className={styles.divider} />

          <div className={`${styles.pmCard} glass`}>
            <h4>프로젝트 매니저</h4>
          </div>

          {/* 부서 */}
          <div className={styles.deptGrid}>
            <div className={`${styles.deptCard} glass`}>
              <h3>연구개발팀</h3>
              <ul>
                <li>Cosmetics 개발</li>
                <li>Medical Treatments 개발</li>
              </ul>
            </div>
            <div className={`${styles.deptCard} glass`}>
              <h3>마케팅팀</h3>
              <ul>
                <li>온라인 마케팅</li>
                <li>오프라인 마케팅</li>
                <li>고객상담</li>
              </ul>
            </div>
            <div className={`${styles.deptCard} glass`}>
              <h3>지원팀</h3>
              <ul>
                <li>파트너 교육</li>
                <li>회계관리</li>
                <li>업무지원</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.infoSection} container`}>
        <div className={`${styles.companyInfo} glass`}>
          <div className={styles.infoItem}><strong>회사명</strong><span>주식회사 에스엔비아이</span></div>
          <div className={styles.infoItem}><strong>대표이사</strong><span>정영재</span></div>
          <div className={styles.infoItem}><strong>주소</strong><span>대구광역시 동구 매여로2길 53(매여동)</span></div>
          <div className={styles.infoItem}><strong>대표번호</strong><span>1600-1559</span></div>
          <div className={styles.infoItem}><strong>이메일</strong><span>master@snbi.co.kr</span></div>
          <div className={styles.infoItem}><strong>웹사이트</strong><span>www.snbi.co.kr / www.pasazu.com</span></div>
        </div>
      </section>
    </div>
  );
}
