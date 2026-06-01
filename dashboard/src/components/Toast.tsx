import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, Info, X, XCircle } from 'lucide-react';
import {
  useToastStore,
  type ToastItem,
  type ToastPosition,
  type ToastType,
} from '../store/toastStore';

const TRANSITION_MS = 300;

const VARIANTS: Record<
  ToastType,
  { icon: typeof CheckCircle2; className: string }
> = {
  success: { icon: CheckCircle2, className: 'text-emerald-500' },
  error: { icon: XCircle, className: 'text-red-500' },
  info: { icon: Info, className: 'text-blue-500' },
};

// `container` places the stack and sets its growth direction (newest toast
// nearest the anchored edge); `enterFrom` is the off-screen offset the toast
// animates in from, matching the side it's docked to.
const POSITIONS: Record<
  ToastPosition,
  { container: string; enterFrom: string }
> = {
  'top-left': {
    container: 'top-4 left-4 flex-col-reverse items-start',
    enterFrom: '-translate-x-8',
  },
  'top-right': {
    container: 'top-4 right-4 flex-col-reverse items-end',
    enterFrom: 'translate-x-8',
  },
  'top-center': {
    container: 'top-4 left-1/2 -translate-x-1/2 flex-col-reverse items-center',
    enterFrom: '-translate-y-8',
  },
  'bottom-left': {
    container: 'bottom-4 left-4 flex-col items-start',
    enterFrom: '-translate-x-8',
  },
  'bottom-right': {
    container: 'bottom-4 right-4 flex-col items-end',
    enterFrom: 'translate-x-8',
  },
  'bottom-center': {
    container: 'bottom-4 left-1/2 -translate-x-1/2 flex-col items-center',
    enterFrom: 'translate-y-8',
  },
};

export function Toaster({
  position = 'bottom-right',
}: {
  position?: ToastPosition;
}) {
  const toasts = useToastStore((state) => state.toasts);
  const dismiss = useToastStore((state) => state.dismiss);

  if (toasts.length === 0) return null;

  // Group toasts by their resolved position (per-toast override, otherwise the
  // Toaster default) so each corner renders its own stacked container.
  const groups = new Map<ToastPosition, ToastItem[]>();
  for (const t of toasts) {
    const pos = t.position ?? position;
    const group = groups.get(pos) ?? [];
    group.push(t);
    groups.set(pos, group);
  }

  return createPortal(
    <>
      {[...groups.entries()].map(([pos, items]) => {
        const { container, enterFrom } = POSITIONS[pos];
        return (
          <div key={pos} className={`fixed z-50 flex gap-3 ${container}`}>
            {items.map((t) => (
              <Toast
                key={t.id}
                toast={t}
                enterFrom={enterFrom}
                onDismiss={() => dismiss(t.id)}
              />
            ))}
          </div>
        );
      })}
    </>,
    document.body,
  );
}

function Toast({
  toast,
  enterFrom,
  onDismiss,
}: {
  toast: ToastItem;
  enterFrom: string;
  onDismiss: () => void;
}) {
  // `visible` drives the enter/leave transition; the actual removal from the
  // store is delayed until the exit animation has finished.
  const [visible, setVisible] = useState(false);

  const close = useCallback(() => {
    setVisible(false);
    window.setTimeout(onDismiss, TRANSITION_MS);
  }, [onDismiss]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    const timer = window.setTimeout(close, toast.duration);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [close, toast.duration]);

  const { icon: Icon, className } = VARIANTS[toast.type];

  return (
    <div
      role="status"
      className={`flex w-80 items-start gap-3 rounded-xl border border-zinc-100 bg-white p-4 shadow-lg transition-all duration-300 ease-out ${
        visible
          ? 'translate-x-0 translate-y-0 opacity-100'
          : `${enterFrom} opacity-0`
      }`}
    >
      <Icon size={20} className={`mt-0.5 shrink-0 ${className}`} />
      <p className="flex-1 text-sm text-zinc-700">{toast.message}</p>
      <button
        type="button"
        onClick={close}
        aria-label="Dismiss notification"
        className="shrink-0 cursor-pointer rounded-md p-1 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-600"
      >
        <X size={16} />
      </button>
    </div>
  );
}
