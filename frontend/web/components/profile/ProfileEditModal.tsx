'use client';

import { useEffect, useRef, useState } from 'react';
import { CURRENT_USER } from '@/lib/mock-data';

interface Props {
  onClose: () => void;
}

const BIO_MAX = 200;

export function ProfileEditModal({ onClose }: Props) {
  const initial = useRef({
    handle:      CURRENT_USER.handle,
    bio:         CURRENT_USER.bio ?? '',
    email:       CURRENT_USER.email,
    emailPublic: CURRENT_USER.emailPublic ?? false,
    phone:       CURRENT_USER.phone ?? '',
  });

  const [handle, setHandle]           = useState(initial.current.handle);
  const [bio, setBio]                 = useState(initial.current.bio);
  const [email, setEmail]             = useState(initial.current.email);
  const [emailPublic, setEmailPublic] = useState(initial.current.emailPublic);
  const [phone, setPhone]             = useState(initial.current.phone);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const current = { handle, bio, email, emailPublic, phone };
  const hasChanges = JSON.stringify(current) !== JSON.stringify(initial.current);

  const onSave = () => {
    console.log('TODO: persist profile', current);
    onClose();
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 100, padding: 16,
      }}
    >
      <div
        style={{
          width: '100%', maxWidth: 560, maxHeight: '90vh',
          background: 'var(--surface)', borderRadius: 16,
          border: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
          <div className="h3" style={{ margin: 0 }}>Редактировать профиль</div>
          <button
            onClick={onClose}
            aria-label="Закрыть"
            style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'transparent', border: 'none',
              cursor: 'pointer', color: 'var(--fg-3)',
              fontSize: 22, lineHeight: 1,
            }}
          >×</button>
        </div>

        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 28, overflowY: 'auto' }}>
          <Section title="Публичная информация" hint="Видна другим в будущих обновлениях">
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 64, height: 64, borderRadius: 18,
                background: CURRENT_USER.avatarGrad,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: 22, color: 'white',
                flexShrink: 0,
              }}>
                {CURRENT_USER.initials}
              </div>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => console.log('TODO: upload avatar')}
              >
                Загрузить фото
              </button>
            </div>

            <Field label="Никнейм" hint="Виден на твоих билетах. Латиница, цифры, подчёркивание.">
              <input
                className="input"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="ip_2024"
                style={{ width: '100%', height: 40, fontSize: 14 }}
              />
            </Field>

            <Field label="О себе">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value.slice(0, BIO_MAX))}
                maxLength={BIO_MAX}
                placeholder="Расскажи о себе…"
                style={{
                  width: '100%', height: 80, padding: '10px 12px',
                  borderRadius: 10, border: '1px solid var(--border)',
                  background: 'var(--surface)', color: 'var(--fg)',
                  fontSize: 14, fontFamily: 'inherit', resize: 'vertical',
                  boxSizing: 'border-box',
                }}
              />
              <div style={{ fontSize: 11, color: 'var(--fg-4)', textAlign: 'right', marginTop: 4 }}>
                {bio.length}/{BIO_MAX}
              </div>
            </Field>
          </Section>

          <Section title="Контакты" hint="Используются для связи при заявках">
            <Field label="Email">
              <input
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', height: 40, fontSize: 14 }}
              />
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, fontSize: 13, color: 'var(--fg-2)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={emailPublic}
                  onChange={(e) => setEmailPublic(e.target.checked)}
                  style={{ width: 16, height: 16, cursor: 'pointer', accentColor: 'var(--violet)' }}
                />
                Показывать email другим участникам
              </label>
            </Field>

            <Field label="Телефон" hint="🔒 Только для тебя. Используется при подаче заявок.">
              <input
                type="tel"
                className="input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (___) ___-__-__"
                style={{ width: '100%', height: 40, fontSize: 14 }}
              />
            </Field>
          </Section>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, padding: '16px 24px', borderTop: '1px solid var(--border)' }}>
          <button className="btn btn-ghost" onClick={onClose}>Отменить</button>
          <button
            className="btn btn-primary"
            onClick={onSave}
            disabled={!hasChanges}
            style={{ opacity: hasChanges ? 1 : 0.5, cursor: hasChanges ? 'pointer' : 'not-allowed' }}
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, hint, children }: { title: string; hint: string; children: React.ReactNode }) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <h4 className="h4" style={{ margin: 0, fontWeight: 700 }}>{title}</h4>
        <div style={{ fontSize: 12, color: 'var(--fg-4)', marginTop: 2 }}>{hint}</div>
      </div>
      {children}
    </section>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--fg-2)' }}>{label}</span>
      {children}
      {hint && <span style={{ fontSize: 11, color: 'var(--fg-4)' }}>{hint}</span>}
    </label>
  );
}
