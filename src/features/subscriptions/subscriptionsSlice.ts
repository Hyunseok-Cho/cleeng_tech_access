import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Subscription } from '@/lib/types';

/** Shape of the subscriptions slice state. */
type SubscriptionsState = {
  items: Subscription[];
};

/** Initial state: empty list (filled after the first successful fetch). */
const initialState: SubscriptionsState = {
  items: [],
};

/**
 * Subscriptions slice
 * - `setAll`: replace the entire items list (after fetch/validation)
 * - `cancelById`: mark an item's status as `cancelled` (client-only)
 */
const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {
    /**
     * Replace the entire list of subscriptions.
     * @param state - Current slice state.
     * @param action - New list of subscriptions.
     */
    setAll(state, action: PayloadAction<Subscription[]>) {
      state.items = action.payload;
    },

    /**
     * Mark a subscription status as `cancelled` by id.
     * @param state - Current slice state.
     * @param action - Payload with subscription id to cancel.
     */
    cancelById(state, action: PayloadAction<string>) {
      const id = action.payload;
      const target = state.items.find((s) => s.id === id);
      if (target) {
        target.status = 'cancelled';
      }
    },
  },
});

export const { setAll, cancelById } = subscriptionsSlice.actions;
/** Reducer to be registered into the Redux store. */
export const subscriptionsReducer = subscriptionsSlice.reducer;
