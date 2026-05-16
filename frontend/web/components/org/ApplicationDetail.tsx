'use client';

import { useState } from 'react';
import type { Application } from '@/lib/mock-data';
import { Avatar, StatusChip } from '@/components/org/ApplicationsList';
import { DynamicAnswers } from '@/components/forms/DynamicAnswers';

const Ap = {
  check: (p: { s?: number } = {}) => (
    <svg width={p.s ?? 14} height={p.s ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  ),
  x: (p: { s?: number } = {}) => (
    <svg width={p.s ?? 14} height={p.s ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
  ),
  copy: (p: { s?: number } = {}) => (
    <svg width={p.s ?? 12} height={p.s ?? 12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  ),
};

function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="card" style={{ padding: 12, textAlign: 'center' }}>
      <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--fg)' }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 4 }}>{label}</div>
    </div>
  );
}

export function ApplicationDetail({
  application,
  onApprove,
  onReject,
  onOpenEvent,
}: {
  application: Application;
  onApprove: () => void;
  onReject: () => void;
  onOpenEvent: () => void;
}) {
  const email = 'anna.kuznetsova@sfu-kras.ru';
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      console.warn('Clipboard API недоступен');
    }
  };

  return (
    <div className="card" style={{
      padding: 24,
      position: 'sticky', top: 88,
      alignSelf: 'flex-start',
    }}>
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 20 }}>
        <Avatar grad={application.grad} name={application.name} size={56} radius={14}/>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: 'var(--fg)' }}>{application.name}</h3>
            <StatusChip status={application.status}/>
          </div>
          <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 4 }}>{application.meta} · {application.handle}</div>
          <button
            type="button"
            onClick={copyEmail}
            title={copied ? 'Скопировано' : 'Скопировать email'}
            style={{
              fontSize: 12, color: copied ? 'var(--green)' : 'var(--blue)',
              marginTop: 6, fontWeight: 600, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'transparent', border: 'none', padding: 0,
              transition: 'color .15s',
            }}
          >
            {copied ? 'Скопировано' : email} {copied ? <Ap.check s={12}/> : <Ap.copy/>}
          </button>
        </div>
      </div>

      <div style={{
        padding: 14, borderRadius: 12,
        background: 'var(--bg-2)', border: '1px solid var(--border)',
        marginBottom: 20,
      }}>
        <div style={{ fontSize: 11, color: 'var(--fg-4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Заявка на участие в</div>
        <div style={{ minWidth: 0, marginTop: 6 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{application.event}</div>
          <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 2 }}>20 мая, 14:00 · ауд. 5-08</div>
        </div>
        <div
          onClick={onOpenEvent}
          style={{ fontSize: 12, color: 'var(--blue)', marginTop: 10, fontWeight: 600, cursor: 'pointer' }}
        >Открыть карточку события →</div>
      </div>

      <h4 style={{ margin: '0 0 14px 0', fontSize: 15, fontWeight: 700, color: 'var(--fg)' }}>Ответы на анкету</h4>
      <DynamicAnswers answers={application.answers}/>

      <h4 style={{ margin: '24px 0 14px 0', fontSize: 15, fontWeight: 700, color: 'var(--fg)' }}>Информация об участнике</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        <StatTile value="12"  label="событий посещено"/>
        <StatTile value="248" label="часов активности"/>
        <StatTile value="3"   label="организации"/>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
        <button
          onClick={onApprove}
          className="btn btn-primary"
          style={{ flex: 1, height: 44, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
        ><Ap.check s={16}/> Одобрить</button>
        <button
          onClick={onReject}
          className="btn btn-ghost"
          style={{ flex: 1, height: 44, color: 'var(--red)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
        ><Ap.x s={14}/> Отклонить</button>
      </div>
      <div style={{ fontSize: 11, color: 'var(--fg-4)', textAlign: 'center', marginTop: 10 }}>
        Заявитель получит уведомление о решении в e-mail и в приложении
      </div>
    </div>
  );
}
