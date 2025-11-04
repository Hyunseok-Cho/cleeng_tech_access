import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SubscriptionCard from './SubscriptionCard';
import Loading from './ui/Loading';
import ErrorMessage from './ui/ErrorMessage';

import { fetchSubscriptions } from '@/api/subscriptions';
import { validateSubscriptions } from '@/lib/validation';

import { setAll, cancelById } from '@/features/subscriptions/subscriptionsSlice';
import type { RootState } from '@/app/store';

/**
 * Top-level subscription list screen.
 * - Fetches data on initial mount (with artificial delay/simulations in dev) via useEffect calling load().
 * - Handles `loading`, `error`, and `empty/success` render branches.
 * - Stores validated items into Redux; performs cancel via Redux action.
 */
export default function SubscriptionsList() {
    /** Array of subscription items sourced from Redux store. */
    const items = useSelector((s: RootState) => s.subscriptions.items);
    /** Typed dispatch handle for Redux actions. */
    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Developer simulation flags. (disabled in production builds)
     */
    const DEV = {
        FAIL: false,
        EMPTY: false,
        BAD: false,
        delayMs: 1000,
    };

    /**
     * Fetch + validate + store the subscriptions.
     * - All exceptions (network/validation) are caught and surface as Error UI.
     * - On success, the data is stored via Redux slice.
     */
    async function load() {
        try {
        setError(null);
        setLoading(true);
        const raw = await fetchSubscriptions({
            fail: DEV.FAIL,
            empty: DEV.EMPTY,
            bad: DEV.BAD,
            delayMs: DEV.delayMs,
        });
        const data = validateSubscriptions(raw);
        
        dispatch(setAll(data));
        } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load subscriptions.');
        } finally {
        setLoading(false);
        }
    }

    /**
     * Initial fetch on mount.
     */
    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Cancel a subscription by id (client-side only).
     * @param id - Subscription identifier to mark as `cancelled`.
     */
    function handleCancel(id: string) {
        dispatch(cancelById(id));
    }

    // Render branches: Loading / Error / Empty / Success
    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error} onRetry={load} autoFocusRetry />;

    if (!items || items.length === 0) {
        return <>No subscriptions found.</>;
    }

    return (
        <section>
        {items.map((s) => (
            <SubscriptionCard
            key={s.id}
            subscription={s}
            onCancel={handleCancel}
            />
        ))}
        </section>
    );
}
