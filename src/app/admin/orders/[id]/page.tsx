'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../orders.module.css';
import { MOCK_ADMIN_ORDERS, MOCK_ADMIN_USERS, MOCK_PRODUCTS } from '@/data/mock';
import type { OrderStatus, CartItem } from '@/types';

const STATUS_LABEL: Record<OrderStatus, string> = {
  PENDING: '입금대기', PAID: '결제완료',
  SHIPPING: '배송중', DELIVERED: '배송완료',
  CANCELLED: '취소', RETURNED: '반품',
};

const COURIER_OPTIONS = ['CJ대한통운', '우체국택배', '로젠택배', '한진택배', 'GS택배'];

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const orderId = decodeURIComponent(params.id);
  const order = MOCK_ADMIN_ORDERS.find(o => o.id === orderId);

  const [tracking, setTracking] = useState(order?.trackingNumber ?? '');
  const [courier, setCourier] = useState('CJ대한통운');
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order?.status ?? 'PAID');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  if (!order) {
    return (
      <div className={styles.container}>
        <p>주문을 찾을 수 없습니다.</p>
        <button className={styles.btnOutline} onClick={() => router.back()}>뒤로</button>
      </div>
    );
  }

  const user = MOCK_ADMIN_USERS.find(u => u.id === order.userId);

  function getProductName(productId: string) {
    return MOCK_PRODUCTS.find(p => p.id === productId)?.name ?? productId;
  }
  function getProductPrice(productId: string) {
    return MOCK_PRODUCTS.find(p => p.id === productId)?.price ?? 0;
  }

  const handleRegisterTracking = () => {
    if (!tracking.trim()) { alert('운송장 번호를 입력해 주세요.'); return; }
    setCurrentStatus('SHIPPING');
    alert(`운송장 등록 완료!\n택배사: ${courier}\n운송장번호: ${tracking}\n상태가 "배송중"으로 변경되었습니다.`);
  };

  const handleForceCancel = () => {
    if (!cancelReason.trim()) { alert('취소/환불 사유를 입력해 주세요.'); return; }
    setCurrentStatus('CANCELLED');
    setShowCancelModal(false);
    alert('강제 취소 처리가 완료되었습니다. (PG 환불 API 연동 필요)');
  };

  return (
    <div className={styles.container}>
      <div>
        <Link href="/admin/orders" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>
          ← 주문 목록으로 돌아가기
        </Link>
      </div>

      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>{order.id}</span>
            <span className={`${styles.statusBadge} ${styles['status_' + currentStatus]}`}>
              {STATUS_LABEL[currentStatus]}
            </span>
          </h1>
          <p style={{ marginTop: 4 }}>주문일시: {order.createdAt.replace('T', ' ').slice(0, 16)}</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className={styles.btnDanger} onClick={() => setShowCancelModal(true)}>
            강제 취소 · 환불
          </button>
        </div>
      </div>

      {/* Detail Grid */}
      <div className={styles.detailGrid}>

        {/* 주문자 정보 */}
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>👤 주문자 정보</div>
          <div className={styles.cardBody}>
            <div className={styles.infoRow}><span className={styles.infoLabel}>이름</span><span className={styles.infoValue}>{user?.name ?? order.userId}</span></div>
            <div className={styles.infoRow}><span className={styles.infoLabel}>연락처</span><span className={styles.infoValue}>{user?.phoneNumber ?? '—'}</span></div>
            <div className={styles.infoRow}><span className={styles.infoLabel}>이메일</span><span className={styles.infoValue}>{user?.email ?? '—'}</span></div>
            <div className={styles.infoRow}><span className={styles.infoLabel}>등급</span><span className={styles.infoValue}>{user?.grade ?? '—'}</span></div>
          </div>
        </div>

        {/* 배송지 정보 */}
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>🏠 배송지 정보</div>
          <div className={styles.cardBody}>
            <div className={styles.infoRow}><span className={styles.infoLabel}>배송지</span><span className={styles.infoValue}>{order.shippingAddress}</span></div>
            <div className={styles.infoRow}><span className={styles.infoLabel}>배송 요청사항</span><span className={styles.infoValue}>문 앞에 놔주세요</span></div>
          </div>
        </div>

        {/* 주문 상품 */}
        <div className={styles.infoCard} style={{ gridColumn: 'span 2' }}>
          <div className={styles.cardHeader}>📦 주문 상품 내역</div>
          <div style={{ padding: 0 }}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>상품명</th>
                  <th>수량</th>
                  <th>단가</th>
                  <th>소계</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item: CartItem, i: number) => (
                  <tr key={i}>
                    <td>{getProductName(item.productId)}</td>
                    <td>{item.quantity}개</td>
                    <td>{getProductPrice(item.productId).toLocaleString()}원</td>
                    <td style={{ fontWeight: 600 }}>{(getProductPrice(item.productId) * item.quantity).toLocaleString()}원</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3} style={{ textAlign: 'right', color: 'var(--color-text-secondary)', fontWeight: 500 }}>총 결제금액</td>
                  <td style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '1rem' }}>
                    {order.totalAmount.toLocaleString()}원
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 운송장 등록 */}
        <div className={styles.infoCard} style={{ gridColumn: 'span 2' }}>
          <div className={styles.cardHeader}>🚚 운송장 등록 / 배송 처리</div>
          <div className={styles.cardBody}>
            {currentStatus === 'SHIPPING' || currentStatus === 'DELIVERED' ? (
              <div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>현재 운송장</span>
                  <span className={styles.infoValue} style={{ color: '#9d97f5', fontFamily: 'monospace' }}>
                    {courier} / {tracking || order.trackingNumber}
                  </span>
                </div>
                <p style={{ marginTop: 12, fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                  ✓ 운송장이 등록되어 배송중 상태입니다.
                  수정이 필요하면 아래 정보를 변경하고 재등록하세요.
                </p>
              </div>
            ) : currentStatus === 'PAID' ? (
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.88rem', marginBottom: 12 }}>
                ※ 상품 포장 후 택배사에 인계하고 운송장 번호를 등록하면 상태가 <strong>"배송중"</strong>으로 자동 변경됩니다.
              </p>
            ) : (
              <p style={{ color: '#888', fontSize: '0.88rem' }}>이 주문은 운송장 등록이 불가능한 상태입니다.</p>
            )}

            {(currentStatus === 'PAID' || currentStatus === 'SHIPPING') && (
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', gap: 10 }}>
                  <div className={styles.formGroup} style={{ flex: '0 0 160px' }}>
                    <label>택배사 선택</label>
                    <select className={styles.select} value={courier} onChange={e => setCourier(e.target.value)}>
                      {COURIER_OPTIONS.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className={styles.formGroup} style={{ flex: 1 }}>
                    <label>운송장 번호</label>
                    <div className={styles.trackingForm}>
                      <input
                        type="text"
                        className={styles.trackingInput}
                        placeholder="운송장 번호를 입력하세요"
                        value={tracking}
                        onChange={e => setTracking(e.target.value)}
                      />
                      <button className={styles.btnPrimary} onClick={handleRegisterTracking}>
                        등록 · 발송완료
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Force Cancel Modal */}
      {showCancelModal && (
        <div className={styles.modalOverlay} onClick={() => setShowCancelModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h2>⚠️ 강제 취소 · 환불</h2>
            <p>이 주문을 강제 취소하면 결제가 환불되며 되돌릴 수 없습니다. 취소/환불 사유를 입력해 주세요.</p>
            <div className={styles.formGroup}>
              <label>취소/환불 사유 *</label>
              <textarea
                className={styles.textarea}
                placeholder="예: 고객 요청에 의한 취소, 재고 부족 등"
                value={cancelReason}
                onChange={e => setCancelReason(e.target.value)}
              />
            </div>
            <div style={{ marginTop: 14 }}>
              <label style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>환불 금액</label>
              <p style={{ margin: '6px 0 0', fontWeight: 700, fontSize: '1.1rem', color: '#d94040' }}>
                {order.totalAmount.toLocaleString()}원 (전액 환불)
              </p>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.btnOutline} onClick={() => setShowCancelModal(false)}>취소</button>
              <button className={styles.btnDanger} onClick={handleForceCancel} disabled={!cancelReason.trim()}>
                강제 취소 · 환불 실행
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
