'use client';

import Link from 'next/link';
import { IconArrow } from './icons';

interface AlertCardProps {
  color: string;
  icon: React.ReactNode;
  count: string;
  title: string;
  sub: string;
  action: string;
  href?: string;
  onClick?: () => void;
}

export function AlertCard({ color, icon, count, title, sub, action, href, onClick }: AlertCardProps) {
  const interactive = Boolean(href || onClick);

  const cardStyle: React.CSSProperties = {
    padding: 20,
    cursor: interactive ? 'pointer' : 'default',
    boxShadow: `inset 3px 0 0 ${color}`,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  };

  const body = (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 10,
          background: `color-mix(in oklab, ${color} 14%, transparent)`,
          color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>{icon}</div>
        <div style={{ fontSize: 32, fontWeight: 800, color, letterSpacing: '-0.03em', lineHeight: 1 }}>{count}</div>
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg)' }}>{title}</div>
        <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 4 }}>{sub}</div>
      </div>
      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
        <span style={{
          fontSize: 13, color: 'var(--blue)', fontWeight: 600,
          display: 'inline-flex', alignItems: 'center', gap: 4,
        }}>
          {action} <IconArrow s={12}/>
        </span>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="card card-hover" style={{ ...cardStyle, textDecoration: 'none', color: 'inherit' }}>
        {body}
      </Link>
    );
  }

  if (onClick) {
    return (
      <div
        className="card card-hover"
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
        style={cardStyle}
      >
        {body}
      </div>
    );
  }

  return <div className="card" style={cardStyle}>{body}</div>;
}
