'use client';

import { use, useState } from 'react';
import { useRouter, notFound } from 'next/navigation';
import { ORGANIZATIONS, type Organization } from '@/lib/mock-data';
import { Stepper } from '@/components/org/Stepper';
import { Step1 } from '@/components/org/Step1';
import { Step2 } from '@/components/org/Step2';
import { Step3 } from '@/components/org/Step3';
import { Step4 } from '@/components/org/Step4';
import { WizardPreview } from '@/components/org/WizardPreview';
import { INITIAL_WIZARD_DATA, type WizardData } from '@/components/org/wizard-types';

const IconArrowL = ({ s = 12 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const IconArrowR = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

export default function EventCreatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idParam } = use(params);
  const id = Number(idParam);
  const org = ORGANIZATIONS.find((o) => o.id === id);
  if (!org) notFound();

  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>(INITIAL_WIZARD_DATA);

  const update = (patch: Partial<WizardData>) =>
    setData((d) => ({ ...d, ...patch }));

  const next = () => setStep((s) => Math.min(s + 1, 4));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const publish = () => {
    console.log('TODO: publish event', data);
    router.push(`/organizations/${id}`);
  };
  const goDashboard = () => router.push(`/organizations/${id}`);

  return (
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: 32 }}>
      <WizardHeader org={org} onBack={goDashboard} onCancel={goDashboard}/>
      <Stepper current={step}/>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32, alignItems: 'flex-start' }}>
        <div>
          {step === 1 && <Step1 data={data} onChange={update}/>}
          {step === 2 && <Step2 data={data} onChange={update}/>}
          {step === 3 && <Step3 data={data} onChange={update}/>}
          {step === 4 && (
            <Step4
              data={data}
              onPublish={publish}
              onSchedule={() => console.log('TODO: schedule publish')}
              onDraft={() => console.log('TODO: save draft')}
            />
          )}
          <BottomNav step={step} onNext={next} onBack={back} onSaveClose={goDashboard}/>
        </div>
        <WizardPreview data={data}/>
      </div>
    </div>
  );
}

function WizardHeader({ org, onBack, onCancel }: { org: Organization; onBack: () => void; onCancel: () => void }) {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span
          onClick={onBack}
          style={{ fontSize: 13, color: 'var(--fg-3)', display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}
        >
          <IconArrowL s={12}/> Вернуться на дашборд
        </span>
        <div style={{ display: 'flex', gap: 18 }}>
          <span
            onClick={() => console.log('TODO: save draft')}
            style={{ fontSize: 13, color: 'var(--fg-2)', fontWeight: 500, cursor: 'pointer' }}
          >
            Сохранить как черновик
          </span>
          <span
            onClick={onCancel}
            style={{ fontSize: 13, color: 'var(--red)', fontWeight: 500, cursor: 'pointer' }}
          >
            Отменить создание
          </span>
        </div>
      </div>
      <div style={{ marginTop: 18 }}>
        <h2 className="h2" style={{ margin: 0, fontSize: 32, lineHeight: 1.1, letterSpacing: '-0.02em' }}>Новое мероприятие</h2>
        <div style={{ fontSize: 13, color: 'var(--fg-3)', marginTop: 4 }}>
          От имени организации «{org.name}»
        </div>
      </div>
    </>
  );
}

function BottomNav({ step, onNext, onBack, onSaveClose }: { step: number; onNext: () => void; onBack: () => void; onSaveClose: () => void }) {
  return (
    <div style={{
      marginTop: 24, padding: '24px 0',
      borderTop: '1px solid var(--border)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <div>
        {step > 1 && (
          <button
            onClick={onBack}
            className="btn btn-ghost"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 44, padding: '0 18px' }}
          >
            <IconArrowL s={14}/> Назад
          </button>
        )}
      </div>
      <div>
        {step < 4 ? (
          <button
            onClick={onNext}
            className="btn btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 44, padding: '0 22px', fontWeight: 700 }}
          >
            Далее <IconArrowR s={14}/>
          </button>
        ) : (
          <button
            onClick={onSaveClose}
            className="btn btn-ghost"
            style={{ height: 44, padding: '0 18px' }}
          >
            Сохранить и закрыть
          </button>
        )}
      </div>
    </div>
  );
}
