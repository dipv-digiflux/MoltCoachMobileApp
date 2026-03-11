import { type StyleProp, type ViewStyle } from 'react-native';

/** Checkbox size preset. */
export type CheckboxSize = 'default' | 'small';

/** Props for the Checkbox component. */
export interface CheckboxProps {
  /** Whether the checkbox is checked. @default false */
  checked?: boolean;

  /** Shows an indeterminate (dash) state instead of a checkmark. @default false */
  mixed?: boolean;

  /** Disables interaction and applies disabled styling. */
  disabled?: boolean;

  /** Optional label text displayed next to the checkbox. */
  label?: string;

  /** Optional description text displayed below the label. */
  description?: string;

  /** Size preset. @default 'default' */
  size?: CheckboxSize;

  /** Called when the checked state should change. */
  onChange?: (checked: boolean) => void;

  /** Test identifier. */
  testID?: string;

  /** Extra styles on the outermost wrapper. */
  style?: StyleProp<ViewStyle>;

  /** Accessibility label. Falls back to `label` when omitted. */
  accessibilityLabel?: string;
}
