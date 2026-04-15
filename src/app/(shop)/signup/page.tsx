'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

/* ── 약관 목록 ── */
const TERMS = [
  { id: 'req1', label: '서비스 이용약관',          required: true },
  { id: 'req2', label: '개인정보 수집 및 이용',    required: true },
  { id: 'req3', label: '만 14세 이상 본인 확인',   required: true },
  { id: 'opt1', label: '마케팅 정보 수신 (이메일·SMS)', required: false },
];

const BANKS = ['국민은행','신한은행','우리은행','하나은행','농협은행','카카오뱅크','토스뱅크','기업은행','SC제일은행'];

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep]     = useState(1);
  const TOTAL_STEPS         = 4;

  /* step1 – 약관 */
  const [agreed, setAgreed] = useState<Record<string, boolean>>({});
  const allChecked = TERMS.every(t => agreed[t.id]);
  const requiredChecked = TERMS.filter(t => t.required).every(t => agreed[t.id]);

  const toggleAll = () => {
    if (allChecked) setAgreed({});
    else setAgreed(Object.fromEntries(TERMS.map(t => [t.id, true])));
  };

  /* step2 – PASS 인증 */
  const [phone, setPhone]         = useState('');
  const [passModal, setPassModal] = useState(false);
  const [verified, setVerified]   = useState(false);
  const [verifiedName, setVerifiedName] = useState('');

  const handlePassVerify = () => {
    // 목업: 인증 완료 처리
    setTimeout(() => {
      setVerifiedName('홍길동');
      setVerified(true);
      setPassModal(false);
    }, 1000);
  };

  /* step3 – 정보 입력 */
  const [info, setInfo] = useState({
    name: '', rrnFront: '', rrnBack: '',
    email: '', password: '', passwordConfirm: '',
    bank: '', account: '', referral: '',
  });

  const setField = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setInfo(prev => ({ ...prev, [field]: e.target.value }));

  /* step4 – 출석체크 팝업 */
  const [attendanceModal, setAttendanceModal] = useState(false);

  /* ── 네비게이션 ── */
  const canNext = () => {
    if (step === 1) return requiredChecked;
    if (step === 2) return verified;
    if (step === 3) return info.name && info.email && info.password && info.password === info.passwordConfirm;
    return true;
  };

  const handleNext = () => {
    if (step === 3) { setStep(4); setAttendanceModal(true); return; }
    if (step < TOTAL_STEPS) setStep(s => s + 1);
  };

  /* ── 렌더 ── */
  const renderStep = () => {
    switch (step) {
      /* ────── STEP 1: 약관 동의 ────── */
      case 1:
        return (
          <div className={styles.stepContent}>
            <h2>약관 동의</h2>
            <div className={styles.agreements}>
              <div className={`${styles.checkItem} ${styles.allCheck}`} onClick={toggleAll}>
                <span className={`${styles.checkbox} ${allChecked ? styles.checked : ''}`} />
                <span className={styles.allLabel}>전체 동의 (필수 + 선택 포함)</span>
              </div>
              <div className={styles.divider} />
              {TERMS.map(term => (
                <div key={term.id} className={styles.checkItem}
                  onClick={() => setAgreed(prev => ({ ...prev, [term.id]: !prev[term.id] }))}>
                  <span className={`${styles.checkbox} ${agreed[term.id] ? styles.checked : ''}`} />
                  <span>{term.label}</span>
                  <span className={`${styles.tag} ${term.required ? styles.required : styles.optional}`}>
                    {term.required ? '필수' : '선택'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      /* ────── STEP 2: PASS 본인인증 ────── */
      case 2:
        return (
          <div className={styles.stepContent}>
            <h2>본인 인증</h2>
            <p className={styles.stepDesc}>입력하신 휴대폰 번호가 로그인 아이디로 사용됩니다.</p>

            <div className={styles.phoneRow}>
              <input
                type="tel"
                placeholder="010-0000-0000"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className={styles.phoneInput}
                disabled={verified}
              />
              <button
                className={`${styles.passBtn} ${verified ? styles.passBtnDone : ''}`}
                onClick={() => !verified && setPassModal(true)}
                disabled={verified || !phone}
              >
                {verified ? '✓ 인증완료' : 'PASS 인증'}
              </button>
            </div>

            {verified && (
              <div className={styles.verifiedBadge}>
                ✅ <strong>{verifiedName}</strong>님 인증이 완료되었습니다.<br />
                <small>{phone} 번호가 로그인 아이디로 설정됩니다.</small>
              </div>
            )}

            {/* PASS 인증 모달 */}
            {passModal && (
              <div className={styles.modalOverlay}>
                <div className={`${styles.modal} glass`}>
                  <div className={styles.modalHeader}>
                    <span className={styles.passLogo}>PASS</span>
                    <button className={styles.modalClose} onClick={() => setPassModal(false)}>✕</button>
                  </div>
                  <p className={styles.modalDesc}>
                    <strong>{phone}</strong>으로<br />PASS 앱 인증 요청을 보냈습니다.
                  </p>
                  <div className={styles.passSpinner}>
                    <div className={styles.spinner} />
                    <span>앱에서 인증을 완료해주세요</span>
                  </div>
                  <button className={`btn-primary ${styles.mockVerifyBtn}`} onClick={handlePassVerify}>
                    인증 완료 (목업)
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      /* ────── STEP 3: 정보 입력 ────── */
      case 3:
        return (
          <div className={styles.stepContent}>
            <h2>정보 입력</h2>
            <form className={styles.infoForm} onSubmit={e => e.preventDefault()}>
              <div className={styles.group}>
                <label>이름 <span className={styles.req}>*</span></label>
                <input type="text" placeholder="실명 입력" value={info.name} onChange={setField('name')} />
              </div>
              <div className={styles.group}>
                <label>주민등록번호 <span className={styles.req}>*</span></label>
                <div className={styles.rrnRow}>
                  <input type="text" maxLength={6} placeholder="앞 6자리" value={info.rrnFront} onChange={setField('rrnFront')} className={styles.rrnInput} />
                  <span className={styles.rrnDash}>-</span>
                  <div className={styles.rrnBack}>
                    <input type="password" maxLength={7} placeholder="●●●●●●●" value={info.rrnBack} onChange={setField('rrnBack')} className={styles.rrnInput} />
                  </div>
                </div>
                <span className={styles.hint}>수당 지급을 위해 수집됩니다.</span>
              </div>
              <div className={styles.group}>
                <label>이메일 <span className={styles.req}>*</span></label>
                <input type="email" placeholder="example@email.com" value={info.email} onChange={setField('email')} />
              </div>
              <div className={styles.group}>
                <label>비밀번호 <span className={styles.req}>*</span></label>
                <input type="password" placeholder="영문·숫자·특수문자 조합 8자 이상" value={info.password} onChange={setField('password')} />
              </div>
              <div className={styles.group}>
                <label>비밀번호 확인 <span className={styles.req}>*</span></label>
                <input
                  type="password" placeholder="비밀번호 재입력"
                  value={info.passwordConfirm} onChange={setField('passwordConfirm')}
                  className={info.passwordConfirm && info.password !== info.passwordConfirm ? styles.inputError : ''}
                />
                {info.passwordConfirm && info.password !== info.passwordConfirm && (
                  <span className={styles.errorMsg}>비밀번호가 일치하지 않습니다.</span>
                )}
              </div>
              <div className={styles.group}>
                <label>수당 지급 계좌 <span className={styles.req}>*</span></label>
                <div className={styles.accountRow}>
                  <select value={info.bank} onChange={setField('bank')} className={styles.bankSelect}>
                    <option value="">은행 선택</option>
                    {BANKS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                  <input type="text" placeholder="계좌번호 (- 없이)" value={info.account} onChange={setField('account')} className={styles.accountInput} />
                </div>
              </div>
              <div className={styles.group}>
                <label>추천인 코드 <span className={styles.opt}>(선택)</span></label>
                <input type="text" placeholder="추천인의 코드를 입력하세요" value={info.referral} onChange={setField('referral')} />
              </div>
            </form>
          </div>
        );

      /* ────── STEP 4: 가입 완료 ────── */
      case 4:
        return (
          <div className={`${styles.stepContent} ${styles.successStep}`}>
            <div className={styles.successIcon}>🎉</div>
            <h2>가입을 축하합니다!</h2>
            <p>SNBI 회원이 되신 것을 진심으로 환영합니다.<br />지금 바로 프리미엄 혜택을 만나보세요.</p>
            <div className={styles.welcomeInfo}>
              <div className={styles.welcomeRow}>
                <span>등급</span><strong>NORMAL</strong>
              </div>
              <div className={styles.welcomeRow}>
                <span>아이디</span><strong>{phone}</strong>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.card} glass`}>
        {/* 헤더 */}
        <div className={styles.header}>
          <Link href="/" className={styles.logo}>
            <span className="text-gradient">SNBI</span>
          </Link>
          <div className={styles.steps}>
            {['약관동의','본인인증','정보입력','완료'].map((label, i) => (
              <div key={i} className={`${styles.stepItem} ${step > i + 1 ? styles.stepDone : ''} ${step === i + 1 ? styles.stepActive : ''}`}>
                <div className={styles.stepCircle}>{step > i + 1 ? '✓' : i + 1}</div>
                <span className={styles.stepLabel}>{label}</span>
                {i < 3 && <div className={`${styles.stepLine} ${step > i + 1 ? styles.stepLineDone : ''}`} />}
              </div>
            ))}
          </div>
        </div>

        {renderStep()}

        {/* 액션 버튼 */}
        <div className={styles.actions}>
          {step > 1 && step < 4 && (
            <button className={styles.prevBtn} onClick={() => setStep(s => s - 1)}>이전</button>
          )}
          {step < 4 ? (
            <button
              className="btn-primary"
              style={{ flex: 2, opacity: canNext() ? 1 : 0.4 }}
              onClick={handleNext}
              disabled={!canNext()}
            >
              {step === 1 ? '동의하고 계속' : step === 2 ? '다음' : '가입 완료'}
            </button>
          ) : (
            <Link href="/" className="btn-primary" style={{ flex: 1, display: 'block', textAlign: 'center' }}>
              쇼핑 시작하기
            </Link>
          )}
        </div>
      </div>

      {/* 출석체크 팝업 */}
      {attendanceModal && (
        <div className={styles.modalOverlay}>
          <div className={`${styles.modal} ${styles.attendanceModal} glass`}>
            <div className={styles.attendanceIcon}>📅</div>
            <h3>오늘의 출석 체크!</h3>
            <p>가입을 기념하여 첫 출석 포인트가 적립되었습니다.</p>
            <div className={styles.pointBadge}>+100P</div>
            <button className="btn-primary" style={{ width: '100%', marginTop: '20px' }}
              onClick={() => setAttendanceModal(false)}>
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
