export interface DeleteTaskBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  onDelete: () => void;
  taskTitle?: string;
}
