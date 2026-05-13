import { describe, expect, it } from 'vitest';
import {
  BUSINESS,
  commissionDisplay,
  securityDepositDisplay,
  payoutWindowDisplay,
  refundWindowDisplay,
  plusYearlyDisplay,
  forMakersFineprint,
} from './terms';

describe('BUSINESS', () => {
  it('passes its Zod schema (validates on import)', () => {
    // The import itself runs `.parse()`. If the schema rejected, this file
    // would have crashed at load time. So reaching this expect proves the
    // current values are valid.
    expect(BUSINESS.commissionPct).toBeGreaterThanOrEqual(0);
    expect(BUSINESS.commissionPct).toBeLessThanOrEqual(100);
    expect(BUSINESS.payoutWindowHours.min).toBeLessThanOrEqual(BUSINESS.payoutWindowHours.max);
  });
});

describe('display helpers', () => {
  it('format commission with the current pct', () => {
    expect(commissionDisplay()).toMatch(/^\d+(\.\d+)?% commission$/);
  });

  it('format security deposit with rupee prefix', () => {
    expect(securityDepositDisplay()).toMatch(/^₹\d+ refundable security deposit$/);
  });

  it('format payout window as min-max hours', () => {
    expect(payoutWindowDisplay()).toBe(
      `${BUSINESS.payoutWindowHours.min}-${BUSINESS.payoutWindowHours.max}h after delivery`,
    );
  });

  it('format refund window', () => {
    expect(refundWindowDisplay()).toBe(`${BUSINESS.refundWindowHours}-hour refund window`);
  });

  it('format Plus yearly price', () => {
    expect(plusYearlyDisplay()).toBe(`₹${BUSINESS.plusYearlyInr}/year`);
  });

  it('builds the makers fine-print from the canonical terms', () => {
    const line = forMakersFineprint();
    expect(line).toContain('Free to join');
    expect(line).toContain(`₹${BUSINESS.securityDepositInr}`);
    expect(line).toContain(`${BUSINESS.commissionPct}%`);
    expect(line).toContain('No subscription');
  });
});
