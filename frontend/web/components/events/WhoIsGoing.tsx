'use client';

import { tonalShift, type EventItem } from '@/lib/mock-data';

export function WhoIsGoing({ event }: { event: EventItem }) {
  const palette = ['#2563EB', '#7C3AED', '#059669', '#D97706', '#DC2626', '#0EA5E9', '#EA580C', '#0891B2'];
  const initials = ['АК', 'МС', 'ДВ', 'ЕП', 'РК', 'ОЛ', 'ИГ', 'НТ'];
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
        {initials.map((ini, i) => (
          <div key={i} style={{
            width: 40, height: 40, borderRadius: '50%',
            background: `linear-gradient(135deg, ${palette[i]}, ${tonalShift(palette[i])})`,
            border: '3px solid var(--surface)',
            marginLeft: i ? -10 : 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 700, fontSize: 12,
            boxShadow: '0 2px 6px rgba(15,23,42,0.1)',
          }}>{ini}</div>
        ))}
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: 'var(--surface-3)', border: '3px solid var(--surface)',
          marginLeft: -10, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--fg-2)', fontWeight: 700, fontSize: 12,
        }}>+{event.registered - 8}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <div style={{ fontSize: 13, color: 'var(--fg-3)' }}>
          {event.registered} из {event.capacity} мест занято · регистрация до 19 мая
        </div>
        <button
          onClick={() => console.log('TODO: participants list')}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: 13, color: 'var(--blue)', fontWeight: 600 }}
        >
          Все участники →
        </button>
      </div>
    </div>
  );
}
