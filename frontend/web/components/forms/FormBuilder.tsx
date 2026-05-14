'use client';

import { useEffect, useState } from 'react';
import type { ApplicationQuestion, FieldType } from '@/lib/mock-data';
import { QuestionEditor } from './QuestionEditor';
import { AddQuestionMenu } from './AddQuestionMenu';
import { DynamicForm } from './DynamicForm';

interface FormBuilderProps {
  questions: ApplicationQuestion[];
  onChange: (questions: ApplicationQuestion[]) => void;
  emptyHint?: string;
}

export function FormBuilder({
  questions,
  onChange,
  emptyHint = 'Анкета пуста. Добавь первый вопрос.',
}: FormBuilderProps) {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const addQuestion = (type: FieldType) => {
    const q: ApplicationQuestion = {
      id: `q${Date.now()}`,
      type,
      label: '',
      required: false,
      options: (type === 'radio' || type === 'checkbox') ? ['', ''] : undefined,
    };
    onChange([...questions, q]);
  };

  const updateQuestion = (updated: ApplicationQuestion) => {
    onChange(questions.map((x) => (x.id === updated.id ? updated : x)));
  };

  const deleteQuestion = (id: string) => {
    onChange(questions.filter((x) => x.id !== id));
  };

  const reorderTo = (targetId: string) => {
    if (!draggingId || draggingId === targetId) { setDraggingId(null); return; }
    const from = questions.findIndex((x) => x.id === draggingId);
    const to   = questions.findIndex((x) => x.id === targetId);
    if (from === -1 || to === -1) { setDraggingId(null); return; }
    const next = [...questions];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setDraggingId(null);
    onChange(next);
  };

  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 12,
      }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg)' }}>
          Вопросы анкеты ({questions.length})
        </div>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => setPreviewOpen(true)}
          disabled={questions.length === 0}
          style={{ opacity: questions.length === 0 ? 0.5 : 1 }}
        >Предпросмотр</button>
      </div>

      {questions.length === 0 ? (
        <div style={{
          padding: 14, borderRadius: 10,
          background: 'var(--bg-2)',
          border: '1px dashed var(--border)',
          fontSize: 13, color: 'var(--fg-3)',
          textAlign: 'center',
        }}>{emptyHint}</div>
      ) : (
        <div>
          {questions.map((q) => (
            <QuestionEditor
              key={q.id}
              question={q}
              onChange={updateQuestion}
              onDelete={() => deleteQuestion(q.id)}
              onDragStartHandle={() => setDraggingId(q.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => reorderTo(q.id)}
              isDragging={draggingId === q.id}
            />
          ))}
        </div>
      )}

      <div style={{ marginTop: 12 }}>
        <AddQuestionMenu onAdd={addQuestion}/>
      </div>

      {previewOpen && (
        <PreviewModal
          questions={questions}
          onClose={() => setPreviewOpen(false)}
        />
      )}
    </div>
  );
}

function PreviewModal({
  questions,
  onClose,
}: {
  questions: ApplicationQuestion[];
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 720, width: '90vw', maxHeight: '90vh', overflow: 'auto',
          background: 'var(--surface)', borderRadius: 16, padding: 24,
          boxShadow: 'var(--shadow-pop)',
        }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 16,
        }}>
          <h3 className="h3" style={{ margin: 0 }}>Превью анкеты</h3>
          <button
            type="button"
            onClick={onClose}
            title="Закрыть"
            style={{
              width: 36, height: 36, padding: 0, borderRadius: 8,
              background: 'transparent', border: 'none', color: 'var(--fg-3)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div style={{ fontSize: 13, color: 'var(--fg-3)', marginBottom: 16 }}>
          Так анкета увидится студенту. Нажатие «Отправить» в превью ничего не сохраняет.
        </div>
        <DynamicForm
          questions={questions}
          onSubmit={() => { /* preview only */ }}
          submitLabel="Это превью"
        />
      </div>
    </div>
  );
}
