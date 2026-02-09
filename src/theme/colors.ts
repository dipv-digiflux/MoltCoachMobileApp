export const colors = {
  PrimaryMain: '#101610',
  PrimarySecond: '#585C58',
  StatesOutline: '#EBEBEB',
  StatesDivider: '#F3F3F3',
  StatesFill1: '#F5F6F5',
  StatesFill2: '#FDFDFD',
  StatesWhite: '#FFFFFF',
  MatrixMain: '#159945',
} as const;

export type ColorToken = keyof typeof colors;
