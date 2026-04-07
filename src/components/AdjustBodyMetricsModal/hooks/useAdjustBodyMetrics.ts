import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  AdjustBodyMetricsModalProps,
  BodyMetricsValues,
} from '../AdjustBodyMetricsModal.types';
import { bodyMetricsSchema } from '../AdjustBodyMetricsModal.utils';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAdjustBodyMetrics = ({
  visible,
  initialValues,
  onUpdate,
  onClose,
}: AdjustBodyMetricsModalProps) => {
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
