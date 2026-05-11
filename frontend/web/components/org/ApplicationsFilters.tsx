'use client';

import { useState, type ReactNode } from 'react';
import type { TabId, Counts } from '@/components/org/applications-types';

const Ap = {
  search: (p: { s?: number } = {}) => (
    <svg width={p.s ?? 16} height={p.s ?? 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
    </svg>
  ),
  chev: (p: { s?: number } = {}) => (
    <svg width={p.s ?? 14} height={p.s ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  ),
  x: (p: { s?: number } = {}) => (
    <svg width={p.s ?? 14} height={p.s ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
  ),
};

function FilterChip({ active, onClick, children }: { active?: boolean; onClick?: () => void; children: ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '7px 12px', borderRadius: 8,
        background: active ? 'var(--grad-soft)' : 'transparent',
        border: active ? '1px solid color-mix(in oklab, var(--blue) 30%, transparent)' : '1px solid var(--border)',
        color: active ? 'var(--fg)' : 'var(--fg-2)',
        fontSize: 13, fontWeight: 600, cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >{children}</button>
  );
}

function GhostBtn({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button className="btn btn-ghost btn-sm" onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
    }}>{children}</button>
  );
}

function Divider() {
  return <span style={{ width: 1, height: 24, background: 'var(--border)', margin: '0 4px' }}/>;
}

export function ApplicationsFilters({
  activeTab,
  onTabChange,
  counts,
}: {
  activeTab: TabId;
  onTabChange: (t: TabId) => void;
  counts: Counts;
}) {
  const [search, setSearch] = useState('');

  return (
    <div className="card" style={{ padding: 14, display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
      <FilterChip active={activeTab === 'pending'} onClick={() => onTabChange('pending')}>
        ● Требуют решения <span style={{ color: 'var(--fg-3)', marginLeft: 4 }}>{counts.pending}</span>
      </FilterChip>
      <FilterChip active={activeTab === 'approved'} onClick={() => onTabChange('approved')}>
        Одобренные <span style={{ color: 'var(--fg-3)', marginLeft: 4 }}>{counts.approved}</span>
      </FilterChip>
      <FilterChip active={activeTab === 'rejected'} onClick={() => onTabChange('rejected')}>
        Отклонённые <span style={{ color: 'var(--fg-3)', marginLeft: 4 }}>{counts.rejected}</span>
      </FilterChip>
      <FilterChip active={activeTab === 'all'} onClick={() => onTabChange('all')}>
        Все <span style={{ color: 'var(--fg-3)', marginLeft: 4 }}>{counts.all}</span>
      </FilterChip>

      <Divider/>

      <GhostBtn onClick={() => console.log('TODO: filter events')}>Все события <Ap.chev/></GhostBtn>

      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '5px 6px 5px 10px', borderRadius: 999,
        background: 'color-mix(in oklab, var(--blue) 10%, transparent)',
        border: '1px solid color-mix(in oklab, var(--blue) 25%, transparent)',
        color: 'var(--blue)', fontSize: 12, fontWeight: 600,
      }}>
        Хакатон Siberian Hack 2026
        <button
          onClick={() => console.log('TODO: clear event filter')}
          style={{
            width: 18, height: 18, borderRadius: 999,
            background: 'color-mix(in oklab, var(--blue) 18%, transparent)',
            border: 'none', color: 'var(--blue)', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}
        ><Ap.x s={10}/></button>
      </span>

      <GhostBtn onClick={() => console.log('TODO: filter institutes')}>Все институты <Ap.chev/></GhostBtn>
      <GhostBtn onClick={() => console.log('TODO: filter period')}>За всё время <Ap.chev/></GhostBtn>

      <div style={{ flex: 1 }}/>
      <div style={{ position: 'relative', width: 320 }}>
        <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--fg-4)', display: 'inline-flex' }}>
          <Ap.search/>
        </span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%', height: 36, paddingLeft: 36, paddingRight: 12,
            borderRadius: 8, border: '1px solid var(--border)',
            background: 'var(--bg-2)', color: 'var(--fg)',
            fontSize: 13, outline: 'none',
          }}
          placeholder="Поиск по имени, email…"
        />
      </div>
    </div>
  );
}
