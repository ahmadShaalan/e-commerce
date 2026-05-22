import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Zap, Lock, Save, ArrowLeft } from 'lucide-react';
import { resetPassword } from '../api/authApi';

const resetSchema = z
  .object({
    password: z.string().min(8, 'At least 8 characters'),
    confirm: z.string().min(8, 'At least 8 characters'),
  })
  .refine((v) => v.password === v.confirm, {
    message: 'Passwords do not match',
    path: ['confirm'],
  });

type ResetValues = z.infer<typeof resetSchema>;

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<ResetValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: '', confirm: '' },
  });

  const onSubmit = async (values: ResetValues) => {
    setSubmitError(null);
    const { error } = await resetPassword(values.password);
    if (error) {
      setSubmitError(error.message);
      return;
    }
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 py-12 font-sans">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <div className="font-semibold">Lumen</div>
            <div className="-mt-0.5 text-[10px] uppercase tracking-wider text-zinc-500">
              Admin dashboard
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Lock className="h-5 w-5" />
          </div>
          <h1 className="mt-4 text-xl font-semibold tracking-tight">
            Set a new password
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Choose at least 8 characters. You'll be signed in automatically.
          </p>

          {submitError && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {submitError}
            </div>
          )}

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 space-y-4"
            noValidate
          >
            <div>
              <label
                className="mb-1.5 block text-sm font-medium text-zinc-800"
                htmlFor="password"
              >
                New password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  {...form.register('password')}
                  aria-invalid={!!form.formState.errors.password}
                  className="w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-10 pr-3 text-sm placeholder-zinc-400 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 aria-[invalid=true]:border-red-500"
                />
              </div>
              {form.formState.errors.password && (
                <p className="mt-1 text-xs text-red-600">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                className="mb-1.5 block text-sm font-medium text-zinc-800"
                htmlFor="confirm"
              >
                Confirm password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  id="confirm"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  {...form.register('confirm')}
                  aria-invalid={!!form.formState.errors.confirm}
                  className="w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-10 pr-3 text-sm placeholder-zinc-400 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 aria-[invalid=true]:border-red-500"
                />
              </div>
              {form.formState.errors.confirm && (
                <p className="mt-1 text-xs text-red-600">
                  {form.formState.errors.confirm.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {form.formState.isSubmitting ? (
                'Saving…'
              ) : (
                <>
                  Save new password
                  <Save className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Back link */}
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 hover:text-zinc-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
