'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './payments.module.css';
import {
  MOCK_PAYMENTS,
  MOCK_SUBSCRIPTIONS,
  MOCK_ADMIN_USERS,
  MOCK_PRODUCTS,
} from '@/data/mock';
import type { Payment, Subscription, PaymentStatus, SubscriptionStatus } from '@/types';

/* ══ Label Maps ══ */
const PAY_METHOD_LABEL: Record<string, string> = {
  CARD: '신용카드', KAKAO: '카카오페이', NAVER: '네이버페이', BANK_TRANSFER: '계좌이체',
};
const PAY_STATUS_LABEL: Record<PaymentStatus, string> = {
  SUCCESS: '결제완료', PARTIAL_CANCEL: '부분취소', FULL_CANCEL: '전액취소', FAILED: '결제실패',
};
const SUB_STATUS_LABEL: Record<SubscriptionStatus, string> = {
  ACTIVE: '구독중', PAUSED: '일시중단', CANCELLED: '해지', EXPIRED: '만료',
};

function getUserName(userId: string) {
  return MOCK_ADMIN_USERS.find(u => u.id === userId)?.name ?? userId;
}
function getProductName(productId: string) {
  return MOCK_PRODUCTS.find(p => p.id === productId)?.name ?? productId;
}

/* ══ Partial-Cancel Modal ══ */
function PartialCancelModal({
  payment,
  onClose,
}: {
  payment: Payment;
  onClose: () => void;
}) {
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');

  const refundable = payment.amount - (payment.cancelledAmount ?? 0);

  const handleSubmit = () => {
    const n = Number(amount);
    if (!n || n <= 0 || n > refundable) {
      alert(`취소 금액은 1원 이상 ${refundable.toLocaleString()}원 이하로 입력해 주세요.`);
      return;
    }
    if (!reason.trim()) { alert('취소 사유를 입력해 주세요.'); return; }
    alert(`부분취소 처리 완료!\n취소금액: ${n.toLocaleString()}원\n사유: ${reason}\n(실제 PG취소 API 연동 시 반영됩니다)`);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <h2>부분취소 · 환불</h2>
        <p>PG 취소 API 연동 후 실제 환불이 처리됩니다. 취소할 금액과 사유를 입력하세요.</p>

        <div className={styles.modalInfoRow}>
          <span>결제 ID</span><strong>{payment.id}</strong>
        </div>
        <div className={styles.modalInfoRow}>
          <span>결제금액</span><strong>{payment.amount.toLocaleString()}원</strong>
        </div>
        <div className={styles.modalInfoRow}>
          <span>기취소액</span>
          <strong style={{ color: '#d94040' }}>{(payment.cancelledAmount ?? 0).toLocaleString()}원</strong>
        </div>
        <div className={styles.modalInfoRow} style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 14, marginBottom: 14 }}>
          <span>환불가능 잔액</span>
          <strong style={{ color: '#2db87a', fontSize: '1.05rem' }}>{refundable.toLocaleString()}원</strong>
        </div>

        <div className={styles.formGroup}>
          <label>취소 금액 (원) *</label>
          <input
            type="number"
            className={styles.input}
            placeholder={`최대 ${refundable.toLocaleString()}원`}
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>
        <div className={styles.formGroup} style={{ marginTop: 12 }}>
          <label>취소 사유 *</label>
          <textarea
            className={styles.textarea}
            placeholder="예: 고객 변심, 상품 하자, 오배송 등"
            value={reason}
            onChange={e => setReason(e.target.value)}
          />
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.btnOutline} onClick={onClose}>취소</button>
          <button className={styles.btnDanger} onClick={handleSubmit}>환불 실행</button>
        </div>
      </div>
    </div>
  );
}

