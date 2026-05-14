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

export type FieldType = 'short_text' | 'long_text' | 'radio' | 'checkbox' | 'email';

export interface ApplicationQuestion {
  id: string;
  type: FieldType;
  label: string;
  hint?: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
  maxLength?: number;
}

export interface ApplicationAnswer {
  questionId: string;
  questionLabel: string;
  questionType: FieldType;
  value: string | string[];
}

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
  registrationMode?: 'open' | 'application';
  applicationQuestions?: ApplicationQuestion[];
}

const HACKATHON_QUESTIONS: ApplicationQuestion[] = [
  { id: 'q1', type: 'long_text', label: 'Опиши свой опыт участия в хакатонах', hint: 'Расскажи где участвовал, какие места занимал. Можно списком.', required: true, maxLength: 500 },
  { id: 'q2', type: 'radio', label: 'Выбери трек', hint: 'Один из 4 на выбор', required: true, options: ['Студенческая жизнь', 'Учебный процесс и расписание', 'Кампус и инфраструктура', 'Открытые данные СФУ'] },
  { id: 'q3', type: 'radio', label: 'Собрана ли команда?', required: true, options: ['Да, есть команда', 'Нет, ищу команду на месте'] },
  { id: 'q4', type: 'short_text', label: 'Ссылка на GitHub или портфолио', hint: 'Необязательно. Если есть — поможет команде понять твой уровень', required: false, placeholder: 'https://github.com/...' },
];

export const EVENTS: EventItem[] = [
  { id: 1, type: 'educational', title: 'Хакатон Siberian Hack 2026', date: { d: 20, m: 'мая', wd: 'Вт' }, time: '14:00', duration: '2 дня', loc: 'Библиотека СФУ, ауд. 5-08', registered: 47, capacity: 200, format: 'Очно', org: 'ИКИТ, Профсоюз', myStatus: 'registered', registrationMode: 'application', applicationQuestions: HACKATHON_QUESTIONS },
  { id: 2, type: 'entertainment', title: 'Фестиваль «Студенческая весна»', date: { d: 30, m: 'мая', wd: 'Пт' }, time: '18:00', duration: '3 ч', loc: 'Дом культуры СФУ', registered: 247, capacity: 500, format: 'Очно', org: 'Студсовет СФУ' },
  { id: 3, type: 'career', title: 'Карьерный форум «Карьера будущего»', date: { d: 5, m: 'июн', wd: 'Чт' }, time: '11:00', duration: '1 день', loc: 'Конгресс-холл СФУ', registered: 156, capacity: 400, format: 'Гибрид', org: 'Центр карьеры' },
  { id: 4, type: 'community', title: 'Эко-акция «Зелёный университет»', date: { d: 12, m: 'июн', wd: 'Пт' }, time: '10:00', duration: '4 ч', loc: 'Парк «Гремячая грива»', registered: 73, capacity: 150, format: 'Очно', org: 'Волонтёрский центр' },
  { id: 5, type: 'sport',  title: 'Турнир по баскетболу 3×3', date: { d: 15, m: 'июн', wd: 'Пн' }, time: '17:00', duration: '3 ч', loc: 'СК «Радуга»', registered: 32, capacity: 64, format: 'Очно', org: 'Спорт СФУ' },
  { id: 6, type: 'educational', title: 'Мастер-класс «AI в науке»', date: { d: 18, m: 'июн', wd: 'Чт' }, time: '15:00', duration: '2 ч', loc: 'Онлайн', registered: 4, capacity: 100, format: 'Онлайн', org: 'ИМиФИ' },
];

// Dormitories — flat catalog. Real СФУ dormitories spread across Krasnoyarsk.
export interface Dormitory {
  number: number;
  address: string;
}

