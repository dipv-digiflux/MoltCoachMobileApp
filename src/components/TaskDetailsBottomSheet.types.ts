import { TaskItemProps } from './TaskItem.types';

export interface TaskDetailsBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  date: string;
  tasks: TaskItemProps[];
  onToggleTask?: (taskName: string) => void;
  onNudge?: () => void;
}
