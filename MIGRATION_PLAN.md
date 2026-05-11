# План миграции: maket → web

## Структура папок (как должно быть после)

```
frontend/web/
├── app/
│   ├── layout.tsx                              ← есть, не трогаем
│   ├── page.tsx                                ← landing, есть
│   ├── login/page.tsx                          ← есть
│   ├── register/page.tsx                       ← есть
│   ├── onboarding/page.tsx                     ← есть
│   │
│   ├── dashboard/                              ← personal-режим студента
│   │   ├── layout.tsx                          ← есть, обновим (ContextSwitcher)
│   │   ├── page.tsx                            ← Home, есть
│   │   ├── orgs/page.tsx                       ← Карта институтов, есть
│   │   ├── events/
│   │   │   ├── page.tsx                        ← Афиша, есть
│   │   │   └── [id]/                           ← НОВОЕ
│   │   │       ├── page.tsx                    ← Детальная карточка
│   │   │       ├── register/
│   │   │       │   ├── page.tsx                ← Анкета регистрации
│   │   │       │   └── success/page.tsx        ← Успех ожидания
│   │   │       └── ticket/page.tsx             ← Мой билет (QR)
│   │   └── profile/page.tsx                    ← Профиль, есть
│   │
│   └── org/                                    ← НОВОЕ, org-режим
│       └── [slug]/
│           ├── layout.tsx                      ← Sidebar в org-режиме
│           ├── page.tsx                        ← Дашборд организации
│           ├── events/
│           │   ├── page.tsx                    ← Список событий организации
│           │   └── new/page.tsx                ← Визард создания (4 шага)
│           └── applications/page.tsx           ← Заявки
│
├── components/
│   ├── Sidebar.tsx                             ← ОБНОВИТЬ: + ContextSwitcher
│   ├── Topbar.tsx                              ← не трогаем
│   ├── Footer.tsx                              ← не трогаем
│   ├── Logo.tsx                                ← не трогаем
│   ├── EventCover.tsx                          ← не трогаем (расширить если нужно)
│   ├── NotificationsBell.tsx                   ← не трогаем
│   ├── Wheel.tsx                               ← не трогаем
│   ├── DormsMap.tsx                            ← не трогаем
│   │
│   ├── events/
│   │   ├── EventRow.tsx                        ← есть
│   │   ├── FiltersPanel.tsx                    ← есть
│   │   ├── EventDetailHero.tsx                 ← НОВОЕ
│   │   ├── RegistrationCard.tsx                ← НОВОЕ (sticky-карточка справа)
│   │   ├── EventProgramTimeline.tsx            ← НОВОЕ
│   │   ├── EventLocationBlock.tsx              ← НОВОЕ
│   │   ├── OrganizerCard.tsx                   ← НОВОЕ
│   │   ├── WhoIsGoing.tsx                      ← НОВОЕ
│   │   ├── SimilarEvents.tsx                   ← НОВОЕ
│   │   ├── UploadedCover.tsx                   ← НОВОЕ (мок загруженной обложки)
│   │   └── QrPattern.tsx                       ← НОВОЕ (псевдо-QR через SVG)
│   │
│   ├── home/                                   ← есть
│   │
│   ├── org/
│   │   ├── ContextSwitcher.tsx                 ← НОВОЕ (переключатель в Sidebar)
│   │   ├── OrgHeader.tsx                       ← НОВОЕ (шапка дашборда)
│   │   ├── AlertCard.tsx                       ← НОВОЕ (карточки "Требует внимания")
│   │   ├── MetricTile.tsx                      ← НОВОЕ (KPI плитки)
│   │   ├── EventsTable.tsx                     ← НОВОЕ (таблица событий орги)
│   │   ├── TeamCard.tsx                        ← НОВОЕ
│   │   ├── ActivityCard.tsx                    ← НОВОЕ (лента активности)
│   │   ├── Stepper.tsx                         ← НОВОЕ (визард-степпер)
│   │   ├── CoverChoice.tsx                     ← НОВОЕ (выбор обложки шаг 1)
│   │   ├── CapacitySlider.tsx                  ← НОВОЕ (слайдер вместимости)
│   │   ├── ApplicationsList.tsx                ← НОВОЕ
│   │   ├── ApplicationDetail.tsx               ← НОВОЕ (правая панель)
│   │   ├── BulkActionsBar.tsx                  ← НОВОЕ
│   │   └── FiltersBar.tsx                      ← НОВОЕ (для заявок)
│   │
│   ├── profile/Lists.tsx                       ← есть
│   └── landing/                                ← есть
│
└── lib/
    └── mock-data.ts                            ← РАСШИРИТЬ: + Organization, Application, CURRENT_USER, ROLES
```

