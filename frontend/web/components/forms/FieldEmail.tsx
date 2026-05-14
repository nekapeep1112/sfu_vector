'use client';

import type { ApplicationQuestion } from '@/lib/mock-data';

export function FieldEmail({
  question,
  value,
  onChange,
  error,
}: {
  question: ApplicationQuestion;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 15, fontWeight: 700, color: 'var(--fg)' }}>
        {question.label}
        {question.required && <span style={{ color: 'var(--red)' }}> *</span>}
      </label>
      {question.hint && (
        <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 4 }}>{question.hint}</div>
      )}
      <input
        type="email"
        className="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={question.placeholder ?? 'name@sfu-kras.ru'}
        maxLength={question.maxLength}
        style={{ marginTop: 12, height: 44, width: '100%', boxSizing: 'border-box' }}
      />
      {error && <div style={{ fontSize: 12, color: 'var(--red)', marginTop: 6 }}>{error}</div>}
    </div>
  );
}
