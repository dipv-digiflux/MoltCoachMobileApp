import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '@/theme';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const FitnessIcon = ({
  width = 20,
  height = 20,
  color = colors.IconSecondaryDefault,
}: IconProps) => (
  <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
    <Path
      d="M2.45711 12.0028L1.04289 13.417C0.652369 13.8075 0.652369 14.4407 1.04289 14.8312L4.22487 18.0132C4.6154 18.4037 5.24856 18.4037 5.63909 18.0132L7.0533 16.599M12.0033 2.45711L13.4175 1.04289C13.808 0.652369 14.4412 0.652369 14.8317 1.04289L18.0137 4.22487C18.4042 4.6154 18.4042 5.24856 18.0137 5.63909L16.5995 7.0533M6.16977 10.4122L10.4124 6.16954M8.64438 12.8868L12.887 8.64415M9.52814 17.66L10.5888 16.5994C10.9793 16.2089 10.9793 15.5757 10.5888 15.1852L3.87128 8.46766C3.48076 8.07714 2.84759 8.07714 2.45707 8.46766L1.39641 9.52832C1.00588 9.91884 1.00588 10.552 1.39641 10.9425L8.11392 17.66C8.50445 18.0506 9.13761 18.0506 9.52814 17.66ZM16.5994 10.5888L17.6601 9.5281C18.0506 9.13757 18.0506 8.50441 17.6601 8.11389L10.9426 1.39637C10.552 1.00585 9.91888 1.00585 9.52836 1.39637L8.4677 2.45703C8.07717 2.84756 8.07717 3.48072 8.4677 3.87124L15.1852 10.5888C15.5757 10.9793 16.2089 10.9793 16.5994 10.5888Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const CalendarDaysIcon = ({
  width = 24,
  height = 24,
  color = colors.IconSecondaryDefault,
}: IconProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 8V4H4V8M20 8V20H4V8M20 8H4"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="square"
    />
    <Path
      d="M8 12H8.01"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="square"
    />
    <Path
      d="M8 16H8.01"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="square"
    />
    <Path
      d="M12 12H12.01"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="square"
    />
    <Path
      d="M16 12H16.01"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="square"
    />
    <Path
      d="M12 16H12.01"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="square"
    />
  </Svg>
);

export const DeleteUserIcon = ({
  width = 17,
  height = 19,
  color = colors.IconSecondaryDefault,
}: IconProps) => (
  <Svg width={width} height={height} viewBox="0 0 17 19" fill="none">
    <Path
      d="M16.1035 14L14.1035 16M14.1035 16L12.1035 18M14.1035 16L12.1035 14M14.1035 16L16.1035 18M7.95443 11.2513C4.23473 11.3158 1.52611 13.8176 0.773671 17.1657C0.644466 17.7406 1.10945 18.25 1.69871 18.25H8.35212M7.95443 11.2513C8.00349 11.2504 8.05272 11.25 8.10212 11.25C8.62221 11.25 9.12305 11.2974 9.60212 11.3879M7.95443 11.2513C7.30436 11.2626 6.68553 11.3483 6.10222 11.5M11.8535 4.5C11.8535 6.57107 10.1746 8.25 8.10352 8.25C6.03245 8.25 4.35352 6.57107 4.35352 4.5C4.35352 2.42893 6.03245 0.75 8.10352 0.75C10.1746 0.75 11.8535 2.42893 11.8535 4.5Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const RightArrowIcon = ({
  width = 24,
  height = 24,
  color = colors.IconSecondaryDefault,
}: IconProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 18L15 12L9 6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const TrashIcon = ({
  width = 24,
  height = 24,
  color = colors.FeedbackWarningText,
}: IconProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 6H21M19 6V20C19 21 18 22 17 22H7C6 22 5 21 5 20V6M8 6V4C8 3 9 2 10 2H14C15 2 16 3 16 4V6M10 11V17M14 11V17"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
