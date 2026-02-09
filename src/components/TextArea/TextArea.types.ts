import {
  type ReturnKeyTypeOptions,
  type StyleProp,
  type TextInputProps as RNTextInputProps,
  type ViewStyle,
} from 'react-native';

/** Props for the TextArea component. */
export type TextAreaProps = {
  // ── Value & input ─────────────────────────────────────────────────

  /** Current text value. */
  value?: string;

  /** Placeholder shown when value is empty. */
  placeholder?: string;

  /** Called when the text changes. */
  onChangeText?: (text: string) => void;

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

  /** Error message shown below the textarea (replaces helperText). */
  errorMessage?: string;

  // ── Helper text ───────────────────────────────────────────────────

  /** Helper text shown below the textarea. Hidden when `errorMessage` is set. */
  helperText?: string;

  // ── State ─────────────────────────────────────────────────────────

  /** Disables textarea interaction and applies disabled styling. */
  disabled?: boolean;

  /** Whether the textarea can be edited. @default true */
  editable?: boolean;

  // ── Common TextInput props ────────────────────────────────────────

  /** Auto-capitalise behaviour. */
  autoCapitalize?: RNTextInputProps['autoCapitalize'];

  /** Maximum character length. */
  maxLength?: number;

  /** Minimum height of the textarea. @default 176 */
  minHeight?: number;

  /** Maximum height of the textarea (scrolls when exceeded). */
  maxHeight?: number;

  /** Return key label. */
  returnKeyType?: ReturnKeyTypeOptions;

  /** Called when the return key is pressed. */
  onSubmitEditing?: () => void;

  // ── Standard ──────────────────────────────────────────────────────

  /** Test identifier. */
  testID?: string;

  /** Extra styles on the outermost wrapper. */
  style?: StyleProp<ViewStyle>;

  /** Accessibility label. Falls back to `label` when omitted. */
  accessibilityLabel?: string;
};
