import React, { type ReactElement } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ContactBookSvg, RightIndicationArrowSvg } from '@/assets/images';
import { colors, radius, spacing, typography } from '@/theme';

import type { ImportFromContactsCardProps } from './ImportFromContactsCard.types';

export const ImportFromContactsCard = ({
  title,
  subtitle,
  onPress,
}: ImportFromContactsCardProps): ReactElement => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <ContactBookSvg
            width={20}
            height={20}
            color={colors.IconPrimaryActive}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.subtitleText}>{subtitle}</Text>
        </View>
      </View>

      <RightIndicationArrowSvg
        width={20}
        height={20}
        color={colors.IconPrimaryActive}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    // Horizontal layout: icon + text block + right arrow
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing['Spacing-5xl'], // spacingScale(16) → 16px container padding
    borderRadius: radius['lg'], // Figma: 12px card radius
    borderWidth: 1,
    borderColor: colors.StatesDivider, // closest system token to #00000014 (border subtle)
    backgroundColor: colors.StatesWhite, // '#FFFFFF' — main card background
  },
  content: {
    // Left-side content: icon circle + text block
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: spacing['Spacing-13xl'], // 40px circle width from design
    height: spacing['Spacing-13xl'], // 40px circle height from design
    borderRadius: radius['2xl'], // 20px radius → fully rounded circle
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.SurfaceSecondaryDisabled, // '#F3F4F6' — matches spec
  },
  textContainer: {
    marginLeft: spacing['Spacing-3xl'], // spacingScale(12) → 12px gap between icon and text
    gap: spacing['Spacing-1'], // spacingScale(1) → 1px gap between title and subtitle
  },
  titleText: {
    // 15px SemiBold Inter — "Import from Contacts"
    ...typography.b2SemiBold,
    color: colors.TextPrimaryStrong, // '#0F1720' — primary strong text color
  },
  subtitleText: {
    // 13px Regular Inter — "Add multiple existing clients at once"
    ...typography.bodySmall4Regular,
    // Figma: #919191 — best match is IconTertiarySubtle from the system palette
    color: colors.IconTertiarySubtle,
  },
});
