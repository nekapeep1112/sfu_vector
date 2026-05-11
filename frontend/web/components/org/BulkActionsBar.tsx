'use client';

import type { ReactNode } from 'react';

const Ap = {
  check: (p: { s?: number } = {}) => (
    <svg width={p.s ?? 14} height={p.s ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  ),
  x: (p: { s?: number } = {}) => (
    <svg width={p.s ?? 14} height={p.s ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
  ),
  download: (p: { s?: number } = {}) => (
    <svg width={p.s ?? 14} height={p.s ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
};

function GhostBtn({ children, onClick, danger }: { children: ReactNode; onClick?: () => void; danger?: boolean }) {
  return (
    <button className="btn btn-ghost btn-sm" onClick={onClick} style={{
      color: danger ? 'var(--red)' : undefined,
      display: 'inline-flex', alignItems: 'center', gap: 6,
    }}>{children}</button>
  );
}

function Divider() {
  return <span style={{ width: 1, height: 24, background: 'var(--border)', margin: '0 4px' }}/>;
}

export function BulkActionsBar({
  count,
  onApproveAll,
  onRejectAll,
  onExport,
  onClearSelection,
}: {
  count: number;
  onApproveAll: () => void;
  onRejectAll: () => void;
  onExport: () => void;
  onClearSelection: () => void;
}) {
  return (
    <div style={{
      padding: '14px 20px',
      background: 'color-mix(in oklab, var(--blue) 8%, transparent)',
      borderBottom: '1px solid var(--blue)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
    }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg)' }}>
          Выбрано {count} {count === 1 ? 'заявка' : 'заявки'}
        </div>
        <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 2 }}>
          Все {count} — на Хакатон Siberian Hack 2026
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button
          onClick={onApproveAll}
          className="btn btn-primary btn-sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
        ><Ap.check/> Одобрить ({count})</button>
        <GhostBtn danger onClick={onRejectAll}><Ap.x/> Отклонить</GhostBtn>
        <Divider/>
        <GhostBtn onClick={onExport}><Ap.download/> Экспорт</GhostBtn>
        <GhostBtn onClick={onClearSelection}>Снять выделение</GhostBtn>
      </div>
    </div>
  );
}
