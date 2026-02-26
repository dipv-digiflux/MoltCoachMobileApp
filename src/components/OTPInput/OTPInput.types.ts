import type { StyleProp, ViewStyle } from 'react-native';

/** Props for the OTPInput component. */
export type OTPInputProps = {
  /** Current OTP value (digits only). */
  value: string;

  /** Called when the OTP value changes. Receives numeric-only string. */
  onChangeText: (text: string) => void;

  /** Number of OTP digit boxes. @default 4 */
  length?: number;

  /** Character shown when a digit box is empty. @default '-' */
  placeholder?: string;

  /** Whether to auto-focus the input on mount. @default false */
  autoFocus?: boolean;

  /** Called when the input loses focus. */
  onBlur?: () => void;

  /** Test identifier. */
  testID?: string;

  /** Extra styles on the outermost wrapper. */
  style?: StyleProp<ViewStyle>;

  /** Accessibility label. */
  accessibilityLabel?: string;
};
