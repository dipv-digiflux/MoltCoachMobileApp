import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

export const DeleteTaskIcon = ({ size = 48 }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <Rect width="48" height="48" fill="#FFEDF2" rx={4} />
    <Path
      d="M17 18.5L18 33H30L31 18.5M22 23V28M26 23V28M15.5 18H32.5M20.0709 17.7462C20.4235 15.8974 22.0485 14.5 24 14.5C25.9515 14.5 27.5765 15.8974 27.9291 17.7462"
      stroke="#E64043"
      strokeWidth="2"
      strokeLinecap="square"
    />
  </Svg>
);
