'use client';

import { useState } from 'react';
import Link from 'next/link';
import { INSTITUTES, ORGANIZATIONS, tonalShift } from '@/lib/mock-data';
import { Wheel } from '@/components/Wheel';

export function OrgMapView() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string>('');

  const displayedAbbr = selected || hovered || '';
  const displayed = displayedAbbr ? INSTITUTES.find(i => i.abbr === displayedAbbr) : null;
  const isLocked = !!selected;
  const orgsOfInstitute = displayed
    ? ORGANIZATIONS.filter(o => o.host.type === 'institute' && o.host.instituteAbbr === displayed.abbr)
    : [];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24 }}>
      <div className="card" style={{ padding: 24, position: 'relative', minHeight: 740, overflow: 'hidden' }}>
        <Wheel
          hovered={hovered} setHovered={setHovered}
          selected={selected} setSelected={setSelected}
        />
      </div>

      <div className="col gap-4">
        <div className="card" style={{ padding: 24, position: 'sticky', top: 80 }}>
          {!displayed ? (
            <div style={{ padding: '40px 16px', textAlign: 'center', color: 'var(--fg-4)' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 12px', display: 'block', opacity: 0.6 }}>
                <circle cx="12" cy="12" r="9"/>
                <path d="M12 7v5l3 2"/>
              </svg>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg-3)', marginBottom: 4 }}>Выбери институт</div>
              <div style={{ fontSize: 12, lineHeight: 1.5 }}>
                Наведи курсор на сектор колеса — здесь появится превью. Кликни, чтобы закрепить выбор.
              </div>
            </div>
          ) : (
            <>
              <div className="row" style={{ justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ fontSize: 12, color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                  {isLocked ? 'Выбранный институт' : 'Превью института'}
                </span>
                {isLocked && (
                  <button style={{ fontSize: 12, color: 'var(--violet)' }} onClick={() => setSelected('')}>Сбросить ×</button>
                )}
              </div>
              <div className="row gap-3" style={{ marginBottom: 20 }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: `linear-gradient(135deg, ${displayed.color}, ${tonalShift(displayed.color)})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M3 9 12 3l9 6v12H3z"/><path d="M9 21V12h6v9"/></svg>
                </div>
                <div className="col" style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.01em' }}>{displayed.abbr}</div>
                  <div style={{ fontSize: 12, color: 'var(--fg-3)', lineHeight: 1.4 }}>{displayed.name}</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
                {[
                  { v: orgsOfInstitute.length, l: 'организаций' },
                  { v: '832', l: 'участников' },
                  { v: 47, l: 'мероприятий' },
                ].map((s, i) => (
                  <div key={i} style={{ padding: 12, borderRadius: 10, background: 'var(--bg-2)', border: '1px solid var(--border)', textAlign: 'center' }}>
                    <div style={{ fontSize: 18, fontWeight: 800 }}>{s.v}</div>
                    <div style={{ fontSize: 10, color: 'var(--fg-4)' }}>{s.l}</div>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-4)', marginBottom: 12 }}>Организации института</div>
              {orgsOfInstitute.length === 0 ? (
                <div style={{ padding: 16, borderRadius: 10, background: 'var(--bg-2)', border: '1px dashed var(--border)', color: 'var(--fg-4)', fontSize: 13, textAlign: 'center' }}>
                  В этом институте пока нет зарегистрированных организаций
                </div>
              ) : (
                <div className="col gap-2">
                  {orgsOfInstitute.map(org => (
                    <Link
                      key={org.id}
                      href={`/dashboard/organizations/${org.id}`}
                      className="card-hover"
                      style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 10, background: 'var(--bg-2)', border: '1px solid var(--border)', textDecoration: 'none', color: 'inherit' }}
                    >
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${org.color}, ${tonalShift(org.color)})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: 'white', flexShrink: 0 }}>
                        {org.short}
                      </div>
                      <div className="col" style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{org.name}</div>
                        <div className="row gap-2" style={{ marginTop: 2 }}>
                          {org.verified && <span style={{ fontSize: 10, color: 'var(--green)' }}>● Активно</span>}
                          <span style={{ fontSize: 10, color: 'var(--fg-4)' }}>{org.members} уч.</span>
                        </div>
                      </div>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--fg-4)' }}><path d="m9 18 6-6-6-6"/></svg>
                    </Link>
                  ))}
                </div>
              )}
              {isLocked && (
                <Link
                  href={`/dashboard/orgs?tab=list&institute=${encodeURIComponent(displayed.abbr)}`}
                  className="btn btn-ghost"
                  style={{ width: '100%', justifyContent: 'center', marginTop: 16, textDecoration: 'none' }}
                >
                  Все организации {displayed.abbr} →
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
