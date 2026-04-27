// Landing — sections: Nav, Hero, Marquee, Features, Audiences, How, Numbers, Stories, CTA, Footer

const NAV_ITEMS = [
  { href: '#features',  label: 'Возможности' },
  { href: '#audiences', label: 'Для кого' },
  { href: '#how',       label: 'Как это работает' },
  { href: '#numbers',   label: 'Цифры' },
  { href: '#stories',   label: 'Истории' },
];

function LandingNav() {
  const y = useScrollY();
  const compact = y > 40;
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: compact ? '12px 32px' : '20px 32px',
      transition: 'padding .25s, background .25s, border-color .25s, box-shadow .25s',
      background: compact ? 'rgba(255,255,255,0.8)' : 'transparent',
      backdropFilter: compact ? 'saturate(180%) blur(14px)' : 'none',
      WebkitBackdropFilter: compact ? 'saturate(180%) blur(14px)' : 'none',
      borderBottom: compact ? '1px solid var(--border)' : '1px solid transparent',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 32 }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Logo size={28}/>
          <div style={{ fontWeight: 800, fontSize: 17, letterSpacing: '-0.01em' }}>
            СФУ<span className="text-grad">.Вектор</span>
          </div>
        </a>
        <nav style={{ display: 'flex', gap: 24, marginLeft: 24 }}>
          {NAV_ITEMS.map(i => (
            <a key={i.href} href={i.href} style={{ fontSize: 14, color: 'var(--fg-2)', fontWeight: 500, transition: 'color .15s' }}
               onMouseEnter={e => e.currentTarget.style.color = 'var(--fg)'}
               onMouseLeave={e => e.currentTarget.style.color = 'var(--fg-2)'}>{i.label}</a>
          ))}
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
          <button className="btn btn-ghost btn-sm">Войти</button>
          <button className="btn btn-primary btn-sm">Начать</button>
        </div>
      </div>
    </header>
  );
}

