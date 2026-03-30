import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ContactBookSvg, GreenShieldSvg } from '@/assets/images';
import { useAppSelector } from '@/store/hooks';
import { colors, radius, spacing, typography } from '@/theme';

export const ImportContactsContent = (): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <ContactBookSvg
          width={spacing['Spacing-13xl']}
          height={spacing['Spacing-13xl']}
          color={colors.IconPrimaryHover}
        />
      </View>

      <Text style={styles.heading}>{translation.importContactsTitle}</Text>
      <Text style={styles.body}>{translation.importContactsDescription}</Text>

      <View style={styles.assuranceBox}>
        <GreenShieldSvg
          width={spacing['Spacing-10xl']}
          height={spacing['Spacing-10xl']}
          color={colors.FeedbackSuccessIcon}
        />
        <Text style={styles.assuranceText}>
          {translation.importContactsAssurance}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing['Spacing-10xl'], // spacingScale(24)
  },
  iconCircle: {
    paddingHorizontal: spacing['Spacing-8xl'], // spacingScale(44)
    paddingVertical: spacing['Spacing-8xl'], // spacingScale(44)
    borderRadius: radius.full, // 9999 (full circle)
    backgroundColor: colors.SurfaceSecondaryHover, // '#E5E7EB'
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing['Spacing-10xl'], // spacingScale(24)
  },
  heading: {
    ...typography.h8Bold, // fontScale(22), lineHeightScale(26), 'Inter-Bold'
    color: colors.TextPrimaryStrong, // '#0F1720'
    textAlign: 'center',
    marginBottom: spacing['Spacing-3xl'], // spacingScale(12)
    alignSelf: 'center',
  },
  body: {
    ...typography.b2Regular, // fontScale(15), lineHeightScale(18), 'Inter-Regular'
    color: colors.IconTertiarySubtle, // '#919191'
    textAlign: 'center',
    marginBottom: spacing['Spacing-10xl'], // spacingScale(24)
    alignSelf: 'center',
  },
  assuranceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    gap: spacing['Spacing-xl'], // spacingScale(8)
    paddingVertical: spacing['Spacing-2xl'], // spacingScale(10)
    paddingHorizontal: spacing['Spacing-4xl'], // spacingScale(14)
    backgroundColor: colors.StatesWhite, // '#FFFFFF'
    borderRadius: radius.xs, // moderateScale(2)
    borderWidth: 1,
    borderColor: colors.DividerSubtleOverlay, // '#00000014'
  },
  assuranceText: {
    ...typography.bodySmall4Medium, // fontScale(13), lineHeightScale(16), 'Inter-Medium'
    color: colors.IconPrimaryHover, // '#374151'
  },
});
