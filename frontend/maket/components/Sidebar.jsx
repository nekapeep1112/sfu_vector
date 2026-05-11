// Sidebar with ContextSwitcher (Notion/Linear-style) at top.
// Backwards compatible: if no `context` prop, behaves as personal.
// Service props for design-canvas demos: forceSwitcherOpen, emptyMemberships.

const ROLE_CHIP = {
  owner:  { label: 'Владелец', color: 'var(--violet)', bg: 'rgba(155,92,255,0.15)' },
  editor: { label: 'Редактор', color: 'var(--blue)',   bg: 'rgba(79,127,255,0.15)' },
  viewer: { label: 'Просмотр', color: 'var(--fg-4)',   bg: 'var(--bg-2)' },
};

// ─── Icons ───────────────────────────────────────────
const Sb = {
  home:     () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12 12 3l9 9M5 10v10h14V10"/></svg>,
  orgs:     () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="10" r="2.2"/><path d="M3 19c.5-3 3-5 6-5s5.5 2 6 5M14 19c.3-2 2-3.5 3.5-3.5"/></svg>,
  events:   () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>,
  profile:  () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4.5 4.5-7 8-7s7 2.5 8 7"/></svg>,
  dashboard:() => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="13" width="4" height="8" rx="1"/><rect x="10" y="8" width="4" height="13" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></svg>,
  inbox:    () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>,
  team:     () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  analytics:() => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 6-6"/></svg>,
  settings: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  chevron:  () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  check:    () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  back:     () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  plus:     () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  arrowR:   () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  empty:    () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-6 9 6v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>,
};

// ─── Avatar bubble (32×32) ───────────────────────────
function CtxAvatar({ grad, initials, size = 32 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 9,
      background: grad,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'white', fontWeight: 700, fontSize: size > 28 ? 12 : 11,
      flexShrink: 0,
      boxShadow: '0 1px 2px rgba(15,23,42,0.1)',
    }}>{initials}</div>
  );
}

