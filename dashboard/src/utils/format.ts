export const formatCurrency = (n: number, currency: string = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(n);

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

// export const formatRelativeTime = (iso: string) => {
//   const diff = Date.now() - new Date(iso).getTime();
//   // ... use date-fns formatDistanceToNow if you want
// };
