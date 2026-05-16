'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LogoMark } from './Logo';
import { ContextSwitcher, type SidebarContext } from './org/ContextSwitcher';
import { useTheme } from './theme/ThemeProvider';

type PersonalItemId = 'home' | 'orgs' | 'events' | 'profile';
type OrgItemId = 'dashboard' | 'events' | 'inbox' | 'team' | 'analytics' | 'settings';
type ItemId = PersonalItemId | OrgItemId;

interface SidebarProps {
  loggedIn?: boolean;
  compact?: boolean;
  context?: SidebarContext;
}

interface NavItem {
  id: ItemId;
  label: string;
  icon: React.FC;
  badge?: number | null;
}

const PERSONAL_ROUTES: Record<PersonalItemId, string> = {
  home: '/dashboard',
  orgs: '/dashboard/orgs',
  events: '/dashboard/events',
  profile: '/dashboard/profile',
};

function orgRoutes(id: number): Record<OrgItemId, string> {
  return {
    dashboard: `/organizations/${id}`,
    events: `/organizations/${id}/events`,
    inbox: `/organizations/${id}/applications`,
    team: `/organizations/${id}/team`,
    analytics: `/organizations/${id}/analytics`,
    settings: `/organizations/${id}/settings`,
  };
}

function activeFromPath(pathname: string, context: SidebarContext): ItemId {
  if (context.type === 'org') {
    if (pathname.includes('/applications')) return 'inbox';
    if (pathname.includes('/events')) return 'events';
    if (pathname.includes('/team')) return 'team';
    if (pathname.includes('/analytics')) return 'analytics';
    if (pathname.includes('/settings')) return 'settings';
    return 'dashboard';
  }
  if (pathname.startsWith('/dashboard/orgs')) return 'orgs';
  if (pathname.startsWith('/dashboard/events')) return 'events';
  if (pathname.startsWith('/dashboard/profile')) return 'profile';
  return 'home';
}

function getNavItems(context: SidebarContext, loggedIn: boolean): NavItem[] {
  if (context.type === 'org') {
    return [
      { id: 'dashboard', label: 'Дашборд',     icon: IconOrgDashboard },
      { id: 'events',    label: 'Мероприятия', icon: IconEvents, badge: 4 },
      { id: 'inbox',     label: 'Заявки',      icon: IconInbox,  badge: 7 },
      { id: 'team',      label: 'Команда',     icon: IconTeam },
      { id: 'analytics', label: 'Аналитика',   icon: IconAnalytics },
      { id: 'settings',  label: 'Настройки',   icon: IconSettings },
    ];
  }
  return [
    { id: 'home',    label: 'Главная',     icon: IconHome },
    { id: 'orgs',    label: 'Организации', icon: IconOrgs },
    { id: 'events',  label: 'Мероприятия', icon: IconEvents },
    { id: 'profile', label: 'Профиль',     icon: IconProfile, badge: 3 },
  ];
}

