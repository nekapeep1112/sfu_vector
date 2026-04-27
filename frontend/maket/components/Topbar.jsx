function Topbar({ loggedIn = false, search = true }) {
  return (
    <header style={{
      height: 64,
      borderBottom: '1px solid var(--border)',
      padding: '0 32px',
      display: 'flex', alignItems: 'center', gap: 24,
      background: 'var(--surface)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      {search && (
        <div style={{ flex: 1, maxWidth: 520, position: 'relative' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--fg-4)' }}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          <input className="input" placeholder="Поиск по организациям, мероприятиям, возможностям…" style={{ paddingLeft: 40, height: 40, padding: '0 14px 0 40px' }} />
          <kbd style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'var(--fg-4)', padding: '2px 6px', border: '1px solid var(--border)', borderRadius: 4, background: 'var(--bg)' }}>⌘K</kbd>
        </div>
      )}
      <div style={{ flex: 1 }} />
      <div className="row gap-3">
        {loggedIn ? (
          <>
            <button style={{ width: 40, height: 40, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10 21a2 2 0 0 0 4 0"/></svg>
              <span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: '50%', background: 'var(--violet)', border: '2px solid var(--bg-2)' }} />
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 14px 6px 6px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface)' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #F5A524, #F25E5E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 11, color: 'white' }}>ИП</div>
              <div className="col" style={{ alignItems: 'flex-start' }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Иван Петров</span>
                <span style={{ fontSize: 11, color: 'var(--fg-4)' }}>Студент · ИКИТ</span>
              </div>
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-ghost btn-sm">Войти</button>
            <button className="btn btn-primary btn-sm">Регистрация</button>
          </>
        )}
      </div>
    </header>
  );
}

window.Topbar = Topbar;
