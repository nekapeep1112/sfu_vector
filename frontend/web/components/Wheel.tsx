'use client';

import { INSTITUTES } from '@/lib/mock-data';

type WheelProps = {
  hovered: string | null;
  setHovered: (v: string | null) => void;
  selected: string;
  setSelected: (v: string) => void;
};

const f = (n: number) => n.toFixed(3);

export function Wheel({ hovered, setHovered, selected, setSelected }: WheelProps) {
  const N = INSTITUTES.length;
  const cx = 0, cy = 0;
  const rOuter = 290, rInner = 150;
  const labelR = (rOuter + rInner) / 2;
  const SVG = 680;

  const sectors = INSTITUTES.map((inst, i) => {
    const sectorSpan = (Math.PI * 2) / N;
    const a0 = i * sectorSpan - Math.PI / 2 - sectorSpan / 2;
    const a1 = a0 + sectorSpan;
    const aMid = (a0 + a1) / 2;

    const x0o = cx + rOuter * Math.cos(a0), y0o = cy + rOuter * Math.sin(a0);
    const x1o = cx + rOuter * Math.cos(a1), y1o = cy + rOuter * Math.sin(a1);
    const x0i = cx + rInner * Math.cos(a0), y0i = cy + rInner * Math.sin(a0);
    const x1i = cx + rInner * Math.cos(a1), y1i = cy + rInner * Math.sin(a1);
    const path = `M ${f(x0o)} ${f(y0o)} A ${rOuter} ${rOuter} 0 0 1 ${f(x1o)} ${f(y1o)} L ${f(x1i)} ${f(y1i)} A ${rInner} ${rInner} 0 0 0 ${f(x0i)} ${f(y0i)} Z`;

    const aMidDeg = (aMid * 180) / Math.PI;
    const flip = aMidDeg > 0 && aMidDeg < 180;
    const arcPad = sectorSpan * 0.05;
    const ta0 = flip ? a1 - arcPad : a0 + arcPad;
    const ta1 = flip ? a0 + arcPad : a1 - arcPad;
    const tx0 = cx + labelR * Math.cos(ta0), ty0 = cy + labelR * Math.sin(ta0);
    const tx1 = cx + labelR * Math.cos(ta1), ty1 = cy + labelR * Math.sin(ta1);
    const sweepFlag = flip ? 0 : 1;
    const textPath = `M ${f(tx0)} ${f(ty0)} A ${labelR} ${labelR} 0 0 ${sweepFlag} ${f(tx1)} ${f(ty1)}`;

    return { ...inst, path, textPath, aMid, idx: i, flip };
  });

  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <svg width={SVG} height={SVG} viewBox={`${-SVG / 2} ${-SVG / 2} ${SVG} ${SVG}`} style={{ overflow: 'visible' }}>
        <defs>
          <radialGradient id="center-grad" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#4F7FFF"/>
            <stop offset="1" stopColor="#9B5CFF"/>
          </radialGradient>
          <radialGradient id="hub-bg" cx="0.5" cy="0.5" r="0.7">
            <stop offset="0" stopColor="var(--surface)"/>
            <stop offset="1" stopColor="var(--bg-2)"/>
          </radialGradient>
          <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4F7FFF" stopOpacity="0.6"/>
            <stop offset="1" stopColor="#9B5CFF" stopOpacity="0.6"/>
          </linearGradient>
          {sectors.map(s => (
            <path key={`tp-${s.abbr}`} id={`tp-${s.abbr}`} d={s.textPath}/>
          ))}
        </defs>

        <circle r={rOuter + 36} fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="1 6" opacity="0.6"/>
        <circle r={rOuter + 8} fill="none" stroke="url(#ring-grad)" strokeWidth="1" opacity="0.5"/>

        {sectors.map((s) => {
          const isActive = selected === s.abbr;
          const isHover = hovered === s.abbr;
          return (
            <g key={s.abbr} style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHovered(s.abbr)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setSelected(s.abbr)}>
              <path d={s.path}
                fill={isActive ? 'rgba(37,99,235,0.10)' : isHover ? 'var(--surface-2)' : 'var(--surface)'}
                stroke={isActive ? 'var(--blue)' : 'var(--border)'}
                strokeWidth={isActive ? 2 : 1}
                style={{ transition: 'all .2s' }}
              />
              <text fontSize="14" fontWeight="700" fill={isActive ? 'var(--blue)' : 'var(--fg)'} style={{ pointerEvents: 'none', letterSpacing: '0.02em' }}>
                <textPath href={`#tp-${s.abbr}`} startOffset="50%" textAnchor="middle">
                  {s.abbr}
                </textPath>
              </text>
            </g>
          );
        })}

        <circle r={rInner - 6} fill="url(#hub-bg)" stroke="var(--border-strong)" strokeWidth="1"/>
        <circle r={rInner - 6} fill="none" stroke="url(#ring-grad)" strokeWidth="1" opacity="0.4"/>

        <g transform="translate(0 -22)">
          {(() => {
            const R = 26;
            const verts = Array.from({ length: 6 }, (_, i) => {
              const a = -Math.PI / 2 + i * (Math.PI / 3);
              return { x: R * Math.cos(a), y: R * Math.sin(a) };
            });
            const hexPath = verts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ') + ' Z';
            return (
              <g>
                <path d={hexPath} fill="none" stroke="url(#center-grad)" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M -8 -12 L 10 0 L -8 12 L -3 0 Z" fill="url(#center-grad)"/>
                {verts.map((p, i) => (
                  <circle key={i} cx={Number(f(p.x))} cy={Number(f(p.y))} r="3.8" fill="var(--blue)" stroke="#FFFFFF" strokeWidth="1.2"/>
                ))}
              </g>
            );
          })()}
        </g>

        <text x="0" y="32" textAnchor="middle" fontSize="22" fontWeight="800" style={{ letterSpacing: '-0.01em' }}>
          <tspan fill="var(--fg)">СФУ</tspan><tspan fill="url(#center-grad)">.Вектор</tspan>
        </text>
      </svg>

    </div>
  );
}
