'use client';

import { useRouter } from 'next/navigation';
import type { TeamMember, OrgRole } from '@/lib/mock-data';
import { IconUserAdd } from './icons';

const ROLE_PILL: Record<OrgRole, { label: string; color: string; bg: string }> = {
  owner:  { label: 'Владелец',    color: 'var(--violet)', bg: 'rgba(155,92,255,0.15)' },
  editor: { label: 'Редактор',    color: 'var(--blue)',   bg: 'rgba(79,127,255,0.15)' },
  viewer: { label: 'Наблюдатель', color: 'var(--fg-4)',   bg: 'var(--bg-2)' },
};

interface TeamCardProps {
  team: TeamMember[];
  totalMembers: number;
  orgId: number;
}

export function TeamCard({ team, totalMembers, orgId }: TeamCardProps) {
  const router = useRouter();
  return (
    <div className="card" style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <h4 className="h4" style={{ margin: 0 }}>Команда</h4>
        <button
          className="btn btn-ghost btn-sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          onClick={() => console.log('TODO: invite member')}
        >
          <IconUserAdd s={13}/> Пригласить
        </button>
      </div>
      <div style={{ fontSize: 12, color: 'var(--fg-3)', marginBottom: 14 }}>
        {totalMembers} человек · 2 владельца, 4 редактора, 6 наблюдателей
      </div>
      <div>
        {team.map((p, i) => {
          const pill = ROLE_PILL[p.role];
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 0',
              borderBottom: i === team.length - 1 ? 'none' : '1px solid var(--border)',
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', background: p.grad,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 700, fontSize: 11, flexShrink: 0,
              }}>{p.ini}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 13, fontWeight: 600, color: 'var(--fg)',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>{p.name}</div>
                <div style={{ fontSize: 11, color: 'var(--fg-4)' }}>{p.sub}</div>
              </div>
              <span style={{
                padding: '3px 8px', borderRadius: 6,
                background: pill.bg, color: pill.color,
                fontSize: 10, fontWeight: 700,
              }}>{pill.label}</span>
            </div>
          );
        })}
        <div
          style={{
            padding: '12px 0 0', fontSize: 13, color: 'var(--blue)',
            fontWeight: 600, cursor: 'pointer',
          }}
          onClick={() => router.push(`/organizations/${orgId}/team`)}
        >+7 ещё</div>
      </div>
    </div>
  );
}
