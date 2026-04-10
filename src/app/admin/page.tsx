export default function AdminDashboardPage() {
  return (
    <div>
      <h1>대시보드</h1>
      <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>
        환영합니다! SNBi 관리자 시스템입니다. 왼쪽 메뉴를 통해 상세 관리를 진행하실 수 있습니다.
      </p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '30px'
      }}>
        {['오늘의 가입자', '결제 대기', '출고 대기', '정산 예정 리워드'].map((title, i) => (
          <div key={i} style={{
            background: 'var(--color-background-light, #111)',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid var(--color-border, #333)'
          }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', marginBottom: '10px' }}>{title}</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>0</div>
          </div>
        ))}
      </div>
    </div>
  );
}
