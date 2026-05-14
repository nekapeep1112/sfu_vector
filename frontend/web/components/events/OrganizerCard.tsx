'use client';

import { useRouter } from 'next/navigation';
import { tonalShift } from '@/lib/mock-data';

const IcCheck = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/></svg>
);

const IcArrow = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
);

export function OrganizerCard({
  abbr, label, color, eventsCount, participants, orgId,
}: {
  abbr: string;
  label: string;
  color: string;
  eventsCount: number;
  participants: string;
  orgId?: number;
}) {
  const router = useRouter();
  const initials = abbr.slice(0, 2);
  const onClick = () => {
    if (orgId) router.push(`/dashboard/organizations/${orgId}`);
    else console.log('TODO: org profile (no orgId mapping)', abbr);
  };
  return (
    <div
      className="card card-hover"
      onClick={onClick}
      style={{ padding: 20, flex: 1, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 14 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 56, height: 56, borderRadius: 14, background: `linear-gradient(135deg, ${color}, ${tonalShift(color)})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 16, fontWeight: 800, flexShrink: 0, letterSpacing: '-0.01em' }}>{initials}</div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--fg)' }}>{label}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--green)', marginTop: 4 }}>
            <span style={{ color: 'var(--green)', display: 'inline-flex' }}><IcCheck s={12}/></span>
            Верифицированная организация
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--fg-3)' }}>
        <span>{eventsCount} мероприятий</span>
        <span style={{ color: 'var(--fg-4)' }}>·</span>
        <span>{participants} участников</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
        <span style={{ fontSize: 13, color: 'var(--blue)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          Открыть профиль <IcArrow s={12}/>
        </span>
      </div>
    </div>
  );
}
