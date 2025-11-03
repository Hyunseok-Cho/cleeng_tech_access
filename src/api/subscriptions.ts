import { mockSubscriptions } from '@/data/mock-data';
import type {Subscription} from '@/lib/types';

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function fetchSubscriptions(): Promise<Subscription[]> {
    // Simulate Network Delay (1 sec)
    await sleep(1000);

    // Without Real backend, Return Mock Data
    return [...mockSubscriptions];
}