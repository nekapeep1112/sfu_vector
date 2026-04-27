import { EVENTS, EVENT_TYPES } from '@/lib/mock-data';
import { EventCover, CapacityBar } from '@/components/EventCover';
import { EntryCard } from '@/components/home/EntryCard';
import { WheelPreview, EventsPreview, OrgsPreview } from '@/components/home/Previews';
import { CompactEventCard } from '@/components/home/CompactEventCard';

export default function HomePage() {
  const loggedIn = true;
  return (
    <div style={{ maxWidth: 1440, margin: '0 auto', padding: '32px' }}>

      {/* HERO */}
      <section data-hero-art style={{
        position: 'relative',
        height: 480,
        borderRadius: 20,
        overflow: 'hidden',
        border: '1px solid var(--border)',
        background: 'var(--surface-2)',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 70% 40%, color-mix(in srgb, var(--violet) 35%, transparent) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 20% 80%, color-mix(in srgb, var(--blue) 40%, transparent) 0%, transparent 50%), linear-gradient(180deg, var(--surface-2) 0%, var(--surface) 100%)' }} />
        <svg data-hero-grid width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
          <defs>
            <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0 L0 0 L0 40" fill="none" stroke="color-mix(in srgb, var(--fg) 8%, transparent)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)"/>
        </svg>
        <div style={{ position: 'absolute', top: 60, right: 80, width: 120, height: 120, borderRadius: 30, background: 'var(--grad)', opacity: 0.18, filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: 40, right: 200, width: 180, height: 180, borderRadius: 50, background: 'var(--grad)', opacity: 0.14, filter: 'blur(60px)' }} />

        <div data-hero-veil style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 30%, color-mix(in srgb, var(--surface) 80%, transparent) 100%)' }} />

        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 56, maxWidth: 760 }}>
          <div data-hero-chip className="chip" style={{ alignSelf: 'flex-start', marginBottom: 20, background: 'var(--grad-soft)', borderColor: 'var(--border-strong)', color: 'var(--fg)' }}>
            <span className="chip-dot" style={{ background: 'var(--violet)', boxShadow: '0 0 8px var(--violet)' }}/>
            <span style={{ fontWeight: 600 }}>СФУ.Вектор</span>
            <span style={{ color: 'var(--fg-3)' }}>· твой вектор развития</span>
          </div>
          <h1 data-hero-text-light className="h1" style={{ margin: 0, marginBottom: 20, color: 'var(--fg)' }}>
            Единое пространство<br/>студенческих <span className="text-grad">возможностей</span>
          </h1>
          <p data-hero-text-light-2 style={{ fontSize: 17, color: 'var(--fg-2)', maxWidth: 520, lineHeight: 1.55, margin: 0, marginBottom: 32 }}>
            Открой для себя организации, мероприятия и возможности для развития в&nbsp;Сибирском федеральном университете.
          </p>
          <div className="row gap-3">
            <button className="btn btn-primary" style={{ padding: '14px 22px', fontSize: 15 }}>
              Найти своё сообщество
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </button>
            <button className="btn btn-ghost" style={{ padding: '14px 22px', fontSize: 15 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M5 4 L19 12 L5 20 Z"/></svg>
              Как это работает
            </button>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 24, right: 24, display: 'flex', gap: 6 }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{ width: i === 0 ? 24 : 6, height: 6, borderRadius: 3, background: i === 0 ? 'var(--fg)' : 'var(--border-strong)', transition: 'all .3s' }}/>
          ))}
        </div>
      </section>

      {/* STATS STRIP */}
      <section style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[
          { v: '20', l: 'институтов', icon: '◆' },
          { v: '30', l: 'общежитий', icon: '◐' },
          { v: '50+', l: 'студенческих организаций', icon: '◇' },
          { v: '1000+', l: 'мероприятий в год', icon: '◉' },
        ].map((s, i) => (
          <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 20 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--grad-soft)', border: '1px solid rgba(155,92,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: 'var(--violet)' }}>{s.icon}</div>
            <div className="col">
              <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 4 }}>{s.l}</div>
            </div>
          </div>
        ))}
      </section>

      {/* PERSONALIZED — only logged in */}
      {loggedIn && (
        <section style={{ marginTop: 48 }}>
          <div className="row" style={{ justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <div className="row gap-2">
                <h2 className="h3" style={{ margin: 0 }}>Рекомендуем тебе</h2>
                <span className="chip" style={{ background: 'var(--grad-soft)', borderColor: 'rgba(155,92,255,0.3)', color: 'var(--fg)' }}>персонально</span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--fg-3)', margin: '4px 0 0' }}>На основе твоих интересов: IT, карьера, наука</p>
            </div>
            <a href="#" style={{ fontSize: 13, color: 'var(--violet)', fontWeight: 500 }}>Настроить интересы →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {EVENTS.slice(0, 3).map(e => (
              <div key={e.id} className="card card-hover" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}>
                <EventCover event={e} height={140}/>
                <div style={{ padding: 16 }}>
                  <div className="row" style={{ justifyContent: 'space-between', fontSize: 12, color: 'var(--fg-3)', marginBottom: 8 }}>
                    <span>{e.date.d} {e.date.m} · {e.time}</span>
                    <span style={{ color: 'var(--violet)' }}>92% совпадение</span>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.3, marginBottom: 10 }}>{e.title}</div>
                  <CapacityBar registered={e.registered} capacity={e.capacity} color={EVENT_TYPES[e.type].color}/>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* НАЧНИ ЗДЕСЬ — 3 cards */}
      <section style={{ marginTop: 48 }}>
        <div className="row" style={{ justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <h2 className="h3" style={{ margin: 0 }}>Начни здесь</h2>
            <p style={{ fontSize: 13, color: 'var(--fg-3)', margin: '4px 0 0' }}>Три точки входа в студенческую жизнь</p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          <EntryCard
            num="01"
            title="Найди свой институт"
            desc="Колесо из 20 институтов — кликни и узнай, кто там, чем занимаются и как присоединиться."
            cta="К карте институтов"
            preview={<WheelPreview/>}
          />
          <EntryCard
            num="02"
            title="Открой мероприятия"
            desc="Хакатоны, фестивали, лекции, спорт. Фильтры по типу, формату и интересам."
            cta="Все мероприятия"
            preview={<EventsPreview/>}
          />
          <EntryCard
            num="03"
            title="Вступи в организацию"
            desc="50+ студенческих сообществ. Кто-то ищет именно тебя прямо сейчас."
            cta="Идёт набор · 12"
            ctaAccent
            preview={<OrgsPreview/>}
          />
        </div>
      </section>

      {/* ЧТО ПРОИСХОДИТ СЕЙЧАС */}
      <section style={{ marginTop: 48 }}>
        <div className="row" style={{ justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <h2 className="h3" style={{ margin: 0 }}>Что происходит сейчас</h2>
            <p style={{ fontSize: 13, color: 'var(--fg-3)', margin: '4px 0 0' }}>Ближайшие 14 дней · {EVENTS.length} событий</p>
          </div>
          <div className="row gap-2">
            <button className="btn btn-ghost btn-sm" style={{ width: 36, height: 36, padding: 0, justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button className="btn btn-ghost btn-sm" style={{ width: 36, height: 36, padding: 0, justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
            </button>
            <a href="#" style={{ fontSize: 13, color: 'var(--violet)', fontWeight: 500, marginLeft: 8 }}>Все →</a>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 12, scrollSnapType: 'x mandatory' }}>
          {EVENTS.map(e => (
            <CompactEventCard key={e.id} event={e}/>
          ))}
        </div>
      </section>
    </div>
  );
}
