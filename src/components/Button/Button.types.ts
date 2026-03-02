import { type ReactElement } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

/** Visual style variant of the button. */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'minimal'
  | 'destructive'
  | 'outline';

/** Button size preset. */
export type ButtonSize = 'small' | 'default' | 'large';

/**
 * Built-in icon names shipped with the Button component.
 * Pass one of these strings to `iconLeft` / `iconRight` to render
 * a built-in icon without importing an external library.
 */
export type ButtonDefaultIconName =
  | 'plus'
  | 'arrow-right'
  | 'arrow-left'
  | 'check'
  | 'close'
  | 'search';

/**
 * An icon prop accepts either a built-in name or any ReactElement.
 *
 * @example
 * // Built-in icon
 * <Button label="Add" iconLeft="plus" />
 *
 * // Custom icon element
 * <Button label="Go" iconRight={<MyCustomArrow />} />
 */
export type ButtonIconProp = ButtonDefaultIconName | ReactElement;

/** Internal interaction state used for style resolution. */
export type ButtonInteractionState =
  | 'default'
  | 'hover'
  | 'focus'
  | 'loading'
  | 'disabled';

/** Props for the Button component. */
export type ButtonProps = {
  /**
   * Text label displayed inside the button.
   * When omitted and an icon is provided, the button renders as icon-only.
   */
  label?: string;

  /** Visual variant. @default 'primary' */
  variant?: ButtonVariant;

  /** Size preset. @default 'default' */
  size?: ButtonSize;

  /** Shows a loading spinner and prevents interaction. */
  loading?: boolean;

  /** Disables interaction and applies disabled styling. */
  disabled?: boolean;

  /** Icon displayed to the left of the label. */
  iconLeft?: ButtonIconProp;

  /** Icon displayed to the right of the label. */
  iconRight?: ButtonIconProp;

  /** Press handler. Not called when disabled or loading. */
  onPress?: () => void;

  /** Test identifier. */
  testID?: string;

  /** Extra styles applied to the outermost wrapper. */
  style?: StyleProp<ViewStyle>;

  /** Accessibility label. Falls back to `label` when omitted. */
  accessibilityLabel?: string;
};
