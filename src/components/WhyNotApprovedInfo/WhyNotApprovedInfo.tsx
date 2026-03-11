import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { InfoIconSvg } from '@/assets/images';
import { useAppSelector } from '@/store/hooks';
import {
  colors,
  fontFamily,
  fontScale,
  lineHeightScale,
  radius,
  spacing,
  spacingScale,
  typography,
} from '@/theme';

const INFO_ICON_SIZE = 20;

export const WhyNotApprovedInfo = (): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.infoIcon}>
          <InfoIconSvg
            width={INFO_ICON_SIZE}
            height={INFO_ICON_SIZE}
            color={colors.IconTertiarySubtle}
          />
        </View>
        <Text style={styles.title}>
          {translation.applicationNotApprovedWhyTitle}
        </Text>
      </View>
      <Text style={styles.description}>
        {translation.applicationNotApprovedWhyDescription}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.BorderSecondaryDefault,
    padding: spacing['Spacing-5xl'],
    gap: spacingScale(7),
    backgroundColor: colors.StatesWhite,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-xl'],
  },
  infoIcon: {
    width: INFO_ICON_SIZE,
    height: INFO_ICON_SIZE,
    borderRadius: INFO_ICON_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...typography.bodySmall1SemiBold,
    lineHeight: lineHeightScale(14),
    color: colors.TextPrimaryDefault,
    flex: 1,
  },
  description: {
    fontFamily: fontFamily.interRegular,
    fontSize: fontScale(13),
    lineHeight: lineHeightScale(19.5),
    letterSpacing: 0,
    color: colors.TextSecondaryDefault,
  },
});
