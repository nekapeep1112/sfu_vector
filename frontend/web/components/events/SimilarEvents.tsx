import Link from 'next/link';
import { EVENTS, EVENT_TYPES } from '@/lib/mock-data';
import { EventCover } from '../EventCover';

const IcPin = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);

export function SimilarEvents({ excludeId }: { excludeId?: number }) {
  const items = EVENTS.filter(e => e.id !== excludeId).slice(0, 3);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      {items.map(e => {
        const t = EVENT_TYPES[e.type];
        return (
          <Link
            key={e.id}
            href={`/dashboard/events/${e.id}`}
            className="card card-hover"
            style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit' }}
          >
            <div style={{ position: 'relative' }}>
              <EventCover event={e} height={140}/>
              <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', border: '1px solid rgba(15,23,42,0.1)', borderRadius: 10, padding: '6px 10px', textAlign: 'center', minWidth: 50 }}>
                <div style={{ fontSize: 18, fontWeight: 800, lineHeight: 1, color: 'var(--fg)', letterSpacing: '-0.02em' }}>{e.date.d}</div>
                <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 2 }}>{e.date.m}</div>
              </div>
            </div>
            <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
              <span style={{ background: t.bg, border: `1px solid ${t.color}40`, color: t.color, padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, alignSelf: 'flex-start' }}>● {t.label}</span>
              <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.3, color: 'var(--fg)' }}>{e.title}</div>
              <div style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
                <IcPin s={11}/> <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.loc}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
