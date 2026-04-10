'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../products.module.css';

const TOOLBAR_GROUPS = [
  [
    { icon: '¶', label: '단락' },
  ],
  [
    { icon: '𝗕', label: '굵게 (Bold)' },
    { icon: '𝘐', label: '기울임 (Italic)' },
    { icon: '<u>U</u>', label: '밑줄 (Underline)', html: true },
    { icon: '~~S~~', label: '취소선 (Strikethrough)' },
  ],
  [
    { icon: '≡', label: '왼쪽 정렬' },
    { icon: '≣', label: '가운데 정렬' },
    { icon: '≡→', label: '오른쪽 정렬' },
  ],
  [
    { icon: '• 목록', label: '순서 없는 목록' },
    { icon: '1. 목록', label: '순서 있는 목록' },
  ],
  [
    { icon: '🖼 이미지', label: '이미지 삽입' },
    { icon: '🔗 링크', label: '링크 삽입' },
    { icon: '⎋ 표', label: '표 삽입' },
  ],
];

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    category: 'SKIN',
    image: '',
    stock: '',
    isSubscription: false,
    priceBase: '',
    priceNormal: '',
    priceSilver: '',
    priceGold: '',
    priceVip: '',
    description: '',
  });

  const update = (key: string, value: string | boolean) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const handleSave = () => {
    alert('상품이 등록되었습니다! (UI 전용 Mock)');
    router.push('/admin/products');
  };

  return (
    <div className={styles.container}>
      {/* Back link */}
      <div>
        <Link href="/admin/products" style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', textDecoration: 'none' }}>
          ← 상품 목록으로 돌아가기
        </Link>
      </div>

      <div className={styles.header}>
        <div>
          <h1>상품 등록</h1>
          <p>새로운 상품 정보를 입력하고 등록합니다.</p>
        </div>
      </div>

      <div className={styles.formPage}>

        {/* ── Section 1: 기본 정보 ── */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>📦 기본 정보</div>
          <div className={styles.sectionBody}>
            <div className={styles.formGrid2} style={{ rowGap: '18px' }}>
              <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                <label>상품명 *</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="예: 빠사쥬 프리미엄 에센스 200ml"
                  value={form.name}
                  onChange={e => update('name', e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>카테고리 *</label>
                <select
                  className={styles.select}
                  value={form.category}
                  onChange={e => update('category', e.target.value)}
                >
                  <option value="SKIN">스킨케어</option>
                  <option value="BODY">바디케어</option>
                  <option value="HAIR">헤어케어</option>
                  <option value="OTHER">기타</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>구독 상품 여부</label>
                <select
                  className={styles.select}
                  value={form.isSubscription ? 'Y' : 'N'}
                  onChange={e => update('isSubscription', e.target.value === 'Y')}
                >
                  <option value="N">일반 상품</option>
                  <option value="Y">정기 구독 상품</option>
                </select>
              </div>
              <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                <label>썸네일 이미지 URL</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="https://... (이미지 URL을 입력하거나, 백엔드 연동 후 파일 업로드 지원)"
                  value={form.image}
                  onChange={e => update('image', e.target.value)}
                />
                {form.image && (
                  <div style={{ marginTop: 8 }}>
                    <img
                      src={form.image}
                      alt="미리보기"
                      style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8, border: '1px solid var(--color-border)' }}
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Section 2: 가격 및 재고 ── */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>💰 가격 및 재고 설정</div>
          <div className={styles.sectionBody}>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: 16 }}>
              등급별 가격을 개별 설정합니다. 소비자가를 기준으로 각 등급별 할인가를 입력해 주세요.
            </p>
            <div className={styles.priceGrid}>
              <div className={styles.priceItem}>
                <div className={`${styles.priceLabel} ${styles.base}`}>소비자가 (기준)</div>
                <input
                  type="number"
                  className={styles.priceInput}
                  placeholder="0"
                  value={form.priceBase}
                  onChange={e => update('priceBase', e.target.value)}
                />
              </div>
              <div className={styles.priceItem}>
                <div className={`${styles.priceLabel} ${styles.normal}`}>NORMAL</div>
                <input
                  type="number"
                  className={styles.priceInput}
                  placeholder="0"
                  value={form.priceNormal}
                  onChange={e => update('priceNormal', e.target.value)}
                />
              </div>
              <div className={styles.priceItem}>
                <div className={`${styles.priceLabel} ${styles.silver}`}>SILVER</div>
                <input
                  type="number"
                  className={styles.priceInput}
                  placeholder="0"
                  value={form.priceSilver}
                  onChange={e => update('priceSilver', e.target.value)}
                />
              </div>
              <div className={styles.priceItem}>
                <div className={`${styles.priceLabel} ${styles.gold}`}>GOLD</div>
                <input
                  type="number"
                  className={styles.priceInput}
                  placeholder="0"
                  value={form.priceGold}
                  onChange={e => update('priceGold', e.target.value)}
                />
              </div>
              <div className={styles.priceItem}>
                <div className={`${styles.priceLabel} ${styles.vip}`}>✦ VIP</div>
                <input
                  type="number"
                  className={styles.priceInput}
                  placeholder="0"
                  value={form.priceVip}
                  onChange={e => update('priceVip', e.target.value)}
                />
              </div>
            </div>

            <div style={{ marginTop: 18, maxWidth: 240 }}>
              <div className={styles.formGroup}>
                <label>재고 수량 *</label>
                <input
                  type="number"
                  className={styles.input}
                  placeholder="0"
                  value={form.stock}
                  onChange={e => update('stock', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Section 3: 상품 상세 설명 (Mock Rich Editor) ── */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            📝 상품 상세 설명
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginLeft: 8, fontWeight: 400 }}>
              ※ 실제 리치 에디터는 백엔드 연동 후 교체됩니다
            </span>
          </div>
          <div className={styles.sectionBody} style={{ padding: 0 }}>
            <div className={styles.editorWrapper}>
              {/* Toolbar */}
              <div className={styles.editorToolbar}>
                <div className={styles.toolbarGroup}>
                  <select className={styles.toolbarSelect}>
                    <option>본문</option>
                    <option>제목 1</option>
                    <option>제목 2</option>
                    <option>제목 3</option>
                  </select>
                  <select className={styles.toolbarSelect} style={{ marginLeft: 4 }}>
                    <option>14px</option>
                    <option>12px</option>
                    <option>16px</option>
                    <option>18px</option>
                    <option>24px</option>
                  </select>
                </div>
                {TOOLBAR_GROUPS.slice(1).map((group, gi) => (
                  <div key={gi} className={styles.toolbarGroup}>
                    {group.map((btn, bi) => (
                      <button
                        key={bi}
                        className={styles.toolbarBtn}
                        title={btn.label}
                        type="button"
                        onClick={() => {}}
                      >
                        {btn.icon}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
              {/* Editor Body */}
              <textarea
                className={styles.editorBody}
                placeholder="상품 상세 설명을 입력하세요.&#10;&#10;성분, 사용 방법, 주의사항 등을 자세히 작성해 주세요."
                value={form.description}
                onChange={e => update('description', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className={styles.formFooter}>
          <Link href="/admin/products" className={styles.btnOutline}>취소</Link>
          <button className={styles.btnPrimary} onClick={handleSave}>
            상품 등록 완료
          </button>
        </div>

      </div>
    </div>
  );
}
