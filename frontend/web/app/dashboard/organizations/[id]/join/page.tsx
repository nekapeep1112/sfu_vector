'use client';

import { use, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, notFound } from 'next/navigation';
import { ORGANIZATIONS, CURRENT_USER, tonalShift } from '@/lib/mock-data';
import type { ApplicationAnswer } from '@/lib/mock-data';
import { DynamicForm } from '@/components/forms/DynamicForm';

export default function JoinOrgPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idParam } = use(params);
  const id = Number(idParam);
  const org = ORGANIZATIONS.find(o => o.id === id);
  if (!org) notFound();

  const router = useRouter();

  useEffect(() => {
    if (CURRENT_USER.memberships.includes(id)) {
      router.replace('/organizations/' + id);
    }
  }, [id, router]);

  const isPending = CURRENT_USER.pendingMemberships?.includes(id) ?? false;

  const handleSubmit = (answers: ApplicationAnswer[]) => {
    console.log('TODO: submit membership application', { orgId: id, answers });
    router.push('/dashboard/organizations/' + id + '?submitted=1');
  };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: 32 }}>
      <div style={{ marginBottom: 20, fontSize: 13, color: 'var(--fg-3)' }}>
        <Link href={'/dashboard/organizations/' + id} style={{ color: 'var(--fg-3)', textDecoration: 'none' }}>
          ← {org.name}
        </Link>
        <span style={{ color: 'var(--fg-4)' }}> / Подать заявку</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
        <div style={{
          width: 56, height: 56, borderRadius: 14,
          background: `linear-gradient(135deg, ${org.color}, ${tonalShift(org.color)})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontSize: 18, fontWeight: 800,
          flexShrink: 0,
        }}>{org.short}</div>
        <div>
          <h2 className="h2" style={{ margin: 0 }}>Заявка на вступление</h2>
          <div style={{ fontSize: 14, color: 'var(--fg-3)', marginTop: 4 }}>{org.name}</div>
        </div>
      </div>

      <p style={{ fontSize: 14, color: 'var(--fg-3)', lineHeight: 1.55, marginTop: 16, marginBottom: 24 }}>
        После отправки заявка попадёт владельцам организации. Они рассмотрят её в течение 1–3 дней — на почту придёт уведомление о решении.
      </p>

      {isPending && (
        <div style={{
          padding: 14, borderRadius: 12, marginBottom: 20,
          background: 'rgba(245,165,36,0.08)', border: '1px solid rgba(245,165,36,0.30)',
          fontSize: 13, color: 'var(--amber)', fontWeight: 600,
        }}>
          У тебя уже есть заявка в эту организацию, ожидающая решения. Повторная отправка не нужна.
        </div>
      )}

      <DynamicForm
        questions={org.joinQuestions}
        onSubmit={handleSubmit}
        cancelHref={'/dashboard/organizations/' + id}
        submitLabel="Отправить заявку"
      />
    </div>
  );
}
