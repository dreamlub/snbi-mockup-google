'use client';

import React, { useState } from 'react';
import { MOCK_USER } from '@/data/mock';
import styles from './page.module.css';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: MOCK_USER.name,
    email: MOCK_USER.email,
    phone: MOCK_USER.phoneNumber,
    bank: MOCK_USER.bankAccount,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>개인정보 수정</h1>
      <p className={styles.subtitle}>필요한 정보를 수정하고 안전하게 관리하세요.</p>

      <form className={`${styles.form} glass`} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.formGroup}>
          <label>이름</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        
        <div className={styles.formGroup}>
          <label>이메일</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label>휴대폰 번호</label>
          <div className={styles.inputWithBtn}>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
            <button className={styles.smallBtn}>인증번호 발송</button>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>수당 지급 계좌</label>
          <input type="text" name="bank" value={formData.bank} onChange={handleChange} />
          <p className={styles.helpText}>* 수당 지급을 위해 본인 실명 계좌만 등록 가능합니다.</p>
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className="btn-primary">정보 저장하기</button>
          <button type="button" className={styles.cancelBtn}>취소</button>
        </div>
      </form>

      <div className={styles.dangerZone}>
        <h3>계정 관리</h3>
        <button className={styles.withdrawBtn}>회원 탈퇴</button>
      </div>
    </div>
  );
};

export default ProfilePage;
