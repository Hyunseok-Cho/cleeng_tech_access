import { describe, it, expect } from 'vitest';
import { subscriptionsReducer, setAll, cancelById } from '@/features/subscriptions/subscriptionsSlice';

const base = [{
  id: 'S1226',
  offerTitle: 'Test',
  status: 'active',
  price: 12.26,
  currency: 'USD',
  nextPaymentDate: '2025-11-28T10:00:00Z',
}];

describe('subscriptions slice', () => {
  it('setAll replaces items', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const state = subscriptionsReducer({ items: [] }, setAll(base as any));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe('S1226');
  });

  it('cancelById marks one item as cancelled', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const state = subscriptionsReducer({ items: base as any }, cancelById('S1226'));
    expect(state.items[0].status).toBe('cancelled');
  });
});
