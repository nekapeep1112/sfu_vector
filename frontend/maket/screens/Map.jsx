// Карта институтов — wheel with hover tooltip + recruiting pulse
function MapScreen() {
  const [hovered, setHovered] = React.useState(null);
  const [selected, setSelected] = React.useState('ИКИТ');
  const [tab, setTab] = React.useState('Карта');

  const sel = INSTITUTES.find(i => i.abbr === selected);

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar active="orgs" loggedIn={true}/>
        <main style={{ flex: 1, minWidth: 0 }}>
          <Topbar loggedIn={true}/>
          <div style={{ maxWidth: 1440, margin: '0 auto', padding: 32, display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24 }}>
            {/* main */}
            <div>
              <div className="row" style={{ marginBottom: 8, gap: 8 }}>
                <button style={{ color: 'var(--fg-3)', fontSize: 13 }}>← Организации</button>
              </div>
              <h1 className="h2" style={{ margin: 0, marginBottom: 8 }}>Карта институтов</h1>
              <div style={{ fontSize: 13, color: 'var(--fg-3)', marginBottom: 20 }}>20 институтов · 50+ организаций · 5 000+ студентов</div>

              {/* sub-tabs */}
              <div style={{ display: 'flex', gap: 4, padding: 4, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, marginBottom: 20, width: 'fit-content' }}>
                {['Список', 'Карта', 'Общежития'].map(t => (
                  <button key={t} onClick={() => setTab(t)} style={{
                    padding: '8px 16px', borderRadius: 8,
                    background: tab === t ? 'var(--grad-soft)' : 'transparent',
                    border: '1px solid ' + (tab === t ? 'rgba(155,92,255,0.3)' : 'transparent'),
                    fontSize: 13, fontWeight: 500,
                    color: tab === t ? 'var(--fg)' : 'var(--fg-3)',
                  }}>{t}</button>
                ))}
              </div>

              <div className="card" style={{ padding: 24, position: 'relative', minHeight: 740, overflow: 'hidden' }}>
                <Wheel
                  hovered={hovered} setHovered={setHovered}
                  selected={selected} setSelected={setSelected}
                />
                <div className="row" style={{ marginTop: 20, gap: 12, flexWrap: 'wrap' }}>
                  <div className="row gap-2" style={{ fontSize: 11, color: 'var(--fg-3)' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--violet)', boxShadow: '0 0 8px var(--violet)' }}/>
                    Идёт набор
                  </div>
                  <div className="row gap-2" style={{ fontSize: 11, color: 'var(--fg-3)' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--fg-4)' }}/>
                    Без активного набора
                  </div>
                  <div style={{ marginLeft: 'auto' }} className="row gap-2">
                    <input className="input" placeholder="Поиск института…" style={{ width: 200, height: 36, fontSize: 13 }}/>
                  </div>
                </div>
              </div>
            </div>

            {/* right rail — institute detail */}
            <div className="col gap-4">
              <div className="card" style={{ padding: 24, position: 'sticky', top: 80 }}>
                <div className="row" style={{ justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{ fontSize: 12, color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>Выбранный институт</span>
                  <button style={{ fontSize: 12, color: 'var(--violet)' }}>Сбросить ×</button>
                </div>
                <div className="row gap-3" style={{ marginBottom: 20 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: `linear-gradient(135deg, ${sel.color}, ${tonalShift(sel.color)})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M3 9 12 3l9 6v12H3z"/><path d="M9 21V12h6v9"/></svg>
                  </div>
                  <div className="col" style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.01em' }}>{sel.abbr}</div>
                    <div style={{ fontSize: 12, color: 'var(--fg-3)', lineHeight: 1.4 }}>{sel.name}</div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
                  {[{v:3,l:'организаций'},{v:'832',l:'участников'},{v:47,l:'мероприятий'}].map((s, i) => (
                    <div key={i} style={{ padding: 12, borderRadius: 10, background: 'var(--bg-2)', border: '1px solid var(--border)', textAlign: 'center' }}>
                      <div style={{ fontSize: 18, fontWeight: 800 }}>{s.v}</div>
                      <div style={{ fontSize: 10, color: 'var(--fg-4)' }}>{s.l}</div>
                    </div>
                  ))}
                </div>

                <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-4)', marginBottom: 12 }}>Организации института</div>
                <div className="col gap-2">
                  {[
                    { abbr: 'СС', name: 'Студенческий совет ИКИТ', tag: 'Студсовет', count: 128, col: '#4F7FFF' },
                    { abbr: 'ПФ', name: 'Профком ИКИТ', tag: 'Профсоюз', count: 320, col: '#9B5CFF' },
                    { abbr: 'МЦ', name: 'Медиацентр ИКИТ', tag: 'Медиа', count: 384, col: '#F5A524' },
                  ].map((o, i) => (
                    <div key={i} className="card-hover" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 10, background: 'var(--bg-2)', border: '1px solid var(--border)', cursor: 'pointer' }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${o.col}, ${tonalShift(o.col)})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: 'white', flexShrink: 0 }}>{o.abbr}</div>
                      <div className="col" style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{o.name}</div>
                        <div className="row gap-2" style={{ marginTop: 2 }}>
                          <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 4, background: 'var(--surface-2)', color: 'var(--fg-3)' }}>{o.tag}</span>
                          <span style={{ fontSize: 10, color: 'var(--green)' }}>● Активно</span>
                          <span style={{ fontSize: 10, color: 'var(--fg-4)' }}>{o.count} уч.</span>
                        </div>
                      </div>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--fg-4)' }}><path d="m9 18 6-6-6-6"/></svg>
                    </div>
                  ))}
                </div>
                <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}>Все организации ИКИТ →</button>
              </div>
            </div>
          </div>
          <Footer/>
        </main>
      </div>
    </div>
  );
}

function Wheel({ hovered, setHovered, selected, setSelected }) {
  const N = INSTITUTES.length;
  const cx = 0, cy = 0;
  // Bigger wheel — more room for labels.
  const rOuter = 290, rInner = 150;
  const labelR = (rOuter + rInner) / 2;
  const SVG = 680;

  const sectors = INSTITUTES.map((inst, i) => {
    // start with first sector centered at top
    const sectorSpan = (Math.PI * 2) / N;
    const a0 = i * sectorSpan - Math.PI / 2 - sectorSpan / 2;
    const a1 = a0 + sectorSpan;
    const aMid = (a0 + a1) / 2;

    const x0o = cx + rOuter * Math.cos(a0), y0o = cy + rOuter * Math.sin(a0);
    const x1o = cx + rOuter * Math.cos(a1), y1o = cy + rOuter * Math.sin(a1);
    const x0i = cx + rInner * Math.cos(a0), y0i = cy + rInner * Math.sin(a0);
    const x1i = cx + rInner * Math.cos(a1), y1i = cy + rInner * Math.sin(a1);
    const path = `M ${x0o} ${y0o} A ${rOuter} ${rOuter} 0 0 1 ${x1o} ${y1o} L ${x1i} ${y1i} A ${rInner} ${rInner} 0 0 0 ${x0i} ${y0i} Z`;

    // text path along an arc at labelR — flip text on bottom half so it stays upright
    const aMidDeg = (aMid * 180) / Math.PI;
    const flip = aMidDeg > 0 && aMidDeg < 180; // bottom half
    // Build arc text path: small arc centered on aMid, length matches sector span
    const arcPad = sectorSpan * 0.05;
    const ta0 = flip ? a1 - arcPad : a0 + arcPad;
    const ta1 = flip ? a0 + arcPad : a1 - arcPad;
    const tx0 = cx + labelR * Math.cos(ta0), ty0 = cy + labelR * Math.sin(ta0);
    const tx1 = cx + labelR * Math.cos(ta1), ty1 = cy + labelR * Math.sin(ta1);
    const sweepFlag = flip ? 0 : 1;
    const textPath = `M ${tx0} ${ty0} A ${labelR} ${labelR} 0 0 ${sweepFlag} ${tx1} ${ty1}`;

    // recruiting dot — just outside outer arc, on midline
    const dotR = rOuter + 18;
    const dx = cx + dotR * Math.cos(aMid);
    const dy = cy + dotR * Math.sin(aMid);

    return { ...inst, path, textPath, aMid, dx, dy, idx: i, flip };
  });

  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <svg width={SVG} height={SVG} viewBox={`${-SVG/2} ${-SVG/2} ${SVG} ${SVG}`} style={{ overflow: 'visible' }}>
        <defs>
          <radialGradient id="center-grad" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#4F7FFF"/>
            <stop offset="1" stopColor="#9B5CFF"/>
          </radialGradient>
          <radialGradient id="hub-bg" cx="0.5" cy="0.5" r="0.7">
            <stop offset="0" stopColor="#FFFFFF"/>
            <stop offset="1" stopColor="#F5F7FA"/>
          </radialGradient>
          <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4F7FFF" stopOpacity="0.6"/>
            <stop offset="1" stopColor="#9B5CFF" stopOpacity="0.6"/>
          </linearGradient>
          {sectors.map(s => (
            <path key={`tp-${s.abbr}`} id={`tp-${s.abbr}`} d={s.textPath}/>
          ))}
        </defs>

        {/* decorative rings */}
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
                fill={isActive ? 'rgba(37,99,235,0.10)' : isHover ? 'rgba(15,23,42,0.04)' : 'var(--surface)'}
                stroke={isActive ? 'var(--blue)' : 'var(--border)'}
                strokeWidth={isActive ? 2 : 1}
                style={{ transition: 'all .2s' }}
              />
              {/* curved abbr label along arc */}
              <text fontSize="14" fontWeight="700" fill={isActive ? 'var(--blue)' : 'var(--fg)'} style={{ pointerEvents: 'none', letterSpacing: '0.02em' }}>
                <textPath href={`#tp-${s.abbr}`} startOffset="50%" textAnchor="middle">
                  {s.abbr}
                </textPath>
              </text>
              {/* recruiting dot outside the wheel */}
              {s.recruiting && (
                <g style={{ pointerEvents: 'none' }}>
                  <circle cx={s.dx} cy={s.dy} r="4" fill="var(--violet)">
                    <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx={s.dx} cy={s.dy} r="8" fill="none" stroke="var(--violet)" strokeWidth="1" opacity="0.4">
                    <animate attributeName="r" values="4;12;4" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite"/>
                  </circle>
                </g>
              )}
            </g>
          );
        })}

        {/* CENTER HUB — refined */}
        <circle r={rInner - 6} fill="url(#hub-bg)" stroke="var(--border-strong)" strokeWidth="1"/>
        <circle r={rInner - 6} fill="none" stroke="url(#ring-grad)" strokeWidth="1" opacity="0.4"/>

        {/* logo mark — hexagon with nodes + vector arrow */}
        <g transform="translate(0 -56)">
          {(() => {
            const R = 26; // hex radius
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
                  <circle key={i} cx={p.x} cy={p.y} r="3.8" fill="var(--blue)" stroke="#FFFFFF" strokeWidth="1.2"/>
                ))}
              </g>
            );
          })()}
        </g>

        {/* wordmark */}
        <text x="0" y="14" textAnchor="middle" fontSize="22" fontWeight="800" style={{ letterSpacing: '-0.01em' }}>
          <tspan fill="var(--fg)">СФУ</tspan><tspan fill="url(#center-grad)">.Вектор</tspan>
        </text>

        {/* divider */}
        <line x1="-50" x2="50" y1="28" y2="28" stroke="var(--border)" strokeWidth="1"/>

        {/* mini stats inside hub */}
        <g>
          <text x="-44" y="50" textAnchor="middle" fontSize="18" fontWeight="800" fill="var(--fg)">20</text>
          <text x="-44" y="64" textAnchor="middle" fontSize="9" fill="var(--fg-4)">институтов</text>
        </g>
        <g>
          <text x="0" y="50" textAnchor="middle" fontSize="18" fontWeight="800" fill="var(--fg)">50<tspan fontSize="12">+</tspan></text>
          <text x="0" y="64" textAnchor="middle" fontSize="9" fill="var(--fg-4)">организаций</text>
        </g>
        <g>
          <text x="44" y="50" textAnchor="middle" fontSize="18" fontWeight="800" fill="var(--fg)">12</text>
          <text x="44" y="64" textAnchor="middle" fontSize="9" fill="var(--fg-4)">наборов</text>
        </g>

        {/* tag at top */}
        <text x="0" y="-86" textAnchor="middle" fontSize="9" fill="var(--fg-4)" style={{ letterSpacing: '0.2em' }}>ИНТЕРАКТИВНАЯ КАРТА</text>
      </svg>

      {/* tooltip */}
      {hovered && (() => {
        const inst = INSTITUTES.find(i => i.abbr === hovered);
        const sector = sectors.find(s => s.abbr === hovered);
        // tooltip position — convert SVG coords to container coords (SVG center = SVG/2)
        const half = SVG / 2;
        const lx = labelR * Math.cos(sector.aMid);
        const ly = labelR * Math.sin(sector.aMid);
        const tx = half + lx;
        const ty = half + ly;
        return (
          <div style={{
            position: 'absolute', left: tx, top: ty,
            transform: 'translate(-50%, -130%)',
            background: 'var(--surface-2)',
            border: '1px solid var(--border-strong)',
            borderRadius: 10, padding: '10px 14px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(155,92,255,0.2)',
            pointerEvents: 'none', zIndex: 10,
            maxWidth: 280,
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 2 }}>{inst.abbr}</div>
            <div style={{ fontSize: 11, color: 'var(--fg-3)', lineHeight: 1.4 }}>{inst.name}</div>
            {inst.recruiting && <div style={{ fontSize: 10, color: 'var(--violet)', marginTop: 6, fontWeight: 600 }}>● Идёт набор</div>}
          </div>
        );
      })()}
    </div>
  );
}

window.MapScreen = MapScreen;

// Mobile fallback grid for institutes
function InstitutesMobileGrid() {
  return (
    <div style={{ background: 'var(--bg)', padding: 16, minHeight: '100%' }}>
      <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>Институты</div>
      <div style={{ fontSize: 12, color: 'var(--fg-3)', marginBottom: 16 }}>20 институтов СФУ</div>
      <input className="input" placeholder="Поиск института…" style={{ marginBottom: 12, height: 40 }}/>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
        {INSTITUTES.map(i => (
          <div key={i.abbr} style={{ padding: 12, borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--border)', position: 'relative' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${i.color}, ${tonalShift(i.color)})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: 'white', marginBottom: 8 }}>{i.abbr.slice(0,3)}</div>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{i.abbr}</div>
            <div style={{ fontSize: 10, color: 'var(--fg-3)', lineHeight: 1.3, height: 26, overflow: 'hidden' }}>{i.name}</div>
            {i.recruiting && (
              <div style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: '50%', background: 'var(--violet)', boxShadow: '0 0 6px var(--violet)' }}/>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
window.InstitutesMobileGrid = InstitutesMobileGrid;
