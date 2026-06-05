import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Star,
} from 'lucide-react';

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="grid min-h-screen grid-cols-1 bg-zinc-50 font-sans text-zinc-900 lg:grid-cols-2">
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
          <form className="mt-8 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-zinc-800"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="admin@lumen.shop"
                  className="w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-10 pr-3 text-sm placeholder-zinc-400 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-zinc-800"
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
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-10 pr-10 text-sm placeholder-zinc-400 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
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
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800"
            >
              Sign in
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-10 text-center text-xs text-zinc-500">
            Trouble signing in? Contact{' '}
            <a href="#" className="font-medium text-zinc-700 hover:underline">
              support@lumen.shop
            </a>
          </p>
        </div>
      </div>

      {/* Right: visual */}
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
            {/* KPI card */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-zinc-400">Today's revenue</div>
                  <div className="mt-1 text-3xl font-semibold text-white">
                    $12,840
                  </div>
                  <div className="mt-1 inline-flex items-center gap-1 text-xs text-emerald-400">
                    <TrendingUp className="h-3 w-3" /> +18.2% vs yesterday
                  </div>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                  <DollarSign className="h-4 w-4" />
                </div>
              </div>
              <svg viewBox="0 0 200 50" className="mt-4 h-12 w-full">
                <path
                  d="M 0 40 L 20 32 L 40 36 L 60 25 L 80 28 L 100 20 L 120 22 L 140 14 L 160 18 L 180 8 L 200 12"
                  fill="none"
                  stroke="rgb(52 211 153)"
                  strokeWidth="2"
                />
                <path
                  d="M 0 40 L 20 32 L 40 36 L 60 25 L 80 28 L 100 20 L 120 22 L 140 14 L 160 18 L 180 8 L 200 12 L 200 50 L 0 50 Z"
                  fill="url(#grad)"
                  opacity="0.25"
                />
                <defs>
                  <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgb(52 211 153)" />
                    <stop
                      offset="100%"
                      stopColor="rgb(52 211 153)"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Order row */}
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

            {/* Review row */}
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
