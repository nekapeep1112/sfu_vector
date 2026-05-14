'use client';

import { use, useMemo, useState } from 'react';
import { useRouter, useSearchParams, notFound } from 'next/navigation';
import { ORGANIZATIONS, APPLICATIONS, MEMBERSHIP_APPLICATIONS } from '@/lib/mock-data';
import { ApplicationsFilters } from '@/components/org/ApplicationsFilters';
import { ApplicationsList } from '@/components/org/ApplicationsList';
import { ApplicationDetail } from '@/components/org/ApplicationDetail';
import { ApplicationsEmpty } from '@/components/org/ApplicationsEmpty';
import { BulkActionsBar } from '@/components/org/BulkActionsBar';
import { MembershipApplicationsList } from '@/components/org/MembershipApplicationsList';
import { MembershipApplicationDetail } from '@/components/org/MembershipApplicationDetail';
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

type AppType = 'events' | 'team';

export default function ApplicationsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idParam } = use(params);
  const id = Number(idParam);
  const org = ORGANIZATIONS.find((o) => o.id === id);
  if (!org) notFound();

  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType: AppType = searchParams.get('type') === 'team' ? 'team' : 'events';
  const [appType, setAppType] = useState<AppType>(initialType);

  const orgMembershipApps = useMemo(
    () => MEMBERSHIP_APPLICATIONS.filter(a => a.orgId === id),
    [id]
  );

  return (
    <div style={{ maxWidth: 1440, margin: '0 auto', padding: 32 }}>
      <PageHeader appType={appType} eventsCount={APPLICATIONS.length} teamCount={orgMembershipApps.length}/>

      <TypeToggle
        appType={appType}
        eventsCount={APPLICATIONS.length}
        teamCount={orgMembershipApps.length}
        onChange={setAppType}
      />

      {appType === 'events' ? (
        <EventsApplicationsPane orgId={id} router={router}/>
      ) : (
        <MembershipApplicationsPane applications={orgMembershipApps}/>
      )}
    </div>
  );
}

function TypeToggle({
  appType, eventsCount, teamCount, onChange,
}: {
  appType: AppType;
  eventsCount: number;
  teamCount: number;
  onChange: (t: AppType) => void;
}) {
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
      {([
        { id: 'events', label: 'На события', count: eventsCount },
        { id: 'team',   label: 'В команду',  count: teamCount },
      ] as const).map(t => {
        const active = appType === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 18px', borderRadius: 10,
              fontSize: 14, fontWeight: 700,
              background: active ? 'var(--surface)' : 'transparent',
              border: '1px solid ' + (active ? 'var(--border-strong)' : 'var(--border)'),
              color: active ? 'var(--fg)' : 'var(--fg-3)',
              cursor: 'pointer',
              transition: 'all .15s',
            }}
          >
            {t.label}
            <span style={{
              padding: '2px 8px', borderRadius: 999,
              background: active ? 'var(--bg-2)' : 'var(--surface)',
              border: '1px solid ' + (active ? 'var(--border)' : 'var(--border)'),
              fontSize: 11, fontWeight: 700, color: active ? 'var(--fg-2)' : 'var(--fg-4)',
            }}>{t.count}</span>
          </button>
        );
      })}
    </div>
  );
}

function EventsApplicationsPane({ orgId, router }: { orgId: number; router: ReturnType<typeof useRouter> }) {
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

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12, gap: 8 }}>
        <button
          onClick={() => {
            if (bulkMode) setBulkChecked([]);
            setBulkMode((b) => !b);
          }}
          className={bulkMode ? 'btn btn-primary btn-sm' : 'btn btn-ghost btn-sm'}
        >
          {bulkMode ? 'Выйти из массового режима' : 'Массовый режим'}
        </button>
      </div>

      <ApplicationsFilters activeTab={activeTab} onTabChange={setActiveTab} counts={counts}/>

      {filtered.length === 0 ? (
        <ApplicationsEmpty
          onViewApproved={() => setActiveTab('approved')}
          onCreateEvent={() => router.push(`/organizations/${orgId}/events/new`)}
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
              if (selected.event === 'Хакатон Siberian Hack 2026') {
                window.open('/dashboard/events/1', '_blank');
              } else {
                console.log('TODO: open event card', selected.event);
              }
            }}
          />
        </div>
      )}
    </>
  );
}

function MembershipApplicationsPane({ applications }: { applications: typeof MEMBERSHIP_APPLICATIONS }) {
  const [selectedId, setSelectedId] = useState<number>(applications[0]?.id ?? 0);

  if (applications.length === 0) {
    return (
      <div className="card" style={{ padding: 48, textAlign: 'center', color: 'var(--fg-3)' }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6, color: 'var(--fg-2)' }}>Нет заявок в команду</div>
        <div style={{ fontSize: 13 }}>Когда студенты подадут заявки на вступление, они появятся здесь.</div>
      </div>
    );
  }

  const selected = applications.find(a => a.id === selectedId) ?? applications[0];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 480px', gap: 16, alignItems: 'flex-start' }}>
      <MembershipApplicationsList
        applications={applications}
        selectedId={selected.id}
        onSelect={setSelectedId}
      />
      <MembershipApplicationDetail
        application={selected}
        onApprove={(role) => console.log('TODO: approve membership as', role, selected.id)}
        onReject={() => console.log('TODO: reject membership', selected.id)}
      />
    </div>
  );
}

function PageHeader({
  appType, eventsCount, teamCount,
}: {
  appType: AppType;
  eventsCount: number;
  teamCount: number;
}) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, gap: 16 }}>
      <div>
        <h2 className="h2" style={{ margin: 0 }}>Заявки</h2>
        <div style={{ fontSize: 13, color: 'var(--fg-3)', marginTop: 4 }}>
          {appType === 'events'
            ? `${eventsCount} всего · на участие в мероприятиях`
            : `${teamCount} всего · на вступление в команду`}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn btn-ghost btn-sm" onClick={() => console.log('TODO: export csv')} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <IconDownload/> Экспорт CSV
        </button>
        <button className="btn btn-ghost btn-sm" onClick={() => console.log('TODO: notification settings')} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <IconSettings/> Настройки уведомлений
        </button>
      </div>
    </div>
  );
}