/* ══ Main Page ══ */
export default function AdminPaymentsPage() {
  const [tab, setTab] = useState<'payments' | 'subscriptions'>('payments');
  const [search, setSearch] = useState('');
  const [payStatusFilter, setPayStatusFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [subStatusFilter, setSubStatusFilter] = useState('ALL');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  /* Payment filtering */
  const filteredPayments = MOCK_PAYMENTS.filter(p => {
    const matchSearch = p.id.includes(search) || p.orderId.includes(search) || getUserName(p.userId).includes(search);
    const matchStatus = payStatusFilter === 'ALL' || p.status === payStatusFilter;
    const matchType = typeFilter === 'ALL'
      || (typeFilter === 'SUB' && p.isSubscription)
      || (typeFilter === 'NORMAL' && !p.isSubscription);
    return matchSearch && matchStatus && matchType;
  });

  /* Subscription filtering */
  const filteredSubs = MOCK_SUBSCRIPTIONS.filter(s => {
    const matchSearch = getUserName(s.userId).includes(search) || getProductName(s.productId).includes(search);
    const matchStatus = subStatusFilter === 'ALL' || s.status === subStatusFilter;
    return matchSearch && matchStatus;
  });

  /* KPI summaries */
  const totalAmount    = MOCK_PAYMENTS.filter(p => p.status === 'SUCCESS').reduce((a, p) => a + p.amount, 0);
  const cancelledAmt   = MOCK_PAYMENTS.reduce((a, p) => a + (p.cancelledAmount ?? 0), 0);
  const activeSubCount = MOCK_SUBSCRIPTIONS.filter(s => s.status === 'ACTIVE').length;

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1>결제 관리</h1>
          <p>결제 내역과 정기구독 현황을 조회하고 환불·취소를 처리합니다.</p>
        </div>
        <button className={styles.btnOutline}>엑셀 내보내기</button>
      </div>

      {/* KPI Cards */}
      <div className={styles.kpiRow}>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>이번 달 결제 총액</div>
          <div className={styles.kpiValue}>{totalAmount.toLocaleString()}원</div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>총 취소 · 환불액</div>
          <div className={`${styles.kpiValue} ${styles.kpiRed}`}>{cancelledAmt.toLocaleString()}원</div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>활성 구독 수</div>
          <div className={`${styles.kpiValue} ${styles.kpiGreen}`}>{activeSubCount}건</div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>전체 결제 건수</div>
          <div className={styles.kpiValue}>{MOCK_PAYMENTS.length}건</div>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button className={`${styles.tab} ${tab === 'payments' ? styles.active : ''}`} onClick={() => setTab('payments')}>
          결제 내역 <span className={styles.tabCount}>{MOCK_PAYMENTS.length}</span>
        </button>
        <button className={`${styles.tab} ${tab === 'subscriptions' ? styles.active : ''}`} onClick={() => setTab('subscriptions')}>
          구독 현황 <span className={styles.tabCount}>{MOCK_SUBSCRIPTIONS.length}</span>
        </button>
      </div>

      {/* Shared Search */}
      <div className={styles.filterRow}>
        <div className={styles.formGroup}>
          <label>검색</label>
          <input
            type="text"
            className={styles.input}
            placeholder={tab === 'payments' ? '결제ID / 주문번호 / 주문자 검색' : '주문자 / 상품명 검색'}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {tab === 'payments' && (
          <>
            <div className={styles.formGroup}>
              <label>결제 상태</label>
              <select className={styles.select} value={payStatusFilter} onChange={e => setPayStatusFilter(e.target.value)}>
                <option value="ALL">전체</option>
                <option value="SUCCESS">결제완료</option>
                <option value="PARTIAL_CANCEL">부분취소</option>
                <option value="FULL_CANCEL">전액취소</option>
                <option value="FAILED">결제실패</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>결제 유형</label>
              <select className={styles.select} value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                <option value="ALL">전체</option>
                <option value="NORMAL">일반 결제</option>
                <option value="SUB">정기구독</option>
              </select>
            </div>
          </>
        )}
        {tab === 'subscriptions' && (
          <div className={styles.formGroup}>
            <label>구독 상태</label>
            <select className={styles.select} value={subStatusFilter} onChange={e => setSubStatusFilter(e.target.value)}>
              <option value="ALL">전체</option>
              <option value="ACTIVE">구독중</option>
              <option value="PAUSED">일시중단</option>
              <option value="CANCELLED">해지</option>
              <option value="EXPIRED">만료</option>
            </select>
          </div>
        )}
      </div>

      {/* ── Tab: Payment List ── */}
      {tab === 'payments' && (
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            총 <strong>{filteredPayments.length}</strong>건
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>결제 ID</th>
                  <th>주문번호</th>
                  <th>결제일시</th>
                  <th>주문자</th>
                  <th>결제수단</th>
                  <th>유형</th>
                  <th>결제금액</th>
                  <th>취소금액</th>
                  <th>상태</th>
                  <th>PG 거래ID</th>
                  <th>취소·환불</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map(p => (
                  <tr key={p.id}>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{p.id}</td>
                    <td>
                      <Link href={`/admin/orders/${p.orderId}`} style={{ color: 'var(--color-primary)', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                        {p.orderId}
                      </Link>
                    </td>
                    <td style={{ color: 'var(--color-text-secondary)', fontSize: '0.82rem' }}>{p.paidAt.replace('T', ' ').slice(0, 16)}</td>
                    <td style={{ fontWeight: 500 }}>{getUserName(p.userId)}</td>
                    <td>{PAY_METHOD_LABEL[p.method]}</td>
                    <td>
                      <span className={p.isSubscription ? styles.tagSub : styles.tagNormal}>
                        {p.isSubscription ? '구독' : '일반'}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600 }}>{p.amount.toLocaleString()}원</td>
                    <td style={{ color: p.cancelledAmount ? '#d94040' : '#444' }}>
                      {p.cancelledAmount ? `-${p.cancelledAmount.toLocaleString()}원` : '—'}
                    </td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles['pay_' + p.status]}`}>
                        {PAY_STATUS_LABEL[p.status]}
                      </span>
                    </td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>{p.pgTransactionId}</td>
                    <td>
                      {(p.status === 'SUCCESS' || p.status === 'PARTIAL_CANCEL') ? (
                        <button
                          className={styles.btnDanger}
                          onClick={() => setSelectedPayment(p)}
                        >
                          부분취소
                        </button>
                      ) : (
                        <span style={{ color: '#444', fontSize: '0.82rem' }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredPayments.length === 0 && (
                  <tr><td colSpan={11} style={{ textAlign: 'center', padding: 40, color: 'var(--color-text-secondary)' }}>결제 내역이 없습니다.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Tab: Subscription List ── */}
      {tab === 'subscriptions' && (
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            총 <strong>{filteredSubs.length}</strong>건
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>구독 ID</th>
                  <th>구독자</th>
                  <th>구독 상품</th>
                  <th>등급</th>
                  <th>결제금액/월</th>
                  <th>시작일</th>
                  <th>다음 결제일</th>
                  <th>종료일</th>
                  <th>상태</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubs.map(s => (
                  <tr key={s.id}>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{s.id}</td>
                    <td style={{ fontWeight: 500 }}>{getUserName(s.userId)}</td>
                    <td>{getProductName(s.productId)}</td>
                    <td>
                      <span className={`${styles.gradeBadge} ${styles['grade_' + s.grade]}`}>{s.grade}</span>
                    </td>
                    <td style={{ fontWeight: 600 }}>{s.amount.toLocaleString()}원</td>
                    <td style={{ color: 'var(--color-text-secondary)' }}>{s.startedAt}</td>
                    <td style={{ color: s.status === 'ACTIVE' ? '#9d97f5' : 'var(--color-text-secondary)' }}>{s.nextBillingAt}</td>
                    <td style={{ color: 'var(--color-text-secondary)' }}>{s.endedAt ?? '—'}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles['sub_' + s.status]}`}>
                        {SUB_STATUS_LABEL[s.status]}
                      </span>
                    </td>
                    <td>
                      {s.status === 'ACTIVE' && (
                        <div style={{ display: 'flex', gap: 4 }}>
                          <button className={styles.btnOutline} style={{ padding: '3px 8px', fontSize: '0.78rem' }}>일시중단</button>
                          <button className={styles.btnDanger} style={{ padding: '3px 8px', fontSize: '0.78rem' }}>해지</button>
                        </div>
                      )}
                      {s.status === 'PAUSED' && (
                        <button className={styles.btnPrimary} style={{ padding: '3px 10px', fontSize: '0.78rem' }}>재개</button>
                      )}
                      {(s.status === 'CANCELLED' || s.status === 'EXPIRED') && (
                        <span style={{ color: '#444', fontSize: '0.82rem' }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredSubs.length === 0 && (
                  <tr><td colSpan={10} style={{ textAlign: 'center', padding: 40, color: 'var(--color-text-secondary)' }}>구독 내역이 없습니다.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Partial Cancel Modal */}
      {selectedPayment && (
        <PartialCancelModal payment={selectedPayment} onClose={() => setSelectedPayment(null)} />
      )}
    </div>
  );
}
