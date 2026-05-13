import { describe, expect, it } from 'vitest';
import { marqueeCampaigns } from './marquee';
import { festivalCampaigns } from './festival-campaigns';
import { pickActive } from '../selectors';

/**
 * Sanity checks for landing-page content. The schemas already validate
 * structure at module load — these tests cover semantic rules that schemas
 * can't enforce (e.g. "an evergreen fallback must exist").
 */

describe('marqueeCampaigns', () => {
  it('has at least one entry', () => {
    expect(marqueeCampaigns.length).toBeGreaterThan(0);
  });

  it('ends with an evergreen entry (no activeFrom or activeUntil)', () => {
    const last = marqueeCampaigns[marqueeCampaigns.length - 1];
    expect(last).toBeDefined();
    expect(last?.activeFrom).toBeUndefined();
    expect(last?.activeUntil).toBeUndefined();
  });

  it('always has an active campaign at any moment in time', () => {
    // The evergreen fallback is the contract. Pick at several moments.
    const moments = [
      new Date('2025-01-01'),
      new Date('2026-05-11'),
      new Date('2030-12-31'),
    ];
    for (const t of moments) {
      expect(pickActive(marqueeCampaigns, t)).not.toBeNull();
    }
  });

  it('every campaign has a unique id', () => {
    const ids = marqueeCampaigns.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('festivalCampaigns', () => {
  it('every campaign has a unique id', () => {
    const ids = festivalCampaigns.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every campaign has a parseable festivalDate', () => {
    for (const c of festivalCampaigns) {
      expect(Number.isNaN(new Date(c.festivalDate).getTime())).toBe(false);
    }
  });

  it('activeUntil never precedes activeFrom', () => {
    for (const c of festivalCampaigns) {
      if (c.activeFrom && c.activeUntil) {
        expect(new Date(c.activeFrom).getTime()).toBeLessThanOrEqual(
          new Date(c.activeUntil).getTime(),
        );
      }
    }
  });

  it('activeUntil never precedes festivalDate (banner retires by the festival itself)', () => {
    // Spec: a festival banner should not auto-retire BEFORE the festival
    // actually happens. The window can end ON the festival date but not before.
    for (const c of festivalCampaigns) {
      if (c.activeUntil) {
        expect(new Date(c.activeUntil).getTime()).toBeGreaterThanOrEqual(
          new Date(c.festivalDate).getTime(),
        );
      }
    }
  });

  it('headlinePrefix.en ends with a separator so the countdown can be appended', () => {
    // The component renders `{headlinePrefix}{countdown}.` — without trailing
    // " · " in the prefix, the output reads "Ganesh Chaturthi119 days away."
    for (const c of festivalCampaigns) {
      const tail = c.headlinePrefix.en.trimEnd().slice(-1);
      // Allow any punctuation that visually separates. We use " · " by convention.
      expect([':', '·', '-', '—']).toContain(tail);
    }
  });

  it('a date deep in the past produces no active campaign (banner hidden)', () => {
    const longAgo = new Date('2020-01-01');
    expect(pickActive(festivalCampaigns, longAgo)).toBeNull();
  });

  it('a date deep in the future produces no active campaign (banner hidden)', () => {
    const farFuture = new Date('2030-12-31');
    expect(pickActive(festivalCampaigns, farFuture)).toBeNull();
  });
});
