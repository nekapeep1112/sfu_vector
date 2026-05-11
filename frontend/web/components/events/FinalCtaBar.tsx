'use client';

import { useRouter } from 'next/navigation';
import type { EventItem } from '@/lib/mock-data';

const IcStar = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
);

export function FinalCtaBar({ event }: { event: EventItem }) {
  const router = useRouter();
  return (
    <div className="card" style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.title}</div>
        <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 2 }}>{event.registered} из {event.capacity} мест · регистрация до 19 мая</div>
      </div>
      <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
        <button
          className="btn btn-ghost"
          onClick={() => console.log('TODO: favorite')}
          style={{ width: 44, height: 44, justifyContent: 'center', padding: 0 }}
        >
          <IcStar s={16}/>
        </button>
        {event.myStatus === 'registered' ? (
          <button
            className="btn btn-primary"
            onClick={() => router.push(`/dashboard/events/${event.id}/ticket`)}
            style={{ height: 44, padding: '0 24px', fontWeight: 700 }}
          >
            Открыть мой билет
          </button>
        ) : event.myStatus === 'pending' ? (
          <button
            className="btn btn-ghost"
            disabled
            style={{ height: 44, padding: '0 24px', fontWeight: 700, cursor: 'not-allowed' }}
          >
            Заявка на рассмотрении
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => router.push(`/dashboard/events/${event.id}/register`)}
            style={{ height: 44, padding: '0 24px', fontWeight: 700 }}
          >
            Участвовать
          </button>
        )}
      </div>
    </div>
  );
}