## Расширение mock-data.ts

Добавить к существующим INSTITUTES, EVENT_TYPES, EVENTS:

```ts
// Организации
export interface Organization {
  id: string;
  name: string;
  short: string;            // 2-3 буквы для аватара
  color: string;            // hex для градиента
  verified: boolean;
  role: 'owner' | 'editor' | 'viewer';  // роль текущего пользователя в этой организации
  members: number;
}

export const ORGANIZATIONS: Organization[] = [
  { id: 'studsovet-ikit', name: 'Студсовет ИКИТ',          short: 'СС', color: '#4F7FFF', verified: true, role: 'owner',  members: 12 },
  { id: 'volunteer-sfu',  name: 'Волонтёрский центр СФУ',  short: 'ВЦ', color: '#3DD68C', verified: true, role: 'editor', members: 47 },
  { id: 'media-center',   name: 'Студенческий медиацентр', short: 'МД', color: '#9B5CFF', verified: true, role: 'editor', members: 24 },
];

// Текущий пользователь (Иван Петров) — всегда залогинен
export const CURRENT_USER = {
  name: 'Иван Петров',
  initials: 'ИП',
  email: 'petrov.iv@sfu-kras.ru',
  institute: 'ИКИТ',
  course: 3,
  avatarGrad: 'linear-gradient(135deg, #F5A524, #F25E5E)',
  memberships: ['studsovet-ikit', 'volunteer-sfu', 'media-center'],
};

// Заявки на участие в событиях (для OrgApplications)
export interface Application {
  id: number;
  name: string;
  handle: string;
  meta: string;
  grad: [string, string];
  event: string;
  eventType: keyof typeof EVENT_TYPES;
  when: string;
  status: 'pending' | 'auto' | 'rejected' | 'approved';
}

export const APPLICATIONS: Application[] = [...]
// 10 заявок — см. frontend/maket/screens/OrgApplications.jsx, константа APPLICATIONS

// События организации (для OrgDashboard + список событий орги)
export interface OrgEvent {
  id: number;
  date: { d: number; m: string };
  title: string;
  loc: string;
  time: string;
  type: keyof typeof EVENT_TYPES;
  reg: number;
  cap: number;
  status: 'published' | 'draft' | 'pending' | 'done';
}

export const ORG_EVENTS: OrgEvent[] = [...]
// 5 событий — см. frontend/maket/screens/OrgDashboard.jsx, константа ORG_EVENTS

// Команда организации (для OrgDashboard.TeamCard)
export const TEAM = [...]
// см. frontend/maket/screens/OrgDashboard.jsx
```

## Фазы миграции

Идём фазами. Каждая фаза заканчивается **проверкой**: `npm run dev`, открываешь, кликаешь, ничего не падает.

---

### Фаза 0 — фундамент (без UI-изменений)

1. Прочитай `INSTRUCTIONS.md` целиком.
2. Сверь `frontend/maket/styles/tokens.css` с `frontend/web/app/globals.css`. Они должны быть идентичны по переменным. Если есть расхождения — скажи мне до того как двинешься дальше.
3. Расширь `frontend/web/lib/mock-data.ts` всеми новыми сущностями выше: Organization + ORGANIZATIONS, CURRENT_USER, Application + APPLICATIONS, OrgEvent + ORG_EVENTS, TEAM. Данные — буквально копируй из соответствующих `frontend/maket/...` файлов. Не выдумывай свои.
4. **Проверка:** `npm run dev`, существующие страницы (/, /dashboard, /dashboard/events) должны работать как раньше.

