import { SessionActivity } from '@/types/components.types';

export interface BodyMetricsValues {
  height: string;
  bodyFat: string;
  muscleMass: string;
  restingHR: string;
}

export interface AdjustBodyMetricsModalProps {
  visible: boolean;
  onClose: () => void;
  onUpdate: (values: BodyMetricsValues) => void;
  initialValues?: Partial<BodyMetricsValues>;
  clientName?: string;
  recentActivity?: SessionActivity[];
}
