import { mockSubscriptions } from '@/data/mock-data';
import type {Subscription} from '@/lib/types';

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

type FetchOptions = {
    delayMs?: number;
    fail?: boolean; // True = Error
    empty?: boolean; // True = Empty array
    bad?: boolean; // If it is damaged payload
}

export async function fetchSubscriptions(
    options: FetchOptions = {}
): Promise<Subscription[]> {
    const { delayMs = 1000, fail = false, empty = false, bad = false} = options; // Error simulation 'fail = true'
    // Simulate Network Delay (1 sec)
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

    // Damaged Payload Simulation
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