export interface TimeSelectionBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (time: string) => void;
  initialValue: string;
  title?: string;
}
