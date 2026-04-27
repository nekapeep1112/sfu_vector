'use client';

import { DORMS, DORM_ZONES, type Dorm } from '@/lib/mock-data';

interface Props {
  hovered: number | null;
  setHovered: (n: number | null) => void;
  selected: number;
  setSelected: (n: number) => void;
}

const W = 880, H = 540;

export function DormsMap({ hovered, setHovered, selected, setSelected }: Props) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="map-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#F0F3F8"/>
            <stop offset="1" stopColor="#E5EAF2"/>
          </linearGradient>
          <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0 L0 0 L0 40" fill="none" stroke="rgba(15,23,42,0.05)" strokeWidth="1"/>
          </pattern>
          <linearGradient id="bld-classic" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#9CB6FF"/>
            <stop offset="1" stopColor="#4F7FFF"/>
          </linearGradient>
          <linearGradient id="bld-apartment" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#C29CFF"/>
            <stop offset="1" stopColor="#9B5CFF"/>
          </linearGradient>
          <linearGradient id="bld-premium" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFD580"/>
            <stop offset="1" stopColor="#F5A524"/>
          </linearGradient>
          <filter id="bld-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
            <feOffset dx="0" dy="3"/>
            <feComponentTransfer><feFuncA type="linear" slope="0.25"/></feComponentTransfer>
            <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* base */}
        <rect x="0" y="0" width={W} height={H} fill="url(#map-bg)" rx="14"/>
        <rect x="0" y="0" width={W} height={H} fill="url(#map-grid)" rx="14"/>

        {/* park / green zones */}
        <g opacity="0.6">
          <ellipse cx="350" cy="450" rx="140" ry="50" fill="rgba(61,214,140,0.15)"/>
          <ellipse cx="170" cy="430" rx="80"  ry="32" fill="rgba(61,214,140,0.18)"/>
          <ellipse cx="780" cy="470" rx="100" ry="38" fill="rgba(61,214,140,0.15)"/>
          <text x="170" y="436" textAnchor="middle" fontSize="10" fill="#3DD68C" fontWeight="700" letterSpacing="0.06em">ПАРК</text>
          <text x="350" y="456" textAnchor="middle" fontSize="10" fill="#3DD68C" fontWeight="700" letterSpacing="0.06em">СКВЕР · Свободный</text>
          <text x="780" y="476" textAnchor="middle" fontSize="10" fill="#3DD68C" fontWeight="700" letterSpacing="0.06em">ПАРК</text>
        </g>

        {/* roads */}
        <g stroke="#C9D0DC" strokeWidth="14" strokeLinecap="round" fill="none" opacity="0.7">
          <path d="M 20 410 Q 200 400 380 405 T 860 410"/>
          <path d="M 360 30 L 360 410"/>
          <path d="M 560 30 L 560 410"/>
        </g>
        <g stroke="white" strokeWidth="2" strokeDasharray="6 8" fill="none">
          <path d="M 20 410 Q 200 400 380 405 T 860 410"/>
          <path d="M 360 30 L 360 410"/>
          <path d="M 560 30 L 560 410"/>
        </g>
        {/* road labels */}
        <text x="700" y="402" fontSize="9" fill="var(--fg-4)" fontWeight="700" letterSpacing="0.08em">пр. СВОБОДНЫЙ</text>

        {/* zone backgrounds */}
        <g opacity="0.18">
          <rect x="40"  y="50"  width="320" height="350" rx="20" fill="#4F7FFF"/>
          <rect x="380" y="60"  width="180" height="330" rx="20" fill="#9B5CFF"/>
          <rect x="580" y="60"  width="270" height="320" rx="20" fill="#3DD68C"/>
        </g>

        {/* zone labels */}
        {DORM_ZONES.map((z, i) => {
          const positions: Record<string, { x: number; y: number }> = {
            sv76:   { x: 200, y: 38 },
            center: { x: 470, y: 48 },
            east:   { x: 715, y: 48 },
          };
          const p = positions[z.id];
          return (
            <g key={z.id} transform={`translate(${p.x} ${p.y})`}>
              <rect x="-90" y="-14" width="180" height="22" rx="11"
                fill="white" stroke={z.color} strokeWidth="1.5" opacity="0.95"/>
              <circle cx="-72" cy="-3" r="4" fill={z.color}/>
              <text x="-60" y="1" fontSize="11" fontWeight="700" fill="var(--fg)">{z.label}</text>
            </g>
          );
        })}

        {/* buildings */}
        {DORMS.map(d => {
          const isActive = selected === d.num;
          const isHover  = hovered === d.num;
          const fillId = d.type === 'classic' ? 'bld-classic'
                       : d.type === 'apartment' ? 'bld-apartment'
                       : 'bld-premium';
          const free = d.capacity - d.occupied;
          return (
            <g key={d.num}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHovered(d.num)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setSelected(d.num)}>
              {/* glow on active */}
              {isActive && (
                <rect x={d.x - 6} y={d.y - 6} width={d.w + 12} height={d.h + 12} rx="14"
                  fill="none" stroke="var(--violet)" strokeWidth="2" strokeDasharray="4 3" opacity="0.9">
                  <animate attributeName="stroke-dashoffset" from="0" to="14" dur="1.4s" repeatCount="indefinite"/>
                </rect>
              )}
              {/* footprint */}
              <rect x={d.x} y={d.y} width={d.w} height={d.h} rx="10"
                fill={`url(#${fillId})`}
                stroke={isActive ? 'var(--violet)' : isHover ? 'var(--blue)' : 'rgba(15,23,42,0.15)'}
                strokeWidth={isActive ? 2.5 : isHover ? 2 : 1}
                filter="url(#bld-shadow)"
                style={{ transition: 'stroke-width .15s' }}
              />
              {/* roof stripes — give it building feel */}
              <line x1={d.x} y1={d.y + 12} x2={d.x + d.w} y2={d.y + 12} stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
              <line x1={d.x} y1={d.y + d.h - 10} x2={d.x + d.w} y2={d.y + d.h - 10} stroke="rgba(0,0,0,0.15)" strokeWidth="1"/>

              {/* number */}
              <text x={d.x + d.w / 2} y={d.y + d.h / 2 + 6} textAnchor="middle"
                fontSize={d.h > 70 ? 22 : 18} fontWeight="800" fill="white"
                style={{ pointerEvents: 'none', textShadow: '0 1px 2px rgba(0,0,0,0.3)', letterSpacing: '-0.02em' }}>
                №{d.num}
              </text>

              {/* free-spots dot */}
              {free > 10 && (
                <g style={{ pointerEvents: 'none' }}>
                  <circle cx={d.x + d.w - 8} cy={d.y + 8} r="5" fill="#3DD68C">
                    <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
                  </circle>
                </g>
              )}
              {free === 0 && (
                <g style={{ pointerEvents: 'none' }}>
                  <circle cx={d.x + d.w - 8} cy={d.y + 8} r="5" fill="#DC2626"/>
                </g>
              )}
            </g>
          );
        })}

        {/* compass */}
        <g transform="translate(820 80)" style={{ pointerEvents: 'none' }}>
          <circle r="22" fill="white" stroke="var(--border)"/>
          <path d="M 0 -14 L 4 0 L 0 14 L -4 0 Z" fill="var(--violet)"/>
          <text y="-26" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--fg-3)">С</text>
        </g>

        {/* legend */}
        <g transform="translate(40 484)">
          <rect x="0" y="0" width="540" height="40" rx="10" fill="white" stroke="var(--border)"/>
          {[
            { c: '#4F7FFF', l: 'Классический' },
            { c: '#9B5CFF', l: 'Квартирный' },
            { c: '#F5A524', l: 'Премиум' },
          ].map((it, i) => (
            <g key={it.l} transform={`translate(${20 + i * 130} 20)`}>
              <rect x="0" y="-7" width="14" height="14" rx="3" fill={it.c}/>
              <text x="22" y="4" fontSize="12" fill="var(--fg-2)" fontWeight="600">{it.l}</text>
            </g>
          ))}
          <g transform="translate(420 20)">
            <circle cx="0" cy="0" r="5" fill="#3DD68C"/>
            <text x="12" y="4" fontSize="11" fill="var(--fg-3)">Есть места</text>
          </g>
        </g>
      </svg>

      {/* hover tooltip */}
      {hovered !== null && (() => {
        const d = DORMS.find(x => x.num === hovered);
        if (!d) return null;
        const free = d.capacity - d.occupied;
        // Convert SVG coords to container percentages
        const left = ((d.x + d.w / 2) / W) * 100;
        const top  = (d.y / H) * 100;
        return (
          <div style={{
            position: 'absolute',
            left: `${left}%`, top: `${top}%`,
            transform: 'translate(-50%, calc(-100% - 14px))',
            background: 'var(--surface)',
            border: '1px solid var(--border-strong)',
            borderRadius: 10, padding: '10px 14px',
            boxShadow: '0 8px 32px rgba(15,23,42,0.18)',
            pointerEvents: 'none', zIndex: 5,
            minWidth: 200,
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>Общежитие №{d.num}</div>
            <div style={{ fontSize: 11, color: 'var(--fg-3)', marginBottom: 6 }}>{d.addr}</div>
            <div style={{ fontSize: 11, color: free > 0 ? 'var(--green)' : 'var(--red)', fontWeight: 600 }}>
              {free > 0 ? `● Свободно: ${free} мест` : '● Мест нет'}
            </div>
          </div>
        );
      })()}
    </div>
  );
}

