// OrgApplications — organizer's inbox for event registrations.
// Split view: filterable list (left) + detail panel (right).
// Uses Sidebar (org, active="inbox"), Topbar, Footer, EventCover, EVENT_TYPES,
// ORGANIZATIONS, tonalShift, .card / .btn / .h2..h4 tokens.

// ─── Local icon set ─────────────────────────────────
const Ap = {
  search:    (p={}) => <svg width={p.s||16} height={p.s||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>,
  chev:      (p={}) => <svg width={p.s||14} height={p.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>,
  check:     (p={}) => <svg width={p.s||14} height={p.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>,
  x:         (p={}) => <svg width={p.s||14} height={p.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>,
  download:  (p={}) => <svg width={p.s||14} height={p.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  settings:  (p={}) => <svg width={p.s||14} height={p.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  more:      (p={}) => <svg width={p.s||18} height={p.s||18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>,
  ext:       (p={}) => <svg width={p.s||12} height={p.s||12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M7 7h10v10"/></svg>,
  bigCheck:  (p={}) => <svg width={p.s||40} height={p.s||40} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>,
};

// ─── Mock data ──────────────────────────────────────
const APPLICATIONS = [
  { id: 1, name: 'Анна Кузнецова',   handle: '@anna_k',      meta: 'ИКИТ · 3 курс',   grad: ['#2563EB', '#1E40AF'], event: 'Хакатон Siberian Hack 2026', eventType: 'educational', when: '2 ч назад',     status: 'pending' },
  { id: 2, name: 'Михаил Соколов',   handle: '@msokolov',    meta: 'ИКИТ · 2 курс',   grad: ['#7C3AED', '#5B21B6'], event: 'Хакатон Siberian Hack 2026', eventType: 'educational', when: '3 ч назад',     status: 'pending' },
  { id: 3, name: 'Дарья Волкова',    handle: '@daryav',      meta: 'ИКИТ · 3 курс',   grad: ['#059669', '#047857'], event: 'Хакатон Siberian Hack 2026', eventType: 'educational', when: '5 ч назад',     status: 'pending' },
  { id: 4, name: 'Егор Павлов',      handle: '@egor.p',      meta: 'ИКИТ · 1 курс',   grad: ['#DC2626', '#991B1B'], event: 'Хакатон Siberian Hack 2026', eventType: 'educational', when: 'вчера',         status: 'pending' },
  { id: 5, name: 'Илья Громов',      handle: '@ilya_g',      meta: 'ИФКСиТ · 2 курс', grad: ['#F5A524', '#A8651A'], event: 'Хакатон Siberian Hack 2026', eventType: 'educational', when: 'вчера',         status: 'pending' },
  { id: 6, name: 'Полина Лебедева',  handle: '@p.lebedeva',  meta: 'ИФиЯК · 4 курс',  grad: ['#2563EB', '#1E40AF'], event: 'Хакатон Siberian Hack 2026', eventType: 'educational', when: '2 дня назад',   status: 'pending' },
  { id: 7, name: 'Никита Орлов',     handle: '@norlov',      meta: 'ИМиФИ · 3 курс',  grad: ['#7C3AED', '#5B21B6'], event: 'Хакатон Siberian Hack 2026', eventType: 'educational', when: '3 дня назад',   status: 'pending' },
  { id: 8, name: 'Елена Семёнова',   handle: '@e.semenova',  meta: 'ИКИТ · 2 курс',   grad: ['#059669', '#047857'], event: 'Встреча со студсоветом',       eventType: 'community',      when: 'сегодня 10:14', status: 'auto' },
  { id: 9, name: 'Артём Беляев',     handle: '@a.belyaev',   meta: 'ИУБПЭ · 4 курс',  grad: ['#F5A524', '#A8651A'], event: 'День открытых дверей ИКИТ',    eventType: 'career',      when: 'вчера',         status: 'auto' },
  { id: 10,name: 'Олеся Тимофеева',  handle: '@o.timofeeva', meta: 'ИКИТ · 2 курс',   grad: ['#DC2626', '#991B1B'], event: 'Хакатон Siberian Hack 2026', eventType: 'educational', when: '4 дня назад',   status: 'rejected' },
];

// ─── Helpers ────────────────────────────────────────
function initialsFrom(name) {
  const parts = name.split(' ');
  return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase();
}

function Avatar({ grad, name, size = 32, radius }) {
  const fs = Math.max(10, Math.round(size * 0.36));
  return (
    <div style={{
      width: size, height: size, borderRadius: radius ?? size / 2,
      background: `linear-gradient(135deg, ${grad[0]}, ${grad[1]})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'white', fontSize: fs, fontWeight: 700,
      flexShrink: 0,
    }}>{initialsFrom(name)}</div>
  );
}

function StatusChip({ status }) {
  const map = {
    pending:  { label: 'На рассмотрении', color: 'var(--amber)', bg: 'color-mix(in oklab, var(--amber) 14%, transparent)' },
    approved: { label: 'Одобрено',        color: 'var(--green)', bg: 'color-mix(in oklab, var(--green) 14%, transparent)' },
    rejected: { label: 'Отклонено',       color: 'var(--red)',   bg: 'color-mix(in oklab, var(--red) 14%, transparent)' },
    auto:     { label: 'Авто-регистрация',color: 'var(--fg-4)',  bg: 'var(--bg-2)' },
  };
  const c = map[status];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 9px', borderRadius: 999,
      background: c.bg, color: c.color,
      fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: c.color }}/>
      {c.label}
    </span>
  );
}

function GhostBtn({ children, sm = false, danger = false }) {
  return (
    <button className={`btn btn-ghost ${sm ? 'btn-sm' : ''}`} style={{
      color: danger ? 'var(--red)' : undefined,
      display: 'inline-flex', alignItems: 'center', gap: 6,
    }}>{children}</button>
  );
}

function FilterChip({ active, children }) {
  return (
    <button style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '7px 12px', borderRadius: 8,
      background: active ? 'var(--grad-soft)' : 'transparent',
      border: active ? '1px solid color-mix(in oklab, var(--blue) 30%, transparent)' : '1px solid var(--border)',
      color: active ? 'var(--fg)' : 'var(--fg-2)',
      fontSize: 13, fontWeight: 600, cursor: 'pointer',
      whiteSpace: 'nowrap',
    }}>{children}</button>
  );
}

function Divider() {
  return <span style={{ width: 1, height: 24, background: 'var(--border)', margin: '0 4px' }}/>;
}

function Checkbox({ checked, indeterminate }) {
  const filled = checked || indeterminate;
  return (
    <span style={{
      width: 16, height: 16, borderRadius: 4,
      border: '1.5px solid ' + (filled ? 'var(--blue)' : 'var(--border-2)'),
      background: filled ? 'var(--blue)' : 'transparent',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      color: 'white', flexShrink: 0,
    }}>
      {indeterminate
        ? <span style={{ width: 8, height: 2, background: 'white', borderRadius: 1 }}/>
        : checked && <Ap.check s={11}/>}
    </span>
  );
}

// ─── Filters bar ────────────────────────────────────
function FiltersBar() {
  return (
    <div className="card" style={{ padding: 14, display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
      <FilterChip active={true}>● Требуют решения <span style={{ color: 'var(--fg-3)', marginLeft: 4 }}>7</span></FilterChip>
      <FilterChip>Одобренные <span style={{ color: 'var(--fg-3)', marginLeft: 4 }}>32</span></FilterChip>
      <FilterChip>Отклонённые <span style={{ color: 'var(--fg-3)', marginLeft: 4 }}>4</span></FilterChip>
      <FilterChip>Все <span style={{ color: 'var(--fg-3)', marginLeft: 4 }}>43</span></FilterChip>

      <Divider/>

      <GhostBtn sm>Все события <Ap.chev/></GhostBtn>

      {/* Active filter chip (selected event) */}
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '5px 6px 5px 10px', borderRadius: 999,
        background: 'color-mix(in oklab, var(--blue) 10%, transparent)',
        border: '1px solid color-mix(in oklab, var(--blue) 25%, transparent)',
        color: 'var(--blue)', fontSize: 12, fontWeight: 600,
      }}>
        Хакатон Siberian Hack 2026
        <button style={{
          width: 18, height: 18, borderRadius: 999,
          background: 'color-mix(in oklab, var(--blue) 18%, transparent)',
          border: 'none', color: 'var(--blue)', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}><Ap.x s={10}/></button>
      </span>

      <GhostBtn sm>Все институты <Ap.chev/></GhostBtn>
      <GhostBtn sm>За всё время <Ap.chev/></GhostBtn>

      {/* Search push-right */}
      <div style={{ flex: 1 }}/>
      <div style={{
        position: 'relative', width: 320,
      }}>
        <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--fg-4)', display: 'inline-flex' }}><Ap.search/></span>
        <input style={{
          width: '100%', height: 36, paddingLeft: 36, paddingRight: 12,
          borderRadius: 8, border: '1px solid var(--border)',
          background: 'var(--bg-2)', color: 'var(--fg)',
          fontSize: 13, outline: 'none',
        }} placeholder="Поиск по имени, email…"/>
      </div>
    </div>
  );
}

// ─── Bulk action bar ────────────────────────────────
function BulkBar({ count }) {
  return (
    <div style={{
      padding: '14px 20px',
      background: 'color-mix(in oklab, var(--blue) 8%, transparent)',
      borderBottom: '1px solid var(--blue)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
    }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg)' }}>Выбрано {count} {count === 1 ? 'заявка' : 'заявки'}</div>
        <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 2 }}>Все {count} — на Хакатон Siberian Hack 2026</div>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button className="btn btn-primary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Ap.check/> Одобрить ({count})</button>
        <GhostBtn sm danger><Ap.x/> Отклонить</GhostBtn>
        <Divider/>
        <GhostBtn sm><Ap.download/> Экспорт</GhostBtn>
        <GhostBtn sm>Снять выделение</GhostBtn>
      </div>
    </div>
  );
}

// ─── Application list row ───────────────────────────
function AppRow({ app, selected, bulkMode, bulkChecked, last }) {
  const cols = bulkMode ? '24px 1fr 220px 140px 140px' : '1fr 220px 140px 140px';
  const typeColor = (EVENT_TYPES[app.eventType] || EVENT_TYPES.community).color;
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: cols, gap: 14,
      padding: '14px 20px', alignItems: 'center',
      borderBottom: last ? 'none' : '1px solid var(--border)',
      background: selected ? 'color-mix(in oklab, var(--blue) 6%, transparent)' : 'transparent',
      boxShadow: selected ? 'inset 3px 0 0 var(--blue)' : 'none',
      cursor: 'pointer',
      transition: 'background .12s',
    }}
      onMouseEnter={e => { if (!selected) e.currentTarget.style.background = 'var(--bg-2)'; }}
      onMouseLeave={e => { if (!selected) e.currentTarget.style.background = 'transparent'; }}
    >
      {bulkMode && <Checkbox checked={bulkChecked}/>}

      {/* Applicant */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
        <Avatar grad={app.grad} name={app.name} size={32}/>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{app.name}</div>
          <div style={{ fontSize: 11, color: 'var(--fg-4)', marginTop: 2 }}>{app.meta} · {app.handle}</div>
        </div>
      </div>

      {/* Event */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: typeColor, flexShrink: 0 }}/>
        <span style={{ fontSize: 12, color: 'var(--fg-2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{app.event}</span>
      </div>

      {/* When */}
      <div style={{ fontSize: 12, color: 'var(--fg-3)' }}>{app.when}</div>

      {/* Status */}
      <div><StatusChip status={app.status}/></div>
    </div>
  );
}

// ─── Left: List ─────────────────────────────────────
function ApplicationsList({ bulkMode }) {
  const cols = bulkMode ? '24px 1fr 220px 140px 140px' : '1fr 220px 140px 140px';
  const checkedIds = bulkMode ? [1, 2, 3] : [];

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      {bulkMode && <BulkBar count={checkedIds.length}/>}

      {/* Header */}
      <div style={{
        display: 'grid', gridTemplateColumns: cols, gap: 14,
        padding: '12px 20px',
        background: 'var(--bg-2)',
        borderBottom: '1px solid var(--border)',
        fontSize: 11, fontWeight: 700, color: 'var(--fg-4)',
        textTransform: 'uppercase', letterSpacing: '0.06em',
      }}>
        {bulkMode && <Checkbox indeterminate={true}/>}
        <div>Заявитель</div>
        <div>Событие</div>
        <div>Когда подал</div>
        <div>Статус</div>
      </div>

      {APPLICATIONS.map((app, i) => (
        <AppRow
          key={app.id}
          app={app}
          selected={app.id === 1}
          bulkMode={bulkMode}
          bulkChecked={checkedIds.includes(app.id)}
          last={i === APPLICATIONS.length - 1}
        />
      ))}
    </div>
  );
}

// ─── Right: Detail ──────────────────────────────────
function AnswerBlock({ q, a, link }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: 'var(--fg-4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{q}</div>
      <div style={{ fontSize: 14, color: link ? 'var(--blue)' : 'var(--fg)', marginTop: 6, lineHeight: 1.5, cursor: link ? 'pointer' : 'default', fontWeight: link ? 600 : 400 }}>{a}</div>
    </div>
  );
}

function StatTile({ value, label }) {
  return (
    <div className="card" style={{ padding: 12, textAlign: 'center' }}>
      <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--fg)' }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 4 }}>{label}</div>
    </div>
  );
}

function ApplicationDetail() {
  const app = APPLICATIONS[0];
  const eventEvt = { id: 'detail-cover', type: app.eventType || 'community', title: app.event };

  return (
    <div className="card" style={{
      padding: 24,
      position: 'sticky', top: 88,
      alignSelf: 'flex-start',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 20 }}>
        <Avatar grad={app.grad} name={app.name} size={56} radius={14}/>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: 'var(--fg)' }}>{app.name}</h3>
            <StatusChip status={app.status}/>
          </div>
          <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 4 }}>{app.meta} · {app.handle}</div>
          <div style={{ fontSize: 12, color: 'var(--blue)', marginTop: 6, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            anna.kuznetsova@sfu-kras.ru <Ap.ext/>
          </div>
        </div>
      </div>

      {/* Event card */}
      <div style={{
        padding: 14, borderRadius: 12,
        background: 'var(--bg-2)', border: '1px solid var(--border)',
        marginBottom: 20,
      }}>
        <div style={{ fontSize: 11, color: 'var(--fg-4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Заявка на участие в</div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 6 }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
            <EventCover event={eventEvt} height={40}/>
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{app.event}</div>
            <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 2 }}>20 мая, 14:00 · ауд. 5-08</div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: 'var(--blue)', marginTop: 10, fontWeight: 600, cursor: 'pointer' }}>Открыть карточку события →</div>
      </div>

      {/* Questionnaire */}
      <h4 style={{ margin: '0 0 14px 0', fontSize: 15, fontWeight: 700, color: 'var(--fg)' }}>Ответы на анкету</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <AnswerBlock q="Опыт участия в хакатонах" a="Участвовала в двух: Сбер.Хакатон 2024 и хакатон ИКИТ прошлой осенью. В обоих наша команда заняла призовые места."/>
        <AnswerBlock q="Выбранный трек" a="Учебный процесс и расписание"/>
        <AnswerBlock q="Собрала ли команду?" a="Да, есть команда из 4 человек — двое из ИКИТ, один из ИМиФИ, я. Ищем ещё одного дизайнера."/>
        <AnswerBlock q="Ссылка на GitHub / портфолио (если есть)" a="github.com/annak-sfu" link/>
      </div>

      {/* Participant stats */}
      <h4 style={{ margin: '24px 0 14px 0', fontSize: 15, fontWeight: 700, color: 'var(--fg)' }}>Информация об участнике</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        <StatTile value="12"  label="событий посещено"/>
        <StatTile value="248" label="часов активности"/>
        <StatTile value="3"   label="организации"/>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8, marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
        <button className="btn btn-primary" style={{ flex: 1, height: 44, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><Ap.check s={16}/> Одобрить</button>
        <button className="btn btn-ghost" style={{ width: 140, height: 44, color: 'var(--red)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><Ap.x s={14}/> Отклонить</button>
        <button className="btn btn-ghost" style={{ width: 44, height: 44, padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Ap.more/></button>
      </div>
      <div style={{ fontSize: 11, color: 'var(--fg-4)', textAlign: 'center', marginTop: 10 }}>
        Заявитель получит уведомление о решении в e-mail и в приложении
      </div>
    </div>
  );
}

// ─── Empty state ────────────────────────────────────
function EmptyState() {
  return (
    <div className="card" style={{
      padding: 60, textAlign: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 0%, color-mix(in oklab, var(--green) 8%, transparent), transparent 60%)',
        pointerEvents: 'none',
      }}/>
      <div style={{ position: 'relative' }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: 'color-mix(in oklab, var(--green) 14%, transparent)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--green)',
        }}><Ap.bigCheck s={40}/></div>
        <h2 className="h2" style={{ margin: '24px 0 0 0' }}>Всё разобрано</h2>
        <div style={{ fontSize: 14, color: 'var(--fg-3)', maxWidth: 420, margin: '8px auto 0' }}>
          Ты обработал все заявки. Когда придут новые — увидишь их здесь.
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 28 }}>
          <button className="btn btn-ghost">Посмотреть одобренные</button>
          <button className="btn btn-primary">+ Создать новое мероприятие</button>
        </div>
      </div>
    </div>
  );
}

// ─── Main ───────────────────────────────────────────
function OrgApplicationsScreen({ state = 'default', orgId = 'studsovet-ikit' }) {
  const org = ORGANIZATIONS.find(o => o.id === orgId) || ORGANIZATIONS[0];
  const isEmpty = state === 'empty';
  const isBulk  = state === 'bulk';

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar context={{ type: 'org', orgId: org.id }} active="inbox" loggedIn={true}/>
        <main style={{ flex: 1, minWidth: 0 }}>
          <Topbar loggedIn={true}/>

          <div style={{ padding: 32 }}>
            {/* Page header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, gap: 16 }}>
              <div>
                <h2 className="h2" style={{ margin: 0 }}>Заявки</h2>
                <div style={{ fontSize: 13, color: 'var(--fg-3)', marginTop: 4 }}>
                  {isEmpty
                    ? '0 ждут рассмотрения · 32 одобрено · 4 отклонено за последний месяц'
                    : '7 ждут рассмотрения · 32 одобрено · 4 отклонено за последний месяц'}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <GhostBtn sm><Ap.download/> Экспорт CSV</GhostBtn>
                <GhostBtn sm><Ap.settings/> Настройки уведомлений</GhostBtn>
              </div>
            </div>

            {!isEmpty && <FiltersBar/>}

            {isEmpty ? (
              <EmptyState/>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 480px', gap: 16, alignItems: 'flex-start' }}>
                <ApplicationsList bulkMode={isBulk}/>
                <ApplicationDetail/>
              </div>
            )}
          </div>

          <Footer/>
        </main>
      </div>
    </div>
  );
}

window.OrgApplicationsScreen = OrgApplicationsScreen;
