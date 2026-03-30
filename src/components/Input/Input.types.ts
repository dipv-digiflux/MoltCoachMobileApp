import { type ReactElement } from 'react';
import {
  type KeyboardTypeOptions,
  type ReturnKeyTypeOptions,
  type StyleProp,
  type TextInputProps as RNTextInputProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

/** Props for the Input component. */
export interface InputProps {
  containerPress?: () => void;
  autoFocus?: boolean;
  caretHidden?: boolean;
  // ── Value & input ─────────────────────────────────────────────────

  /** Current text value. */
  value?: string;

  /** Placeholder shown when value is empty. */
  placeholder?: string;

  /** Called when the text changes. */
  onChangeText?: (text: string) => void;

  /** Called when the input receives focus. */
  onFocus?: () => void;

  /** Called when the input loses focus. */
  onBlur?: () => void;

  // ── Label row ─────────────────────────────────────────────────────

  /** Primary label text. Uses b1.medium (16px). */
  label?: string;

  /** Secondary hint shown after the label, e.g. "(optional)". */
  labelHint?: string;

  /** Shows a red asterisk (*) next to the label. @default false */
  required?: boolean;

  /** Shows an info icon next to the label. @default false */
  showInfoIcon?: boolean;

  /** Called when the info icon is pressed. */
  onInfoPress?: () => void;

  // ── Error state ───────────────────────────────────────────────────

  /** Activates the error (destructive) visual state. @default false */
  error?: boolean;

  /** Error message shown below the input (replaces helperText). */
  errorMessage?: string;

  // ── Helper text ───────────────────────────────────────────────────

  /** Helper text shown below the input. Hidden when `errorMessage` is set. */
  helperText?: string;

  // ── Left side ─────────────────────────────────────────────────────

  /**
   * Text add-on displayed on the left with a border divider, e.g. "https://".
   * Renders as an external add-on outside the editable area.
   */
  leftText?: string;

  /** Custom icon element displayed inside the input on the left. */
  leftIcon?: ReactElement;

  // ── Right side ────────────────────────────────────────────────────

  /** Custom icon element displayed inside the input on the right. */
  rightIcon?: ReactElement;

  /** Text add-on displayed inside the input on the right, e.g. "USD". */
  rightText?: string;

  /** Button label rendered on the far right, e.g. "Button". */
  rightButton?: string;

  /** Called when the right button is pressed. */
  onRightButtonPress?: () => void;

  // ── State ─────────────────────────────────────────────────────────

  /** Disables input interaction and applies disabled styling. */
  disabled?: boolean;

  /** Whether the input can be edited. @default true */
  editable?: boolean;

  // ── Common TextInput props ────────────────────────────────────────

  /** Hides input characters for passwords. */
  secureTextEntry?: boolean;

  /** Keyboard type. */
  keyboardType?: KeyboardTypeOptions;

  /** Auto-capitalise behaviour. */
  autoCapitalize?: RNTextInputProps['autoCapitalize'];

  /** Maximum character length. */
  maxLength?: number;

  /** Enables multi-line input. */
  multiline?: boolean;

  /** Return key label. */
  returnKeyType?: ReturnKeyTypeOptions;

  /** Called when the return key is pressed. */
  onSubmitEditing?: () => void;

  // ── Standard ──────────────────────────────────────────────────────

  /** Test identifier. */
  testID?: string;

  /** Extra styles on the outermost wrapper. */
  style?: StyleProp<ViewStyle>;

  /** Extra styles on the label text (when label is set). */
  labelTextStyle?: StyleProp<TextStyle>;

  /** Extra styles on the bordered input container (Pressable). */
  inputContainerStyle?: StyleProp<ViewStyle>;

  /** Extra styles on the internal TextInput. */
  textInputStyle?: StyleProp<TextStyle>;

  /** Accessibility label. Falls back to `label` when omitted. */
  accessibilityLabel?: string;
}