export function DormDetailRail({ dormNum }: { dormNum: number }) {
  const d: Dorm | undefined = DORMS.find(x => x.num === dormNum);
  if (!d) return null;
  const zone = DORM_ZONES.find(z => z.id === d.zone)!;
  const free = d.capacity - d.occupied;
  const pct = Math.round((d.occupied / d.capacity) * 100);
  const typeMap = { classic: 'Классический', apartment: 'Квартирный', premium: 'Премиум' } as const;
  const typeColor = { classic: '#4F7FFF', apartment: '#9B5CFF', premium: '#F5A524' } as const;

  return (
    <div className="card" style={{ padding: 24, position: 'sticky', top: 80 }}>
      <div className="row" style={{ justifyContent: 'space-between', marginBottom: 16 }}>
        <span style={{ fontSize: 12, color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>Выбранное общежитие</span>
        <span style={{ fontSize: 11, color: zone.color, fontWeight: 600 }}>● {zone.tag}</span>
      </div>

      <div className="row gap-3" style={{ marginBottom: 16 }}>
        <div style={{
          width: 64, height: 64, borderRadius: 14,
          background: `linear-gradient(135deg, ${typeColor[d.type]}, color-mix(in srgb, ${typeColor[d.type]} 60%, black))`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, fontWeight: 800, color: 'white',
          flexShrink: 0,
          letterSpacing: '-0.02em',
        }}>№{d.num}</div>
        <div className="col" style={{ minWidth: 0 }}>
          <div style={{ fontSize: 18, fontWeight: 800 }}>Общежитие №{d.num}</div>
          <div style={{ fontSize: 12, color: 'var(--fg-3)', lineHeight: 1.4 }}>{d.addr}</div>
        </div>
      </div>

      <div className="row gap-2" style={{ marginBottom: 20, flexWrap: 'wrap' }}>
        <span className="chip" style={{ background: `${typeColor[d.type]}15`, borderColor: `${typeColor[d.type]}40`, color: typeColor[d.type], fontWeight: 600 }}>
          {typeMap[d.type]}
        </span>
        <span className="chip">{d.floors} эт.</span>
        {free > 0
          ? <span className="chip" style={{ background: 'rgba(5,150,105,0.1)', borderColor: 'rgba(5,150,105,0.3)', color: 'var(--green)', fontWeight: 600 }}>● {free} свободно</span>
          : <span className="chip" style={{ background: 'rgba(220,38,38,0.1)', borderColor: 'rgba(220,38,38,0.3)', color: 'var(--red)', fontWeight: 600 }}>● Мест нет</span>}
      </div>

      <div style={{ marginBottom: 20 }}>
        <div className="row" style={{ justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
          <span style={{ color: 'var(--fg-2)', fontWeight: 600 }}>Заселено: {d.occupied} из {d.capacity}</span>
          <span style={{ color: 'var(--fg-4)' }}>{pct}%</span>
        </div>
        <div style={{ height: 6, background: 'var(--border)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${pct}%`,
            background: pct > 95 ? 'var(--red)' : pct > 80 ? 'var(--amber)' : 'var(--green)',
            borderRadius: 999, transition: 'width .3s',
          }}/>
        </div>
      </div>

      <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-4)', marginBottom: 10 }}>
        Удобства
      </div>
      <div className="row gap-2" style={{ flexWrap: 'wrap', marginBottom: 20 }}>
        {[
          { l: 'Wi-Fi', i: '📶' },
          { l: 'Прачечная', i: '🧺' },
          { l: 'Кухня', i: '🍳' },
          { l: 'Спортзал', i: '🏋️' },
          d.type === 'premium' ? { l: 'Лифт', i: '🛗' } : null,
          d.type !== 'classic' ? { l: 'Кондиционер', i: '❄️' } : null,
        ].filter(Boolean).map((a, i) => (
          <span key={i} className="chip" style={{ fontSize: 11 }}>
            <span style={{ fontSize: 12 }}>{(a as { i: string }).i}</span>{(a as { l: string }).l}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button className="btn btn-primary" style={{ justifyContent: 'center' }} disabled={free === 0}>
          {free > 0 ? 'Подать заявку на заселение' : 'В лист ожидания'}
        </button>
        <button className="btn btn-ghost btn-sm" style={{ justifyContent: 'center' }}>
          📍 Открыть в 2ГИС
        </button>
      </div>
    </div>
  );
}
