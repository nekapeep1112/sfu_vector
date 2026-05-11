import { EVENT_TYPES, type EventItem } from '@/lib/mock-data';
import { EventCover } from '@/components/EventCover';

const IcCal = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
);
const IcPin = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);
const IcUsers = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const IcOrg = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21V7l9-4 9 4v14"/><path d="M9 21V12h6v9"/><path d="M3 21h18"/></svg>
);

export function MiniSummaryCard({ event }: { event: EventItem }) {
  const t = EVENT_TYPES[event.type];
  const lines = [
    { ic: <IcCal s={14}/>,   txt: '20 мая, 14:00 · 2 дня' },
    { ic: <IcPin s={14}/>,   txt: 'Библиотека СФУ, ауд. 5-08' },
    { ic: <IcUsers s={14}/>, txt: '47 из 200 мест' },
    { ic: <IcOrg s={14}/>,   txt: 'Студсовет ИКИТ' },
  ];
  return (
    <aside className="card" style={{ padding: 0, overflow: 'hidden', position: 'sticky', top: 88, alignSelf: 'flex-start' }}>
      <EventCover event={event} height={140}/>
      <div style={{ padding: 20 }}>
        <span style={{ background: t.bg, border: `1px solid ${t.color}40`, color: t.color, padding: '4px 10px', borderRadius: 8, fontSize: 11, fontWeight: 600, display: 'inline-block' }}>● {t.label}</span>
        <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.3, color: 'var(--fg)', marginTop: 10 }}>Хакатон Siberian Hack 2026</div>
        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {lines.map((l, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--fg-3)' }}>
              <span style={{ color: 'var(--fg-4)', display: 'inline-flex' }}>{l.ic}</span>
              <span>{l.txt}</span>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--border)', marginTop: 16, paddingTop: 14 }}>
          <div style={{ fontSize: 11, color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>Тебе начислят после участия</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: 'var(--blue)', lineHeight: 1 }}>16 ч</span>
            <span style={{ fontSize: 12, color: 'var(--fg-3)' }}>в портфолио активности</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
