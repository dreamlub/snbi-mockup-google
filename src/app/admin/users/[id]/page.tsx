'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';
import { MOCK_ADMIN_USERS } from '@/data/mock';

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [user, setUser] = useState(MOCK_ADMIN_USERS.find(u => u.id === params.id));
  const [activeTab, setActiveTab] = useState('basic');
  const [isSanctionModalOpen, setIsSanctionModalOpen] = useState(false);
  const [isNetworkModalOpen, setIsNetworkModalOpen] = useState(false);
  const [sanctionReason, setSanctionReason] = useState('');

  if (!user) {
    return (
      <div className={styles.container}>
        <h2>사용자를 찾을 수 없습니다.</h2>
        <button className={styles.btnOutline} onClick={() => router.back()}>뒤로 가기</button>
      </div>
    );
  }

  const handleSave = () => {
    alert('회원 정보가 저장되었습니다. (UI 전용)');
  };

  const handleSanction = () => {
    alert(`제재 처리 완료: ${sanctionReason}`);
    setIsSanctionModalOpen(false);
    setUser({ ...user, isActive: false });
  };

  return (
    <div className={styles.container}>
      <div style={{ marginBottom: '10px' }}>
        <Link href="/admin/users" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>
          ← 회원 목록으로 돌아가기
        </Link>
      </div>

      <div className={styles.header}>
        <div className={styles.titleArea}>
          <h1>{user.name}</h1>
          <span className={`${styles.gradeBadge} ${styles['grade_' + user.grade]}`}>{user.grade}</span>
          {!user.isActive && <span style={{ color: '#d94040', fontSize: '0.9rem', fontWeight: 'bold' }}>[정지됨]</span>}
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnDanger} onClick={() => setIsSanctionModalOpen(true)}>제재 (정지/차단)</button>
          <button className={styles.btnPrimary} onClick={handleSave}>변경사항 저장</button>
        </div>
      </div>

      <div className={styles.tabs}>
        <div className={`${styles.tab} ${activeTab === 'basic' ? styles.active : ''}`} onClick={() => setActiveTab('basic')}>기본 정보</div>
        <div className={`${styles.tab} ${activeTab === 'orders' ? styles.active : ''}`} onClick={() => setActiveTab('orders')}>주문 이력</div>
        <div className={`${styles.tab} ${activeTab === 'network' ? styles.active : ''}`} onClick={() => setActiveTab('network')}>네트워크 및 수당</div>
      </div>

      {activeTab === 'basic' && (
        <div className={styles.tabContent}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>회원 ID</label>
              <input type="text" className={styles.input} value={user.id} readOnly />
            </div>
            <div className={styles.formGroup}>
              <label>가입일</label>
              <input type="text" className={styles.input} value={user.createdAt} readOnly />
            </div>
            <div className={styles.formGroup}>
              <label>이름</label>
              <input type="text" className={styles.input} defaultValue={user.name} />
            </div>
            <div className={styles.formGroup}>
              <label>회원 등급</label>
              <select className={styles.select} defaultValue={user.grade}>
                <option value="NORMAL">NORMAL</option>
                <option value="SILVER">SILVER</option>
                <option value="GOLD">GOLD</option>
                <option value="VIP">VIP</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>이메일</label>
              <input type="email" className={styles.input} defaultValue={user.email} />
            </div>
            <div className={styles.formGroup}>
              <label>전화번호</label>
              <input type="text" className={styles.input} defaultValue={user.phoneNumber} />
            </div>
            <div className={styles.formGroup}>
              <label>나의 추천인 코드 (자동 생성)</label>
              <input type="text" className={styles.input} value={user.referralCode} readOnly />
            </div>
            <div className={styles.formGroup}>
              <label>가입시 입력한 추천인</label>
              <input type="text" className={styles.input} placeholder="추천인 없음" />
            </div>
            <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
              <label>수당 지급 계좌</label>
              <input type="text" className={styles.input} defaultValue={user.bankAccount || ''} placeholder="은행명 / 계좌번호 / 예금주" />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className={styles.tabContent}>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '20px' }}>최근 주문 내역</p>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>주문일자</th>
                <th>주문번호</th>
                <th>상품명</th>
                <th>결제금액</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2024-04-10</td>
                <td>ORD-20240410-001</td>
                <td>빠사쥬 프리미엄 에센스 외 1건</td>
                <td>164,000원</td>
                <td>결제완료</td>
              </tr>
              <tr>
                <td>2024-02-15</td>
                <td>ORD-20240215-123</td>
                <td>아스릭손 센트럴 로션</td>
                <td>68,000원</td>
                <td>배송완료</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'network' && (
        <div className={styles.tabContent}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>이 회원을 기준으로 생성된 하위 네트워크 요약 및 수당 조회입니다.</p>
            <button className={styles.btnOutline} onClick={() => setIsNetworkModalOpen(true)}>조직 트리 시각화</button>
          </div>
          
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>총 하위 회원 수 (1~2단계)</label>
              <input type="text" className={styles.input} value="12명" readOnly />
            </div>
            <div className={styles.formGroup}>
              <label>이번 달 누적 네트워크 실적</label>
              <input type="text" className={styles.input} value="4,500,000원" readOnly />
            </div>
            <div className={styles.formGroup}>
              <label>이번 달 예상 수당</label>
              <input type="text" className={styles.input} value="450,000원" readOnly />
            </div>
            <div className={styles.formGroup}>
              <label>지급 대기중 수당</label>
              <input type="text" className={styles.input} value="0원" readOnly />
            </div>
          </div>
        </div>
      )}

      {/* 제재 모달 */}
      {isSanctionModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsSanctionModalOpen(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <h2>회원 제재 처리 (정지)</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>
              해당 회원의 모든 서비스 이용을 제한합니다 (로그인 불가).
            </p>
            <div className={styles.formGroup}>
              <label>제재 사유 (필수)</label>
              <textarea 
                className={styles.input} 
                style={{ height: '100px', resize: 'vertical' }}
                placeholder="제재 사유를 입력하세요 (예: 비정상적인 다단계 활동, 어뷰징 등)"
                value={sanctionReason}
                onChange={e => setSanctionReason(e.target.value)}
              />
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.btnOutline} onClick={() => setIsSanctionModalOpen(false)}>취소</button>
              <button className={styles.btnDanger} onClick={handleSanction} disabled={!sanctionReason.trim()}>정지/차단 실행</button>
            </div>
          </div>
        </div>
      )}

      {/* 추천인 관계도 모달 */}
      {isNetworkModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsNetworkModalOpen(false)}>
          <div className={styles.modalContent} style={{ width: '600px' }} onClick={e => e.stopPropagation()}>
            <h2>하위 조직 트리 시각화</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
              [{user.name}] 회원의 1단계 및 2단계 네트워크 구조입니다.
            </p>
            
            {/* 트리 구조 가상 렌더링 */}
            <div style={{ backgroundColor: 'var(--color-background)', padding: '20px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>👑 {user.name} ({user.grade})</div>
              <div style={{ paddingLeft: '20px', borderLeft: '2px dashed var(--color-border)' }}>
                <div style={{ marginBottom: '8px' }}>├─ 👤 김철수 (SILVER) - 1단계</div>
                <div style={{ paddingLeft: '20px', borderLeft: '2px dashed transparent', marginBottom: '4px' }}>
                  <div style={{ color: 'var(--color-text-secondary)' }}>├─ 👤 이영희 (NORMAL) - 2단계</div>
                  <div style={{ color: 'var(--color-text-secondary)' }}>└─ 👤 박민준 (NORMAL) - 2단계</div>
                </div>
                <div>└─ 👤 최지우 (GOLD) - 1단계</div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button className={styles.btnOutline} onClick={() => setIsNetworkModalOpen(false)}>닫기</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
