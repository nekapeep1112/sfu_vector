'use client';

import { useMemo, useState } from 'react';
import { EVENTS, EVENT_TYPES, type EventType } from '@/lib/mock-data';
import { EventRow } from '@/components/events/EventRow';
import { FiltersPanel, EmptyState } from '@/components/events/FiltersPanel';

type Tab = 'all' | 'recommended' | 'mine' | 'favorites';

const TABS: { id: Tab; label: string }[] = [
  { id: 'all',         label: 'Все' },
  { id: 'recommended', label: 'Рекомендуемые' },
  { id: 'mine',        label: 'Мои' },
  { id: 'favorites',   label: 'Избранное' },
];

const TYPE_OPTIONS = (Object.entries(EVENT_TYPES) as [EventType, { label: string }][])
  .map(([k, v]) => ({ value: k, label: v.label }));

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<EventType | 'all'>('all');
  const [formatFilter, setFormatFilter] = useState<string>('all');
  const [favorites, setFavorites] = useState<Set<number>>(() => new Set([2, 4]));

  const formats = useMemo(() => Array.from(new Set(EVENTS.map((e) => e.format))), []);

  const tabFiltered = useMemo(() => {
    if (activeTab === 'mine') {
      return EVENTS.filter((e) => e.myStatus === 'registered' || e.myStatus === 'pending');
    }
    if (activeTab === 'favorites') {
      return EVENTS.filter((e) => favorites.has(e.id));
    }
    if (activeTab === 'recommended') {
      return EVENTS.slice(0, 4);
    }
    return EVENTS;
  }, [activeTab, favorites]);

  const filtered = useMemo(() => {
    let list = tabFiltered;
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((e) => e.title.toLowerCase().includes(q) || e.org.toLowerCase().includes(q));
    }
    if (typeFilter !== 'all')   list = list.filter((e) => e.type === typeFilter);
    if (formatFilter !== 'all') list = list.filter((e) => e.format === formatFilter);
    return list;
  }, [tabFiltered, search, typeFilter, formatFilter]);

  const counts: Record<Tab, number> = {
    all: EVENTS.length,
    recommended: Math.min(4, EVENTS.length),
    mine: EVENTS.filter((e) => e.myStatus === 'registered' || e.myStatus === 'pending').length,
    favorites: favorites.size,
  };

  const activeFiltersCount =
    (typeFilter !== 'all' ? 1 : 0) +
    (formatFilter !== 'all' ? 1 : 0) +
    (search.trim() ? 1 : 0);

  const onResetFilters = () => {
    setTypeFilter('all');
    setFormatFilter('all');
    setSearch('');
  };

  const onToggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div style={{ maxWidth: 1440, margin: '0 auto', padding: 32 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 className="h2" style={{ margin: 0 }}>Мероприятия</h1>
        <p style={{ fontSize: 13, color: 'var(--fg-3)', margin: '4px 0 0' }}>
          {filtered.length === 0
            ? '0 событий по выбранным фильтрам'
            : `${filtered.length} событий · следующие 30 дней`}
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, padding: 4, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, marginBottom: 16, width: 'fit-content' }}>
        {TABS.map((t) => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                padding: '8px 16px', borderRadius: 8,
                background: isActive ? 'var(--grad-soft)' : 'transparent',
                border: '1px solid ' + (isActive ? 'rgba(155,92,255,0.3)' : 'transparent'),
                fontSize: 13, fontWeight: 500,
                color: isActive ? 'var(--fg)' : 'var(--fg-3)',
                cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}
            >
              {t.label}
              <span style={{ fontSize: 11, color: isActive ? 'var(--fg-3)' : 'var(--fg-4)', fontWeight: 600 }}>{counts[t.id]}</span>
            </button>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }}>
        <div>
          {/* Search row */}
          <div className="row gap-3" style={{ marginBottom: 24, flexWrap: 'wrap' }}>
            <input
              className="input"
              placeholder="Поиск мероприятий…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ flex: 1, minWidth: 200, height: 40 }}
            />
            <DropdownButton
              value={typeFilter}
              defaultLabel="Все типы"
              options={[{ value: 'all', label: 'Все типы' }, ...TYPE_OPTIONS]}
              onChange={(v) => setTypeFilter(v as EventType | 'all')}
            />
            <DropdownButton
              value={formatFilter}
              defaultLabel="Все форматы"
              options={[{ value: 'all', label: 'Все форматы' }, ...formats.map((f) => ({ value: f, label: f }))]}
              onChange={setFormatFilter}
            />
            {activeFiltersCount > 0 && (
              <button
                className="btn btn-ghost btn-sm"
                onClick={onResetFilters}
                style={{ height: 40, background: 'var(--grad-soft)', borderColor: 'rgba(155,92,255,0.3)', display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                Сбросить
                <span style={{ padding: '0 6px', fontSize: 10, background: 'var(--violet)', color: 'white', borderRadius: 4, fontWeight: 700 }}>{activeFiltersCount}</span>
              </button>
            )}
          </div>

          {filtered.length === 0 ? <EmptyState onReset={onResetFilters}/> : (
            <div className="col gap-3">
              {filtered.map((e) => (
                <EventRow
                  key={e.id}
                  event={e}
                  isFavorite={favorites.has(e.id)}
                  onToggleFavorite={() => onToggleFavorite(e.id)}
                />
              ))}
            </div>
          )}
        </div>

        <FiltersPanel/>
      </div>
    </div>
  );
}

function DropdownButton({ value, defaultLabel, options, onChange }: {
  value: string;
  defaultLabel: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const isActive = value !== 'all';
  const selected = options.find((o) => o.value === value);
  return (
    <div style={{ position: 'relative' }}>
      <button
        className="btn btn-ghost btn-sm"
        onClick={() => setOpen((o) => !o)}
        style={{
          height: 40, display: 'inline-flex', alignItems: 'center', gap: 6,
          background: isActive ? 'var(--grad-soft)' : undefined,
          borderColor: isActive ? 'rgba(155,92,255,0.3)' : undefined,
        }}
      >
        {selected?.label ?? defaultLabel}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 9 }}/>
          <div style={{
            position: 'absolute', top: 'calc(100% + 4px)', left: 0,
            minWidth: 220, background: 'var(--surface)',
            border: '1px solid var(--border)', borderRadius: 10,
            boxShadow: 'var(--shadow-pop)',
            padding: 4, zIndex: 10, maxHeight: 320, overflowY: 'auto',
          }}>
            {options.map((o) => {
              const isSelected = o.value === value;
              return (
                <button
                  key={o.value}
                  onClick={() => { onChange(o.value); setOpen(false); }}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    padding: '8px 12px', borderRadius: 6,
                    background: isSelected ? 'var(--bg-2)' : 'transparent',
                    border: 'none', cursor: 'pointer',
                    fontSize: 13, color: 'var(--fg)',
                    fontWeight: isSelected ? 600 : 400,
                  }}
                  onMouseEnter={(ev) => { if (!isSelected) ev.currentTarget.style.background = 'var(--bg-2)'; }}
                  onMouseLeave={(ev) => { if (!isSelected) ev.currentTarget.style.background = 'transparent'; }}
                >{o.label}</button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
