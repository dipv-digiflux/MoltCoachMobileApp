/**
 * Props for ImportContactsButtonGroup.
 * Component-specific; used only by this onboarding block.
 */
export interface ImportContactsButtonGroupProps {
  /** Called when the user taps "Allow Access". */
  onAllowAccess?: () => void;
  /** Called when the user taps "Not Now". */
  onNotNow?: () => void;
}
