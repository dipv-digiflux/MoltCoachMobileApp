import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  AdjustBodyMetricsBottomSheetProps,
  BodyMetricsValues,
  UseAdjustBodyMetricsReturn,
} from '../AdjustBodyMetricsBottomSheet.types';
import { bodyMetricsSchema } from '../AdjustBodyMetricsBottomSheet.utils';

export const useAdjustBodyMetrics = ({
  visible,
  initialValues,
  onUpdate,
  onClose,
}: AdjustBodyMetricsBottomSheetProps): UseAdjustBodyMetricsReturn => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BodyMetricsValues>({
    resolver: zodResolver(bodyMetricsSchema),
    defaultValues: {
      height: initialValues?.height || '',
      bodyFat: initialValues?.bodyFat || '',
      muscleMass: initialValues?.muscleMass || '',
      restingHR: initialValues?.restingHR || '',
    },
  });

  useEffect(() => {
    if (visible) {
      reset({
        height: initialValues?.height || '',
        bodyFat: initialValues?.bodyFat || '',
        muscleMass: initialValues?.muscleMass || '',
        restingHR: initialValues?.restingHR || '',
      });
    }
  }, [visible, initialValues, reset]);

  const handleUpdate = (data: BodyMetricsValues): void => {
    onUpdate?.(data);
    onClose();
  };

  return {
    control,
    handleSubmit,
    errors,
    handleUpdate,
  };
};
