'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { LogoMark } from '@/components/Logo';
import { useTheme } from '@/components/theme/ThemeProvider';
import { INSTITUTES } from '@/lib/mock-data';
import { COUNTERS, STEPS, FEATURES, AUDIENCES, STORIES } from './data';
import {
  Reveal, WordReveal, MagneticButton, TiltCard, ScrambleNumber, FloatIcon, PhotoPH,
  useScrollY,
} from './primitives';

const NAV_ITEMS = [
  { href: '#features',  label: 'Возможности' },
  { href: '#audiences', label: 'Для кого' },
  { href: '#how',       label: 'Как это работает' },
  { href: '#stories',   label: 'Истории' },
];

export function LandingNav() {
  const y = useScrollY();
  const compact = y > 40;
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: compact ? '12px 32px' : '20px 32px',
      transition: 'padding .25s, background .25s, border-color .25s, box-shadow .25s',
      background: compact ? 'var(--surface)' : 'transparent',
      backdropFilter: compact ? 'saturate(180%) blur(14px)' : 'none',
      WebkitBackdropFilter: compact ? 'saturate(180%) blur(14px)' : 'none',
      borderBottom: compact ? '1px solid var(--border)' : '1px solid transparent',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 32 }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <LogoMark px={32}/>
          <div style={{ fontWeight: 800, fontSize: 17, letterSpacing: '-0.01em', color: 'var(--fg)' }}>
            СФУ<span style={{
              background: 'linear-gradient(135deg, #4F7FFF 0%, #9B5CFF 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}>.Вектор</span>
          </div>
        </a>
        <nav style={{ display: 'flex', gap: 24, marginLeft: 24 }}>
          {NAV_ITEMS.map(i => (
            <a key={i.href} href={i.href} style={{ fontSize: 14, color: 'var(--fg-2)', fontWeight: 500, transition: 'color .15s' }}
               onMouseEnter={e => (e.currentTarget.style.color = 'var(--fg)')}
               onMouseLeave={e => (e.currentTarget.style.color = 'var(--fg-2)')}>{i.label}</a>
          ))}
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, alignItems: 'center' }}>
          <LandingThemeToggle />
          <Link href="/login" className="btn btn-ghost btn-sm">Войти</Link>
          <Link href="/onboarding" className="btn btn-primary btn-sm">Начать</Link>
        </div>
      </div>
    </header>
  );
}

function LandingThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';
  const [hover, setHover] = useState(false);
  const label = isDark ? 'Светлая тема' : 'Тёмная тема';
  return (
    <button
      onClick={toggle}
      title={label}
      aria-label={label}
      aria-pressed={isDark}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 36, height: 36, borderRadius: 10,
        background: hover ? 'var(--bg-2)' : 'transparent',
        border: '1px solid var(--border)',
        color: 'var(--fg-2)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', transition: 'background .15s, border-color .15s, color .15s',
        flexShrink: 0,
      }}
    >
      {isDark
        ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
        : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>}
    </button>
  );
}

