import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  AddSessionsModalProps,
  AddSessionsModalValues,
} from '@/types/components.types';

import { AddSessionsHook } from '../AddSessionsModal.types';
import { sessionsSchema } from '../AddSessionsModal.utils';

export const useAddSessions = (
  props: Pick<
    AddSessionsModalProps,
    'visible' | 'initialValues' | 'onUpdate' | 'onClose' | 'recentActivity'
  >,
): AddSessionsHook => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AddSessionsModalValues>({
    resolver: zodResolver(sessionsSchema),
    defaultValues: {
      mode: 'Online',
      ...props.initialValues,
    },
  });

  const mode = watch('mode');

  useEffect(() => {
    if (props.visible) {
      reset({
        mode: 'Online',
        ...props.initialValues,
      });
    }
  }, [props.visible, props.initialValues, reset]);

  const handleUpdate = (data: AddSessionsModalValues): void => {
    props.onUpdate(data);
    props.onClose();
  };

  return {
    isDatePickerVisible,
    setIsDatePickerVisible,
    control,
    handleSubmit,
    mode,
    setValue,
    errors,
    handleUpdate,
    watch,
    recentActivity: props.recentActivity,
  };
};
