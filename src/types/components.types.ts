import type { ReactElement, ReactNode } from 'react';
import type {
  ImageSourcePropType,
  ScrollViewProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

import type { SpacingToken } from '@/theme/spacing';
import type { BottomSheetProps } from '@/types/bottomSheet.types';
import type { OnboardingScreenName } from '@navigation/types';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

export interface ApplicationNotApprovedMessageProps {
  title: string;
  description: string;
}

export interface BookingConfirmCalendlyProps {
  url: string;
  onEventScheduled?: () => void;
  name?: string;
  email?: string;
}

export interface LiquidFooterProps {
  children?: ReactNode;
  showTopBorder?: boolean;
  fallbackBackgroundColor?: string;
  style?: StyleProp<ViewStyle>;

  /** All sides (spacing token). Defaults to 'Spacing-xl'. */
  padding?: SpacingToken;
  /** X axis (left & right). */
  paddingHorizontal?: SpacingToken;
  /** Y axis (top & bottom, before safe area). */
  paddingVertical?: SpacingToken;
  /** Individual sides override axis & padding. */
  paddingTop?: SpacingToken;
  paddingBottom?: SpacingToken;
  paddingLeft?: SpacingToken;
  paddingRight?: SpacingToken;
}

// ─── DailyNutritionTargetCard ────────────────────────────────────────

export interface MacroItem {
  value: string;
  percent: number;
}

export interface LifestyleTargets {
  waterIntake: string;
  steps: string;
  activeCalorieBurn: string;
}

export interface DailyNutritionTargetCardProps {
  title: string;
  actionLabel: string;
  kcal: string;
  tags: readonly string[];
  macroTargets: {
    protein: MacroItem;
    fat: MacroItem;
    carb: MacroItem;
  };
  lifestyleTitle: string;
  lifestyleActionLabel: string;
  lifestyleTargets: LifestyleTargets;
  planTip: string;
}

// ─── PageHeader ──────────────────────────────────────────────────────

export interface PageHeaderProps {
  title: string;
  children?: ReactNode;
  subtitle?: string;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  onPressBack?: () => void;
  hideBackButton?: boolean;
  alignTitleLeft?: boolean;
  showBottomBorder?: boolean;
  fallbackBackgroundColor?: string;
  subtitlePosition?: 'top' | 'bottom';
  style?: StyleProp<ViewStyle>;
}

// ─── PageHeaderScrollView ─────────────────────────────────────────────

type BaseScrollViewProps = Omit<
  ScrollViewProps,
  'children' | 'stickyHeaderIndices'
>;

export interface PageHeaderScrollViewProps extends BaseScrollViewProps {
  header: PageHeaderProps;
  headerChildren?: ReactNode;
  extraStickyHeaderIndices?: number[];
}

// ─── InfoCard, ProgressStepper, FilterTabs, StatusTabs ────────────────

export interface InfoCardProps {
  text: string;
}

export interface ProgressStepperProps {
  currentStep: number;
  totalSteps: number;
}

export interface FilterTabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  style?: StyleProp<ViewStyle>;
  rightElement?: ReactNode;
  tabsWrapperStyle?: StyleProp<ViewStyle>;
  tabButtonStyle?: StyleProp<ViewStyle>;
  activeTabButtonStyle?: StyleProp<ViewStyle>;
  tabTextStyle?: StyleProp<TextStyle>;
  activeTabTextStyle?: StyleProp<TextStyle>;
}

export interface StatusTabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  style?: StyleProp<ViewStyle>;
}

// ─── OnboardingHeader ────────────────────────────────────────────────

export interface OnboardingHeaderProps {
  disableBack?: boolean;
  showSkip?: boolean;
  onSkipPress?: OnboardingScreenName | (() => void);
  skipLabel?: string;
}

// ─── OverviewCard ────────────────────────────────────────────────────

export type MetricLayout = 'column' | 'row' | 'text';

export interface OverviewCardMetric {
  label: string;
  value?: string;
  color?: string;
  type?: 'dot' | 'arrow' | 'text';
}

export interface OverviewCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  metrics?: OverviewCardMetric[];
  metricsLayout?: MetricLayout;
  footerText?: string;
  footerTextColor?: string;
  actionText?: string;
  actionColor?: string;
  variant?: 'light' | 'dark';
  style?: ViewStyle;
}

// ─── DateSelectionCalendar, DateSelectionBottomSheet ─────────────────

export interface DateSelectionCalendarProps {
  initialSelectedDate?: string;
  minDate?: string;
  maxDate?: string;
  onDateSelect?: (date: string) => void;
  onActiveDateChange?: (date: string | undefined) => void;
  showInlineSelectButton?: boolean;
}

export type DateSelectionBottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  initialSelectedDate?: string;
  minDate?: string;
  maxDate?: string;
  onDateSelect: (date: string) => void;
  headerTitle?: string;
} & Pick<
  BottomSheetProps,
  | 'variant'
  | 'snapPoints'
  | 'initialSnapIndex'
  | 'stickyHeader'
  | 'stickyFooter'
>;

// ─── CurvedHeader ───────────────────────────────────────────────────

export type StatusBarBarStyle = 'default' | 'light-content' | 'dark-content';

export interface CurvedHeaderProps {
  children: ReactNode;
  statusBarStyle?: StatusBarBarStyle;
  headerHeight?: number;
  backgroundSource?: ImageSourcePropType;
  contentOverlap?: number;
}

// ─── CustomTabBar ───────────────────────────────────────────────────

export type TabBarOptionsWithTestID =
  BottomTabBarProps['descriptors'][string]['options'] & {
    tabBarTestID?: string;
  };

// ─── HorizontalDatePicker / DayItem ──────────────────────────────────

export interface DayItem {
  date: Date;
  dateString: string;
  dayName: string;
  dayNumber: number;
  isPast: boolean;
  isToday: boolean;
  isDisabled?: boolean;
}

export interface DayItemComponentProps {
  item: DayItem;
  isSelected: boolean;
  onPress: (item: DayItem) => void;
}

// ─── ClientCard ─────────────────────────────────────────────────────

export type ClientTagType = 'positive' | 'negative' | 'warning';

export interface ClientTag {
  label: string;
  type: ClientTagType;
}

export interface ClientCardProps {
  name: string;
  score: number;
  avatarUrl: string;
  lastSyncedText: string;
  detailsText: string;
  tags: ClientTag[];
  onNudgePress?: () => void;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

// ─── Accordion (internal) ────────────────────────────────────────────

export interface ChevronIconProps {
  expanded: boolean;
  disabled: boolean;
}

// ─── Switch / Checkbox / Radio size tokens (internal) ─────────────────
// Used by Switch.tsx, Checkbox.tsx, Radio.tsx for layout calculations.

export interface SwitchSizeTokens {
  trackWidth: number;
  trackHeight: number;
  thumb: number;
  onTranslateX: number;
}

export interface CheckboxSizeTokens {
  box: number;
  borderRadius: number;
  stroke: number;
  checkLong: number;
  checkShort: number;
}

export interface RadioSizeTokens {
  outer: number;
  dot: number;
}
