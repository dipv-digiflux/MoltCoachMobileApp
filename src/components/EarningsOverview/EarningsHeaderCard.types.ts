import type { StyleProp, ViewStyle } from 'react-native';

export interface EarningsHeaderCardProps {
  /**
   * Title text displayed at the top
   */
  title: string;
  /**
   * Rate text displayed on the right side of the header
   */
  rateText: string;
  /**
   * Total credits value
   */
  credits: number;
  /**
   * Label displayed next to the credits value
   */
  creditsLabel: string;
  /**
   * AED conversion text (e.g. "= 45.00 AED")
   */
  aedText: string;
  /**
   * Optional style for the container
   */
  style?: StyleProp<ViewStyle>;
}
