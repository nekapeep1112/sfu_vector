// Profile — consolidates notifications, applications, my events, settings
function ProfileScreen() {
  const [tab, setTab] = React.useState('Уведомления');
  const tabs = ['Уведомления', 'Мои заявки', 'Мои мероприятия', 'Настройки'];

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar active="profile" loggedIn={true}/>
        <main style={{ flex: 1, minWidth: 0 }}>
          <Topbar loggedIn={true}/>
          <div style={{ maxWidth: 1240, margin: '0 auto', padding: 32 }}>
            {/* Profile header */}
            <div className="card" style={{ padding: 32, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 24, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'var(--grad)', opacity: 0.1, filter: 'blur(40px)' }}/>
              <div style={{ width: 88, height: 88, borderRadius: 22, background: 'linear-gradient(135deg, #F5A524, #F25E5E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 28, color: 'white', flexShrink: 0 }}>ИП</div>
              <div className="col" style={{ flex: 1 }}>
                <h2 className="h2" style={{ margin: 0 }}>Иван Петров</h2>
                <div className="row gap-2" style={{ marginTop: 8 }}>
                  <span className="chip">ИКИТ · 3 курс</span>
                  <span className="chip">Общежитие №7</span>
                  <span className="chip" style={{ background: 'rgba(61,214,140,0.1)', borderColor: 'rgba(61,214,140,0.3)', color: 'var(--green)' }}>● На платформе с сентября 2024</span>
                </div>
              </div>
              <div className="row gap-2">
                <button className="btn btn-ghost btn-sm">Редактировать</button>
                <button className="btn btn-primary btn-sm">+ Подать заявку</button>
              </div>
            </div>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
              {[
                { v: 12, l: 'мероприятий посещено', c: 'var(--blue)' },
                { v: 3, l: 'организации', c: 'var(--violet)' },
                { v: 5, l: 'активные заявки', c: 'var(--amber)' },
                { v: 248, l: 'часов активности', c: 'var(--green)' },
              ].map((s, i) => (
                <div key={i} className="card" style={{ padding: 20 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.c, marginBottom: 12, boxShadow: `0 0 8px ${s.c}` }}/>
                  <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 6 }}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 4, padding: 4, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, marginBottom: 20, width: 'fit-content' }}>
              {tabs.map(t => (
                <button key={t} onClick={() => setTab(t)} style={{
                  padding: '10px 18px', borderRadius: 8,
                  background: tab === t ? 'var(--grad-soft)' : 'transparent',
                  border: '1px solid ' + (tab === t ? 'rgba(155,92,255,0.3)' : 'transparent'),
                  fontSize: 13, fontWeight: 500,
                  color: tab === t ? 'var(--fg)' : 'var(--fg-3)',
                  position: 'relative',
                }}>
                  {t}
                  {t === 'Уведомления' && <span style={{ marginLeft: 6, padding: '1px 6px', borderRadius: 6, background: 'var(--violet)', color: 'white', fontSize: 10, fontWeight: 700 }}>3</span>}
                </button>
              ))}
            </div>

            {tab === 'Уведомления' && <NotificationsList/>}
            {tab === 'Мои заявки' && <ApplicationsList/>}
            {tab === 'Мои мероприятия' && <MyEventsList/>}
            {tab === 'Настройки' && <SettingsPanel/>}
          </div>
          <Footer/>
        </main>
      </div>
    </div>
  );
}

