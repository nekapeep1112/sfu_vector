import { EVENTS, tonalShift } from '@/lib/mock-data';
import { EventCover } from '../EventCover';

export function WheelPreview() {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at center, rgba(79,127,255,0.15), transparent 70%)' }}>
      <svg width="240" height="180" viewBox="-120 -90 240 180">
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const x = Math.cos(a) * 60;
          const y = Math.sin(a) * 60;
          return <circle key={i} cx={x} cy={y} r="14" fill="var(--surface-2)" stroke="var(--border)" strokeWidth="1"/>;
        })}
        <circle cx="0" cy="0" r="22" fill="url(#g-wheel)" />
        <defs>
          <linearGradient id="g-wheel" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#4F7FFF"/>
            <stop offset="1" stopColor="#9B5CFF"/>
          </linearGradient>
        </defs>
        <text x="0" y="4" textAnchor="middle" fontSize="10" fontWeight="700" fill="white">СФУ</text>
      </svg>
    </div>
  );
}

export function EventsPreview() {
  return (
    <div style={{ position: 'absolute', inset: 16, display: 'flex', gap: 8 }}>
      {EVENTS.slice(0, 3).map((e, i) => (
        <div key={e.id} style={{
          flex: 1, height: '100%',
          borderRadius: 8, overflow: 'hidden',
          transform: `rotate(${(i - 1) * 2}deg) translateY(${Math.abs(i - 1) * 8}px)`,
          transition: 'transform .3s',
        }}>
          <EventCover event={e} height={148}/>
        </div>
      ))}
    </div>
  );
}

export function OrgsPreview() {
  const orgs = [
    { abbr: 'СС', col: '#4F7FFF', name: 'Студсовет' },
    { abbr: 'ВЦ', col: '#3DD68C', name: 'Волонтёры' },
    { abbr: 'МД', col: '#9B5CFF', name: 'Медиа' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, background: 'radial-gradient(circle at center, rgba(155,92,255,0.12), transparent 70%)' }}>
      {orgs.map((o, i) => (
        <div key={i} style={{
          width: 80, height: 100,
          borderRadius: 12,
          background: 'var(--surface-2)',
          border: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
          padding: 12,
          position: 'relative',
        }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: `linear-gradient(135deg, ${o.col}, ${tonalShift(o.col)})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: 'white' }}>{o.abbr}</div>
          <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--fg-2)' }}>{o.name}</div>
          <div style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green)' }}/>
        </div>
      ))}
    </div>
  );
}
