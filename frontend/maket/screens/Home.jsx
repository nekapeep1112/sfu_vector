// Home — single column with optional recommendations strip
function HomeScreen({ loggedIn = false }) {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar active="home" loggedIn={loggedIn} />
        <main style={{ flex: 1, minWidth: 0 }}>
          <Topbar loggedIn={loggedIn} />
          <div style={{ maxWidth: 1440, margin: '0 auto', padding: '32px' }}>

            {/* HERO */}
            <section data-hero-art style={{
              position: 'relative',
              height: 480,
              borderRadius: 20,
              overflow: 'hidden',
              border: '1px solid var(--border)',
              background: 'var(--surface-2)',
            }}>
              {/* ambient placeholder — abstract gradient + noise (no stock photos) */}
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 70% 40%, color-mix(in srgb, var(--violet) 35%, transparent) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 20% 80%, color-mix(in srgb, var(--blue) 40%, transparent) 0%, transparent 50%), linear-gradient(180deg, var(--surface-2) 0%, var(--surface) 100%)' }} />
              <svg data-hero-grid width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
                <defs>
                  <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M40 0 L0 0 L0 40" fill="none" stroke="color-mix(in srgb, var(--fg) 8%, transparent)" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hero-grid)"/>
              </svg>
              {/* abstract floating vector marks */}
              <div style={{ position: 'absolute', top: 60, right: 80, width: 120, height: 120, borderRadius: 30, background: 'var(--grad)', opacity: 0.18, filter: 'blur(40px)' }} />
              <div style={{ position: 'absolute', bottom: 40, right: 200, width: 180, height: 180, borderRadius: 50, background: 'var(--grad)', opacity: 0.14, filter: 'blur(60px)' }} />

              <div data-hero-veil style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 30%, color-mix(in srgb, var(--surface) 80%, transparent) 100%)' }} />

              <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 56, maxWidth: 760 }}>
                <div data-hero-chip className="chip" style={{ alignSelf: 'flex-start', marginBottom: 20, background: 'var(--grad-soft)', borderColor: 'var(--border-strong)', color: 'var(--fg)' }}>
                  <span className="chip-dot" style={{ background: 'var(--violet)', boxShadow: '0 0 8px var(--violet)' }}/>
                  <span style={{ fontWeight: 600 }}>СФУ.Вектор</span>
                  <span style={{ color: 'var(--fg-3)' }}>· твой вектор развития</span>
                </div>
                <h1 data-hero-text-light className="h1" style={{ margin: 0, marginBottom: 20, color: 'var(--fg)' }}>
                  Единое пространство<br/>студенческих <span className="text-grad">возможностей</span>
                </h1>
                <p data-hero-text-light-2 style={{ fontSize: 17, color: 'var(--fg-2)', maxWidth: 520, lineHeight: 1.55, margin: 0, marginBottom: 32 }}>
                  Открой для себя организации, мероприятия и возможности для развития в&nbsp;Сибирском федеральном университете.
                </p>
                <div className="row gap-3">
                  {loggedIn ? (
                    <>
                      <button className="btn btn-primary" style={{ padding: '14px 22px', fontSize: 15 }}>
                        Найти своё сообщество
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                      </button>
                      <button className="btn btn-ghost" style={{ padding: '14px 22px', fontSize: 15 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M5 4 L19 12 L5 20 Z"/></svg>
                        Как это работает
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-primary" style={{ padding: '14px 22px', fontSize: 15 }}>
                        Войти / Зарегистрироваться
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                      </button>
                      <button className="btn btn-ghost" style={{ padding: '14px 22px', fontSize: 15 }}>Как это работает</button>
                    </>
                  )}
                </div>
              </div>

              {/* carousel dots */}
              <div style={{ position: 'absolute', bottom: 24, right: 24, display: 'flex', gap: 6 }}>
                {[0,1,2,3].map(i => (
                  <div key={i} style={{ width: i === 0 ? 24 : 6, height: 6, borderRadius: 3, background: i === 0 ? 'var(--fg)' : 'var(--border-strong)', transition: 'all .3s' }}/>
                ))}
              </div>
            </section>

            {/* STATS STRIP — below hero per brief */}
            <section style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {[
                { v: '20', l: 'институтов', icon: '◆' },
                { v: '30', l: 'общежитий', icon: '◐' },
                { v: '50+', l: 'студенческих организаций', icon: '◇' },
                { v: '1000+', l: 'мероприятий в год', icon: '◉' },
              ].map((s, i) => (
                <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--grad-soft)', border: '1px solid rgba(155,92,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: 'var(--violet)' }}>{s.icon}</div>
                  <div className="col">
                    <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}>{s.v}</div>
                    <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 4 }}>{s.l}</div>
                  </div>
                </div>
              ))}
            </section>

            {/* PERSONALIZED — only logged in */}
            {loggedIn && (
              <section style={{ marginTop: 48 }}>
                <div className="row" style={{ justifyContent: 'space-between', marginBottom: 20 }}>
                  <div>
                    <div className="row gap-2">
                      <h2 className="h3" style={{ margin: 0 }}>Рекомендуем тебе</h2>
                      <span className="chip" style={{ background: 'var(--grad-soft)', borderColor: 'rgba(155,92,255,0.3)', color: 'var(--fg)' }}>персонально</span>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--fg-3)', margin: '4px 0 0' }}>На основе твоих интересов: IT, карьера, наука</p>
                  </div>
                  <a href="#" style={{ fontSize: 13, color: 'var(--violet)', fontWeight: 500 }}>Настроить интересы →</a>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                  {EVENTS.slice(0, 3).map(e => (
                    <div key={e.id} className="card card-hover" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}>
                      <EventCover event={e} height={140}/>
                      <div style={{ padding: 16 }}>
                        <div className="row" style={{ justifyContent: 'space-between', fontSize: 12, color: 'var(--fg-3)', marginBottom: 8 }}>
                          <span>{e.date.d} {e.date.m} · {e.time}</span>
                          <span style={{ color: 'var(--violet)' }}>92% совпадение</span>
                        </div>
                        <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.3, marginBottom: 10 }}>{e.title}</div>
                        <CapacityBar registered={e.registered} capacity={e.capacity} color={EVENT_TYPES[e.type].color}/>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* НАЧНИ ЗДЕСЬ — 3 cards */}
            <section style={{ marginTop: 48 }}>
              <div className="row" style={{ justifyContent: 'space-between', marginBottom: 20 }}>
                <div>
                  <h2 className="h3" style={{ margin: 0 }}>Начни здесь</h2>
                  <p style={{ fontSize: 13, color: 'var(--fg-3)', margin: '4px 0 0' }}>Три точки входа в студенческую жизнь</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                <EntryCard
                  num="01"
                  title="Найди свой институт"
                  desc="Колесо из 20 институтов — кликни и узнай, кто там, чем занимаются и как присоединиться."
                  cta="К карте институтов"
                  preview={<WheelPreview/>}
                />
                <EntryCard
                  num="02"
                  title="Открой мероприятия"
                  desc="Хакатоны, фестивали, лекции, спорт. Фильтры по типу, формату и интересам."
                  cta="Все мероприятия"
                  preview={<EventsPreview/>}
                />
                <EntryCard
                  num="03"
                  title="Вступи в организацию"
                  desc="50+ студенческих сообществ. Кто-то ищет именно тебя прямо сейчас."
                  cta="Идёт набор · 12"
                  ctaAccent
                  preview={<OrgsPreview/>}
                />
              </div>
            </section>

            {/* ЧТО ПРОИСХОДИТ СЕЙЧАС */}
            <section style={{ marginTop: 48 }}>
              <div className="row" style={{ justifyContent: 'space-between', marginBottom: 20 }}>
                <div>
                  <h2 className="h3" style={{ margin: 0 }}>Что происходит сейчас</h2>
                  <p style={{ fontSize: 13, color: 'var(--fg-3)', margin: '4px 0 0' }}>Ближайшие 14 дней · {EVENTS.length} событий</p>
                </div>
                <div className="row gap-2">
                  <button className="btn btn-ghost btn-sm" style={{ width: 36, height: 36, padding: 0, justifyContent: 'center' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
                  </button>
                  <button className="btn btn-ghost btn-sm" style={{ width: 36, height: 36, padding: 0, justifyContent: 'center' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
                  </button>
                  <a href="#" style={{ fontSize: 13, color: 'var(--violet)', fontWeight: 500, marginLeft: 8 }}>Все →</a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 12, scrollSnapType: 'x mandatory' }}>
                {EVENTS.map(e => (
                  <CompactEventCard key={e.id} event={e}/>
                ))}
              </div>
            </section>
          </div>
          <Footer/>
        </main>
      </div>
    </div>
  );
}

