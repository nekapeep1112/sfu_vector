'use client';

import { useState } from 'react';
import { INSTITUTES, DORMS, tonalShift } from '@/lib/mock-data';
import { Wheel } from '@/components/Wheel';
import { DormsMap, DormDetailRail } from '@/components/DormsMap';

export default function OrgsPage() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string>('ИКИТ');
  const [tab, setTab] = useState<string>('Карта');

  const [dormHovered, setDormHovered] = useState<number | null>(null);
  const [dormSelected, setDormSelected] = useState<number>(22);

  const isDorms = tab === 'Общежития';
  const sel = INSTITUTES.find(i => i.abbr === selected) ?? INSTITUTES[0];

  return (
    <div style={{ maxWidth: 1440, margin: '0 auto', padding: 32, display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24 }}>
      {/* main */}
      <div>
        <div className="row" style={{ marginBottom: 8, gap: 8 }}>
          <button style={{ color: 'var(--fg-3)', fontSize: 13 }}>← Организации</button>
        </div>
        <h1 className="h2" style={{ margin: 0, marginBottom: 8 }}>{isDorms ? 'Карта общежитий' : 'Карта институтов'}</h1>
        <div style={{ fontSize: 13, color: 'var(--fg-3)', marginBottom: 20 }}>
          {isDorms
            ? `${DORMS.length} общежитий · 3 кампуса · ${DORMS.reduce((a, d) => a + d.capacity, 0).toLocaleString('ru')} мест`
            : '20 институтов · 50+ организаций · 5 000+ студентов'}
        </div>

        <div style={{ display: 'flex', gap: 4, padding: 4, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, marginBottom: 20, width: 'fit-content' }}>
          {['Список', 'Карта', 'Общежития'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '8px 16px', borderRadius: 8,
              background: tab === t ? 'var(--grad-soft)' : 'transparent',
              border: '1px solid ' + (tab === t ? 'rgba(155,92,255,0.3)' : 'transparent'),
              fontSize: 13, fontWeight: 500,
              color: tab === t ? 'var(--fg)' : 'var(--fg-3)',
            }}>{t}</button>
          ))}
        </div>

        <div className="card" style={{ padding: 24, position: 'relative', minHeight: 740, overflow: 'hidden' }}>
          {isDorms ? (
            <>
              <DormsMap
                hovered={dormHovered} setHovered={setDormHovered}
                selected={dormSelected} setSelected={setDormSelected}
              />
              <div className="row" style={{ marginTop: 20, gap: 12, flexWrap: 'wrap' }}>
                <div className="row gap-2" style={{ fontSize: 11, color: 'var(--fg-3)' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green)' }}/>
                  Есть свободные места
                </div>
                <div className="row gap-2" style={{ fontSize: 11, color: 'var(--fg-3)' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--red)' }}/>
                  Полностью заселено
                </div>
                <div style={{ marginLeft: 'auto' }} className="row gap-2">
                  <input className="input" placeholder="Номер общежития…" style={{ width: 200, height: 36, fontSize: 13 }}/>
                </div>
              </div>
            </>
          ) : (
            <>
              <Wheel
                hovered={hovered} setHovered={setHovered}
                selected={selected} setSelected={setSelected}
              />
              <div className="row" style={{ marginTop: 20, gap: 12, flexWrap: 'wrap' }}>
                <div className="row gap-2" style={{ fontSize: 11, color: 'var(--fg-3)' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--violet)', boxShadow: '0 0 8px var(--violet)' }}/>
                  Идёт набор
                </div>
                <div className="row gap-2" style={{ fontSize: 11, color: 'var(--fg-3)' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--fg-4)' }}/>
                  Без активного набора
                </div>
                <div style={{ marginLeft: 'auto' }} className="row gap-2">
                  <input className="input" placeholder="Поиск института…" style={{ width: 200, height: 36, fontSize: 13 }}/>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* right rail — institute or dorm detail */}
      <div className="col gap-4">
        {isDorms ? <DormDetailRail dormNum={dormSelected}/> : (
        <div className="card" style={{ padding: 24, position: 'sticky', top: 80 }}>
          <div className="row" style={{ justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontSize: 12, color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>Выбранный институт</span>
            <button style={{ fontSize: 12, color: 'var(--violet)' }}>Сбросить ×</button>
          </div>
          <div className="row gap-3" style={{ marginBottom: 20 }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: `linear-gradient(135deg, ${sel.color}, ${tonalShift(sel.color)})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M3 9 12 3l9 6v12H3z"/><path d="M9 21V12h6v9"/></svg>
            </div>
            <div className="col" style={{ minWidth: 0 }}>
              <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.01em' }}>{sel.abbr}</div>
              <div style={{ fontSize: 12, color: 'var(--fg-3)', lineHeight: 1.4 }}>{sel.name}</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
            {[{v:3,l:'организаций'},{v:'832',l:'участников'},{v:47,l:'мероприятий'}].map((s, i) => (
              <div key={i} style={{ padding: 12, borderRadius: 10, background: 'var(--bg-2)', border: '1px solid var(--border)', textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 800 }}>{s.v}</div>
                <div style={{ fontSize: 10, color: 'var(--fg-4)' }}>{s.l}</div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-4)', marginBottom: 12 }}>Организации института</div>
          <div className="col gap-2">
            {[
              { abbr: 'СС', name: 'Студенческий совет ИКИТ', tag: 'Студсовет', count: 128, col: '#4F7FFF' },
              { abbr: 'ПФ', name: 'Профком ИКИТ', tag: 'Профсоюз', count: 320, col: '#9B5CFF' },
              { abbr: 'МЦ', name: 'Медиацентр ИКИТ', tag: 'Медиа', count: 384, col: '#F5A524' },
            ].map((o, i) => (
              <div key={i} className="card-hover" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 10, background: 'var(--bg-2)', border: '1px solid var(--border)', cursor: 'pointer' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${o.col}, ${tonalShift(o.col)})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: 'white', flexShrink: 0 }}>{o.abbr}</div>
                <div className="col" style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{o.name}</div>
                  <div className="row gap-2" style={{ marginTop: 2 }}>
                    <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 4, background: 'var(--surface-2)', color: 'var(--fg-3)' }}>{o.tag}</span>
                    <span style={{ fontSize: 10, color: 'var(--green)' }}>● Активно</span>
                    <span style={{ fontSize: 10, color: 'var(--fg-4)' }}>{o.count} уч.</span>
                  </div>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--fg-4)' }}><path d="m9 18 6-6-6-6"/></svg>
              </div>
            ))}
          </div>
          <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}>Все организации ИКИТ →</button>
        </div>
        )}
      </div>
    </div>
  );
}
