'use client';

import type { ReactNode } from 'react';
import { EVENT_TYPES, type EventItem } from '@/lib/mock-data';
import { EventCover } from '@/components/EventCover';
import { UploadedCoverImage } from '@/components/org/CoverChoice';
import type { WizardData } from '@/components/org/wizard-types';

const Cw = {
  check: (p?: { s?: number }) => (
    <svg width={p?.s ?? 12} height={p?.s ?? 12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  edit: (p?: { s?: number }) => (
    <svg width={p?.s ?? 14} height={p?.s ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  globe: (p?: { s?: number }) => (
    <svg width={p?.s ?? 14} height={p?.s ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
};

function SummaryRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="card card-hover" style={{ padding: 16, marginBottom: 10, display: 'flex', alignItems: 'flex-start', gap: 16, cursor: 'pointer' }}>
      <div style={{
        width: 140, flexShrink: 0,
        fontSize: 11, fontWeight: 700, color: 'var(--fg-4)',
        textTransform: 'uppercase', letterSpacing: '0.08em',
        paddingTop: 2,
      }}>{label}</div>
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
      <button title="Изменить" style={{
        width: 32, height: 32, borderRadius: 8,
        background: 'transparent', border: 'none', color: 'var(--fg-4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', flexShrink: 0,
      }}>
        <Cw.edit s={14}/>
      </button>
    </div>
  );
}

const VISIBILITY_LABELS: Record<NonNullable<WizardData['visibility']>, string> = {
  'all': 'Всем студентам СФУ',
  'institute': 'Только моему институту',
  'org-only': 'Только участникам организации',
};

const REG_MODE_LABELS: Record<NonNullable<WizardData['regMode']>, string> = {
  'open': 'Свободная',
  'application': 'По заявке',
};

const FORMAT_LABELS: Record<NonNullable<WizardData['format']>, string> = {
  'offline': 'Очно',
  'online': 'Онлайн',
  'hybrid': 'Гибрид',
};

export function Step4({
  data,
  onPublish,
  onSchedule,
  onDraft,
}: {
  data: WizardData;
  onPublish: () => void;
  onSchedule: () => void;
  onDraft: () => void;
}) {
  const t = data.type ? EVENT_TYPES[data.type] : null;

  const summaryEvent: EventItem | null = data.type ? {
    id: -3,
    type: data.type,
    title: data.title || 'Без названия',
    date: { d: data.date?.d ?? 0, m: data.date?.m ?? '', wd: data.date?.wd ?? '' },
    time: data.time, duration: data.duration, loc: data.address,
    registered: 0, capacity: data.capacity ?? 0,
    format: data.format ?? '', org: '',
  } : null;

  return (
    <div className="card" style={{ padding: 28 }}>
      <div style={{ marginBottom: 20 }}>
        <h3 className="h3" style={{ margin: 0 }}>Всё готово?</h3>
        <div style={{ fontSize: 13, color: 'var(--fg-3)', marginTop: 4 }}>Проверь сводку. После публикации событие сразу появится в афише.</div>
      </div>

      <div style={{ marginBottom: 28 }}>
        <SummaryRow label="Тип и название">
          {t ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--fg)' }}>
                {data.title || <span style={{ color: 'var(--fg-4)', fontWeight: 500 }}>Без названия</span>}
              </div>
              <span style={{ background: t.bg, border: `1px solid ${t.color}40`, color: t.color, padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600 }}>● {t.label}</span>
            </div>
          ) : (
            <div style={{ fontSize: 13, color: 'var(--fg-4)' }}>Тип не выбран — вернись на Step 1</div>
          )}
        </SummaryRow>

        <SummaryRow label="Обложка">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 96, height: 56, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
              {data.cover.type === 'uploaded'
                ? <UploadedCoverImage height={56} radius={8}/>
                : summaryEvent
                  ? <EventCover event={summaryEvent} height={56}/>
                  : <div style={{ width: '100%', height: '100%', background: 'var(--bg-2)' }}/>}
            </div>
            <div style={{ fontSize: 13, color: 'var(--fg-2)' }}>
              {data.cover.type === 'uploaded' ? 'Загружена пользователем' : 'Сгенерирована автоматически'}
            </div>
          </div>
        </SummaryRow>

        <SummaryRow label="Описание">
          <div style={{ fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.5 }}>
            {data.shortDesc || <span style={{ color: 'var(--fg-4)' }}>Краткое описание не заполнено</span>}
          </div>
          {data.longDesc && (
            <div style={{ fontSize: 12, color: 'var(--fg-4)', marginTop: 6 }}>
              + подробное описание ({data.longDesc.length} символов)
            </div>
          )}
        </SummaryRow>

        <SummaryRow label="Когда и где">
          <div style={{ fontSize: 14, color: 'var(--fg)', fontWeight: 600 }}>
            {data.date?.full || '—'}{data.time && ` · ${data.time}`}{data.duration && ` · ${data.duration}`}
          </div>
          <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 4 }}>
            {data.format ? FORMAT_LABELS[data.format] : '—'}
            {(data.address || data.room) && ' · '}
            {[data.address, data.room && `ауд. ${data.room}`].filter(Boolean).join(', ')}
          </div>
        </SummaryRow>

        <SummaryRow label="Регистрация">
          <div style={{ fontSize: 14, color: 'var(--fg)' }}>
            {data.regMode ? REG_MODE_LABELS[data.regMode] : '—'}
            {data.capacity != null && ` · ${data.capacity} мест`}
            {data.hours != null && ` · ${data.hours} ч активности`}
          </div>
        </SummaryRow>

        <SummaryRow label="Видимость">
          <div style={{ fontSize: 14, color: 'var(--fg)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <Cw.globe s={14}/> {data.visibility ? VISIBILITY_LABELS[data.visibility] : '—'}
          </div>
        </SummaryRow>
      </div>

      <div style={{ marginBottom: 24 }}>
        <h4 className="h4" style={{ margin: '0 0 12px' }}>Что произойдёт после публикации</h4>
        {[
          'Событие появится в общей афише СФУ',
          'Участники команды получат уведомление',
          'Откроется регистрация для студентов',
          'Заявки будут приходить в раздел «Заявки» в реальном времени',
        ].map((text, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0' }}>
            <div style={{
              width: 22, height: 22, borderRadius: '50%',
              background: 'color-mix(in oklab, var(--green) 16%, transparent)',
              color: 'var(--green)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Cw.check s={12}/>
            </div>
            <div style={{ fontSize: 14, color: 'var(--fg-2)' }}>{text}</div>
          </div>
        ))}
      </div>

      <button onClick={onPublish} className="btn btn-primary" style={{ width: '100%', height: 52, fontSize: 16, fontWeight: 700 }}>
        Опубликовать
      </button>
      <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
        <button onClick={onSchedule} className="btn btn-ghost" style={{ flex: 1, height: 44 }}>Запланировать публикацию</button>
        <button onClick={onDraft}    className="btn btn-ghost" style={{ flex: 1, height: 44 }}>Сохранить как черновик</button>
      </div>
    </div>
  );
}
