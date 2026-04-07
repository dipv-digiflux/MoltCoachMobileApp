export interface BankActionsBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  bankName: string;
  accountMask: string;
  isPrimary: boolean;
  onSetPrimary: () => void;
  onRemove: () => void;
}
