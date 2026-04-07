import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface EarningsOverviewProps {
  /**
   * Total credits earned this month
   * @default 0
   */
  credits?: number;
  /**
   * AED value of total credits
   * @default 0
   */
  aedValue?: number;
  /**
   * Callback when redeem action is pressed
   */
  onRedeem?: () => void;
  /**
   * Callback when withdraw action is pressed
   */
  onWithdraw?: () => void;
  /**
   * Callback when transfer to client action is pressed
   */
  onTransferToClient?: () => void;
  /**
   * Optional style for the container
   */
  style?: StyleProp<ViewStyle>;
}

export interface EarningsActionItemProps {
  /**
   * Label for the action
   */
  label: string;
  /**
   * Icon to display
   */
  icon: ReactNode;
  /**
   * Callback when action is pressed
   */
  onPress?: () => void;
  /**
   * Test ID for automation
   */
  testID?: string;
}