---

### Фаза 1 — Детальная карточка мероприятия (EventDetail)

Источник: `frontend/maket/screens/EventDetail.jsx`

1. Создай `frontend/web/components/events/EventDetailHero.tsx` — компонент `EventDetailHero` из maket.
2. Создай `frontend/web/components/events/RegistrationCard.tsx` — компонент `RegistrationCard`. Кнопка «Участвовать» → `useRouter().push('/dashboard/events/' + event.id + '/register')`.
3. Создай `frontend/web/components/events/EventProgramTimeline.tsx`.
4. Создай `frontend/web/components/events/OrganizerCard.tsx`.
5. Создай `frontend/web/components/events/WhoIsGoing.tsx`.
6. Создай `frontend/web/components/events/EventLocationBlock.tsx`.
7. Создай `frontend/web/components/events/SimilarEvents.tsx`. Карточки внутри ведут на `/dashboard/events/{e.id}` — `<Link>`.
8. Создай `frontend/web/app/dashboard/events/[id]/page.tsx`. Принимает `params.id`, находит событие в `EVENTS` по id (если не найдено — `notFound()` из `next/navigation`).
9. В `frontend/web/components/events/EventRow.tsx` оберни всю карточку (или хотя бы кнопку «Участвовать») в `<Link href={'/dashboard/events/' + event.id}>`.

**Кнопки → куда ведут:**

| Кнопка | Куда |
|---|---|
| ← Мероприятия | `<Link href="/dashboard/events">` |
| Хлебная цепочка названия | без действия (текст) |
| ☆ В избранное (BreadcrumbActions) | `// TODO: добавить в избранное` |
| ↗ Поделиться (BreadcrumbActions) | `// TODO: nav share API` |
| ☆ / ↗ в Hero (дубль) | `// TODO: при подключении стейта/контекста синхронизировать с BreadcrumbActions — сейчас оба места логируют независимо` |
| Участвовать (правая sticky) | `router.push('/dashboard/events/' + id + '/register')` |
| Скачать .ics | `// TODO: генерация ics` |
| Карточки «Организаторы» | `// TODO: ссылка на /org/[slug]` (в фазе 4 свяжем) |
| Все участники → | `// TODO` |
| Открыть в Яндекс.Картах | `// TODO: внешняя ссылка` |
| Похожие мероприятия | `<Link href="/dashboard/events/{id}">` |
| Sticky bottom CTA | `router.push('/dashboard/events/' + id + '/register')` |

**Проверка:** клик по EventRow с афиши → детальная страница. Клик «Участвовать» → /register (страница ещё не существует — Next покажет 404, это ОК пока).

---

### Фаза 2 — Регистрация + Билет (EventRegister, 3 страницы)

Источник: `frontend/maket/screens/EventRegister.jsx`

В дизайне это один компонент `EventRegisterScreen` с пропом `state` (form/success/ticket). В Next каждое состояние = отдельная страница.

1. Создай `frontend/web/components/events/QrPattern.tsx` — компонент `QrPattern` из maket.
2. Создай `frontend/web/app/dashboard/events/[id]/register/page.tsx` (state=form).
   - Извлекай `event` по id из `params`.
   - Кнопка «Отправить заявку» → `router.push('/dashboard/events/' + id + '/register/success')`.
   - Кнопка «Отменить и вернуться» → `router.back()` или `router.push('/dashboard/events/' + id)`.
3. Создай `frontend/web/app/dashboard/events/[id]/register/success/page.tsx` (state=success).
   - Кнопка «К афише» → `<Link href="/dashboard/events">`.
   - Кнопка «Посмотреть статус в профиле» → `<Link href="/dashboard/profile">` (там вкладка «Мои заявки»).
4. Создай `frontend/web/app/dashboard/events/[id]/ticket/page.tsx` (state=ticket).
   - Кнопка «Отменить регистрацию» → `// TODO`.
   - Кнопки «Скачать PDF / В календарь / Поделиться» → `// TODO` с консоль-лог.
   - Линк «Открыть карточку события» → `<Link href="/dashboard/events/' + id + '"`.

