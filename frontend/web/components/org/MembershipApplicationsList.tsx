'use client';

import type { MembershipApplication } from '@/lib/mock-data';
import { Avatar, StatusChip } from './ApplicationsList';

const COLS = '1fr 220px 140px 160px';

export function MembershipApplicationsList({
  applications,
  selectedId,
  onSelect,
}: {
  applications: MembershipApplication[];
  selectedId: number;
  onSelect: (id: number) => void;
}) {
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: COLS, gap: 14,
        padding: '12px 20px',
        background: 'var(--bg-2)',
        borderBottom: '1px solid var(--border)',
        fontSize: 11, fontWeight: 700, color: 'var(--fg-4)',
        textTransform: 'uppercase', letterSpacing: '0.06em',
      }}>
        <div>Заявитель</div>
        <div>Институт</div>
        <div>Когда подал</div>
        <div>Статус</div>
      </div>

      {applications.map((app, i) => (
        <MembershipRow
          key={app.id}
          app={app}
          selected={app.id === selectedId}
          last={i === applications.length - 1}
          onSelect={() => onSelect(app.id)}
        />
      ))}
    </div>
  );
}

function MembershipRow({
  app, selected, last, onSelect,
}: {
  app: MembershipApplication;
  selected: boolean;
  last: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      style={{
        display: 'grid', gridTemplateColumns: COLS, gap: 14,
        padding: '14px 20px', alignItems: 'center',
        borderBottom: last ? 'none' : '1px solid var(--border)',
        background: selected ? 'color-mix(in oklab, var(--blue) 6%, transparent)' : 'transparent',
        boxShadow: selected ? 'inset 3px 0 0 var(--blue)' : 'none',
        cursor: 'pointer',
        transition: 'background .12s',
      }}
      onMouseEnter={(e) => { if (!selected) e.currentTarget.style.background = 'var(--bg-2)'; }}
      onMouseLeave={(e) => { if (!selected) e.currentTarget.style.background = 'transparent'; }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
        <Avatar grad={app.applicant.grad} name={app.applicant.name} size={32}/>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {app.applicant.name}
          </div>
          <div style={{ fontSize: 11, color: 'var(--fg-4)', marginTop: 2 }}>{app.applicant.handle}</div>
        </div>
      </div>

      <div style={{ fontSize: 12, color: 'var(--fg-2)' }}>
        {app.applicant.institute} · {app.applicant.course} курс
      </div>

      <div style={{ fontSize: 12, color: 'var(--fg-3)' }}>{app.submittedAt}</div>

      <div><StatusChip status={app.status}/></div>
    </div>
  );
}
