import type { StyleProp, ViewStyle } from 'react-native';

export type CreditPackageStatus = 'inProgress' | 'completed' | 'none';

export interface CreditPackageCardProps {
  /** The number of credits in this package. */
  credits: number;
  /** The status of the package. If 'inProgress', an orange badge with clock icon is shown. */
  status?: CreditPackageStatus;
  /** The price value (e.g. 45.00). */
  price: number;
  /** The currency code (e.g. AED). */
  currency: string;
  /** Optional callback when the card is pressed. */
  onPress?: () => void;
  /** Optional style for the container. */
  style?: StyleProp<ViewStyle>;
  /** Optional testID for automation. */
  testID?: string;
}
