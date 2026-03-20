import { Control, FieldErrors } from 'react-hook-form';

import { AddClientFormValues } from '../../utils/addClientSchema.types';

export const SESSION_TYPE_KEYS = [
  'addSessionsPackageOnline',
  'addSessionsPackagePhysical',
] as const;

export type SessionTypeId = (typeof SESSION_TYPE_KEYS)[number];

export interface AddSessionsPackageContainerProps {
  control: Control<AddClientFormValues>;
  errors: FieldErrors<AddClientFormValues>;
  /** When true, shows the sessions toggle next to the title. @default true */
  showToggle?: boolean;
}
