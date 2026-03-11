import { type ReactElement } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

/** Accordion size variant. */
export type AccordionSize = 'default' | 'small';

/** Props for the Accordion component. */
export interface AccordionProps {
  // ── Content ─────────────────────────────────────────────────────

  /** Title text displayed in the accordion header. */
  title: string;

  /** Content text displayed when expanded. */
  content: string | ReactElement;

  // ── State ───────────────────────────────────────────────────────

  /** Whether the accordion is expanded. @default false */
  expanded?: boolean;

  /** Called when the accordion header is pressed. */
  onPress?: () => void;

  /** Disables accordion interaction and applies disabled styling. @default false */
  disabled?: boolean;

  // ── Icon ────────────────────────────────────────────────────────

  /** Optional left icon element displayed before the title. */
  leftIcon?: ReactElement;

  // ── Size ─────────────────────────────────────────────────────────

  /** Size variant. @default 'default' */
  size?: AccordionSize;

  // ── Standard ──────────────────────────────────────────────────────

  /** Test identifier. */
  testID?: string;

  /** Extra styles on the outermost wrapper. */
  style?: StyleProp<ViewStyle>;

  /** Accessibility label. Falls back to `title` when omitted. */
  accessibilityLabel?: string;
}
