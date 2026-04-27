import type { ReactNode } from 'react';

export function EntryCard({
  num, title, desc, cta, ctaAccent, preview,
}: {
  num: string;
  title: string;
  desc: string;
  cta: string;
  ctaAccent?: boolean;
  preview: ReactNode;
}) {
  return (
    <div className="card card-hover" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
      <div style={{ height: 180, position: 'relative', borderBottom: '1px solid var(--border)', overflow: 'hidden' }}>
        {preview}
      </div>
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className="mono" style={{ fontSize: 11, color: 'var(--fg-4)', marginBottom: 10, letterSpacing: '0.1em' }}>{num} · ШАГ</div>
        <h3 className="h4" style={{ margin: 0, marginBottom: 8 }}>{title}</h3>
        <p style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.5, margin: 0, marginBottom: 20 }}>{desc}</p>
        <div className="row" style={{ marginTop: 'auto', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: ctaAccent ? 'var(--violet)' : 'var(--fg)' }}>{cta}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </div>
      </div>
    </div>
  );
}
