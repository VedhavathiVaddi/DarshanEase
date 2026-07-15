export function formatCurrency(amount) {
  if (!amount) return 'Free';
  return `₹${Number(amount).toLocaleString('en-IN')}`;
}

export function formatDate(dateString) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function generateBookingId() {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `DE-${stamp}${rand}`;
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function classNames(...values) {
  return values.filter(Boolean).join(' ');
}
