import { type ReactElement } from 'react';
import { type StyleProp, type TextStyle, type ViewStyle } from 'react-native';

import type { ButtonDefaultIconName } from '@/types/button.types';

/** Visual style variant of the button. */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'minimal'
  | 'destructive'
  | 'outline'
  | 'text'
  | 'destructive-text';

/** Button size preset. */
export type ButtonSize = 'small' | 'default' | 'large';

/** Re-export for consumers that import from Button. */
export type { ButtonDefaultIconName };

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
export interface ButtonProps {
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

  /**
   * When true, the button wrapper stretches to fill the available horizontal space.
   * When false or omitted, the button uses its intrinsic width.
   */
  fullWidth?: boolean;

  /** Accessibility label. Falls back to `label` when omitted. */
  accessibilityLabel?: string;
}

/** State colour set for a single button state. */
export interface ButtonStateColors {
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  iconColor: string;
  focusRingColor: string;
  spinnerColor: string;
}

/** Map of interaction state to colours. */
export type VariantStateMap = Record<ButtonInteractionState, ButtonStateColors>;

/** Size configuration for a button size preset. */
export interface ButtonSizeConfig {
  height: number;
  paddingHorizontal: number;
  iconSize: number;
  gap: number;
  borderRadius: number;
  iconOnlySize: number;
  labelStyle: TextStyle;
}
