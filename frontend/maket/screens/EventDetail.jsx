// Event detail screen — page after clicking "Участвовать" in EventRow
// Uses existing tokens, EventCover, CapacityBar, AvatarStack, EVENT_TYPES, tonalShift, INSTITUTES, EVENTS,
// plus Sidebar / Topbar / Footer chrome and base classes (.card, .btn, .chip, etc.)

// ─── Small icons (inline SVG, strokeWidth 2, stroke=currentColor) ───
const Ic = {
  cal:    (p) => <svg width={p.s||14} height={p.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  clock:  (p) => <svg width={p.s||14} height={p.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
  pin:    (p) => <svg width={p.s||14} height={p.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  users:  (p) => <svg width={p.s||14} height={p.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  ruble:  (p) => <svg width={p.s||14} height={p.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 21V5h6.5a4.5 4.5 0 0 1 0 9H5M5 17h11"/></svg>,
  star:   (p) => <svg width={p.s||14} height={p.s||14} viewBox="0 0 24 24" fill={p.fill||'none'} stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  share:  (p) => <svg width={p.s||14} height={p.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>,
  check:  (p) => <svg width={p.s||14} height={p.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/></svg>,
  ext:    (p) => <svg width={p.s||14} height={p.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  arrow:  (p) => <svg width={p.s||14} height={p.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  format: (p) => <svg width={p.s||14} height={p.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
};

// ─── Hero: cover + title block ─────────────────────────
function EventDetailHero({ event }) {
  const t = EVENT_TYPES[event.type];
  return (
    <div>
      <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', marginBottom: 24 }}>
        <EventCover event={event} height={380}/>
        {/* date badge top-left */}
        <div style={{
          position: 'absolute', top: 16, left: 16,
          background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(15,23,42,0.1)',
          borderRadius: 14, padding: '10px 14px', textAlign: 'center',
          minWidth: 64, boxShadow: '0 6px 20px rgba(15,23,42,0.18)',
        }}>
          <div style={{ fontSize: 32, fontWeight: 800, lineHeight: 1, color: 'var(--fg)', letterSpacing: '-0.03em' }}>{event.date.d}</div>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>{event.date.m} · {event.date.wd}</div>
        </div>
        {/* action icons top-right */}
        <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 8 }}>
          {[<Ic.star key="s" s={16}/>, <Ic.share key="sh" s={16}/>].map((ic, i) => (
            <button key={i} style={{
              width: 40, height: 40, borderRadius: 12,
              background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(15,23,42,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--fg)', cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(15,23,42,0.15)',
            }}>{ic}</button>
          ))}
        </div>
      </div>

      {/* title block */}
      <div style={{ marginBottom: 8 }}>
        <span style={{ background: t.bg, border: `1px solid ${t.color}40`, color: t.color, padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 600, display: 'inline-block' }}>● {t.label}</span>
      </div>
      <h2 className="h2" style={{ margin: 0, fontSize: 36, lineHeight: 1.15, letterSpacing: '-0.025em', wordBreak: 'break-word' }}>{event.title}</h2>
      <p style={{ fontSize: 17, color: 'var(--fg-2)', marginTop: 8, marginBottom: 0, lineHeight: 1.5 }}>
        Двухдневный хакатон от ИКИТ и Профсоюза СФУ. Командная разработка решений для университета — от идеи до прототипа за 48 часов.
      </p>
    </div>
  );
}

// ─── Sticky registration card (right column) ─────────
function RegistrationCard({ event }) {
  const t = EVENT_TYPES[event.type];
  const rows = [
    { label: 'Когда',        value: `${event.date.d} ${event.date.m}, ${event.time}`, icon: <Ic.cal s={14}/> },
    { label: 'Длительность', value: event.duration,                                   icon: <Ic.clock s={14}/> },
    { label: 'Место',        value: event.loc,                                        icon: <Ic.pin s={14}/> },
    { label: 'Формат',       value: event.format,                                     icon: <Ic.format s={14}/> },
    { label: 'Цена',         value: 'Бесплатно',                                      icon: <Ic.ruble s={14}/> },
  ];
  return (
    <aside className="card" style={{ padding: 24, position: 'sticky', top: 88, alignSelf: 'flex-start' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 700, color: 'var(--green)', marginBottom: 16 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 0 4px rgba(5,150,105,0.15)' }}/>
        Регистрация открыта
      </div>

      <div style={{ marginBottom: 14 }}>
        <CapacityBar registered={event.registered} capacity={event.capacity} color={t.color}/>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <AvatarStack count={event.registered}/>
      </div>

      <div style={{ borderTop: '1px solid var(--border)', margin: '16px 0' }}/>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
            <span style={{ color: 'var(--fg-4)', display: 'inline-flex', width: 16, justifyContent: 'center' }}>{r.icon}</span>
            <span style={{ fontSize: 10, color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, width: 80, flexShrink: 0 }}>{r.label}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg)', flex: 1, textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.value}</span>
          </div>
        ))}
      </div>

      <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', height: 48, fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Участвовать</button>
      <button className="btn btn-ghost btn-sm" style={{ width: '100%', justifyContent: 'center' }}>Скачать в календарь .ics</button>

      <div style={{ marginTop: 14, fontSize: 11, color: 'var(--fg-4)', textAlign: 'center' }}>
        Регистрация открыта до 19 мая, 23:59
      </div>
    </aside>
  );
}

// ─── Program timeline ─────────────────────────────────
function EventProgramTimeline() {
  const days = [
    { title: 'ДЕНЬ 1 — 20 мая', steps: [
      { t: '14:00', d: 'Открытие, приветствие, постановка задач' },
      { t: '15:00', d: 'Знакомство, сбор команд' },
      { t: '17:00', d: 'Первый чек-ин с менторами' },
      { t: '19:00', d: 'Кофебрейк и нетворкинг' },
    ]},
    { title: 'ДЕНЬ 2 — 21 мая', steps: [
      { t: '10:00', d: 'Утренний стендап' },
      { t: '14:00', d: 'Промежуточные демо' },
      { t: '18:00', d: 'Финальные демо и питчи' },
      { t: '20:00', d: 'Награждение и фуршет' },
    ]},
  ];
  return (
    <div>
      {days.map((day, di) => (
        <div key={di} style={{ marginBottom: di === days.length - 1 ? 0 : 24 }}>
          <h4 className="h4" style={{ margin: 0, marginTop: di === 0 ? 0 : 8, marginBottom: 12, fontSize: 13, fontWeight: 700, color: 'var(--fg-3)', letterSpacing: '0.08em' }}>{day.title}</h4>
          <div style={{ position: 'relative' }}>
            {day.steps.map((s, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 16, alignItems: 'flex-start', position: 'relative', paddingBottom: i === day.steps.length - 1 ? 0 : 14 }}>
                <div className="mono" style={{ fontSize: 13, color: 'var(--fg-3)', fontFamily: 'JetBrains Mono, monospace', paddingTop: 1 }}>{s.t}</div>
                <div style={{ position: 'relative', paddingLeft: 18 }}>
                  {/* dot */}
                  <span style={{ position: 'absolute', left: 0, top: 5, width: 9, height: 9, borderRadius: '50%', background: 'linear-gradient(135deg, var(--blue), var(--violet))', boxShadow: '0 0 0 3px var(--bg)' }}/>
                  {/* connector line */}
                  {i !== day.steps.length - 1 && (
                    <span style={{ position: 'absolute', left: 4, top: 14, bottom: -8, width: 1, background: 'var(--border)' }}/>
                  )}
                  <div style={{ fontSize: 14, color: 'var(--fg)', lineHeight: 1.4 }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Organizer card ──────────────────────────────────
function OrganizerCard({ abbr, label, eventsCount, participants }) {
  const inst = INSTITUTES.find(i => i.abbr === abbr);
  const color = inst ? inst.color : '#4F7FFF';
  const initials = abbr.slice(0, 2);
  return (
    <div className="card card-hover" style={{ padding: 20, flex: 1, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 56, height: 56, borderRadius: 14, background: `linear-gradient(135deg, ${color}, ${tonalShift(color)})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 16, fontWeight: 800, flexShrink: 0, letterSpacing: '-0.01em' }}>{initials}</div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--fg)' }}>{label}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--green)', marginTop: 4 }}>
            <span style={{ color: 'var(--green)', display: 'inline-flex' }}><Ic.check s={12}/></span>
            Верифицированная организация
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--fg-3)' }}>
        <span>{eventsCount} мероприятий</span>
        <span style={{ color: 'var(--fg-4)' }}>·</span>
        <span>{participants} участников</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
        <span style={{ fontSize: 13, color: 'var(--blue)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          Открыть профиль <Ic.arrow s={12}/>
        </span>
      </div>
    </div>
  );
}

// ─── Who's going (extended avatar stack) ─────────────
function WhoIsGoing({ event }) {
  const palette = ['#2563EB','#7C3AED','#059669','#D97706','#DC2626','#0EA5E9','#EA580C','#0891B2'];
  const initials = ['АК','МС','ДВ','ЕП','РК','ОЛ','ИГ','НТ'];
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
        {initials.map((ini, i) => (
          <div key={i} style={{
            width: 40, height: 40, borderRadius: '50%',
            background: `linear-gradient(135deg, ${palette[i]}, ${tonalShift(palette[i])})`,
            border: '3px solid var(--surface)',
            marginLeft: i ? -10 : 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 700, fontSize: 12,
            boxShadow: '0 2px 6px rgba(15,23,42,0.1)',
          }}>{ini}</div>
        ))}
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: 'var(--surface-3)', border: '3px solid var(--surface)',
          marginLeft: -10, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--fg-2)', fontWeight: 700, fontSize: 12,
        }}>+{event.registered - 8}</div>
      </div>
      <div style={{ fontSize: 13, color: 'var(--fg-3)' }}>
        {event.registered} из {event.capacity} мест занято · регистрация до 19 мая
      </div>
    </div>
  );
}

// ─── Location block (map placeholder) ────────────────
function EventLocationBlock() {
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ position: 'relative', height: 320, background: 'var(--surface-2)' }}>
        {/* grid pattern */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.6 }}>
          <defs>
            <pattern id="loc-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0 L0 0 0 40" stroke="var(--border)" strokeWidth="1" fill="none"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#loc-grid)"/>
        </svg>
        {/* small chip top-left */}
        <div style={{
          position: 'absolute', top: 16, left: 16,
          padding: '6px 12px', borderRadius: 10,
          background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(15,23,42,0.08)',
          fontSize: 12, fontWeight: 600, color: 'var(--fg)',
          boxShadow: '0 4px 12px rgba(15,23,42,0.08)',
        }}>Библиотека СФУ</div>
        {/* center pin */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -100%)', filter: 'drop-shadow(0 6px 14px rgba(124,58,237,0.4))' }}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M24 4 C 14 4 7 11 7 21 C 7 32 24 44 24 44 C 24 44 41 32 41 21 C 41 11 34 4 24 4 Z" fill="var(--violet)"/>
            <circle cx="24" cy="20" r="6" fill="white"/>
          </svg>
        </div>
        {/* "you are here"-style radial ring around center */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.18), transparent 70%)', pointerEvents: 'none' }}/>
      </div>
      <div style={{ padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, borderTop: '1px solid var(--border)' }}>
        <div style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.4 }}>
          <div style={{ color: 'var(--fg)', fontWeight: 600 }}>Библиотека СФУ, корп. Л / ул. Свободный 79</div>
          <div style={{ fontSize: 12, color: 'var(--fg-4)', marginTop: 2 }}>Аудитория 5-08, 5-й этаж</div>
        </div>
        <button className="btn btn-ghost btn-sm" style={{ flexShrink: 0 }}>
          Открыть в Яндекс.Картах <Ic.ext s={12}/>
        </button>
      </div>
    </div>
  );
}

// ─── Requirements row ────────────────────────────────
function EventRequirementsRow() {
  const items = [
    { e: '💻', t: 'Ноутбук с зарядкой', d: 'Любой современный' },
    { e: '🪪', t: 'Студенческий билет', d: 'Для прохода в корпус' },
    { e: '☕', t: 'Хорошее настроение', d: '48 часов вместе' },
    { e: '🤝', t: 'Готовность к команде', d: '3–5 человек' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
      {items.map((it, i) => (
        <div key={i} className="card" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontSize: 24, lineHeight: 1, marginBottom: 4 }}>{it.e}</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)' }}>{it.t}</div>
          <div style={{ fontSize: 12, color: 'var(--fg-3)' }}>{it.d}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Similar events (uses a compact card built locally) ─
function SimilarEvents() {
  const items = EVENTS.slice(1, 4);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      {items.map(e => {
        const t = EVENT_TYPES[e.type];
        return (
          <div key={e.id} className="card card-hover" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative' }}>
              <EventCover event={e} height={140}/>
              <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', border: '1px solid rgba(15,23,42,0.1)', borderRadius: 10, padding: '6px 10px', textAlign: 'center', minWidth: 50 }}>
                <div style={{ fontSize: 18, fontWeight: 800, lineHeight: 1, color: 'var(--fg)', letterSpacing: '-0.02em' }}>{e.date.d}</div>
                <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 2 }}>{e.date.m}</div>
              </div>
            </div>
            <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
              <span style={{ background: t.bg, border: `1px solid ${t.color}40`, color: t.color, padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, alignSelf: 'flex-start' }}>● {t.label}</span>
              <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.3, color: 'var(--fg)' }}>{e.title}</div>
              <div style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Ic.pin s={11}/> <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.loc}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Sticky bottom CTA bar ───────────────────────────
function StickyBottomBar({ event }) {
  return (
    <div className="card" style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.title}</div>
        <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 2 }}>{event.registered} из {event.capacity} мест · регистрация до 19 мая</div>
      </div>
      <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
        <button className="btn btn-ghost" style={{ width: 44, height: 44, justifyContent: 'center', padding: 0 }}><Ic.star s={16}/></button>
        <button className="btn btn-primary" style={{ height: 44, padding: '0 24px', fontWeight: 700 }}>Участвовать</button>
      </div>
    </div>
  );
}

// ─── Section helper ──────────────────────────────────
function Section({ title, action, children, top = 40 }) {
  return (
    <section style={{ marginTop: top }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
        <h3 className="h3" style={{ margin: 0 }}>{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}

// ─── Main screen ─────────────────────────────────────
function EventDetailScreen({ event }) {
  const ev = event || EVENTS[0];
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar active="events" loggedIn={true}/>
        <main style={{ flex: 1, minWidth: 0 }}>
          <Topbar loggedIn={true}/>
          <div style={{ maxWidth: 1240, margin: '0 auto', padding: 32 }}>
            {/* breadcrumb */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, gap: 16 }}>
              <div style={{ fontSize: 13, color: 'var(--fg-3)' }}>
                <a href="#" style={{ color: 'var(--fg-3)' }}>← Мероприятия</a>
                <span style={{ margin: '0 6px', color: 'var(--fg-4)' }}>/</span>
                <span style={{ color: 'var(--fg-2)' }}>{ev.title}</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-ghost btn-sm"><Ic.star s={12}/> В избранное</button>
                <button className="btn btn-ghost btn-sm"><Ic.share s={12}/> Поделиться</button>
              </div>
            </div>

            {/* Hero + right registration card */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'flex-start' }}>
              <div style={{ minWidth: 0 }}>
                <EventDetailHero event={ev}/>

                <Section title="О мероприятии">
                  <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--fg-2)', marginTop: 0, marginBottom: 12 }}>
                    Siberian Hack 2026 — это два дня концентрированной работы над реальными задачами Сибирского федерального университета. Команды из 3–5 человек собираются на месте, выбирают трек и за 48 часов проходят путь от первой идеи до работающего прототипа.
                  </p>
                  <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--fg-2)', margin: '0 0 12px' }}>
                    В этом году четыре трека: студенческая жизнь, расписание и учебный процесс, кампус и инфраструктура, открытые данные СФУ. Менторы — действующие разработчики из ИКИТ и приглашённые специалисты из Сбера, Тинькофф и Яндекса.
                  </p>
                  <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--fg-2)', margin: 0 }}>
                    Победители получают денежные призы, стажировки у партнёров и публикацию проекта в годовом отчёте университета. Все участники — сертификаты и +16 часов в портфолио активности.
                  </p>
                </Section>

                <Section title="Программа">
                  <EventProgramTimeline/>
                </Section>

                <Section title="Организаторы">
                  <div style={{ display: 'flex', gap: 16 }}>
                    <OrganizerCard abbr="ИКИТ" label="ИКИТ" eventsCount={247} participants="1.2k"/>
                    <OrganizerCard abbr="ИЭУиП" label="Профсоюз СФУ" eventsCount={189} participants="3.4k"/>
                  </div>
                </Section>

                <Section title="Кто уже идёт" action={
                  <a href="#" style={{ fontSize: 13, color: 'var(--blue)', fontWeight: 600 }}>Все участники →</a>
                }>
                  <WhoIsGoing event={ev}/>
                </Section>

                <Section title="Где это">
                  <EventLocationBlock/>
                </Section>

                <Section title="Что нужно с собой">
                  <EventRequirementsRow/>
                </Section>

                <Section title="Похожие мероприятия" action={
                  <a href="#" style={{ fontSize: 13, color: 'var(--blue)', fontWeight: 600 }}>Вся афиша →</a>
                }>
                  <SimilarEvents/>
                </Section>

                <div style={{ marginTop: 40 }}>
                  <StickyBottomBar event={ev}/>
                </div>
              </div>

              <RegistrationCard event={ev}/>
            </div>
          </div>
          <Footer/>
        </main>
      </div>
    </div>
  );
}

window.EventDetailScreen = EventDetailScreen;
