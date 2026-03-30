export interface SavedAccountCardProps {
  bankName: string;
  accountMask: string;
  isPrimary?: boolean;
  onPress?: () => void;
  onPressMenu?: () => void;
}
