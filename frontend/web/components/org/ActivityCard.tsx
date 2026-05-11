import { IconCal, IconCheck, IconSettings, IconBell, IconUserAdd } from './icons';

const ACTIVITY: { color: string; icon: React.ReactNode; text: React.ReactNode; time: string }[] = [
  { color: 'var(--blue)',   icon: <IconCal s={12}/>,      text: <><b>Анна К.</b> добавила «День открытых дверей ИКИТ»</>,      time: '2 часа назад' },
  { color: 'var(--green)',  icon: <IconCheck s={12}/>,    text: <><b>Михаил С.</b> одобрил заявку на участие в Хакатоне</>,   time: '5 часов назад' },
  { color: 'var(--fg-3)',   icon: <IconSettings s={12}/>, text: <><b>Иван П.</b> изменил настройки организации</>,            time: 'вчера' },
  { color: 'var(--violet)', icon: <IconBell s={12}/>,     text: <>Опубликовано мероприятие «Встреча со студсоветом»</>,        time: 'вчера' },
  { color: 'var(--amber)',  icon: <IconUserAdd s={12}/>,  text: <>Приглашён новый редактор: <b>Дарья В.</b></>,                time: '3 дня назад' },
];

export function ActivityCard() {
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
            <div style={{
              width: 24, height: 24, borderRadius: 6,
              background: `color-mix(in oklab, ${a.color} 14%, transparent)`,
              color: a.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>{a.icon}</div>
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
