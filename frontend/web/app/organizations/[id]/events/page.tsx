'use client';

import { use, useMemo, useState } from 'react';
import { useRouter, notFound } from 'next/navigation';
import { ORGANIZATIONS, ORG_EVENTS } from '@/lib/mock-data';
import { EventsTable } from '@/components/org/EventsTable';

type EventTab = 'all' | 'active' | 'draft' | 'done';

const TABS: { id: EventTab; label: string }[] = [
  { id: 'all',    label: 'Все' },
  { id: 'active', label: 'Активные' },
  { id: 'draft',  label: 'Черновики' },
  { id: 'done',   label: 'Завершённые' },
];

export default function OrgEventsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idParam } = use(params);
  const id = Number(idParam);
  const org = ORGANIZATIONS.find((o) => o.id === id);
  if (!org) notFound();

  const router = useRouter();
  const [activeTab, setActiveTab] = useState<EventTab>('all');

  const filtered = useMemo(() => {
    if (activeTab === 'all')    return ORG_EVENTS;
    if (activeTab === 'active') return ORG_EVENTS.filter((e) => e.status === 'published');
    if (activeTab === 'draft')  return ORG_EVENTS.filter((e) => e.status === 'draft' || e.status === 'pending');
    return ORG_EVENTS.filter((e) => e.status === 'done');
  }, [activeTab]);

  return (
    <div style={{ maxWidth: 1440, margin: '0 auto', padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, gap: 16 }}>
        <div>
          <h2 className="h2" style={{ margin: 0 }}>Мероприятия</h2>
          <div style={{ fontSize: 13, color: 'var(--fg-3)', marginTop: 4 }}>
            5 активных · 12 завершено · 2 черновика
          </div>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => router.push(`/organizations/${id}/events/new`)}
        >+ Создать мероприятие</button>
      </div>

      <div style={{
        display: 'flex', gap: 4, padding: 4,
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 12, marginBottom: 16, width: 'fit-content',
      }}>
        {TABS.map((t) => {
          const isActive = t.id === activeTab;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                padding: '8px 16px', borderRadius: 8,
                background: isActive ? 'var(--grad-soft)' : 'transparent',
                border: '1px solid ' + (isActive ? 'rgba(155,92,255,0.3)' : 'transparent'),
                fontSize: 13, fontWeight: 500,
                color: isActive ? 'var(--fg)' : 'var(--fg-3)',
                cursor: 'pointer',
              }}
            >{t.label}</button>
          );
        })}
      </div>

      <EventsTable events={filtered} orgId={id}/>
    </div>
  );
}
