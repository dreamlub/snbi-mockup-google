'use client';

import React, { useState, useMemo } from 'react';
import { MOCK_ADMIN_USERS } from '@/data/mock';
import styles from './page.module.css';

const GRADE_LABEL: Record<string, string> = {
  NORMAL: 'NORMAL', SILVER: 'SILVER', GOLD: 'GOLD', VIP: 'VIP',
};

const GRADE_ORDER: Record<string, number> = {
  VIP: 4, GOLD: 3, SILVER: 2, NORMAL: 1,
};

export default function MemberSearchPage() {
  const [query,    setQuery]    = useState('');
  const [gradeFilter, setGradeFilter] = useState('ALL');
  const [searched, setSearched] = useState(false);

  const results = useMemo(() => {
    if (!searched) return [];
    return MOCK_ADMIN_USERS
      .filter(u => u.isActive)
      .filter(u => {
        if (gradeFilter !== 'ALL' && u.grade !== gradeFilter) return false;
        if (!query.trim()) return true;
        const q = query.trim().toLowerCase();
        return (
          u.name.toLowerCase().includes(q) ||
          u.referralCode.toLowerCase().includes(q) ||
          u.phoneNumber.replace(/-/g, '').includes(q.replace(/-/g, ''))
        );
      })
      .sort((a, b) => (GRADE_ORDER[b.grade] ?? 0) - (GRADE_ORDER[a.grade] ?? 0));
  }, [query, gradeFilter, searched]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  const maskPhone = (phone: string) => {
    // 010-1234-5678 → 010-****-5678
    return phone.replace(/(\d{3})-(\d{3,4})-(\d{4})/, '$1-****-$3');
  };

  return (
    <div className={`${styles.wrapper} container`}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>조합원 검색</h1>
        <p className={styles.desc}>이름, 추천인 코드, 전화번호로 조합원을 검색할 수 있습니다.</p>
      </div>

      {/* 검색 폼 */}
      <form className={`${styles.searchBox} glass`} onSubmit={handleSearch}>
        <div className={styles.searchRow}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="이름, 추천인 코드, 전화번호 입력"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <div className={styles.gradeSelect}>
            {['ALL', 'VIP', 'GOLD', 'SILVER', 'NORMAL'].map(g => (
              <button
                key={g}
                type="button"
                className={`${styles.gradeBtn} ${gradeFilter === g ? styles.gradeBtnActive : ''}`}
                onClick={() => setGradeFilter(g)}
              >
                {g === 'ALL' ? '전체' : g}
              </button>
            ))}
          </div>
          <button type="submit" className={`${styles.searchBtn} btn-primary`}>검색</button>
        </div>
      </form>

      {/* 결과 */}
      {!searched ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🔍</div>
          <p>검색어를 입력하고 조합원을 찾아보세요.</p>
        </div>
      ) : results.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>😥</div>
          <p>검색 결과가 없습니다.</p>
          <p className={styles.emptyHint}>다른 검색어를 입력하거나 등급 필터를 변경해보세요.</p>
        </div>
      ) : (
        <>
          <div className={styles.resultMeta}>
            총 <strong>{results.length}명</strong>의 조합원을 찾았습니다.
          </div>
          <div className={styles.resultList}>
            {results.map(user => (
              <div key={user.id} className={`${styles.memberCard} glass`}>
                <div className={styles.memberAvatar}>
                  {user.name.slice(0, 1)}
                </div>
                <div className={styles.memberInfo}>
                  <div className={styles.memberName}>
                    {user.name}
                    <span className={`${styles.gradeBadge} ${styles[`grade_${user.grade}`]}`}>
                      {GRADE_LABEL[user.grade]}
                    </span>
                  </div>
                  <div className={styles.memberMeta}>
                    <span>📱 {maskPhone(user.phoneNumber)}</span>
                    <span>🔑 {user.referralCode}</span>
                    {user.createdAt && (
                      <span>📅 {user.createdAt} 가입</span>
                    )}
                  </div>
                </div>
                <div className={styles.memberActions}>
                  <button
                    className={styles.referralCopyBtn}
                    onClick={() => navigator.clipboard.writeText(user.referralCode)}
                    title="추천인 코드 복사"
                  >
                    코드 복사
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