export const DORMITORIES: Dormitory[] = [
  { number:  1, address: 'пр. Свободный, 76' },
  { number:  2, address: 'ул. Маерчака, 6' },
  { number:  3, address: 'пр. Свободный, 76А' },
  { number:  4, address: 'ул. Маерчака, 8' },
  { number:  5, address: 'ул. Маерчака, 10' },
  { number:  6, address: 'ул. Киренского, 26' },
  { number:  7, address: 'пр. Свободный, 76Б' },
  { number:  8, address: 'ул. Киренского, 28' },
  { number:  9, address: 'ул. Борисова, 12' },
  { number: 10, address: 'ул. Борисова, 14' },
  { number: 11, address: 'ул. Борисова, 16' },
  { number: 12, address: 'ул. Борисова, 18' },
  { number: 13, address: 'ул. Лесная, 41' },
  { number: 14, address: 'пр. Свободный, 76В' },
  { number: 15, address: 'пр. Свободный, 76Г' },
  { number: 16, address: 'ул. Лесная, 43' },
  { number: 17, address: 'пр. Свободный, 76Д' },
  { number: 18, address: 'пр. Свободный, 76Е' },
  { number: 19, address: 'ул. Лесная, 45' },
  { number: 20, address: 'ул. Ладо Кецховели, 30' },
  { number: 21, address: 'Академгородок, 50/15' },
  { number: 22, address: 'пр. Свободный, 76Ж' },
  { number: 23, address: 'ул. Дубенского, 4' },
  { number: 24, address: 'ул. Дубенского, 6' },
  { number: 25, address: 'Академгородок, 50/17' },
  { number: 26, address: 'Академгородок, 50/19' },
  { number: 27, address: 'Академгородок, 50/21' },
  { number: 28, address: 'Академгородок, 50/23' },
  { number: 29, address: 'Академгородок, 50/25' },
  { number: 30, address: 'Академгородок, 50/27' },
];

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

export type OrgHost =
  | { type: 'institute'; instituteAbbr: string }
  | { type: 'dormitory'; dormNumber: number }
  | { type: 'university' };

export interface Organization {
  id: number;
  name: string;
  short: string;
  color: string;
  verified: boolean;
  role: OrgRole;
  members: number;
  description: string;
  foundedAt: string;
  joinQuestions: ApplicationQuestion[];
  host: OrgHost;
}

const STUDSOVET_JOIN_QUESTIONS: ApplicationQuestion[] = [
  { id: 'q1', type: 'long_text', label: 'Расскажи о себе и своём опыте в студенческой деятельности', required: true, maxLength: 500 },
  { id: 'q2', type: 'long_text', label: 'Почему именно Студсовет ИКИТ?', hint: 'Что тебя привлекает, какой вклад готов внести', required: true, maxLength: 400 },
  { id: 'q3', type: 'radio', label: 'Сколько часов в неделю готов уделять работе студсовета?', required: true, options: ['До 3 часов', '3-7 часов', '7-15 часов', 'Больше 15 часов'] },
  { id: 'q4', type: 'checkbox', label: 'Какие направления тебе интересны?', hint: 'Можно несколько', required: false, options: ['Учебные вопросы', 'Внеучебная деятельность', 'Связь с деканатом', 'Социальная поддержка', 'Спорт и здоровье'] },
];

const VOLUNTEER_JOIN_QUESTIONS: ApplicationQuestion[] = [
  { id: 'q1', type: 'long_text', label: 'Расскажи о своём волонтёрском опыте', required: true, maxLength: 500 },
  { id: 'q2', type: 'checkbox', label: 'Какие направления волонтёрства интересны?', required: true, options: ['Социальная помощь', 'Экология', 'Помощь животным', 'Культурные мероприятия', 'Образовательные проекты', 'Спортивные события'] },
  { id: 'q3', type: 'radio', label: 'Есть ли у тебя водительские права?', required: true, options: ['Да, категория B', 'Да, другие категории', 'Нет'] },
  { id: 'q4', type: 'short_text', label: 'Телефон для экстренной связи', hint: 'Нужен для координации выездных мероприятий', required: false, placeholder: '+7 ___ ___-__-__' },
];

const MEDIA_JOIN_QUESTIONS: ApplicationQuestion[] = [
  { id: 'q1', type: 'checkbox', label: 'В каких направлениях ты силён?', required: true, options: ['Фотография', 'Видеосъёмка', 'Видеомонтаж', 'Графический дизайн', 'Тексты, журналистика', 'SMM и соцсети', 'Подкасты'] },
  { id: 'q2', type: 'short_text', label: 'Ссылка на портфолио', hint: 'Behance, Instagram, Telegram-канал, GitHub — что есть', required: false, placeholder: 'https://...' },
  { id: 'q3', type: 'long_text', label: 'Опиши свой опыт', required: true, maxLength: 400 },
];