function NotificationsList() {
  const items = [
    { type: 'success', title: 'Заявка одобрена', body: 'Волонтёрский центр СФУ принял твою заявку. Ждём на встрече 15 июня.', time: '2 ч назад', unread: true },
    { type: 'event', title: 'Скоро мероприятие', body: 'Хакатон Siberian Hack 2026 начинается через 3 дня. Не забудь подготовить документы.', time: 'Сегодня, 10:14', unread: true },
    { type: 'info', title: 'Новая организация в ИКИТ', body: 'Появился клуб «AI Lab». Возможно, тебе интересно — открыт набор.', time: 'Вчера', unread: true },
    { type: 'event', title: 'Изменение времени', body: 'Карьерный форум перенесён с 10:00 на 11:00.', time: '2 дня назад', unread: false },
    { type: 'success', title: 'Сертификат получен', body: 'За участие в фестивале «Студенческая весна» начислены 8 ч активности.', time: '5 дней назад', unread: false },
  ];
  const colorOf = { success: 'var(--green)', event: 'var(--violet)', info: 'var(--blue)' };
  return (
    <div className="col gap-2">
      {items.map((n, i) => (
        <div key={i} className="card card-hover" style={{ padding: 16, display: 'flex', gap: 14, alignItems: 'flex-start', opacity: n.unread ? 1 : 0.65, position: 'relative' }}>
          {n.unread && <div style={{ position: 'absolute', left: 8, top: 24, width: 4, height: 4, borderRadius: '50%', background: 'var(--violet)' }}/>}
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${colorOf[n.type]}20`, border: `1px solid ${colorOf[n.type]}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: colorOf[n.type], boxShadow: `0 0 6px ${colorOf[n.type]}` }}/>
          </div>
          <div className="col" style={{ flex: 1 }}>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{n.title}</div>
              <div style={{ fontSize: 11, color: 'var(--fg-4)' }}>{n.time}</div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--fg-3)', marginTop: 4, lineHeight: 1.5 }}>{n.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ApplicationsList() {
  const apps = [
    { org: 'Студенческий медиацентр', status: 'review', tag: 'На рассмотрении', date: '12 мая 2026' },
    { org: 'Волонтёрский центр СФУ', status: 'approved', tag: 'Одобрено', date: '8 мая 2026' },
    { org: 'Хакатон Siberian Hack 2026', status: 'registered', tag: 'Зарегистрирован', date: '6 мая 2026' },
    { org: 'Клуб робототехники', status: 'rejected', tag: 'Отклонено', date: '2 мая 2026' },
  ];
  const colors = { review: 'var(--amber)', approved: 'var(--green)', registered: 'var(--blue)', rejected: 'var(--red)' };
  return (
    <div className="col gap-2">
      {apps.map((a, i) => (
        <div key={i} className="card card-hover" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--surface-2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: 'var(--fg-2)' }}>{a.org.split(' ').slice(0,2).map(w => w[0]).join('')}</div>
          <div className="col" style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{a.org}</div>
            <div style={{ fontSize: 12, color: 'var(--fg-4)', marginTop: 2 }}>Заявка от {a.date}</div>
          </div>
          <span style={{ padding: '6px 12px', borderRadius: 8, background: `${colors[a.status]}20`, border: `1px solid ${colors[a.status]}40`, color: colors[a.status], fontSize: 12, fontWeight: 600 }}>{a.tag}</span>
          <button className="btn btn-ghost btn-sm">Открыть →</button>
        </div>
      ))}
    </div>
  );
}

function MyEventsList() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
      {EVENTS.slice(0, 4).map(e => (
        <div key={e.id} className="card card-hover" style={{ padding: 0, overflow: 'hidden' }}>
          <EventCover event={e} height={120}/>
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{e.title}</div>
            <div style={{ fontSize: 12, color: 'var(--fg-3)' }}>{e.date.d} {e.date.m} · {e.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SettingsPanel() {
  return (
    <div className="card" style={{ padding: 24 }}>
      <div className="col gap-5">
        <SettingRow label="Институт" value="ИКИТ — Институт космических и информационных технологий"/>
        <SettingRow label="Общежитие" value="Общежитие №7"/>
        <SettingRow label="Email" value="petrov.iv@sfu-kras.ru"/>
        <SettingRow label="Интересы" value="Образование, Карьера, Сообщество"/>
        <SettingRow label="Уведомления" value="Email + Telegram" toggle/>
      </div>
    </div>
  );
}
function SettingRow({ label, value }) {
  return (
    <div className="row" style={{ justifyContent: 'space-between', paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
      <div className="col">
        <div style={{ fontSize: 12, color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>{label}</div>
        <div style={{ fontSize: 14, color: 'var(--fg)', marginTop: 4 }}>{value}</div>
      </div>
      <button className="btn btn-ghost btn-sm">Изменить</button>
    </div>
  );
}

window.ProfileScreen = ProfileScreen;
