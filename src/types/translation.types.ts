import { translationInitialState } from '@/store/slices/translationInitialState';

/**
 * Translation slice state, derived automatically from the initial state.
 * Flat, camelCase keys: screen/feature + purpose.
 */
export type TranslationState = typeof translationInitialState;

/**
 * Union of all translation keys.
 */
export type TranslationKey = keyof typeof translationInitialState;