const ROBOTICS_JOIN_QUESTIONS: ApplicationQuestion[] = [
  { id: 'q1', type: 'long_text', label: 'Расскажи о себе и своём интересе к робототехнике', hint: 'Опыт с Arduino, ROS, 3D-печатью или просто желание учиться — всё подойдёт', required: true, maxLength: 500 },
];

const DORM_7_STUDSOVET_QUESTIONS: ApplicationQuestion[] = [
  { id: 'q1', type: 'long_text', label: 'Какой у тебя опыт в студенческой деятельности?', required: true, maxLength: 400 },
  { id: 'q2', type: 'radio', label: 'Сколько лет ты живёшь в общежитии?', required: true, options: ['Только заселился', 'Меньше года', '1-2 года', 'Больше 2 лет'] },
];

const DORM_7_ELDERS_QUESTIONS: ApplicationQuestion[] = [
  { id: 'q1', type: 'short_text', label: 'На каком этаже живёшь?', required: true },
  { id: 'q2', type: 'long_text', label: 'Почему хочешь стать старостой этажа?', required: true, maxLength: 300 },
];

const DORM_22_STUDSOVET_QUESTIONS: ApplicationQuestion[] = [
  { id: 'q1', type: 'long_text', label: 'Расскажи о себе и своих интересах', required: true, maxLength: 400 },
  { id: 'q2', type: 'checkbox', label: 'Какие направления тебе интересны?', required: false, options: ['Культурные мероприятия', 'Спорт', 'Кино и медиа', 'Социальная помощь', 'Творчество'] },
];

const DORM_27_COUNCIL_QUESTIONS: ApplicationQuestion[] = [
  { id: 'q1', type: 'long_text', label: 'Расскажи о себе', required: true, maxLength: 300 },
];

export const ORGANIZATIONS: Organization[] = [
  {
    id: 1, name: 'Студсовет ИКИТ', short: 'СС', color: '#4F7FFF',
    verified: true, role: 'owner', members: 12,
    description: 'Защищаем интересы студентов ИКИТ, организуем образовательные и развлекательные мероприятия, представляем студенчество в совете деканата.',
    foundedAt: 'Сентябрь 2018',
    joinQuestions: STUDSOVET_JOIN_QUESTIONS,
    host: { type: 'institute', instituteAbbr: 'ИКИТ' },
  },
  {
    id: 2, name: 'Волонтёрский центр СФУ', short: 'ВЦ', color: '#3DD68C',
    verified: true, role: 'editor', members: 47,
    description: 'Координируем волонтёрскую деятельность в университете и за его пределами: экологические акции, помощь приютам, городские форумы.',
    foundedAt: 'Март 2015',
    joinQuestions: VOLUNTEER_JOIN_QUESTIONS,
    host: { type: 'university' },
  },
  {
    id: 3, name: 'Студенческий медиацентр', short: 'МД', color: '#9B5CFF',
    verified: true, role: 'editor', members: 24,
    description: 'Делаем студенческий контент: репортажи о жизни кампуса, подкасты, видеоролики и фото с университетских событий.',
    foundedAt: 'Октябрь 2020',
    joinQuestions: MEDIA_JOIN_QUESTIONS,
    host: { type: 'institute', instituteAbbr: 'ИКИТ' },
  },
  {
    id: 4, name: 'Клуб робототехники', short: 'РБ', color: '#F5A524',
    verified: false, role: 'viewer', members: 18,
    description: 'Собираем роботов и автономные системы: от учебных Arduino-проектов до участия в RoboCup и инженерных хакатонах. Открыты к новичкам — есть менторская программа.',
    foundedAt: 'Февраль 2022',
    joinQuestions: ROBOTICS_JOIN_QUESTIONS,
    host: { type: 'institute', instituteAbbr: 'ИКИТ' },
  },
  {
    id: 5, name: 'Студсовет общежития №7', short: 'СО7', color: '#3DD68C',
    verified: true, role: 'viewer', members: 12,
    description: 'Студенческий совет общежития №7. Организуем мероприятия для жильцов, помогаем с бытовыми вопросами, представляем интересы перед администрацией.',
    foundedAt: 'Сентябрь 2021',
    joinQuestions: DORM_7_STUDSOVET_QUESTIONS,
    host: { type: 'dormitory', dormNumber: 7 },
  },
  {
    id: 6, name: 'Совет старост общежития №7', short: 'СС7', color: '#F5A524',
    verified: true, role: 'viewer', members: 8,
    description: 'Этажные старосты общежития №7. Решаем оперативные вопросы по этажам, контролируем порядок, передаём информацию от администрации.',
    foundedAt: 'Февраль 2023',
    joinQuestions: DORM_7_ELDERS_QUESTIONS,
    host: { type: 'dormitory', dormNumber: 7 },
  },
  {
    id: 7, name: 'Студсовет общежития №22', short: 'СО22', color: '#4F7FFF',
    verified: true, role: 'viewer', members: 10,
    description: 'Студсовет общежития №22. Организуем культурные мероприятия, киноночи, эстафеты между этажами.',
    foundedAt: 'Январь 2022',
    joinQuestions: DORM_22_STUDSOVET_QUESTIONS,
    host: { type: 'dormitory', dormNumber: 22 },
  },
  {
    id: 8, name: 'Совет общежития №27', short: 'СО27', color: '#9B5CFF',
    verified: false, role: 'viewer', members: 6,
    description: 'Совет общежития №27 в Академгородке. Помогаем новичкам адаптироваться, проводим встречи и обсуждения.',
    foundedAt: 'Октябрь 2024',
    joinQuestions: DORM_27_COUNCIL_QUESTIONS,
    host: { type: 'dormitory', dormNumber: 27 },
  },
];

