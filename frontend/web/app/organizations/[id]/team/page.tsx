'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { ORGANIZATIONS, TEAM } from '@/lib/mock-data';
import type { TeamMember, OrgRole } from '@/lib/mock-data';
import { IconUserAdd } from '@/components/org/icons';

const ROLE_PILL: Record<OrgRole, { label: string; color: string; bg: string }> = {
  owner:  { label: 'Владелец',    color: 'var(--violet)', bg: 'rgba(155,92,255,0.15)' },
  editor: { label: 'Редактор',    color: 'var(--blue)',   bg: 'rgba(79,127,255,0.15)' },
  viewer: { label: 'Наблюдатель', color: 'var(--fg-4)',   bg: 'var(--bg-2)' },
};

const COLS = '1fr 160px 140px 80px';

export default function OrgTeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idParam } = use(params);
  const id = Number(idParam);
  const org = ORGANIZATIONS.find((o) => o.id === id);
  if (!org) notFound();

  const rows = [...TEAM, ...TEAM];

  return (
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, gap: 16 }}>
        <div>
          <h2 className="h2" style={{ margin: 0 }}>Команда</h2>
          <div style={{ fontSize: 13, color: 'var(--fg-3)', marginTop: 4 }}>
            {org.members} человек · 2 владельца, 4 редактора, 6 наблюдателей
          </div>
        </div>
        <button
          className="btn btn-ghost btn-sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          onClick={() => console.log('TODO: invite member')}
        >
          <IconUserAdd s={13}/> Пригласить
        </button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: COLS, gap: 16,
          padding: '12px 20px', background: 'var(--bg-2)',
          fontSize: 11, fontWeight: 700, color: 'var(--fg-4)',
          textTransform: 'uppercase', letterSpacing: '0.06em',
          borderBottom: '1px solid var(--border)',
        }}>
          <div>Участник</div>
          <div>Роль</div>
          <div>В команде с</div>
          <div></div>
        </div>
        {rows.map((member, i) => (
          <TeamRow key={i} member={member} isLast={i === rows.length - 1}/>
        ))}
      </div>
    </div>
  );
}

function TeamRow({ member, isLast }: { member: TeamMember; isLast: boolean }) {
  const pill = ROLE_PILL[member.role];
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: COLS, gap: 16, alignItems: 'center',
      padding: '16px 20px',
      borderBottom: isLast ? 'none' : '1px solid var(--border)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%', background: member.grad,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 700, fontSize: 12, flexShrink: 0,
        }}>{member.ini}</div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{member.name}</div>
          <div style={{ fontSize: 12, color: 'var(--fg-3)' }}>{member.sub}</div>
        </div>
      </div>
      <div>
        <span style={{
          padding: '4px 10px', borderRadius: 999,
          background: pill.bg, color: pill.color,
          fontSize: 11, fontWeight: 600,
        }}>{pill.label}</span>
      </div>
      <div style={{ fontSize: 13, color: 'var(--fg-3)' }}>12 марта 2024</div>
      <div>
        <button
          className="btn btn-ghost btn-sm"
          style={{ width: 32, height: 32, padding: 0 }}
          onClick={() => console.log('TODO: team member actions', member.name)}
        >⋯</button>
      </div>
    </div>
  );
}
