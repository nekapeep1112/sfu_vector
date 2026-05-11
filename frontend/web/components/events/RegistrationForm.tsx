'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { EventItem } from '@/lib/mock-data';

const IcInfo = ({ s = 20 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
);
const IcCheck = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);
const IcArrow = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
);

function RadioCard({ title, desc, selected, onSelect }: { title: string; desc: string; selected: boolean; onSelect: () => void }) {
  return (
    <div
      className="card"
      onClick={onSelect}
      style={{
        padding: 14,
        cursor: 'pointer',
        border: selected ? '2px solid var(--blue)' : '1px solid var(--border)',
        background: selected ? 'color-mix(in oklab, var(--blue) 6%, transparent)' : 'var(--surface)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <span style={{
          width: 18, height: 18, borderRadius: '50%',
          border: selected ? '6px solid var(--blue)' : '2px solid var(--fg-4)',
          background: selected ? 'var(--surface)' : 'transparent',
          flexShrink: 0, marginTop: 2,
          boxSizing: 'border-box',
        }}/>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg)', lineHeight: 1.3 }}>{title}</div>
          <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 4, lineHeight: 1.4 }}>{desc}</div>
        </div>
      </div>
    </div>
  );
}

export function RegistrationForm({ event }: { event: EventItem }) {
  const router = useRouter();
  const [agreed, setAgreed] = useState(true);
  const [selectedTrack, setSelectedTrack] = useState(1);
  const [hasTeam, setHasTeam] = useState(true);

  const tracks = [
    { t: 'Студенческая жизнь',           d: 'Сервисы, которые улучшают повседневную жизнь студентов' },
    { t: 'Учебный процесс и расписание', d: 'Решения для расписания, материалов, нагрузки' },
    { t: 'Кампус и инфраструктура',      d: 'Карта корпусов, ориентация, доступность' },
    { t: 'Открытые данные СФУ',          d: 'Аналитика, визуализация, открытые API' },
  ];

  return (
    <div style={{ minWidth: 0 }}>
      <h2 className="h2" style={{ margin: 0, fontSize: 32, lineHeight: 1.15, letterSpacing: '-0.025em' }}>Заявка на участие</h2>
      <p style={{ fontSize: 14, color: 'var(--fg-3)', margin: '6px 0 0', lineHeight: 1.5 }}>
        У этого мероприятия — отбор. Заполни короткую анкету, организаторы рассмотрят за 1–2 дня.
      </p>

      <div className="card" style={{
        marginTop: 20, padding: 16,
        background: 'color-mix(in oklab, var(--amber) 8%, transparent)',
        border: '1px solid color-mix(in oklab, var(--amber) 30%, transparent)',
        display: 'flex', gap: 12, alignItems: 'flex-start',
      }}>
        <span style={{ color: 'var(--amber)', display: 'inline-flex', flexShrink: 0, marginTop: 1 }}><IcInfo s={20}/></span>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)' }}>Что важно знать</div>
          <div style={{ fontSize: 13, color: 'var(--fg-2)', marginTop: 4, lineHeight: 1.55 }}>
            Регистрация — заявочная. Отправляя анкету, ты <strong>не занимаешь</strong> место — место выделится только после одобрения организатором (Студсовет ИКИТ). Уведомление придёт в e-mail и в приложение.
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 28, marginTop: 24 }}>
        <div>
          <h4 className="h4" style={{ margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--fg)' }}>
            Опыт участия в хакатонах <span style={{ color: 'var(--red)' }}>*</span>
          </h4>
          <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 4 }}>
            Расскажи где участвовал, какие места занимал. Можно списком.
          </div>
          <textarea
            className="input"
            style={{ marginTop: 12, height: 100, padding: 14, resize: 'none', fontFamily: 'inherit', width: '100%', boxSizing: 'border-box' }}
            defaultValue="Участвовала в двух: Сбер.Хакатон 2024 и хакатон ИКИТ прошлой осенью. В обоих наша команда заняла призовые места."
          />
        </div>

        <div style={{ marginTop: 28 }}>
          <h4 className="h4" style={{ margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--fg)' }}>
            Выбери трек <span style={{ color: 'var(--red)' }}>*</span>
          </h4>
          <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 4 }}>Один из 4 на выбор</div>
          <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {tracks.map((tr, i) => (
              <RadioCard
                key={i}
                title={tr.t}
                desc={tr.d}
                selected={i === selectedTrack}
                onSelect={() => setSelectedTrack(i)}
              />
            ))}
          </div>
        </div>

        <div style={{ marginTop: 28 }}>
          <h4 className="h4" style={{ margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--fg)' }}>
            Собрана ли команда? <span style={{ color: 'var(--red)' }}>*</span>
          </h4>
          <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <RadioCard
              title="Да, есть команда"
              desc="Команда от 3 до 5 человек"
              selected={hasTeam}
              onSelect={() => setHasTeam(true)}
            />
            <RadioCard
              title="Нет, ищу команду на месте"
              desc="Соберёмся в первый день"
              selected={!hasTeam}
              onSelect={() => setHasTeam(false)}
            />
          </div>
          <div style={{ marginTop: 16 }}>
            <h4 className="h4" style={{ margin: 0, fontSize: 13, fontWeight: 600, color: 'var(--fg-2)' }}>Состав команды</h4>
            <textarea
              className="input"
              style={{ marginTop: 8, height: 90, padding: 14, resize: 'none', fontFamily: 'inherit', width: '100%', boxSizing: 'border-box' }}
              defaultValue="Я — Анна Кузнецова, ИКИТ 3 курс. + двое из ИКИТ, один из ИМиФИ. Ищем ещё одного дизайнера."
            />
          </div>
        </div>

        <div style={{ marginTop: 28 }}>
          <h4 className="h4" style={{ margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--fg)' }}>
            Ссылка на GitHub или портфолио
          </h4>
          <div style={{ fontSize: 12, color: 'var(--fg-4)', marginTop: 4 }}>
            Необязательно. Если есть — поможет команде понять твой уровень.
          </div>
          <input
            className="input"
            style={{ marginTop: 12, height: 44, width: '100%', boxSizing: 'border-box' }}
            placeholder="https://github.com/…"
            defaultValue="github.com/annak-sfu"
          />
        </div>

        <div
          style={{ marginTop: 24, display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer' }}
          onClick={() => setAgreed(v => !v)}
        >
          <span style={{
            width: 20, height: 20, borderRadius: 6,
            background: agreed ? 'var(--blue)' : 'transparent',
            border: agreed ? 'none' : '2px solid var(--fg-4)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', flexShrink: 0,
            boxSizing: 'border-box',
          }}>{agreed && <IcCheck s={14}/>}</span>
          <div style={{ fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.5 }}>
            Я согласен с правилами участия и обработкой персональных данных в рамках мероприятия. Понимаю, что в случае одобрения должен явиться лично.
          </div>
        </div>

        <div style={{
          marginTop: 28, paddingTop: 24, borderTop: '1px solid var(--border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
        }}>
          <button
            className="btn btn-ghost"
            onClick={() => router.push(`/dashboard/events/${event.id}`)}
          >← Отменить и вернуться</button>
          <button
            className="btn btn-primary"
            onClick={() => router.push(`/dashboard/events/${event.id}/register/success`)}
            style={{ height: 48, padding: '0 24px', fontSize: 15, fontWeight: 700 }}
          >
            Отправить заявку <IcArrow s={14}/>
          </button>
        </div>
      </div>
    </div>
  );
}
