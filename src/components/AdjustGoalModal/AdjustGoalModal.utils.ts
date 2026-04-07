import { z } from 'zod';

export const adjustGoalSchema = z.object({
  primaryGoal: z.string().min(1, 'Required'),
  timeline: z.string().min(1, 'Required'),
  startingWeight: z.string().min(1, 'Required'),
  currentWeight: z.string().min(1, 'Required'),
});
