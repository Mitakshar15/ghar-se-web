import type { LocalizedString, Locale } from './primitives/locale';
import type { DateWindow } from './primitives/temporal';

/**
 * Pure selector functions. No side effects, no IO. Components call these to
 * turn raw content into rendered values.
 *
 * Everything here is unit-tested in selectors.test.ts.
 */

/**
 * Pick the first entry whose date window contains `now`. Returns null if no
 * entry is currently active.
 *
 * Used by festival campaigns, marquee strips, and any other date-windowed
 * content. Entries with omitted `activeFrom` / `activeUntil` are treated as
 * "active forever in that direction."
 *
 * Iteration order matters — if two windows overlap, the FIRST in the array
 * wins. Put the more-specific campaigns earlier in the array, then your
 * fallback evergreen entry last.
 */
export function pickActive<T extends DateWindow>(items: readonly T[], now: Date = new Date()): T | null {
  for (const item of items) {
    if (isActive(item, now)) return item;
  }
  return null;
}

/** Like `pickActive` but returns all matches (useful for stacking banners). */
export function pickAllActive<T extends DateWindow>(items: readonly T[], now: Date = new Date()): T[] {
  return items.filter((item) => isActive(item, now));
}

function isActive(item: DateWindow, now: Date): boolean {
  if (item.activeFrom) {
    const from = new Date(item.activeFrom);
    if (Number.isNaN(from.getTime()) || now < from) return false;
  }
  if (item.activeUntil) {
    const until = new Date(item.activeUntil);
    if (Number.isNaN(until.getTime()) || now > until) return false;
  }
  return true;
}

/**
 * Read a localized string in the chosen language, falling back to English if
 * the requested locale is missing. This means partial translations (Kannada
 * for 80% of strings, English for the rest) render cleanly — no `[missing
 * translation]` placeholders bleed into the UI.
 */
export function localized(s: LocalizedString, lang: Locale = 'en'): string {
  if (lang === 'en') return s.en;
  return s[lang] ?? s.en;
}

/**
 * Days until a future ISO date. Rounds UP — so "0 hours away" still shows as
 * "1 day", not "0 days", which would read as "the festival is today" when
 * it's actually later today. Negative values mean the date has passed.
 *
 * Returns NaN if the input is unparseable, so the caller can render a fallback.
 */
export function daysUntil(iso: string, now: Date = new Date()): number {
  const target = new Date(iso);
  if (Number.isNaN(target.getTime())) return Number.NaN;
  const ms = target.getTime() - now.getTime();
  return Math.ceil(ms / 86_400_000);
}

/** Friendly "N days away" / "Today" / "Tomorrow" / "Passed". */
export function formatDaysAway(days: number): string {
  if (Number.isNaN(days)) return '—';
  if (days < 0) return 'Passed';
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  return `${days} days away`;
}
