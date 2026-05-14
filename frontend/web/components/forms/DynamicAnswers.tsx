import type { ApplicationAnswer } from '@/lib/mock-data';

export function DynamicAnswers({ answers }: { answers: ApplicationAnswer[] }) {
  if (answers.length === 0) {
    return (
      <div style={{ fontSize: 13, color: 'var(--fg-4)', fontStyle: 'italic' }}>
        Заявка без анкеты (свободная регистрация)
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {answers.map((a) => (
        <AnswerBlock key={a.questionId} answer={a}/>
      ))}
    </div>
  );
}

function AnswerBlock({ answer }: { answer: ApplicationAnswer }) {
  const display = formatValue(answer.value);
  const empty = display === null;
  return (
    <div>
      <div style={{
        fontSize: 11, color: 'var(--fg-4)', fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '0.06em',
      }}>
        {answer.questionLabel}
      </div>
      <div style={{
        fontSize: 14, color: empty ? 'var(--fg-4)' : 'var(--fg)',
        marginTop: 6, lineHeight: 1.5,
      }}>
        {empty ? '—' : display}
      </div>
    </div>
  );
}

function formatValue(value: string | string[]): string | null {
  if (Array.isArray(value)) {
    if (value.length === 0) return null;
    return value.join(', ');
  }
  if (value.trim().length === 0) return null;
  return value;
}
