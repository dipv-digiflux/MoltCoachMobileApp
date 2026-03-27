import { StyleSheet } from 'react-native';

import { colors, moderateScale, spacing, typography } from '@/theme';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.StatesWhite,
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    borderRadius: moderateScale(12),
    padding: spacing['Spacing-5xl'],
    marginBottom: spacing['Spacing-xl'],
    marginHorizontal: spacing['Spacing-5xl'],
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing['Spacing-5xl'],
  },
  avatar: {
    width: moderateScale(56),
    height: moderateScale(56),
    borderRadius: moderateScale(12),
    backgroundColor: colors.StatesDivider,
    marginRight: spacing['Spacing-xl'],
  },
  avatarPlaceholder: {
    width: moderateScale(56),
    height: moderateScale(56),
    borderRadius: moderateScale(12),
    backgroundColor: colors.AccentBlueLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing['Spacing-xl'],
  },
  avatarInitials: {
    ...typography.h0SemiBold,
    fontSize: moderateScale(18),
    color: colors.TextSecondaryDefault,
  },
  infoContainer: {
    flex: 1,
    gap: spacing['Spacing-m'],
  },
  nameText: {
    ...typography.h0SemiBold,
    color: colors.TextPrimaryDefault,
  },
  tagRow: {
    flexDirection: 'row',
    gap: spacing['Spacing-m'],
  },
  typeTag: {
    backgroundColor: colors.SurfaceSubtleDisabled,
    paddingHorizontal: spacing['Spacing-xl'],
    paddingVertical: moderateScale(2),
    borderRadius: moderateScale(4),
  },
  typeTagText: {
    ...typography.bodySmall1Medium,
    fontSize: moderateScale(10),
    color: colors.TextSecondaryDefault,
  },
  statusTag: {
    paddingHorizontal: spacing['Spacing-xl'],
    paddingVertical: moderateScale(2),
    borderRadius: moderateScale(4),
  },
  statusTagText: {
    ...typography.bodySmall1Medium,
    fontSize: moderateScale(10),
  },
  menuButton: {
    padding: spacing['Spacing-m'],
  },
  rowsContainer: {
    gap: spacing['Spacing-xl'],
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.StatesFill1,
    paddingHorizontal: spacing['Spacing-xl'],
    paddingVertical: spacing['Spacing-xl'],
    borderRadius: moderateScale(4),
    borderWidth: 1,
    borderColor: colors.DividerSubtleOverlay,
  },
  rowLabel: {
    ...typography.bodySmall1Medium,
    color: colors.TextPrimaryDefault,
  },
  dot: {
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: moderateScale(4),
    backgroundColor: colors.MatrixMain,
  },
  disabledLabel: {
    color: colors.TextSecondaryDisabled,
  },
  disabledOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: moderateScale(4),
  },
});
