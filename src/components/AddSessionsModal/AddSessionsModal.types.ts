import React from 'react';
import { UseFormReturn, UseFormWatch } from 'react-hook-form';

import { AddSessionsModalValues } from '@/types/components.types';

export interface AddSessionsHook {
  isDatePickerVisible: boolean;
  setIsDatePickerVisible: React.Dispatch<React.SetStateAction<boolean>>;
  control: UseFormReturn<AddSessionsModalValues>['control'];
  handleSubmit: UseFormReturn<AddSessionsModalValues>['handleSubmit'];
  mode: 'Online' | 'Physical (In-person)';
  setValue: UseFormReturn<AddSessionsModalValues>['setValue'];
  errors: UseFormReturn<AddSessionsModalValues>['formState']['errors'];
  handleUpdate: (data: AddSessionsModalValues) => void;
  watch: UseFormWatch<AddSessionsModalValues>;
}
