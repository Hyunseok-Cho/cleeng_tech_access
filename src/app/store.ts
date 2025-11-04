import { configureStore } from '@reduxjs/toolkit';
import { subscriptionsReducer } from '@/features/subscriptions/subscriptionsSlice';

export const store = configureStore({
  reducer: {
    subscriptions: subscriptionsReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