export interface CurrentUser {
  name: string;
  initials: string;
  email: string;
  institute: string;
  course: number;
  avatarGrad: string;
  memberships: number[];
  pendingMemberships?: number[];
  handle: string;
  interests: string[];
  joinedAt: string;
  bio?: string;
  phone?: string;
}

export const CURRENT_USER: CurrentUser = {
  name: 'Иван Петров',
  initials: 'ИП',
  email: 'petrov.iv@sfu-kras.ru',
  institute: 'ИКИТ',
  course: 3,
  avatarGrad: 'linear-gradient(135deg, #F5A524, #F25E5E)',
  memberships: [1, 2],
  pendingMemberships: [],
  handle: 'ip_2024',
  interests: ['education', 'career', 'community'],
  joinedAt: '2024-09-01',
  bio: 'Студент ИКИТ. Интересуюсь IT, наукой и студенческой жизнью.',
  phone: '+7 (391) 555-12-34',
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
  answers: ApplicationAnswer[];
}

function hackathonAnswers(q1: string, q2: string, q3: string, q4: string): ApplicationAnswer[] {
  return [
    { questionId: 'q1', questionLabel: HACKATHON_QUESTIONS[0].label, questionType: 'long_text', value: q1 },
    { questionId: 'q2', questionLabel: HACKATHON_QUESTIONS[1].label, questionType: 'radio',     value: q2 },
    { questionId: 'q3', questionLabel: HACKATHON_QUESTIONS[2].label, questionType: 'radio',     value: q3 },
    { questionId: 'q4', questionLabel: HACKATHON_QUESTIONS[3].label, questionType: 'short_text', value: q4 },
  ];
}

