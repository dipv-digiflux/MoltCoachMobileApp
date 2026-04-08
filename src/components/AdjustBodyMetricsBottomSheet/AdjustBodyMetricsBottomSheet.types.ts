import type { SessionActivity } from '@/types/components.types';
import type { UseFormReturn } from 'react-hook-form';

export interface BodyMetricsValues {
  height: string;
  bodyFat: string;
  muscleMass: string;
  restingHR: string;
}

export interface AdjustBodyMetricsBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onUpdate: (values: BodyMetricsValues) => void;
  initialValues?: Partial<BodyMetricsValues>;
  clientName?: string;
  recentActivity?: SessionActivity[];
}

export interface UseAdjustBodyMetricsReturn {
  control: UseFormReturn<BodyMetricsValues>['control'];
  handleSubmit: UseFormReturn<BodyMetricsValues>['handleSubmit'];
  errors: UseFormReturn<BodyMetricsValues>['formState']['errors'];
  handleUpdate: (data: BodyMetricsValues) => void;
}
