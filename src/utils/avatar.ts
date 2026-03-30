/**
 * Extracts initials from a name string.
 * e.g. "Harsh" -> "H", "Dipendra Mahida" -> "DM"
 */
export const getInitials = (name: string): string => {
  if (!name) return '';

  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '';

  if (parts.length === 1) {
    return parts[0].substring(0, 1).toUpperCase();
  }

  const firstInitial = parts[0].substring(0, 1);
  const lastInitial = parts[parts.length - 1].substring(0, 1);

  return (firstInitial + lastInitial).toUpperCase();
};
