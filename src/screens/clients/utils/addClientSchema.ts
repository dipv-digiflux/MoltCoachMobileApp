import { z } from 'zod';

export const AddClientFilterTabSchema = z.enum([
  'addClientFilterExistingClient',
  'addClientFilterPotentialLead',
]);

export const SessionTypeSchema = z.enum([
  'addSessionsPackageOnline',
  'addSessionsPackagePhysical',
]);

export const SexSchema = z.enum(['sexFemale', 'sexMale', 'sexOther']);

export const ActivityLevelSchema = z.enum([
  'activityNotActive',
  'activityLight',
  'activityModerate',
  'activityVery',
  'activityExtra',
]);

export const GoalSchema = z.enum([
  'goalFatLoss',
  'goalMuscleGain',
  'goalMaintenance',
  'goalPerformance',
]);

export const AddClientSchema = z
  .object({
    clientType: AddClientFilterTabSchema,
    name: z.string().min(1, 'Name is required'),
    phone: z.string().min(1, 'Phone number is required'),
    sessionsEnabled: z.boolean(),
    healthEnabled: z.boolean(),
    sessions: z.object({
      type: SessionTypeSchema,
      total: z.string(), // Number of months or total sessions
      left: z.string(), // Sessions left or empty for online
      startDate: z.string().optional(),
    }),
    health: z.object({
      sex: SexSchema,
      dob: z.string().optional(),
      height: z.string(),
      weight: z.string(),
      activity: ActivityLevelSchema,
      goal: GoalSchema,
      conditions: z.string(),
    }),
  })
  .superRefine((data, ctx) => {
    // If Existing Client, sessions and health must be enabled
    if (data.clientType === 'addClientFilterExistingClient') {
      if (!data.sessionsEnabled) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Sessions are required for existing clients',
          path: ['sessionsEnabled'],
        });
      }
      if (!data.healthEnabled) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Health data is required for existing clients',
          path: ['healthEnabled'],
        });
      }
    }

    // Validate sessions if enabled
    if (data.sessionsEnabled) {
      if (!data.sessions.total || data.sessions.total === '0') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['sessions', 'total'],
        });
      }
      if (
        data.sessions.type === 'addSessionsPackagePhysical' &&
        !data.sessions.left
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['sessions', 'left'],
        });
      }
      if (
        data.sessions.type === 'addSessionsPackageOnline' &&
        !data.sessions.startDate
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['sessions', 'startDate'],
        });
      }
    }

    // Validate health if enabled
    if (data.healthEnabled) {
      if (!data.health.height) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['health', 'height'],
        });
      }
      if (!data.health.weight) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['health', 'weight'],
        });
      }
      if (!data.health.dob) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['health', 'dob'],
        });
      }
    }
  });
