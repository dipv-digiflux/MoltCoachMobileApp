import { type StyleProp, type ViewStyle } from 'react-native';

/** Switch size preset. */
export type SwitchSize = 'default' | 'small';

/** Props for the Switch component. */
export interface SwitchProps {
  /** Whether the switch is on. @default false */
  on?: boolean;

  /** Disables interaction and applies disabled styling. */
  disabled?: boolean;

  /** Optional label text displayed next to the switch. */
  label?: string;

  /** Optional description text displayed below the label. */
  description?: string;

  /** Size preset. @default 'default' */
  size?: SwitchSize;

  /** Called when the switch is toggled. */
  onChange?: (on: boolean) => void;

  /** Test identifier. */
  testID?: string;

  /** Extra styles on the outermost wrapper. */
  style?: StyleProp<ViewStyle>;

  /** Accessibility label. Falls back to `label` when omitted. */
  accessibilityLabel?: string;
}
