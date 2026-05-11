import Link from 'next/link';
import type { EventItem } from '@/lib/mock-data';

const IcCheckCircle = ({ s = 12 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/></svg>
);

type Row = { l: string; v: string; accent?: boolean; verified?: boolean };

export function EventInfoSidecard({ event }: { event: EventItem }) {
  const rows: Row[] = [
    { l: 'Когда',            v: '20 мая, 14:00 — 22 мая' },
    { l: 'Длительность',     v: '2 дня' },
    { l: 'Где',              v: 'Библиотека СФУ, корп. Л, ауд. 5-08' },
    { l: 'Формат',           v: 'Очно' },
    { l: 'Часов активности', v: '16 ч', accent: true },
    { l: 'Организатор',      v: 'Студсовет ИКИТ', verified: true },
  ];
  return (
    <aside className="card" style={{ padding: 24, position: 'sticky', top: 88, alignSelf: 'flex-start' }}>
      <h4 className="h4" style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>О мероприятии</h4>
      <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, fontSize: 13 }}>
            <span style={{ color: 'var(--fg-4)', flexShrink: 0 }}>{r.l}</span>
            <span style={{
              color: r.accent ? 'var(--blue)' : 'var(--fg)',
              fontWeight: r.accent ? 700 : 500,
              textAlign: 'right',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              {r.v}
              {r.verified && <span style={{ color: 'var(--green)', display: 'inline-flex' }}><IcCheckCircle s={12}/></span>}
            </span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 20, borderTop: '1px solid var(--border)', paddingTop: 16 }}>
        <Link href={`/dashboard/events/${event.id}`} style={{ fontSize: 13, color: 'var(--blue)', fontWeight: 600, textDecoration: 'none' }}>Открыть карточку события →</Link>
      </div>
    </aside>
  );
}
