'use client';

import React from 'react';
import { MOCK_COMMISSIONS } from '@/data/mock';
import styles from './page.module.css';

const CommissionPage = () => {
  const totalPaid = MOCK_COMMISSIONS
    .filter(c => c.status === 'PAID')
    .reduce((acc, c) => acc + c.amount, 0);
    
  const totalUnpaid = MOCK_COMMISSIONS
    .filter(c => c.status === 'UNPAID')
    .reduce((acc, c) => acc + c.amount, 0);

  return (
    <div className={`${styles.container} container`}>
      <h1 className={styles.title}>수당 내역 조회</h1>
      <p className={styles.subtitle}>발생한 모든 수당 내역과 지급 현황을 확인하세요.</p>

      <div className={styles.statsBar}>
        <div className={`${styles.statCard} glass`}>
          <span>총 누적 수당</span>
          <strong>₩{(totalPaid + totalUnpaid).toLocaleString()}</strong>
        </div>
        <div className={`${styles.statCard} glass`}>
          <span>지급 완료</span>
          <strong className={styles.successText}>₩{totalPaid.toLocaleString()}</strong>
        </div>
        <div className={`${styles.statCard} glass`}>
          <span>지급 대기</span>
          <strong className={styles.warningText}>₩{totalUnpaid.toLocaleString()}</strong>
        </div>
      </div>

      <div className={styles.listSection}>
        <div className={styles.headerRow}>
          <span>발생월</span>
          <span>내역</span>
          <span>금액</span>
          <span>상태</span>
        </div>
        
        {MOCK_COMMISSIONS.map(comm => (
          <div key={comm.id} className={`${styles.commItem} glass`}>
            <div className={styles.month}>{comm.month}</div>
            <div className={styles.source}>{comm.source}</div>
            <div className={styles.amount}>₩{comm.amount.toLocaleString()}</div>
            <div className={`${styles.status} ${comm.status === 'PAID' ? styles.paid : styles.unpaid}`}>
              {comm.status === 'PAID' ? '지급완료' : '지급대기'}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.infoBox + " glass"}>
        <h3>💡 수당 지급 안내</h3>
        <ul>
          <li>수당은 매월 말일 정산되어 다음 달 10일에 등록된 계좌로 지급됩니다.</li>
          <li>지급 대기 상태는 정산이 완료되었으나 아직 송금이 완료되지 않은 상태입니다.</li>
          <li>관련 문의사항은 1:1 문의게시판을 이용해 주세요.</li>
        </ul>
      </div>
    </div>
  );
};

export default CommissionPage;
