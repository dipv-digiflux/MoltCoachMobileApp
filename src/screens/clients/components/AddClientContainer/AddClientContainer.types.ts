import { Control, FieldErrors } from 'react-hook-form';

import { AddClientFormValues } from '../../utils/addClientSchema.types';

export interface AddClientContainerProps {
  control: Control<AddClientFormValues>;
  errors: FieldErrors<AddClientFormValues>;
}
