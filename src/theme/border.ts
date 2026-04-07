export const borderWidth = {
  /** Standard hairline border width (1px). */
  hairline: 1,
  /** Medium border width for emphasis (1.5px). */
  medium: 1.5,
} as const;

export type BorderWidthToken = keyof typeof borderWidth;
