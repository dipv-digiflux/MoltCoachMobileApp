import { Control, FieldErrors } from 'react-hook-form';

import { AddClientFormValues } from '../../utils/addClientSchema.types';

export interface AddHealthFitnessDataContainerProps {
  control: Control<AddClientFormValues>;
  errors: FieldErrors<AddClientFormValues>;
  showToggle?: boolean;
}
