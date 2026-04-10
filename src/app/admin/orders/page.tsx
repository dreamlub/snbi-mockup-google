'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './orders.module.css';
import { MOCK_ADMIN_ORDERS, MOCK_ADMIN_USERS, MOCK_PRODUCTS } from '@/data/mock';
import type { OrderStatus, Order } from '@/types';

const STATUS_LABEL: Record<OrderStatus, string> = {
  PENDING:   '입금대기',
  PAID:      '결제완료',
  SHIPPING:  '배송중',
  DELIVERED: '배송완료',
  CANCELLED: '취소',
  RETURNED:  '반품',
};

const ALL_STATUSES: Array<{ key: 'ALL' | OrderStatus; label: string }> = [
  { key: 'ALL',       label: '전체' },
  { key: 'PAID',      label: '결제완료' },
  { key: 'SHIPPING',  label: '배송중' },
  { key: 'DELIVERED', label: '배송완료' },
  { key: 'CANCELLED', label: '취소' },
  { key: 'RETURNED',  label: '반품' },
];

function getUserName(userId: string) {
  return MOCK_ADMIN_USERS.find(u => u.id === userId)?.name ?? userId;
}

function getItemsSummary(items: { productId: string; quantity: number }[]) {
  const first = MOCK_PRODUCTS.find(p => p.id === items[0]?.productId);
  if (!first) return '—';
  return items.length > 1 ? `${first.name} 외 ${items.length - 1}건` : first.name;
}

export default function AdminOrdersPage() {
  const [statusFilter, setStatusFilter] = useState<'ALL' | OrderStatus>('ALL');
  const [search, setSearch] = useState('');

  const counts = ALL_STATUSES.reduce<Record<string, number>>((acc, s) => {
    acc[s.key] = s.key === 'ALL'
      ? MOCK_ADMIN_ORDERS.length
      : MOCK_ADMIN_ORDERS.filter(o => o.status === s.key).length;
    return acc;
  }, {});

  const filtered = MOCK_ADMIN_ORDERS.filter(o => {
    const matchStatus = statusFilter === 'ALL' || o.status === statusFilter;
    const matchSearch =
      o.id.includes(search) ||
      getUserName(o.userId).includes(search);
    return matchStatus && matchSearch;
  });

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1>주문 관리</h1>
          <p>주문 현황을 확인하고 배송 처리 및 교환·반품을 관리합니다.</p>
        </div>
        <button className={styles.btnOutline}>엑셀 내보내기</button>
      </div>

      {/* Status Tabs */}
      <div className={styles.statusTabs}>
        {ALL_STATUSES.map(s => (
          <button
            key={s.key}
            className={`${styles.statusTab} ${statusFilter === s.key ? styles.active : ''}`}
            onClick={() => setStatusFilter(s.key)}
          >
            {s.label}
            <span className={styles.statusCount}>{counts[s.key]}</span>
          </button>
        ))}
      </div>

      {/* Search Filter */}
      <div className={styles.filterRow}>
        <div className={styles.formGroup}>
          <label>주문번호 / 주문자 검색</label>
          <input
            type="text"
            className={styles.input}
            placeholder="주문번호 또는 이름 입력"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>주문일 (시작)</label>
          <input type="date" className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label>주문일 (종료)</label>
          <input type="date" className={styles.input} />
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <span>총 <strong>{filtered.length}</strong>건</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <select className={styles.select} style={{ width: 'auto', padding: '4px 10px', fontSize: '0.82rem' }}>
              <option>일괄 상태 변경</option>
              <option>결제완료</option>
              <option>배송중</option>
              <option>배송완료</option>
              <option>취소</option>
            </select>
            <button className={styles.btnOutline} style={{ padding: '4px 12px', fontSize: '0.82rem' }}>적용</button>
          </div>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>주문번호</th>
                <th>주문일시</th>
                <th>주문자</th>
                <th>상품 요약</th>
                <th>결제금액</th>
                <th>상태</th>
                <th>운송장</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(order => (
                <tr key={order.id}>
                  <td><input type="checkbox" /></td>
                  <td style={{ color: 'var(--color-primary)', fontFamily: 'monospace', fontSize: '0.82rem' }}>
                    {order.id}
                  </td>
                  <td style={{ color: 'var(--color-text-secondary)' }}>
                    {order.createdAt.replace('T', ' ').slice(0, 16)}
                  </td>
                  <td style={{ fontWeight: 500 }}>{getUserName(order.userId)}</td>
                  <td>{getItemsSummary(order.items)}</td>
                  <td style={{ fontWeight: 600 }}>{order.totalAmount.toLocaleString()}원</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles['status_' + order.status]}`}>
                      {STATUS_LABEL[order.status as OrderStatus]}
                    </span>
                  </td>
                  <td style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>
                    {order.trackingNumber ?? <span style={{ color: '#444' }}>미등록</span>}
                  </td>
                  <td>
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className={styles.btnOutline}
                      style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                    >
                      상세
                    </Link>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-secondary)' }}>
                    해당 조건의 주문이 없습니다.
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
