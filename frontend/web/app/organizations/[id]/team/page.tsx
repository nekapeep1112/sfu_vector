'use client';

import { use, useEffect, useRef, useState } from 'react';
import { notFound } from 'next/navigation';
import { ORGANIZATIONS, TEAM, CURRENT_USER } from '@/lib/mock-data';
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

  const ownersCount = rows.filter(m => m.role === 'owner').length;
  const ivanIsOwner = rows.some(m => m.name === CURRENT_USER.name && m.role === 'owner');
  const canLeave = !ivanIsOwner || ownersCount > 1;

  const handleLeave = () => {
    if (!canLeave) return;
    if (confirm('Точно покинуть организацию?')) {
      console.log('TODO: leave organization', id);
    }
  };

  return (
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, gap: 16 }}>
        <div>
          <h2 className="h2" style={{ margin: 0 }}>Команда</h2>
          <div style={{ fontSize: 13, color: 'var(--fg-3)', marginTop: 4 }}>
            {org.members} человек · 2 владельца, 4 редактора, 6 наблюдателей
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className="btn btn-ghost btn-sm"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              color: canLeave ? 'var(--red)' : 'var(--fg-4)',
              opacity: canLeave ? 1 : 0.5,
              cursor: canLeave ? 'pointer' : 'not-allowed',
            }}
            onClick={handleLeave}
            disabled={!canLeave}
            title={canLeave ? 'Покинуть организацию' : 'Нельзя — ты последний владелец. Передай роль другому участнику.'}
          >
            <IconLogout s={13}/> Покинуть
          </button>
          <button
            className="btn btn-ghost btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            onClick={() => console.log('TODO: invite member')}
          >
            <IconUserAdd s={13}/> Пригласить
          </button>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'visible' }}>
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
          <TeamRow
            key={i}
            member={member}
            isLast={i === rows.length - 1}
            isCurrentUser={member.name === CURRENT_USER.name}
            canLeave={canLeave}
          />
        ))}
      </div>
    </div>
  );
}

function TeamRow({
  member, isLast, isCurrentUser, canLeave,
}: {
  member: TeamMember;
  isLast: boolean;
  isCurrentUser: boolean;
  canLeave: boolean;
}) {
  const pill = ROLE_PILL[member.role];
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const onChangeRole = () => {
    setOpen(false);
    console.log('TODO: change role for', member.name);
  };

  const onRemove = () => {
    setOpen(false);
    if (confirm(`Исключить ${member.name} из команды?`)) {
      console.log('TODO: remove member', member.name);
    }
  };

  const onLeave = () => {
    setOpen(false);
    if (!canLeave) return;
    if (confirm('Точно покинуть организацию?')) {
      console.log('TODO: leave organization (self-row)', member.name);
    }
  };

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
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {member.name}
            {isCurrentUser && <span style={{ fontSize: 11, color: 'var(--fg-4)', fontWeight: 600, marginLeft: 8 }}>(ты)</span>}
          </div>
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
      <div ref={wrapperRef} style={{ position: 'relative' }}>
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          aria-label="Действия"
          aria-expanded={open}
          style={{
            width: 32, height: 32, padding: 0, borderRadius: 8,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            background: open ? 'var(--bg-2)' : 'transparent',
            border: '1px solid ' + (open ? 'var(--border-strong)' : 'var(--border)'),
            color: open ? 'var(--fg)' : 'var(--fg-3)',
            cursor: 'pointer',
            transition: 'background .12s, border-color .12s, color .12s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--bg-2)';
            e.currentTarget.style.borderColor = 'var(--border-strong)';
            e.currentTarget.style.color = 'var(--fg)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = open ? 'var(--bg-2)' : 'transparent';
            e.currentTarget.style.borderColor = open ? 'var(--border-strong)' : 'var(--border)';
            e.currentTarget.style.color = open ? 'var(--fg)' : 'var(--fg-3)';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <circle cx="5" cy="12" r="2"/>
            <circle cx="12" cy="12" r="2"/>
            <circle cx="19" cy="12" r="2"/>
          </svg>
        </button>
        {open && (
          <div style={{
            position: 'absolute', top: '100%', right: 0,
            marginTop: 6, zIndex: 100, minWidth: 180,
            borderRadius: 12, background: 'var(--surface)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-pop)',
            padding: 6, overflow: 'hidden',
          }}>
            <ActionItem label="Изменить роль" onClick={onChangeRole}/>
            <div style={{ borderTop: '1px solid var(--border)', margin: '4px 0' }}/>
            {isCurrentUser ? (
              <ActionItem
                label="Покинуть"
                color="var(--red)"
                disabled={!canLeave}
                onClick={onLeave}
              />
            ) : (
              <ActionItem label="Исключить" color="var(--red)" onClick={onRemove}/>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ActionItem({
  label, color, onClick, disabled,
}: {
  label: string;
  color?: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '100%', display: 'flex', alignItems: 'center',
        padding: '10px 12px', borderRadius: 8,
        background: 'transparent', border: 'none',
        color: disabled ? 'var(--fg-4)' : (color ?? 'var(--fg-2)'),
        fontSize: 13, fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        textAlign: 'left',
        opacity: disabled ? 0.5 : 1,
        transition: 'background .12s',
      }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = 'var(--bg-2)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
    >
      {label}
    </button>
  );
}

function IconLogout({ s = 14 }: { s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  );
}
