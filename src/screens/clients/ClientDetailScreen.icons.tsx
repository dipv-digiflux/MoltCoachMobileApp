import React from 'react';
import Svg, { Circle } from 'react-native-svg';

import { colors } from '@/theme';

export const MenuDotsIcon = (): React.ReactElement => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="5" r="2" fill={colors.IconSecondaryDefault} />
    <Circle cx="12" cy="12" r="2" fill={colors.IconSecondaryDefault} />
    <Circle cx="12" cy="19" r="2" fill={colors.IconSecondaryDefault} />
  </Svg>
);
