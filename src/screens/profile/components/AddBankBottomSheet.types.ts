export interface AddBankBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (data: AddBankData) => void;
}

export interface AddBankData {
  bankName: string;
  accountHolderName: string;
  iban: string;
  isDefault: boolean;
}
