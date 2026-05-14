'use client';

import { useEffect, useRef, useState } from 'react';
import type { MembershipApplication, OrgRole } from '@/lib/mock-data';
import { Avatar, StatusChip } from './ApplicationsList';
import { DynamicAnswers } from '@/components/forms/DynamicAnswers';

const ROLE_OPTIONS: { value: OrgRole; label: string; desc: string; color: string }[] = [
  { value: 'viewer', label: 'Наблюдатель', desc: 'Видит дашборд, без действий', color: 'var(--fg-4)' },
  { value: 'editor', label: 'Редактор',    desc: 'Может создавать события и одобрять заявки', color: 'var(--blue)' },
  { value: 'owner',  label: 'Владелец',    desc: 'Полный доступ, включая команду', color: 'var(--violet)' },
];

export function MembershipApplicationDetail({
  application,
  onApprove,
  onReject,
}: {
  application: MembershipApplication;
  onApprove: (role: OrgRole) => void;
  onReject: () => void;
}) {
  const [roleOpen, setRoleOpen] = useState(false);
  const roleWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!roleOpen) return;
    const onDown = (e: MouseEvent) => {
      if (roleWrapRef.current && !roleWrapRef.current.contains(e.target as Node)) setRoleOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [roleOpen]);

  const isPending = application.status === 'pending';

  return (
    <div className="card" style={{ padding: 24, position: 'sticky', top: 88, alignSelf: 'flex-start' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <Avatar grad={application.applicant.grad} name={application.applicant.name} size={56} radius={14}/>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{application.applicant.name}</div>
            <StatusChip status={application.status}/>
          </div>
          <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 4 }}>
            {application.applicant.institute} · {application.applicant.course} курс · {application.applicant.handle}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <h4 style={{ margin: '0 0 14px 0', fontSize: 15, fontWeight: 700, color: 'var(--fg)' }}>Ответы на анкету</h4>
        <DynamicAnswers answers={application.answers}/>
      </div>

      {isPending && (
        <div style={{ marginTop: 24, display: 'flex', gap: 10 }}>
          <div ref={roleWrapRef} style={{ position: 'relative', flex: 1 }}>
            <button
              className="btn btn-primary"
              onClick={() => setRoleOpen(o => !o)}
              style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
            >
              <IconCheck/> Одобрить
              <span style={{ marginLeft: 4, transform: roleOpen ? 'rotate(180deg)' : 'none', display: 'inline-flex', transition: 'transform .15s' }}>
                <IconChevron/>
              </span>
            </button>
            {roleOpen && (
              <div style={{
                position: 'absolute', top: '100%', left: 0, right: 0,
                marginTop: 6, zIndex: 100,
                borderRadius: 12, background: 'var(--surface)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-pop)',
                padding: 6, overflow: 'hidden',
              }}>
                <div style={{ padding: '8px 12px 4px', fontSize: 10, color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                  Выбери роль
                </div>
                {ROLE_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => { setRoleOpen(false); onApprove(opt.value); }}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                      padding: 10, borderRadius: 8,
                      background: 'transparent', border: 'none',
                      cursor: 'pointer', textAlign: 'left',
                      transition: 'background .12s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-2)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <span style={{
                      width: 8, height: 8, borderRadius: 999, background: opt.color, flexShrink: 0,
                    }}/>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg)' }}>{opt.label}</div>
                      <div style={{ fontSize: 11, color: 'var(--fg-4)', marginTop: 1 }}>{opt.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            className="btn btn-ghost"
            onClick={onReject}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--red)' }}
          >
            <IconX/> Отклонить
          </button>
        </div>
      )}

      <div style={{ marginTop: 16, fontSize: 11, color: 'var(--fg-4)', lineHeight: 1.5 }}>
        После решения заявителю придёт уведомление на почту.
      </div>
    </div>
  );
}

function IconCheck() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
}
function IconChevron() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>;
}
function IconX() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
}
