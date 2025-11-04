import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Subscription } from '@/lib/types';

type SubscriptionsState = {
  items: Subscription[];
};

const initialState: SubscriptionsState = {
  items: [],
};

const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {
    setAll(state, action: PayloadAction<Subscription[]>) {
      state.items = action.payload;
    },
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
export const subscriptionsReducer = subscriptionsSlice.reducer;
