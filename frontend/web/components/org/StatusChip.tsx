import type { OrgEventStatus } from '@/lib/mock-data';

const STATUS: Record<OrgEventStatus, { label: string; color: string }> = {
  published: { label: 'Опубликовано', color: 'var(--green)' },
  draft:     { label: 'Черновик',     color: 'var(--fg-4)' },
  pending:   { label: 'На модерации', color: 'var(--amber)' },
  done:      { label: 'Завершено',    color: 'var(--fg-3)' },
};

export function StatusChip({ status }: { status: OrgEventStatus }) {
  const v = STATUS[status] || STATUS.draft;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '4px 8px', borderRadius: 6,
      background: 'var(--bg-2)', border: '1px solid var(--border)',
      fontSize: 11, fontWeight: 600, color: 'var(--fg-2)',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: v.color }}/>
      {v.label}
    </span>
  );
}
