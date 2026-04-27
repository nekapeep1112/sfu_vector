import { EVENTS } from '@/lib/mock-data';
import { EventCover } from '../EventCover';

type NotifType = 'success' | 'event' | 'info';

export function NotificationsList() {
  const items: { type: NotifType; title: string; body: string; time: string; unread: boolean }[] = [
    { type: 'success', title: 'Заявка одобрена', body: 'Волонтёрский центр СФУ принял твою заявку. Ждём на встрече 15 июня.', time: '2 ч назад', unread: true },
    { type: 'event', title: 'Скоро мероприятие', body: 'Хакатон Siberian Hack 2026 начинается через 3 дня. Не забудь подготовить документы.', time: 'Сегодня, 10:14', unread: true },
    { type: 'info', title: 'Новая организация в ИКИТ', body: 'Появился клуб «AI Lab». Возможно, тебе интересно — открыт набор.', time: 'Вчера', unread: true },
    { type: 'event', title: 'Изменение времени', body: 'Карьерный форум перенесён с 10:00 на 11:00.', time: '2 дня назад', unread: false },
    { type: 'success', title: 'Сертификат получен', body: 'За участие в фестивале «Студенческая весна» начислены 8 ч активности.', time: '5 дней назад', unread: false },
  ];
  const colorOf: Record<NotifType, string> = { success: 'var(--green)', event: 'var(--violet)', info: 'var(--blue)' };
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

type AppStatus = 'review' | 'approved' | 'registered' | 'rejected';

export function ApplicationsList() {
  const apps: { org: string; status: AppStatus; tag: string; date: string }[] = [
    { org: 'Студенческий медиацентр', status: 'review', tag: 'На рассмотрении', date: '12 мая 2026' },
    { org: 'Волонтёрский центр СФУ', status: 'approved', tag: 'Одобрено', date: '8 мая 2026' },
    { org: 'Хакатон Siberian Hack 2026', status: 'registered', tag: 'Зарегистрирован', date: '6 мая 2026' },
    { org: 'Клуб робототехники', status: 'rejected', tag: 'Отклонено', date: '2 мая 2026' },
  ];
  const colors: Record<AppStatus, string> = { review: 'var(--amber)', approved: 'var(--green)', registered: 'var(--blue)', rejected: 'var(--red)' };
  return (
    <div className="col gap-2">
      {apps.map((a, i) => (
        <div key={i} className="card card-hover" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--surface-2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: 'var(--fg-2)' }}>{a.org.split(' ').slice(0, 2).map(w => w[0]).join('')}</div>
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

export function MyEventsList() {
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

export function SettingsPanel() {
  return (
    <div className="card" style={{ padding: 24 }}>
      <div className="col gap-5">
        <SettingRow label="Институт" value="ИКИТ — Институт космических и информационных технологий"/>
        <SettingRow label="Общежитие" value="Общежитие №7"/>
        <SettingRow label="Email" value="petrov.iv@sfu-kras.ru"/>
        <SettingRow label="Интересы" value="Образование, Карьера, Сообщество"/>
        <SettingRow label="Уведомления" value="Email + Telegram"/>
      </div>
    </div>
  );
}

function SettingRow({ label, value }: { label: string; value: string }) {
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
