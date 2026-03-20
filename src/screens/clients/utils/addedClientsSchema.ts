import { z } from 'zod';

export const addedClientsContactSchema = z
  .object({
    recordID: z.string(),
    name: z.string(),
    phoneNumber: z.string(),
    thumbnailPath: z.string().optional(),
    relationship: z.enum(['Lead', 'Client']),
    addSessions: z.boolean(),
    sessionType: z.enum(['Online', 'Physical']),
    months: z.string().optional(),
    startDate: z.string().optional(),
    totalSessions: z.string().optional(),
    sessionsLeft: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const isRequired = data.relationship === 'Client' || data.addSessions;
    if (!isRequired) return;

    if (data.sessionType === 'Online') {
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

export const addedClientsSchema = z.object({
  contacts: z.array(addedClientsContactSchema),
});
