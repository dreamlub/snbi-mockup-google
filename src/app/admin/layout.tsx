import type { Metadata } from 'next';
import AdminSidebar from '@/components/admin/AdminSidebar';
import styles from './layout.module.css';

export const metadata: Metadata = {
  title: 'SNBI Admin',
  description: 'SNBI Shopping Mall Admin Dashboard',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.adminLayout}>
      <AdminSidebar />
      <main className={styles.adminMain}>
        <header className={styles.adminHeader}>
          <div style={{ fontWeight: 'bold' }}>관리자 대시보드</div>
        </header>
        <div className={styles.adminContent}>
          {children}
        </div>
      </main>
    </div>
  );
}
