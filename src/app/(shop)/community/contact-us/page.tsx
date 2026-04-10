'use client';

import React, { useState } from 'react';
import styles from './page.module.css';

export default function ContactUsPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('문의가 접수되었습니다. 감사합니다.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className={`${styles.container} container`}>
      <h1 className={styles.title}>Contact Us</h1>
      <p className={styles.subtitle}>궁금한 점이 있으시면 언제든지 문의해 주세요.</p>

      <div className={styles.content}>
        {/* 회사 정보 */}
        <div className={`${styles.infoSection} glass`}>
          <h2 className={styles.sectionTitle}>INFORMATION</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>회사명</span>
              <span className={styles.infoValue}>주식회사 에스엔비아이</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>대표자</span>
              <span className={styles.infoValue}>정영재</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>사업자등록번호</span>
              <span className={styles.infoValue}>426-88-02585</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>주소</span>
              <span className={styles.infoValue}>대구광역시 동구 매여로2길 53(매여동)</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>전화</span>
              <span className={styles.infoValue}>1600-1559</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>이메일</span>
              <span className={styles.infoValue}>master@snbi.co.kr</span>
            </div>
          </div>
        </div>

        {/* 문의 폼 */}
        <div className={`${styles.formSection} glass`}>
          <h2 className={styles.sectionTitle}>문의하기</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.fieldGroup}>
              <label htmlFor="name">이름</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="이름을 입력하세요"
              />
            </div>
            <div className={styles.fieldGroup}>
              <label htmlFor="email">이메일</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="이메일을 입력하세요"
              />
            </div>
            <div className={styles.fieldGroup}>
              <label htmlFor="message">내용</label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={form.message}
                onChange={handleChange}
                placeholder="문의 내용을 입력하세요"
              />
            </div>
            <button type="submit" className="btn-primary">보내기</button>
          </form>
        </div>
      </div>
    </div>
  );
}
