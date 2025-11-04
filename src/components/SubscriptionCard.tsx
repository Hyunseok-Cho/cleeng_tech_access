import type { Subscription } from '@/lib/types';

type Props = {
    subscription: Subscription;
    onCancel?: (id: string) => void;
};

const localeByCurrency: Record<string, string> = {
    USD: 'en-US',
    EUR: 'de-DE',
    GBP: 'en-GB',
    PLN: 'pl-PL',
    KRW: 'ko-KR',
}

function formatPrice(value: number, currency: string, opts?: {
    locale?: string;
    display?: 'symbol' | 'code' | 'narrowSymbol' | 'name';
}) {
    const locale = opts?.locale ?? localeByCurrency[currency] ?? 'en-US';

    //i18n number formatting - Intl.NumberFormat
    // Intl... is a constructor, it should be 'new'.
    // .format() method to format number to string.
    return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay: opts?.display ?? 'symbol',
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDate(
  iso: string,
  locale: string = 'pl-PL',
  timeZone: string = 'Europe/Warsaw',
  style: 'long' | 'numeric' = 'long'
) {
  const date = new Date(iso);
  const opts =
    style === 'long'
      ? { year: 'numeric', month: 'long', day: 'numeric', timeZone } as const
      : { year: 'numeric', month: '2-digit', day: '2-digit', timeZone } as const;

  return new Intl.DateTimeFormat(locale, opts).format(date);
}

export default function SubscriptionCard({ subscription, onCancel }: Props) {
    const { id, offerTitle, status, price, currency, nextPaymentDate } = subscription;
    const isCancelled = status === 'cancelled';

    return(
        <article>
            <header>
                <h3>{offerTitle}</h3>

                <div>Status: {status}</div>
            </header>

            <div>
                <div>{formatPrice(price, currency)}</div>

                <div>Renews on: {formatDate(nextPaymentDate, 'pl-PL', 'Europe/Warsaw', 'numeric')}</div>
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