// ─── Context Switcher (trigger + popover) ────────────
function ContextSwitcher({ context, forceOpen = false, emptyMemberships = false }) {
  const [open, setOpen] = React.useState(forceOpen);
  React.useEffect(() => { setOpen(forceOpen); }, [forceOpen]);

  const memberships = emptyMemberships ? [] : (CURRENT_USER.memberships || []);
  const userOrgs = ORGANIZATIONS.filter(o => memberships.includes(o.id));

  const isPersonal = context.type === 'personal';
  const activeOrg = !isPersonal ? ORGANIZATIONS.find(o => o.id === context.orgId) : null;

  const triggerLabel = isPersonal ? CURRENT_USER.name : (activeOrg ? activeOrg.name : '—');
  const triggerSub   = isPersonal
    ? 'Личный профиль'
    : (activeOrg ? `${ROLE_CHIP[activeOrg.role].label} · ${activeOrg.members} участников` : '');
  const triggerGrad  = isPersonal
    ? CURRENT_USER.avatarGrad
    : (activeOrg ? `linear-gradient(135deg, ${activeOrg.color}, ${tonalShift(activeOrg.color)})` : 'var(--surface-3)');
  const triggerInit  = isPersonal ? CURRENT_USER.initials : (activeOrg ? activeOrg.short : '?');

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 12px', borderRadius: 12,
          background: open ? 'var(--bg-2)' : 'var(--surface)',
          border: '1px solid ' + (open ? 'var(--border-strong)' : 'var(--border)'),
          textAlign: 'left', cursor: 'pointer',
          transition: 'all .15s',
        }}
        onMouseEnter={e => { if (!open) { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.background = 'var(--bg-2)'; } }}
        onMouseLeave={e => { if (!open) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface)'; } }}
      >
        <CtxAvatar grad={triggerGrad} initials={triggerInit}/>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{triggerLabel}</div>
          <div style={{ fontSize: 11, color: 'var(--fg-4)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 1 }}>{triggerSub}</div>
        </div>
        <span style={{ color: 'var(--fg-4)', display: 'inline-flex', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }}><Sb.chevron/></span>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          marginTop: 6, zIndex: 100,
          borderRadius: 14, background: 'var(--surface)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-pop)',
          padding: 6, overflow: 'hidden',
        }}>
          {/* SECTION 1 — Personal */}
          <div style={{ padding: '8px 12px 4px', fontSize: 10, color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>Личный</div>
          <CtxRow
            grad={CURRENT_USER.avatarGrad}
            initials={CURRENT_USER.initials}
            title={CURRENT_USER.name}
            sub="Личный профиль"
            active={isPersonal}
          />

          {/* SECTION 2 — Organizations */}
          {userOrgs.length > 0 ? (
            <>
              <div style={{ padding: '8px 12px 4px', fontSize: 10, color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>Мои организации</div>
              {userOrgs.map(org => (
                <CtxRow
                  key={org.id}
                  grad={`linear-gradient(135deg, ${org.color}, ${tonalShift(org.color)})`}
                  initials={org.short}
                  title={org.name}
                  sub={`${org.members} участников`}
                  active={!isPersonal && context.orgId === org.id}
                  roleChip={ROLE_CHIP[org.role]}
                />
              ))}
            </>
          ) : (
            <div style={{ padding: '14px 12px', display: 'flex', alignItems: 'center', gap: 10, color: 'var(--fg-3)' }}>
              <span style={{ color: 'var(--fg-4)' }}><Sb.empty/></span>
              <div style={{ fontSize: 12, lineHeight: 1.4 }}>Ты не состоишь ни в одной организации</div>
            </div>
          )}

          {/* SECTION 3 — Actions */}
          <div style={{ borderTop: '1px solid var(--border)', margin: '6px 0' }}/>
          <CtxAction
            onClick={() => alert('Откроется форма заявки на создание организации')}
            color="var(--blue)"
            icon={<Sb.plus/>}
            label="Создать организацию"
          />
          <CtxAction
            onClick={() => {}}
            color="var(--fg-2)"
            label="Управление аккаунтом"
            trailing={<Sb.arrowR/>}
          />
        </div>
      )}
    </div>
  );
}

function CtxRow({ grad, initials, title, sub, active, roleChip }) {
  return (
    <button style={{
      width: '100%', display: 'flex', alignItems: 'center', gap: 10,
      padding: 10, borderRadius: 8,
      background: active ? 'var(--bg-2)' : 'transparent',
      border: 'none', cursor: 'pointer', textAlign: 'left',
      transition: 'background .12s',
    }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--bg-2)'; }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
    >
      <CtxAvatar grad={grad} initials={initials} size={30}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div>
        <div style={{ fontSize: 11, color: 'var(--fg-4)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 1 }}>{sub}</div>
      </div>
      {roleChip && (
        <span style={{
          padding: '2px 7px', borderRadius: 6,
          background: roleChip.bg, color: roleChip.color,
          fontSize: 10, fontWeight: 700,
          flexShrink: 0,
        }}>{roleChip.label}</span>
      )}
      {active && <span style={{ color: 'var(--blue)', display: 'inline-flex', flexShrink: 0 }}><Sb.check/></span>}
    </button>
  );
}

function CtxAction({ onClick, color, icon, label, trailing }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', display: 'flex', alignItems: 'center', gap: 8,
      padding: '10px 12px', borderRadius: 8,
      background: 'transparent', border: 'none',
      color, fontSize: 13, fontWeight: 600,
      cursor: 'pointer', textAlign: 'left',
      transition: 'background .12s',
    }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-2)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      {icon && <span style={{ display: 'inline-flex' }}>{icon}</span>}
      <span style={{ flex: 1 }}>{label}</span>
      {trailing && <span style={{ display: 'inline-flex', color: 'var(--fg-4)' }}>{trailing}</span>}
    </button>
  );
}

// ─── Nav definitions ─────────────────────────────────
function getNavItems(context, loggedIn) {
  if (context.type === 'org') {
    return [
      { id: 'dashboard', label: 'Дашборд',    icon: Sb.dashboard },
      { id: 'events',    label: 'Мероприятия', icon: Sb.events,    badge: 4 },
      { id: 'inbox',     label: 'Заявки',     icon: Sb.inbox,     badge: 7 },
      { id: 'team',      label: 'Команда',    icon: Sb.team },
      { id: 'analytics', label: 'Аналитика',  icon: Sb.analytics },
      { id: 'settings',  label: 'Настройки',  icon: Sb.settings },
    ];
  }
  return [
    { id: 'home',    label: 'Главная',     icon: Sb.home },
    { id: 'orgs',    label: 'Организации', icon: Sb.orgs },
    { id: 'events',  label: 'Мероприятия', icon: Sb.events },
    { id: 'profile', label: 'Профиль',     icon: Sb.profile, badge: loggedIn ? 3 : null },
  ];
}

