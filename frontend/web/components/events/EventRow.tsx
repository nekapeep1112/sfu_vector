import Link from 'next/link';
import { EVENT_TYPES, type EventItem } from '@/lib/mock-data';
import { EventCover, CapacityBar, AvatarStack } from '../EventCover';

export function EventRow({ event }: { event: EventItem }) {
  const t = EVENT_TYPES[event.type];
  const beFirst = event.registered === 0 || event.registered < 5;
  const href = `/dashboard/events/${event.id}`;
  return (
    <Link href={href} className="card card-hover" style={{
      padding: 16,
      display: 'grid',
      gridTemplateColumns: '180px minmax(0, 1fr) 220px',
      gap: 20,
      alignItems: 'stretch',
      textDecoration: 'none',
      color: 'inherit',
    }}>
      <div style={{ position: 'relative', height: 140 }}>
        <EventCover event={event} height={140}/>
        <div style={{
          position: 'absolute', top: 10, left: 10,
          background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(15,23,42,0.1)',
          borderRadius: 10,
          padding: '6px 10px',
          textAlign: 'center',
          minWidth: 50,
          boxShadow: '0 2px 8px rgba(15,23,42,0.08)',
        }}>
          <div style={{ fontSize: 18, fontWeight: 800, lineHeight: 1, color: 'var(--fg)', letterSpacing: '-0.02em' }}>{event.date.d}</div>
          <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 2 }}>{event.date.m} · {event.date.wd}</div>
        </div>
      </div>

      <div className="col" style={{ minWidth: 0, gap: 8, justifyContent: 'space-between' }}>
        <div className="col" style={{ gap: 8, minWidth: 0 }}>
          <div className="row gap-2" style={{ flexWrap: 'wrap', rowGap: 6 }}>
            <span style={{ background: t.bg, border: `1px solid ${t.color}40`, color: t.color, padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap' }}>● {t.label}</span>
            <span className="chip" style={{ fontSize: 11, whiteSpace: 'nowrap' }}>{event.format}</span>
            {beFirst && (
              <span style={{ background: 'var(--grad)', color: 'white', padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' }}>Будь первым</span>
            )}
          </div>
          <div style={{
            fontSize: 16, fontWeight: 700,
            letterSpacing: '-0.005em',
            lineHeight: 1.3,
            wordBreak: 'break-word',
            overflowWrap: 'anywhere',
          }}>{event.title}</div>
        </div>

        <div className="col" style={{ gap: 4, minWidth: 0, fontSize: 12 }}>
          <div className="row gap-2" style={{ color: 'var(--fg-3)', minWidth: 0 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0 }}>{event.loc}</span>
          </div>
          <div className="row gap-2" style={{ color: 'var(--fg-4)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
            <span>{event.time} · {event.duration}</span>
          </div>
          <div style={{ color: 'var(--fg-4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Организатор: {event.org}</div>
        </div>
      </div>

      <div className="col" style={{ gap: 12, justifyContent: 'space-between', minWidth: 0 }}>
        <div className="col gap-3">
          <CapacityBar registered={event.registered} capacity={event.capacity} color={t.color}/>
          <AvatarStack count={event.registered}/>
        </div>
        <span className="btn btn-primary btn-sm" style={{ justifyContent: 'center', height: 36, width: '100%' }}>Участвовать</span>
      </div>
    </Link>
  );
}
