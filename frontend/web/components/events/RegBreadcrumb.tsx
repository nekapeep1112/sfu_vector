'use client';

import Link from 'next/link';

export function RegBreadcrumb({ step, eventId, eventTitle }: { step: string; eventId: number; eventTitle: string }) {
  return (
    <div style={{ fontSize: 13, color: 'var(--fg-3)', marginBottom: 24 }}>
      <Link href="/dashboard/events" style={{ color: 'var(--fg-3)', textDecoration: 'none' }}>← Мероприятия</Link>
      <span style={{ margin: '0 8px', color: 'var(--fg-4)' }}>/</span>
      <Link href={`/dashboard/events/${eventId}`} style={{ color: 'var(--fg-3)', textDecoration: 'none' }}>{eventTitle}</Link>
      <span style={{ margin: '0 8px', color: 'var(--fg-4)' }}>/</span>
      <span style={{ color: 'var(--fg-2)', fontWeight: 600 }}>{step}</span>
    </div>
  );
}
