import { configureStore } from '@reduxjs/toolkit';
import { subscriptionsReducer } from '@/features/subscriptions/subscriptionsSlice';

/**
 * Application Redux store configured with the subscriptions slice only.
 * - Holds the list of subscriptions in `state.subscriptions.items`.
 */
export const store = configureStore({
  reducer: {
    subscriptions: subscriptionsReducer,
  },
  devTools: true,
});

/**
 * Root Redux state type inferred from the store.
 * Use with `useSelector((s: RootState) => ...)` for full type safety.
 */
export type RootState = ReturnType<typeof store.getState>;

/** Typed dispatch helper for action creators.
 * Use with: `const dispatch = useDispatch<AppDispatch>()`
 */
export type AppDispatch = typeof store.dispatch;
