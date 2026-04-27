import { EVENT_TYPES, type EventItem } from '@/lib/mock-data';
import { EventCover, CapacityBar } from '../EventCover';

export function CompactEventCard({ event }: { event: EventItem }) {
  const t = EVENT_TYPES[event.type];
  return (
    <div className="card card-hover" style={{ width: 280, flexShrink: 0, padding: 0, overflow: 'hidden', cursor: 'pointer', scrollSnapAlign: 'start' }}>
      <EventCover event={event} height={140}/>
      <div style={{ padding: 16 }}>
        <div className="row gap-2" style={{ marginBottom: 10 }}>
          <div style={{
            background: t.bg, border: `1px solid ${t.color}40`, color: t.color,
            padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600,
          }}>{t.label}</div>
          <span className="mono" style={{ fontSize: 11, color: 'var(--fg-4)' }}>{event.format}</span>
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.3, marginBottom: 8, height: 36, overflow: 'hidden' }}>{event.title}</div>
        <div className="row gap-2" style={{ fontSize: 12, color: 'var(--fg-3)', marginBottom: 12 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>
          {event.date.d} {event.date.m} · {event.time}
        </div>
        <CapacityBar registered={event.registered} capacity={event.capacity} color={t.color}/>
      </div>
    </div>
  );
}