// ─── Main Sidebar ────────────────────────────────────
function Sidebar({
  active = 'home',
  loggedIn = false,
  onNavigate,
  compact = false,
  context = { type: 'personal' },
  forceSwitcherOpen = false,
  emptyMemberships = false,
}) {
  const items = getNavItems(context, loggedIn);
  const isOrg = context.type === 'org';

  return (
    <aside style={{
      width: compact ? 80 : 240,
      background: 'var(--bg-2)',
      borderRight: '1px solid var(--border)',
      padding: compact ? '20px 12px' : '16px 14px 20px',
      display: 'flex', flexDirection: 'column', gap: 10,
      flexShrink: 0,
      minHeight: '100%',
      position: 'relative',
    }}>
      {/* Tiny logomark above switcher */}
      {!compact && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 4px 8px' }}>
          <LogoMark px={22}/>
          <span style={{ fontSize: 10, color: 'var(--fg-4)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>СФУ·Вектор</span>
        </div>
      )}

      {compact ? (
        <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 8, borderBottom: '1px solid var(--border)', marginBottom: 4 }}>
          <LogoMark px={36}/>
        </div>
      ) : (
        <ContextSwitcher context={context} forceOpen={forceSwitcherOpen} emptyMemberships={emptyMemberships}/>
      )}

      <nav className="col gap-1" style={{ marginTop: 6 }}>
        {items.map(it => {
          const Icon = it.icon;
          const isActive = active === it.id;
          return (
            <button key={it.id}
              onClick={() => onNavigate && onNavigate(it.id)}
              title={compact ? it.label : ''}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: compact ? '12px' : '10px 12px',
                borderRadius: 10,
                background: isActive ? 'var(--grad-soft)' : 'transparent',
                border: '1px solid ' + (isActive ? 'rgba(155,92,255,0.3)' : 'transparent'),
                color: isActive ? 'var(--fg)' : 'var(--fg-3)',
                fontSize: 14, fontWeight: 500,
                justifyContent: compact ? 'center' : 'flex-start',
                position: 'relative',
                transition: 'all .15s',
                cursor: 'pointer',
              }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'var(--bg-2)'; e.currentTarget.style.color = 'var(--fg)'; } }}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--fg-3)'; } }}
            >
              <Icon active={isActive} />
              {!compact && <span style={{ flex: 1, textAlign: 'left' }}>{it.label}</span>}
              {!compact && it.badge && (
                <span style={{ minWidth: 20, height: 20, borderRadius: 10, background: isOrg ? 'var(--violet)' : 'var(--blue)', color: 'white', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 6px' }}>{it.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      <div style={{ flex: 1 }} />

      {/* Bottom block: idea (personal) or back-to-personal (org) */}
      {!compact && !isOrg && (
        <div style={{ padding: 16, borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: 'var(--grad)', opacity: 0.15, filter: 'blur(20px)' }} />
          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--grad-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10, border: '1px solid rgba(155,92,255,0.3)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/><circle cx="12" cy="12" r="4"/></svg>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Предложить идею</div>
          <div style={{ fontSize: 11, color: 'var(--fg-3)', lineHeight: 1.45, marginBottom: 12 }}>Есть идея, как сделать студенческую жизнь лучше?</div>
          <button className="btn btn-ghost btn-sm" style={{ width: '100%', justifyContent: 'center' }}>Предложить</button>
        </div>
      )}

      {!compact && isOrg && (
        <button style={{
          width: '100%', padding: '12px 14px',
          borderRadius: 12, background: 'var(--surface)',
          border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', gap: 10,
          color: 'var(--fg-2)', fontSize: 12, fontWeight: 600,
          cursor: 'pointer', textAlign: 'left',
          transition: 'all .15s',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.background = 'var(--bg-2)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface)'; }}
        >
          <span style={{ color: 'var(--fg-4)', display: 'inline-flex' }}><Sb.back/></span>
          <span style={{ flex: 1 }}>Вернуться в личный профиль</span>
        </button>
      )}
    </aside>
  );
}

window.Sidebar = Sidebar;
window.ContextSwitcher = ContextSwitcher;
