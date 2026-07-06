import { Bell, Search } from 'lucide-react';
import { useMatches } from 'react-router-dom';

interface PageHandle {
  title?: string;
  subtitle?: string;
}

export function Topbar() {
  const matches = useMatches();
  const handle = matches[matches.length - 1]?.handle as PageHandle | undefined;
  const title = handle?.title ?? '';
  const subtitle = handle?.subtitle;

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-zinc-200 bg-white/80 px-8 backdrop-blur">
      {/* Left: page title from the active route's handle */}
      <div>
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-zinc-500">{subtitle}</p>}
      </div>
      {/* Right: action icons */}
      <div className="flex items-center gap-3">
        <button className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900">
          <Search className="h-4 w-4" />
        </button>
        <button className="relative rounded-full p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-emerald-500"></span>
        </button>
      </div>
    </header>
  );
}
