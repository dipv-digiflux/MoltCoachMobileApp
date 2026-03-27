import { z } from 'zod';

import { AddClientSchema } from './addClientSchema';

export type AddClientFormValues = z.infer<typeof AddClientSchema>;

export const defaultAddClientValues: AddClientFormValues = {
  clientType: 'addClientFilterExistingClient',
  name: '',
  phone: '',
  sessionsEnabled: true,
  healthEnabled: true,
  sessions: {
    type: 'addSessionsPackageOnline',
    total: '',
    left: '',
    startDate: undefined,
  },
  health: {
    sex: 'sexFemale',
    dob: undefined,
    height: '',
    weight: '',
    activity: 'Moderate Activity',
    goal: 'Burn Fat',
    conditions: '',
  },
};
