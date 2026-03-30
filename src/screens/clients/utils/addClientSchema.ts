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
  'High Output',
  'Get Stronger',
  'Moderate Activity',
  'Sedentary',
  'Lightly Active',
  'Athlete Mode',
]);

export const GoalSchema = z.enum([
  'Build Muscle',
  'Burn Fat',
  'Performance',
  'Maintain',
]);

export const AddClientSchema = z
  .object({
    clientType: AddClientFilterTabSchema,
    name: z.string().optional(),
    phone: z.string().length(9, 'Phone number must be 9 digits'),
    sessionsEnabled: z.boolean(),
    healthEnabled: z.boolean(),
    sessions: z.object({
      type: SessionTypeSchema,
      total: z.string().optional(), // Number of months or total sessions
      left: z.string().optional(), // Sessions left or empty for online
      startDate: z.string().optional(),
    }),
    health: z.object({
      sex: SexSchema,
      dob: z.string().optional(),
      height: z.string().optional(),
      weight: z.string().optional(),
      activity: ActivityLevelSchema,
      goal: GoalSchema,
      conditions: z.string().optional(),
    }),
  })
  .superRefine((data, ctx) => {
    // If Existing Client, sessions must be enabled
    if (data.clientType === 'addClientFilterExistingClient') {
      if (!data.name || data.name.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Name is required',
          path: ['name'],
        });
      }
      if (!data.sessionsEnabled) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Sessions are required for existing clients',
          path: ['sessionsEnabled'],
        });
      }
      // Health data is now optional for both Client and Lead as per requirement
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
