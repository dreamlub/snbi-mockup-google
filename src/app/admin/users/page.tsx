'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { MOCK_ADMIN_USERS } from '@/data/mock';

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('ALL');

  // 간단한 클라이언트 사이드 필터링
  const filteredUsers = MOCK_ADMIN_USERS.filter(user => {
    const matchName = user.name.includes(searchTerm) || user.phoneNumber.includes(searchTerm);
    const matchGrade = filterGrade === 'ALL' || user.grade === filterGrade;
    return matchName && matchGrade;
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>회원 관리</h1>
          <p>전체 회원의 목록을 조회하고 관리할 수 있습니다.</p>
        </div>
        <div className={styles.actions}>
          <button className={styles.btnOutline}>엑셀 다운로드</button>
          <button className={styles.btnPrimary}>+ 수동 회원가입</button>
        </div>
      </div>

      <div className={styles.searchCard}>
        <div className={styles.searchGrid}>
          <div className={styles.formGroup}>
            <label>검색어</label>
            <input 
              type="text" 
              className={styles.input} 
              placeholder="이름 또는 연락처 검색" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>회원 등급</label>
            <select 
              className={styles.select}
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
            >
              <option value="ALL">전체 등급</option>
              <option value="NORMAL">NORMAL</option>
              <option value="SILVER">SILVER</option>
              <option value="GOLD">GOLD</option>
              <option value="VIP">VIP</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>가입일</label>
            <input type="date" className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label>상태</label>
            <select className={styles.select}>
              <option value="ALL">전체 상태</option>
              <option value="ACTIVE">활성</option>
              <option value="INACTIVE">정지/차단</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
            총 <strong>{filteredUsers.length}</strong>명
          </span>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>ID</th>
                <th>이름</th>
                <th>연락처</th>
                <th>이메일</th>
                <th>등급</th>
                <th>추천인 코드</th>
                <th>가입일</th>
                <th>상태</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td><input type="checkbox" /></td>
                  <td>{user.id}</td>
                  <td style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>{user.name}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`${styles.gradeBadge} ${styles['grade_' + user.grade]}`}>
                      {user.grade}
                    </span>
                  </td>
                  <td>{user.referralCode}</td>
                  <td>{user.createdAt}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${user.isActive ? styles.status_active : styles.status_inactive}`}>
                      {user.isActive ? '정상' : '정지'}
                    </span>
                  </td>
                  <td>
                    <Link href={`/admin/users/${user.id}`}>
                      <button className={styles.btnOutline} style={{ padding: '4px 8px', fontSize: '0.8rem' }}>
                        상세/수정
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={10} style={{ textAlign: 'center', padding: '40px' }}>
                    검색 결과가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
