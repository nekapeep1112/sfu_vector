export function CapacitySlider({ value = 80 }: { value?: number }) {
  const stops = [0, 25, 50, 100, 250, 500];
  let pct = 0;
  if (value >= 500) pct = 100;
  else {
    for (let i = 0; i < stops.length - 1; i++) {
      if (value >= stops[i] && value <= stops[i + 1]) {
        const frac = (value - stops[i]) / (stops[i + 1] - stops[i]);
        pct = ((i + frac) / (stops.length - 1)) * 100;
        break;
      }
    }
  }
  return (
    <div style={{ marginTop: 14 }}>
      <div style={{ position: 'relative', height: 6, background: 'var(--border)', borderRadius: 999 }}>
        <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${pct}%`, background: 'var(--grad)', borderRadius: 999 }}/>
        {stops.map((_, i) => (
          <div key={i} style={{
            position: 'absolute', left: `${(i / (stops.length - 1)) * 100}%`,
            top: '50%', transform: 'translate(-50%, -50%)',
            width: 8, height: 8, borderRadius: '50%',
            background: 'var(--surface)', border: '2px solid var(--fg-4)',
          }}/>
        ))}
        <div style={{
          position: 'absolute', left: `${pct}%`, top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 18, height: 18, borderRadius: '50%',
          background: 'white', border: '3px solid var(--blue)',
          boxShadow: '0 4px 10px rgba(37,99,235,0.30)',
        }}/>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
        {stops.map((s, i) => (
          <span key={i} style={{ fontSize: 11, color: 'var(--fg-4)', fontWeight: 500 }}>
            {s === 500 ? '500+' : s}
          </span>
        ))}
      </div>
    </div>
  );
}
