import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

export const accessRequestSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\d{9}$/, 'Phone number must be exactly 9 digits'),
});

export type AccessRequestFormData = z.infer<typeof accessRequestSchema>;

export interface RequestAccessHook {
  control: UseFormReturn<AccessRequestFormData>['control'];
  handleSubmit: UseFormReturn<AccessRequestFormData>['handleSubmit'];
  errors: UseFormReturn<AccessRequestFormData>['formState']['errors'];
  isLoading: boolean;
  handleLogout: () => Promise<void>;
  handleBookCall: (data: AccessRequestFormData) => Promise<void>;
}
