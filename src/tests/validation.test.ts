import { describe, it, expect } from 'vitest';
import { validateSubscriptions } from '@/lib/validation';

describe('validateSubscriptions', () => {
  it('passes valid payload', () => {
    const ok = [{
      id: 'S1226',
      offerTitle: 'Test',
      status: 'active',
      price: 12.26,
      currency: 'USD',
      nextPaymentDate: '2025-11-28T10:00:00Z',
    }];
    const out = validateSubscriptions(ok);
    expect(out).toHaveLength(1);
    expect(out[0].id).toBe('S1226');
  });

  it('throws on corrupted payload', () => {
    const bad = [{ offerTitle: 123, status: 'deactivated' }];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() => validateSubscriptions(bad as any)).toThrow();
  });
});
