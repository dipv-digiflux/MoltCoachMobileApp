/**
 * Typography theme: headings H0–H10, H1–H8, body B1, Body small 1–3.
 * Every token has four weights: regular (400), medium (500), semiBold (600), bold (700).
 *
 * Font sizes and line heights are pre-scaled via `fontScale` / `lineHeightScale`
 * — consumers do NOT need to call any scaling function for typography.
 *
 * @example
 * // Variants: H1-Bold, H1-SemiBold, H1-Medium, H1-Regular
 * <Text style={typography.h1Bold}>H1 Bold</Text>
 * <Text style={typography.h1SemiBold}>H1 SemiBold</Text>
 * <Text style={typography.h1Medium}>H1 Medium</Text>
 * <Text style={typography.h1Regular}>H1 Regular</Text>
 *
 * @example
 * // Body and small body
 * <Text style={typography.b1Regular}>Body 16px</Text>
 * <Text style={typography.bodySmall1Regular}>Body small 1</Text>
 */
import { fontScale, lineHeightScale } from './scaling';

export const fontFamily = {
  inter: 'Inter',
  interRegular: 'Inter-Regular',
  interMedium: 'Inter-Medium',
  interSemiBold: 'Inter-SemiBold',
  interBold: 'Inter-Bold',
  interBlack: 'Inter-Black',
} as const;

export const typographyTokens = {
  h1: {
    fontSize: fontScale(40),
    lineHeight: lineHeightScale(48),
    letterSpacing: 0,
  },
  h2: {
    fontSize: fontScale(38),
    lineHeight: lineHeightScale(46),
    letterSpacing: 0,
  },
  h3: {
    fontSize: fontScale(36),
    lineHeight: lineHeightScale(42),
    letterSpacing: 0,
  },
  h4: {
    fontSize: fontScale(32),
    lineHeight: lineHeightScale(38),
    letterSpacing: 0,
  },
  h5: {
    fontSize: fontScale(30),
    lineHeight: lineHeightScale(36),
    letterSpacing: 0,
  },
  h6: {
    fontSize: fontScale(28),
    lineHeight: lineHeightScale(34),
    letterSpacing: 0,
  },
  h7: {
    fontSize: fontScale(24),
    lineHeight: lineHeightScale(28),
    letterSpacing: 0,
  },
  h8: {
    fontSize: fontScale(22),
    lineHeight: lineHeightScale(26),
    letterSpacing: 0,
  },
  h0: {
    fontSize: fontScale(20),
    lineHeight: lineHeightScale(24),
    letterSpacing: 0,
  },
  h10: {
    fontSize: fontScale(18),
    lineHeight: lineHeightScale(22),
    letterSpacing: 0,
  },
  b1: {
    fontSize: fontScale(16),
    lineHeight: lineHeightScale(20),
    letterSpacing: 0,
  },
  bodySmall1: {
    fontSize: fontScale(14),
    lineHeight: lineHeightScale(16),
    letterSpacing: 0,
    verticalAlign: 'middle',
  },
  bodySmall2: {
    fontSize: fontScale(12),
    lineHeight: lineHeightScale(16),
    letterSpacing: 0,
    verticalAlign: 'middle',
  },
  bodySmall3: {
    fontSize: fontScale(10),
    lineHeight: lineHeightScale(12),
    letterSpacing: 0,
  },
  bodySmall4: {
    fontSize: fontScale(13),
    lineHeight: lineHeightScale(16), // 120% of 13px (rounded)
    letterSpacing: 0,
    verticalAlign: 'middle',
  },
  b2: {
    fontSize: fontScale(15),
    lineHeight: lineHeightScale(18), // 120% of 15px
    letterSpacing: 0,
  },
} as const;

const withWeights = (
  token: (typeof typographyTokens)[keyof typeof typographyTokens],
) =>
  ({
    regular: { ...token, fontFamily: fontFamily.interRegular },
    medium: { ...token, fontFamily: fontFamily.interMedium },
    semiBold: { ...token, fontFamily: fontFamily.interSemiBold },
    bold: { ...token, fontFamily: fontFamily.interBold },
  } as const);

export const typographyByWeight = {
  h1: withWeights(typographyTokens.h1),
  h2: withWeights(typographyTokens.h2),
  h3: withWeights(typographyTokens.h3),
  h4: withWeights(typographyTokens.h4),
  h5: withWeights(typographyTokens.h5),
  h6: withWeights(typographyTokens.h6),
  h7: withWeights(typographyTokens.h7),
  h8: withWeights(typographyTokens.h8),
  h0: withWeights(typographyTokens.h0),
  h10: withWeights(typographyTokens.h10),
  b1: withWeights(typographyTokens.b1),
  bodySmall1: withWeights(typographyTokens.bodySmall1),
  bodySmall2: withWeights(typographyTokens.bodySmall2),
  bodySmall3: withWeights(typographyTokens.bodySmall3),
  bodySmall4: withWeights(typographyTokens.bodySmall4),
  b2: withWeights(typographyTokens.b2),
} as const;

