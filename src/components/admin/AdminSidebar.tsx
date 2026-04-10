import Link from 'next/link';
import styles from './AdminSidebar.module.css';

export default function AdminSidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <Link href="/admin" style={{ textDecoration: 'none' }}>
          <h2>SNBi Admin <span style={{fontSize: '0.8rem', color: '#666'}}>Beta</span></h2>
        </Link>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li><Link href="/admin">대시보드</Link></li>
          <li><Link href="/admin/users">사용자 관리</Link></li>
          <li><Link href="/admin/products">상품 관리</Link></li>
          <li><Link href="/admin/orders">주문 관리</Link></li>
          <li><Link href="/admin/payments">결제 관리</Link></li>
          <li><Link href="/admin/network">네트워크 관리</Link></li>
          <li><Link href="/admin/promotions">쿠폰 · 프로모션</Link></li>
          <li><Link href="/admin/reports">통계 · 리포트</Link></li>
        </ul>
      </nav>
      <div className={styles.footer}>
        <Link href="/">쇼핑몰로 돌아가기</Link>
      </div>
    </aside>
  );
}
