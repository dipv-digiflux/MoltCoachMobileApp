import { z } from 'zod';

export const getStartedSchema = z
  .object({
    inputValue: z.string().min(1, 'Required'),
  })
  .superRefine((data, ctx) => {
    const value = data.inputValue.trim();
    const isPhoneInput = (val: string): boolean => {
      const trimmed = val.trim();
      if (!trimmed) return false;
      return /^\d+$/.test(trimmed);
    };

    if (isPhoneInput(value)) {
      if (value.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['inputValue'],
          message: 'Phone number must be at least 8 digits',
        });
      }
    } else {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['inputValue'],
          message: 'Invalid email',
        });
      }
    }
  });

export type GetStartedFormData = z.infer<typeof getStartedSchema>;
