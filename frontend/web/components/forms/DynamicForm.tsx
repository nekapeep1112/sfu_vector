'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { ApplicationQuestion, ApplicationAnswer } from '@/lib/mock-data';
import { FieldShortText } from './FieldShortText';
import { FieldLongText } from './FieldLongText';
import { FieldEmail } from './FieldEmail';
import { FieldRadio } from './FieldRadio';
import { FieldCheckbox } from './FieldCheckbox';

interface DynamicFormProps {
  questions: ApplicationQuestion[];
  onSubmit: (answers: ApplicationAnswer[]) => void;
  submitLabel?: string;
  cancelHref?: string;
  initialAnswers?: ApplicationAnswer[];
}

type Values = Record<string, string | string[]>;

function buildInitialValues(questions: ApplicationQuestion[], initialAnswers?: ApplicationAnswer[]): Values {
  const byId = new Map<string, ApplicationAnswer>();
  initialAnswers?.forEach((a) => byId.set(a.questionId, a));
  const v: Values = {};
  for (const q of questions) {
    const a = byId.get(q.id);
    if (a) v[q.id] = a.value;
    else v[q.id] = q.type === 'checkbox' ? [] : '';
  }
  return v;
}

export function DynamicForm({
  questions,
  onSubmit,
  submitLabel = 'Отправить заявку',
  cancelHref,
  initialAnswers,
}: DynamicFormProps) {
  const [values, setValues] = useState<Values>(() => buildInitialValues(questions, initialAnswers));
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateValue = (id: string, val: string | string[]) => {
    setValues((prev) => ({ ...prev, [id]: val }));
    if (errors[id]) setErrors((prev) => { const next = { ...prev }; delete next[id]; return next; });
  };

  const handleSubmit = () => {
    const nextErrors: Record<string, string> = {};
    for (const q of questions) {
      if (!q.required) continue;
      const v = values[q.id];
      const isEmpty = Array.isArray(v) ? v.length === 0 : v.trim().length === 0;
      if (isEmpty) nextErrors[q.id] = 'Это поле обязательно';
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const answers: ApplicationAnswer[] = questions.map((q) => ({
      questionId: q.id,
      questionLabel: q.label,
      questionType: q.type,
      value: values[q.id] ?? (q.type === 'checkbox' ? [] : ''),
    }));
    onSubmit(answers);
  };

  return (
    <div className="card" style={{ padding: 28 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {questions.map((q) => {
          const err = errors[q.id];
          if (q.type === 'short_text') {
            return (
              <FieldShortText
                key={q.id}
                question={q}
                value={(values[q.id] as string) ?? ''}
                onChange={(v) => updateValue(q.id, v)}
                error={err}
              />
            );
          }
          if (q.type === 'long_text') {
            return (
              <FieldLongText
                key={q.id}
                question={q}
                value={(values[q.id] as string) ?? ''}
                onChange={(v) => updateValue(q.id, v)}
                error={err}
              />
            );
          }
          if (q.type === 'email') {
            return (
              <FieldEmail
                key={q.id}
                question={q}
                value={(values[q.id] as string) ?? ''}
                onChange={(v) => updateValue(q.id, v)}
                error={err}
              />
            );
          }
          if (q.type === 'radio') {
            return (
              <FieldRadio
                key={q.id}
                question={q}
                value={(values[q.id] as string) ?? ''}
                onChange={(v) => updateValue(q.id, v)}
                error={err}
              />
            );
          }
          return (
            <FieldCheckbox
              key={q.id}
              question={q}
              value={(values[q.id] as string[]) ?? []}
              onChange={(v) => updateValue(q.id, v)}
              error={err}
            />
          );
        })}
      </div>

      <div style={{
        marginTop: 28, paddingTop: 24, borderTop: '1px solid var(--border)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
      }}>
        {cancelHref ? (
          <Link
            href={cancelHref}
            className="btn btn-ghost"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
          >
            ← Отменить
          </Link>
        ) : (
          <span/>
        )}
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
          style={{ height: 48, padding: '0 24px', fontSize: 15, fontWeight: 700 }}
        >
          {submitLabel} →
        </button>
      </div>
    </div>
  );
}
