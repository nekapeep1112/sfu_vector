// Mobile views — frame for phone screen
function MobileFrame({ children, title }) {
  return (
    <div style={{ width: 390, height: 760, borderRadius: 36, background: '#000', padding: 8, boxShadow: '0 20px 60px rgba(0,0,0,0.5)', border: '1px solid #1a1a1a' }}>
      <div style={{ width: '100%', height: '100%', borderRadius: 30, background: 'var(--bg)', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        {/* Status bar */}
        <div style={{ height: 36, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
          <span>9:41</span>
          <div className="row gap-1">
            <svg width="14" height="10" viewBox="0 0 14 10" fill="white"><rect x="0" y="6" width="2" height="4"/><rect x="3" y="4" width="2" height="6"/><rect x="6" y="2" width="2" height="8"/><rect x="9" y="0" width="2" height="10"/></svg>
            <svg width="20" height="10" viewBox="0 0 20 10" fill="none" stroke="white" strokeWidth="1"><rect x="1" y="2" width="16" height="6" rx="1"/><rect x="2" y="3" width="13" height="4" fill="white"/><rect x="18" y="4" width="1" height="2" fill="white"/></svg>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>{children}</div>
      </div>
    </div>
  );
}

// Bottom nav
function MobileBottomNav({ active = 'home' }) {
  const items = [
    { id: 'home', label: 'Главная', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12 12 3l9 9M5 10v10h14V10"/></svg> },
    { id: 'orgs', label: 'Орг-ции', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="10" r="2.2"/><path d="M3 19c.5-3 3-5 6-5s5.5 2 6 5"/></svg> },
    { id: 'events', label: 'События', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg> },
    { id: 'profile', label: 'Профиль', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4.5 4.5-7 8-7s7 2.5 8 7"/></svg> },
  ];
  return (
    <div style={{ height: 72, borderTop: '1px solid var(--border)', background: 'var(--bg-2)', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexShrink: 0, padding: '0 8px 18px' }}>
      {items.map(it => {
        const isActive = active === it.id;
        return (
          <button key={it.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: 8, color: isActive ? 'var(--violet)' : 'var(--fg-4)' }}>
            {it.icon}
            <span style={{ fontSize: 10, fontWeight: 600 }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function MobileHome() {
  return (
    <MobileFrame>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ padding: '8px 16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Logo size="sm" tagline={false}/>
          <button style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/></svg>
            <span style={{ position: 'absolute', top: 6, right: 6, width: 6, height: 6, borderRadius: '50%', background: 'var(--violet)' }}/>
          </button>
        </div>
        <div style={{ padding: 16, flex: 1, overflowY: 'auto' }}>
          {/* hero compact */}
          <div style={{ borderRadius: 16, padding: 20, position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #1A1F3E, #2A1F4E)', border: '1px solid var(--border)', marginBottom: 16 }}>
            <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'var(--grad)', opacity: 0.3, filter: 'blur(30px)' }}/>
            <div style={{ position: 'relative' }}>
              <div className="chip" style={{ marginBottom: 10, background: 'rgba(37,99,235,0.10)', borderColor: 'rgba(37,99,235,0.25)', color: 'var(--blue)' }}>СФУ.Вектор</div>
              <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.15, marginBottom: 8 }}>Единое пространство <span className="text-grad">возможностей</span></div>
              <button className="btn btn-primary btn-sm" style={{ marginTop: 10 }}>Найти своё сообщество →</button>
            </div>
          </div>

          {/* stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 20 }}>
            {[{v:'20',l:'институтов'},{v:'30',l:'общежитий'},{v:'50+',l:'организаций'},{v:'1000+',l:'мероприятий'}].map((s,i)=>(
              <div key={i} style={{ padding: 12, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 18, fontWeight: 800 }}>{s.v}</div>
                <div style={{ fontSize: 10, color: 'var(--fg-4)' }}>{s.l}</div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Что происходит</div>
          <div className="col gap-2">
            {EVENTS.slice(0, 3).map(e => (
              <div key={e.id} className="card" style={{ padding: 10, display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                  <EventCover event={e} height={44}/>
                </div>
                <div className="col" style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.3, marginBottom: 2 }}>{e.title}</div>
                  <div style={{ fontSize: 10, color: 'var(--fg-4)' }}>{e.date.d} {e.date.m} · {e.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <MobileBottomNav active="home"/>
      </div>
    </MobileFrame>
  );
}

function MobileEvents() {
  return (
    <MobileFrame>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Мероприятия</div>
          <div style={{ fontSize: 12, color: 'var(--fg-3)' }}>{EVENTS.length} ближайших · следующие 30 дней</div>
        </div>
        <div style={{ padding: '0 16px 16px', display: 'flex', gap: 8, overflowX: 'auto' }}>
          {['Все','Хакатон','Карьера','Спорт','Творчество'].map((t,i)=>(
            <button key={t} style={{ padding: '6px 12px', borderRadius: 8, background: i===0 ? 'var(--grad-soft)' : 'var(--surface)', border: '1px solid ' + (i===0 ? 'rgba(155,92,255,0.3)' : 'var(--border)'), fontSize: 12, fontWeight: 600, color: 'var(--fg-2)', whiteSpace: 'nowrap', flexShrink: 0 }}>{t}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px', flex: 1, overflowY: 'auto' }}>
          <div className="col gap-3">
            {EVENTS.map(e => {
              const t = EVENT_TYPES[e.type];
              return (
                <div key={e.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                  <EventCover event={e} height={120}/>
                  <div style={{ padding: 14 }}>
                    <div className="row gap-2" style={{ marginBottom: 8 }}>
                      <div style={{ background: t.bg, color: t.color, padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, border: `1px solid ${t.color}40` }}>● {t.label}</div>
                      <span style={{ fontSize: 10, color: 'var(--fg-4)' }}>· {e.format}</span>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{e.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--fg-3)', marginBottom: 10 }}>{e.date.d} {e.date.m} · {e.time} · {e.loc}</div>
                    <CapacityBar registered={e.registered} capacity={e.capacity} color={t.color}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <MobileBottomNav active="events"/>
      </div>
    </MobileFrame>
  );
}

function MobileInstitute() {
  return (
    <MobileFrame>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
          <div style={{ fontSize: 14, fontWeight: 700 }}>Институт</div>
        </div>
        <div style={{ padding: 16, flex: 1, overflowY: 'auto' }}>
          {/* hero */}
          <div style={{ borderRadius: 16, padding: 20, background: 'linear-gradient(135deg, #4F7FFF, #2F4FB8)', position: 'relative', overflow: 'hidden', marginBottom: 16 }}>
            <svg style={{ position: 'absolute', inset: 0, opacity: 0.2 }} width="100%" height="100%"><defs><pattern id="mp" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M0 20 L20 0" stroke="white" strokeWidth="0.5" fill="none"/></pattern></defs><rect width="100%" height="100%" fill="url(#mp)"/></svg>
            <div style={{ position: 'relative' }}>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M3 9 12 3l9 6v12H3z"/><path d="M9 21V12h6v9"/></svg>
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: 'white' }}>ИКИТ</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', lineHeight: 1.4, marginTop: 4 }}>Институт космических и информационных технологий</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 }}>
            {[{v:3,l:'орг.'},{v:'832',l:'уч.'},{v:47,l:'мер.'}].map((s,i)=>(
              <div key={i} style={{ padding: 12, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 800 }}>{s.v}</div>
                <div style={{ fontSize: 10, color: 'var(--fg-4)' }}>{s.l}</div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Организации</div>
          <div className="col gap-2">
            {[{a:'СС',n:'Студсовет ИКИТ',c:'#4F7FFF'},{a:'ПФ',n:'Профком ИКИТ',c:'#9B5CFF'},{a:'МЦ',n:'Медиацентр',c:'#F5A524'}].map((o,i)=>(
              <div key={i} className="card" style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${o.c}, ${tonalShift(o.c)})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: 'white' }}>{o.a}</div>
                <div style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{o.n}</div>
                <span style={{ fontSize: 11, color: 'var(--green)' }}>● Активно</span>
              </div>
            ))}
          </div>

          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}>Подать заявку на вступление</button>
        </div>
      </div>
    </MobileFrame>
  );
}

window.MobileHome = MobileHome;
window.MobileEvents = MobileEvents;
window.MobileInstitute = MobileInstitute;
