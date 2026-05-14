// Real SFU institutes (20). Abbreviations + full names.
export const INSTITUTES = [
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
] as const;

export type Institute = typeof INSTITUTES[number];

export const EVENT_TYPES = {
  educational:   { label: 'Образование',   color: '#9B5CFF', bg: 'rgba(155,92,255,0.15)' },
  career:        { label: 'Карьера',       color: '#4F7FFF', bg: 'rgba(79,127,255,0.15)' },
  community:     { label: 'Сообщество',    color: '#3DD68C', bg: 'rgba(61,214,140,0.15)' },
  entertainment: { label: 'Развлечения',   color: '#F5A524', bg: 'rgba(245,165,36,0.15)' },
  sport:         { label: 'Спорт',         color: '#F25E5E', bg: 'rgba(242,94,94,0.15)' },
} as const;

export type EventType = keyof typeof EVENT_TYPES;

export interface InterestOption {
  id: string;
  label: string;
  color: string;
}

export const INTEREST_OPTIONS: InterestOption[] = [
  { id: 'education',     label: 'Образование',  color: '#3DD68C' },
  { id: 'career',        label: 'Карьера',      color: '#4F7FFF' },
  { id: 'community',     label: 'Сообщество',   color: '#9B5CFF' },
  { id: 'sport',         label: 'Спорт',        color: '#F5A524' },
  { id: 'science',       label: 'Наука',        color: '#3B82F6' },
  { id: 'entertainment', label: 'Развлечения',  color: '#EC4899' },
  { id: 'volunteering',  label: 'Волонтёрство', color: '#10B981' },
  { id: 'media',         label: 'Медиа',        color: '#8B5CF6' },
  { id: 'culture',       label: 'Культура',     color: '#F59E0B' },
];

export interface EventItem {
  id: number;
  type: EventType;
  title: string;
  date: { d: number; m: string; wd: string };
  time: string;
  duration: string;
  loc: string;
  registered: number;
  capacity: number;
  format: string;
  org: string;
  myStatus?: 'registered' | 'pending' | null;
}

export const EVENTS: EventItem[] = [
  { id: 1, type: 'educational', title: 'Хакатон Siberian Hack 2026', date: { d: 20, m: 'мая', wd: 'Вт' }, time: '14:00', duration: '2 дня', loc: 'Библиотека СФУ, ауд. 5-08', registered: 47, capacity: 200, format: 'Очно', org: 'ИКИТ, Профсоюз', myStatus: 'registered' },
  { id: 2, type: 'entertainment', title: 'Фестиваль «Студенческая весна»', date: { d: 30, m: 'мая', wd: 'Пт' }, time: '18:00', duration: '3 ч', loc: 'Дом культуры СФУ', registered: 247, capacity: 500, format: 'Очно', org: 'Студсовет СФУ' },
  { id: 3, type: 'career', title: 'Карьерный форум «Карьера будущего»', date: { d: 5, m: 'июн', wd: 'Чт' }, time: '11:00', duration: '1 день', loc: 'Конгресс-холл СФУ', registered: 156, capacity: 400, format: 'Гибрид', org: 'Центр карьеры' },
  { id: 4, type: 'community', title: 'Эко-акция «Зелёный университет»', date: { d: 12, m: 'июн', wd: 'Пт' }, time: '10:00', duration: '4 ч', loc: 'Парк «Гремячая грива»', registered: 73, capacity: 150, format: 'Очно', org: 'Волонтёрский центр' },
  { id: 5, type: 'sport',  title: 'Турнир по баскетболу 3×3', date: { d: 15, m: 'июн', wd: 'Пн' }, time: '17:00', duration: '3 ч', loc: 'СК «Радуга»', registered: 32, capacity: 64, format: 'Очно', org: 'Спорт СФУ' },
  { id: 6, type: 'educational', title: 'Мастер-класс «AI в науке»', date: { d: 18, m: 'июн', wd: 'Чт' }, time: '15:00', duration: '2 ч', loc: 'Онлайн', registered: 4, capacity: 100, format: 'Онлайн', org: 'ИМиФИ' },
];

