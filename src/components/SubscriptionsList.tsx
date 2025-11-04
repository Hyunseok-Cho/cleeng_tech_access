import {useEffect, useState} from 'react';

import type {Subscription} from '@/lib/types';
import {fetchSubscriptions} from '@/api/subscriptions';
import Loading from '@/components/ui/Loading';
import ErrorMessage from '@/components/ui/ErrorMessage';
import SubscriptionCard from '@/components/SubscriptionCard';

export default function SubscriptionsList() {
    const [items, setItems] = useState<Subscription[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Dev Toggle to Simulate the Error / Empty Array
    const DEV = {
        FAIL: false,
        EMPTY: false,
    }

    async function load() {
        try{
            setError(null);
            setLoading(true);

            const data = await fetchSubscriptions({
                fail: DEV.FAIL,
                empty: DEV.EMPTY,
            });
            setItems(data);
        } catch(e) {
            setError(e instanceof Error ? e.message : 'Failed to load subscriptions.');
        } finally {
            setLoading(false);
        }
    }

    // When it is mounted first time.
    useEffect(() => {
        load();
    }, []);

    function handleCancel(id: string) {
        setItems((prev) => 
            prev.map((s) => (s.id === id ? {...s, status: 'cancelled'} : s)));
    }

    if(loading) return <Loading />;
    if(error) return <ErrorMessage message={error} onRetry={load} />;

    if (items.length === 0) return <>No subscriptions found.</>;

    return (
        <section>
            {items.map((s) => (
                <SubscriptionCard key={s.id} subscription={s} onCancel={handleCancel} />
            ))}
        </section>
    );
}