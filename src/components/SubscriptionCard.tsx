import type { Subscription } from '@/lib/types';

/**
 * Props for SubscriptionCard component(Subscription items and Cancel logic).
 */
type Props = {
    /** A single subscription record to render. */
    subscription: Subscription;
    onCancel?: (id: string) => void;
};

/**
 * Maps ISO-4217 currency codes to a default locale for price formatting.
 */
const localeByCurrency: Record<string, string> = {
    USD: 'en-US',
    EUR: 'de-DE',
    GBP: 'en-GB',
    PLN: 'pl-PL',
    KRW: 'ko-KR',
}

/**
 * Format a price using `Intl.NumberFormat`.
 * @param value - Numeric amount.
 * @param currency - ISO-4217 currency code.
 * @param opts.locale - Override locale (defaults to {@link localeByCurrency}).
 * @param opts.display - Currency display style (symbol|code|narrowSymbol|name).
 * @returns Formatted currency string.
 * @example formatPrice(59.99, 'PLN') // → "59,99 zł" (pl-PL)
 */
function formatPrice(value: number, currency: string, opts?: {
    locale?: string;
    display?: 'symbol' | 'code' | 'narrowSymbol' | 'name';
}) {
    const locale = opts?.locale ?? localeByCurrency[currency] ?? 'en-US';

    return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay: opts?.display ?? 'symbol',
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format an ISO date with explicit locale/timezone.
 * @param iso - ISO-8601 string.
 * @param locale - BCP47 locale (default: 'pl-PL').
 * @param timeZone - IANA time zone (default: 'Europe/Warsaw').
 * @param style - 'long' (e.g., 28 listopada 2025) or 'numeric' (28.11.2025).
 */
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

/**
 * Renders a single subscription card with formatted price/date and a Cancel button.
 * @param props - Component props.
 * @remarks The cancel action affects **client-side state only** (no persistence).
 */
export default function SubscriptionCard({ subscription, onCancel }: Props) {
    const { id, offerTitle, status, price, currency, nextPaymentDate } = subscription;
    const isCancelled = status === 'cancelled';

    return(
        <article>
            <header>
                <h3>{offerTitle}</h3>

                <div className={`status-text status--${status}`}>Status: {status}</div>
            </header>

            <div>
                <div className="price-text">{formatPrice(price, currency)}</div>

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