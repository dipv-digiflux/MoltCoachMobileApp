import { z } from 'zod';

export const accessRequestSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .min(10, 'Phone number must be at least 10 digits'),
});

export type AccessRequestFormData = z.infer<typeof accessRequestSchema>;
