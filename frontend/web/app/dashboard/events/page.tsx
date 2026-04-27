import { EVENTS } from '@/lib/mock-data';
import { EventRow } from '@/components/events/EventRow';
import { FiltersPanel, EmptyState } from '@/components/events/FiltersPanel';

export default function EventsPage() {
  const empty = false;
  const events = empty ? [] : EVENTS;

  return (
    <div style={{ maxWidth: 1440, margin: '0 auto', padding: 32, display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
      <div>
        <div className="row" style={{ justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <h1 className="h2" style={{ margin: 0 }}>Мероприятия</h1>
            <p style={{ fontSize: 13, color: 'var(--fg-3)', margin: '4px 0 0' }}>{empty ? '0 событий по выбранным фильтрам' : `${events.length} ближайших событий · следующие 30 дней`}</p>
          </div>
          <button className="btn btn-primary">+ Создать мероприятие</button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, padding: 4, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, marginBottom: 16, width: 'fit-content' }}>
          {['Все', 'Рекомендуемые', 'Мои', 'Избранное'].map((t, i) => (
            <button key={t} style={{
              padding: '8px 16px', borderRadius: 8,
              background: i === 0 ? 'var(--grad-soft)' : 'transparent',
              border: '1px solid ' + (i === 0 ? 'rgba(155,92,255,0.3)' : 'transparent'),
              fontSize: 13, fontWeight: 500,
              color: i === 0 ? 'var(--fg)' : 'var(--fg-3)',
            }}>{t}</button>
          ))}
        </div>

        {/* Search row */}
        <div className="row gap-3" style={{ marginBottom: 24, flexWrap: 'wrap' }}>
          <input className="input" placeholder="Поиск мероприятий…" style={{ flex: 1, minWidth: 200, height: 40 }}/>
          {['Все типы', 'Все форматы', 'Все институты'].map(p => (
            <button key={p} className="btn btn-ghost btn-sm" style={{ height: 40 }}>
              {p} <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
            </button>
          ))}
          <button className="btn btn-ghost btn-sm" style={{ height: 40, background: 'var(--grad-soft)', borderColor: 'rgba(155,92,255,0.3)' }}>
            Фильтры <span className="chip" style={{ padding: '0 6px', fontSize: 10, background: 'var(--violet)', color: 'white', borderColor: 'transparent' }}>2</span>
          </button>
        </div>

        {empty ? <EmptyState/> : (
          <div className="col gap-3">
            {events.map(e => <EventRow key={e.id} event={e}/>)}
            <button className="btn btn-ghost" style={{ alignSelf: 'center', marginTop: 16 }}>Показать ещё ↓</button>
          </div>
        )}
      </div>

      <FiltersPanel/>
    </div>
  );
}