**Замечание:** имя `Иван Петров` в TicketView сейчас захардкожено — замени на `CURRENT_USER.name` из mock-data.

**Проверка:** на детальной странице нажми «Участвовать» → попадаешь на анкету. Отправь заявку → success. Из меню профиля «Мои мероприятия» — ссылки на /ticket (пока вручную через адрес можно зайти).

---

### Фаза 3 — Sidebar ContextSwitcher

Источник: `frontend/maket/components/Sidebar.jsx` (целиком переработанный, ~330 строк).

Это **самая тонкая фаза**, потому что Sidebar используется на ВСЕХ существующих страницах и менять его страшно.

1. Создай `frontend/web/components/org/ContextSwitcher.tsx` — компонент `ContextSwitcher` из maket. Используй `useRouter` для переходов:
   - При выборе «Личный» → `router.push('/dashboard')`.
   - При выборе организации → `router.push('/org/' + org.id)`.
2. Обнови `frontend/web/components/Sidebar.tsx`:
   - Добавь пропы `context` (default `{type:'personal'}`) и `emptyMemberships`.
   - Внутри: если `context.type==='org'` — навигация переключается на org-набор (Дашборд / Мероприятия / Заявки / Команда / Аналитика / Настройки), и снизу появляется кнопка «Вернуться в личный профиль» → `router.push('/dashboard')`.
   - Сверху сайдбара (вместо текущего блока с логотипом) — `<ContextSwitcher context={context} />`.
   - Существующее использование (`active`, `loggedIn`, `compact`) ОСТАЁТСЯ совместимым — все текущие dashboard-страницы продолжают работать.
3. Активный пункт определяется через `usePathname()`:
   - personal-mode: `/dashboard` → home; `/dashboard/orgs` → orgs; `/dashboard/events*` → events; `/dashboard/profile*` → profile.
   - org-mode: `/org/[slug]` → dashboard; `/org/[slug]/events*` → events; `/org/[slug]/applications` → inbox; и так далее.

**Проверка:** все существующие страницы по-прежнему открываются. На любой dashboard-странице видишь свитчер сверху сайдбара, можно открыть, видишь свой список организаций. Клик по организации → переход на `/org/studsovet-ikit` (страница ещё не существует — 404 пока ок).

---

### Фаза 4 — Org-режим: layout + 4 страницы

Источники в maket: `OrgDashboard.jsx`, `EventCreate.jsx`, `OrgApplications.jsx`.

1. Создай `frontend/web/app/org/[slug]/layout.tsx`:
```tsx
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { Footer } from '@/components/Footer';
import { ORGANIZATIONS } from '@/lib/mock-data';
import { notFound } from 'next/navigation';

export default async function OrgLayout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const org = ORGANIZATIONS.find(o => o.id === slug);
  if (!org) notFound();
  // ... тот же каркас что в app/dashboard/layout.tsx, но Sidebar context={{type:'org', orgId: slug}}
}
```

2. Создай `frontend/web/app/org/[slug]/page.tsx` — дашборд (источник: maket/OrgDashboard.jsx).
   - Разбей по компонентам: `OrgHeader`, `AlertCard`, `MetricTile`, `EventsTable`, `TeamCard`, `ActivityCard` → каждый в `components/org/`.
   - Кнопка «+ Создать мероприятие» → `router.push('/org/' + slug + '/events/new')`.
   - В таблице событий клик по строке → `// TODO: страница управления событием` (не делаем сейчас).
   - «Полная аналитика →» → `// TODO`.
   - «Все мероприятия →» → `router.push('/org/' + slug + '/events')` (страница списка событий орги, не делаем сейчас, просто ссылка).