export const APPLICATIONS: Application[] = [
  {
    id: 1,  name: 'Анна Кузнецова',  handle: '@anna_k',      meta: 'ИКИТ · 3 курс',   grad: ['#2563EB', '#1E40AF'], event: 'Хакатон Siberian Hack 2026', eventType: 'educational', when: '2 ч назад',     status: 'pending',
    answers: hackathonAnswers(
      'Участвовала в двух: Сбер.Хакатон 2024 и хакатон ИКИТ прошлой осенью. В обоих наша команда заняла призовые места.',
      'Учебный процесс и расписание',
      'Да, есть команда',
      'github.com/annak-sfu',
    ),
  },
  {
    id: 2,  name: 'Михаил Соколов',  handle: '@msokolov',    meta: 'ИКИТ · 2 курс',   grad: ['#7C3AED', '#5B21B6'], event: 'Хакатон Siberian Hack 2026', eventType: 'educational', when: '3 ч назад',     status: 'pending',
    answers: hackathonAnswers(
      'Первый раз буду на хакатоне. Изучаю React и Python, делал пет-проекты — Telegram-бот и сайт-афиша.',
      'Студенческая жизнь',
      'Нет, ищу команду на месте',
      '',
    ),
  },
  {
    id: 3,  name: 'Дарья Волкова',   handle: '@daryav',      meta: 'ИКИТ · 3 курс',   grad: ['#059669', '#047857'], event: 'Хакатон Siberian Hack 2026', eventType: 'educational', when: '5 ч назад',     status: 'pending',
    answers: hackathonAnswers(
      'Три хакатона: VK Hack, Сбер.Хакатон 2024 (топ-10), хакатон СФУ по open data — 1 место.',
      'Открытые данные СФУ',
      'Да, есть команда',
      'github.com/dvolkova',
    ),
  },
  {
    id: 4,  name: 'Егор Павлов',     handle: '@egor.p',      meta: 'ИКИТ · 1 курс',   grad: ['#DC2626', '#991B1B'], event: 'Хакатон Siberian Hack 2026', eventType: 'educational', when: 'вчера',         status: 'pending',
    answers: hackathonAnswers(
      'Хакатонов не было, но активно учусь — прошёл курс по веб-разработке, пишу на JS/TS.',
      'Кампус и инфраструктура',
      'Нет, ищу команду на месте',
      '',
    ),
  },
  {
    id: 5,  name: 'Илья Громов',     handle: '@ilya_g',      meta: 'ИФКСиТ · 2 курс', grad: ['#F5A524', '#A8651A'], event: 'Хакатон Siberian Hack 2026', eventType: 'educational', when: 'вчера',         status: 'pending',
    answers: hackathonAnswers(
      'Один хакатон в школе по спортивной аналитике, заняли 3 место. Сейчас учусь, опыта пока мало.',
      'Студенческая жизнь',
      'Да, есть команда',
      '',
    ),
  },
  {
    id: 6,  name: 'Полина Лебедева', handle: '@p.lebedeva',  meta: 'ИФиЯК · 4 курс',  grad: ['#2563EB', '#1E40AF'], event: 'Хакатон Siberian Hack 2026', eventType: 'educational', when: '2 дня назад',   status: 'pending',
    answers: hackathonAnswers(
      'Иду как UX-дизайнер. Участвовала в дизайн-марафоне Тинькофф, проектировала интерфейсы для двух студенческих стартапов.',
      'Студенческая жизнь',
      'Да, есть команда',
      'behance.net/p.lebedeva',
    ),
  },
  {
    id: 7,  name: 'Никита Орлов',    handle: '@norlov',      meta: 'ИМиФИ · 3 курс',  grad: ['#7C3AED', '#5B21B6'], event: 'Хакатон Siberian Hack 2026', eventType: 'educational', when: '3 дня назад',   status: 'pending',
    answers: hackathonAnswers(
      'Два хакатона по ML: ВТБ More.Tech (финал) и Лидеры Цифровой Трансформации в Москве. Занимаюсь NLP.',
      'Открытые данные СФУ',
      'Нет, ищу команду на месте',
      'github.com/norlov-ml',
    ),
  },
  { id: 8,  name: 'Елена Семёнова',  handle: '@e.semenova',  meta: 'ИКИТ · 2 курс',   grad: ['#059669', '#047857'], event: 'Встреча со студсоветом',     eventType: 'community',   when: 'сегодня 10:14', status: 'auto', answers: [] },
  { id: 9,  name: 'Артём Беляев',    handle: '@a.belyaev',   meta: 'ИУБПЭ · 4 курс',  grad: ['#F5A524', '#A8651A'], event: 'День открытых дверей ИКИТ',  eventType: 'career',      when: 'вчера',         status: 'auto', answers: [] },
  {
    id: 10, name: 'Олеся Тимофеева', handle: '@o.timofeeva', meta: 'ИКИТ · 2 курс',   grad: ['#DC2626', '#991B1B'], event: 'Хакатон Siberian Hack 2026', eventType: 'educational', when: '4 дня назад',   status: 'rejected',
    answers: hackathonAnswers(
      'Опыта в хакатонах нет, но интересно попробовать.',
      'Кампус и инфраструктура',
      'Нет, ищу команду на месте',
      '',
    ),
  },
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

export type MembershipApplicationStatus = 'pending' | 'approved' | 'rejected';

export interface MembershipApplication {
  id: number;
  orgId: number;
  applicant: {
    name: string;
    handle: string;
    initials: string;
    grad: [string, string];
    institute: string;
    course: number;
  };
  answers: ApplicationAnswer[];
  submittedAt: string;
  status: MembershipApplicationStatus;
}

function answersFor(questions: ApplicationQuestion[], values: (string | string[])[]): ApplicationAnswer[] {
  return questions.map((q, i) => ({
    questionId: q.id,
    questionLabel: q.label,
    questionType: q.type,
    value: values[i],
  }));
}

export const MEMBERSHIP_APPLICATIONS: MembershipApplication[] = [
  {
    id: 1, orgId: 1,
    applicant: { name: 'Анна Лебедева', handle: '@anna.l', initials: 'АЛ', grad: ['#2563EB', '#1E40AF'], institute: 'ИКИТ', course: 2 },
    answers: answersFor(STUDSOVET_JOIN_QUESTIONS, [
      'Учусь на 2 курсе ИКИТ, староста потока. Организовывала посвящение для первокурсников, помогала со встречей абитуриентов на Дне открытых дверей.',
      'Хочу помогать с организацией мероприятий и представлять интересы младших курсов в Студсовете. Есть идеи по адаптации первокурсников.',
      '3-7 часов',
      ['Учебные вопросы', 'Внеучебная деятельность', 'Социальная поддержка'],
    ]),
    submittedAt: '2 ч назад',
    status: 'pending',
  },
  {
    id: 2, orgId: 1,
    applicant: { name: 'Дмитрий Орлов', handle: '@d.orlov', initials: 'ДО', grad: ['#7C3AED', '#5B21B6'], institute: 'ИКИТ', course: 3 },
    answers: answersFor(STUDSOVET_JOIN_QUESTIONS, [
      'Год работал в студсовете школы, потом координировал волонтёрскую группу на День знаний СФУ.',
      'Готов вести направление по работе с первокурсниками — есть идеи по адаптационной программе и менторству.',
      '7-15 часов',
      ['Внеучебная деятельность', 'Связь с деканатом'],
    ]),
    submittedAt: '1 день назад',
    status: 'pending',
  },
  {
    id: 3, orgId: 1,
    applicant: { name: 'Софья Зайцева', handle: '@sofia.z', initials: 'СЗ', grad: ['#059669', '#047857'], institute: 'ИКИТ', course: 1 },
    answers: answersFor(STUDSOVET_JOIN_QUESTIONS, [
      'Первый курс, опыта в студсоветах ещё нет. В школе была в редакции газеты.',
      'Хочу быть в гуще событий и помогать с любой работой — афиши, мероприятия, соцсети. Учусь, развиваюсь.',
      'До 3 часов',
      ['Внеучебная деятельность'],
    ]),
    submittedAt: '3 дня назад',
    status: 'pending',
  },
  {
    id: 4, orgId: 2,
    applicant: { name: 'Максим Андреев', handle: '@m.andreev', initials: 'МА', grad: ['#F5A524', '#A8651A'], institute: 'ИФиЯК', course: 2 },
    answers: answersFor(VOLUNTEER_JOIN_QUESTIONS, [
      'Участвовал в волонтёрских программах фестиваля КРЯКК, есть опыт работы с детскими домами и социальной службой.',
      ['Социальная помощь', 'Экология', 'Культурные мероприятия'],
      'Да, категория B',
      '+7 913 234-56-78',
    ]),
    submittedAt: '5 ч назад',
    status: 'pending',
  },
  {
    id: 5, orgId: 3,
    applicant: { name: 'Кирилл Новиков', handle: '@k.novikov', initials: 'КН', grad: ['#DC2626', '#991B1B'], institute: 'ИКИТ', course: 4 },
    answers: answersFor(MEDIA_JOIN_QUESTIONS, [
      ['Фотография', 'Видеосъёмка', 'Видеомонтаж'],
      'instagram.com/k.novikov.photo',
      'Снимаю на зеркалку 3 года, монтирую в Premiere Pro. Снял две короткие документалки про студенческие мероприятия — есть на канале.',
    ]),
    submittedAt: '2 недели назад',
    status: 'approved',
  },
];
