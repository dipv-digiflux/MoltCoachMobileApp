import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import type { SpacingToken } from '@/theme/spacing';

export interface ApplicationNotApprovedMessageProps {
  title: string;
  description: string;
}

export interface BookingConfirmCalendlyProps {
  url: string;
}

export interface LiquidFooterProps {
  children?: ReactNode;
  showTopBorder?: boolean;
  fallbackBackgroundColor?: string;
  style?: StyleProp<ViewStyle>;

  /** All sides (spacing token). Defaults to 'Spacing-xl'. */
  padding?: SpacingToken;
  /** X axis (left & right). */
  paddingHorizontal?: SpacingToken;
  /** Y axis (top & bottom, before safe area). */
  paddingVertical?: SpacingToken;
  /** Individual sides override axis & padding. */
  paddingTop?: SpacingToken;
  paddingBottom?: SpacingToken;
  paddingLeft?: SpacingToken;
  paddingRight?: SpacingToken;
}
