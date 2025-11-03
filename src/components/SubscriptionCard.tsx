import type { Subscription } from '@/lib/types';

type Props = {
    subscription: Subscription;
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

export default function SubscriptionCard({ subscription }: Props) {
    const { offerTitle, status, price, currency, nextPaymentDate } = subscription;

    return(
        <article>
            <header>
                <h3>{offerTitle}</h3>

                <span>{status}</span>
            </header>

            <div>
                <div>{formatPrice(price, currency)}</div>

                <div>Renews on: {formatDate(nextPaymentDate)}</div>
            </div>
        </article>
    )
}