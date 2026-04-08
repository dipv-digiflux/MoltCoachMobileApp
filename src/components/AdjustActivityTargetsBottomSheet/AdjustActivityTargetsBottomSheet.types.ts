import type { SessionActivity } from '@/types/components.types';

export interface AdjustActivityTargetsBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  initialValues?: {
    dailySteps?: string;
    workoutsPerWeek?: string;
    waterIntake?: string;
    sleepTarget?: string;
  };
  recentActivities?: SessionActivity[];
  onSave?: (values: {
    dailySteps: string;
    workoutsPerWeek: string;
    waterIntake: string;
    sleepTarget: string;
  }) => void;
}
