import type { Subscription } from '@/lib/types';

function isValidStatus(x: unknown): x is Subscription['status'] {
    return x === 'active' || x === 'cancelled';
}

function isValidIsoDate(s: unknown): boolean {
    if(typeof s !== 'string') return false;

    const time = Date.parse(s);
    return Number.isFinite(time);
}

function isSubscription(x: unknown): x is Subscription {
    if(typeof x !== 'object' || x === null) return false;

    const obj = x as Record<string, unknown>;

    return (
      typeof obj.id === 'string' &&
      typeof obj.offerTitle === 'string' &&
      isValidStatus(obj.status) &&
      typeof obj.price === 'number' &&
      Number.isFinite(obj.price) &&
      typeof obj.currency === 'string' &&
      isValidIsoDate(obj.nextPaymentDate) 
    );
}

export function validateSubscriptions(arr: unknown): Subscription[] {
    if(!Array.isArray(arr)) {
        throw new Error('Invalid response: expected an array');
    }

    const valid = arr.every(isSubscription);

    if(!valid) {
        throw new Error('Invalid Subscription Payload');
    }

    return arr as Subscription[];
}