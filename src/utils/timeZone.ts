/**
 * Timezone utility functions.
 * All helpers accept an optional IANA timezone string (e.g. "Asia/Dubai").
 * When omitted, the DEFAULT_TIMEZONE is used (or local timezone if DEFAULT_TIMEZONE is undefined).
 *
 * To switch between Dubai and local timezone:
 * - Set DEFAULT_TIMEZONE to "Asia/Dubai" for Dubai (default)
 * - Set DEFAULT_TIMEZONE to undefined for local device timezone
 */
const DEFAULT_TIMEZONE: string | undefined = 'Asia/Dubai';
// To use local timezone instead, change the line above to:
// const DEFAULT_TIMEZONE: string | undefined = undefined;

export const getLocalTimeZone = (): string =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

const resolveTimeZone = (timeZone?: string): string => {
  // If no timezone provided, use DEFAULT_TIMEZONE or fall back to local
  const targetTimeZone = timeZone ?? DEFAULT_TIMEZONE ?? getLocalTimeZone();

  try {
    // Validate IANA timezone; invalid values throw.
    new Intl.DateTimeFormat('en-US', { timeZone: targetTimeZone });
    return targetTimeZone;
  } catch {
    return getLocalTimeZone();
  }
};

const parseFormattedPartsToDate = (
  formatter: Intl.DateTimeFormat,
  date: Date,
): Date => {
  const parts = formatter.formatToParts(date);
  const datePartMap = parts.reduce<Record<string, string>>((acc, part) => {
    if (part.type !== 'literal') {
      acc[part.type] = part.value;
    }
    return acc;
  }, {});

  const year = Number(datePartMap.year);
  const month = Number(datePartMap.month);
  const day = Number(datePartMap.day);
  const hour = Number(datePartMap.hour);
  const minute = Number(datePartMap.minute);
  const second = Number(datePartMap.second);

  return new Date(year, month - 1, day, hour, minute, second);
};

/**
 * Gets current date in a target timezone.
 *
 * @param timeZone - Optional IANA timezone.
 */
export const getNowInTimeZone = (timeZone?: string): Date =>
  toTimeZoneDate(new Date(), timeZone);

/**
 * Converts a date to a target timezone date representation.
 *
 * @param date - Date to convert.
 * @param timeZone - Optional IANA timezone.
 */
export const toTimeZoneDate = (date: Date, timeZone?: string): Date => {
  const targetTimeZone = resolveTimeZone(timeZone);
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: targetTimeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return parseFormattedPartsToDate(formatter, date);
};

/**
 * Formats weekday short name and day number in a target timezone.
 *
 * @param date - Date to format.
 * @param timeZone - Optional IANA timezone.
 */
export const formatDayTextContainer = (
  date: Date,
  timeZone?: string,
): {
  dayName: string;
  dayNumber: number;
} => {
  const targetTimeZone = resolveTimeZone(timeZone);
  const dayName = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    timeZone: targetTimeZone,
  }).format(date);
  const dayNumber = Number(
    new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      timeZone: targetTimeZone,
    }).format(date),
  );

  return {
    dayName,
    dayNumber,
  };
};
