'use client';

import {
  type CSSProperties, type ElementType, type MouseEvent, type ReactNode,
  useEffect, useRef, useState,
} from 'react';

// ─── Hooks ──────────────────────────────────────────────────────
export function useReveal<T extends HTMLElement = HTMLDivElement>(): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, shown];
}

export function useScrollY(): number {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return y;
}

// ─── Animated number (eased) ────────────────────────────────────
export function AnimatedNumber({ to, suffix = '', duration = 1600 }: { to: number; suffix?: string; duration?: number }) {
  const [ref, shown] = useReveal<HTMLSpanElement>();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!shown) return;
    let raf = 0, t0 = 0;
    const step = (t: number) => {
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

// ─── Scramble-digit number ──────────────────────────────────────
export function ScrambleNumber({ to, suffix = '', duration = 2000 }: { to: number; suffix?: string; duration?: number }) {
  const [ref, shown] = useReveal<HTMLSpanElement>();
  const [val, setVal] = useState(0);
  const [scramble, setScramble] = useState(0);
  useEffect(() => {
    if (!shown) return;
    let raf = 0, t0 = 0;
    const step = (t: number) => {
      if (!t0) t0 = t;
      const k = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - k, 4);
      setVal(Math.round(to * eased));
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
  const display = scramble || val;
  return <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>{display.toLocaleString('ru-RU')}{suffix}</span>;
}

// ─── Magnetic button ───────────────────────────────────────────
export function MagneticButton({
  children, className = 'btn btn-primary', onClick, style, strength = 0.25,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  style?: CSSProperties;
  strength?: number;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  return (
    <button
      ref={ref}
      className={className}
      style={{ ...style, transform: `translate(${t.x}px, ${t.y}px)`, transition: 'transform .25s cubic-bezier(.2,.9,.2,1), box-shadow .2s' }}
      onClick={onClick}
      onMouseMove={(e: MouseEvent<HTMLButtonElement>) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
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

// ─── Reveal on scroll ──────────────────────────────────────────
export function Reveal({
  children, delay = 0, y = 28, as: As = 'div', style,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: ElementType;
  style?: CSSProperties;
}) {
  const [ref, shown] = useReveal<HTMLElement>();
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
export function WordReveal({
  children, delay = 0, stagger = 60, style, as: As = 'span',
}: {
  children: string;
  delay?: number;
  stagger?: number;
  style?: CSSProperties;
  as?: ElementType;
}) {
  const [ref, shown] = useReveal<HTMLElement>();
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
            {w}{i < words.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </As>
  );
}

// ─── 3D-tilt card with spotlight ──────────────────────────────
export function TiltCard({
  children, accent = '#2563EB', style, className = 'card', strength = 8,
}: {
  children: ReactNode;
  accent?: string;
  style?: CSSProperties;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0, mx: 50, my: 50, hover: false });
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
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

// ─── Floating-icon orbit ─────────────────────────────────────
export function FloatIcon({
  x, y, size = 56, label, tone = '#2563EB', delay = 0, scrollY = 0, factor = 0.05, rotate = 0,
}: {
  x: number; y: number; size?: number; label: string; tone?: string;
  delay?: number; scrollY?: number; factor?: number; rotate?: number;
}) {
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

// ─── Photo placeholder ──────────────────────────────────────
export function PhotoPH({
  tone = '#2563EB', label = '', height = 320, style, image, imageFit = 'cover',
}: {
  tone?: string; label?: string; height?: number; style?: CSSProperties;
  image?: string; imageFit?: 'cover' | 'contain';
}) {
  const id = `grid-${tone.replace('#', '')}`;
  if (image) {
    return (
      <div style={{
        height, borderRadius: 16, position: 'relative', overflow: 'hidden',
        background: imageFit === 'contain' ? '#FFFFFF' : undefined,
        border: '1px solid var(--border)',
        ...style,
      }}>
        <img src={image} alt={label} style={{ width: '100%', height: '100%', objectFit: imageFit, display: 'block' }}/>
      </div>
    );
  }
  return (
    <div style={{
      height, borderRadius: 16, position: 'relative', overflow: 'hidden',
      background: `linear-gradient(135deg, ${tone}33, ${tone}0d), radial-gradient(120% 80% at 20% 10%, ${tone}55, transparent 60%), ${tone}1a`,
      border: '1px solid var(--border)',
      ...style,
    }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
        <defs>
          <pattern id={id} width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M0 32 L32 32 M32 0 L32 32" stroke={tone} strokeOpacity="0.12" strokeWidth="1" fill="none"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`}/>
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
