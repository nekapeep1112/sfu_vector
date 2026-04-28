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

// ─── Word-by-word reveal ──────────────────────────────────────
function WordReveal({ children, delay = 0, stagger = 60, style, as: As = 'span' }) {
  const [ref, shown] = useReveal();
  const words = String(children).split(' ');
  return (
    <As ref={ref} style={{ display: 'inline-block', ...style }}>
      {words.map((w, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}>
          <span style={{
            display: 'inline-block',
            transform: shown ? 'translateY(0%) rotateX(0deg)' : 'translateY(110%) rotateX(-30deg)',
            opacity: shown ? 1 : 0,
            transition: `transform .9s cubic-bezier(.2,.8,.2,1) ${delay + i * stagger}ms, opacity .9s ease ${delay + i * stagger}ms`,
            willChange: 'transform, opacity',
          }}>
            {w}{i < words.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </As>
  );
}

// ─── 3D-tilt card with spotlight ──────────────────────────────
function TiltCard({ children, accent = '#2563EB', style, className = 'card', strength = 8 }) {
  const ref = React.useRef(null);
  const [t, setT] = React.useState({ rx: 0, ry: 0, mx: 50, my: 50, hover: false });
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setT({ rx: (0.5 - py) * strength, ry: (px - 0.5) * strength, mx: px * 100, my: py * 100, hover: true });
  };
  const onLeave = () => setT({ rx: 0, ry: 0, mx: 50, my: 50, hover: false });
  return (
    <div ref={ref} className={className} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{
        ...style,
        position: 'relative',
        transform: `perspective(1000px) rotateX(${t.rx}deg) rotateY(${t.ry}deg) translateZ(0)`,
        transition: t.hover ? 'transform .12s ease-out' : 'transform .5s cubic-bezier(.2,.8,.2,1)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}>
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none',
        background: `radial-gradient(400px circle at ${t.mx}% ${t.my}%, ${accent}1f, transparent 50%)`,
        opacity: t.hover ? 1 : 0, transition: 'opacity .3s',
      }}/>
      <div style={{
        position: 'absolute', inset: -1, borderRadius: 'inherit', pointerEvents: 'none', padding: 1,
        background: `radial-gradient(300px circle at ${t.mx}% ${t.my}%, ${accent}, transparent 60%)`,
        WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
        WebkitMaskComposite: 'xor', maskComposite: 'exclude',
        opacity: t.hover ? 1 : 0, transition: 'opacity .3s',
      }}/>
      <div style={{ position: 'relative', transform: 'translateZ(40px)' }}>{children}</div>
    </div>
  );
}

// ─── Mouse-follower blob cursor (decorative, doesn't replace native) ──
function CursorBlob() {
  const ref = React.useRef(null);
  const ringRef = React.useRef(null);
  const tgt = React.useRef({ x: 0, y: 0 });
  const cur = React.useRef({ x: 0, y: 0 });
  const ringCur = React.useRef({ x: 0, y: 0 });
  React.useEffect(() => {
    const onMove = (e) => { tgt.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove);
    let raf;
    const tick = () => {
      cur.current.x += (tgt.current.x - cur.current.x) * 0.18;
      cur.current.y += (tgt.current.y - cur.current.y) * 0.18;
      ringCur.current.x += (tgt.current.x - ringCur.current.x) * 0.08;
      ringCur.current.y += (tgt.current.y - ringCur.current.y) * 0.08;
      if (ref.current) ref.current.style.transform = `translate3d(${cur.current.x - 6}px, ${cur.current.y - 6}px, 0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ringCur.current.x - 18}px, ${ringCur.current.y - 18}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);
  return (
    <React.Fragment>
      <div ref={ref} style={{ position: 'fixed', top: 0, left: 0, width: 12, height: 12, borderRadius: '50%', background: '#2563EB', pointerEvents: 'none', zIndex: 9999, mixBlendMode: 'difference' }}/>
      <div ref={ringRef} style={{ position: 'fixed', top: 0, left: 0, width: 36, height: 36, borderRadius: '50%', border: '1.5px solid rgba(37,99,235,0.6)', pointerEvents: 'none', zIndex: 9998, transition: 'width .2s, height .2s, border-color .2s' }}/>
    </React.Fragment>
  );
}

// ─── Scramble-digit number ─────────────────────────────────────
function ScrambleNumber({ to, suffix = '', duration = 2000 }) {
  const [ref, shown] = useReveal();
  const [val, setVal] = React.useState(0);
  const [scramble, setScramble] = React.useState(0);
  React.useEffect(() => {
    if (!shown) return;
    let raf, t0;
    const step = (t) => {
      if (!t0) t0 = t;
      const k = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - k, 4);
      setVal(Math.round(to * eased));
      // jitter early on
      if (k < 0.7) {
        setScramble(Math.floor(Math.random() * Math.pow(10, String(to).length)) % to);
      } else {
        setScramble(0);
      }
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [shown, to, duration]);
  const display = scramble ? scramble : val;
  return <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>{display.toLocaleString('ru-RU')}{suffix}</span>;
}

// ─── Floating-icon orbit ──────────────────────────────────────
function FloatIcon({ x, y, size = 56, label, tone = '#2563EB', delay = 0, scrollY = 0, factor = 0.05, rotate = 0 }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y, width: size, height: size,
      borderRadius: 14, background: '#FFFFFF', border: '1px solid var(--border)',
      boxShadow: '0 10px 28px rgba(15,23,42,0.10)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size > 48 ? 22 : 18, fontWeight: 800, color: tone,
      animation: `bob 3.6s ease-in-out ${delay}ms infinite`,
      transform: `translateY(${scrollY * factor}px) rotate(${rotate}deg)`,
      transition: 'transform .1s linear',
      willChange: 'transform',
    }}>{label}</div>
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

Object.assign(window, { COUNTERS, STEPS, FEATURES, AUDIENCES, STORIES, useReveal, AnimatedNumber, useScrollY, MagneticButton, Reveal, PhotoPH, WordReveal, TiltCard, CursorBlob, ScrambleNumber, FloatIcon });
