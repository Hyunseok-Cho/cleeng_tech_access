import type { Subscription } from '@/lib/types';

type Props = {
    subscription: Subscription;
    onCancel?: (id: string) => void;
};

function formatPrice(value: number, currency: string) {
    //i18n number formatting - Intl.NumberFormat
    // Intl... is a constructor, it should be 'new'.
    // .format() method to format number to string.
    return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDate(iso: string) {
    const d = new Date(iso);
    return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(d);
}

export default function SubscriptionCard({ subscription, onCancel }: Props) {
    const { offerTitle, status, price, currency, nextPaymentDate } = subscription;
    const isCancelled = status === 'cancelled';

    return(
        <article>
            <header>
                <h3>{offerTitle}</h3>

                <div>Status: {status}</div>
            </header>

            <div>
                <div>{formatPrice(price, currency)}</div>

                <div>Renews on: {formatDate(nextPaymentDate)}</div>
            </div>

            <div>
                <button
                onClick={() => onCancel?.(id)}
                disabled={isCancelled}
                aria-disabled={isCancelled}
                >
                {isCancelled ? 'Cancelled' : 'Cancel'}
                </button>
            </div>
        </article>
    )
}