import { mockSubscriptions } from '@/data/mock-data';
import type {Subscription} from '@/lib/types';

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

type FetchOptions = {
    delayMs?: number;
    fail?: boolean; // True = Error
    empty?: boolean; // True = Empty array
}

export async function fetchSubscriptions(
    options: FetchOptions = {}
): Promise<Subscription[]> {
    const { delayMs = 1000, fail = false, empty = false } = options; // Error simulation 'fail = true'
    // Simulate Network Delay (1 sec)
    await sleep(delayMs);

    if(fail) {
        throw new Error('Network Error');
    }

    const src = empty ? [] : mockSubscriptions;

    // Without Real backend, Return Mock Data
    return src.map((s) => ({...s}));
}