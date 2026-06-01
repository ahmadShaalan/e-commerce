import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
}

interface ToastOptions {
  type?: ToastType;
  duration?: number;
}

interface ToastState {
  toasts: ToastItem[];
}

interface ToastAction {
  toast: (message: string, options?: ToastOptions) => void;
  success: (message: string, options?: ToastOptions) => void;
  error: (message: string, options?: ToastOptions) => void;
  info: (message: string, options?: ToastOptions) => void;
  dismiss: (id: number) => void;
}

const DEFAULT_DURATION = 4000;

let nextId = 0;

export const useToastStore = create<ToastState & ToastAction>()(
  devtools(
    (set) => ({
      toasts: [],

      toast: (message, options) => {
        const item: ToastItem = {
          id: nextId++,
          message,
          type: options?.type ?? 'success',
          duration: options?.duration ?? DEFAULT_DURATION,
        };
        set(
          (state) => ({ toasts: [...state.toasts, item] }),
          false,
          'toast/add',
        );
      },

      success: (message, options) =>
        useToastStore.getState().toast(message, { ...options, type: 'success' }),
      error: (message, options) =>
        useToastStore.getState().toast(message, { ...options, type: 'error' }),
      info: (message, options) =>
        useToastStore.getState().toast(message, { ...options, type: 'info' }),

      dismiss: (id) =>
        set(
          (state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }),
          false,
          'toast/dismiss',
        ),
    }),
    { name: 'toast-store' },
  ),
);

// Imperative helper so toasts can be fired from anywhere — API layers,
// interceptors, or other stores — without the `useToastStore` hook.
export const toast = {
  show: (message: string, options?: ToastOptions) =>
    useToastStore.getState().toast(message, options),
  success: (message: string, options?: ToastOptions) =>
    useToastStore.getState().success(message, options),
  error: (message: string, options?: ToastOptions) =>
    useToastStore.getState().error(message, options),
  info: (message: string, options?: ToastOptions) =>
    useToastStore.getState().info(message, options),
};
