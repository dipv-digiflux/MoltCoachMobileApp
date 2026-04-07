import type { StyleProp, ViewStyle } from 'react-native';

export interface TierStatusCardProps {
  /**
   * Current tier name (e.g. 'Gold Tier')
   */
  tierName?: string;
  /**
   * Encashment limit percentage (e.g. 50)
   */
  encashmentLimit?: number;
  /**
   * Total credits (e.g. '32k')
   */
  credits?: string;
  /**
   * Progress towards next tier (0 to 1)
   */
  progress?: number;
  /**
   * Remaining credits to reach next tier (e.g. '24K')
   */
  remainingToNext?: string;
  /**
   * Next tier name (e.g. 'Platinum')
   */
  nextTierName?: string;
  /**
   * Next tier encashment limit percentage (e.g. 80)
   */
  nextTierLimit?: number;
  /**
   * Optional style for the container
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Callback when info icon is pressed
   */
  onPressInfo?: () => void;
  /**
   * Callback when the whole card is pressed
   */
  onPress?: () => void;
}
