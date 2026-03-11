import { z } from 'zod';

export const exampleSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  password: z.string().min(8, 'At least 8 characters'),
});

export type ExampleFormData = z.infer<typeof exampleSchema>;
