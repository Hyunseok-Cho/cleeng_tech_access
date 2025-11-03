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

    async function load() {
        try{
            setError(null);
            setLoading(true);

            const data = await fetchSubscriptions();
            setItems(data);
        } catch {
            setError('Failed to load subscriptions. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try{
                const data = await fetchSubscriptions();
                if(!cancelled) {
                    setItems(data);
                    setLoading(false);
                }
            } catch{
                if(!cancelled) {
                    setError('Failed to load subscriptions. Please try again.');
                    setLoading(false);
                }
            } 
        }) ();
        return () => {
            cancelled = true;
        }
    }, []);

    if(loading) return <Loading />;
    if(error) return <ErrorMessage message={error} onRetry={load} />;

    return (
        <section>
            {items.map((s) => (
                <SubscriptionCard key={s.id} subscription={s} />
            ))}
        </section>
    );
}