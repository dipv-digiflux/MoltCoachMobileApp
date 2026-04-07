import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import { authReducer } from '@/store/slices/authSlice';
import { bookingReducer } from '@/store/slices/bookingSlice';
import { clientReducer } from '@/store/slices/clientSlice';
import { translationReducer } from '@/store/slices/translationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    translation: translationReducer,
    booking: bookingReducer,
    client: clientReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  undefined,
  Action<string>
>;
