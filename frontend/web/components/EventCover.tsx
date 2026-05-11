import { EVENT_TYPES, tonalShift, type EventItem } from '@/lib/mock-data';

export function EventCover({ event, height = 160 }: { event: EventItem; height?: number }) {
  const t = EVENT_TYPES[event.type];
  const initials = event.title.split(' ').filter(w => w.length > 2).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  return (
    <div style={{
      height,
      borderRadius: 12,
      background: `linear-gradient(135deg, ${t.color} 0%, ${tonalShift(t.color)} 100%)`,
      position: 'relative',
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      <svg width="100%" height="100%" viewBox="0 0 200 160" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, opacity: 0.18 }}>
        <defs>
          <pattern id={`p-${event.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M0 20 L20 0" stroke="white" strokeWidth="0.5" fill="none"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#p-${event.id})`}/>
      </svg>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.5) 100%)' }} />
      <div style={{ position: 'absolute', top: 14, left: 14, right: 14, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
        <div style={{ fontSize: 56, fontWeight: 800, color: 'rgba(255,255,255,0.18)', letterSpacing: '-0.04em', lineHeight: 1, fontFamily: 'Manrope' }}>{initials}</div>
      </div>
      <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14, fontSize: 15, fontWeight: 700, color: 'white', lineHeight: 1.2, letterSpacing: '-0.005em' }}>
        {event.title}
      </div>
    </div>
  );
}

export function CapacityBar({ registered, capacity, color }: { registered: number; capacity: number; color: string }) {
  const pct = Math.min(100, (registered / capacity) * 100);
  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
        <span style={{ color: 'var(--fg-2)', fontWeight: 600 }}>{registered} из {capacity} мест</span>
        <span style={{ color: 'var(--fg-4)' }}>{Math.round(pct)}%</span>
      </div>
      <div style={{ height: 4, background: 'var(--border)', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 999, transition: 'width .3s' }} />
      </div>
    </div>
  );
}

export function AvatarStack({ count }: { count: number }) {
  if (count < 5) return null;
  const colors = ['#F5A524', '#3DD68C', '#4F7FFF', '#9B5CFF', '#F25E5E'];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ display: 'flex' }}>
        {colors.slice(0, 4).map((c, i) => (
          <div key={i} style={{
            width: 26, height: 26, borderRadius: '50%',
            background: `linear-gradient(135deg, ${c}, ${tonalShift(c) || c})`,
            border: '2px solid var(--surface)',
            marginLeft: i ? -8 : 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 9, fontWeight: 700, color: 'white',
          }}>{['АК','МС','ДВ','ЕП'][i]}</div>
        ))}
        <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--surface-3)', border: '2px solid var(--surface)', marginLeft: -8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: 'var(--fg-2)' }}>+{count - 4}</div>
      </div>
      <span style={{ fontSize: 12, color: 'var(--fg-3)' }}>уже идут</span>
    </div>
  );
}
