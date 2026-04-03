// Re-export shared UI components from here
export { CurvedHeader, CURVED_HEADER_DEFAULT_HEIGHT } from './CurvedHeader';

export { DailyNutritionTargetCard } from './DailyNutritionTargetCard';

export { InfoCard } from './InfoCard';

export * from './DailyActivityBottomSheet';
export * from './PrimaryGoalBottomSheet';

export { Button } from './Button';
export type {
  ButtonDefaultIconName,
  ButtonIconProp,
  ButtonInteractionState,
  ButtonProps,
  ButtonSize,
  ButtonVariant,
} from './Button';

export { Checkbox } from './Checkbox';
export type { CheckboxProps, CheckboxSize } from './Checkbox';

export { Radio } from './Radio';
export type { RadioProps, RadioSize } from './Radio';

export { Switch } from './Switch';
export type { SwitchProps, SwitchSize } from './Switch';

export { Input } from './Input';
export type { InputProps } from './Input';

export { OTPInput } from './OTPInput';
export type { OTPInputProps } from './OTPInput';

export { TextArea } from './TextArea';
export type { TextAreaProps } from './TextArea';

export { Accordion } from './Accordion';
export type { AccordionProps, AccordionSize } from './Accordion';

export { OnboardingHeader } from './OnboardingHeader';

export { BottomSheet } from './BottomSheet';
export type {
  BottomSheetFooterProps,
  BottomSheetHeaderProps,
  BottomSheetProps,
  BottomSheetRef,
  BottomSheetSearchProps,
  BottomSheetVariant,
  LoadingType,
  SnapPoint,
} from './BottomSheet';

export { PageHeaderScrollView } from './PageHeaderScrollView';
export { PageHeader } from './PageHeader';
export { ProgressStepper } from './ProgressStepper';

export { DateSelectionCalendar } from './DateSelectionCalendar';
export type { DateSelectionCalendarProps } from './DateSelectionCalendar';

export { DateSelectionBottomSheet } from './DateSelectionBottomSheet';
export type { DateSelectionBottomSheetProps } from './DateSelectionBottomSheet';

export { Dropdown } from './Dropdown';
export type { DropdownOption, DropdownProps, DropdownValue } from './Dropdown';
export { OverviewCard } from './OverviewCard';
export type {
  OverviewCardProps,
  OverviewCardMetric,
  MetricLayout,
} from './OverviewCard';

export { FilterTabs } from './FilterTabs';
export type { FilterTabsProps } from './FilterTabs';

export { StatusTabs } from './StatusTabs';
export type { StatusTabsProps } from './StatusTabs';

export { ClientCard } from './ClientCard';
export { ClientStatusCard } from './ClientStatusCard';
export { ClientDetailedCard } from './ClientDetailedCard';
export { ClientCardSkeleton } from './ClientCardSkeleton';
export { ClientProfileHeader } from './ClientProfileHeader';
export { CollapsibleTableCard } from './CollapsibleTableCard';
export { OngoingTaskCard } from './OngoingTaskCard';
export type {
  ClientCardProps,
  ClientTag,
  ClientTagType,
  ClientStatusCardProps,
  ClientDetailedCardProps,
  ClientStatusRow,
} from '@/types/components.types';

export { GettingThingsReady } from './GettingThingsReady';
export { LoadingRing } from './LoadingRing';

export { ApplicationNotApprovedMessage } from './ApplicationNotApprovedMessage/ApplicationNotApprovedMessage';
export { WhyNotApprovedInfo } from './WhyNotApprovedInfo/WhyNotApprovedInfo';
export { RequestAccessHeader } from './RequestAccessHeader';
export { RequestAccessStatus } from './RequestAccessStatus';

export { StatusDot } from './StatusDot';
export { BookingConfirmHeader } from './BookingConfirmHeader';
export { ScreenHeader } from './ScreenHeader';
export type { ScreenHeaderProps } from './ScreenHeader';
export { LiquidFooter } from './LiquidFooter';
export { AnimatedProgressBar } from './AnimatedProgressBar';
export { default as ConfirmModal } from './ConfirmModal';
export type { ConfirmModalProps } from './ConfirmModal/ConfirmModal.types';
export { VerticalStepper } from './VerticalStepper';
export { QuickNudges } from './clients/QuickNudges';
export { SquareCheckbox } from './SquareCheckbox';
export { default as AddSessionsModal } from './AddSessionsModal';
export type {
  VerticalStepperProps,
  VerticalStepperStep,
  AddSessionsModalValues,
} from '@/types/components.types';
