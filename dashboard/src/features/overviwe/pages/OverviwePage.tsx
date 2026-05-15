import { CheckCircle2 } from 'lucide-react';

export function OverviewPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h1 className="mt-4 text-2xl font-semibold text-zinc-900">
          You're signed in
        </h1>
        <p className="mt-2 text-sm text-zinc-600">
          The real Lumen dashboard is coming in the next few lessons.
        </p>
      </div>
    </div>
  );
}
