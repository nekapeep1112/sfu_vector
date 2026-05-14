'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ApplicationAnswer, EventItem } from '@/lib/mock-data';
import { DynamicForm } from '@/components/forms/DynamicForm';

const IcInfo = ({ s = 20 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
);

export function RegistrationForm({ event }: { event: EventItem }) {
  const router = useRouter();
  const hasQuestions = !!event.applicationQuestions && event.applicationQuestions.length > 0;

  const handleSubmit = (answers: ApplicationAnswer[]) => {
    console.log('TODO: submit event registration', { eventId: event.id, answers });
    router.push(`/dashboard/events/${event.id}/register/success`);
  };

  return (
    <div style={{ minWidth: 0 }}>
      <h2 className="h2" style={{ margin: 0, fontSize: 32, lineHeight: 1.15, letterSpacing: '-0.025em' }}>
        {hasQuestions ? 'Заявка на участие' : 'Регистрация на мероприятие'}
      </h2>
      <p style={{ fontSize: 14, color: 'var(--fg-3)', margin: '6px 0 0', lineHeight: 1.5 }}>
        {hasQuestions
          ? 'У этого мероприятия — отбор. Заполни короткую анкету, организаторы рассмотрят за 1–2 дня.'
          : 'Свободная регистрация — место выделяется сразу после подтверждения.'}
      </p>

      {hasQuestions && (
        <div className="card" style={{
          marginTop: 20, padding: 16,
          background: 'color-mix(in oklab, var(--amber) 8%, transparent)',
          border: '1px solid color-mix(in oklab, var(--amber) 30%, transparent)',
          display: 'flex', gap: 12, alignItems: 'flex-start',
        }}>
          <span style={{ color: 'var(--amber)', display: 'inline-flex', flexShrink: 0, marginTop: 1 }}><IcInfo s={20}/></span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)' }}>Что важно знать</div>
            <div style={{ fontSize: 13, color: 'var(--fg-2)', marginTop: 4, lineHeight: 1.55 }}>
              Регистрация — заявочная. Отправляя анкету, ты <strong>не занимаешь</strong> место — место выделится только после одобрения организатором ({event.org}). Уведомление придёт в e-mail и в приложение.
            </div>
          </div>
        </div>
      )}

      <div style={{ marginTop: 24 }}>
        {hasQuestions ? (
          <DynamicForm
            questions={event.applicationQuestions!}
            onSubmit={handleSubmit}
            cancelHref={`/dashboard/events/${event.id}`}
            submitLabel="Отправить заявку"
          />
        ) : (
          <FreeRegistration eventId={event.id} onConfirm={() => handleSubmit([])}/>
        )}
      </div>
    </div>
  );
}

function FreeRegistration({ eventId, onConfirm }: { eventId: number; onConfirm: () => void }) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="card" style={{ padding: 28 }}>
      <label style={{
        display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer',
      }}>
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          style={{ width: 20, height: 20, accentColor: 'var(--blue)', marginTop: 2, flexShrink: 0, cursor: 'pointer' }}
        />
        <span style={{ fontSize: 14, color: 'var(--fg)', lineHeight: 1.5 }}>
          Подтверждаю, что приду на мероприятие. Согласен с правилами участия и обработкой персональных данных.
        </span>
      </label>

      <div style={{
        marginTop: 28, paddingTop: 24, borderTop: '1px solid var(--border)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
      }}>
        <Link
          href={`/dashboard/events/${eventId}`}
          className="btn btn-ghost"
          style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
        >
          ← Отменить
        </Link>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onConfirm}
          disabled={!agreed}
          style={{
            height: 48, padding: '0 24px', fontSize: 15, fontWeight: 700,
            opacity: agreed ? 1 : 0.5, cursor: agreed ? 'pointer' : 'not-allowed',
          }}
        >
          Зарегистрироваться →
        </button>
      </div>
    </div>
  );
}
