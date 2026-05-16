'use client';

import { useState } from 'react';
import { FieldBlock, FieldLabel } from '@/components/org/WizardField';
import type { CreateOrgWizardData } from './wizard-types';

interface Props {
  data: CreateOrgWizardData;
  onChange: (patch: Partial<CreateOrgWizardData>) => void;
}

function deriveShort(name: string): string {
  const first = name.trim().split(/\s+/)[0] ?? '';
  return first.slice(0, 2).toUpperCase();
}

export function Step1({ data, onChange }: Props) {
  const [shortTouched, setShortTouched] = useState(data.short.length > 0);

  const handleNameChange = (next: string) => {
    if (shortTouched) {
      onChange({ name: next });
    } else {
      onChange({ name: next, short: deriveShort(next) });
    }
  };

  const handleShortChange = (next: string) => {
    setShortTouched(next.length > 0);
    onChange({ short: next.toUpperCase().slice(0, 8) });
  };

  return (
    <div className="card" style={{ padding: 28 }}>
      <FieldBlock>
        <FieldLabel title="Название организации" hint="Полное название, как будет видно в каталоге"/>
        <input
          className="input"
          placeholder="Например: AI Club СФУ"
          value={data.name}
          maxLength={60}
          onChange={(e) => handleNameChange(e.target.value)}
          style={{ height: 48, fontSize: 16, marginTop: 12, width: '100%' }}
        />
        <div style={{ fontSize: 11, color: 'var(--fg-4)', textAlign: 'right', marginTop: 6 }}>
          {data.name.length} / 60
        </div>
      </FieldBlock>

      <FieldBlock>
        <FieldLabel title="Короткое название" hint="Это значок на аватаре. По умолчанию подставляется из названия — можно изменить вручную."/>
        <input
          className="input"
          placeholder="AI"
          value={data.short}
          maxLength={8}
          onChange={(e) => handleShortChange(e.target.value)}
          style={{ height: 44, fontSize: 15, fontWeight: 700, letterSpacing: '0.04em', marginTop: 12, width: 200, textTransform: 'uppercase' }}
        />
      </FieldBlock>

      <FieldBlock mb={0}>
        <FieldLabel title="Описание" hint="Чем занимается организация. От 30 символов."/>
        <textarea
          className="input"
          placeholder="Расскажи о целях, форматах работы, для кого организация будет полезна…"
          value={data.description}
          maxLength={300}
          onChange={(e) => onChange({ description: e.target.value })}
          style={{ height: 120, padding: 14, fontSize: 14, marginTop: 12, width: '100%', resize: 'none', fontFamily: 'inherit' }}
        />
        <div style={{ fontSize: 11, color: 'var(--fg-4)', textAlign: 'right', marginTop: 6 }}>
          {data.description.length} / 300
        </div>
      </FieldBlock>
    </div>
  );
}