// ─── Hero ──────────────────────────────────────────────
function HeroSection() {
  const y = useScrollY();
  return (
    <section id="top" style={{
      position: 'relative', overflow: 'hidden',
      paddingTop: 160, paddingBottom: 120,
      background: 'radial-gradient(80% 60% at 50% 0%, rgba(37,99,235,0.10), transparent 60%), #FFFFFF',
    }}>
      {/* floating shapes */}
      <div style={{ position: 'absolute', top: 80, left: '8%', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.18), transparent 70%)', transform: `translateY(${y * 0.15}px)`, filter: 'blur(20px)' }}/>
      <div style={{ position: 'absolute', top: 200, right: '6%', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.14), transparent 70%)', transform: `translateY(${y * -0.12}px)`, filter: 'blur(24px)' }}/>
      <div style={{ position: 'absolute', bottom: -40, left: '40%', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(5,150,105,0.10), transparent 70%)', transform: `translateY(${y * -0.08}px)`, filter: 'blur(20px)' }}/>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 64, alignItems: 'center', position: 'relative' }}>
        {/* Left: copy */}
        <div>
          <Reveal>
            <div className="chip" style={{ background: 'rgba(37,99,235,0.08)', borderColor: 'rgba(37,99,235,0.25)', color: 'var(--blue)', fontWeight: 600, marginBottom: 24 }}>
              <span className="chip-dot" style={{ background: 'var(--blue)' }}/> СФУ.Вектор · 2026
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 style={{ fontSize: 76, lineHeight: 1.02, fontWeight: 800, letterSpacing: '-0.03em', margin: 0, marginBottom: 24 }}>
              Стань частью<br/>
              <span className="text-grad">большего</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p style={{ fontSize: 20, lineHeight: 1.5, color: 'var(--fg-2)', maxWidth: 540, margin: '0 0 36px 0' }}>
              Единое пространство студенческих возможностей СФУ.<br/>
              Найди своё сообщество. Участвуй. Развивайся.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <MagneticButton className="btn btn-primary" style={{ padding: '16px 28px', fontSize: 16 }}>
                Зарегистрироваться →
              </MagneticButton>
              <button className="btn btn-ghost" style={{ padding: '16px 24px', fontSize: 15 }}>
                Узнать больше
              </button>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ display: 'flex' }}>
                {['#2563EB','#7C3AED','#059669','#D97706'].map((c, i) => (
                  <div key={i} style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg, ${c}, ${c}cc)`, border: '3px solid #FFFFFF', marginLeft: i ? -10 : 0, boxShadow: '0 2px 6px rgba(15,23,42,0.12)' }}/>
                ))}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>3 200+ студентов</div>
                <div style={{ fontSize: 13, color: 'var(--fg-3)' }}>уже нашли своих</div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right: photo collage with parallax */}
        <div style={{ position: 'relative', height: 560 }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: 280, height: 360, transform: `translateY(${y * -0.08}px) rotate(-3deg)`, transition: 'transform .1s linear' }}>
            <PhotoPH tone="#2563EB" label="Хакатон" height={360} style={{ boxShadow: '0 20px 50px rgba(15,23,42,0.15)' }}/>
          </div>
          <div style={{ position: 'absolute', top: 80, right: 0, width: 260, height: 320, transform: `translateY(${y * 0.06}px) rotate(4deg)`, transition: 'transform .1s linear' }}>
            <PhotoPH tone="#7C3AED" label="Студ. весна" height={320} style={{ boxShadow: '0 20px 50px rgba(15,23,42,0.15)' }}/>
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 60, width: 280, height: 220, transform: `translateY(${y * -0.04}px) rotate(2deg)`, transition: 'transform .1s linear' }}>
            <PhotoPH tone="#059669" label="Волонтёрство" height={220} style={{ boxShadow: '0 20px 50px rgba(15,23,42,0.15)' }}/>
          </div>
          {/* floating chip */}
          <div style={{ position: 'absolute', top: 260, left: 240, padding: '12px 18px', borderRadius: 16, background: '#FFFFFF', boxShadow: '0 8px 24px rgba(15,23,42,0.12)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10, transform: `translateY(${y * 0.04}px)` }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #D97706, #F59E0B)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800 }}>20</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>институтов</div>
              <div style={{ fontSize: 11, color: 'var(--fg-3)' }}>на одной карте</div>
            </div>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: 'var(--fg-4)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
        <div>Прокрути</div>
        <div style={{ width: 1, height: 32, background: 'linear-gradient(180deg, transparent, var(--fg-4))', animation: 'scrollHint 1.8s ease-in-out infinite' }}/>
      </div>
      <style>{`@keyframes scrollHint { 0%,100% { opacity: 0.4 } 50% { opacity: 1 } }`}</style>
    </section>
  );
}

// ─── Marquee with institutes ──────────────────────────
function MarqueeStrip() {
  const items = [...INSTITUTES, ...INSTITUTES]; // double for seamless loop
  return (
    <section style={{ padding: '36px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: '#FAFBFD', overflow: 'hidden' }}>
      <div style={{ display: 'flex', gap: 12, animation: 'marquee 50s linear infinite', whiteSpace: 'nowrap' }}>
        {items.map((it, i) => (
          <div key={i} className="chip" style={{ flexShrink: 0, fontSize: 13, padding: '8px 16px', background: '#FFFFFF', borderColor: 'var(--border)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: it.color, display: 'inline-block', marginRight: 8 }}/>
            <strong style={{ marginRight: 6 }}>{it.abbr}</strong>
            <span style={{ color: 'var(--fg-3)', fontWeight: 400 }}>{it.name}</span>
          </div>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}

// ─── Features (что это) ───────────────────────────────
function FeaturesSection() {
  return (
    <section id="features" style={{ padding: '120px 32px', background: '#FFFFFF' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="chip" style={{ marginBottom: 16, background: 'rgba(37,99,235,0.08)', borderColor: 'rgba(37,99,235,0.2)', color: 'var(--blue)' }}>Возможности</div>
            <h2 style={{ fontSize: 56, fontWeight: 800, letterSpacing: '-0.025em', margin: 0, marginBottom: 16, lineHeight: 1.05 }}>
              Всё, что было разбросано —<br/>теперь <span className="text-grad">в одном месте</span>
            </h2>
            <p style={{ fontSize: 18, color: 'var(--fg-2)', maxWidth: 640, margin: '0 auto' }}>
              Хватит искать студорганизации в чатах и узнавать о фестивалях за день. Вектор собирает всё.
            </p>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {FEATURES.map((f, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="card card-hover" style={{ padding: 32, height: '100%' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: `linear-gradient(135deg, ${f.accent}, ${f.accent}aa)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 22, marginBottom: 20, boxShadow: `0 8px 20px ${f.accent}30` }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 700, margin: 0, marginBottom: 10, letterSpacing: '-0.01em' }}>{f.title}</h3>
                <p style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.55, margin: 0 }}>{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Audiences (для кого) ─────────────────────────────
function AudiencesSection() {
  const [active, setActive] = React.useState(0);
  return (
    <section id="audiences" style={{ padding: '120px 32px', background: '#F5F7FA' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Reveal>
          <div style={{ marginBottom: 56 }}>
            <div className="chip" style={{ marginBottom: 16, background: 'rgba(124,58,237,0.08)', borderColor: 'rgba(124,58,237,0.2)', color: '#7C3AED' }}>Для кого</div>
            <h2 style={{ fontSize: 56, fontWeight: 800, letterSpacing: '-0.025em', margin: 0, lineHeight: 1.05, maxWidth: 800 }}>
              Каждой аудитории — <span className="text-grad">свой Вектор</span>
            </h2>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
          <Reveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {AUDIENCES.map((a, i) => (
                <div key={i} onClick={() => setActive(i)}
                  style={{ padding: 24, borderRadius: 16, cursor: 'pointer', transition: 'all .25s',
                    background: active === i ? '#FFFFFF' : 'transparent',
                    border: '1px solid', borderColor: active === i ? 'var(--border)' : 'transparent',
                    boxShadow: active === i ? '0 4px 14px rgba(15,23,42,0.06)' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: active === i ? 8 : 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: active === i ? 'var(--blue)' : 'var(--fg-4)' }}>{a.tag}</div>
                  </div>
                  <h3 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: active === i ? 'var(--fg)' : 'var(--fg-3)', letterSpacing: '-0.01em' }}>{a.title}</h3>
                  {active === i && (
                    <p style={{ fontSize: 15, color: 'var(--fg-2)', margin: 0, marginTop: 10, lineHeight: 1.55 }}>{a.text}</p>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ position: 'sticky', top: 100 }}>
              <PhotoPH tone={['#2563EB','#7C3AED','#059669','#D97706'][active]} label={AUDIENCES[active].tag} height={520} style={{ boxShadow: '0 20px 50px rgba(15,23,42,0.12)' }}/>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── How it works ─────────────────────────────────────
function HowSection() {
  return (
    <section id="how" style={{ padding: '120px 32px', background: '#FFFFFF', position: 'relative' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <div className="chip" style={{ marginBottom: 16, background: 'rgba(5,150,105,0.08)', borderColor: 'rgba(5,150,105,0.2)', color: '#059669' }}>Как это работает</div>
            <h2 style={{ fontSize: 56, fontWeight: 800, letterSpacing: '-0.025em', margin: 0, lineHeight: 1.05 }}>
              Четыре шага до <span className="text-grad">своего комьюнити</span>
            </h2>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, position: 'relative' }}>
          {/* connecting line */}
          <div style={{ position: 'absolute', top: 36, left: '12%', right: '12%', height: 2, background: 'linear-gradient(90deg, transparent, var(--border) 10%, var(--border) 90%, transparent)', zIndex: 0 }}/>
          {STEPS.map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#FFFFFF', border: '2px solid var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800, color: 'var(--blue)', margin: '0 auto 20px', letterSpacing: '-0.02em', boxShadow: '0 4px 14px rgba(37,99,235,0.18)' }}>{s.n}</div>
                <h3 style={{ fontSize: 19, fontWeight: 700, margin: 0, marginBottom: 10, letterSpacing: '-0.01em' }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.55, margin: 0 }}>{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Numbers ──────────────────────────────────────────
function NumbersSection() {
  return (
    <section id="numbers" style={{ padding: '100px 32px', background: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 50%, #7C3AED 100%)', position: 'relative', overflow: 'hidden' }}>
      {/* texture */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08 }}>
        <defs>
          <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="white"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)"/>
      </svg>
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', color: 'white' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{ fontSize: 56, fontWeight: 800, letterSpacing: '-0.025em', margin: 0, lineHeight: 1.05, color: 'white' }}>
              Масштаб, который <span style={{ color: '#FCD34D' }}>имеет значение</span>
            </h2>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {COUNTERS.map((c, i) => (
            <Reveal key={i} delay={i * 100}>
              <div style={{ textAlign: 'center', padding: '32px 16px' }}>
                <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: 10, color: 'white' }}>
                  <AnimatedNumber to={c.value} suffix={c.suffix}/>
                </div>
                <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>{c.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Stories ──────────────────────────────────────────
function StoriesSection() {
  return (
    <section id="stories" style={{ padding: '120px 32px', background: '#FFFFFF' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Reveal>
          <div style={{ marginBottom: 56, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
            <div>
              <div className="chip" style={{ marginBottom: 16, background: 'rgba(217,119,6,0.08)', borderColor: 'rgba(217,119,6,0.2)', color: '#D97706' }}>Истории</div>
              <h2 style={{ fontSize: 56, fontWeight: 800, letterSpacing: '-0.025em', margin: 0, lineHeight: 1.05, maxWidth: 700 }}>
                Реальные люди.<br/><span className="text-grad">Реальные результаты.</span>
              </h2>
            </div>
            <div style={{ fontSize: 15, color: 'var(--fg-3)', maxWidth: 320 }}>Студенты, которые нашли своё место в СФУ через Вектор.</div>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {STORIES.map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="card" style={{ padding: 28, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 48, lineHeight: 1, color: s.tone, fontFamily: 'Georgia, serif', marginBottom: 8 }}>"</div>
                <p style={{ fontSize: 17, lineHeight: 1.5, color: 'var(--fg)', margin: 0, marginBottom: 24, flex: 1, fontWeight: 500 }}>{s.quote}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: `linear-gradient(135deg, ${s.tone}, ${s.tone}aa)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 16 }}>{s.name[0]}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--fg-3)' }}>{s.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────
function CtaSection() {
  return (
    <section style={{ padding: '120px 32px', background: '#F5F7FA' }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        <Reveal>
          <div style={{ borderRadius: 28, padding: '80px 48px', background: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 30px 60px rgba(37,99,235,0.25)' }}>
            <div style={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }}/>
            <div style={{ position: 'absolute', bottom: -80, left: -40, width: 280, height: 280, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }}/>
            <div style={{ position: 'relative' }}>
              <h2 style={{ fontSize: 60, fontWeight: 800, letterSpacing: '-0.025em', color: 'white', margin: 0, marginBottom: 20, lineHeight: 1.05 }}>
                Готов стать частью большего?
              </h2>
              <p style={{ fontSize: 19, color: 'rgba(255,255,255,0.85)', maxWidth: 560, margin: '0 auto 36px', lineHeight: 1.5 }}>
                Зарегистрируйся за 30 секунд — найди своих, своё дело и свои события.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <MagneticButton className="btn" style={{ padding: '16px 32px', fontSize: 16, background: '#FFFFFF', color: 'var(--blue)', fontWeight: 700 }}>
                  Зарегистрироваться →
                </MagneticButton>
                <button className="btn" style={{ padding: '16px 28px', fontSize: 15, background: 'rgba(255,255,255,0.12)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(8px)' }}>
                  Записаться на мероприятие
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────
function LandingFooter() {
  return (
    <footer style={{ padding: '64px 32px 32px', background: '#FFFFFF', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <Logo size={28}/>
              <div style={{ fontWeight: 800, fontSize: 17 }}>СФУ<span className="text-grad">.Вектор</span></div>
            </div>
            <p style={{ fontSize: 14, color: 'var(--fg-3)', maxWidth: 320, lineHeight: 1.55, margin: 0 }}>
              Единое пространство студенческих возможностей Сибирского федерального университета.
            </p>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-4)', marginBottom: 16 }}>Платформа</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <a href="#features" style={{ color: 'var(--fg-2)' }}>Возможности</a>
              <a href="#how" style={{ color: 'var(--fg-2)' }}>Как работает</a>
              <a href="#stories" style={{ color: 'var(--fg-2)' }}>Истории</a>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-4)', marginBottom: 16 }}>Поддержка</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <a href="#" style={{ color: 'var(--fg-2)' }}>Помощь</a>
              <a href="#" style={{ color: 'var(--fg-2)' }}>Контакты</a>
              <a href="#" style={{ color: 'var(--fg-2)' }}>Для организаций</a>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-4)', marginBottom: 16 }}>Контакты</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, color: 'var(--fg-2)' }}>
              <div>vector@sfu-kras.ru</div>
              <div>пр. Свободный, 79</div>
              <div>Красноярск</div>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: 24, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--fg-4)' }}>
          <div>© 2026 СФУ.Вектор · Сибирский федеральный университет</div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#" style={{ color: 'var(--fg-4)' }}>Политика</a>
            <a href="#" style={{ color: 'var(--fg-4)' }}>Соглашение</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { LandingNav, HeroSection, MarqueeStrip, FeaturesSection, AudiencesSection, HowSection, NumbersSection, StoriesSection, CtaSection, LandingFooter });