function EntryCard({ num, title, desc, cta, ctaAccent, preview }) {
  return (
    <div className="card card-hover" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
      <div style={{ height: 180, position: 'relative', borderBottom: '1px solid var(--border)', overflow: 'hidden' }}>
        {preview}
      </div>
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className="mono" style={{ fontSize: 11, color: 'var(--fg-4)', marginBottom: 10, letterSpacing: '0.1em' }}>{num} · ШАГ</div>
        <h3 className="h4" style={{ margin: 0, marginBottom: 8 }}>{title}</h3>
        <p style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.5, margin: 0, marginBottom: 20 }}>{desc}</p>
        <div className="row" style={{ marginTop: 'auto', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: ctaAccent ? 'var(--violet)' : 'var(--fg)' }}>{cta}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </div>
      </div>
    </div>
  );
}

function WheelPreview() {
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

function EventsPreview() {
  return (
    <div style={{ position: 'absolute', inset: 16, display: 'flex', gap: 8 }}>
      {EVENTS.slice(0,3).map((e, i) => (
        <div key={e.id} style={{
          flex: 1, height: '100%',
          borderRadius: 8, overflow: 'hidden',
          transform: `rotate(${(i-1)*2}deg) translateY(${Math.abs(i-1)*8}px)`,
          transition: 'transform .3s',
        }}>
          <EventCover event={e} height={148}/>
        </div>
      ))}
    </div>
  );
}

function OrgsPreview() {
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

function CompactEventCard({ event }) {
  const t = EVENT_TYPES[event.type];
  return (
    <div className="card card-hover" style={{ width: 280, flexShrink: 0, padding: 0, overflow: 'hidden', cursor: 'pointer', scrollSnapAlign: 'start' }}>
      <EventCover event={event} height={140}/>
      <div style={{ padding: 16 }}>
        <div className="row gap-2" style={{ marginBottom: 10 }}>
          <div style={{
            background: t.bg, border: `1px solid ${t.color}40`, color: t.color,
            padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600,
          }}>{t.label}</div>
          <span className="mono" style={{ fontSize: 11, color: 'var(--fg-4)' }}>{event.format}</span>
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.3, marginBottom: 8, height: 36, overflow: 'hidden' }}>{event.title}</div>
        <div className="row gap-2" style={{ fontSize: 12, color: 'var(--fg-3)', marginBottom: 12 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>
          {event.date.d} {event.date.m} · {event.time}
        </div>
        <CapacityBar registered={event.registered} capacity={event.capacity} color={t.color}/>
      </div>
    </div>
  );
}

window.HomeScreen = HomeScreen;
window.CompactEventCard = CompactEventCard;
