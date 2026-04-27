// 4-item sidebar per brief
function Sidebar({ active = 'home', loggedIn = false, onNavigate, compact = false }) {
  const items = [
    { id: 'home',    label: 'Главная',      icon: IconHome },
    { id: 'orgs',    label: 'Организации',  icon: IconOrgs },
    { id: 'events',  label: 'Мероприятия',  icon: IconEvents },
    { id: 'profile', label: 'Профиль',      icon: IconProfile, badge: loggedIn ? 3 : null },
  ];

  return (
    <aside style={{
      width: compact ? 80 : 240,
      background: 'var(--bg-2)',
      borderRight: '1px solid var(--border)',
      padding: compact ? '20px 12px' : '24px 16px',
      display: 'flex', flexDirection: 'column', gap: 8,
      flexShrink: 0,
      minHeight: '100%',
    }}>
      <div style={{ padding: compact ? '0 0 16px' : '0 8px 20px', borderBottom: '1px solid var(--border)', marginBottom: 8 }}>
        {compact ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <LogoMark px={36}/>
          </div>
        ) : (
          <Logo />
        )}
      </div>

      <nav className="col gap-1">
        {items.map(it => {
          const Icon = it.icon;
          const isActive = active === it.id;
          return (
            <button key={it.id}
              onClick={() => onNavigate && onNavigate(it.id)}
              title={compact ? it.label : ''}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: compact ? '12px' : '11px 14px',
                borderRadius: 10,
                background: isActive ? 'var(--grad-soft)' : 'transparent',
                border: '1px solid ' + (isActive ? 'rgba(155,92,255,0.3)' : 'transparent'),
                color: isActive ? 'var(--fg)' : 'var(--fg-3)',
                fontSize: 14, fontWeight: 500,
                justifyContent: compact ? 'center' : 'flex-start',
                position: 'relative',
                transition: 'all .15s',
              }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'var(--bg-2)'; e.currentTarget.style.color = 'var(--fg)'; } }}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--fg-3)'; } }}
            >
              <Icon active={isActive} />
              {!compact && <span style={{ flex: 1, textAlign: 'left' }}>{it.label}</span>}
              {!compact && it.badge && (
                <span style={{ minWidth: 20, height: 20, borderRadius: 10, background: 'var(--blue)', color: 'white', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 6px' }}>{it.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      <div style={{ flex: 1 }} />

      {/* Bottom: idea card */}
      {!compact && (
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

      {/* User block / login */}
      {!compact && (
        loggedIn ? (
          <div style={{ marginTop: 8, padding: 10, borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #F5A524, #F25E5E)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, color: 'white' }}>ИП</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Иван Петров</div>
              <div style={{ fontSize: 11, color: 'var(--fg-4)' }}>ИКИТ · Студент</div>
            </div>
            <button style={{ width: 24, height: 24, borderRadius: 6, color: 'var(--fg-4)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
            </button>
          </div>
        ) : (
          <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>
            Войти в профиль
          </button>
        )
      )}
    </aside>
  );
}

function IconHome({ active }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12 12 3l9 9M5 10v10h14V10"/></svg>;
}
function IconOrgs() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="10" r="2.2"/><path d="M3 19c.5-3 3-5 6-5s5.5 2 6 5M14 19c.3-2 2-3.5 3.5-3.5"/></svg>;
}
function IconEvents() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>;
}
function IconProfile() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4.5 4.5-7 8-7s7 2.5 8 7"/></svg>;
}

window.Sidebar = Sidebar;
