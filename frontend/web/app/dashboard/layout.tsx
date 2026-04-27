import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { Footer } from '@/components/Footer';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const loggedIn = true;
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', alignSelf: 'flex-start', display: 'flex' }}>
          <Sidebar loggedIn={loggedIn} />
        </div>
        <main style={{ flex: 1, minWidth: 0 }}>
          <Topbar loggedIn={loggedIn} />
          {children}
          <Footer/>
        </main>
      </div>
    </div>
  );
}
