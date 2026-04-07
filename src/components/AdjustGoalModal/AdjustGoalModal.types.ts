import { SessionActivity } from '@/types/components.types';

export interface AdjustGoalValues {
  primaryGoal: string;
  timeline: string;
  startingWeight: string;
  currentWeight: string;
}

export interface AdjustGoalModalProps {
  visible: boolean;
  onClose: () => void;
  clientName: string;
  recentActivity?: SessionActivity[];
  initialValues?: Partial<AdjustGoalValues>;
  onUpdate?: (values: AdjustGoalValues) => void;
}
