import { z } from 'zod';

export const CreateTaskSchema = z
  .object({
    taskName: z.string().min(1, 'Task name is required'),
    taskType: z.enum(['Repeat task', 'One-time task']),
    frequency: z.enum(['Daily', 'Weekly', 'Monthly', 'Quarterly']),
    selectedDays: z.array(z.string()),
    monthlyDay: z.string().optional(),
    quarterlyDate: z.string().optional(),
    oneTimeDate: z.string().optional(),
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

export const DAY_MAPPING: Record<string, string> = {
  Mon: 'monday',
  Tue: 'tuesday',
  Wed: 'wednesday',
  Thu: 'thursday',
  Fri: 'friday',
  Sat: 'saturday',
  Sun: 'sunday',
};

export const INVERSE_DAY_MAPPING: Record<string, string> = {
  monday: 'Mon',
  tuesday: 'Tue',
  wednesday: 'Wed',
  thursday: 'Thu',
  friday: 'Fri',
  saturday: 'Sat',
  sunday: 'Sun',
};
