/**
 * Formats a full name by combining first and last names and capitalizing the first character of each word.
 * e.g. "alex" "patel" -> "Alex Patel"
 */
export const formatFullName = (
  firstName?: string,
  lastName?: string,
): string => {
  const full = `${firstName || ''} ${lastName || ''}`.trim();
  if (!full) return '';

  return full
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Capitalizes only the very first character of a string.
 */
export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
