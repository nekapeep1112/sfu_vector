'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ORGANIZATIONS, INSTITUTES, tonalShift, type Organization } from '@/lib/mock-data';

type FilterKey = 'all' | 'institute' | 'university' | 'dormitory';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all',         label: 'Все' },
  { key: 'institute',   label: 'Институтские' },
  { key: 'university',  label: 'Общеуниверситетские' },
  { key: 'dormitory',   label: 'Общажные' },
];

function hostLabel(org: Organization): string {
  const h = org.host;
  switch (h.type) {
    case 'institute':  return h.instituteAbbr;
    case 'university': return 'Общеуниверситетская';
    case 'dormitory':  return `Общежитие №${h.dormNumber}`;
  }
}

export function OrgListView() {
  const sp = useSearchParams();
  const router = useRouter();
  const instituteParam = sp.get('institute');

  const [filter, setFilter] = useState<FilterKey>(instituteParam ? 'institute' : 'all');
  const [instituteFilter, setInstituteFilter] = useState<string | null>(instituteParam);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (instituteParam) {
      router.replace('/dashboard/orgs?tab=list', { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const counts = useMemo(() => ({
    all:        ORGANIZATIONS.length,
    institute:  ORGANIZATIONS.filter(o => o.host.type === 'institute').length,
    university: ORGANIZATIONS.filter(o => o.host.type === 'university').length,
    dormitory:  ORGANIZATIONS.filter(o => o.host.type === 'dormitory').length,
  }), []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ORGANIZATIONS.filter(o => {
      if (filter !== 'all' && o.host.type !== filter) return false;
      if (instituteFilter && (o.host.type !== 'institute' || o.host.instituteAbbr !== instituteFilter)) return false;
      if (q && !o.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [filter, instituteFilter, query]);

  const handleFilterClick = (key: FilterKey) => {
    setFilter(key);
    if (key === 'university' || key === 'dormitory') setInstituteFilter(null);
  };

  const showInstituteSelect = filter === 'all' || filter === 'institute';

  return (
    <div>
      <div className="row" style={{ gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => handleFilterClick(f.key)}
            style={{
              padding: '8px 14px',
              borderRadius: 999,
              border: '1px solid ' + (filter === f.key ? 'rgba(155,92,255,0.3)' : 'var(--border)'),
              background: filter === f.key ? 'var(--grad-soft)' : 'var(--surface)',
              fontSize: 13,
              fontWeight: 500,
              color: filter === f.key ? 'var(--fg)' : 'var(--fg-3)',
              cursor: 'pointer',
            }}
          >
            {f.label} <span style={{ color: 'var(--fg-4)', fontWeight: 600 }}>({counts[f.key]})</span>
          </button>
        ))}
        <div className="row" style={{ marginLeft: 'auto', gap: 8, alignItems: 'center' }}>
          {showInstituteSelect && (
            <div style={{ position: 'relative' }}>
              <select
                value={instituteFilter ?? ''}
                onChange={e => setInstituteFilter(e.target.value || null)}
                title={instituteFilter ? INSTITUTES.find(i => i.abbr === instituteFilter)?.name : 'Фильтр по институту'}
                style={{
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  height: 36,
                  padding: '0 32px 0 14px',
                  borderRadius: 999,
                  border: '1px solid ' + (instituteFilter ? 'rgba(155,92,255,0.4)' : 'var(--border)'),
                  background: instituteFilter ? 'var(--grad-soft)' : 'var(--surface)',
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'var(--fg)',
                  cursor: 'pointer',
                  minWidth: 160,
                }}
              >
                <option value="">Любой институт</option>
                {INSTITUTES.map(inst => (
                  <option key={inst.abbr} value={inst.abbr} title={inst.name}>{inst.abbr}</option>
                ))}
              </select>
              <svg
                width="12" height="12" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2"
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--fg-4)', pointerEvents: 'none' }}
              >
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </div>
          )}
          <input
            className="input"
            placeholder="Поиск организации…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{ width: 240, height: 36, fontSize: 13 }}
          />
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="card" style={{ padding: 32, textAlign: 'center', color: 'var(--fg-4)' }}>
          Ничего не найдено
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {visible.map(org => (
            <Link
              key={org.id}
              href={`/dashboard/organizations/${org.id}`}
              className="card card-hover"
              style={{
                padding: 20,
                display: 'flex',
                gap: 16,
                textDecoration: 'none',
                color: 'inherit',
                minHeight: 168,
              }}
            >
              <div
                style={{
                  width: 56, height: 56, borderRadius: 14,
                  background: `linear-gradient(135deg, ${org.color}, ${tonalShift(org.color)})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: 16, fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                {org.short}
              </div>
              <div className="col" style={{ flex: 1, minWidth: 0, gap: 4 }}>
                <div className="row gap-2" style={{ alignItems: 'center', flexWrap: 'wrap' }}>
                  <div className="h4" style={{ margin: 0, fontWeight: 700 }}>{org.name}</div>
                  {org.verified && (
                    <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 4, background: 'rgba(61,214,140,0.15)', color: 'var(--green)', fontWeight: 600 }}>
                      ✓ verified
                    </span>
                  )}
                </div>
                <div className="row gap-2" style={{ fontSize: 12, color: 'var(--fg-3)' }}>
                  <span>{hostLabel(org)}</span>
                  <span style={{ color: 'var(--fg-4)' }}>·</span>
                  <span>{org.members} участников</span>
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: 'var(--fg-3)',
                    lineHeight: 1.5,
                    marginTop: 4,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {org.description}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
