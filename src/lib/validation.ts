import type { Subscription } from '@/lib/types';

/**
 *  Validate subscription objects' status.
 * @param x - Unknown value to test.
 * @returns `true` if the value has a correct status type.
 */
function isValidStatus(x: unknown): x is Subscription['status'] {
    return x === 'active' || x === 'cancelled';
}

/**
 *  Validate if it has correct form of IsoDate.
 * @param s - Unknown value to test.
 * @returns `true` if the value has a correct ISO date string.
 */
function isValidIsoDate(s: unknown): boolean {
    if(typeof s !== 'string') return false;

    const time = Date.parse(s);
    return Number.isFinite(time);
}

/**
 * Type guard for subscription objects (runtime check).
 * @param x - Unknown value to test.
 * @returns `true` if the value is a type of {@link Subscription}.
 */
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

/**
 * Validate a payload and return a safe array of {@link Subscription}.
 * Throws if the payload is not an array or any item is invalid.
 * @param arr - Unknown payload array which is needed to be checked.
 * @returns Validated array of subscriptions.
 * @throws Error if payload is not an array or any item fails validation.
 */
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