const IconBigCheck = ({ s = 40 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
);

export function ApplicationsEmpty({
  onViewApproved,
  onCreateEvent,
}: {
  onViewApproved: () => void;
  onCreateEvent: () => void;
}) {
  return (
    <div className="card" style={{
      padding: 60, textAlign: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 0%, color-mix(in oklab, var(--green) 8%, transparent), transparent 60%)',
        pointerEvents: 'none',
      }}/>
      <div style={{ position: 'relative' }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: 'color-mix(in oklab, var(--green) 14%, transparent)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--green)',
        }}>
          <IconBigCheck s={40}/>
        </div>
        <h2 className="h2" style={{ margin: '24px 0 0 0' }}>Всё разобрано</h2>
        <div style={{ fontSize: 14, color: 'var(--fg-3)', maxWidth: 420, margin: '8px auto 0' }}>
          Ты обработал все заявки. Когда придут новые — увидишь их здесь.
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 28 }}>
          <button className="btn btn-ghost" onClick={onViewApproved}>Посмотреть одобренные</button>
          <button className="btn btn-primary" onClick={onCreateEvent}>+ Создать новое мероприятие</button>
        </div>
      </div>
    </div>
  );
}
