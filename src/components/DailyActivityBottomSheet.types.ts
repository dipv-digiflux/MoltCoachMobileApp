export interface DailyActivityBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  initialValue?: string;
  onSelect: (value: string) => void;
}
