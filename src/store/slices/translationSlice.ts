import { createSlice } from '@reduxjs/toolkit';

import { translationInitialState } from '@/store/slices/translationInitialState';

export type { TranslationState } from '@/types/translation.types';

const translationSlice = createSlice({
  name: 'translation',
  initialState: translationInitialState,
  reducers: {},
});

export const translationReducer = translationSlice.reducer;

/** Select main heading text for GettingThingsReady. */
