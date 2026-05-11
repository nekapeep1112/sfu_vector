import type { EventItem } from '@/lib/mock-data';

// TODO: программа из реальной модели event.program
export function EventProgramTimeline({ event: _event }: { event?: EventItem } = {}) {
  const days = [
    { title: 'ДЕНЬ 1 — 20 мая', steps: [
      { t: '14:00', d: 'Открытие, приветствие, постановка задач' },
      { t: '15:00', d: 'Знакомство, сбор команд' },
      { t: '17:00', d: 'Первый чек-ин с менторами' },
      { t: '19:00', d: 'Кофебрейк и нетворкинг' },
    ]},
    { title: 'ДЕНЬ 2 — 21 мая', steps: [
      { t: '10:00', d: 'Утренний стендап' },
      { t: '14:00', d: 'Промежуточные демо' },
      { t: '18:00', d: 'Финальные демо и питчи' },
      { t: '20:00', d: 'Награждение и фуршет' },
    ]},
  ];
  return (
    <div>
      {days.map((day, di) => (
        <div key={di} style={{ marginBottom: di === days.length - 1 ? 0 : 24 }}>
          <h4 className="h4" style={{ margin: 0, marginTop: di === 0 ? 0 : 8, marginBottom: 12, fontSize: 13, fontWeight: 700, color: 'var(--fg-3)', letterSpacing: '0.08em' }}>{day.title}</h4>
          <div style={{ position: 'relative' }}>
            {day.steps.map((s, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 16, alignItems: 'flex-start', position: 'relative', paddingBottom: i === day.steps.length - 1 ? 0 : 14 }}>
                <div className="mono" style={{ fontSize: 13, color: 'var(--fg-3)', fontFamily: 'JetBrains Mono, monospace', paddingTop: 1 }}>{s.t}</div>
                <div style={{ position: 'relative', paddingLeft: 18 }}>
                  <span style={{ position: 'absolute', left: 0, top: 5, width: 9, height: 9, borderRadius: '50%', background: 'linear-gradient(135deg, var(--blue), var(--violet))', boxShadow: '0 0 0 3px var(--bg)' }}/>
                  {i !== day.steps.length - 1 && (
                    <span style={{ position: 'absolute', left: 4, top: 14, bottom: -8, width: 1, background: 'var(--border)' }}/>
                  )}
                  <div style={{ fontSize: 14, color: 'var(--fg)', lineHeight: 1.4 }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