// Campus dorms — stylized layout, not geographically accurate.
// Three clusters reflect real СФУ campus zones (Свободный 76, Свободный 79-82, Якорный).
export type DormType = 'classic' | 'apartment' | 'premium';
export type DormZoneId = 'sv76' | 'center' | 'east';

export interface Dorm {
  num: number;
  addr: string;
  zone: DormZoneId;
  type: DormType;
  capacity: number;
  occupied: number;
  /** stylized 0..880, 0..540 */
  x: number;
  y: number;
  /** building footprint in svg units */
  w: number;
  h: number;
  /** stylized stories — affects icon size in legend */
  floors: number;
}

export const DORM_ZONES: { id: DormZoneId; label: string; tag: string; color: string }[] = [
  { id: 'sv76',   label: 'Свободный, 76',     tag: 'Северный кампус', color: '#4F7FFF' },
  { id: 'center', label: 'Свободный, 79–82',  tag: 'Центральный',     color: '#9B5CFF' },
  { id: 'east',   label: 'Якорный',           tag: 'Восточный',       color: '#3DD68C' },
];

export const DORMS: Dorm[] = [
  // ── Северный (Свободный, 76) ───────────────────────────────
  { num: 14, addr: 'пр. Свободный, 76',   zone: 'sv76',   type: 'classic',   capacity: 480, occupied: 432, x:  90, y:  90, w: 110, h: 60, floors: 9 },
  { num: 15, addr: 'пер. Якорный, 4',     zone: 'sv76',   type: 'classic',   capacity: 520, occupied: 380, x: 230, y:  70, w:  90, h: 50, floors: 9 },
  { num: 18, addr: 'пр. Свободный, 76А',  zone: 'sv76',   type: 'classic',   capacity: 600, occupied: 590, x:  70, y: 180, w: 130, h: 64, floors: 12 },
  { num: 20, addr: 'пр. Свободный, 76Г',  zone: 'sv76',   type: 'apartment', capacity: 540, occupied: 410, x: 220, y: 170, w: 100, h: 70, floors: 14 },
  { num: 22, addr: 'пр. Свободный, 76Д',  zone: 'sv76',   type: 'premium',   capacity: 320, occupied: 240, x: 100, y: 280, w: 100, h: 90, floors: 16 },
  { num: 26, addr: 'пр. Свободный, 76Е',  zone: 'sv76',   type: 'apartment', capacity: 460, occupied: 460, x: 230, y: 290, w:  95, h: 72, floors: 12 },

  // ── Центральный (Свободный, 79–82) ─────────────────────────
  { num:  2, addr: 'пр. Свободный, 81',   zone: 'center', type: 'classic',   capacity: 410, occupied: 390, x: 410, y: 100, w: 100, h: 56, floors: 9 },
  { num: 17, addr: 'пр. Свободный, 80',   zone: 'center', type: 'classic',   capacity: 380, occupied: 320, x: 400, y: 200, w:  90, h: 54, floors: 9 },
  { num: 21, addr: 'пр. Свободный, 79',   zone: 'center', type: 'apartment', capacity: 510, occupied: 480, x: 410, y: 300, w: 110, h: 64, floors: 11 },

  // ── Восточный (Якорный / Студгородок №1) ───────────────────
  { num:  1, addr: 'ул. Киренского, 2',   zone: 'east',   type: 'classic',   capacity: 360, occupied: 340, x: 600, y:  90, w:  95, h: 56, floors: 9 },
  { num:  3, addr: 'ул. Ладо Кецховели',  zone: 'east',   type: 'classic',   capacity: 420, occupied: 380, x: 720, y:  85, w:  90, h: 52, floors: 9 },
  { num:  7, addr: 'пр. Свободный, 82А',  zone: 'east',   type: 'classic',   capacity: 450, occupied: 410, x: 600, y: 200, w: 110, h: 60, floors: 9 },
  { num: 24, addr: 'ул. Борисова, 18',    zone: 'east',   type: 'apartment', capacity: 580, occupied: 470, x: 730, y: 190, w: 100, h: 76, floors: 14 },
  { num: 27, addr: 'ул. Дубенского, 4',   zone: 'east',   type: 'premium',   capacity: 300, occupied: 220, x: 620, y: 320, w:  90, h: 84, floors: 16 },
];

