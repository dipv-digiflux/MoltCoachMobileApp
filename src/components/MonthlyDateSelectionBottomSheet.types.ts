export interface MonthlyDateSelectionBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (date: { month: string; day: string; year: string }) => void;
  initialValue?: { month: string; day: string; year: string };
  title?: string;
}