// ─── Hero ──────────────────────────────────────────────
export function HeroSection() {
  const y = useScrollY();
  const heroRef = useRef<HTMLElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: globalThis.MouseEvent) => {
      const r = el.getBoundingClientRect();
      setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);
  const heroOpacity = Math.max(0, 1 - y / 700);
  return (
    <section ref={heroRef} id="top" style={{
      position: 'relative', overflow: 'hidden',
      paddingTop: 160, paddingBottom: 120, minHeight: '100vh',
      background: 'var(--surface)',
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(600px circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(37,99,235,0.12), transparent 50%)`,
        transition: 'background .3s ease-out',
      }}/>
      <div style={{ position: 'absolute', top: 80, left: '8%', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.22), transparent 70%)', transform: `translate(${(mouse.x - 0.5) * 30}px, ${y * 0.15 + (mouse.y - 0.5) * 30}px)`, filter: 'blur(40px)', animation: 'meshFloat1 12s ease-in-out infinite', transition: 'transform .3s ease-out' }}/>
      <div style={{ position: 'absolute', top: 200, right: '6%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.20), transparent 70%)', transform: `translate(${(mouse.x - 0.5) * -25}px, ${y * -0.12 + (mouse.y - 0.5) * -25}px)`, filter: 'blur(50px)', animation: 'meshFloat2 14s ease-in-out infinite', transition: 'transform .3s ease-out' }}/>
      <div style={{ position: 'absolute', bottom: -40, left: '40%', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(5,150,105,0.16), transparent 70%)', transform: `translate(${(mouse.x - 0.5) * 20}px, ${y * -0.08}px)`, filter: 'blur(40px)', animation: 'meshFloat3 16s ease-in-out infinite' }}/>

      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.4, pointerEvents: 'none' }}>
        <defs>
          <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 40 L40 40 M40 0 L40 40" stroke="rgba(15,23,42,0.05)" strokeWidth="1" fill="none"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)"/>
      </svg>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 64, alignItems: 'center', position: 'relative', opacity: heroOpacity, transform: `translateY(${y * 0.1}px)` }}>
        <div>
          <Reveal>
            <div className="chip" style={{ background: 'rgba(37,99,235,0.08)', borderColor: 'rgba(37,99,235,0.25)', color: 'var(--blue)', fontWeight: 600, marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
              <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.25), transparent)', animation: 'shine 3s ease-in-out infinite' }}/>
              <span className="chip-dot" style={{ background: 'var(--blue)', animation: 'pulse 2s infinite' }}/>
              <span style={{ position: 'relative' }}>СФУ.Вектор · 2026</span>
            </div>
          </Reveal>
          <h1 style={{ fontSize: 76, lineHeight: 1.02, fontWeight: 800, letterSpacing: '-0.03em', margin: 0, marginBottom: 24 }}>
            <WordReveal delay={100} stagger={80}>Стань частью</WordReveal>
            <br/>
            <Reveal delay={300} y={20} as="span" style={{ display: 'inline-block' }}>
              <span className="text-grad" style={{ backgroundSize: '200% 100%', animation: 'gradShift 4s ease-in-out infinite' }}>
                движения
              </span>
            </Reveal>
          </h1>
          <Reveal delay={500}>
            <p style={{ fontSize: 20, lineHeight: 1.5, color: 'var(--fg-2)', maxWidth: 540, margin: '0 0 36px 0' }}>
              Единое пространство студенческих возможностей СФУ.<br/>
              Найди своё сообщество. Участвуй. Развивайся.
            </p>
          </Reveal>
          <Reveal delay={620}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <Link href="/onboarding" style={{ textDecoration: 'none' }}>
                <MagneticButton className="btn btn-primary" style={{ padding: '16px 28px', fontSize: 16, position: 'relative', overflow: 'hidden' }}>
                  <span style={{ position: 'relative', zIndex: 1 }}>Зарегистрироваться →</span>
                </MagneticButton>
              </Link>
            </div>
          </Reveal>
        </div>

        <div style={{ position: 'relative', height: 560 }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: 280, height: 360, transform: `translate(${(mouse.x - 0.5) * -20}px, ${y * -0.08 + (mouse.y - 0.5) * -10}px) rotate(-3deg)`, transition: 'transform .25s ease-out' }}>
            <PhotoPH tone="#2563EB" label="Хакатон" height={360} style={{ boxShadow: '0 20px 50px rgba(15,23,42,0.15)' }}/>
          </div>
          <div style={{ position: 'absolute', top: 80, right: 0, width: 260, height: 320, transform: `translate(${(mouse.x - 0.5) * 25}px, ${y * 0.06 + (mouse.y - 0.5) * 15}px) rotate(4deg)`, transition: 'transform .25s ease-out' }}>
            <PhotoPH tone="#7C3AED" label="Студ. весна" height={320} style={{ boxShadow: '0 20px 50px rgba(15,23,42,0.15)' }}/>
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 60, width: 280, height: 220, transform: `translate(${(mouse.x - 0.5) * -15}px, ${y * -0.04 + (mouse.y - 0.5) * -8}px) rotate(2deg)`, transition: 'transform .25s ease-out' }}>
            <PhotoPH tone="#059669" label="Волонтёрство" height={220} style={{ boxShadow: '0 20px 50px rgba(15,23,42,0.15)' }}/>
          </div>
          <FloatIcon x={-30} y={140} size={48} label="🎯" tone="#D97706" delay={400}  scrollY={y} factor={-0.06}/>
          <FloatIcon x={320} y={20}  size={44} label="⚡" tone="#7C3AED" delay={800}  scrollY={y} factor={0.05}/>
          <FloatIcon x={-10} y={420} size={52} label="✦" tone="#059669" delay={1200} scrollY={y} factor={-0.04}/>
          <FloatIcon x={380} y={400} size={48} label="◆" tone="#2563EB" delay={1600} scrollY={y} factor={0.03}/>
        </div>
      </div>
    </section>
  );
}

// ─── Marquee ───────────────────────────────────────────
export function MarqueeStrip() {
  const items = [...INSTITUTES, ...INSTITUTES];
  return (
    <section style={{ padding: '36px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-2)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', gap: 12, animation: 'marquee 50s linear infinite', whiteSpace: 'nowrap' }}>
        {items.map((it, i) => (
          <div key={i} className="chip" style={{ flexShrink: 0, fontSize: 13, padding: '8px 16px', background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: it.color, display: 'inline-block', marginRight: 8 }}/>
            <strong style={{ marginRight: 6 }}>{it.abbr}</strong>
            <span style={{ color: 'var(--fg-3)', fontWeight: 400 }}>{it.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────
export function FeaturesSection() {
  return (
    <section id="features" style={{ padding: '120px 32px', background: 'var(--surface)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="chip" style={{ marginBottom: 16, background: 'rgba(37,99,235,0.08)', borderColor: 'rgba(37,99,235,0.2)', color: 'var(--blue)' }}>Возможности</div>
            <h2 style={{ fontSize: 56, fontWeight: 800, letterSpacing: '-0.025em', margin: 0, marginBottom: 16, lineHeight: 1.05 }}>
              Всё, что было разбросано —<br/>теперь <span className="text-grad">в одном месте</span>
            </h2>
            <p style={{ fontSize: 18, color: 'var(--fg-2)', maxWidth: 640, margin: '0 auto' }}>
              Хватит искать студорганизации в чатах и узнавать о фестивалях за день. Вектор собирает всё.
            </p>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {FEATURES.map((f, i) => (
            <Reveal key={i} delay={i * 100}>
              <TiltCard accent={f.accent} className="card" style={{ padding: 32, height: '100%', borderRadius: 20, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: `linear-gradient(135deg, ${f.accent}, ${f.accent}aa)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 22, marginBottom: 20, boxShadow: `0 8px 20px ${f.accent}30`, position: 'relative', overflow: 'hidden' }}>
                  <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)', animation: `shine 3.5s ${i * 600}ms ease-in-out infinite` }}/>
                  <span style={{ position: 'relative' }}>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 700, margin: 0, marginBottom: 10, letterSpacing: '-0.01em' }}>{f.title}</h3>
                <p style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.55, margin: 0 }}>{f.text}</p>
                <div style={{ marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: f.accent }}>
                  Подробнее
                  <span style={{ display: 'inline-block', transition: 'transform .3s' }}>→</span>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Audiences ─────────────────────────────────────────
