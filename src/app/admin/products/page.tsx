'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './products.module.css';
import { MOCK_PRODUCTS } from '@/data/mock';

const CATEGORY_LABEL: Record<string, string> = {
  SKIN: '스킨케어',
  BODY: '바디케어',
  HAIR: '헤어케어',
  OTHER: '기타',
};

export default function AdminProductsPage() {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('ALL');

  const filtered = MOCK_PRODUCTS.filter(p => {
    const matchName = p.name.includes(search);
    const matchCat  = catFilter === 'ALL' || p.category === catFilter;
    return matchName && matchCat;
  });

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1>상품 관리</h1>
          <p>상품 목록을 조회하고 등록·수정·삭제를 할 수 있습니다.</p>
        </div>
        <div className={styles.actions}>
          <button className={styles.btnOutline}>엑셀 내보내기</button>
          <Link href="/admin/products/new" className={styles.btnPrimary}>
            + 상품 등록
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filterCard}>
        <div className={styles.formGroup}>
          <label>상품명 검색</label>
          <input
            type="text"
            className={styles.input}
            placeholder="상품명을 입력하세요"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>카테고리</label>
          <select
            className={styles.select}
            value={catFilter}
            onChange={e => setCatFilter(e.target.value)}
          >
            <option value="ALL">전체 카테고리</option>
            <option value="SKIN">스킨케어</option>
            <option value="BODY">바디케어</option>
            <option value="HAIR">헤어케어</option>
            <option value="OTHER">기타</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>구독 상품 여부</label>
          <select className={styles.select}>
            <option value="ALL">전체</option>
            <option value="YES">구독 상품만</option>
            <option value="NO">일반 상품만</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <span>총 <strong>{filtered.length}</strong>개 상품</span>
          <button className={styles.btnDanger} style={{ fontSize: '0.8rem' }}>선택 삭제</button>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>이미지</th>
                <th>상품명</th>
                <th>카테고리</th>
                <th>소비자가</th>
                <th>회원 최저가 (VIP)</th>
                <th>재고</th>
                <th>구독 여부</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(product => (
                <tr key={product.id}>
                  <td><input type="checkbox" /></td>
                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={styles.productImg}
                      onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><rect width="48" height="48" fill="%231a1a1a"/></svg>'; }}
                    />
                  </td>
                  <td style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>{product.name}</td>
                  <td>
                    <span className={`${styles.categoryBadge} ${styles['cat_' + product.category]}`}>
                      {CATEGORY_LABEL[product.category]}
                    </span>
                  </td>
                  <td>{product.price.toLocaleString()}원</td>
                  <td style={{ color: '#e6b400', fontWeight: 600 }}>
                    {product.gradePrices.VIP.toLocaleString()}원
                  </td>
                  <td>{product.stock.toLocaleString()}개</td>
                  <td>
                    {product.isSubscription
                      ? <span style={{ color: '#5b52e8', fontWeight: 600 }}>✓ 구독</span>
                      : <span style={{ color: '#555' }}>—</span>
                    }
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className={styles.btnOutline}
                        style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                      >
                        수정
                      </Link>
                      <button className={styles.btnDanger}>삭제</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-secondary)' }}>
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
