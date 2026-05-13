import { describe, expect, it } from 'vitest';
import { help } from './help';
import { settings } from './settings-copy';

/**
 * Semantic checks for portal content. Schemas validate structure at module
 * load — these tests cover rules schemas can't express.
 */

describe('help content', () => {
  it('has at least three contact tiles', () => {
    expect(help.contacts.length).toBeGreaterThanOrEqual(3);
  });

  it('every FAQ entry has a unique id', () => {
    const ids = help.faq.entries.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('faq subTemplate contains a {count} placeholder', () => {
    expect(help.faq.subTemplate.en).toContain('{count}');
  });

  it('every contact tile uses one of the allowed tones', () => {
    for (const c of help.contacts) {
      expect(['green', 'saffron', 'brass']).toContain(c.tone);
    }
  });
});

describe('settings content', () => {
  it('has at least the three primary cards (notifications, payouts, language) and operating hours + danger', () => {
    expect(settings.notifications.switches.length).toBeGreaterThan(0);
    expect(settings.notifications.backupSwitches.length).toBeGreaterThan(0);
    expect(settings.payouts.options.length).toBeGreaterThanOrEqual(2);
    expect(settings.language.options.length).toBeGreaterThanOrEqual(1);
    expect(settings.dangerZone.items.length).toBeGreaterThanOrEqual(1);
  });

  it('every switch id is unique across notifications + operating hours', () => {
    const ids = [
      ...settings.notifications.switches.map((s) => s.id),
      ...settings.notifications.backupSwitches.map((s) => s.id),
      settings.operatingHours.sundayOff.id,
      settings.operatingHours.festivalAutoPrep.id,
    ];
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('email backup switch carries an {email} template placeholder', () => {
    const emailSwitch = settings.notifications.backupSwitches.find((s) => s.id === 'email');
    expect(emailSwitch).toBeDefined();
    expect(emailSwitch?.sub.en).toContain('{email}');
  });

  it('every payout option has a unique id', () => {
    const ids = settings.payouts.options.map((o) => o.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('language options cover the three target locales', () => {
    const ids = settings.language.options.map((o) => o.id);
    expect(ids).toContain('en');
    expect(ids).toContain('kn');
    expect(ids).toContain('hi');
  });
});
