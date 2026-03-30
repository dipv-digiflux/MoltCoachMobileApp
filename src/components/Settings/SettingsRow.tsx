import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { RightIndicationArrowSvg } from '@/assets/images';
import { Switch } from '@/components/Switch';
import { colors, moderateScale, spacing, typography } from '@/theme';

import type { SettingsRowProps } from './Settings.types';

export const SettingsRow = ({
  label,
  subtitle,
  icon,
  type,
  value,
  onPress,
  onValueChange,
  showBottomDivider = true,
}: SettingsRowProps): React.ReactElement => {
  const isLink = type === 'link';

  const Content: React.ReactElement = (
    <View style={[styles.container, !showBottomDivider && styles.noDivider]}>
      <View style={styles.leftSection}>
        {icon && <View style={styles.iconWrapper}>{icon}</View>}
        <View style={styles.textWrapper}>
          <Text style={styles.label}>{label}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>

      <View style={styles.rightSection}>
        {isLink ? (
          <RightIndicationArrowSvg
            width={moderateScale(20)}
            height={moderateScale(20)}
            color={colors.IconSecondaryDisabled}
          />
        ) : (
          <Switch
            on={!!value}
            onChange={onValueChange ?? (() => {})}
            size="default"
          />
        )}
      </View>
    </View>
  );

  if (isLink) {
    return (
      <Pressable
        onPress={() => {
          console.log('SettingsRow pressed:', label);
          onPress?.();
        }}
        style={({ pressed }) => pressed && styles.pressed}
      >
        {Content}
      </Pressable>
    );
  }

  return Content;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing['Spacing-5xl'],
    borderBottomWidth: 1,
    borderBottomColor: colors.StatesDivider,
  },
  noDivider: {
    borderBottomWidth: 0,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconWrapper: {
    marginRight: spacing['Spacing-5xl'],
    // width: moderateScale(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    flex: 1,
  },
  label: {
    ...typography.bodySmall1Medium,
    color: colors.TextPrimaryDefault,
  },
  subtitle: {
    ...typography.bodySmall4TallRegular,
    color: colors.TextSecondaryDisabled,
    marginTop: spacing['Spacing-xs'],
  },
  rightSection: {
    marginLeft: spacing['Spacing-xl'],
  },
  pressed: {
    opacity: 0.7,
    backgroundColor: colors.SurfaceSecondaryHover,
  },
});