3. Создай `frontend/web/app/org/[slug]/events/new/page.tsx` — визард создания (источник: maket/EventCreate.jsx).
   - В отличие от дизайна с 4 артбордами, здесь один `useState` для шага (1-4).
   - Все вспомогательные компоненты (Stepper, CoverChoice, ... разнообразные FieldBlock, RadioCard, и т.д.) — в `components/org/` или `components/events/` по смыслу.
   - Кнопка «Опубликовать» → `router.push('/org/' + slug)` с `// TODO: реально опубликовать`.
   - Кнопка «← Вернуться на дашборд» → `<Link href={'/org/' + slug}>`.
   - Загрузка картинки: пока без реального upload — компонент `CoverChoice` показывает оба варианта, переключение через локальный стейт (uploaded/generated).

4. Создай `frontend/web/app/org/[slug]/applications/page.tsx` — заявки (источник: maket/OrgApplications.jsx).
   - Используй `useState` для текущего таба (Требуют решения / Одобренные / Отклонённые / Все) и для выбранной заявки (отображается в правой панели).
   - Используй `useState` для bulk-режима (галочка «выбрать все» / выделение строк).
   - Кнопка «Одобрить» в правой панели → `// TODO: реальное действие`.
   - При выборе строки слева — обновляется правая панель (ApplicationDetail) с данными этой заявки.

**Проверка:** через ContextSwitcher выбери «Студсовет ИКИТ» → попадаешь на дашборд орги. Клик «+ Создать мероприятие» → визард, листай шаги, опубликуй. Из сайдбара открой «Заявки» — список + детали, переключи на bulk-режим.

---

### Фаза 5 — соединение всех экранов

После фазы 4 у нас есть все страницы, но ссылки в коде помечены как `// TODO`. Пройти по всем `// TODO` и заменить на реальные навигации где возможно:

- «Открыть карточку события» в любом контексте → `/dashboard/events/[id]`.
- «Открыть профиль» (организации) → `/org/[slug]` если орга, или специальная публичная страница (не делаем).
- Кнопки настройки уведомлений — оставить TODO, отдельная фича.
- В Profile → «Мои мероприятия» — карточки ведут на `/dashboard/events/[id]/ticket` если статус «зарегистрирован», или на `/dashboard/events/[id]` иначе.
- «Подать заявку» из заголовка профиля → можно повести в onboarding или на лендинг (на этапе MVP — TODO).

---

### Фаза 6 — финальный smoke-test

Запусти `npm run dev` и пройди руками **базовые сценарии**:

1. Студент: Лендинг → Войти → Главная → Афиша → клик по карточке → детальная → Участвовать → анкета → отправить → success → «В профиле» → профиль с «Мои заявки».
2. Студент: на детальной странице открой `/dashboard/events/1/ticket` напрямую (как будто заявку уже одобрили).
3. Переключение контекста: открой свитчер → «Студсовет ИКИТ» → дашборд орги.
4. Организатор: дашборд → «+ Создать мероприятие» → пройди 4 шага → «Опубликовать» → вернёшься на дашборд.
5. Организатор: сайдбар → Заявки → выбери разные заявки → bulk-режим.

Если что-то не работает или выглядит криво — сообщи.

---

## Технические детали Next 16

- `params` в page и layout теперь **асинхронные**: `async function Page({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; }`. Не забывай await.
- `useRouter`, `usePathname` — из `'next/navigation'`, не `'next/router'`.
- `Link` — из `'next/link'`.
- Серверные компоненты могут быть async. Клиентские с `'use client'` — не могут.
- `notFound()` — из `'next/navigation'` для 404.

## Что точно НЕ делать (повторение для надёжности)

1. **Не добавлять Tailwind / shadcn / MUI / любые UI-киты.**
2. **Не добавлять иконочные библиотеки** — все иконки уже есть как inline-SVG в maket. Если в новом коде нужна иконка которой нет — копируй из ближайшего maket-файла (Ic / Sb / Db / Ap / Cw / Rg).
3. **Не менять CSS-переменные** в globals.css.
4. **Не переписывать landing.**
5. **Не делать рефакторинг существующих компонентов** «по дороге» (Sidebar — единственное исключение, и только по плану).
6. **Не использовать `Math.random()`** в SSR-компонентах — это сломает hydration. Используй детерминированные функции или `'use client'`.
7. **Не оставлять console.error / console.warn** в финальном коде — только console.log для TODO заглушек.
