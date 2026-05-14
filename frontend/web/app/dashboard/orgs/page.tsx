'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ORGANIZATIONS, INSTITUTES, DORMITORIES } from '@/lib/mock-data';
import { OrgListView } from '@/components/org/OrgListView';
import { OrgMapView } from '@/components/org/OrgMapView';
import { OrgDormsView } from '@/components/org/OrgDormsView';

type Tab = 'Список' | 'Карта' | 'Общежития';
const TABS: Tab[] = ['Список', 'Карта', 'Общежития'];

const TAB_TO_PARAM: Record<Tab, string> = {
  'Список': 'list',
  'Карта': 'map',
  'Общежития': 'dorms',
};

const PARAM_TO_TAB: Record<string, Tab> = {
  list: 'Список',
  map: 'Карта',
  dorms: 'Общежития',
};

function OrgsPageContent() {
  const sp = useSearchParams();
  const router = useRouter();
  const tab: Tab = PARAM_TO_TAB[sp.get('tab') ?? ''] ?? 'Список';

  const handleTabClick = (next: Tab) => {
    if (next === 'Список') {
      router.replace('/dashboard/orgs', { scroll: false });
    } else {
      router.replace(`/dashboard/orgs?tab=${TAB_TO_PARAM[next]}`, { scroll: false });
    }
  };

  return (
    <div style={{ maxWidth: 1440, margin: '0 auto', padding: 32 }}>
      <h1 className="h2" style={{ margin: 0, marginBottom: 8 }}>Организации СФУ</h1>
      <div style={{ fontSize: 13, color: 'var(--fg-3)', marginBottom: 20 }}>
        {ORGANIZATIONS.length} организаций · {INSTITUTES.length} институтов · {DORMITORIES.length} общежитий
      </div>

      <div style={{ display: 'flex', gap: 4, padding: 4, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, marginBottom: 20, width: 'fit-content' }}>
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => handleTabClick(t)}
            style={{
              padding: '8px 16px', borderRadius: 8,
              background: tab === t ? 'var(--grad-soft)' : 'transparent',
              border: '1px solid ' + (tab === t ? 'rgba(155,92,255,0.3)' : 'transparent'),
              fontSize: 13, fontWeight: 500,
              color: tab === t ? 'var(--fg)' : 'var(--fg-3)',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Список' && <OrgListView />}
      {tab === 'Карта' && <OrgMapView />}
      {tab === 'Общежития' && <OrgDormsView />}
    </div>
  );
}

export default function OrgsPage() {
  return (
    <Suspense fallback={null}>
      <OrgsPageContent />
    </Suspense>
  );
}
