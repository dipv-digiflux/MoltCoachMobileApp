export interface OngoingTaskCardProps {
  title: string;
  subtitle: string;
  onEdit?: () => void;
  onDelete?: () => void;
}
