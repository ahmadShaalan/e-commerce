import { CheckCircle2, LogOut } from 'lucide-react';
import { useAuthStore } from '../../auth/store';
import { logOut } from '../../auth/api/authApi';

export function OverviewPage() {
  const profile = useAuthStore((s) => s.profile);

  const handleSignOut = async () => {
    await logOut();
    // No navigate() call needed — ProtectedRoute auto-redirects to "/" when session becomes null.
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-6 w-6" />
        </div>

        {profile ? (
          <>
            <h1 className="mt-4 text-2xl font-semibold text-zinc-900">
              Welcome back, {profile.full_name}
            </h1>
            <p className="mt-1 text-xs uppercase tracking-wider text-zinc-500">
              Signed in as {profile.role}
            </p>
          </>
        ) : (
          <h1 className="mt-4 text-2xl font-semibold text-zinc-900">
            Loading…
          </h1>
        )}

        <p className="mt-6 text-sm text-zinc-600">
          The real Lumen dashboard is coming in the next few lessons.
        </p>

        <button
          onClick={handleSignOut}
          className="mt-6 inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </div>
  );
}
