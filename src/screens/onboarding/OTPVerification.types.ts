import { z } from 'zod';

export const OTP_LENGTH = 4;

export const otpSchema = z.object({
  otp: z
    .string()
    .length(OTP_LENGTH, `Enter ${OTP_LENGTH} digit code`)
    .regex(/^\d+$/, 'Code must be digits only'),
});

export type OTPFormData = z.infer<typeof otpSchema>;
