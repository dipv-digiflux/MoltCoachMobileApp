export interface QuickActionsBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  onChangeFitnessPhase?: () => void;
  onChangeSessions?: () => void;
  onDeleteUser?: () => void;
}
