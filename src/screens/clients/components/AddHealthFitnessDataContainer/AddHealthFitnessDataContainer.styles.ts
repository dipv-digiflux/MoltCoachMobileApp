import { StyleSheet } from 'react-native';

import { colors, moderateScale, radius, spacing, typography } from '@/theme';

const FORM_BG = colors.SurfaceSearchBackground;

export const styles = StyleSheet.create({
  outer: {
    padding: spacing['Spacing-4xl'],
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    borderRadius: radius.xs,
    backgroundColor: colors.StatesWhite,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
  },
  titleInfo: {
    flex: 1,
    marginRight: spacing['Spacing-xl'],
    gap: spacing['Spacing-1'],
  },
  title: {
    ...typography.bodySmall1TallSemiBold,
    color: colors.TextPrimaryStrong,
  },
  subtitle: {
    ...typography.bodySmall4Regular,
    color: colors.IconTertiarySubtle,
  },
  formContent: {
    marginTop: spacing['Spacing-4xl'],
    gap: spacing['Spacing-6xl'],
  },
  divider: {
    height: 1,
    backgroundColor: colors.DividerSubtleOverlay,
    borderStyle: 'dotted',
    borderRadius: 1,
    marginBottom: spacing['Spacing-2xl'],
  },
  inputGroup: {
    gap: spacing['Spacing-xl'],
  },
  label: {
    ...typography.bodySmall1Medium,
    color: colors.TextPrimaryStrong,
  },
  chipRow: {
    flexDirection: 'row',
    gap: spacing['Spacing-3xl'],
  },
  chip: {
    flex: 1,
    paddingVertical: spacing['Spacing-xl'],
    paddingHorizontal: spacing['Spacing-3xl'],
    borderRadius: radius.xs,
    backgroundColor: colors.StatesWhite,
    borderWidth: 1,
    borderColor: colors.BorderPrimaryDefault,
    alignItems: 'center',
  },
  chipActive: {
    backgroundColor: colors.StatesFill2,
    borderColor: colors.TextPrimaryDefault,
  },
  chipText: {
    ...typography.bodySmall1SemiBold,
    color: colors.IconTertiarySubtle,
  },
  chipTextActive: {
    color: colors.TextPrimaryStrong,
  },
  row: {
    flexDirection: 'row',
    gap: spacing['Spacing-4xl'],
  },
  flex1: {
    flex: 1,
  },
  rowInputContainer: {
    backgroundColor: FORM_BG,
    borderWidth: 0,
  },
  conditionsInput: {
    minHeight: moderateScale(80),
    alignItems: 'flex-start',
  },
});
