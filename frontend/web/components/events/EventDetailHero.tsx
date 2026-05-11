'use client';

// NOTE: дублирует действия из BreadcrumbActions сверху страницы.
// В будущем оба места должны быть подключены к одному стейту/контексту.

import { EVENT_TYPES, type EventItem } from '@/lib/mock-data';
import { EventCover } from '../EventCover';

const IcStar = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
);

const IcShare = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
);

export function EventDetailHero({ event }: { event: EventItem }) {
  const t = EVENT_TYPES[event.type];
  const actionBtnStyle: React.CSSProperties = {
    width: 40, height: 40, borderRadius: 12,
    background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
    border: '1px solid rgba(15,23,42,0.1)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'var(--fg)', cursor: 'pointer',
    boxShadow: '0 6px 20px rgba(15,23,42,0.15)',
  };
  return (
    <div>
      <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', marginBottom: 24 }}>
        <EventCover event={event} height={380}/>
        <div style={{
          position: 'absolute', top: 16, left: 16,
          background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(15,23,42,0.1)',
          borderRadius: 14, padding: '10px 14px', textAlign: 'center',
          minWidth: 64, boxShadow: '0 6px 20px rgba(15,23,42,0.18)',
        }}>
          <div style={{ fontSize: 32, fontWeight: 800, lineHeight: 1, color: 'var(--fg)', letterSpacing: '-0.03em' }}>{event.date.d}</div>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>{event.date.m} · {event.date.wd}</div>
        </div>
        <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 8 }}>
          <button
            onClick={() => console.log('TODO: toggle favorite (hero copy)')}
            style={actionBtnStyle}
            aria-label="В избранное"
          >
            <IcStar s={16}/>
          </button>
          <button
            onClick={() => console.log('TODO: web share api (hero copy)')}
            style={actionBtnStyle}
            aria-label="Поделиться"
          >
            <IcShare s={16}/>
          </button>
        </div>
      </div>

      <div style={{ marginBottom: 8 }}>
        <span style={{ background: t.bg, border: `1px solid ${t.color}40`, color: t.color, padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 600, display: 'inline-block' }}>● {t.label}</span>
      </div>
      <h2 className="h2" style={{ margin: 0, fontSize: 36, lineHeight: 1.15, letterSpacing: '-0.025em', wordBreak: 'break-word' }}>{event.title}</h2>
      {/* TODO: brief из реальной модели event.brief */}
      <p style={{ fontSize: 17, color: 'var(--fg-2)', marginTop: 8, marginBottom: 0, lineHeight: 1.5 }}>
        Двухдневный хакатон от ИКИТ и Профсоюза СФУ. Командная разработка решений для университета — от идеи до прототипа за 48 часов.
      </p>
    </div>
  );
}