export const DORM_TYPE_LABEL: Record<DormType, { label: string; color: string }> = {
  classic:   { label: 'Классический',  color: '#4F7FFF' },
  apartment: { label: 'Квартирный',    color: '#9B5CFF' },
  premium:   { label: 'Премиум',       color: '#F5A524' },
};

export function tonalShift(hex: string): string {
  const hexes: Record<string, string> = {
    '#9B5CFF': '#5C2FB8',
    '#4F7FFF': '#2F4FB8',
    '#3DD68C': '#1F8E58',
    '#F5A524': '#A8651A',
    '#F25E5E': '#9C2F2F',
  };
  return hexes[hex] || hex;
}

export type OrgRole = 'owner' | 'editor' | 'viewer';

export interface Organization {
  id: number;
  name: string;
  short: string;
  color: string;
  verified: boolean;
  role: OrgRole;
  members: number;
}

export const ORGANIZATIONS: Organization[] = [
  { id: 1, name: 'Студсовет ИКИТ',          short: 'СС', color: '#4F7FFF', verified: true, role: 'owner',  members: 12 },
  { id: 2, name: 'Волонтёрский центр СФУ',  short: 'ВЦ', color: '#3DD68C', verified: true, role: 'editor', members: 47 },
  { id: 3, name: 'Студенческий медиацентр', short: 'МД', color: '#9B5CFF', verified: true, role: 'editor', members: 24 },
];

export interface CurrentUser {
  name: string;
  initials: string;
  email: string;
  institute: string;
  course: number;
  avatarGrad: string;
  memberships: number[];
  handle: string;
  interests: string[];
}

export const CURRENT_USER: CurrentUser = {
  name: 'Иван Петров',
  initials: 'ИП',
  email: 'petrov.iv@sfu-kras.ru',
  institute: 'ИКИТ',
  course: 3,
  avatarGrad: 'linear-gradient(135deg, #F5A524, #F25E5E)',
  memberships: [1, 2, 3],
  handle: 'ip_2024',
  interests: ['education', 'career', 'community'],
};

export type ApplicationStatus = 'pending' | 'auto' | 'rejected' | 'approved';

export interface Application {
  id: number;
  name: string;
  handle: string;
  meta: string;
  grad: [string, string];
  event: string;
  eventType: EventType;
  when: string;
  status: ApplicationStatus;
}

export const APPLICATIONS: Application[] = [
  { id: 1,  name: 'Анна Кузнецова',  handle: '@anna_k',      meta: 'ИКИТ · 3 курс',   grad: ['#2563EB', '#1E40AF'], event: 'Хакатон Siberian Hack 2026', eventType: 'educational', when: '2 ч назад',     status: 'pending' },
  { id: 2,  name: 'Михаил Соколов',  handle: '@msokolov',    meta: 'ИКИТ · 2 курс',   grad: ['#7C3AED', '#5B21B6'], event: 'Хакатон Siberian Hack 2026', eventType: 'educational', when: '3 ч назад',     status: 'pending' },
  { id: 3,  name: 'Дарья Волкова',   handle: '@daryav',      meta: 'ИКИТ · 3 курс',   grad: ['#059669', '#047857'], event: 'Хакатон Siberian Hack 2026', eventType: 'educational', when: '5 ч назад',     status: 'pending' },
  { id: 4,  name: 'Егор Павлов',     handle: '@egor.p',      meta: 'ИКИТ · 1 курс',   grad: ['#DC2626', '#991B1B'], event: 'Хакатон Siberian Hack 2026', eventType: 'educational', when: 'вчера',         status: 'pending' },
  { id: 5,  name: 'Илья Громов',     handle: '@ilya_g',      meta: 'ИФКСиТ · 2 курс', grad: ['#F5A524', '#A8651A'], event: 'Хакатон Siberian Hack 2026', eventType: 'educational', when: 'вчера',         status: 'pending' },
  { id: 6,  name: 'Полина Лебедева', handle: '@p.lebedeva',  meta: 'ИФиЯК · 4 курс',  grad: ['#2563EB', '#1E40AF'], event: 'Хакатон Siberian Hack 2026', eventType: 'educational', when: '2 дня назад',   status: 'pending' },
  { id: 7,  name: 'Никита Орлов',    handle: '@norlov',      meta: 'ИМиФИ · 3 курс',  grad: ['#7C3AED', '#5B21B6'], event: 'Хакатон Siberian Hack 2026', eventType: 'educational', when: '3 дня назад',   status: 'pending' },
  { id: 8,  name: 'Елена Семёнова',  handle: '@e.semenova',  meta: 'ИКИТ · 2 курс',   grad: ['#059669', '#047857'], event: 'Встреча со студсоветом',     eventType: 'community',   when: 'сегодня 10:14', status: 'auto' },
  { id: 9,  name: 'Артём Беляев',    handle: '@a.belyaev',   meta: 'ИУБПЭ · 4 курс',  grad: ['#F5A524', '#A8651A'], event: 'День открытых дверей ИКИТ',  eventType: 'career',      when: 'вчера',         status: 'auto' },
  { id: 10, name: 'Олеся Тимофеева', handle: '@o.timofeeva', meta: 'ИКИТ · 2 курс',   grad: ['#DC2626', '#991B1B'], event: 'Хакатон Siberian Hack 2026', eventType: 'educational', when: '4 дня назад',   status: 'rejected' },
];

