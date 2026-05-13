import { describe, expect, it } from 'vitest';
import { pickActive, pickAllActive, localized, daysUntil, formatDaysAway } from './selectors';
import type { DateWindow } from './primitives/temporal';

// Test fixtures need an `id` alongside the DateWindow shape. Define once.
type Fixture = DateWindow & { id: string };

describe('pickActive', () => {
  const now = new Date('2026-08-01T10:00:00');

  it('returns null on an empty list', () => {
    expect(pickActive<Fixture>([], now)).toBeNull();
  });

  it('returns the first item whose window contains `now`', () => {
    const items: Fixture[] = [
      { id: 'past', activeFrom: '2026-01-01', activeUntil: '2026-02-01' },
      { id: 'live', activeFrom: '2026-07-01', activeUntil: '2026-09-06' },
      { id: 'future', activeFrom: '2026-12-01' },
    ];
    expect(pickActive(items, now)?.id).toBe('live');
  });

  it('treats omitted activeFrom as active-from-forever-ago', () => {
    const evergreen: Fixture[] = [{ id: 'evergreen' }];
    expect(pickActive(evergreen, now)?.id).toBe('evergreen');
    const expired: Fixture[] = [{ id: 'until-2025', activeUntil: '2025-01-01' }];
    expect(pickActive(expired, now)).toBeNull();
  });

  it('treats omitted activeUntil as active-forever-forward', () => {
    const forever: Fixture[] = [{ id: 'forever', activeFrom: '2026-01-01' }];
    expect(pickActive(forever, now)?.id).toBe('forever');
  });

  it('skips items with invalid dates', () => {
    const bad: Fixture[] = [{ id: 'bad', activeFrom: 'not-a-date' }];
    expect(pickActive(bad, now)).toBeNull();
  });

  it('respects array order on overlap — more-specific entries first wins', () => {
    const items: Fixture[] = [
      { id: 'specific', activeFrom: '2026-07-15', activeUntil: '2026-08-15' },
      { id: 'evergreen' },
    ];
    expect(pickActive(items, now)?.id).toBe('specific');
  });
});

describe('pickAllActive', () => {
  const now = new Date('2026-08-01T10:00:00');

  it('returns all matches in order', () => {
    const items: Fixture[] = [
      { id: 'a' },
      { id: 'b', activeFrom: '2026-07-01' },
      { id: 'c', activeUntil: '2026-07-15' }, // expired
    ];
    expect(pickAllActive(items, now).map((x) => x.id)).toEqual(['a', 'b']);
  });
});

describe('localized', () => {
  const s = { en: 'Sign in', kn: 'ಲಾಗಿನ್', hi: 'साइन इन' };

  it('returns English by default', () => {
    expect(localized(s)).toBe('Sign in');
  });

  it('returns Kannada when requested', () => {
    expect(localized(s, 'kn')).toBe('ಲಾಗಿನ್');
  });

  it('falls back to English when the requested locale is missing', () => {
    expect(localized({ en: 'Hello' }, 'kn')).toBe('Hello');
    expect(localized({ en: 'Hello' }, 'hi')).toBe('Hello');
  });
});

describe('daysUntil', () => {
  it('rounds UP so "today, but later" still shows as 1', () => {
    const now = new Date('2026-05-11T08:00:00');
    // Festival is later today at 6 PM — that's 10 hours = 1 day rounded up.
    expect(daysUntil('2026-05-11T18:00:00', now)).toBe(1);
  });

  it('returns negative for past dates', () => {
    const now = new Date('2026-05-11T08:00:00');
    expect(daysUntil('2026-05-01T08:00:00', now)).toBe(-10);
  });

  it('returns NaN for unparseable inputs', () => {
    expect(Number.isNaN(daysUntil('not-a-date'))).toBe(true);
  });

  it('handles the festival countdown case', () => {
    const now = new Date('2026-05-11T00:00:00');
    expect(daysUntil('2026-09-06T00:00:00', now)).toBe(118);
  });
});

describe('formatDaysAway', () => {
  it('renders friendly labels', () => {
    expect(formatDaysAway(0)).toBe('Today');
    expect(formatDaysAway(1)).toBe('Tomorrow');
    expect(formatDaysAway(45)).toBe('45 days away');
    expect(formatDaysAway(-1)).toBe('Passed');
    expect(formatDaysAway(NaN)).toBe('—');
  });
});
