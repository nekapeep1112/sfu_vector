'use client';

import type { ReactNode } from 'react';
import { EventCover } from '@/components/EventCover';
import type { Application, EventItem } from '@/lib/mock-data';
import { Avatar, StatusChip } from '@/components/org/ApplicationsList';

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
  more: (p: { s?: number } = {}) => (
    <svg width={p.s ?? 18} height={p.s ?? 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
    </svg>
  ),
  ext: (p: { s?: number } = {}) => (
    <svg width={p.s ?? 12} height={p.s ?? 12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M7 7h10v10"/>
    </svg>
  ),
};

function AnswerBlock({ q, a, link }: { q: string; a: ReactNode; link?: boolean }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: 'var(--fg-4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{q}</div>
      <div style={{
        fontSize: 14, color: link ? 'var(--blue)' : 'var(--fg)',
        marginTop: 6, lineHeight: 1.5,
        cursor: link ? 'pointer' : 'default',
        fontWeight: link ? 600 : 400,
      }}>{a}</div>
    </div>
  );
}

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
  onMore,
  onOpenEvent,
}: {
  application: Application;
  onApprove: () => void;
  onReject: () => void;
  onMore: () => void;
  onOpenEvent: () => void;
}) {
  const eventEvt = {
    id: application.id,
    type: application.eventType,
    title: application.event,
  } as unknown as EventItem;

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
          <div
            onClick={() => console.log('TODO: open email')}
            style={{ fontSize: 12, color: 'var(--blue)', marginTop: 6, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}
          >
            anna.kuznetsova@sfu-kras.ru <Ap.ext/>
          </div>
        </div>
      </div>

      <div style={{
        padding: 14, borderRadius: 12,
        background: 'var(--bg-2)', border: '1px solid var(--border)',
        marginBottom: 20,
      }}>
        <div style={{ fontSize: 11, color: 'var(--fg-4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Заявка на участие в</div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 6 }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
            <EventCover event={eventEvt} height={40}/>
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{application.event}</div>
            <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 2 }}>20 мая, 14:00 · ауд. 5-08</div>
          </div>
        </div>
        <div
          onClick={onOpenEvent}
          style={{ fontSize: 12, color: 'var(--blue)', marginTop: 10, fontWeight: 600, cursor: 'pointer' }}
        >Открыть карточку события →</div>
      </div>

      <h4 style={{ margin: '0 0 14px 0', fontSize: 15, fontWeight: 700, color: 'var(--fg)' }}>Ответы на анкету</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <AnswerBlock q="Опыт участия в хакатонах" a="Участвовала в двух: Сбер.Хакатон 2024 и хакатон ИКИТ прошлой осенью. В обоих наша команда заняла призовые места."/>
        <AnswerBlock q="Выбранный трек" a="Учебный процесс и расписание"/>
        <AnswerBlock q="Собрала ли команду?" a="Да, есть команда из 4 человек — двое из ИКИТ, один из ИМиФИ, я. Ищем ещё одного дизайнера."/>
        <AnswerBlock q="Ссылка на GitHub / портфолио (если есть)" a="github.com/annak-sfu" link/>
      </div>

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
          style={{ width: 140, height: 44, color: 'var(--red)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
        ><Ap.x s={14}/> Отклонить</button>
        <button
          onClick={onMore}
          className="btn btn-ghost"
          style={{ width: 44, height: 44, padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
        ><Ap.more/></button>
      </div>
      <div style={{ fontSize: 11, color: 'var(--fg-4)', textAlign: 'center', marginTop: 10 }}>
        Заявитель получит уведомление о решении в e-mail и в приложении
      </div>
    </div>
  );
}
