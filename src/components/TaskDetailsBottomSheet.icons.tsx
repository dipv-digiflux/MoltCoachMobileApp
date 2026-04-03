import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface NudgeIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const NudgeIcon = ({
  width = 13,
  height = 14,
  color = 'white',
}: NudgeIconProps): React.ReactElement => (
  <Svg width={width} height={height} viewBox="0 0 13 14" fill="none">
    <Path
      d="M8.84184 10.4167C8.84184 11.8894 7.64793 13.0833 6.17517 13.0833C4.70241 13.0833 3.5085 11.8894 3.5085 10.4167M1.41674 10.4167H10.9336C11.3298 10.4167 11.6385 10.0732 11.5965 9.67928L11.118 5.19354C10.8484 2.66667 8.71637 0.75 6.17517 0.75C3.63397 0.75 1.50195 2.66667 1.23238 5.19354L0.753835 9.67928C0.711809 10.0732 1.02057 10.4167 1.41674 10.4167Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
