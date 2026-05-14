'use client';

import { useMemo, useState } from 'react';

interface FilterItem { id: string; label: string }

const TYPE_ITEMS: FilterItem[] = [
  { id: 'conf',       label: 'Конференция' },
  { id: 'fest',       label: 'Фестиваль' },
  { id: 'hack',       label: 'Хакатон' },
  { id: 'master',     label: 'Мастер-класс' },
  { id: 'meeting',    label: 'Встреча' },
  { id: 'action',     label: 'Акция' },
];

const FORMAT_ITEMS: FilterItem[] = [
  { id: 'offline', label: 'Очно' },
  { id: 'online',  label: 'Онлайн' },
  { id: 'hybrid',  label: 'Гибрид' },
];

const PRICE_ITEMS: FilterItem[] = [
  { id: 'free', label: 'Бесплатно' },
  { id: 'paid', label: 'Платно' },
];

export function FiltersPanel() {
  const [active, setActive] = useState<Set<string>>(() => new Set());

  const toggle = (id: string) => {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const resetAll = () => setActive(new Set());

  const chips = useMemo(() => {
    const all = [...TYPE_ITEMS, ...FORMAT_ITEMS, ...PRICE_ITEMS];
    return all.filter((i) => active.has(i.id));
  }, [active]);

  return (
    <aside className="card" style={{ padding: 20, position: 'sticky', top: 80, alignSelf: 'flex-start' }}>
      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Фильтры</div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: 'var(--fg-4)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>Активно: {chips.length}</div>
        {chips.length === 0 ? (
          <div style={{ fontSize: 12, color: 'var(--fg-4)' }}>Ничего не выбрано</div>
        ) : (
          <div className="row gap-2" style={{ flexWrap: 'wrap' }}>
            {chips.map((c) => (
              <button
                key={c.id}
                onClick={() => toggle(c.id)}
                className="chip"
                style={{ background: 'var(--grad-soft)', borderColor: 'rgba(155,92,255,0.3)', color: 'var(--fg)', fontWeight: 500, cursor: 'pointer' }}
              >
                {c.label} <span style={{ color: 'var(--fg-4)' }}>×</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <FilterGroup title="Тип мероприятия" items={TYPE_ITEMS} active={active} onToggle={toggle}/>
      <FilterGroup title="Формат"          items={FORMAT_ITEMS} active={active} onToggle={toggle}/>
      <FilterGroup title="Стоимость"       items={PRICE_ITEMS}  active={active} onToggle={toggle}/>

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button
          className="btn btn-primary"
          style={{ justifyContent: 'center' }}
          onClick={() => console.log('TODO: apply filters', Array.from(active))}
        >Применить фильтры{active.size > 0 ? ` (${active.size})` : ''}</button>
        <button
          onClick={resetAll}
          style={{ fontSize: 12, color: 'var(--fg-4)', textAlign: 'center', padding: 8, background: 'transparent', border: 'none', cursor: 'pointer' }}
        >Сбросить все</button>
      </div>
    </aside>
  );
}

function FilterGroup({ title, items, active, onToggle }: { title: string; items: FilterItem[]; active: Set<string>; onToggle: (id: string) => void }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10 }}>{title}</div>
      <div className="col gap-2">
        {items.map((it) => {
          const on = active.has(it.id);
          return (
            <label
              key={it.id}
              style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 13, color: 'var(--fg-2)' }}
            >
              <input
                type="checkbox"
                checked={on}
                onChange={() => onToggle(it.id)}
                style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
              />
              <span style={{
                width: 16, height: 16, borderRadius: 4,
                border: '1px solid ' + (on ? 'var(--violet)' : 'var(--border-strong)'),
                background: on ? 'var(--grad)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>{on && <svg width="10" height="10" viewBox="0 0 24 24" stroke="white" strokeWidth="3" fill="none"><path d="m5 12 5 5L20 7"/></svg>}</span>
              {it.label}
            </label>
          );
        })}
      </div>
    </div>
  );
}

export function EmptyState({ onReset }: { onReset?: () => void }) {
  return (
    <div className="card" style={{ padding: 60, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(155,92,255,0.08), transparent 60%)', pointerEvents: 'none' }}/>
      <div style={{ position: 'relative' }}>
        <div style={{ width: 72, height: 72, margin: '0 auto 24px', borderRadius: 18, background: 'var(--grad-soft)', border: '1px solid rgba(155,92,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--violet)" strokeWidth="1.5"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
        </div>
        <h3 className="h3" style={{ margin: 0, marginBottom: 8 }}>Ничего не нашлось</h3>
        <p style={{ fontSize: 14, color: 'var(--fg-3)', maxWidth: 380, margin: '0 auto 24px', lineHeight: 1.55 }}>
          По выбранным фильтрам нет мероприятий. Попробуй смягчить фильтры или подпишись на оповещения — пришлём, как только появятся подходящие события.
        </p>
        <div className="row gap-3" style={{ justifyContent: 'center' }}>
          {onReset && <button className="btn btn-ghost" onClick={onReset}>Сбросить фильтры</button>}
          <button className="btn btn-primary" onClick={() => console.log('TODO: subscribe to new events')}>🔔 Подписаться на новые</button>
        </div>
      </div>
    </div>
  );
}
