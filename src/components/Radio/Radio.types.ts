import { type StyleProp, type ViewStyle } from 'react-native';

/** Radio size preset. */
export type RadioSize = 'default' | 'small';

/** Props for the Radio component. */
export interface RadioProps {
  /** Whether this radio option is selected. @default false */
  selected?: boolean;

  /** Disables interaction and applies disabled styling. */
  disabled?: boolean;

  /** Optional label text displayed next to the radio. */
  label?: string;

  /** Optional description text displayed below the label. */
  description?: string;

  /** Size preset. @default 'default' */
  size?: RadioSize;

  /** Called when this radio is pressed. */
  onPress?: () => void;

  /** Test identifier. */
  testID?: string;

  /** Extra styles on the outermost wrapper. */
  style?: StyleProp<ViewStyle>;

  /** Accessibility label. Falls back to `label` when omitted. */
  accessibilityLabel?: string;
}
