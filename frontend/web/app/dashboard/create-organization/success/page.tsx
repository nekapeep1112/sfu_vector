import Link from 'next/link';

const IconCheck = ({ s = 32 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export default function CreateOrganizationSuccessPage() {
  return (
    <div style={{
      maxWidth: 560, margin: '0 auto', padding: '80px 24px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
    }}>
      <div style={{
        width: 80, height: 80, borderRadius: '50%',
        background: 'color-mix(in oklab, var(--green) 16%, transparent)',
        color: 'var(--green)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 24,
      }}>
        <IconCheck s={36}/>
      </div>

      <h1 className="h1" style={{ margin: 0, fontSize: 36, lineHeight: 1.1 }}>Заявка отправлена!</h1>

      <p style={{
        margin: '16px 0 32px',
        fontSize: 15, lineHeight: 1.6, color: 'var(--fg-3)',
      }}>
        Спасибо! Твоя заявка на создание организации отправлена на модерацию. Обычно решение принимается в течение 1–3 рабочих дней. Ты получишь уведомление о результате.
      </p>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/dashboard" className="btn btn-ghost" style={{ height: 44, padding: '0 22px' }}>
          Вернуться на главную
        </Link>
        <Link href="/dashboard/profile?tab=applications" className="btn btn-primary" style={{ height: 44, padding: '0 22px', fontWeight: 700 }}>
          Посмотреть статус
        </Link>
      </div>
    </div>
  );
}
