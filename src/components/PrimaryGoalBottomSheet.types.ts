export interface PrimaryGoalBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  initialValue?: string;
  onSelect: (value: string) => void;
}
