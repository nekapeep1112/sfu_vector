'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Stepper } from '@/components/org/Stepper';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { Step4 } from './Step4';
import {
  CREATE_ORG_STEPS,
  INITIAL_CREATE_ORG_DATA,
  type CreateOrgWizardData,
} from './wizard-types';

const IconArrowL = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const IconArrowR = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

type StepNum = 1 | 2 | 3 | 4;

export default function CreateOrganizationPage() {
  const router = useRouter();
  const [step, setStep] = useState<StepNum>(1);
  const [data, setData] = useState<CreateOrgWizardData>(INITIAL_CREATE_ORG_DATA);

  const update = (patch: Partial<CreateOrgWizardData>) =>
    setData((d) => ({ ...d, ...patch }));

  const next = () => setStep((s) => (Math.min(s + 1, 4) as StepNum));
  const back = () => setStep((s) => (Math.max(s - 1, 1) as StepNum));

  const handleSubmit = () => {
    console.log('TODO submit create org application', data);
    router.push('/dashboard/create-organization/success');
  };

  const step1Valid = data.name.trim().length >= 3 && data.description.trim().length >= 30;

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ marginBottom: 8 }}>
        <span
          onClick={() => router.push('/dashboard')}
          style={{
            fontSize: 13, color: 'var(--fg-3)',
            display: 'inline-flex', alignItems: 'center', gap: 6,
            cursor: 'pointer',
          }}
        >
          <IconArrowL s={12}/> На главную
        </span>
      </div>

      <h1 className="h1" style={{ margin: 0, fontSize: 36, lineHeight: 1.1 }}>Создание организации</h1>
      <p style={{ color: 'var(--fg-3)', marginTop: 8, marginBottom: 0, fontSize: 14, lineHeight: 1.55 }}>
        Заполни форму ниже. После отправки заявка попадёт на модерацию администрации СФУ — обычно решение принимается в течение 1–3 рабочих дней.
      </p>

      <Stepper current={step} steps={CREATE_ORG_STEPS}/>

      {step === 1 && <Step1 data={data} onChange={update}/>}
      {step === 2 && <Step2 data={data} onChange={update}/>}
      {step === 3 && <Step3 data={data} onChange={update}/>}
      {step === 4 && <Step4 data={data}/>}

      <div style={{
        marginTop: 24, padding: '24px 0',
        borderTop: '1px solid var(--border)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          {step > 1 && (
            <button
              onClick={back}
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
              onClick={next}
              disabled={step === 1 && !step1Valid}
              className="btn btn-primary"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                height: 44, padding: '0 22px', fontWeight: 700,
                opacity: step === 1 && !step1Valid ? 0.5 : 1,
              }}
            >
              Далее <IconArrowR s={14}/>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="btn btn-primary"
              style={{ height: 44, padding: '0 22px', fontWeight: 700 }}
            >
              Отправить заявку
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
