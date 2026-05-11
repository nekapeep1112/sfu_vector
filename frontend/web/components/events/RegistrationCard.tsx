'use client';

import { useRouter } from 'next/navigation';
import { EVENT_TYPES, type EventItem } from '@/lib/mock-data';
import { CapacityBar, AvatarStack } from '../EventCover';

const IcCal = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
);
const IcClock = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
);
const IcPin = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);
const IcFormat = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
);
const IcRuble = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 21V5h6.5a4.5 4.5 0 0 1 0 9H5M5 17h11"/></svg>
);

export function RegistrationCard({ event }: { event: EventItem }) {
  const router = useRouter();
  const t = EVENT_TYPES[event.type];
  const rows = [
    { label: 'Когда',        value: `${event.date.d} ${event.date.m}, ${event.time}`, icon: <IcCal s={14}/> },
    { label: 'Длительность', value: event.duration,                                   icon: <IcClock s={14}/> },
    { label: 'Место',        value: event.loc,                                        icon: <IcPin s={14}/> },
    { label: 'Формат',       value: event.format,                                     icon: <IcFormat s={14}/> },
    { label: 'Цена',         value: 'Бесплатно',                                      icon: <IcRuble s={14}/> },
  ];
  return (
    <aside className="card" style={{ padding: 24, position: 'sticky', top: 88, alignSelf: 'flex-start' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 700, color: 'var(--green)', marginBottom: 16 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 0 4px rgba(5,150,105,0.15)' }}/>
        Регистрация открыта
      </div>

      <div style={{ marginBottom: 14 }}>
        <CapacityBar registered={event.registered} capacity={event.capacity} color={t.color}/>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <AvatarStack count={event.registered}/>
      </div>

      <div style={{ borderTop: '1px solid var(--border)', margin: '16px 0' }}/>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
            <span style={{ color: 'var(--fg-4)', display: 'inline-flex', width: 16, justifyContent: 'center' }}>{r.icon}</span>
            <span style={{ fontSize: 10, color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, width: 80, flexShrink: 0 }}>{r.label}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg)', flex: 1, textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.value}</span>
          </div>
        ))}
      </div>

      {event.myStatus === 'registered' ? (
        <button
          className="btn btn-primary"
          onClick={() => router.push(`/dashboard/events/${event.id}/ticket`)}
          style={{ width: '100%', justifyContent: 'center', height: 48, fontSize: 15, fontWeight: 700, marginBottom: 8 }}
        >
          Открыть мой билет
        </button>
      ) : event.myStatus === 'pending' ? (
        <button
          className="btn btn-ghost"
          disabled
          style={{ width: '100%', justifyContent: 'center', height: 48, fontSize: 15, fontWeight: 700, marginBottom: 8, cursor: 'not-allowed' }}
        >
          Заявка на рассмотрении
        </button>
      ) : (
        <button
          className="btn btn-primary"
          onClick={() => router.push(`/dashboard/events/${event.id}/register`)}
          style={{ width: '100%', justifyContent: 'center', height: 48, fontSize: 15, fontWeight: 700, marginBottom: 8 }}
        >
          Участвовать
        </button>
      )}
      <button
        className="btn btn-ghost btn-sm"
        onClick={() => console.log('TODO: generate ics')}
        style={{ width: '100%', justifyContent: 'center' }}
      >
        Скачать в календарь .ics
      </button>

      <div style={{ marginTop: 14, fontSize: 11, color: 'var(--fg-4)', textAlign: 'center' }}>
        {event.myStatus === 'registered'
          ? `Ты зарегистрирован · ${event.date.d} ${event.date.m}, ${event.time}`
          : event.myStatus === 'pending'
            ? 'Решение придёт в течение 1–2 дней'
            : 'Регистрация открыта до 19 мая, 23:59'}
      </div>
    </aside>
  );
}
