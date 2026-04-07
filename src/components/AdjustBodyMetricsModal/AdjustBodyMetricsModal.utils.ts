import { z } from 'zod';

export const bodyMetricsSchema = z.object({
  height: z.string().min(1, 'Required'),
  bodyFat: z.string().min(1, 'Required'),
  muscleMass: z.string().min(1, 'Required'),
  restingHR: z.string().min(1, 'Required'),
});
