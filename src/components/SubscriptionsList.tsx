import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SubscriptionCard from './SubscriptionCard';
import Loading from './ui/Loading';
import ErrorMessage from './ui/ErrorMessage';

import { fetchSubscriptions } from '@/api/subscriptions';
import { validateSubscriptions } from '@/lib/validation';

import { setAll, cancelById } from '@/features/subscriptions/subscriptionsSlice';
import type { RootState } from '@/app/store';

export default function SubscriptionsList() {
  const items = useSelector((s: RootState) => s.subscriptions.items);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const DEV = {
    FAIL: false,
    EMPTY: false,
    BAD: false,
    delayMs: 1000,
  };

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

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleCancel(id: string) {
    dispatch(cancelById(id));
  }

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
