import { Logo } from './Logo';

export function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '40px 32px 32px',
      background: 'var(--bg-2)',
      marginTop: 48,
    }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1.4fr', gap: 40 }}>
        <div>
          <Logo />
          <p style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.6, marginTop: 16, maxWidth: 280 }}>
            Платформа для студентов Сибирского федерального университета. 20 институтов, 30 общежитий, одно сообщество.
          </p>
          <div className="row gap-2" style={{ marginTop: 16 }}>
            {['VK', 'TG', 'YT', 'RT'].map(s => (
              <a key={s} href="#" style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'var(--fg-3)' }}>{s}</a>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-4)', marginBottom: 16 }}>Платформа</div>
          <div className="col gap-3">
            {['Главная','Организации','Мероприятия','Карта институтов','Общежития'].map(l => (
              <a key={l} href="#" style={{ fontSize: 13, color: 'var(--fg-2)' }}>{l}</a>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-4)', marginBottom: 16 }}>Поддержка</div>
          <div className="col gap-3">
            {['Помощь','Контакты','Правила','Конфиденциальность','Сайт СФУ'].map(l => (
              <a key={l} href="#" style={{ fontSize: 13, color: 'var(--fg-2)' }}>{l}</a>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-4)', marginBottom: 16 }}>Подписка на дайджест</div>
          <p style={{ fontSize: 12, color: 'var(--fg-3)', lineHeight: 1.5, marginBottom: 12 }}>Лучшие возможности недели — раз в неделю в почту.</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <input className="input" placeholder="email@sfu-kras.ru" style={{ flex: 1, fontSize: 13 }}/>
            <button className="btn btn-primary btn-sm">→</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1440, margin: '32px auto 0', paddingTop: 24, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: 'var(--fg-4)' }}>
        <div>© СФУ.Вектор, 2024–2026 · Все права защищены</div>
        <div className="row gap-4">
          <span>v0.4.0-beta</span>
          <span>Красноярск, Россия</span>
        </div>
      </div>
    </footer>
  );
}