export function Sidebar({ loggedIn = false, compact = false, context = { type: 'personal' } }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname() || '/';
  const active = activeFromPath(pathname, context);
  const isOrg = context.type === 'org';
  const items = getNavItems(context, loggedIn);
  const badgeColor = isOrg ? 'var(--violet)' : 'var(--blue)';

  return (
    <aside style={{
      width: compact ? 80 : 240,
      background: 'var(--bg-2)',
      borderRight: '1px solid var(--border)',
      padding: compact ? '20px 12px' : '16px 14px 20px',
      display: 'flex', flexDirection: 'column', gap: 10,
      flexShrink: 0,
      height: '100vh',
    }}>
      {compact ? (
        <Link href="/" aria-label="На главную" style={{ display: 'flex', justifyContent: 'center', paddingBottom: 8, borderBottom: '1px solid var(--border)', marginBottom: 4, textDecoration: 'none' }}>
          <LogoMark px={36}/>
        </Link>
      ) : (
        <>
          <Link href="/" aria-label="На главную" style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '4px 4px 12px', textDecoration: 'none', color: 'inherit' }}>
            <LogoMark px={32}/>
            <div style={{ fontWeight: 800, fontSize: 17, letterSpacing: '-0.01em', color: 'var(--fg)', lineHeight: 1 }}>
              СФУ<span style={{
                background: 'linear-gradient(135deg, #4F7FFF 0%, #9B5CFF 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}>.Вектор</span>
            </div>
          </Link>
          <ContextSwitcher context={context}/>
        </>
      )}

      <nav className="col gap-1" style={{ marginTop: 6 }}>
        {items.map(it => {
          const Icon = it.icon;
          const isActive = active === it.id;
          return (
            <SidebarItem
              key={it.id}
              isActive={isActive}
              compact={compact}
              label={it.label}
              badge={it.badge}
              badgeColor={badgeColor}
              icon={<Icon />}
              onClick={() => {
                const route = context.type === 'org'
                  ? orgRoutes(context.orgId)[it.id as OrgItemId]
                  : PERSONAL_ROUTES[it.id as PersonalItemId];
                router.push(route);
              }}
            />
          );
        })}
      </nav>

      <div style={{ flex: 1 }} />

      <ThemeToggle compact={compact} />

      {!compact && isOrg && (
        <button
          onClick={() => router.push('/dashboard')}
          style={{
            width: '100%', padding: '12px 14px',
            borderRadius: 12, background: 'var(--surface)',
            border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', gap: 10,
            color: 'var(--fg-2)', fontSize: 12, fontWeight: 600,
            cursor: 'pointer', textAlign: 'left',
            transition: 'all .15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.background = 'var(--bg-2)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface)'; }}
        >
          <span style={{ color: 'var(--fg-4)', display: 'inline-flex' }}><IconBack/></span>
          <span style={{ flex: 1 }}>Вернуться в личный профиль</span>
        </button>
      )}

      {!compact && !isOrg && !loggedIn && (
        <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>
          Войти в профиль
        </button>
      )}
    </aside>
  );
}

function SidebarItem({
  isActive, compact, label, badge, badgeColor, icon, onClick,
}: {
  isActive: boolean;
  compact: boolean;
  label: string;
  badge?: number | null;
  badgeColor: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  const [hover, setHover] = useState(false);
  const baseColor = isActive ? 'var(--fg)' : (hover ? 'var(--fg)' : 'var(--fg-3)');
  const baseBg = isActive ? 'var(--grad-soft)' : (hover ? 'var(--bg-2)' : 'transparent');
  return (
    <button
      onClick={onClick}
      title={compact ? label : ''}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: compact ? '12px' : '11px 14px',
        borderRadius: 10,
        background: baseBg,
        border: '1px solid ' + (isActive ? 'rgba(155,92,255,0.3)' : 'transparent'),
        color: baseColor,
        fontSize: 14, fontWeight: 500,
        justifyContent: compact ? 'center' : 'flex-start',
        position: 'relative',
        transition: 'all .15s',
      }}
    >
      {icon}
      {!compact && <span style={{ flex: 1, textAlign: 'left' }}>{label}</span>}
      {!compact && badge ? (
        <span style={{ minWidth: 20, height: 20, borderRadius: 10, background: badgeColor, color: 'white', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 6px' }}>{badge}</span>
      ) : null}
    </button>
  );
}

function ThemeToggle({ compact }: { compact: boolean }) {
  const { theme, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && theme === 'dark';
  const [hover, setHover] = useState(false);
  const label = isDark ? 'Светлая тема' : 'Тёмная тема';
  return (
    <button
      onClick={toggle}
      title={label}
      aria-label={label}
      aria-pressed={isDark}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: '100%',
        padding: compact ? '12px' : '11px 14px',
        borderRadius: 10,
        background: hover ? 'var(--bg-2)' : 'transparent',
        border: '1px solid transparent',
        color: 'var(--fg-3)',
        display: 'flex', alignItems: 'center', gap: 12,
        justifyContent: compact ? 'center' : 'flex-start',
        fontSize: 14, fontWeight: 500, cursor: 'pointer',
        transition: 'all .15s',
      }}
    >
      {isDark ? <IconSun/> : <IconMoon/>}
      {!compact && <span style={{ flex: 1, textAlign: 'left' }}>{label}</span>}
    </button>
  );
}

function IconSun() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>;
}
function IconMoon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
}

function IconHome() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12 12 3l9 9M5 10v10h14V10"/></svg>;
}
function IconOrgs() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="10" r="2.2"/><path d="M3 19c.5-3 3-5 6-5s5.5 2 6 5M14 19c.3-2 2-3.5 3.5-3.5"/></svg>;
}
function IconEvents() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>;
}
function IconProfile() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4.5 4.5-7 8-7s7 2.5 8 7"/></svg>;
}
function IconOrgDashboard() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="13" width="4" height="8" rx="1"/><rect x="10" y="8" width="4" height="13" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></svg>;
}
function IconInbox() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>;
}
function IconTeam() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
}
function IconAnalytics() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 6-6"/></svg>;
}
function IconSettings() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
}
function IconBack() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;
}
