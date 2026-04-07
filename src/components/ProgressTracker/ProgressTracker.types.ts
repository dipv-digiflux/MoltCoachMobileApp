import type { StyleProp, ViewStyle } from 'react-native';

export type ProgressTrackerStatus = 'completed' | 'active' | 'pending';

export interface ProgressTrackerStep {
  /** The main title of the step. */
  label: string;
  /** The secondary description or timestamp. */
  description: string;
  /** The current status of the step. */
  status: ProgressTrackerStatus;
}

export interface ProgressTrackerProps {
  /** The main title shown above the steps. */
  title: string;
  /** The list of steps to display. */
  steps: ProgressTrackerStep[];
  /** Optional style for the container. */
  style?: StyleProp<ViewStyle>;
  /** Optional testID for automation. */
  testID?: string;
}
