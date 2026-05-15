import { Link } from 'react-router-dom';
import {
  Zap,
  Mail,
  Lock,
  Eye,
  ArrowRight,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Star,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginWithEmail } from '../api/authApi';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
  // .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  // .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  // .regex(/[0-9]/, 'Password must contain at least one number')
  // .regex(
  //   /[^A-Za-z0-9]/,
  //   'Password must contain at least one special character',
  // ),
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginValues) => {
    await loginWithEmail(data.email, data.password);
  };

  return (
    <div className="grid min-h-screen grid-cols-1 bg-zinc-50 font-sans lg:grid-cols-2">
      {/* Left: form */}
      <div className="flex items-center justify-center px-6 py-12">
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

          {/* Heading */}
          <h1 className="mt-10 text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Sign in to manage your store.
          </p>

          {/* Form */}
          <form
            noValidate
            className="mt-8 space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
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
              )}
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  className="text-sm font-medium text-zinc-800"
                  htmlFor="password"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-emerald-600 hover:text-emerald-700"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  id="password"
                  type="password"
                  {...register('password')}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-10 pr-10 text-sm placeholder-zinc-400 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                  <Eye className="h-4 cursor-pointer w-4" />
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <label className="flex items-center gap-2 text-sm text-zinc-700">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
              />
              Keep me signed in for 30 days
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 cursor-pointer inline-flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800"
            >
              Sign in
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-10 text-center text-xs text-zinc-500">
            Trouble signing in?{' '}
            <a href="#" className="font-medium text-zinc-700 hover:underline">
              support@lumen.shop
            </a>
          </p>
        </div>
      </div>

      {/* Right: decorative panel */}
      <div className="relative hidden overflow-hidden bg-zinc-900 lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/30 via-zinc-900 to-zinc-950" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative flex h-full items-center justify-center p-12">
          <div className="w-full max-w-md space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-zinc-400">Today's revenue</div>
                  <div className="mt-1 text-3xl font-semibold text-white">
                    $12,840
                  </div>
                  <div className="mt-1 inline-flex items-center gap-1 text-xs text-emerald-400">
                    <TrendingUp className="h-3 w-3" />
                    +18.2% vs yesterday
                  </div>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                  <DollarSign className="h-4 w-4" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">
                    New order #ORD-2026-1047
                  </div>
                  <div className="text-xs text-zinc-400">
                    Sara Khalid · 2 items · $419.99
                  </div>
                </div>
                <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-medium text-amber-300">
                  Pending
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">
                    5-star review on Pixel-9 Phone
                  </div>
                  <div className="text-xs text-zinc-400">
                    "Battery is excellent, super fast charging."
                  </div>
                </div>
              </div>
            </div>

            <p className="pt-4 text-center text-xs text-zinc-500">
              Live data shown above for illustration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
