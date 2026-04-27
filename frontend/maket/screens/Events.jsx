// Events list screen
function EventsScreen({ empty = false }) {
  const events = empty ? [] : EVENTS;

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar active="events" loggedIn={true}/>
        <main style={{ flex: 1, minWidth: 0 }}>
          <Topbar loggedIn={true}/>
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

            {/* Filters panel */}
            <FiltersPanel/>
          </div>
          <Footer/>
        </main>
      </div>
    </div>
  );
}

function EventRow({ event }) {
  const t = EVENT_TYPES[event.type];
  const beFirst = event.registered === 0 || event.registered < 5;
  return (
    <div className="card card-hover" style={{
      padding: 16,
      display: 'grid',
      gridTemplateColumns: '180px minmax(0, 1fr) 220px',
      gap: 20,
      alignItems: 'stretch',
    }}>
      {/* COVER + date badge overlay */}
      <div style={{ position: 'relative', height: 140 }}>
        <EventCover event={event} height={140}/>
        <div style={{
          position: 'absolute', top: 10, left: 10,
          background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(15,23,42,0.1)',
          borderRadius: 10,
          padding: '6px 10px',
          textAlign: 'center',
          minWidth: 50,
          boxShadow: '0 2px 8px rgba(15,23,42,0.08)',
        }}>
          <div style={{ fontSize: 18, fontWeight: 800, lineHeight: 1, color: 'var(--fg)', letterSpacing: '-0.02em' }}>{event.date.d}</div>
          <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 2 }}>{event.date.m} · {event.date.wd}</div>
        </div>
      </div>

      {/* MAIN CONTENT — flexible column, no overlap */}
      <div className="col" style={{ minWidth: 0, gap: 8, justifyContent: 'space-between' }}>
        <div className="col" style={{ gap: 8, minWidth: 0 }}>
          <div className="row gap-2" style={{ flexWrap: 'wrap', rowGap: 6 }}>
            <span style={{ background: t.bg, border: `1px solid ${t.color}40`, color: t.color, padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap' }}>● {t.label}</span>
            <span className="chip" style={{ fontSize: 11, whiteSpace: 'nowrap' }}>{event.format}</span>
            {beFirst && (
              <span style={{ background: 'var(--grad)', color: 'white', padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' }}>Будь первым</span>
            )}
          </div>
          <div style={{
            fontSize: 16, fontWeight: 700,
            letterSpacing: '-0.005em',
            lineHeight: 1.3,
            wordBreak: 'break-word',
            overflowWrap: 'anywhere',
          }}>{event.title}</div>
        </div>

        <div className="col" style={{ gap: 4, minWidth: 0, fontSize: 12 }}>
          <div className="row gap-2" style={{ color: 'var(--fg-3)', minWidth: 0 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0 }}>{event.loc}</span>
          </div>
          <div className="row gap-2" style={{ color: 'var(--fg-4)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
            <span>{event.time} · {event.duration}</span>
          </div>
          <div style={{ color: 'var(--fg-4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Организатор: {event.org}</div>
        </div>
      </div>

      {/* RIGHT — capacity + avatars + CTA */}
      <div className="col" style={{ gap: 12, justifyContent: 'space-between', minWidth: 0 }}>
        <div className="col gap-3">
          <CapacityBar registered={event.registered} capacity={event.capacity} color={t.color}/>
          <AvatarStack count={event.registered}/>
        </div>
        <button className="btn btn-primary btn-sm" style={{ justifyContent: 'center', height: 36, width: '100%' }}>Участвовать</button>
      </div>
    </div>
  );
}

function FiltersPanel() {
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

function FilterGroup({ title, items }) {
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

function EmptyState() {
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

window.EventsScreen = EventsScreen;
