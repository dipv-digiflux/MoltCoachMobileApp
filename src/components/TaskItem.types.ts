export interface TaskItemProps {
  name: string;
  description: string;
  completed: boolean;
  onToggle?: (completed: boolean) => void;
  style?: any;
}
