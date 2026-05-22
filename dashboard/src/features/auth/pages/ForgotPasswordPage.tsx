import { Link } from 'react-router-dom';
import { z } from 'zod';
import { Zap, KeyRound, Mail, Send, ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { forgotPassword } from '../api/authApi';
import { zodResolver } from '@hookform/resolvers/zod';

const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'email is required').email(),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordPage() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordValues) => {
    await forgotPassword(data.email);
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
            <KeyRound className="h-5 w-5" />
          </div>
          <h1 className="mt-4 text-xl font-semibold tracking-tight">
            Forgot password?
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Enter your email address and we'll send you a reset link.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div>
              <label
                className="mb-1.5 block text-sm font-medium text-zinc-800"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-10 pr-3 text-sm placeholder-zinc-400 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}{' '}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800"
            >
              Send reset link
              <Send className="h-4 w-4" />
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
