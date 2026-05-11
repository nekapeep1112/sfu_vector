// Org Dashboard — operational view for organization context.
// Uses Sidebar (org mode), Topbar, Footer, EVENT_TYPES, ORGANIZATIONS, CURRENT_USER, tonalShift,
// CapacityBar, .card / .btn / .h2..h4 base classes.

// ─── Local icon set (strokeWidth 2, currentColor) ────
const Db = {
  plus:     (p) => <svg width={p?.s||14} height={p?.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  inbox:    (p) => <svg width={p?.s||16} height={p?.s||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>,
  clock:    (p) => <svg width={p?.s||16} height={p?.s||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
  bell:     (p) => <svg width={p?.s||16} height={p?.s||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  arrow:    (p) => <svg width={p?.s||12} height={p?.s||12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  check:    (p) => <svg width={p?.s||14} height={p?.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  trendUp:  (p) => <svg width={p?.s||12} height={p?.s||12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  trendDown:(p) => <svg width={p?.s||12} height={p?.s||12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>,
  cal:      (p) => <svg width={p?.s||14} height={p?.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  users:    (p) => <svg width={p?.s||14} height={p?.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  userAdd:  (p) => <svg width={p?.s||14} height={p?.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>,
  gauge:    (p) => <svg width={p?.s||14} height={p?.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 14l4-4M3 12a9 9 0 0 1 18 0"/><circle cx="12" cy="14" r="1.5" fill="currentColor"/></svg>,
  more:     (p) => <svg width={p?.s||16} height={p?.s||16} viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>,
  settings: (p) => <svg width={p?.s||14} height={p?.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82 2 2 0 1 1-2.83 2.83 1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33 2 2 0 1 1-2.83-2.83 1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82 2 2 0 1 1 2.83-2.83 1.65 1.65 0 0 0 1.82.33 1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33 2 2 0 1 1 2.83 2.83 1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
};

// ─── Header ──────────────────────────────────────────
function OrgHeader({ org }) {
  const grad = `linear-gradient(135deg, ${org.color}, ${tonalShift(org.color)})`;
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, gap: 24, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, minWidth: 0, flex: 1 }}>
        <div style={{ width: 64, height: 64, borderRadius: 16, background: grad, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 20, fontWeight: 800, flexShrink: 0, boxShadow: '0 4px 12px rgba(15,23,42,0.12)' }}>{org.short}</div>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <h2 className="h2" style={{ margin: 0, fontSize: 32, lineHeight: 1.1, letterSpacing: '-0.02em' }}>{org.name}</h2>
            {org.verified && (
              <span style={{ padding: '4px 10px', borderRadius: 8, background: 'rgba(5,150,105,0.1)', color: 'var(--green)', fontSize: 11, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <Db.check s={11}/> Верифицирована
              </span>
            )}
          </div>
          <div style={{ marginTop: 6, display: 'flex', gap: 12, fontSize: 12, color: 'var(--fg-3)', flexWrap: 'wrap' }}>
            <span>Студенческий совет ИКИТ</span>
            <span style={{ color: 'var(--fg-4)' }}>·</span>
            <span>{org.members} участников</span>
            <span style={{ color: 'var(--fg-4)' }}>·</span>
            <span>Создана сентябрь 2024</span>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
        <button className="btn btn-primary" style={{ height: 48, padding: '0 22px', fontSize: 15, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <Db.plus s={16}/> Создать мероприятие
        </button>
        <div style={{ fontSize: 11, color: 'var(--fg-4)', textAlign: 'right' }}>Опубликуется сразу — модерация не требуется</div>
      </div>
    </div>
  );
}

// ─── Action item card ────────────────────────────────
function AlertCard({ color, icon, count, title, sub, action }) {
  return (
    <div className="card card-hover" style={{
      padding: 20, cursor: 'pointer',
      boxShadow: `inset 3px 0 0 ${color}`,
      display: 'flex', flexDirection: 'column', gap: 12,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 32, height: 32, borderRadius: 10, background: `color-mix(in oklab, ${color} 14%, transparent)`, color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
        <div style={{ fontSize: 32, fontWeight: 800, color, letterSpacing: '-0.03em', lineHeight: 1 }}>{count}</div>
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg)' }}>{title}</div>
        <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 4 }}>{sub}</div>
      </div>
      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
        <span style={{ fontSize: 13, color: 'var(--blue)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>{action} <Db.arrow s={12}/></span>
      </div>
    </div>
  );
}

// ─── Metric tile ─────────────────────────────────────
function MetricTile({ color, icon, value, delta, deltaDir, label }) {
  return (
    <div className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ width: 32, height: 32, borderRadius: 10, background: `color-mix(in oklab, ${color} 14%, transparent)`, color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, flexWrap: 'wrap' }}>
        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--fg)', lineHeight: 1 }}>{value}</div>
        {delta && (
          <div style={{ fontSize: 11, color: deltaDir === 'up' ? 'var(--green)' : deltaDir === 'down' ? 'var(--red)' : 'var(--fg-4)', display: 'inline-flex', alignItems: 'center', gap: 4, fontWeight: 600, paddingBottom: 3 }}>
            {deltaDir === 'up' && <Db.trendUp s={11}/>}
            {deltaDir === 'down' && <Db.trendDown s={11}/>}
            {delta}
          </div>
        )}
      </div>
      <div style={{ fontSize: 12, color: 'var(--fg-3)' }}>{label}</div>
    </div>
  );
}

// ─── Status chip ─────────────────────────────────────
const STATUS = {
  published: { label: 'Опубликовано', color: 'var(--green)' },
  draft:     { label: 'Черновик',     color: 'var(--fg-4)' },
  pending:   { label: 'На модерации', color: 'var(--amber)' },
  done:      { label: 'Завершено',    color: 'var(--fg-3)' },
};
function StatusChip({ s }) {
  const v = STATUS[s] || STATUS.draft;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '4px 8px', borderRadius: 6,
      background: 'var(--bg-2)', border: '1px solid var(--border)',
      fontSize: 11, fontWeight: 600, color: 'var(--fg-2)',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: v.color }}/>
      {v.label}
    </span>
  );
}

// ─── Events table ────────────────────────────────────
const ORG_EVENTS = [
  { id: 1, date: { d: 20, m: 'мая' }, title: 'Хакатон Siberian Hack 2026', loc: 'Библиотека, ауд. 5-08', time: '14:00', type: 'educational', reg: 47, cap: 200, status: 'published' },
  { id: 2, date: { d: 22, m: 'мая' }, title: 'Встреча со студсоветом',       loc: 'Конференц-зал, 3 этаж', time: '17:00', type: 'community',   reg: 12, cap: 30,  status: 'published' },
  { id: 3, date: { d: 28, m: 'мая' }, title: 'День открытых дверей ИКИТ',    loc: 'Главный холл',          time: '11:00', type: 'career',      reg: 89, cap: 150, status: 'published' },
  { id: 4, date: { d: 1,  m: 'июн' }, title: 'Лекция «ИИ в IT-карьере»',     loc: 'Ауд. 4-04',             time: '15:00', type: 'educational', reg: 0,  cap: 80,  status: 'draft' },
  { id: 5, date: { d: 8,  m: 'июн' }, title: 'Турнир по киберспорту',        loc: 'СК «Радуга»',           time: '12:00', type: 'sport',       reg: 23, cap: 64,  status: 'pending' },
];

function EventsTable() {
  const cols = '90px 1fr 130px 180px 120px 40px';
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: cols, gap: 16,
        padding: '14px 20px', borderBottom: '1px solid var(--border)',
        background: 'var(--bg-2)',
        fontSize: 11, fontWeight: 700, color: 'var(--fg-4)',
        textTransform: 'uppercase', letterSpacing: '0.08em',
      }}>
        <div>Дата</div>
        <div>Мероприятие</div>
        <div>Тип</div>
        <div>Заполняемость</div>
        <div>Статус</div>
        <div></div>
      </div>
      {ORG_EVENTS.map((e, i) => {
        const t = EVENT_TYPES[e.type] || EVENT_TYPES.community;
        const pct = Math.min(100, (e.reg / e.cap) * 100);
        return (
          <div key={e.id} style={{
            display: 'grid', gridTemplateColumns: cols, gap: 16,
            padding: '14px 20px', alignItems: 'center',
            borderBottom: i === ORG_EVENTS.length - 1 ? 'none' : '1px solid var(--border)',
            transition: 'background .12s',
            cursor: 'pointer',
          }}
            onMouseEnter={ev => ev.currentTarget.style.background = 'var(--bg-2)'}
            onMouseLeave={ev => ev.currentTarget.style.background = 'transparent'}
          >
            {/* Date badge */}
            <div style={{ width: 50, height: 40, borderRadius: 10, background: 'var(--bg-2)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: 16, fontWeight: 800, lineHeight: 1, color: 'var(--fg)' }}>{e.date.d}</div>
              <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 2 }}>{e.date.m}</div>
            </div>
            {/* Title */}
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.title}</div>
              <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.loc} · {e.time}</div>
            </div>
            {/* Type chip */}
            <div>
              <span style={{ background: t.bg, border: `1px solid ${t.color}40`, color: t.color, padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600, display: 'inline-block' }}>● {t.label}</span>
            </div>
            {/* Capacity */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1, height: 4, background: 'var(--border)', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: t.color, borderRadius: 999 }}/>
              </div>
              <div className="mono" style={{ fontSize: 12, color: 'var(--fg-2)', fontWeight: 600, minWidth: 56, textAlign: 'right' }}>{e.reg}/{e.cap}</div>
            </div>
            {/* Status */}
            <div><StatusChip s={e.status}/></div>
            {/* More */}
            <div>
              <button style={{ width: 28, height: 28, borderRadius: 6, background: 'transparent', border: 'none', color: 'var(--fg-4)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onMouseEnter={ev => { ev.currentTarget.style.background = 'var(--surface)'; ev.currentTarget.style.color = 'var(--fg)'; }}
                onMouseLeave={ev => { ev.currentTarget.style.background = 'transparent'; ev.currentTarget.style.color = 'var(--fg-4)'; }}
              ><Db.more s={16}/></button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Team list ───────────────────────────────────────
const TEAM = [
  { ini: 'ИП', name: 'Иван Петров',     sub: 'ИКИТ · 3 курс', grad: 'linear-gradient(135deg, #F5A524, #F25E5E)', role: 'owner' },
  { ini: 'АК', name: 'Анна Кузнецова',  sub: 'ИКИТ · 4 курс', grad: 'linear-gradient(135deg, #2563EB, #1E40AF)', role: 'owner' },
  { ini: 'МС', name: 'Михаил Соколов',  sub: 'ИКИТ · 2 курс', grad: 'linear-gradient(135deg, #7C3AED, #5B21B6)', role: 'editor' },
  { ini: 'ДВ', name: 'Дарья Волкова',   sub: 'ИКИТ · 3 курс', grad: 'linear-gradient(135deg, #059669, #047857)', role: 'editor' },
  { ini: 'ЕП', name: 'Егор Павлов',     sub: 'ИКИТ · 1 курс', grad: 'linear-gradient(135deg, #DC2626, #991B1B)', role: 'editor' },
];

const ROLE_PILL = {
  owner:  { label: 'Владелец', color: 'var(--violet)', bg: 'rgba(155,92,255,0.15)' },
  editor: { label: 'Редактор', color: 'var(--blue)',   bg: 'rgba(79,127,255,0.15)' },
  viewer: { label: 'Наблюдатель', color: 'var(--fg-4)', bg: 'var(--bg-2)' },
};

function TeamCard() {
  return (
    <div className="card" style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <h4 className="h4" style={{ margin: 0 }}>Команда</h4>
        <button className="btn btn-ghost btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Db.userAdd s={13}/> Пригласить</button>
      </div>
      <div style={{ fontSize: 12, color: 'var(--fg-3)', marginBottom: 14 }}>12 человек · 2 владельца, 4 редактора, 6 наблюдателей</div>
      <div>
        {TEAM.map((p, i) => {
          const pill = ROLE_PILL[p.role];
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 0',
              borderBottom: i === TEAM.length - 1 ? 'none' : '1px solid var(--border)',
            }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: p.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 11, flexShrink: 0 }}>{p.ini}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                <div style={{ fontSize: 11, color: 'var(--fg-4)' }}>{p.sub}</div>
              </div>
              <span style={{ padding: '3px 8px', borderRadius: 6, background: pill.bg, color: pill.color, fontSize: 10, fontWeight: 700 }}>{pill.label}</span>
            </div>
          );
        })}
        <div style={{ padding: '12px 0 0', fontSize: 13, color: 'var(--blue)', fontWeight: 600, cursor: 'pointer' }}>+7 ещё</div>
      </div>
    </div>
  );
}

// ─── Activity feed ───────────────────────────────────
const ACTIVITY = [
  { color: 'var(--blue)',   icon: <Db.cal s={12}/>,     text: <><b>Анна К.</b> добавила «День открытых дверей ИКИТ»</>, time: '2 часа назад' },
  { color: 'var(--green)',  icon: <Db.check s={12}/>,   text: <><b>Михаил С.</b> одобрил заявку на участие в Хакатоне</>, time: '5 часов назад' },
  { color: 'var(--fg-3)',   icon: <Db.settings s={12}/>,text: <><b>Иван П.</b> изменил настройки организации</>, time: 'вчера' },
  { color: 'var(--violet)', icon: <Db.bell s={12}/>,    text: <>Опубликовано мероприятие «Встреча со студсоветом»</>, time: 'вчера' },
  { color: 'var(--amber)',  icon: <Db.userAdd s={12}/>, text: <>Приглашён новый редактор: <b>Дарья В.</b></>, time: '3 дня назад' },
];

function ActivityCard() {
  return (
    <div className="card" style={{ padding: 24 }}>
      <h4 className="h4" style={{ margin: '0 0 16px' }}>Последняя активность</h4>
      <div>
        {ACTIVITY.map((a, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: 12,
            padding: '12px 0',
            borderBottom: i === ACTIVITY.length - 1 ? 'none' : '1px solid var(--border)',
          }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: `color-mix(in oklab, ${a.color} 14%, transparent)`, color: a.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{a.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, color: 'var(--fg)', lineHeight: 1.4 }}>{a.text}</div>
              <div style={{ fontSize: 11, color: 'var(--fg-4)', marginTop: 2 }}>{a.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section helper ──────────────────────────────────
function DbSection({ title, action, children, mb = 32 }) {
  return (
    <section style={{ marginBottom: mb }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
        <h3 className="h3" style={{ margin: 0 }}>{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}

// ─── Main screen ─────────────────────────────────────
function OrgDashboardScreen({ orgId = 'studsovet-ikit' }) {
  const org = ORGANIZATIONS.find(o => o.id === orgId) || ORGANIZATIONS[0];

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar context={{ type: 'org', orgId: org.id }} active="dashboard" loggedIn={true}/>
        <main style={{ flex: 1, minWidth: 0 }}>
          <Topbar loggedIn={true}/>
          <div style={{ maxWidth: 1440, margin: '0 auto', padding: 32 }}>
            <OrgHeader org={org}/>

            <DbSection title="Требует внимания" action={
              <button style={{ background: 'transparent', border: 'none', fontSize: 13, color: 'var(--fg-4)', cursor: 'pointer', fontWeight: 500 }}>Скрыть выполненное</button>
            }>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                <AlertCard color="var(--amber)" icon={<Db.inbox s={16}/>}  count="7" title="заявок ждут рассмотрения" sub="Самая старая — 3 дня назад" action="Рассмотреть"/>
                <AlertCard color="var(--violet)" icon={<Db.clock s={16}/>} count="2" title="события на этой неделе"   sub="Ближайшее — Хакатон 20 мая"   action="К списку"/>
                <AlertCard color="var(--blue)"  icon={<Db.bell s={16}/>}   count="3" title="события с низкой заполненностью" sub="Меньше 30% мест занято" action="Разослать напоминание"/>
              </div>
            </DbSection>

            <DbSection title="Сводка организации" action={
              <a href="#" style={{ fontSize: 13, color: 'var(--blue)', fontWeight: 600 }}>Полная аналитика →</a>
            }>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                <MetricTile color="var(--blue)"   icon={<Db.cal s={14}/>}   value="4"   delta="+1 за месяц"   deltaDir="up" label="активных мероприятий"/>
                <MetricTile color="var(--violet)" icon={<Db.users s={14}/>} value="247" delta="+12% за месяц" deltaDir="up" label="участников в этом месяце"/>
                <MetricTile color="var(--green)"  icon={<Db.userAdd s={14}/>} value="38" delta="+8 за неделю"  deltaDir="up" label="регистраций за неделю"/>
                <MetricTile color="var(--amber)"  icon={<Db.gauge s={14}/>} value="62%" label="средняя заполняемость"/>
              </div>
            </DbSection>

            <DbSection title="Ближайшие мероприятия" action={
              <a href="#" style={{ fontSize: 13, color: 'var(--blue)', fontWeight: 600 }}>Все мероприятия →</a>
            }>
              <EventsTable/>
            </DbSection>

            <DbSection title="Команда и активность" mb={0}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                <TeamCard/>
                <ActivityCard/>
              </div>
            </DbSection>
          </div>
          <Footer/>
        </main>
      </div>
    </div>
  );
}

window.OrgDashboardScreen = OrgDashboardScreen;
