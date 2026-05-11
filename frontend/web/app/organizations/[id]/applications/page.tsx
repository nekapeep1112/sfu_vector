'use client';

import { use, useMemo, useState } from 'react';
import { useRouter, notFound } from 'next/navigation';
import { ORGANIZATIONS, APPLICATIONS } from '@/lib/mock-data';
import { ApplicationsFilters } from '@/components/org/ApplicationsFilters';
import { ApplicationsList } from '@/components/org/ApplicationsList';
import { ApplicationDetail } from '@/components/org/ApplicationDetail';
import { ApplicationsEmpty } from '@/components/org/ApplicationsEmpty';
import { BulkActionsBar } from '@/components/org/BulkActionsBar';
import type { TabId, Counts } from '@/components/org/applications-types';

const IconDownload = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const IconSettings = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82 2 2 0 1 1-2.83 2.83 1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33 2 2 0 1 1-2.83-2.83 1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82 2 2 0 1 1 2.83-2.83 1.65 1.65 0 0 0 1.82.33 1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33 2 2 0 1 1 2.83 2.83 1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

export default function ApplicationsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idParam } = use(params);
  const id = Number(idParam);
  const org = ORGANIZATIONS.find((o) => o.id === id);
  if (!org) notFound();

  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>('pending');
  const [selectedId, setSelectedId] = useState<number>(APPLICATIONS[0].id);
  const [bulkMode, setBulkMode] = useState(false);
  const [bulkChecked, setBulkChecked] = useState<number[]>([]);

  const counts: Counts = useMemo(() => ({
    pending:  APPLICATIONS.filter((a) => a.status === 'pending').length,
    approved: APPLICATIONS.filter((a) => a.status === 'approved' || a.status === 'auto').length,
    rejected: APPLICATIONS.filter((a) => a.status === 'rejected').length,
    all:      APPLICATIONS.length,
  }), []);

  const filtered = useMemo(() => {
    if (activeTab === 'all') return APPLICATIONS;
    if (activeTab === 'approved') {
      return APPLICATIONS.filter((a) => a.status === 'approved' || a.status === 'auto');
    }
    return APPLICATIONS.filter((a) => a.status === activeTab);
  }, [activeTab]);

  const selected = APPLICATIONS.find((a) => a.id === selectedId) ?? APPLICATIONS[0];

  const onBulkToggle = (appId: number) => {
    setBulkChecked((prev) => prev.includes(appId)
      ? prev.filter((x) => x !== appId)
      : [...prev, appId]);
  };

  const onSelectAllToggle = () => {
    const ids = filtered.map((a) => a.id);
    const allChecked = ids.every((x) => bulkChecked.includes(x));
    setBulkChecked(allChecked ? [] : Array.from(new Set([...bulkChecked, ...ids])));
  };

  const onToggleBulk = () => {
    if (bulkMode) setBulkChecked([]);
    setBulkMode((b) => !b);
  };

  return (
    <div style={{ maxWidth: 1440, margin: '0 auto', padding: 32 }}>
      <PageHeader
        counts={counts}
        bulkMode={bulkMode}
        onToggleBulk={onToggleBulk}
        onExport={() => console.log('TODO: export csv')}
        onNotificationSettings={() => console.log('TODO: notification settings')}
      />

      <ApplicationsFilters activeTab={activeTab} onTabChange={setActiveTab} counts={counts}/>

      {/* NOTE: empty-state срабатывает когда в выбранном табе нет заявок.
          С текущим набором APPLICATIONS все 4 таба содержат данные → empty не показывается.
          Для ручной проверки: временно меняй activeTab на несуществующий или фильтр на жёсткий. */}
      {filtered.length === 0 ? (
        <ApplicationsEmpty
          onViewApproved={() => setActiveTab('approved')}
          onCreateEvent={() => router.push(`/organizations/${id}/events/new`)}
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 480px', gap: 16, alignItems: 'flex-start' }}>
          <ApplicationsList
            applications={filtered}
            selectedId={selectedId}
            onSelect={setSelectedId}
            bulkMode={bulkMode}
            bulkChecked={bulkChecked}
            onBulkToggle={onBulkToggle}
            onSelectAllToggle={onSelectAllToggle}
            bulkBar={bulkMode && bulkChecked.length > 0 ? (
              <BulkActionsBar
                count={bulkChecked.length}
                onApproveAll={() => console.log('TODO: bulk approve', bulkChecked)}
                onRejectAll={() => console.log('TODO: bulk reject', bulkChecked)}
                onExport={() => console.log('TODO: bulk export', bulkChecked)}
                onClearSelection={() => setBulkChecked([])}
              />
            ) : null}
          />
          <ApplicationDetail
            application={selected}
            onApprove={() => console.log('TODO: approve', selected.id)}
            onReject={() => console.log('TODO: reject', selected.id)}
            onMore={() => console.log('TODO: more menu', selected.id)}
            onOpenEvent={() => {
              if (selected.event === 'Хакатон Siberian Hack 2026') router.push('/dashboard/events/1');
              else console.log('TODO: open event card', selected.event);
            }}
          />
        </div>
      )}
    </div>
  );
}

function PageHeader({
  counts, bulkMode, onToggleBulk, onExport, onNotificationSettings,
}: {
  counts: Counts;
  bulkMode: boolean;
  onToggleBulk: () => void;
  onExport: () => void;
  onNotificationSettings: () => void;
}) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, gap: 16 }}>
      <div>
        <h2 className="h2" style={{ margin: 0 }}>Заявки</h2>
        <div style={{ fontSize: 13, color: 'var(--fg-3)', marginTop: 4 }}>
          {counts.pending} ждут рассмотрения · {counts.approved} одобрено · {counts.rejected} отклонено
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={onToggleBulk}
          className={bulkMode ? 'btn btn-primary btn-sm' : 'btn btn-ghost btn-sm'}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          {bulkMode ? 'Выйти из массового режима' : 'Массовый режим'}
        </button>
        <button className="btn btn-ghost btn-sm" onClick={onExport} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <IconDownload/> Экспорт CSV
        </button>
        <button className="btn btn-ghost btn-sm" onClick={onNotificationSettings} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <IconSettings/> Настройки уведомлений
        </button>
      </div>
    </div>
  );
}
