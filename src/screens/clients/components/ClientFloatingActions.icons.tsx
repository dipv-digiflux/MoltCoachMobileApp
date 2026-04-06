import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { colors } from '@/theme';

import { type IconProps } from './ClientFloatingActions.icons.types';

export const UpArrowIcon = ({
  color = colors.TextPrimaryDefault,
  size = 24,
}: IconProps): React.ReactElement => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 15L12 9L6 15"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const BellIcon = ({
  color = colors.StatesWhite,
  size = 24,
}: IconProps): React.ReactElement => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.73 21A2 2 0 0 1 10.27 21"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
