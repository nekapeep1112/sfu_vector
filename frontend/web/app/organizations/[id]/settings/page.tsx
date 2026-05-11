'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { ORGANIZATIONS, tonalShift } from '@/lib/mock-data';
import { IconCheck } from '@/components/org/icons';

function OrgSettingRow({
  label, value, action, onAction, danger = false, isLast = false,
}: {
  label: string;
  value: React.ReactNode;
  action: string;
  onAction: () => void;
  danger?: boolean;
  isLast?: boolean;
}) {
  return (
    <div className="row" style={{
      justifyContent: 'space-between', alignItems: 'center',
      paddingBottom: isLast ? 0 : 16,
      marginBottom: isLast ? 0 : 16,
      borderBottom: isLast ? 'none' : '1px solid var(--border)',
    }}>
      <div className="col" style={{ minWidth: 0 }}>
        <div style={{ fontSize: 11, color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>{label}</div>
        <div style={{ fontSize: 14, color: 'var(--fg)', marginTop: 4 }}>{value}</div>
      </div>
      <button
        className="btn btn-ghost btn-sm"
        style={danger ? { color: 'var(--red)', borderColor: 'rgba(242,94,94,0.4)' } : undefined}
        onClick={onAction}
      >{action}</button>
    </div>
  );
}

export default function OrgSettingsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idParam } = use(params);
  const id = Number(idParam);
  const org = ORGANIZATIONS.find((o) => o.id === id);
  if (!org) notFound();

  return (
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: 32 }}>
      <h2 className="h2" style={{ margin: '0 0 24px' }}>Настройки организации</h2>

      <div className="col" style={{ gap: 24 }}>
        {/* Section 1: Основные */}
        <div className="card" style={{ padding: 24 }}>
          <h4 className="h4" style={{ margin: '0 0 16px' }}>Основные</h4>
          <OrgSettingRow
            label="Название"
            value={org.name}
            action="Изменить"
            onAction={() => console.log('TODO: edit org name')}
          />
          <OrgSettingRow
            label="Краткое описание"
            value="Студенческое самоуправление ИКИТ — событиями, проектами и связью с деканатом"
            action="Изменить"
            onAction={() => console.log('TODO: edit org description')}
          />
          <OrgSettingRow
            label="Аватар"
            value={
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: `linear-gradient(135deg, ${org.color}, ${tonalShift(org.color)})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 700, fontSize: 14, marginTop: 8,
              }}>{org.short}</div>
            }
            action="Загрузить"
            onAction={() => console.log('TODO: upload avatar')}
          />
          <OrgSettingRow
            label="Контакт"
            value="studsovet@sfu-kras.ru"
            action="Изменить"
            onAction={() => console.log('TODO: edit org contact')}
            isLast
          />
        </div>

        {/* Section 2: Верификация */}
        <div className="card" style={{ padding: 24 }}>
          <h4 className="h4" style={{ margin: '0 0 16px' }}>Верификация</h4>
          <div style={{
            background: 'rgba(61,214,140,0.1)',
            border: '1px solid rgba(61,214,140,0.3)',
            padding: 16, borderRadius: 12,
            display: 'flex', alignItems: 'flex-start', gap: 12,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 10,
              background: 'rgba(61,214,140,0.15)', color: 'var(--green)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}><IconCheck s={16}/></div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--green)' }}>Организация верифицирована</div>
              <div style={{ fontSize: 13, color: 'var(--fg-3)', marginTop: 4, lineHeight: 1.5 }}>
                Подтверждено университетом 15 января 2024. Это значит, что СФУ ручается за вашу организацию.
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Опасная зона */}
        <div className="card" style={{ padding: 24, borderColor: 'rgba(242,94,94,0.3)' }}>
          <h4 className="h4" style={{ margin: '0 0 16px', color: 'var(--red)' }}>Опасная зона</h4>
          <OrgSettingRow
            label="Архивировать организацию"
            value="События останутся доступны, но новые создавать нельзя"
            action="Архивировать"
            danger
            onAction={() => console.log('TODO: archive organization', org.id)}
          />
          <OrgSettingRow
            label="Удалить организацию"
            value="Все данные будут удалены безвозвратно"
            action="Удалить"
            danger
            onAction={() => console.log('TODO: delete organization', org.id)}
            isLast
          />
        </div>
      </div>
    </div>
  );
}
