import { z } from 'zod';

export const sessionsSchema = z
  .object({
    mode: z.enum(['Online', 'Physical (In-person)']),
    months: z.string().optional(),
    startDate: z.string().optional(),
    totalSessions: z.string().optional(),
    sessionsLeft: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.mode === 'Online') {
      if (!data.months || data.months.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['months'],
        });
      }
      if (!data.startDate || data.startDate.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['startDate'],
        });
      }
    } else {
      if (!data.totalSessions || data.totalSessions.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['totalSessions'],
        });
      }
      if (!data.sessionsLeft || data.sessionsLeft.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['sessionsLeft'],
        });
      }
    }
  });

export const formatDateLabel = (dateStr?: string): string => {
  if (!dateStr || dateStr.trim() === '') return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};
