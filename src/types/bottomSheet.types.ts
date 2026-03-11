import type { ReactElement, ReactNode } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

/** Layout variant of the bottom sheet. */
export type BottomSheetVariant = 'default' | 'form' | 'list' | 'fullscreen';

/**
 * Snap points expressed as percentage strings (e.g. '50%', '90%')
 * or absolute pixel numbers.
 */
export type SnapPoint = string | number;

/** Header configuration for the bottom sheet. */
export interface BottomSheetHeaderProps {
  /** Primary title text. */
  title: string;
  /** Subtitle or description text below the title. */
  subtitle?: string;
  /** Whether to show the close (X) button above the header. @default true */
  showCloseButton?: boolean;
  /** Custom element rendered to the right of the title row. */
  rightElement?: ReactElement;
  /** Extra styles for the header container. */
  style?: StyleProp<ViewStyle>;
  /** Extra styles for the title text. */
  titleStyle?: StyleProp<TextStyle>;
  /** Extra styles for the subtitle text. */
  subtitleStyle?: StyleProp<TextStyle>;
}

/** Footer configuration for the bottom sheet. */
export interface BottomSheetFooterProps {
  /** Primary action button label. */
  primaryLabel?: string;
  /** Primary action handler. */
  onPrimaryPress?: () => void;
  /** Whether the primary button is in a loading state. */
  primaryLoading?: boolean;
  /** Whether the primary button is disabled. */
  primaryDisabled?: boolean;
  /** Secondary action button label. */
  secondaryLabel?: string;
  /** Secondary action handler. */
  onSecondaryPress?: () => void;
  /** Custom footer content (overrides button config). */
  children?: ReactNode;
  /** Extra styles for the footer container. */
  style?: StyleProp<ViewStyle>;
}

/** Search bar configuration for list variant. */
export interface BottomSheetSearchProps {
  /** Placeholder text for the search input. */
  placeholder?: string;
  /** Current search value. */
  value: string;
  /** Callback when the search text changes. */
  onChangeText: (text: string) => void;
  /** Extra styles for the search container. */
  style?: StyleProp<ViewStyle>;
}

/** State to show when the sheet is loading data. */
export type LoadingType = 'spinner' | 'skeleton';

/** Props for the BottomSheet component. */
export interface BottomSheetProps {
  /** Controls visibility of the bottom sheet. */
  visible: boolean;
  /** Called when the bottom sheet requests to close. */
  onClose: () => void;
  /** Layout variant. @default 'default' */
  variant?: BottomSheetVariant;
  /** Snap points (kept for API compatibility). */
  snapPoints?: SnapPoint[];
  /** Initial snap point index (kept for API compatibility). */
  initialSnapIndex?: number;
  /** Header configuration. */
  header?: BottomSheetHeaderProps;
  /** Footer configuration. Renders as a sticky footer. */
  footer?: BottomSheetFooterProps;
  /** Search bar configuration (used with 'list' variant). */
  search?: BottomSheetSearchProps;
  /** Whether data is loading. Shows loading indicator in content area. */
  loading?: boolean;
  /** Loading display type. @default 'spinner' */
  loadingType?: LoadingType;
  /** Message displayed when content is empty and not loading. */
  emptyMessage?: string;
  /** Whether to show the overlay backdrop. @default true */
  showOverlay?: boolean;
  /** Whether the sheet can be dismissed by tapping the overlay. @default true */
  dismissOnOverlayTap?: boolean;
  /** Whether the sheet can be dismissed by dragging down. @default true */
  dismissOnDragDown?: boolean;
  /** Whether pressing the Android back button dismisses the sheet. @default true */
  dismissOnBackButton?: boolean;
  /** Whether the header is sticky (fixed while content scrolls). @default true */
  stickyHeader?: boolean;
  /** Whether the footer is sticky (fixed while content scrolls). @default true */
  stickyFooter?: boolean;
  /** Content rendered inside the sheet body. */
  children?: ReactNode;
  /** Extra styles for the outer container. */
  style?: StyleProp<ViewStyle>;
  /** Extra styles for the content scroll area. */
  contentStyle?: StyleProp<ViewStyle>;
  /** Test identifier. */
  testID?: string;
}

/** Ref handle exposed by the BottomSheet via forwardRef. */
export interface BottomSheetRef {
  /** Open the sheet. */
  open: (snapIndex?: number) => void;
  /** Close the sheet. */
  close: () => void;
  /** Snap to a specific index (kept for API compatibility). */
  snapTo: (index: number) => void;
}
