'use client';

import { useRouter } from 'next/navigation';
import type { Organization } from '@/lib/mock-data';
import { tonalShift } from '@/lib/mock-data';
import { IconPlus, IconCheck } from './icons';

export function OrgPageHeader({ org }: { org: Organization }) {
  const router = useRouter();
  const grad = `linear-gradient(135deg, ${org.color}, ${tonalShift(org.color)})`;

  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
      marginBottom: 24, gap: 24, flexWrap: 'wrap',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, minWidth: 0, flex: 1 }}>
        <div style={{
          width: 64, height: 64, borderRadius: 16, background: grad,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontSize: 20, fontWeight: 800,
          flexShrink: 0, boxShadow: '0 4px 12px rgba(15,23,42,0.12)',
        }}>{org.short}</div>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <h2 className="h2" style={{ margin: 0, fontSize: 32, lineHeight: 1.1, letterSpacing: '-0.02em' }}>{org.name}</h2>
            {org.verified && (
              <span style={{
                padding: '4px 10px', borderRadius: 8,
                background: 'rgba(5,150,105,0.1)', color: 'var(--green)',
                fontSize: 11, fontWeight: 700,
                display: 'inline-flex', alignItems: 'center', gap: 4,
              }}>
                <IconCheck s={11}/> Верифицирована
              </span>
            )}
          </div>
          <div style={{
            marginTop: 6, display: 'flex', gap: 12,
            fontSize: 12, color: 'var(--fg-3)', flexWrap: 'wrap',
          }}>
            <span>{org.members} участников</span>
          </div>
        </div>
      </div>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
        gap: 6, flexShrink: 0,
      }}>
        <button
          className="btn btn-primary"
          onClick={() => router.push(`/organizations/${org.id}/events/new`)}
          style={{
            height: 48, padding: '0 22px', fontSize: 15, fontWeight: 700,
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}
        >
          <IconPlus s={16}/> Создать мероприятие
        </button>
        <div style={{ fontSize: 11, color: 'var(--fg-4)', textAlign: 'right' }}>
          Опубликуется сразу — модерация не требуется
        </div>
      </div>
    </div>
  );
}
