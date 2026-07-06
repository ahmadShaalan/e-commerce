import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isConfirming?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const TRANSITION_MS = 300;

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  isConfirming = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  // `mounted` keeps the node in the DOM during the exit animation;
  // `visible` drives the enter/leave transition classes.
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      // Mount in the closed state, then flip to visible a frame later so the
      // browser paints the closed styles first; otherwise the two updates are
      // coalesced into one paint and the enter transition is skipped.
      let inner = 0;
      const outer = requestAnimationFrame(() => {
        setMounted(true);
        inner = requestAnimationFrame(() => setVisible(true));
      });
      return () => {
        cancelAnimationFrame(outer);
        cancelAnimationFrame(inner);
      };
    }

    // Play the exit transition, then unmount once it has finished.
    const raf = requestAnimationFrame(() => setVisible(false));
    const timer = window.setTimeout(() => setMounted(false), TRANSITION_MS);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onCancel]);

  if (!mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 transition-opacity duration-300 ease-out ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onCancel}
    >
      <div
        className={`w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl transition-all duration-300 ease-out ${
          visible ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="confirm-dialog-title"
          className="text-lg font-semibold text-zinc-900"
        >
          {title}
        </h2>
        <p className="mt-2 text-sm text-zinc-500">{message}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isConfirming}
            className="cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isConfirming}
            className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 disabled:opacity-50"
          >
            {isConfirming ? 'Deleting…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
