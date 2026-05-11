// EventCreate — wizard for creating a new event (organizer flow).
// 4 steps with split layout: form left (60%) + sticky preview right (40%).
// Uses Sidebar (org), Topbar, Footer, EventCover, CapacityBar, EVENT_TYPES,
// ORGANIZATIONS, tonalShift, .card / .btn / .h2..h4 tokens.

// ─── Local icon set ─────────────────────────────────
const Cw = {
  upload:   (p) => <svg width={p?.s||32} height={p?.s||32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  crop:     (p) => <svg width={p?.s||14} height={p?.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2v14a2 2 0 0 0 2 2h14"/><path d="M18 22V8a2 2 0 0 0-2-2H2"/></svg>,
  x:        (p) => <svg width={p?.s||14} height={p?.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  arrowL:   (p) => <svg width={p?.s||14} height={p?.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  arrowR:   (p) => <svg width={p?.s||14} height={p?.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  check:    (p) => <svg width={p?.s||14} height={p?.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  edit:     (p) => <svg width={p?.s||14} height={p?.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  cal:      (p) => <svg width={p?.s||14} height={p?.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  pin:      (p) => <svg width={p?.s||14} height={p?.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  monitor:  (p) => <svg width={p?.s||14} height={p?.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  hybrid:   (p) => <svg width={p?.s||14} height={p?.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="14" height="11" rx="2"/><path d="M21 11c0 4-5 8-5 8s-5-4-5-8a5 5 0 0 1 10 0z" transform="translate(-2 0)"/></svg>,
  globe:    (p) => <svg width={p?.s||16} height={p?.s||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  lock:     (p) => <svg width={p?.s||16} height={p?.s||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  users:    (p) => <svg width={p?.s||16} height={p?.s||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  bold:     (p) => <svg width={p?.s||14} height={p?.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h8a4 4 0 0 1 0 8H6z"/><path d="M6 12h9a4 4 0 0 1 0 8H6z"/></svg>,
  italic:   (p) => <svg width={p?.s||14} height={p?.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>,
  list:     (p) => <svg width={p?.s||14} height={p?.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  link:     (p) => <svg width={p?.s||14} height={p?.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
  clock:    (p) => <svg width={p?.s||14} height={p?.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
  plus:     (p) => <svg width={p?.s||12} height={p?.s||12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  chev:     (p) => <svg width={p?.s||14} height={p?.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
};

// ─── Form state per step ────────────────────────────
function formStateFor(step) {
  // Snapshot of the wizard at the moment we render that step's artboard.
  const base = {
    type: null, title: '', shortDesc: '', longDesc: '',
    date: null, time: null, duration: null,
    format: null, building: '', room: '', address: '',
    visibility: null,
    capacity: null, regMode: null, regDeadline: null, hours: null,
    cover: { type: 'generated' },
  };
  if (step >= 1) {
    // Step 1: type chosen, title typed, descriptions still empty
    Object.assign(base, {
      type: 'educational',
      title: 'Мастер-класс «AI в науке»',
    });
  }
  if (step >= 2) {
    Object.assign(base, {
      shortDesc: 'Практическая лекция о применении ИИ в научных исследованиях. Для студентов 2–4 курсов любых направлений.',
      longDesc: '# Программа\n\n- Введение: AI как инструмент учёного\n- Демонстрация: Claude и GPT в работе с литературой\n- Практика: пишем промпт под свою задачу\n- Q&A со спикером\n\n**Спикер:** Алексей Терехов, преподаватель ИМиФИ.',
      date: { d: 18, m: 'июн', wd: 'Чт', full: '18 июня 2026' },
      time: '15:00',
      duration: '2 ч',
      format: 'offline',
      building: 'Корпус Л',
      room: '4-04',
      address: 'ул. Свободный 79, 5 этаж',
      visibility: 'all',
    });
  }
  if (step >= 3) {
    Object.assign(base, {
      capacity: 80,
      regMode: 'open',
      regDeadline: 'hour',
      hours: 4,
    });
  }
  return base;
}

// ─── Stepper ────────────────────────────────────────
const STEPS = [
  { n: 1, label: 'Основное' },
  { n: 2, label: 'Когда и где' },
  { n: 3, label: 'Регистрация' },
  { n: 4, label: 'Публикация' },
];

function Stepper({ current }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0 32px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        {STEPS.map((s, i) => {
          const done = s.n < current;
          const active = s.n === current;
          const future = s.n > current;
          return (
            <React.Fragment key={s.n}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 88 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 12,
                  background: future ? 'var(--surface)' : 'var(--grad)',
                  border: future ? '1px solid var(--border)' : 'none',
                  color: future ? 'var(--fg-4)' : 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 14,
                  boxShadow: active ? '0 6px 16px rgba(37,99,235,0.30)' : 'none',
                  transition: 'all .2s',
                }}>
                  {done ? <Cw.check s={16}/> : s.n}
                </div>
                <div style={{
                  marginTop: 8,
                  fontSize: 11,
                  fontWeight: active ? 700 : 500,
                  color: active ? 'var(--fg)' : 'var(--fg-3)',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}>{s.label}</div>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{
                  width: 60, height: 2,
                  marginTop: 17,
                  background: s.n < current ? 'var(--grad)' : 'var(--border)',
                  borderRadius: 1,
                }}/>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

// ─── Reusable form bits ─────────────────────────────
function FieldLabel({ title, hint }) {
  return (
    <>
      <h4 className="h4" style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>{title}</h4>
      {hint && <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 4 }}>{hint}</div>}
    </>
  );
}

function FieldBlock({ children, mb = 28 }) {
  return <div style={{ marginBottom: mb }}>{children}</div>;
}

function TypeRadioCard({ k, selected, label, color }) {
  return (
    <div style={{
      padding: '14px 10px',
      borderRadius: 12,
      border: selected ? `2px solid ${color}` : '1px solid var(--border)',
      background: selected ? `color-mix(in oklab, ${color} 8%, transparent)` : 'var(--surface)',
      cursor: 'pointer',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      transition: 'all .15s',
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: 8,
        background: `linear-gradient(135deg, ${color}, ${tonalShift(color)})`,
        boxShadow: selected ? `0 4px 10px ${color}40` : 'none',
      }}/>
      <div style={{ fontSize: 12, fontWeight: 600, color: selected ? 'var(--fg)' : 'var(--fg-2)', textAlign: 'center', lineHeight: 1.2 }}>{label}</div>
    </div>
  );
}

function FormatRadioCard({ icon, label, hint, selected, color = 'var(--blue)' }) {
  return (
    <div style={{
      padding: '16px 14px',
      borderRadius: 12,
      border: selected ? `2px solid ${color}` : '1px solid var(--border)',
      background: selected ? `color-mix(in oklab, ${color} 8%, transparent)` : 'var(--surface)',
      cursor: 'pointer',
      display: 'flex', flexDirection: 'column', gap: 8,
      transition: 'all .15s',
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 8,
        background: selected ? color : 'var(--bg-2)',
        color: selected ? 'white' : 'var(--fg-2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{icon}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg)' }}>{label}</div>
      <div style={{ fontSize: 11, color: 'var(--fg-3)', lineHeight: 1.3 }}>{hint}</div>
    </div>
  );
}

function VisibilityRadio({ icon, title, sub, selected }) {
  const color = 'var(--blue)';
  return (
    <div style={{
      padding: 16,
      borderRadius: 12,
      border: selected ? `2px solid ${color}` : '1px solid var(--border)',
      background: selected ? `color-mix(in oklab, ${color} 6%, transparent)` : 'var(--surface)',
      cursor: 'pointer',
      display: 'flex', alignItems: 'flex-start', gap: 14,
      transition: 'all .15s',
    }}>
      <div style={{
        width: 22, height: 22, borderRadius: '50%',
        border: selected ? `7px solid ${color}` : '2px solid var(--fg-4)',
        flexShrink: 0, marginTop: 1,
        transition: 'all .15s',
      }}/>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: selected ? `color-mix(in oklab, ${color} 14%, transparent)` : 'var(--bg-2)',
        color: selected ? color : 'var(--fg-3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>{icon}</div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg)' }}>{title}</div>
        <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 2 }}>{sub}</div>
      </div>
    </div>
  );
}

// ─── Uploaded cover mock (CSS-only placeholder) ────
function UploadedCoverImage({ height = 200, radius = 12, showChip = false }) {
  return (
    <div style={{
      height, borderRadius: radius, overflow: 'hidden',
      position: 'relative',
      background: '#0E1438',
    }}>
      {/* Soft warm spotlight from top-left */}
      <div style={{ position: 'absolute', left: '-10%', top: '-20%', width: '70%', height: '120%', background: 'radial-gradient(ellipse at 50% 30%, rgba(245,165,36,0.45), transparent 60%)' }}/>
      {/* Cool blue glow from bottom-right */}
      <div style={{ position: 'absolute', right: '-15%', bottom: '-30%', width: '80%', height: '120%', background: 'radial-gradient(ellipse at 50% 70%, rgba(79,127,255,0.55), transparent 60%)' }}/>

      {/* Big bold "poster text" */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 22px' }}>
        <div style={{ fontSize: Math.round(height * 0.18), fontWeight: 800, color: 'white', lineHeight: 0.95, letterSpacing: '-0.04em', textTransform: 'uppercase', fontFamily: 'Manrope' }}>AI<br/>в&nbsp;науке</div>
        <div style={{ fontSize: Math.round(height * 0.05), fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginTop: 8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>МАСТЕР-КЛАСС · 18 ИЮНЯ</div>
      </div>

      {/* Subtle grain */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.10, mixBlendMode: 'overlay', backgroundImage: 'radial-gradient(circle at 30% 40%, white 0.5px, transparent 0.5px), radial-gradient(circle at 70% 60%, white 0.5px, transparent 0.5px)', backgroundSize: '6px 6px, 8px 8px' }}/>

      {/* Vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)' }}/>

      {showChip && (
        <div style={{ position: 'absolute', left: 14, bottom: 14, padding: '4px 10px', borderRadius: 999, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', fontSize: 11, fontWeight: 600, color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>Образование</div>
      )}
    </div>
  );
}

// ─── Cover choice (Step 1) ──────────────────────────
function CoverChoice({ data }) {
  const uploaded = data.cover?.type === 'uploaded';
  const evt = data.type ? { id: 'cover-pick', type: data.type, title: data.title || 'Без названия' } : null;

  return (
    <FieldBlock>
      <FieldLabel title="Обложка мероприятия" hint="Если не загрузишь — обложка сгенерируется автоматически из цвета типа события"/>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 14 }}>
        {/* LEFT — own poster */}
        <div className="card" style={{
          padding: 0, height: 200, overflow: 'hidden', cursor: 'pointer',
          border: uploaded ? '2px solid var(--blue)' : '1px solid var(--border)',
          position: 'relative',
          background: uploaded ? 'transparent' : 'var(--surface)',
          transition: 'all .15s',
        }}>
          {uploaded ? (
            <>
              <UploadedCoverImage height={200} radius={0}/>
              {/* action buttons */}
              <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 6 }}>
                <button style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} title="Изменить обрезку"><Cw.crop s={14}/></button>
                <button style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} title="Удалить"><Cw.x s={14}/></button>
              </div>
              {/* selected chip */}
              <div style={{ position: 'absolute', left: 12, top: 12, padding: '4px 10px', borderRadius: 999, background: 'var(--blue)', color: 'white', fontSize: 11, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6 }}>● Выбрано</div>
            </>
          ) : (
            <div style={{
              height: '100%', width: '100%',
              border: '2px dashed var(--border)',
              borderRadius: 12,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: 16, textAlign: 'center',
            }}>
              <div style={{ color: 'var(--fg-4)' }}><Cw.upload s={32}/></div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg-2)', marginTop: 10 }}>Перетащи или нажми чтобы загрузить</div>
              <div style={{ fontSize: 11, color: 'var(--fg-4)', marginTop: 4 }}>JPG, PNG · до 5 МБ · рекомендуем 1200×630</div>
            </div>
          )}
        </div>

        {/* RIGHT — generated */}
        <div className="card" style={{
          padding: 0, height: 200, overflow: 'hidden', cursor: 'pointer',
          border: !uploaded ? '2px solid var(--blue)' : '1px solid var(--border)',
          position: 'relative',
          transition: 'all .15s',
        }}>
          {evt ? (
            <EventCover event={evt} height={200}/>
          ) : (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg-4)', fontSize: 13 }}>Выберите тип</div>
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.20)' }}/>
          {!uploaded && (
            <div style={{ position: 'absolute', right: 12, bottom: 12, padding: '4px 10px', borderRadius: 999, background: 'var(--blue)', color: 'white', fontSize: 11, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6 }}>● Выбрано</div>
          )}
          <div style={{ position: 'absolute', left: 12, top: 12, padding: '4px 10px', borderRadius: 999, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', fontSize: 11, fontWeight: 600, color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>Сгенерировать автоматически</div>
        </div>
      </div>
      <div style={{ fontSize: 12, color: 'var(--fg-3)', textAlign: 'center', marginTop: 10 }}>
        После загрузки картинка будет автоматически обрезана до 16:9. Можно изменить позицию обрезки.
      </div>
    </FieldBlock>
  );
}

// ─── Step 1 — Basic info ────────────────────────────
function Step1({ data }) {
  const typeKeys = Object.keys(EVENT_TYPES);
  return (
    <div className="card" style={{ padding: 28 }}>
      <FieldBlock>
        <FieldLabel title="Тип мероприятия" hint="Влияет на цвет обложки и фильтры в афише"/>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginTop: 14 }}>
          {typeKeys.map(k => (
            <TypeRadioCard key={k} k={k} selected={data.type === k} label={EVENT_TYPES[k].label} color={EVENT_TYPES[k].color}/>
          ))}
        </div>
      </FieldBlock>

      <CoverChoice data={data}/>

      <FieldBlock>
        <FieldLabel title="Название мероприятия"/>
        <input
          className="input"
          placeholder="Например: Хакатон по машинному обучению"
          defaultValue={data.title || ''}
          style={{ height: 48, fontSize: 16, marginTop: 12, width: '100%' }}
        />
        <div style={{ fontSize: 11, color: 'var(--fg-4)', textAlign: 'right', marginTop: 6 }}>
          {(data.title || '').length} / 100
        </div>
      </FieldBlock>

      <FieldBlock>
        <FieldLabel title="Краткое описание" hint="Одна-две строки, появится в карточке в афише"/>
        <textarea
          className="input"
          placeholder="Что это, для кого, что получит участник…"
          defaultValue={data.shortDesc || ''}
          style={{ height: 80, padding: 14, fontSize: 14, marginTop: 12, width: '100%', resize: 'none', fontFamily: 'inherit' }}
        />
      </FieldBlock>

      <FieldBlock mb={0}>
        <FieldLabel title="Подробное описание"/>
        <div style={{
          marginTop: 12,
          border: '1px solid var(--border)',
          borderRadius: 10,
          background: 'var(--surface)',
          overflow: 'hidden',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '8px 12px',
            borderBottom: '1px solid var(--border)',
            background: 'var(--bg-2)',
          }}>
            {[Cw.bold, Cw.italic, Cw.list, Cw.link].map((I, i) => (
              <button key={i} style={{
                width: 28, height: 28, borderRadius: 6,
                background: 'transparent', border: 'none', color: 'var(--fg-3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}><I s={13}/></button>
            ))}
            <div style={{ width: 1, height: 16, background: 'var(--border)', margin: '0 6px' }}/>
            <span style={{ fontSize: 11, color: 'var(--fg-4)' }}>Поддерживается простой markdown</span>
          </div>
          <textarea
            placeholder="Расскажи о программе, спикерах, что будет интересного. Поддерживается простой markdown (заголовки, списки, ссылки)."
            defaultValue={data.longDesc || ''}
            style={{
              height: 200, padding: 14, fontSize: 14, width: '100%',
              resize: 'none', fontFamily: 'inherit',
              border: 'none', outline: 'none', background: 'transparent', color: 'var(--fg)',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </FieldBlock>
    </div>
  );
}

// ─── Step 2 — When & Where ──────────────────────────
function MiniMapStub() {
  return (
    <div style={{
      height: 160, borderRadius: 12, marginTop: 14,
      background: 'var(--bg-2)',
      border: '1px solid var(--border)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <svg width="100%" height="100%" viewBox="0 0 400 160" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <pattern id="mapgrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--border)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mapgrid)"/>
        {/* fake streets */}
        <line x1="0" y1="50" x2="400" y2="80" stroke="var(--border)" strokeWidth="6" opacity="0.5"/>
        <line x1="180" y1="0" x2="220" y2="160" stroke="var(--border)" strokeWidth="4" opacity="0.5"/>
      </svg>
      {/* pin */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -100%)', color: 'var(--blue)' }}>
        <Cw.pin s={32}/>
      </div>
      <div style={{
        position: 'absolute', bottom: 10, right: 12,
        padding: '4px 10px', borderRadius: 6,
        background: 'var(--surface)', border: '1px solid var(--border)',
        fontSize: 11, color: 'var(--fg-3)', fontWeight: 600,
      }}>Кампус СФУ</div>
    </div>
  );
}

function Step2({ data }) {
  return (
    <div className="card" style={{ padding: 28 }}>
      {/* When */}
      <FieldBlock>
        <FieldLabel title="Когда"/>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 12, marginTop: 12 }}>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--fg-4)', pointerEvents: 'none' }}>
              <Cw.cal s={16}/>
            </div>
            <input className="input" defaultValue={data.date?.full || ''} placeholder="Дата" style={{ height: 44, paddingLeft: 40, width: '100%', fontSize: 14 }}/>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--fg-4)', pointerEvents: 'none' }}>
              <Cw.clock s={16}/>
            </div>
            <input className="input" defaultValue={data.time || ''} placeholder="Время" style={{ height: 44, paddingLeft: 40, width: '100%', fontSize: 14 }}/>
          </div>
          <input className="input" defaultValue={data.duration || ''} placeholder="Длительность" style={{ height: 44, width: '100%', fontSize: 14 }}/>
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 10 }}>
          <a href="#" style={{ fontSize: 13, color: 'var(--blue)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}><Cw.plus s={12}/> Сделать многодневным</a>
          <a href="#" style={{ fontSize: 13, color: 'var(--blue)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}><Cw.plus s={12}/> Серия повторяющихся событий</a>
        </div>
      </FieldBlock>

      {/* Format */}
      <FieldBlock>
        <FieldLabel title="Формат"/>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 12 }}>
          <FormatRadioCard icon={<Cw.pin s={16}/>}     label="Очно"   hint="Участники приходят в указанное место"   selected={data.format === 'offline'}/>
          <FormatRadioCard icon={<Cw.monitor s={16}/>} label="Онлайн" hint="Трансляция или встреча в видеоконференции"/>
          <FormatRadioCard icon={<Cw.hybrid s={16}/>}  label="Гибрид" hint="Очное место + трансляция параллельно"/>
        </div>
      </FieldBlock>

      {/* Location */}
      <FieldBlock>
        <FieldLabel title="Где"/>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
          <input className="input" defaultValue={data.building || ''} placeholder="Здание / корпус" style={{ height: 44, fontSize: 14, width: '100%' }}/>
          <input className="input" defaultValue={data.room || ''}     placeholder="Аудитория / помещение" style={{ height: 44, fontSize: 14, width: '100%' }}/>
        </div>
        <input className="input" defaultValue={data.address || ''} placeholder="Адрес" style={{ height: 44, fontSize: 14, width: '100%', marginTop: 12 }}/>
        <div style={{ marginTop: 10 }}>
          <a href="#" style={{ fontSize: 13, color: 'var(--blue)', fontWeight: 600 }}>Выбрать на карте →</a>
        </div>
        <MiniMapStub/>
      </FieldBlock>

      {/* Visibility */}
      <FieldBlock mb={0}>
        <FieldLabel title="Кому показывать"/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
          <VisibilityRadio
            icon={<Cw.globe s={18}/>}
            title="Всем студентам СФУ"
            sub="Появится в общей афише, фильтрах и поиске."
            selected={data.visibility === 'all'}
          />
          <VisibilityRadio
            icon={<Cw.lock s={18}/>}
            title="Только моему институту (ИКИТ)"
            sub="Студенты других институтов не увидят событие."
            selected={false}
          />
          <VisibilityRadio
            icon={<Cw.users s={18}/>}
            title="Только участникам организации"
            sub="Закрытое внутреннее событие. Видно только команде."
            selected={false}
          />
        </div>
      </FieldBlock>
    </div>
  );
}

// ─── Step 3 — Registration ──────────────────────────
function CapacitySlider({ value = 80 }) {
  const stops = [0, 25, 50, 100, 250, 500];
  // value 80 sits between 50 and 100 → position ~ between stop[2] and stop[3]
  // We model the bar as 5 equal segments between 6 stops.
  let pct;
  if (value >= 500) pct = 100;
  else {
    for (let i = 0; i < stops.length - 1; i++) {
      if (value >= stops[i] && value <= stops[i + 1]) {
        const frac = (value - stops[i]) / (stops[i + 1] - stops[i]);
        pct = (i + frac) / (stops.length - 1) * 100;
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
        {/* thumb */}
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

function RegModeCard({ title, hint, selected }) {
  const color = 'var(--blue)';
  return (
    <div style={{
      padding: 18,
      borderRadius: 12,
      border: selected ? `2px solid ${color}` : '1px solid var(--border)',
      background: selected ? `color-mix(in oklab, ${color} 6%, transparent)` : 'var(--surface)',
      cursor: 'pointer',
      transition: 'all .15s',
      display: 'flex', flexDirection: 'column', gap: 6,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 18, height: 18, borderRadius: '50%',
          border: selected ? `6px solid ${color}` : '2px solid var(--fg-4)',
          flexShrink: 0,
        }}/>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg)' }}>{title}</div>
      </div>
      <div style={{ fontSize: 12, color: 'var(--fg-3)', lineHeight: 1.4, paddingLeft: 28 }}>{hint}</div>
    </div>
  );
}

function DeadlineChip({ label, selected }) {
  const color = 'var(--blue)';
  return (
    <div style={{
      flex: 1,
      padding: '12px 14px',
      borderRadius: 10,
      border: selected ? `2px solid ${color}` : '1px solid var(--border)',
      background: selected ? `color-mix(in oklab, ${color} 8%, transparent)` : 'var(--surface)',
      cursor: 'pointer',
      textAlign: 'center',
      fontSize: 13,
      fontWeight: selected ? 700 : 500,
      color: selected ? 'var(--fg)' : 'var(--fg-2)',
      transition: 'all .15s',
    }}>{label}</div>
  );
}

function Checkbox({ label, checked }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', cursor: 'pointer' }}>
      <div style={{
        width: 20, height: 20, borderRadius: 6,
        background: checked ? 'var(--blue)' : 'var(--surface)',
        border: checked ? 'none' : '1.5px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', flexShrink: 0,
      }}>{checked && <Cw.check s={12}/>}</div>
      <span style={{ fontSize: 14, color: 'var(--fg)' }}>{label}</span>
    </label>
  );
}

function Step3({ data }) {
  return (
    <div className="card" style={{ padding: 28 }}>
      {/* Capacity */}
      <FieldBlock>
        <FieldLabel title="Сколько мест"/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 12 }}>
          <input className="input" defaultValue={data.capacity || ''} style={{ width: 120, height: 44, fontSize: 16, textAlign: 'center', fontWeight: 700 }}/>
          <span style={{ fontSize: 13, color: 'var(--fg-3)' }}>мест</span>
          <a href="#" style={{ fontSize: 13, color: 'var(--blue)', fontWeight: 600, marginLeft: 'auto' }}>Без ограничений</a>
        </div>
        <CapacitySlider value={data.capacity || 80}/>
      </FieldBlock>

      {/* Registration mode */}
      <FieldBlock>
        <FieldLabel title="Регистрация"/>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
          <RegModeCard
            title="Свободная регистрация"
            hint="Студент жмёт «Участвовать» и сразу получает место. Лучше для большинства событий."
            selected={data.regMode === 'open'}
          />
          <RegModeCard
            title="С анкетой / по заявке"
            hint="Студент заполняет анкету, ты одобряешь вручную. Для отбора или ограниченного состава."
            selected={false}
          />
        </div>
      </FieldBlock>

      {/* Form questions (collapsed because regMode = open) */}
      <FieldBlock>
        <div style={{
          padding: 14, borderRadius: 10,
          background: 'var(--bg-2)',
          border: '1px dashed var(--border)',
          fontSize: 12, color: 'var(--fg-4)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <Cw.lock s={14}/>
          Вопросы анкеты доступны при выборе варианта «С анкетой / по заявке».
        </div>
      </FieldBlock>

      {/* Deadline */}
      <FieldBlock>
        <FieldLabel title="Когда закроем регистрацию"/>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <DeadlineChip label="За день до события"  selected={data.regDeadline === 'day'}/>
          <DeadlineChip label="За час до события"   selected={data.regDeadline === 'hour'}/>
          <DeadlineChip label="Конкретная дата"     selected={false}/>
        </div>
        <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 10 }}>
          Регистрация закроется <b style={{ color: 'var(--fg-2)' }}>18 июня в 14:00</b>.
        </div>
      </FieldBlock>

      {/* Hours */}
      <FieldBlock>
        <FieldLabel title="Часы активности" hint="Сколько часов в портфолио получит студент за участие"/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
          <input className="input" defaultValue={data.hours || ''} style={{ width: 80, height: 44, fontSize: 16, textAlign: 'center', fontWeight: 700 }}/>
          <span style={{ fontSize: 13, color: 'var(--fg-3)' }}>ч активности</span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--fg-4)', marginTop: 8 }}>
          По умолчанию — длительность события. Можешь поставить больше за подготовку или работу после.
        </div>
      </FieldBlock>

      {/* Additional (expanded for demo) */}
      <FieldBlock mb={0}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <Cw.chev s={14}/>
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--fg)' }}>Дополнительные настройки</span>
        </div>
        <div style={{ marginTop: 8, paddingLeft: 22, borderLeft: '2px solid var(--border)' }}>
          <div style={{ paddingLeft: 14 }}>
            <Checkbox label="Разрешить отмену регистрации"            checked={true}/>
            <Checkbox label="Уведомить меня о каждой новой регистрации" checked={true}/>
            <Checkbox label="Отправить QR-билет после регистрации"      checked={true}/>
          </div>
        </div>
      </FieldBlock>
    </div>
  );
}

// ─── Step 4 — Review & publish ──────────────────────
function SummaryRow({ label, children }) {
  return (
    <div className="card card-hover" style={{ padding: 16, marginBottom: 10, display: 'flex', alignItems: 'flex-start', gap: 16, cursor: 'pointer' }}>
      <div style={{
        width: 140, flexShrink: 0,
        fontSize: 11, fontWeight: 700, color: 'var(--fg-4)',
        textTransform: 'uppercase', letterSpacing: '0.08em',
        paddingTop: 2,
      }}>{label}</div>
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
      <button title="Изменить" style={{
        width: 32, height: 32, borderRadius: 8,
        background: 'transparent', border: 'none', color: 'var(--fg-4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', flexShrink: 0,
      }}><Cw.edit s={14}/></button>
    </div>
  );
}

function Step4({ data }) {
  const t = EVENT_TYPES[data.type];
  return (
    <div className="card" style={{ padding: 28 }}>
      <div style={{ marginBottom: 20 }}>
        <h3 className="h3" style={{ margin: 0 }}>Всё готово?</h3>
        <div style={{ fontSize: 13, color: 'var(--fg-3)', marginTop: 4 }}>Проверь сводку. После публикации событие сразу появится в афише.</div>
      </div>

      {/* Summary */}
      <div style={{ marginBottom: 28 }}>
        <SummaryRow label="Тип и название">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--fg)' }}>{data.title}</div>
            <span style={{ background: t.bg, border: `1px solid ${t.color}40`, color: t.color, padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600 }}>● {t.label}</span>
          </div>
        </SummaryRow>

        <SummaryRow label="Обложка">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 96, height: 56, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
              {data.cover?.type === 'uploaded'
                ? <UploadedCoverImage height={56} radius={8}/>
                : <EventCover event={{ id: 'sum', type: data.type, title: data.title }} height={56}/>}
            </div>
            <div style={{ fontSize: 13, color: 'var(--fg-2)' }}>
              {data.cover?.type === 'uploaded' ? 'Загружена пользователем' : 'Сгенерирована автоматически'}
            </div>
          </div>
        </SummaryRow>

        <SummaryRow label="Описание">
          <div style={{ fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.5 }}>
            {data.shortDesc}
          </div>
          <div style={{ fontSize: 12, color: 'var(--fg-4)', marginTop: 6 }}>
            + подробная программа на 4 пункта…
          </div>
        </SummaryRow>

        <SummaryRow label="Когда и где">
          <div style={{ fontSize: 14, color: 'var(--fg)', fontWeight: 600 }}>
            {data.date?.full} · {data.time}–17:00
          </div>
          <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 4 }}>
            Очно · {data.address}, ауд. {data.room}
          </div>
        </SummaryRow>

        <SummaryRow label="Регистрация">
          <div style={{ fontSize: 14, color: 'var(--fg)' }}>
            Свободная · до 18 июня 14:00 · {data.capacity} мест · {data.hours} ч активности
          </div>
        </SummaryRow>

        <SummaryRow label="Видимость">
          <div style={{ fontSize: 14, color: 'var(--fg)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <Cw.globe s={14}/> Всем студентам СФУ
          </div>
        </SummaryRow>
      </div>

      {/* What happens next */}
      <div style={{ marginBottom: 24 }}>
        <h4 className="h4" style={{ margin: '0 0 12px' }}>Что произойдёт после публикации</h4>
        {[
          'Событие появится в общей афише СФУ',
          'Участники команды получат уведомление',
          'Откроется регистрация для студентов',
          'Заявки будут приходить в раздел «Заявки» в реальном времени',
        ].map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0' }}>
            <div style={{
              width: 22, height: 22, borderRadius: '50%',
              background: 'color-mix(in oklab, var(--green) 16%, transparent)',
              color: 'var(--green)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}><Cw.check s={12}/></div>
            <div style={{ fontSize: 14, color: 'var(--fg-2)' }}>{t}</div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <button className="btn btn-primary" style={{ width: '100%', height: 52, fontSize: 16, fontWeight: 700 }}>
        Опубликовать
      </button>
      <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
        <button className="btn btn-ghost" style={{ flex: 1, height: 44 }}>Запланировать публикацию</button>
        <button className="btn btn-ghost" style={{ flex: 1, height: 44 }}>Сохранить как черновик</button>
      </div>
    </div>
  );
}

// ─── Preview card (right column) ────────────────────
function PreviewCard({ data }) {
  const t = data.type ? EVENT_TYPES[data.type] : null;
  // Build a synthetic event-like object for EventCover
  const evt = data.type ? {
    id: 'preview',
    type: data.type,
    title: data.title || 'Без названия',
  } : null;

  return (
    <div style={{ position: 'sticky', top: 88 }}>
      <div style={{
        fontSize: 11, fontWeight: 700, color: 'var(--fg-4)',
        textTransform: 'uppercase', letterSpacing: '0.08em',
        marginBottom: 10,
      }}>Предпросмотр карточки</div>

      <div className="card" style={{ padding: 16 }}>
        {/* Cover or placeholder */}
        {data.cover?.type === 'uploaded' ? (
          <UploadedCoverImage height={160} showChip={true}/>
        ) : evt ? (
          <EventCover event={evt} height={160}/>
        ) : (
          <div style={{
            height: 160, borderRadius: 12,
            background: 'var(--bg-2)',
            border: '1px dashed var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--fg-4)', fontSize: 13, fontWeight: 500,
          }}>Выберите тип события</div>
        )}

        {/* Type chip + title */}
        <div style={{ marginTop: 14 }}>
          {t && (
            <span style={{ background: t.bg, border: `1px solid ${t.color}40`, color: t.color, padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600, display: 'inline-block' }}>● {t.label}</span>
          )}
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--fg)', marginTop: 8, lineHeight: 1.3 }}>
            {data.title || <span style={{ color: 'var(--fg-4)', fontWeight: 500 }}>Название появится здесь</span>}
          </div>

          {/* Date / location row */}
          <div style={{ display: 'flex', gap: 14, marginTop: 8, fontSize: 12, color: 'var(--fg-3)', flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Cw.cal s={12}/>
              {data.date ? `${data.date.d} ${data.date.m} · ${data.time}` : '—'}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Cw.pin s={12}/>
              {data.room ? `${data.room}, ${data.building}` : '—'}
            </span>
          </div>

          {/* Capacity */}
          {data.capacity && t && (
            <div style={{ marginTop: 14 }}>
              <CapacityBar registered={0} capacity={data.capacity} color={t.color}/>
            </div>
          )}
        </div>
      </div>

      <div style={{ fontSize: 11, color: 'var(--fg-4)', textAlign: 'center', padding: '12px 4px' }}>
        Так увидят это студенты в афише
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingLeft: 4 }}>
        <a href="#" style={{ fontSize: 12, color: 'var(--blue)', fontWeight: 600 }}>Превью полной карточки →</a>
        <a href="#" style={{ fontSize: 12, color: 'var(--blue)', fontWeight: 600 }}>Превью на мобильном →</a>
      </div>
    </div>
  );
}

// ─── Bottom nav ─────────────────────────────────────
function BottomNav({ step }) {
  return (
    <div style={{
      marginTop: 24, padding: '24px 0',
      borderTop: '1px solid var(--border)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <div>
        {step > 1 && (
          <button className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 44, padding: '0 18px' }}>
            <Cw.arrowL s={14}/> Назад
          </button>
        )}
      </div>
      <div>
        {step < 4 ? (
          <button className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 44, padding: '0 22px', fontWeight: 700 }}>
            Далее <Cw.arrowR s={14}/>
          </button>
        ) : (
          <button className="btn btn-ghost" style={{ height: 44, padding: '0 18px' }}>Сохранить и закрыть</button>
        )}
      </div>
    </div>
  );
}

// ─── Header (above stepper) ─────────────────────────
function WizardHeader({ org }) {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="#" style={{ fontSize: 13, color: 'var(--fg-3)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <Cw.arrowL s={12}/> Вернуться на дашборд
        </a>
        <div style={{ display: 'flex', gap: 18 }}>
          <a href="#" style={{ fontSize: 13, color: 'var(--fg-2)', fontWeight: 500 }}>Сохранить как черновик</a>
          <a href="#" style={{ fontSize: 13, color: 'var(--red)', fontWeight: 500 }}>Отменить создание</a>
        </div>
      </div>
      <div style={{ marginTop: 18 }}>
        <h2 className="h2" style={{ margin: 0, fontSize: 32, lineHeight: 1.1, letterSpacing: '-0.02em' }}>Новое мероприятие</h2>
        <div style={{ fontSize: 13, color: 'var(--fg-3)', marginTop: 4 }}>
          От имени организации «{org.name}»
        </div>
      </div>
    </>
  );
}

// ─── Main screen ────────────────────────────────────
function EventCreateScreen({ step = 1, orgId = 'studsovet-ikit', hasCover = false }) {
  const org = ORGANIZATIONS.find(o => o.id === orgId) || ORGANIZATIONS[0];
  const data = formStateFor(step);
  if (hasCover) data.cover = { type: 'uploaded', url: 'PLACEHOLDER' };

  let Form;
  if (step === 1) Form = Step1;
  else if (step === 2) Form = Step2;
  else if (step === 3) Form = Step3;
  else Form = Step4;

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar context={{ type: 'org', orgId: org.id }} active="events" loggedIn={true}/>
        <main style={{ flex: 1, minWidth: 0 }}>
          <Topbar loggedIn={true}/>
          <div style={{ maxWidth: 1240, margin: '0 auto', padding: 32 }}>
            <WizardHeader org={org}/>
            <Stepper current={step}/>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32, alignItems: 'flex-start' }}>
              <div>
                <Form data={data}/>
                <BottomNav step={step}/>
              </div>
              <PreviewCard data={data}/>
            </div>
          </div>
          <Footer/>
        </main>
      </div>
    </div>
  );
}

window.EventCreateScreen = EventCreateScreen;
