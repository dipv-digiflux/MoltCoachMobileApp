import type { ReactNode } from 'react';

import type { OnboardingNavigationProp } from '@/types/navigation.types';
import type { TranslationState } from '@/types/translation.types';

export interface BookingDetailRowProps {
  icon: ReactNode;
  label: string;
  value: string;
  subValue?: string;
}

export interface CalendarButtonProps {
  label: string;
  icon: ReactNode;
}

export interface BookingConfirmedHook {
  navigation: OnboardingNavigationProp;
  translation: TranslationState;
  getFormattedDate: () => string;
  getFormattedTimeRange: () => string;
  getLocationLabel: () => string;
  handleLogout: () => Promise<void>;
}
