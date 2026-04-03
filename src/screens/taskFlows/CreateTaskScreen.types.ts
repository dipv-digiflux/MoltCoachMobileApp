import { z } from 'zod';

export const CreateTaskSchema = z
  .object({
    taskName: z.string().min(1, 'Task name is required'),
    taskType: z.enum(['Repeat task', 'One-time task']),
    frequency: z.enum(['Daily', 'Weekly', 'Monthly', 'Quarterly']),
    selectedDays: z.array(z.string()),
    reminderEnabled: z.boolean(),
    reminderTime: z.string(),
  })
  .refine(
    data => {
      if (data.taskType === 'Repeat task' && data.frequency === 'Weekly') {
        return data.selectedDays.length > 0;
      }
      return true;
    },
    {
      message: 'Please select at least one day',
      path: ['selectedDays'],
    },
  );

export type CreateTaskFormValues = z.infer<typeof CreateTaskSchema>;

export const SUGGESTIONS = [
  'Morning stretching',
  'Take Vitamin D',
  'Morning meditation',
];

export const DAYS = [
  { label: 'M', value: 'Mon' },
  { label: 'T', value: 'Tue' },
  { label: 'W', value: 'Wed' },
  { label: 'T', value: 'Thu' },
  { label: 'F', value: 'Fri' },
  { label: 'S', value: 'Sat' },
  { label: 'S', value: 'Sun' },
];

export const TASK_TYPES = ['Repeat task', 'One-time task'] as const;
export const FREQUENCIES = ['Daily', 'Weekly', 'Monthly', 'Quarterly'] as const;
