import { IconTrendUp, IconTrendDown } from './icons';

interface MetricTileProps {
  color: string;
  icon: React.ReactNode;
  value: string;
  delta?: string;
  deltaDir?: 'up' | 'down' | 'flat';
  label: string;
}

export function MetricTile({ color, icon, value, delta, deltaDir, label }: MetricTileProps) {
  return (
    <div className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{
        width: 32, height: 32, borderRadius: 10,
        background: `color-mix(in oklab, ${color} 14%, transparent)`,
        color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{icon}</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, flexWrap: 'wrap' }}>
        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--fg)', lineHeight: 1 }}>{value}</div>
        {delta && (
          <div style={{
            fontSize: 11,
            color: deltaDir === 'up' ? 'var(--green)' : deltaDir === 'down' ? 'var(--red)' : 'var(--fg-4)',
            display: 'inline-flex', alignItems: 'center', gap: 4,
            fontWeight: 600, paddingBottom: 3,
          }}>
            {deltaDir === 'up' && <IconTrendUp s={11}/>}
            {deltaDir === 'down' && <IconTrendDown s={11}/>}
            {delta}
          </div>
        )}
      </div>
      <div style={{ fontSize: 12, color: 'var(--fg-3)' }}>{label}</div>
    </div>
  );
}
