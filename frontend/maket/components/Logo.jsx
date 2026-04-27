// СФУ.Вектор — official mark: hexagon with vertex nodes + network lines + vector arrow inside
function LogoMark({ px = 44 }) {
  // hexagon vertices on a circle of radius R, oriented flat-top (vertex at top)
  // Use viewBox 100x100 so all coords are in % terms
  const R = 42;
  const cx = 50, cy = 50;
  const verts = Array.from({ length: 6 }, (_, i) => {
    // pointy-top hexagon: first vertex at top
    const a = -Math.PI / 2 + i * (Math.PI / 3);
    return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) };
  });
  const hexPath = verts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ') + ' Z';

  return (
    <svg width={px} height={px} viewBox="0 0 100 100" style={{ display: 'block', flexShrink: 0 }}>
      <defs>
        <linearGradient id="logoStrokeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4F7FFF"/>
          <stop offset="0.5" stopColor="#7B6BFF"/>
          <stop offset="1" stopColor="#9B5CFF"/>
        </linearGradient>
        <linearGradient id="logoArrowGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4F7FFF"/>
          <stop offset="1" stopColor="#9B5CFF"/>
        </linearGradient>
        <linearGradient id="logoNodeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6FA0FF"/>
          <stop offset="1" stopColor="#9B5CFF"/>
        </linearGradient>
      </defs>

      {/* hexagon outline */}
      <path d={hexPath} fill="none" stroke="url(#logoStrokeGrad)" strokeWidth="3" strokeLinejoin="round"/>

      {/* vector arrow inside */}
      <g>
        <path
          d="M 36 30 L 64 50 L 36 70 L 44 50 Z"
          fill="url(#logoArrowGrad)"
        />
      </g>

      {/* vertex nodes — drawn last so they sit on top of the hex stroke */}
      {verts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="6" fill="url(#logoNodeGrad)" stroke="#FFFFFF" strokeWidth="1.4"/>
      ))}
    </svg>
  );
}

function Logo({ size = 'md', tagline = true }) {
  const px = size === 'sm' ? 32 : size === 'lg' ? 56 : 40;
  const wordSize = size === 'lg' ? 22 : size === 'sm' ? 14 : 17;
  return (
    <div className="row gap-3" style={{ alignItems: 'center' }}>
      <LogoMark px={px}/>
      <div className="col" style={{ gap: tagline ? 3 : 0 }}>
        <div style={{
          fontSize: wordSize,
          fontWeight: 800,
          letterSpacing: '-0.01em',
          lineHeight: 1,
          display: 'flex',
          alignItems: 'baseline',
        }}>
          <span style={{ color: 'var(--fg)' }}>СФУ</span>
          <span style={{
            background: 'linear-gradient(90deg, var(--blue) 0%, var(--violet) 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}>.Вектор</span>
        </div>
        {tagline && (
          <div style={{ fontSize: 10, color: 'var(--fg-4)', lineHeight: 1.3, maxWidth: 200, letterSpacing: '0.02em' }}>
            единое пространство<br/>студенческих возможностей
          </div>
        )}
      </div>
    </div>
  );
}

window.Logo = Logo;
window.LogoMark = LogoMark;
