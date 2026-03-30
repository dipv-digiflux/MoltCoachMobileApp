export interface AnimatedProgressBarProps {
  duration: number;
  onComplete?: () => void;
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
}
