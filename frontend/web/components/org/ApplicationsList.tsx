'use client';

import type { ReactNode } from 'react';
import { EVENT_TYPES, type Application, type ApplicationStatus } from '@/lib/mock-data';

const Ap = {
  check: (p: { s?: number } = {}) => (
    <svg width={p.s ?? 14} height={p.s ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  ),
};

function initialsFrom(name: string): string {
  const parts = name.split(' ');
  return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase();
}

export function Avatar({
  grad, name, size = 32, radius,
}: {
  grad: readonly [string, string] | [string, string];
  name: string;
  size?: number;
  radius?: number;
}) {
  const fs = Math.max(10, Math.round(size * 0.36));
  return (
    <div style={{
      width: size, height: size, borderRadius: radius ?? size / 2,
      background: `linear-gradient(135deg, ${grad[0]}, ${grad[1]})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'white', fontSize: fs, fontWeight: 700,
      flexShrink: 0,
    }}>{initialsFrom(name)}</div>
  );
}

const STATUS_MAP: Record<ApplicationStatus, { label: string; color: string; bg: string }> = {
  pending:  { label: 'На рассмотрении',   color: 'var(--amber)', bg: 'color-mix(in oklab, var(--amber) 14%, transparent)' },
  approved: { label: 'Одобрено',          color: 'var(--green)', bg: 'color-mix(in oklab, var(--green) 14%, transparent)' },
  rejected: { label: 'Отклонено',         color: 'var(--red)',   bg: 'color-mix(in oklab, var(--red) 14%, transparent)' },
  auto:     { label: 'Авто-регистрация',  color: 'var(--fg-4)',  bg: 'var(--bg-2)' },
};

export function StatusChip({ status }: { status: ApplicationStatus }) {
  const c = STATUS_MAP[status];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 9px', borderRadius: 999,
      background: c.bg, color: c.color,
      fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: c.color }}/>
      {c.label}
    </span>
  );
}

function Checkbox({
  checked, indeterminate, onClick,
}: {
  checked?: boolean;
  indeterminate?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}) {
  const filled = checked || indeterminate;
  return (
    <span
      onClick={onClick}
      style={{
        width: 16, height: 16, borderRadius: 4,
        border: '1.5px solid ' + (filled ? 'var(--blue)' : 'var(--border-2)'),
        background: filled ? 'var(--blue)' : 'transparent',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', flexShrink: 0,
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      {indeterminate ? (
        <span style={{ width: 8, height: 2, background: 'white', borderRadius: 1 }}/>
      ) : checked ? (
        <Ap.check s={11}/>
      ) : null}
    </span>
  );
}

function AppRow({
  app, selected, bulkMode, bulkChecked, last,
  onSelect, onBulkToggle,
}: {
  app: Application;
  selected: boolean;
  bulkMode: boolean;
  bulkChecked: boolean;
  last: boolean;
  onSelect: () => void;
  onBulkToggle: () => void;
}) {
  const cols = bulkMode ? '24px 1fr 220px 140px 140px' : '1fr 220px 140px 140px';
  const typeColor = (EVENT_TYPES[app.eventType] || EVENT_TYPES.community).color;
  return (
    <div
      onClick={onSelect}
      style={{
        display: 'grid', gridTemplateColumns: cols, gap: 14,
        padding: '14px 20px', alignItems: 'center',
        borderBottom: last ? 'none' : '1px solid var(--border)',
        background: selected ? 'color-mix(in oklab, var(--blue) 6%, transparent)' : 'transparent',
        boxShadow: selected ? 'inset 3px 0 0 var(--blue)' : 'none',
        cursor: 'pointer',
        transition: 'background .12s',
      }}
      onMouseEnter={(e) => { if (!selected) e.currentTarget.style.background = 'var(--bg-2)'; }}
      onMouseLeave={(e) => { if (!selected) e.currentTarget.style.background = 'transparent'; }}
    >
      {bulkMode && (
        <Checkbox
          checked={bulkChecked}
          onClick={(e) => { e.stopPropagation(); onBulkToggle(); }}
        />
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
        <Avatar grad={app.grad} name={app.name} size={32}/>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{app.name}</div>
          <div style={{ fontSize: 11, color: 'var(--fg-4)', marginTop: 2 }}>{app.meta} · {app.handle}</div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: typeColor, flexShrink: 0 }}/>
        <span style={{ fontSize: 12, color: 'var(--fg-2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{app.event}</span>
      </div>

      <div style={{ fontSize: 12, color: 'var(--fg-3)' }}>{app.when}</div>

      <div><StatusChip status={app.status}/></div>
    </div>
  );
}

export function ApplicationsList({
  applications,
  selectedId,
  onSelect,
  bulkMode,
  bulkChecked,
  onBulkToggle,
  onSelectAllToggle,
  bulkBar,
}: {
  applications: Application[];
  selectedId: number;
  onSelect: (id: number) => void;
  bulkMode: boolean;
  bulkChecked: number[];
  onBulkToggle: (id: number) => void;
  onSelectAllToggle: () => void;
  bulkBar?: ReactNode;
}) {
  const cols = bulkMode ? '24px 1fr 220px 140px 140px' : '1fr 220px 140px 140px';
  const visibleIds = applications.map((a) => a.id);
  const allChecked = visibleIds.length > 0 && visibleIds.every((id) => bulkChecked.includes(id));
  const someChecked = !allChecked && bulkChecked.length > 0;

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      {bulkBar}

      <div style={{
        display: 'grid', gridTemplateColumns: cols, gap: 14,
        padding: '12px 20px',
        background: 'var(--bg-2)',
        borderBottom: '1px solid var(--border)',
        fontSize: 11, fontWeight: 700, color: 'var(--fg-4)',
        textTransform: 'uppercase', letterSpacing: '0.06em',
      }}>
        {bulkMode && (
          <Checkbox
            checked={allChecked}
            indeterminate={someChecked}
            onClick={(e) => { e.stopPropagation(); onSelectAllToggle(); }}
          />
        )}
        <div>Заявитель</div>
        <div>Событие</div>
        <div>Когда подал</div>
        <div>Статус</div>
      </div>

      {applications.map((app, i) => (
        <AppRow
          key={app.id}
          app={app}
          selected={app.id === selectedId}
          bulkMode={bulkMode}
          bulkChecked={bulkChecked.includes(app.id)}
          last={i === applications.length - 1}
          onSelect={() => onSelect(app.id)}
          onBulkToggle={() => onBulkToggle(app.id)}
        />
      ))}
    </div>
  );
}