export function AudiencesSection() {
  const [active, setActive] = useState(0);
  const [locked, setLocked] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  // Pause autoplay when section isn't on screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Auto-cycle until user clicks a tile
  useEffect(() => {
    if (locked || !inView) return;
    const id = setInterval(() => {
      setActive(a => (a + 1) % AUDIENCES.length);
    }, 4500);
    return () => clearInterval(id);
  }, [locked, inView]);

  const onPick = (i: number) => {
    setActive(i);
    setLocked(true);
  };

  return (
    <section ref={sectionRef} id="audiences" style={{ padding: '120px 32px', background: 'var(--bg-2)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Reveal>
          <div style={{ marginBottom: 56 }}>
            <div className="chip" style={{ marginBottom: 16, background: 'rgba(124,58,237,0.08)', borderColor: 'rgba(124,58,237,0.2)', color: '#7C3AED' }}>Для кого</div>
            <h2 style={{ fontSize: 56, fontWeight: 800, letterSpacing: '-0.025em', margin: 0, lineHeight: 1.05, maxWidth: 800 }}>
              Каждой аудитории — <span className="text-grad">свой Вектор</span>
            </h2>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
          <Reveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {AUDIENCES.map((a, i) => (
                <div key={i} onClick={() => onPick(i)}
                  style={{ padding: 24, borderRadius: 16, cursor: 'pointer', transition: 'all .25s', position: 'relative', overflow: 'hidden',
                    background: active === i ? 'var(--surface)' : 'transparent',
                    border: '1px solid', borderColor: active === i ? 'var(--border)' : 'transparent',
                    boxShadow: active === i ? '0 4px 14px rgba(15,23,42,0.06)' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: active === i ? 8 : 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: active === i ? 'var(--blue)' : 'var(--fg-4)' }}>{a.tag}</div>
                  </div>
                  <h3 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: active === i ? 'var(--fg)' : 'var(--fg-3)', letterSpacing: '-0.01em' }}>{a.title}</h3>
                  {active === i && (
                    <p style={{ fontSize: 15, color: 'var(--fg-2)', margin: 0, marginTop: 10, lineHeight: 1.55 }}>{a.text}</p>
                  )}
                  {/* auto-progress bar — visible only on the active tile while autoplay is running */}
                  {active === i && !locked && inView && (
                    <div key={`p-${active}-${inView}`} style={{
                      position: 'absolute', left: 0, bottom: 0, height: 2, width: '100%',
                      background: 'rgba(37,99,235,0.08)',
                    }}>
                      <div style={{
                        height: '100%', background: 'var(--grad)',
                        animation: 'audAuto 4500ms linear forwards',
                        transformOrigin: 'left',
                      }}/>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ position: 'sticky', top: 100, height: 520 }}>
              {AUDIENCES.map((a, i) => {
                const tone = ['#2563EB', '#7C3AED', '#059669', '#D97706'][i];
                return (
                  <div key={i} style={{
                    position: 'absolute', inset: 0,
                    opacity: active === i ? 1 : 0,
                    transform: active === i ? 'scale(1) translateX(0)' : (i < active ? 'scale(0.96) translateX(-30px)' : 'scale(0.96) translateX(30px)'),
                    transition: 'opacity .6s cubic-bezier(.2,.8,.2,1), transform .6s cubic-bezier(.2,.8,.2,1)',
                    pointerEvents: active === i ? 'auto' : 'none',
                  }}>
                    <PhotoPH tone={tone} label={a.tag} height={520} style={{ boxShadow: '0 20px 50px rgba(15,23,42,0.12)' }}/>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── How it works ──────────────────────────────────────
const STEP_ACCENTS = ['#2563EB', '#7C3AED', '#059669', '#D97706'];

function StepIcon({ i }: { i: number }) {
  const common = {
    width: 28, height: 28, viewBox: '0 0 24 24',
    fill: 'none', stroke: 'currentColor', strokeWidth: 2,
    strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
  };
  switch (i) {
    case 0: // Mail
      return (
        <svg {...common}>
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="m22 7-10 5L2 7"/>
        </svg>
      );
    case 1: // Sparkles
      return (
        <svg {...common}>
          <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/>
          <path d="M19 14l.7 2.1 2.1.7-2.1.7-.7 2.1-.7-2.1-2.1-.7 2.1-.7z"/>
          <path d="M5 16l.5 1.5L7 18l-1.5.5L5 20l-.5-1.5L3 18l1.5-.5z"/>
        </svg>
      );
    case 2: // Compass
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10"/>
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
        </svg>
      );
    case 3: // Send (paper plane)
      return (
        <svg {...common}>
          <path d="m22 2-7 20-4-9-9-4z"/>
          <path d="M22 2 11 13"/>
        </svg>
      );
    default:
      return null;
  }
}

export function HowSection() {
  return (
    <section id="how" style={{ padding: '120px 32px', background: 'var(--surface)', position: 'relative' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <div className="chip" style={{ marginBottom: 16, background: 'rgba(5,150,105,0.08)', borderColor: 'rgba(5,150,105,0.2)', color: '#059669' }}>Как это работает</div>
            <h2 style={{ fontSize: 56, fontWeight: 800, letterSpacing: '-0.025em', margin: 0, lineHeight: 1.05 }}>
              Четыре шага до <span className="text-grad">своего комьюнити</span>
            </h2>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {STEPS.map((s, i) => {
            const accent = STEP_ACCENTS[i];
            return (
              <Reveal key={i} delay={i * 100}>
                <div style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 16,
                  padding: 28,
                  height: '100%',
                  minHeight: 220,
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 14,
                    background: `linear-gradient(135deg, ${accent}, ${accent}aa)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', marginBottom: 16,
                    boxShadow: `0 8px 20px ${accent}30`,
                    position: 'relative', overflow: 'hidden',
                    flexShrink: 0,
                  }}>
                    <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)', animation: `shine 3.5s ${i * 600}ms ease-in-out infinite` }}/>
                    <span style={{ position: 'relative', display: 'inline-flex' }}><StepIcon i={i}/></span>
                  </div>
                  <div style={{
                    fontSize: 11, color: 'var(--fg-4)',
                    textTransform: 'uppercase', letterSpacing: '0.06em',
                    fontWeight: 700, marginBottom: 8,
                  }}>Шаг {s.n}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0, marginBottom: 10, letterSpacing: '-0.01em', color: 'var(--fg)' }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--fg-3)', lineHeight: 1.55, margin: 0 }}>{s.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Numbers ───────────────────────────────────────────
export function NumbersSection() {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
      setProgress(p);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <section ref={ref} id="numbers" style={{ padding: '100px 32px', background: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 50%, #7C3AED 100%)', position: 'relative', overflow: 'hidden' }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.1 }} preserveAspectRatio="none" viewBox="0 0 1200 600">
        <path d="M0 300 Q 300 200 600 300 T 1200 300 L 1200 600 L 0 600 Z" fill="white">
          <animate attributeName="d" dur="8s" repeatCount="indefinite"
            values="M0 300 Q 300 200 600 300 T 1200 300 L 1200 600 L 0 600 Z;
                    M0 300 Q 300 400 600 300 T 1200 300 L 1200 600 L 0 600 Z;
                    M0 300 Q 300 200 600 300 T 1200 300 L 1200 600 L 0 600 Z"/>
        </path>
        <path d="M0 400 Q 400 300 800 400 T 1600 400 L 1600 600 L 0 600 Z" fill="white" opacity="0.5">
          <animate attributeName="d" dur="10s" repeatCount="indefinite"
            values="M0 400 Q 400 300 800 400 T 1600 400 L 1600 600 L 0 600 Z;
                    M0 400 Q 400 500 800 400 T 1600 400 L 1600 600 L 0 600 Z;
                    M0 400 Q 400 300 800 400 T 1600 400 L 1600 600 L 0 600 Z"/>
        </path>
      </svg>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08 }}>
        <defs>
          <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="white"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)"/>
      </svg>
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(252,211,77,0.4), transparent 70%)', filter: 'blur(40px)', transform: `translateY(${progress * -80}px)` }}/>
      <div style={{ position: 'absolute', bottom: '10%', right: '15%', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.25), transparent 70%)', filter: 'blur(50px)', transform: `translateY(${progress * 60}px)` }}/>
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', color: 'white' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{ fontSize: 56, fontWeight: 800, letterSpacing: '-0.025em', margin: 0, lineHeight: 1.05, color: 'white' }}>
              Масштаб, который <span style={{ color: '#FCD34D' }}>имеет значение</span>
            </h2>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {COUNTERS.map((c, i) => (
            <Reveal key={i} delay={i * 120}>
              <div style={{ textAlign: 'center', padding: '32px 16px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', width: 80, height: 80, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%)', filter: 'blur(20px)' }}/>
                <div style={{ fontSize: 80, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: 10, color: 'white', position: 'relative' }}>
                  <ScrambleNumber to={c.value} suffix={c.suffix} duration={2200 + i * 200}/>
                </div>
                <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', fontWeight: 500, position: 'relative' }}>{c.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Stories ───────────────────────────────────────────
export function StoriesSection() {
  const items = [...STORIES, ...STORIES];
  return (
    <section id="stories" style={{ padding: '120px 0', background: 'var(--surface)', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <Reveal>
          <div style={{ marginBottom: 56 }}>
            <div className="chip" style={{ marginBottom: 16, background: 'rgba(217,119,6,0.08)', borderColor: 'rgba(217,119,6,0.2)', color: '#D97706' }}>Истории</div>
            <h2 style={{ fontSize: 56, fontWeight: 800, letterSpacing: '-0.025em', margin: 0, lineHeight: 1.05, maxWidth: 700 }}>
              Реальные люди.<br/><span className="text-grad">Реальные результаты.</span>
            </h2>
          </div>
        </Reveal>
      </div>
      <div style={{ display: 'flex', gap: 20, padding: '8px 0 24px', animation: 'marquee 60s linear infinite', width: 'max-content' }}>
        {items.map((s, i) => (
          <div key={i} className="card" style={{ width: 380, flexShrink: 0, padding: 32, display: 'flex', flexDirection: 'column', gap: 16, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -20, right: -20, width: 140, height: 140, borderRadius: '50%', background: `radial-gradient(circle, ${s.tone}20, transparent 70%)`, filter: 'blur(20px)' }}/>
            <div style={{ fontSize: 56, lineHeight: 1, color: s.tone, fontFamily: 'Georgia, serif', position: 'relative' }}>“</div>
            <p style={{ fontSize: 18, lineHeight: 1.5, color: 'var(--fg)', margin: 0, flex: 1, fontWeight: 500, position: 'relative' }}>{s.quote}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 20, borderTop: '1px solid var(--border)', position: 'relative' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: `linear-gradient(135deg, ${s.tone}, ${s.tone}aa)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 16, boxShadow: `0 6px 14px ${s.tone}40` }}>{s.name[0]}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                <div style={{ fontSize: 12, color: 'var(--fg-3)' }}>{s.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Final CTA ─────────────────────────────────────────
export function CtaSection() {
  return (
    <section style={{ padding: '120px 32px', background: 'var(--bg-2)' }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        <Reveal>
          <div style={{ borderRadius: 28, padding: '80px 48px', background: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 50%, #7C3AED 100%)', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 30px 60px rgba(37,99,235,0.25)' }}>
            <svg style={{ position: 'absolute', top: -100, right: -100, width: 380, height: 380, opacity: 0.5 }}>
              <path fill="rgba(252,211,77,0.4)" d="M180,90 Q260,140 220,240 Q160,310 90,260 Q30,200 60,120 Q110,40 180,90 Z">
                <animate attributeName="d" dur="12s" repeatCount="indefinite"
                  values="M180,90 Q260,140 220,240 Q160,310 90,260 Q30,200 60,120 Q110,40 180,90 Z;
                          M200,80 Q280,160 240,260 Q140,320 80,250 Q20,180 80,100 Q140,30 200,80 Z;
                          M180,90 Q260,140 220,240 Q160,310 90,260 Q30,200 60,120 Q110,40 180,90 Z"/>
              </path>
            </svg>
            <svg style={{ position: 'absolute', bottom: -150, left: -80, width: 420, height: 420, opacity: 0.3 }}>
              <path fill="rgba(255,255,255,0.6)" d="M210,60 Q300,140 270,260 Q200,360 90,300 Q10,220 60,110 Q120,20 210,60 Z">
                <animate attributeName="d" dur="14s" repeatCount="indefinite"
                  values="M210,60 Q300,140 270,260 Q200,360 90,300 Q10,220 60,110 Q120,20 210,60 Z;
                          M200,80 Q320,160 280,280 Q180,380 80,300 Q20,200 70,90 Q130,40 200,80 Z;
                          M210,60 Q300,140 270,260 Q200,360 90,300 Q10,220 60,110 Q120,20 210,60 Z"/>
              </path>
            </svg>
            <div style={{ position: 'relative' }}>
              <h2 style={{ fontSize: 60, fontWeight: 800, letterSpacing: '-0.025em', color: 'white', margin: 0, marginBottom: 20, lineHeight: 1.05 }}>
                Готов стать частью большего?
              </h2>
              <p style={{ fontSize: 19, color: 'rgba(255,255,255,0.85)', maxWidth: 560, margin: '0 auto 36px', lineHeight: 1.5 }}>
                Зарегистрируйся за 30 секунд — найди своих, своё дело и свои события.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/onboarding" style={{ textDecoration: 'none' }}>
                  <MagneticButton className="btn" style={{ padding: '16px 32px', fontSize: 16, background: '#FFFFFF', color: 'var(--blue)', fontWeight: 700 }}>
                    Зарегистрироваться →
                  </MagneticButton>
                </Link>
                <Link href="/dashboard/events" className="btn" style={{ padding: '16px 28px', fontSize: 15, background: 'rgba(255,255,255,0.12)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(8px)' }}>
                  Записаться на мероприятие
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────
export function LandingFooter() {
  return (
    <footer style={{ padding: '80px 32px 40px', background: '#0F172A', borderTop: '1px solid var(--border)', color: 'rgba(255,255,255,0.7)', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: -40, left: '50%', transform: 'translateX(-50%)',
        fontSize: 'clamp(160px, 22vw, 320px)', fontWeight: 800, letterSpacing: '-0.06em',
        lineHeight: 0.85, color: 'rgba(255,255,255,0.04)', whiteSpace: 'nowrap',
        pointerEvents: 'none', userSelect: 'none',
      }}>
        ВЕКТОР
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 48, marginBottom: 64 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>
              СФУ · Студенческая жизнь
            </div>
            <h3 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.02em', color: 'white', margin: 0, marginBottom: 20, lineHeight: 1.1 }}>
              Единое пространство<br/>возможностей.
            </h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', maxWidth: 360, lineHeight: 1.55, margin: 0 }}>
              Сибирский федеральный университет.<br/>
              20 институтов · 30 000+ студентов.
            </p>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>Платформа</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 15 }}>
              <a href="#features" style={{ color: 'rgba(255,255,255,0.8)' }}>Возможности</a>
              <a href="#how"      style={{ color: 'rgba(255,255,255,0.8)' }}>Как работает</a>
              <a href="#stories"  style={{ color: 'rgba(255,255,255,0.8)' }}>Истории</a>
              <a href="#numbers"  style={{ color: 'rgba(255,255,255,0.8)' }}>Цифры</a>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>Поддержка</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 15 }}>
              <a href="#" style={{ color: 'rgba(255,255,255,0.8)' }}>Помощь</a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.8)' }}>Контакты</a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.8)' }}>Для организаций</a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.8)' }}>Документация</a>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>Контакты</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>
              <a href="mailto:vector@sfu-kras.ru" style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>vector@sfu-kras.ru</a>
              <div>пр. Свободный, 79</div>
              <div>660041, Красноярск</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                {['VK', 'TG', 'YT'].map(s => (
                  <a key={s} href="#" style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.04em' }}>{s}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'rgba(255,255,255,0.45)', flexWrap: 'wrap', gap: 16 }}>
          <div>© 2026 Сибирский федеральный университет</div>
          <div style={{ display: 'flex', gap: 28 }}>
            <a href="#" style={{ color: 'rgba(255,255,255,0.6)' }}>Политика конфиденциальности</a>
            <a href="#" style={{ color: 'rgba(255,255,255,0.6)' }}>Пользовательское соглашение</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
