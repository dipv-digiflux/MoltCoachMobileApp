import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import type { ColorToken } from '@/theme/colors';
import type { RadiusToken } from '@/theme/radius';
import type { SpacingToken } from '@/theme/spacing';
import type { TypographyToken } from '@/theme/typography';

export interface BadgeProps {
  children?: ReactNode;
  label?: string;

  icon?: ReactNode;
  iconGap?: SpacingToken;

  padding?: SpacingToken;
  paddingHorizontal?: SpacingToken;
  paddingVertical?: SpacingToken;
  paddingTop?: SpacingToken;
  paddingRight?: SpacingToken;
  paddingBottom?: SpacingToken;
  paddingLeft?: SpacingToken;

  radius?: RadiusToken;
  backgroundColor?: ColorToken;
  textColor?: ColorToken;

  typographyToken?: TypographyToken;

  fullWidth?: boolean;

  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityLabel?: string;
}
