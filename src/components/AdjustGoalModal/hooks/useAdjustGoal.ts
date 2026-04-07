import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  AdjustGoalModalProps,
  AdjustGoalValues,
} from '../AdjustGoalModal.types';
import { adjustGoalSchema } from '../AdjustGoalModal.utils';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAdjustGoal = ({
  visible,
  initialValues,
  onUpdate,
  onClose,
}: AdjustGoalModalProps) => {
  const [isGoalPickerVisible, setIsGoalPickerVisible] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<AdjustGoalValues>({
    resolver: zodResolver(adjustGoalSchema),
    defaultValues: {
      primaryGoal: initialValues?.primaryGoal || '',
      timeline: initialValues?.timeline || '',
      startingWeight: initialValues?.startingWeight || '',
      currentWeight: initialValues?.currentWeight || '',
    },
  });

  useEffect(() => {
    if (visible) {
      reset({
        primaryGoal: initialValues?.primaryGoal || '',
        timeline: initialValues?.timeline || '',
        startingWeight: initialValues?.startingWeight || '',
        currentWeight: initialValues?.currentWeight || '',
      });
    }
  }, [visible, initialValues, reset]);

  const handleUpdate = (data: AdjustGoalValues): void => {
    onUpdate?.(data);
    onClose();
  };

  return {
    control,
    handleSubmit,
    setValue,
    watch,
    errors,
    handleUpdate,
    isGoalPickerVisible,
    setIsGoalPickerVisible,
  };
};
