/**
 * Indian-locale formatters. Centralise so we render rupee amounts and
 * dates consistently across the app.
 */

export function formatRupees(amount: number, opts: { decimals?: boolean } = {}): string {
  const fixed = opts.decimals ? amount.toFixed(2) : Math.round(amount).toString();
  // Indian thousands grouping: 1,23,456
  const [int, dec] = fixed.split('.');
  const last3 = int!.slice(-3);
  const rest = int!.slice(0, -3);
  const grouped = rest ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last3 : last3;
  return `₹${grouped}${dec ? '.' + dec : ''}`;
}

export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : (plural ?? singular + 's');
}

export function relativeDay(dateIso: string, now: Date = new Date()): string {
  const d = new Date(dateIso);
  if (Number.isNaN(d.getTime())) return dateIso;
  const diffDays = Math.round((d.getTime() - now.getTime()) / 86400000);
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 0 && diffDays < 7) return `In ${diffDays} days`;
  if (diffDays < 0 && diffDays > -7) return `${Math.abs(diffDays)} days ago`;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}
