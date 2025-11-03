//Define types related to subscriptions

// Stores the common types in one place.
// Single Source of Truth for Types.
// Distinguish from UI and Logic.
// Possible Reuse or Expansion.

export type SubscriptionStatus = 'active' | 'cancelled';

export interface Subscription {
    id: string;
    offerTitle: string;
    status: SubscriptionStatus;
    price: number;
    currency: string;
    nextPaymentDate: string;
}