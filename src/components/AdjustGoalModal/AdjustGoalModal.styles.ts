import { StyleSheet } from 'react-native';

import { colors, moderateScale, spacing, typography } from '@/theme';

export default StyleSheet.create({
  formContainer: {
    marginVertical: spacing['Spacing-xl'],
    borderWidth: 1,
    borderColor: colors.StatesDivider,
    borderRadius: moderateScale(4),
    padding: spacing['Spacing-3xl'],
    gap: spacing['Spacing-4xl'],
  },
  fieldsRow: {
    flexDirection: 'row',
    gap: spacing['Spacing-xl'],
  },
  fieldWrap: {
    flex: 1,
  },
  suffixText: {
    ...typography.bodySmall1Regular,
    color: colors.TextSecondaryDefault,
    marginRight: spacing['Spacing-2xl'],
  },
  rightIconContainer: {
    marginRight: spacing['Spacing-2xl'],
    justifyContent: 'center',
    alignItems: 'center',
  },
});
