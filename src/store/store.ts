import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from '@/store/slices/authSlice';
import { translationReducer } from '@/store/slices/translationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    translation: translationReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
