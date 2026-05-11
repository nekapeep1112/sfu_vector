// Real SFU institutes (20). Abbreviations + full names.
const INSTITUTES = [
  { abbr: 'ИКИТ',   name: 'Институт космических и информационных технологий', recruiting: true,  color: '#4F7FFF' },
  { abbr: 'ИСИ',    name: 'Инженерно-строительный институт',                  recruiting: true,  color: '#9B5CFF' },
  { abbr: 'ИНиГ',   name: 'Институт нефти и газа',                            recruiting: false, color: '#3DD68C' },
  { abbr: 'ИЦМиМ',  name: 'Институт цветных металлов и материаловедения',     recruiting: true,  color: '#F5A524' },
  { abbr: 'ИГДГГ',  name: 'Институт горного дела, геологии и геотехнологий',  recruiting: false, color: '#F25E5E' },
  { abbr: 'ПИ',     name: 'Политехнический институт',                         recruiting: true,  color: '#4F7FFF' },
  { abbr: 'ИИФиРЭ', name: 'Институт инженерной физики и радиоэлектроники',    recruiting: true,  color: '#9B5CFF' },
  { abbr: 'ИФБиБТ', name: 'Институт фундаментальной биологии и биотехнологии', recruiting: false, color: '#3DD68C' },
  { abbr: 'ИМиФИ',  name: 'Институт математики и фундаментальной информатики', recruiting: true,  color: '#F5A524' },
  { abbr: 'ИЭГиСТ', name: 'Институт экологии, географии и социальных технологий', recruiting: false, color: '#F25E5E' },
  { abbr: 'ИЭУиП',  name: 'Институт экономики, управления и природопользования', recruiting: true, color: '#4F7FFF' },
  { abbr: 'ЮИ',     name: 'Юридический институт',                             recruiting: true,  color: '#9B5CFF' },
  { abbr: 'ГИ',     name: 'Гуманитарный институт',                            recruiting: false, color: '#3DD68C' },
  { abbr: 'ИФиЯК',  name: 'Институт филологии и языковой коммуникации',       recruiting: true,  color: '#F5A524' },
  { abbr: 'ИППС',   name: 'Институт педагогики, психологии и социологии',     recruiting: true,  color: '#F25E5E' },
  { abbr: 'ИФКСиТ', name: 'Институт физической культуры, спорта и туризма',   recruiting: true,  color: '#4F7FFF' },
  { abbr: 'ИИ',     name: 'Институт искусств им. Хворостовского',             recruiting: false, color: '#9B5CFF' },
  { abbr: 'ИУБПЭ',  name: 'Институт управления бизнес-процессами',            recruiting: true,  color: '#3DD68C' },
  { abbr: 'ИАиД',   name: 'Институт архитектуры и дизайна',                   recruiting: true,  color: '#F5A524' },
  { abbr: 'ВИИ',    name: 'Военно-инженерный институт',                       recruiting: false, color: '#F25E5E' },
];

window.INSTITUTES = INSTITUTES;

// Sample events
const EVENT_TYPES = {
  educational:   { label: 'Образование',   color: '#9B5CFF', bg: 'rgba(155,92,255,0.15)' },
  career:        { label: 'Карьера',       color: '#4F7FFF', bg: 'rgba(79,127,255,0.15)' },
  community:     { label: 'Сообщество',    color: '#3DD68C', bg: 'rgba(61,214,140,0.15)' },
  entertainment: { label: 'Развлечения',   color: '#F5A524', bg: 'rgba(245,165,36,0.15)' },
  sport:         { label: 'Спорт',         color: '#F25E5E', bg: 'rgba(242,94,94,0.15)' },
};
window.EVENT_TYPES = EVENT_TYPES;

const EVENTS = [
  { id: 1, type: 'educational', title: 'Хакатон Siberian Hack 2026', date: { d: 20, m: 'мая', wd: 'Вт' }, time: '14:00', duration: '2 дня', loc: 'Библиотека СФУ, ауд. 5-08', registered: 47, capacity: 200, format: 'Очно', org: 'ИКИТ, Профсоюз' },
  { id: 2, type: 'entertainment', title: 'Фестиваль «Студенческая весна»', date: { d: 30, m: 'мая', wd: 'Пт' }, time: '18:00', duration: '3 ч', loc: 'Дом культуры СФУ', registered: 247, capacity: 500, format: 'Очно', org: 'Студсовет СФУ' },
  { id: 3, type: 'career', title: 'Карьерный форум «Карьера будущего»', date: { d: 5, m: 'июн', wd: 'Чт' }, time: '11:00', duration: '1 день', loc: 'Конгресс-холл СФУ', registered: 156, capacity: 400, format: 'Гибрид', org: 'Центр карьеры' },
  { id: 4, type: 'community', title: 'Эко-акция «Зелёный университет»', date: { d: 12, m: 'июн', wd: 'Пт' }, time: '10:00', duration: '4 ч', loc: 'Парк «Гремячая грива»', registered: 73, capacity: 150, format: 'Очно', org: 'Волонтёрский центр' },
  { id: 5, type: 'sport',  title: 'Турнир по баскетболу 3×3', date: { d: 15, m: 'июн', wd: 'Пн' }, time: '17:00', duration: '3 ч', loc: 'СК «Радуга»', registered: 32, capacity: 64, format: 'Очно', org: 'Спорт СФУ' },
  { id: 6, type: 'educational', title: 'Мастер-класс «AI в науке»', date: { d: 18, m: 'июн', wd: 'Чт' }, time: '15:00', duration: '2 ч', loc: 'Онлайн', registered: 4, capacity: 100, format: 'Онлайн', org: 'ИМиФИ' },
];
window.EVENTS = EVENTS;

