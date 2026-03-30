import { z } from 'zod';

import { addedClientsSchema } from './addedClientsSchema';

export type AddedClientsFormValues = z.infer<typeof addedClientsSchema>;
