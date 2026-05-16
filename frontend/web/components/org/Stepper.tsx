const STEPS = [
  { n: 1, label: 'Основное' },
  { n: 2, label: 'Когда и где' },
  { n: 3, label: 'Регистрация' },
  { n: 4, label: 'Публикация' },
];

const IconCheck = ({ s = 16 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export function Stepper({ current, steps = STEPS }: { current: number; steps?: { n: number; label: string }[] }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0 32px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        {steps.map((s, i) => {
          const done = s.n < current;
          const active = s.n === current;
          const future = s.n > current;
          return (
            <div key={s.n} style={{ display: 'flex', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 88 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 12,
                  background: future ? 'var(--surface)' : 'var(--grad)',
                  border: future ? '1px solid var(--border)' : 'none',
                  color: future ? 'var(--fg-4)' : 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 14,
                  boxShadow: active ? '0 6px 16px rgba(37,99,235,0.30)' : 'none',
                  transition: 'all .2s',
                }}>
                  {done ? <IconCheck s={16}/> : s.n}
                </div>
                <div style={{
                  marginTop: 8,
                  fontSize: 11,
                  fontWeight: active ? 700 : 500,
                  color: active ? 'var(--fg)' : 'var(--fg-3)',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}>{s.label}</div>
              </div>
              {i < steps.length - 1 && (
                <div style={{
                  width: 60, height: 2,
                  marginTop: 17,
                  background: s.n < current ? 'var(--grad)' : 'var(--border)',
                  borderRadius: 1,
                }}/>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