export const typography = {
  h1Bold: typographyByWeight.h1.bold,
  h1SemiBold: typographyByWeight.h1.semiBold,
  h1Medium: typographyByWeight.h1.medium,
  h1Regular: typographyByWeight.h1.regular,
  h2Bold: typographyByWeight.h2.bold,
  h2SemiBold: typographyByWeight.h2.semiBold,
  h2Medium: typographyByWeight.h2.medium,
  h2Regular: typographyByWeight.h2.regular,
  h3Bold: typographyByWeight.h3.bold,
  h3SemiBold: typographyByWeight.h3.semiBold,
  h3Medium: typographyByWeight.h3.medium,
  h3Regular: typographyByWeight.h3.regular,
  h4Bold: typographyByWeight.h4.bold,
  h4SemiBold: typographyByWeight.h4.semiBold,
  h4Medium: typographyByWeight.h4.medium,
  h4Regular: typographyByWeight.h4.regular,
  h5Bold: typographyByWeight.h5.bold,
  h5SemiBold: typographyByWeight.h5.semiBold,
  h5Medium: typographyByWeight.h5.medium,
  h5Regular: typographyByWeight.h5.regular,
  h6Bold: typographyByWeight.h6.bold,
  h6SemiBold: typographyByWeight.h6.semiBold,
  h6Medium: typographyByWeight.h6.medium,
  h6Regular: typographyByWeight.h6.regular,
  h7Bold: typographyByWeight.h7.bold,
  h7SemiBold: typographyByWeight.h7.semiBold,
  h7Medium: typographyByWeight.h7.medium,
  h7Regular: typographyByWeight.h7.regular,
  h8Bold: typographyByWeight.h8.bold,
  h8SemiBold: typographyByWeight.h8.semiBold,
  h8Medium: typographyByWeight.h8.medium,
  h8Regular: typographyByWeight.h8.regular,
  h0Bold: typographyByWeight.h0.bold,
  h0SemiBold: typographyByWeight.h0.semiBold,
  h0Medium: typographyByWeight.h0.medium,
  h0Regular: typographyByWeight.h0.regular,
  h10Bold: typographyByWeight.h10.bold,
  h10SemiBold: typographyByWeight.h10.semiBold,
  h10Medium: typographyByWeight.h10.medium,
  h10Regular: typographyByWeight.h10.regular,
  b1Bold: typographyByWeight.b1.bold,
  b1SemiBold: typographyByWeight.b1.semiBold,
  b1Medium: typographyByWeight.b1.medium,
  b1Regular: typographyByWeight.b1.regular,
  bodySmall1Bold: typographyByWeight.bodySmall1.bold,
  bodySmall1SemiBold: typographyByWeight.bodySmall1.semiBold,
  bodySmall1Medium: typographyByWeight.bodySmall1.medium,
  bodySmall1Regular: typographyByWeight.bodySmall1.regular,
  bodySmall2Bold: typographyByWeight.bodySmall2.bold,
  bodySmall2SemiBold: typographyByWeight.bodySmall2.semiBold,
  bodySmall2Medium: typographyByWeight.bodySmall2.medium,
  bodySmall2Regular: typographyByWeight.bodySmall2.regular,
  bodySmall3Bold: typographyByWeight.bodySmall3.bold,
  bodySmall3SemiBold: typographyByWeight.bodySmall3.semiBold,
  bodySmall3Medium: typographyByWeight.bodySmall3.medium,
  bodySmall3Regular: typographyByWeight.bodySmall3.regular,
  bodySmall4Bold: typographyByWeight.bodySmall4.bold,
  bodySmall4SemiBold: typographyByWeight.bodySmall4.semiBold,
  bodySmall4Medium: typographyByWeight.bodySmall4.medium,
  bodySmall4Regular: typographyByWeight.bodySmall4.regular,
  b2Bold: typographyByWeight.b2.bold,
  b2SemiBold: typographyByWeight.b2.semiBold,
  b2Medium: typographyByWeight.b2.medium,
  b2Regular: typographyByWeight.b2.regular,
  // ── Tags ────────────────────────────────────────────────
  tagLabel: typographyByWeight.bodySmall2.medium,
} as const;

export type FontFamily = (typeof fontFamily)[keyof typeof fontFamily];
export type TypographyTokenName = keyof typeof typographyTokens;
export type TypographyWeight = keyof (typeof typographyByWeight)['h1'];
export type TypographyToken = keyof typeof typography;