export type OrgEventStatus = 'published' | 'draft' | 'pending' | 'done';

export interface OrgEvent {
  id: number;
  date: { d: number; m: string };
  title: string;
  loc: string;
  time: string;
  type: EventType;
  reg: number;
  cap: number;
  status: OrgEventStatus;
}

export const ORG_EVENTS: OrgEvent[] = [
  { id: 1, date: { d: 20, m: 'мая' }, title: 'Хакатон Siberian Hack 2026', loc: 'Библиотека, ауд. 5-08', time: '14:00', type: 'educational', reg: 47, cap: 200, status: 'published' },
  { id: 2, date: { d: 22, m: 'мая' }, title: 'Встреча со студсоветом',     loc: 'Конференц-зал, 3 этаж', time: '17:00', type: 'community',   reg: 12, cap: 30,  status: 'published' },
  { id: 3, date: { d: 28, m: 'мая' }, title: 'День открытых дверей ИКИТ',  loc: 'Главный холл',          time: '11:00', type: 'career',      reg: 89, cap: 150, status: 'published' },
  { id: 4, date: { d: 1,  m: 'июн' }, title: 'Лекция «ИИ в IT-карьере»',   loc: 'Ауд. 4-04',             time: '15:00', type: 'educational', reg: 0,  cap: 80,  status: 'draft' },
  { id: 5, date: { d: 8,  m: 'июн' }, title: 'Турнир по киберспорту',      loc: 'СК «Радуга»',           time: '12:00', type: 'sport',       reg: 23, cap: 64,  status: 'pending' },
];

export interface TeamMember {
  ini: string;
  name: string;
  sub: string;
  grad: string;
  role: OrgRole;
}

export const TEAM: TeamMember[] = [
  { ini: 'ИП', name: 'Иван Петров',    sub: 'ИКИТ · 3 курс', grad: 'linear-gradient(135deg, #F5A524, #F25E5E)', role: 'owner' },
  { ini: 'АК', name: 'Анна Кузнецова', sub: 'ИКИТ · 4 курс', grad: 'linear-gradient(135deg, #2563EB, #1E40AF)', role: 'owner' },
  { ini: 'МС', name: 'Михаил Соколов', sub: 'ИКИТ · 2 курс', grad: 'linear-gradient(135deg, #7C3AED, #5B21B6)', role: 'editor' },
  { ini: 'ДВ', name: 'Дарья Волкова',  sub: 'ИКИТ · 3 курс', grad: 'linear-gradient(135deg, #059669, #047857)', role: 'editor' },
  { ini: 'ЕП', name: 'Егор Павлов',    sub: 'ИКИТ · 1 курс', grad: 'linear-gradient(135deg, #DC2626, #991B1B)', role: 'editor' },
];
