// EventRegister — student registration + ticket flow.
// Three states (artboards): "form" (application), "success" (waiting), "ticket" (QR + code).
// All centered on EVENTS[0] — Хакатон Siberian Hack 2026.
// Uses existing tokens, Sidebar (personal), Topbar, Footer, EventCover, EVENT_TYPES, EVENTS, CURRENT_USER.

// ─── Icons ─────────────────────────────────────────────────────
const Rg = {
  cal:    (p) => <svg width={p.s||16} height={p.s||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  pin:    (p) => <svg width={p.s||16} height={p.s||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  users:  (p) => <svg width={p.s||16} height={p.s||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  org:    (p) => <svg width={p.s||16} height={p.s||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21V7l9-4 9 4v14"/><path d="M9 21V12h6v9"/><path d="M3 21h18"/></svg>,
  clock:  (p) => <svg width={p.s||16} height={p.s||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
  qr:     (p) => <svg width={p.s||16} height={p.s||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v0M14 21v-4M17 17v0M21 21v-4"/></svg>,
  copy:   (p) => <svg width={p.s||16} height={p.s||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
  share:  (p) => <svg width={p.s||16} height={p.s||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>,
  download:(p) => <svg width={p.s||16} height={p.s||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  x:      (p) => <svg width={p.s||16} height={p.s||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  check:  (p) => <svg width={p.s||16} height={p.s||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  checkCircle: (p) => <svg width={p.s||14} height={p.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/></svg>,
  info:   (p) => <svg width={p.s||20} height={p.s||20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  arrow:  (p) => <svg width={p.s||14} height={p.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
};

// ─── Breadcrumb ──────────────────────────────────────
function RegBreadcrumb({ step }) {
  return (
    <div style={{ fontSize: 13, color: 'var(--fg-3)', marginBottom: 24 }}>
      <a href="#" style={{ color: 'var(--fg-3)' }}>← Мероприятия</a>
      <span style={{ margin: '0 8px', color: 'var(--fg-4)' }}>/</span>
      <span style={{ color: 'var(--fg-3)' }}>Хакатон Siberian Hack 2026</span>
      <span style={{ margin: '0 8px', color: 'var(--fg-4)' }}>/</span>
      <span style={{ color: 'var(--fg-2)', fontWeight: 600 }}>{step}</span>
    </div>
  );
}

// ─── Form-state mini summary card ────────────────────
function MiniSummaryCard({ event }) {
  const t = EVENT_TYPES[event.type] || EVENT_TYPES.community;
  const lines = [
    { ic: <Rg.cal s={14}/>, txt: '20 мая, 14:00 · 2 дня' },
    { ic: <Rg.pin s={14}/>, txt: 'Библиотека СФУ, ауд. 5-08' },
    { ic: <Rg.users s={14}/>, txt: '47 из 200 мест' },
    { ic: <Rg.org s={14}/>, txt: 'Студсовет ИКИТ' },
  ];
  return (
    <aside className="card" style={{ padding: 0, overflow: 'hidden', position: 'sticky', top: 88, alignSelf: 'flex-start' }}>
      <EventCover event={event} height={140}/>
      <div style={{ padding: 20 }}>
        <span style={{ background: t.bg, border: `1px solid ${t.color}40`, color: t.color, padding: '4px 10px', borderRadius: 8, fontSize: 11, fontWeight: 600, display: 'inline-block' }}>● {t.label}</span>
        <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.3, color: 'var(--fg)', marginTop: 10 }}>Хакатон Siberian Hack 2026</div>
        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {lines.map((l, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--fg-3)' }}>
              <span style={{ color: 'var(--fg-4)', display: 'inline-flex' }}>{l.ic}</span>
              <span>{l.txt}</span>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--border)', marginTop: 16, paddingTop: 14 }}>
          <div style={{ fontSize: 11, color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>Тебе начислят после участия</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: 'var(--blue)', lineHeight: 1 }}>16 ч</span>
            <span style={{ fontSize: 12, color: 'var(--fg-3)' }}>в портфолио активности</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ─── Radio card (track selector) ─────────────────────
function RadioCard({ title, desc, selected }) {
  return (
    <div className="card" style={{
      padding: 14,
      cursor: 'pointer',
      border: selected ? '2px solid var(--blue)' : '1px solid var(--border)',
      background: selected ? 'color-mix(in oklab, var(--blue) 6%, transparent)' : 'var(--surface)',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <span style={{
          width: 18, height: 18, borderRadius: '50%',
          border: selected ? '6px solid var(--blue)' : '2px solid var(--fg-4)',
          background: selected ? 'var(--surface)' : 'transparent',
          flexShrink: 0, marginTop: 2,
          boxSizing: 'border-box',
        }}/>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg)', lineHeight: 1.3 }}>{title}</div>
          <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 4, lineHeight: 1.4 }}>{desc}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Form state ──────────────────────────────────────
function RegistrationForm() {
  const event = EVENTS[0];
  const tracks = [
    { t: 'Студенческая жизнь',          d: 'Сервисы, которые улучшают повседневную жизнь студентов' },
    { t: 'Учебный процесс и расписание', d: 'Решения для расписания, материалов, нагрузки' },
    { t: 'Кампус и инфраструктура',      d: 'Карта корпусов, ориентация, доступность' },
    { t: 'Открытые данные СФУ',          d: 'Аналитика, визуализация, открытые API' },
  ];
  const selectedTrack = 1;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'flex-start' }}>
      <div style={{ minWidth: 0 }}>
        {/* Heading */}
        <h2 className="h2" style={{ margin: 0, fontSize: 32, lineHeight: 1.15, letterSpacing: '-0.025em' }}>Заявка на участие</h2>
        <p style={{ fontSize: 14, color: 'var(--fg-3)', margin: '6px 0 0', lineHeight: 1.5 }}>
          У этого мероприятия — отбор. Заполни короткую анкету, организаторы рассмотрят за 1–2 дня.
        </p>

        {/* Alert */}
        <div className="card" style={{
          marginTop: 20, padding: 16,
          background: 'color-mix(in oklab, var(--amber) 8%, transparent)',
          border: '1px solid color-mix(in oklab, var(--amber) 30%, transparent)',
          display: 'flex', gap: 12, alignItems: 'flex-start',
        }}>
          <span style={{ color: 'var(--amber)', display: 'inline-flex', flexShrink: 0, marginTop: 1 }}><Rg.info s={20}/></span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)' }}>Что важно знать</div>
            <div style={{ fontSize: 13, color: 'var(--fg-2)', marginTop: 4, lineHeight: 1.55 }}>
              Регистрация — заявочная. Отправляя анкету, ты <strong>не занимаешь</strong> место — место выделится только после одобрения организатором (Студсовет ИКИТ). Уведомление придёт в e-mail и в приложение.
            </div>
          </div>
        </div>

        {/* Form card */}
        <div className="card" style={{ padding: 28, marginTop: 24 }}>
          {/* Field 1 */}
          <div>
            <h4 className="h4" style={{ margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--fg)' }}>
              Опыт участия в хакатонах <span style={{ color: 'var(--red)' }}>*</span>
            </h4>
            <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 4 }}>
              Расскажи где участвовал, какие места занимал. Можно списком.
            </div>
            <textarea
              className="input"
              style={{ marginTop: 12, height: 100, padding: 14, resize: 'none', fontFamily: 'inherit', width: '100%', boxSizing: 'border-box' }}
              defaultValue="Участвовала в двух: Сбер.Хакатон 2024 и хакатон ИКИТ прошлой осенью. В обоих наша команда заняла призовые места."
            />
          </div>

          {/* Field 2 */}
          <div style={{ marginTop: 28 }}>
            <h4 className="h4" style={{ margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--fg)' }}>
              Выбери трек <span style={{ color: 'var(--red)' }}>*</span>
            </h4>
            <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 4 }}>Один из 4 на выбор</div>
            <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {tracks.map((tr, i) => (
                <RadioCard key={i} title={tr.t} desc={tr.d} selected={i === selectedTrack}/>
              ))}
            </div>
          </div>

          {/* Field 3 */}
          <div style={{ marginTop: 28 }}>
            <h4 className="h4" style={{ margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--fg)' }}>
              Собрана ли команда? <span style={{ color: 'var(--red)' }}>*</span>
            </h4>
            <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <RadioCard title="Да, есть команда" desc="Команда от 3 до 5 человек" selected={true}/>
              <RadioCard title="Нет, ищу команду на месте" desc="Соберёмся в первый день" selected={false}/>
            </div>
            <div style={{ marginTop: 16 }}>
              <h4 className="h4" style={{ margin: 0, fontSize: 13, fontWeight: 600, color: 'var(--fg-2)' }}>Состав команды</h4>
              <textarea
                className="input"
                style={{ marginTop: 8, height: 90, padding: 14, resize: 'none', fontFamily: 'inherit', width: '100%', boxSizing: 'border-box' }}
                defaultValue="Я — Анна Кузнецова, ИКИТ 3 курс. + двое из ИКИТ, один из ИМиФИ. Ищем ещё одного дизайнера."
              />
            </div>
          </div>

          {/* Field 4 */}
          <div style={{ marginTop: 28 }}>
            <h4 className="h4" style={{ margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--fg)' }}>
              Ссылка на GitHub или портфолио
            </h4>
            <div style={{ fontSize: 12, color: 'var(--fg-4)', marginTop: 4 }}>
              Необязательно. Если есть — поможет команде понять твой уровень.
            </div>
            <input
              className="input"
              style={{ marginTop: 12, height: 44, width: '100%', boxSizing: 'border-box' }}
              placeholder="https://github.com/…"
              defaultValue="github.com/annak-sfu"
            />
          </div>

          {/* Agreement */}
          <div style={{ marginTop: 24, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{
              width: 20, height: 20, borderRadius: 6,
              background: 'var(--blue)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', flexShrink: 0,
            }}><Rg.check s={14}/></span>
            <div style={{ fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.5 }}>
              Я согласен с правилами участия и обработкой персональных данных в рамках мероприятия. Понимаю, что в случае одобрения должен явиться лично.
            </div>
          </div>

          {/* Buttons */}
          <div style={{
            marginTop: 28, paddingTop: 24, borderTop: '1px solid var(--border)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
          }}>
            <button className="btn btn-ghost">← Отменить и вернуться</button>
            <button className="btn btn-primary" style={{ height: 48, padding: '0 24px', fontSize: 15, fontWeight: 700 }}>
              Отправить заявку <Rg.arrow s={14}/>
            </button>
          </div>
        </div>
      </div>

      <MiniSummaryCard event={event}/>
    </div>
  );
}

// ─── Success state ───────────────────────────────────
function RegistrationSuccess() {
  const steps = [
    { t: 'Жди решения',           d: 'Обычно — 1–2 дня. Можешь отслеживать статус в разделе «Мои заявки».' },
    { t: 'Получи место',          d: 'Если одобрят — место автоматически закрепится. Появится QR-билет в «Моих мероприятиях».' },
    { t: 'Приходи на хакатон',    d: '20 мая в 14:00. Покажешь QR-код на входе — и ты внутри.' },
  ];
  return (
    <div style={{ maxWidth: 640, margin: '40px auto 0' }}>
      <div className="card" style={{ padding: 48, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* decorative bg */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 0%, color-mix(in oklab, var(--amber) 12%, transparent), transparent 60%)',
          pointerEvents: 'none',
        }}/>
        <div style={{ position: 'relative' }}>
          {/* Big icon */}
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'color-mix(in oklab, var(--amber) 14%, transparent)',
            color: 'var(--amber)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto',
          }}>
            <Rg.clock s={40}/>
          </div>

          <h2 className="h2" style={{ marginTop: 24, marginBottom: 0, fontSize: 32, letterSpacing: '-0.025em' }}>Заявка отправлена</h2>
          <p style={{ fontSize: 15, color: 'var(--fg-3)', maxWidth: 480, margin: '8px auto 0', lineHeight: 1.55 }}>
            Студсовет ИКИТ рассмотрит её в течение 1–2 дней. Когда придёт решение — пришлём уведомление в e-mail и в приложение.
          </p>

          {/* What's next */}
          <div className="card" style={{
            padding: 18, textAlign: 'left',
            background: 'var(--bg-2)', border: '1px solid var(--border)',
            marginTop: 28,
          }}>
            <div style={{ fontSize: 11, color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
              Что дальше
            </div>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {steps.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: '50%',
                    background: 'color-mix(in oklab, var(--blue) 14%, transparent)',
                    color: 'var(--blue)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 800, flexShrink: 0,
                  }}>{i + 1}</span>
                  <div>
                    <div style={{ fontSize: 14, color: 'var(--fg)', fontWeight: 600 }}>{s.t}</div>
                    <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 2, lineHeight: 1.5 }}>{s.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div style={{ marginTop: 32, display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button className="btn btn-ghost">К афише</button>
            <button className="btn btn-primary">Посмотреть статус в профиле <Rg.arrow s={14}/></button>
          </div>

          <div style={{ marginTop: 24, fontSize: 12, color: 'var(--fg-4)' }}>Нажми ESC чтобы закрыть</div>
        </div>
      </div>
    </div>
  );
}

// ─── QR pattern (pseudo-generated SVG) ───────────────
function QrPattern({ size = 220 }) {
  const N = 25;
  const cell = size / N;

  // finder marker at (r, c) — 7x7 nested squares
  const isFinder = (r, c) => {
    const inSquare = (br, bc) => r >= br && r < br + 7 && c >= bc && c < bc + 7;
    return inSquare(0, 0) || inSquare(0, N - 7) || inSquare(N - 7, 0);
  };

  const finderColor = (r, c) => {
    // returns 1 if cell should be black, 0 if white, null if not in any finder
    const inSq = (br, bc) => {
      if (!(r >= br && r < br + 7 && c >= bc && c < bc + 7)) return null;
      const lr = r - br, lc = c - bc;
      // outer 7x7 black ring
      if (lr === 0 || lr === 6 || lc === 0 || lc === 6) return 1;
      // inner white margin
      if (lr === 1 || lr === 5 || lc === 1 || lc === 5) return 0;
      // inner 3x3 black
      return 1;
    };
    let v = inSq(0, 0);             if (v !== null) return v;
    v = inSq(0, N - 7);             if (v !== null) return v;
    v = inSq(N - 7, 0);             if (v !== null) return v;
    return null;
  };

  // pseudo-random for data area
  const cells = [];
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const fv = finderColor(r, c);
      if (fv !== null) {
        if (fv === 1) cells.push({ r, c });
        continue;
      }
      // separator white ring around finders
      const nearFinder = isFinder(r, c)
        || (r < 8 && c < 8)
        || (r < 8 && c >= N - 8)
        || (r >= N - 8 && c < 8);
      if (nearFinder) continue;
      // pseudo-random fill ~ 50%
      const v = Math.sin(r * 12.9898 + c * 78.233) * 43758.5453;
      const f = v - Math.floor(v);
      if (f > 0.5) cells.push({ r, c });
    }
  }

  return (
    <div style={{
      padding: 14, background: '#FFFFFF', borderRadius: 12,
      border: '1px solid var(--border)',
      boxShadow: '0 4px 16px rgba(15,23,42,0.08)',
      lineHeight: 0,
    }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} shapeRendering="crispEdges">
        <rect width={size} height={size} fill="#FFFFFF"/>
        {cells.map((cl, i) => (
          <rect key={i} x={cl.c * cell} y={cl.r * cell} width={cell} height={cell} fill="#0F172A"/>
        ))}
      </svg>
    </div>
  );
}

// ─── Ticket state ────────────────────────────────────
function TicketView() {
  const event = EVENTS[0];
  const infoRows = [
    { l: 'Когда',           v: '20 мая, 14:00 — 22 мая' },
    { l: 'Длительность',    v: '2 дня' },
    { l: 'Где',             v: 'Библиотека СФУ, корп. Л, ауд. 5-08' },
    { l: 'Формат',          v: 'Очно' },
    { l: 'Часов активности', v: '16 ч', accent: true },
    { l: 'Организатор',     v: 'Студсовет ИКИТ', verified: true },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'flex-start' }}>
      <div style={{ minWidth: 0 }}>
        {/* Heading */}
        <h2 className="h2" style={{ margin: 0, fontSize: 32, lineHeight: 1.15, letterSpacing: '-0.025em' }}>Мой билет</h2>
        <p style={{ fontSize: 14, color: 'var(--fg-3)', margin: '6px 0 0', lineHeight: 1.5 }}>
          Покажи QR-код на входе. Если не работает камера — продиктуй 4-значный код.
        </p>

        {/* Ticket card */}
        <div className="card" style={{ padding: 0, marginTop: 24, position: 'relative', overflow: 'hidden', borderRadius: 20 }}>
          {/* Cover stub */}
          <div style={{ position: 'relative' }}>
            <EventCover event={event} height={200}/>
            {/* status badge */}
            <div style={{
              position: 'absolute', top: 16, right: 16,
              padding: '6px 12px', borderRadius: 999,
              background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
              color: 'white', fontSize: 11, fontWeight: 700,
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)' }}/>
              Подтверждено
            </div>
            {/* bottom-left title overlay */}
            <div style={{ position: 'absolute', left: 24, right: 24, bottom: 18 }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'white', lineHeight: 1.2, letterSpacing: '-0.015em' }}>Хакатон Siberian Hack 2026</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 4 }}>20 мая, 14:00 · ауд. 5-08</div>
            </div>
          </div>

          {/* Perforation */}
          <div style={{ height: 24, position: 'relative' }}>
            <div style={{
              position: 'absolute', left: -12, top: 0,
              width: 24, height: 24, borderRadius: '50%',
              background: 'var(--bg)',
            }}/>
            <div style={{
              position: 'absolute', right: -12, top: 0,
              width: 24, height: 24, borderRadius: '50%',
              background: 'var(--bg)',
            }}/>
            <div style={{
              position: 'absolute', left: 16, right: 16, top: 12,
              borderTop: '1px dashed var(--border-strong)',
            }}/>
          </div>

          {/* QR + code */}
          <div style={{ padding: 32, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 32, alignItems: 'center' }}>
            <QrPattern size={220}/>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 11, color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
                Или продиктуй код
              </div>
              <div style={{
                marginTop: 10,
                fontSize: 48, fontWeight: 800,
                letterSpacing: '0.05em',
                color: 'var(--fg)',
                fontFamily: 'JetBrains Mono, monospace',
                lineHeight: 1,
              }}>K7-XQ29</div>
              <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 16, lineHeight: 1.55, maxWidth: 320 }}>
                Покажи этот код организатору на входе. Действует только в день мероприятия с 13:30 до окончания.
              </div>

              <div style={{ marginTop: 20, borderTop: '1px solid var(--border)', paddingTop: 20 }}>
                <div style={{ fontSize: 11, color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
                  Участник
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: CURRENT_USER.avatarGrad,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontSize: 12, fontWeight: 700, flexShrink: 0,
                  }}>{CURRENT_USER.initials}</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg)' }}>Иван Петров</div>
                    <div style={{ fontSize: 12, color: 'var(--fg-4)', marginTop: 2 }}>ИКИТ · 3 курс · @ip_2024</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="card" style={{
          marginTop: 24, padding: 20,
          display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ fontSize: 13, color: 'var(--fg-3)', minWidth: 0 }}>
            Билет также отправлен на <span style={{ color: 'var(--fg-2)', fontWeight: 600 }}>petrov.iv@sfu-kras.ru</span>
          </div>
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            <button className="btn btn-ghost btn-sm"><Rg.download s={12}/> Скачать PDF</button>
            <button className="btn btn-ghost btn-sm"><Rg.cal s={12}/> В календарь</button>
            <button className="btn btn-ghost btn-sm"><Rg.share s={12}/> Поделиться</button>
          </div>
        </div>

        {/* Cancel block */}
        <div className="card" style={{
          marginTop: 16, padding: 18,
          background: 'var(--bg-2)', border: '1px solid var(--border)',
          display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)' }}>Передумал?</div>
            <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 2 }}>
              Освободи место для других. Регистрацию можно отменить до 18 мая, 23:59.
            </div>
          </div>
          <button className="btn btn-ghost btn-sm" style={{ color: 'var(--red)', flexShrink: 0 }}>Отменить регистрацию</button>
        </div>
      </div>

      {/* Right column — event summary */}
      <aside className="card" style={{ padding: 24, position: 'sticky', top: 88, alignSelf: 'flex-start' }}>
        <h4 className="h4" style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>О мероприятии</h4>
        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {infoRows.map((r, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, fontSize: 13 }}>
              <span style={{ color: 'var(--fg-4)', flexShrink: 0 }}>{r.l}</span>
              <span style={{
                color: r.accent ? 'var(--blue)' : 'var(--fg)',
                fontWeight: r.accent ? 700 : 500,
                textAlign: 'right',
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}>
                {r.v}
                {r.verified && <span style={{ color: 'var(--green)', display: 'inline-flex' }}><Rg.checkCircle s={12}/></span>}
              </span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 20, borderTop: '1px solid var(--border)', paddingTop: 16 }}>
          <a href="#" style={{ fontSize: 13, color: 'var(--blue)', fontWeight: 600 }}>Открыть карточку события →</a>
        </div>
      </aside>
    </div>
  );
}

// ─── Main screen ─────────────────────────────────────
function EventRegisterScreen({ state }) {
  const labels = {
    form:    'Регистрация',
    success: 'Регистрация · Подтверждение',
    ticket:  'Мой билет',
  };
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar context={{ type: 'personal' }} active="events" loggedIn={true}/>
        <main style={{ flex: 1, minWidth: 0 }}>
          <Topbar loggedIn={true}/>
          <div style={{ maxWidth: 1240, margin: '0 auto', padding: 32 }}>
            <RegBreadcrumb step={labels[state] || labels.form}/>
            {state === 'form'    && <RegistrationForm/>}
            {state === 'success' && <RegistrationSuccess/>}
            {state === 'ticket'  && <TicketView/>}
          </div>
          <Footer/>
        </main>
      </div>
    </div>
  );
}

window.EventRegisterScreen = EventRegisterScreen;
