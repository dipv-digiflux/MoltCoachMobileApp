export const borderWidth = {
  /** Standard hairline border width (1px). */
  hairline: 1,
} as const;

export type BorderWidthToken = keyof typeof borderWidth;
