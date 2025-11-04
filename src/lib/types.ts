/** Status type for subscriptions. */
export type SubscriptionStatus = 'active' | 'cancelled';

/** Domain model for a subscription item. */
export interface Subscription {
    id: string;
    offerTitle: string;
    status: SubscriptionStatus;
    price: number;
    /** ISO-4217 currency code (e.g., USD, PLN). */
    currency: string;
    /** Next payment date/time in ISO-8601 string. */
    nextPaymentDate: string;
}