// Generated cover for an event — gradient + title (no stock photos per brief)
function EventCover({ event, height = 160 }) {
  const t = EVENT_TYPES[event.type];
  const initials = event.title.split(' ').filter(w => w.length > 2).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  return (
    <div style={{
      height,
      borderRadius: 12,
      background: `linear-gradient(135deg, ${t.color} 0%, ${tonalShift(t.color)} 100%)`,
      position: 'relative',
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      {/* subtle pattern */}
      <svg width="100%" height="100%" viewBox="0 0 200 160" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, opacity: 0.18 }}>
        <defs>
          <pattern id={`p-${event.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M0 20 L20 0" stroke="white" strokeWidth="0.5" fill="none"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#p-${event.id})`}/>
      </svg>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.5) 100%)' }} />
      <div style={{ position: 'absolute', top: 14, left: 14, right: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{
          padding: '4px 10px', borderRadius: 999,
          background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)',
          fontSize: 11, fontWeight: 600, color: 'white',
          border: '1px solid rgba(255,255,255,0.2)',
        }}>{t.label}</div>
        <div style={{ fontSize: 56, fontWeight: 800, color: 'rgba(255,255,255,0.18)', letterSpacing: '-0.04em', lineHeight: 1, fontFamily: 'Manrope' }}>{initials}</div>
      </div>
      <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14, fontSize: 15, fontWeight: 700, color: 'white', lineHeight: 1.2, letterSpacing: '-0.005em' }}>
        {event.title}
      </div>
    </div>
  );
}

function tonalShift(hex) {
  // shift hue darker
  const hexes = { '#9B5CFF': '#5C2FB8', '#4F7FFF': '#2F4FB8', '#3DD68C': '#1F8E58', '#F5A524': '#A8651A', '#F25E5E': '#9C2F2F' };
  return hexes[hex] || hex;
}

window.EventCover = EventCover;
window.tonalShift = tonalShift;

// Status pill — capacity bar
function CapacityBar({ registered, capacity, color }) {
  const pct = Math.min(100, (registered / capacity) * 100);
  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
        <span style={{ color: 'var(--fg-2)', fontWeight: 600 }}>{registered} из {capacity} мест</span>
        <span style={{ color: 'var(--fg-4)' }}>{Math.round(pct)}%</span>
      </div>
      <div style={{ height: 4, background: 'var(--border)', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 999, transition: 'width .3s' }} />
      </div>
    </div>
  );
}
window.CapacityBar = CapacityBar;

// Avatar stack (only when ≥5 registered)
function AvatarStack({ count }) {
  if (count < 5) return null;
  const colors = ['#F5A524', '#3DD68C', '#4F7FFF', '#9B5CFF', '#F25E5E'];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ display: 'flex' }}>
        {colors.slice(0, 4).map((c, i) => (
          <div key={i} style={{
            width: 26, height: 26, borderRadius: '50%',
            background: `linear-gradient(135deg, ${c}, ${tonalShift(c) || c})`,
            border: '2px solid var(--surface)',
            marginLeft: i ? -8 : 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 9, fontWeight: 700, color: 'white',
          }}>{['АК','МС','ДВ','ЕП'][i]}</div>
        ))}
        <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--surface-3)', border: '2px solid var(--surface)', marginLeft: -8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: 'var(--fg-2)' }}>+{count - 4}</div>
      </div>
      <span style={{ fontSize: 12, color: 'var(--fg-3)' }}>уже идут</span>
    </div>
  );
}
window.AvatarStack = AvatarStack;

// Organizations user belongs to / can switch into
const ORGANIZATIONS = [
  { id: 'studsovet-ikit', name: 'Студсовет ИКИТ',          short: 'СС', color: '#4F7FFF', verified: true, role: 'owner',  members: 12 },
  { id: 'volunteer-sfu',  name: 'Волонтёрский центр СФУ',  short: 'ВЦ', color: '#3DD68C', verified: true, role: 'editor', members: 47 },
  { id: 'media-center',   name: 'Студенческий медиацентр', short: 'МД', color: '#9B5CFF', verified: true, role: 'editor', members: 24 },
];
window.ORGANIZATIONS = ORGANIZATIONS;

const CURRENT_USER = {
  name: 'Иван Петров',
  initials: 'ИП',
  institute: 'ИКИТ',
  course: 3,
  avatarGrad: 'linear-gradient(135deg, #F5A524, #F25E5E)',
  memberships: ['studsovet-ikit', 'volunteer-sfu', 'media-center'],
};
window.CURRENT_USER = CURRENT_USER;
