import { mockSubscriptions } from '@/data/mock-data';
import type {Subscription} from '@/lib/types';

/**
 * Artificial delay utility to simulate network latency.
 * @param ms - Milliseconds to wait.
 * @returns A promise that resolves after `ms`.
 */
const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

/**
 * Simulation flags for the mock subscriptions API.
 * fail: Simulate a network failure.
 * empty: Return an empty array.
 * bad: Return a unperfect payload.
 */
type FetchOptions = {
    delayMs?: number;
    fail?: boolean; 
    empty?: boolean; 
    bad?: boolean; 
}

/**
 * Fetch subscriptions from a mock API with simulation flags.
 *
 * @param options - Simulation flags such as latency, failure, emptiness, and bad payload.
 * @returns Resolved subscriptions or throws on simulated failure.
 */
export async function fetchSubscriptions(
    options: FetchOptions = {}
): Promise<Subscription[]> {
    const { delayMs = 1000, fail = false, empty = false, bad = false} = options; 
    await sleep(delayMs);

    if(fail) {
        throw new Error('Network Error');
    }
    if(empty) {
        return [];
    }

    const base = mockSubscriptions.map((s) => ({...s}));

    if(!bad) {
        return base as Subscription[];
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const broken: any[] = [
    ...base.slice(0, 1),
    {
      offerTitle: 123,
      status: 'deactivated',
      price: '12.99',
      currency: '',
      nextPaymentDate: 'not-a-date',
    },
    ...base.slice(2),
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return broken as any;
}