'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CURRENT_USER, ORGANIZATIONS, tonalShift, type OrgRole } from '@/lib/mock-data';

export type SidebarContext = { type: 'personal' } | { type: 'org'; orgId: string };

interface ContextSwitcherProps {
  context: SidebarContext;
  forceOpen?: boolean;
  emptyMemberships?: boolean;
}

const ROLE_CHIP: Record<OrgRole, { label: string; color: string; bg: string }> = {
  owner:  { label: 'Владелец', color: 'var(--violet)', bg: 'rgba(155,92,255,0.15)' },
  editor: { label: 'Редактор', color: 'var(--blue)',   bg: 'rgba(79,127,255,0.15)' },
  viewer: { label: 'Просмотр', color: 'var(--fg-4)',   bg: 'var(--bg-2)' },
};

export function ContextSwitcher({ context, forceOpen = false, emptyMemberships = false }: ContextSwitcherProps) {
  const router = useRouter();
  const [open, setOpen] = useState(forceOpen);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setOpen(forceOpen); }, [forceOpen]);

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const memberships = emptyMemberships ? [] : CURRENT_USER.memberships;
  const userOrgs = ORGANIZATIONS.filter(o => memberships.includes(o.id));

  const isPersonal = context.type === 'personal';
  const activeOrg = !isPersonal ? ORGANIZATIONS.find(o => o.id === context.orgId) : null;

  const triggerLabel = isPersonal ? CURRENT_USER.name : (activeOrg ? activeOrg.name : '—');
  const triggerSub = isPersonal
    ? 'Личный профиль'
    : (activeOrg ? `${ROLE_CHIP[activeOrg.role].label} · ${activeOrg.members} участников` : '');
  const triggerGrad = isPersonal
    ? CURRENT_USER.avatarGrad
    : (activeOrg ? `linear-gradient(135deg, ${activeOrg.color}, ${tonalShift(activeOrg.color)})` : 'var(--surface-3)');
  const triggerInit = isPersonal ? CURRENT_USER.initials : (activeOrg ? activeOrg.short : '?');

  function goPersonal() {
    setOpen(false);
    router.push('/dashboard');
  }

  function goOrg(orgId: string) {
    setOpen(false);
    router.push('/org/' + orgId);
  }

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 12px', borderRadius: 12,
          background: open ? 'var(--bg-2)' : 'var(--surface)',
          border: '1px solid ' + (open ? 'var(--border-strong)' : 'var(--border)'),
          textAlign: 'left', cursor: 'pointer',
          transition: 'all .15s',
        }}
        onMouseEnter={e => { if (!open) { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.background = 'var(--bg-2)'; } }}
        onMouseLeave={e => { if (!open) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface)'; } }}
      >
        <CtxAvatar grad={triggerGrad} initials={triggerInit}/>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{triggerLabel}</div>
          <div style={{ fontSize: 11, color: 'var(--fg-4)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 1 }}>{triggerSub}</div>
        </div>
        <span style={{ color: 'var(--fg-4)', display: 'inline-flex', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }}><IconChevron/></span>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          marginTop: 6, zIndex: 100,
          borderRadius: 14, background: 'var(--surface)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-pop)',
          padding: 6, overflow: 'hidden',
        }}>
          <div style={{ padding: '8px 12px 4px', fontSize: 10, color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>Личный</div>
          <CtxRow
            grad={CURRENT_USER.avatarGrad}
            initials={CURRENT_USER.initials}
            title={CURRENT_USER.name}
            sub="Личный профиль"
            active={isPersonal}
            onClick={goPersonal}
          />

          {userOrgs.length > 0 ? (
            <>
              <div style={{ padding: '8px 12px 4px', fontSize: 10, color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>Мои организации</div>
              {userOrgs.map(org => (
                <CtxRow
                  key={org.id}
                  grad={`linear-gradient(135deg, ${org.color}, ${tonalShift(org.color)})`}
                  initials={org.short}
                  title={org.name}
                  sub={`${org.members} участников`}
                  active={!isPersonal && context.orgId === org.id}
                  roleChip={ROLE_CHIP[org.role]}
                  onClick={() => goOrg(org.id)}
                />
              ))}
            </>
          ) : (
            <div style={{ padding: '14px 12px', display: 'flex', alignItems: 'center', gap: 10, color: 'var(--fg-3)' }}>
              <span style={{ color: 'var(--fg-4)' }}><IconEmpty/></span>
              <div style={{ fontSize: 12, lineHeight: 1.4 }}>Ты не состоишь ни в одной организации</div>
            </div>
          )}

          <div style={{ borderTop: '1px solid var(--border)', margin: '6px 0' }}/>
          <CtxAction
            onClick={() => console.log('TODO: new org application')}
            color="var(--blue)"
            icon={<IconPlus/>}
            label="Создать организацию"
          />
          <CtxAction
            onClick={() => console.log('TODO: profile management')}
            color="var(--fg-2)"
            label="Управление аккаунтом"
            trailing={<IconArrowR/>}
          />
        </div>
      )}
    </div>
  );
}

function CtxAvatar({ grad, initials, size = 32 }: { grad: string; initials: string; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 9,
      background: grad,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'white', fontWeight: 700, fontSize: size > 28 ? 12 : 11,
      flexShrink: 0,
      boxShadow: '0 1px 2px rgba(15,23,42,0.1)',
    }}>{initials}</div>
  );
}

interface CtxRowProps {
  grad: string;
  initials: string;
  title: string;
  sub: string;
  active: boolean;
  roleChip?: { label: string; color: string; bg: string };
  onClick: () => void;
}

function CtxRow({ grad, initials, title, sub, active, roleChip, onClick }: CtxRowProps) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 10,
        padding: 10, borderRadius: 8,
        background: active ? 'var(--bg-2)' : 'transparent',
        border: 'none', cursor: 'pointer', textAlign: 'left',
        transition: 'background .12s',
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--bg-2)'; }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
    >
      <CtxAvatar grad={grad} initials={initials} size={30}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div>
        <div style={{ fontSize: 11, color: 'var(--fg-4)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 1 }}>{sub}</div>
      </div>
      {roleChip && (
        <span style={{
          padding: '2px 7px', borderRadius: 6,
          background: roleChip.bg, color: roleChip.color,
          fontSize: 10, fontWeight: 700,
          flexShrink: 0,
        }}>{roleChip.label}</span>
      )}
      {active && <span style={{ color: 'var(--blue)', display: 'inline-flex', flexShrink: 0 }}><IconCheck/></span>}
    </button>
  );
}

interface CtxActionProps {
  onClick: () => void;
  color: string;
  icon?: React.ReactNode;
  label: string;
  trailing?: React.ReactNode;
}

function CtxAction({ onClick, color, icon, label, trailing }: CtxActionProps) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 8,
        padding: '10px 12px', borderRadius: 8,
        background: 'transparent', border: 'none',
        color, fontSize: 13, fontWeight: 600,
        cursor: 'pointer', textAlign: 'left',
        transition: 'background .12s',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-2)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
    >
      {icon && <span style={{ display: 'inline-flex' }}>{icon}</span>}
      <span style={{ flex: 1 }}>{label}</span>
      {trailing && <span style={{ display: 'inline-flex', color: 'var(--fg-4)' }}>{trailing}</span>}
    </button>
  );
}

function IconChevron() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>;
}
function IconCheck() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
}
function IconPlus() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
}
function IconArrowR() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
}
function IconEmpty() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-6 9 6v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>;
}
