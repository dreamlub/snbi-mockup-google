'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const SignupPage = () => {
  const [step, setStep] = useState(1);
  
  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className={styles.stepContent}>
            <h2>약관 동의</h2>
            <div className={styles.agreements}>
              <div className={styles.checkItem}>
                <input type="checkbox" id="all" />
                <label htmlFor="all">전체 동의 (필수/선택 포함)</label>
              </div>
              <div className={styles.checkItem}>
                <input type="checkbox" id="req1" />
                <label htmlFor="req1">서비스 이용약관 (필수)</label>
              </div>
              <div className={styles.checkItem}>
                <input type="checkbox" id="req2" />
                <label htmlFor="req2">개인정보 수집 및 이용 (필수)</label>
              </div>
              <div className={styles.checkItem}>
                <input type="checkbox" id="opt1" />
                <label htmlFor="opt1">마케팅 정보 수신 (선택)</label>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className={styles.stepContent}>
            <h2>본인 인증</h2>
            <p>안전한 서비스를 위해 본인 인증을 진행해 주세요.</p>
            <div className={styles.verifyRow}>
              <button className={`${styles.verifyBtn} glass`}>PASS 본인인증</button>
              <button className={`${styles.verifyBtn} glass`}>휴대폰 SMS 인증</button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className={styles.stepContent}>
            <h2>정보 입력</h2>
            <form className={styles.infoForm}>
              <div className={styles.group}>
                <label>이름</label>
                <input type="text" placeholder="실명을 입력하세요" />
              </div>
              <div className={styles.group}>
                <label>이메일</label>
                <input type="email" placeholder="example@email.com" />
              </div>
              <div className={styles.group}>
                <label>비밀번호</label>
                <input type="password" placeholder="영문, 숫자, 특수문자 조합 8자 이상" />
              </div>
              <div className={styles.group}>
                <label>추천인 코드 (선택)</label>
                <input type="text" placeholder="추천인의 코드를 입력하세요" />
              </div>
            </form>
          </div>
        );
      case 4:
        return (
          <div className={styles.stepContent + " " + styles.successStep}>
            <div className={styles.successIcon}>✨</div>
            <h2>가입을 축하합니다!</h2>
            <p>SNBi의 회원이 되신 것을 진심으로 환영합니다.<br />지금 즉시 프리미엄 혜택을 만나보세요.</p>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.card} glass`}>
        <div className={styles.header}>
           <Link href="/" className={styles.logo}>
            <span className="text-gradient">SNBi</span>
          </Link>
          <div className={styles.indicator}>
            {[1, 2, 3, 4].map(s => (
              <div key={s} className={`${styles.dot} ${step >= s ? styles.activeDot : ''}`}></div>
            ))}
          </div>
        </div>

        {renderStep()}

        <div className={styles.actions}>
          {step > 1 && step < 4 && <button className={styles.prevBtn} onClick={prevStep}>이전</button>}
          {step < 4 ? (
            <button className="btn-primary" onClick={nextStep}>
              {step === 1 ? '동의하고 계속하기' : step === 2 ? '인증 완료 후 다음' : '가입 완료'}
            </button>
          ) : (
            <Link href="/login" className="btn-primary" style={{ display: 'block', textAlign: 'center' }}>로그인하러 가기</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
