// Landing page data + hooks + small primitives
// Все секции в landing/sections.jsx; здесь — данные и переиспользуемые компоненты.

const COUNTERS = [
  { value: 20,    suffix: '',   label: 'институтов' },
  { value: 50,    suffix: '+',  label: 'студ. организаций' },
  { value: 1200,  suffix: '+',  label: 'мероприятий в год' },
  { value: 30000, suffix: '+',  label: 'студентов в СФУ' },
];

const STEPS = [
  { n: '01', title: 'Зарегистрируйся',         text: 'Через email или СФУ-аккаунт. 30 секунд — и ты внутри платформы.' },
  { n: '02', title: 'Расскажи о себе',          text: 'Три экрана онбординга: интересы, формат, цели. Мы поймём, что тебе предложить.' },
  { n: '03', title: 'Получи свой Вектор',       text: 'Лента подходящих сообществ, событий и проектов — собрана под тебя.' },
  { n: '04', title: 'Участвуй и расти',         text: 'Записывайся в один клик, знакомься со своими, добавляй опыт в цифровой профиль.' },
];

const FEATURES = [
  {
    title: 'Карта институтов',
    text: 'Все 20 институтов СФУ на одной интерактивной карте: проекты, наборы, кураторы, активные сообщества.',
    accent: '#2563EB',
  },
  {
    title: 'Афиша мероприятий',
    text: 'Хакатоны, фестивали, лекции, спорт, волонтёрство. Фильтры, регистрация, напоминания.',
    accent: '#7C3AED',
  },
  {
    title: 'Сообщества',
    text: 'Профсоюз, студсовет, волонтёрский центр, клубы по интересам. Найди своих — за один вечер.',
    accent: '#059669',
  },
  {
    title: 'Цифровой профиль',
    text: 'Достижения, мероприятия, навыки. Реальный портфолио-трек, который ценят работодатели.',
    accent: '#D97706',
  },
];

const AUDIENCES = [
  { tag: 'Студенты',          title: 'Найди, чем заняться вне пар',     text: 'Сообщества, события и проекты — в одном месте. Без чатов, без паблик-серфинга.' },
  { tag: 'Абитуриенты',       title: 'Посмотри жизнь СФУ изнутри',       text: 'До поступления увидь, какие институты активнее всего и что там реально происходит.' },
  { tag: 'Студорганизации',   title: 'Дотянись до своей аудитории',      text: 'Анонсы, регистрации, аналитика. Хватит расклеивать стикеры на 5 этаже.' },
  { tag: 'Администрация',     title: 'Управляй студенческой жизнью',     text: 'Метрики вовлечённости по институтам, отчёты, единая точка коммуникаций.' },
];

const STORIES = [
  { name: 'Алина К.',  role: 'ИКИТ · 3 курс',  quote: 'Записалась на Siberian Hack через Вектор — собрала команду за вечер. Заняли 2-е место.', tone: '#2563EB' },
  { name: 'Михаил С.', role: 'ИФиЯК · 2 курс', quote: 'Не знал, что в СФУ есть дискуссионный клуб. Теперь хожу каждую среду — нашёл своих.',   tone: '#7C3AED' },
  { name: 'Дарья В.',  role: 'ИЭУиП · 4 курс', quote: 'Карьерный форум через приложение — вышла на стажировку в Сбер. Без Вектора пропустила бы.', tone: '#059669' },
];

// ─── Hooks ──────────────────────────────────────────────────────
function useReveal() {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, shown];
}

function AnimatedNumber({ to, suffix = '', duration = 1600 }) {
  const [ref, shown] = useReveal();
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    if (!shown) return;
    let raf, t0;
    const step = (t) => {
      if (!t0) t0 = t;
      const k = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - k, 3);
      setVal(Math.round(to * eased));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [shown, to, duration]);
  return <span ref={ref}>{val.toLocaleString('ru-RU')}{suffix}</span>;
}

function useScrollY() {
  const [y, setY] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return y;
}

function MagneticButton({ children, className = 'btn btn-primary', onClick, style, strength = 0.25 }) {
  const ref = React.useRef(null);
  const [t, setT] = React.useState({ x: 0, y: 0 });
  return (
    <button
      ref={ref}
      className={className}
      style={{ ...style, transform: `translate(${t.x}px, ${t.y}px)`, transition: 'transform .25s cubic-bezier(.2,.9,.2,1), box-shadow .2s' }}
      onClick={onClick}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * strength;
        const dy = (e.clientY - (r.top + r.height / 2)) * strength;
        setT({ x: dx, y: dy });
      }}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
    >
      {children}
    </button>
  );
}

function Reveal({ children, delay = 0, y = 28, as: As = 'div', style }) {
  const [ref, shown] = useReveal();
  return (
    <As ref={ref} style={{
      ...style,
      opacity: shown ? 1 : 0,
      transform: shown ? 'translateY(0)' : `translateY(${y}px)`,
      transition: `opacity .8s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform .8s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      willChange: 'opacity, transform',
    }}>{children}</As>
  );
}

// ─── Photo placeholder — abstract gradient + grid pattern ──────
function PhotoPH({ tone = '#2563EB', label = '', height = 320, style }) {
  return (
    <div style={{
      height, borderRadius: 16, position: 'relative', overflow: 'hidden',
      background: `linear-gradient(135deg, ${tone}26, ${tone}05), radial-gradient(120% 80% at 20% 10%, ${tone}40, transparent 60%), #F0F3F8`,
      border: '1px solid var(--border)',
      ...style,
    }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
        <defs>
          <pattern id={`grid-${tone.replace('#','')}`} width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M0 32 L32 32 M32 0 L32 32" stroke={tone} strokeOpacity="0.12" strokeWidth="1" fill="none"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${tone.replace('#','')})`}/>
      </svg>
      <div style={{
        position: 'absolute', bottom: 16, left: 16,
        padding: '6px 12px', borderRadius: 999,
        background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)',
        border: '1px solid rgba(15,23,42,0.08)',
        fontSize: 11, fontWeight: 600, color: 'var(--fg-2)',
        letterSpacing: '0.02em', textTransform: 'uppercase',
      }}>📷 {label}</div>
    </div>
  );
}

Object.assign(window, { COUNTERS, STEPS, FEATURES, AUDIENCES, STORIES, useReveal, AnimatedNumber, useScrollY, MagneticButton, Reveal, PhotoPH });
