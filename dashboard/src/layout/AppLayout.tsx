import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <Sidebar />

      <div className="ml-64 flex min-h-screen flex-col">
        <Topbar />

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
