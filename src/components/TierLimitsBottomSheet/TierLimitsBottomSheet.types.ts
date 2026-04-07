export interface TierLimitsBottomSheetProps {
  /**
   * Whether the bottom sheet is visible
   */
  visible: boolean;
  /**
   * Current active tier name
   */
  currentTier?: string;
  /**
   * Callback when the bottom sheet closes
   */
  onClose: () => void;
}

export interface TierData {
  id: string;
  name: string;
  credits: string;
  limit: string;
  iconBgColor: string;
  iconColor: string;
}
