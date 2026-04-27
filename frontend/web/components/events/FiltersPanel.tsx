interface FilterItem { l: string; on?: boolean }

export function FiltersPanel() {
  return (
    <aside className="card" style={{ padding: 20, position: 'sticky', top: 80, alignSelf: 'flex-start' }}>
      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Фильтры</div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: 'var(--fg-4)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>Активно: 2</div>
        <div className="row gap-2" style={{ flexWrap: 'wrap' }}>
          {['Онлайн', 'Бесплатно'].map(c => (
            <span key={c} className="chip" style={{ background: 'var(--grad-soft)', borderColor: 'rgba(155,92,255,0.3)', color: 'white', fontWeight: 500 }}>
              {c} <span style={{ color: 'var(--fg-4)' }}>×</span>
            </span>
          ))}
        </div>
      </div>

      <FilterGroup title="Тип мероприятия" items={[
        { l: 'Конференция' }, { l: 'Фестиваль' }, { l: 'Хакатон', on: true }, { l: 'Мастер-класс' }, { l: 'Встреча' }, { l: 'Акция' },
      ]}/>
      <FilterGroup title="Формат" items={[
        { l: 'Очно', on: true }, { l: 'Онлайн', on: true }, { l: 'Гибрид' },
      ]}/>
      <FilterGroup title="Стоимость" items={[
        { l: 'Бесплатно', on: true }, { l: 'Платно' },
      ]}/>

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button className="btn btn-primary" style={{ justifyContent: 'center' }}>Применить фильтры (2)</button>
        <button className="btn btn-ghost btn-sm" style={{ justifyContent: 'center' }}>★ Сохранить как «Мои интересы»</button>
        <button style={{ fontSize: 12, color: 'var(--fg-4)', textAlign: 'center', padding: 8 }}>Сбросить все</button>
      </div>
    </aside>
  );
}

function FilterGroup({ title, items }: { title: string; items: FilterItem[] }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10 }}>{title}</div>
      <div className="col gap-2">
        {items.map(it => (
          <label key={it.l} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 13, color: 'var(--fg-2)' }}>
            <span style={{
              width: 16, height: 16, borderRadius: 4,
              border: '1px solid ' + (it.on ? 'var(--violet)' : 'var(--border-strong)'),
              background: it.on ? 'var(--grad)' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>{it.on && <svg width="10" height="10" viewBox="0 0 24 24" stroke="white" strokeWidth="3" fill="none"><path d="m5 12 5 5L20 7"/></svg>}</span>
            {it.l}
          </label>
        ))}
      </div>
    </div>
  );
}

export function EmptyState() {
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
          <button className="btn btn-ghost">Сбросить фильтры</button>
          <button className="btn btn-primary">🔔 Подписаться на новые</button>
        </div>
      </div>
    </div>
  );
}
