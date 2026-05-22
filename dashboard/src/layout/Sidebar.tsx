import { NavLink } from 'react-router-dom';
import {
  Zap,
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  Users,
  Star,
  Settings,
  LogOut,
} from 'lucide-react';
import { useAuthStore } from '../features/auth/store';

const itemClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'flex items-center gap-3 rounded-lg bg-zinc-800 px-3 py-2 font-medium text-white'
    : 'flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-300 hover:bg-zinc-800/60 hover:text-white';

export function Sidebar() {
  const profile = useAuthStore((s) => s.profile);
  const session = useAuthStore((s) => s.session);

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-zinc-900 text-zinc-100">
      {/* Brand */}
      <div className="flex h-16 items-center gap-3 border-b border-zinc-800/60 px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
          <Zap className="h-5 w-5" />
        </div>
        <div>
          <div className="text-base font-semibold">Lumen</div>
          <div className="-mt-0.5 text-[10px] uppercase tracking-wider text-zinc-400">
            Admin
          </div>
        </div>
      </div>
      {/* Nav */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4 text-sm">
        <div className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          Main
        </div>
        <NavLink to="/dashboard" className={itemClass}>
          <LayoutDashboard className="h-4 w-4" /> Overview
        </NavLink>

        <div className="px-2 pb-1 pt-4 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          Catalog
        </div>
        <NavLink to="products" className={itemClass}>
          <Package className="h-4 w-4" /> Products
        </NavLink>
        <NavLink to="/categories" className={itemClass}>
          <FolderTree className="h-4 w-4" /> Categories
        </NavLink>

        <div className="px-2 pb-1 pt-4 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          Sales
        </div>
        <NavLink to="/orders" className={itemClass}>
          <ShoppingBag className="h-4 w-4" /> Orders
          <span className="ml-auto rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-400">
            3
          </span>
        </NavLink>
        <NavLink to="/customers" className={itemClass}>
          <Users className="h-4 w-4" /> Customers
        </NavLink>

        <div className="px-2 pb-1 pt-4 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          Content
        </div>
        <NavLink to="/reviews" className={itemClass}>
          <Star className="h-4 w-4" /> Reviews
          <span className="ml-auto rounded-full bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-amber-400">
            5
          </span>
        </NavLink>

        <div className="px-2 pb-1 pt-4 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          Configure
        </div>
        <NavLink to="/settings" className={itemClass}>
          <Settings className="h-4 w-4" /> Settings
        </NavLink>
      </nav>
      {/* User */}
      <div className="border-t border-zinc-800/60 p-3">
        <button className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-zinc-800/60">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-sm font-semibold text-white">
            {profile?.full_name
              ?.trim()
              .split(' ')
              .map((name) => name[0])
              .slice(0, 2)
              .join('')
              .toUpperCase() || 'U'}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium text-white">
              {profile?.full_name}
            </div>
            <div className="truncate text-xs text-zinc-400">
              {session?.user.email}
            </div>
          </div>
          <LogOut className="h-4 w-4 text-zinc-400" />
        </button>
      </div>
    </aside>
  );
}
