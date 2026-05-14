'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  DORMITORIES,
  ORGANIZATIONS,
  tonalShift,
  type Dormitory,
  type Organization,
} from '@/lib/mock-data';

const DORM_CHIP_COLOR = '#4F7FFF';

function dormOrgs(num: number): Organization[] {
  return ORGANIZATIONS.filter(o => o.host.type === 'dormitory' && o.host.dormNumber === num);
}

export function OrgDormsView() {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    const q = query.trim();
    if (!q) return DORMITORIES;
    return DORMITORIES.filter(d => String(d.number).includes(q));
  }, [query]);

  const toggle = (num: number) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });
  };

  return (
    <div>
      <div className="row" style={{ marginBottom: 16 }}>
        <input
          className="input"
          placeholder="Номер общежития…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ width: 240, height: 36, fontSize: 13 }}
        />
      </div>

      {visible.length === 0 ? (
        <div className="card" style={{ padding: 32, textAlign: 'center', color: 'var(--fg-4)' }}>
          Ничего не найдено
        </div>
      ) : (
        <div className="col" style={{ gap: 8 }}>
          {visible.map(dorm => (
            <DormRow
              key={dorm.number}
              dorm={dorm}
              expanded={expanded.has(dorm.number)}
              onToggle={() => toggle(dorm.number)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function DormRow({ dorm, expanded, onToggle }: { dorm: Dormitory; expanded: boolean; onToggle: () => void }) {
  const orgs = dormOrgs(dorm.number);

  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: 16,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          color: 'inherit',
        }}
      >
        <div
          style={{
            width: 48, height: 48, borderRadius: 12,
            background: `linear-gradient(135deg, ${DORM_CHIP_COLOR}, ${tonalShift(DORM_CHIP_COLOR)})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: 16, fontWeight: 800,
            flexShrink: 0,
          }}
        >
          {dorm.number}
        </div>
        <div className="col" style={{ flex: 1, minWidth: 0, gap: 2 }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>Общежитие №{dorm.number}</div>
          <div style={{ fontSize: 12, color: 'var(--fg-3)' }}>{dorm.address}</div>
        </div>
        <div style={{ fontSize: 12, color: orgs.length > 0 ? 'var(--fg)' : 'var(--fg-4)', fontWeight: orgs.length > 0 ? 600 : 400 }}>
          {orgs.length > 0 ? `${orgs.length} ${orgs.length === 1 ? 'организация' : orgs.length < 5 ? 'организации' : 'организаций'}` : '—'}
        </div>
        <svg
          width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2"
          style={{ color: 'var(--fg-4)', transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}
        >
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>

      {expanded && (
        <div style={{ padding: '0 16px 16px 80px' }}>
          {orgs.length === 0 ? (
            <div style={{ padding: 16, borderRadius: 10, background: 'var(--bg-2)', border: '1px dashed var(--border)', color: 'var(--fg-4)', fontSize: 13, textAlign: 'center' }}>
              Здесь пока нет организаций. Создай свою!
            </div>
          ) : (
            <div className="col gap-2">
              {orgs.map(org => (
                <Link
                  key={org.id}
                  href={`/dashboard/organizations/${org.id}`}
                  className="card-hover"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: 12, borderRadius: 10,
                    background: 'var(--bg-2)', border: '1px solid var(--border)',
                    textDecoration: 'none', color: 'inherit',
                  }}
                >
                  <div
                    style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: `linear-gradient(135deg, ${org.color}, ${tonalShift(org.color)})`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontSize: 12, fontWeight: 800,
                      flexShrink: 0,
                    }}
                  >
                    {org.short}
                  </div>
                  <div className="col" style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{org.name}</div>
                    <div className="row gap-2" style={{ marginTop: 2 }}>
                      {org.verified && <span style={{ fontSize: 10, color: 'var(--green)' }}>✓ verified</span>}
                      <span style={{ fontSize: 10, color: 'var(--fg-4)' }}>{org.members} уч.</span>
                    </div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--fg-4)' }}>
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
