import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { colors, radius, spacing, typography } from '@/theme';

import { SettingsRow } from './SettingsRow';

import type { SettingsSectionProps } from './Settings.types';

export const SettingsSection = ({
  title,
  items,
  footerButtonLabel,
  onFooterButtonPress,
  containerStyle,
}: SettingsSectionProps): React.ReactElement => {
  return (
    <View style={[styles.container, containerStyle]}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <View style={styles.content}>
        {items.map((item, index) => (
          <SettingsRow
            key={item.id}
            {...item}
            showBottomDivider={index !== items.length - 1}
          />
        ))}
      </View>
      {footerButtonLabel && (
        <View style={styles.footer}>
          <Button
            label={footerButtonLabel}
            onPress={onFooterButtonPress ?? (() => {})}
            variant="outline"
            // size="medium"
            fullWidth
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing['Spacing-4xl'],
    paddingVertical: spacing['Spacing-xl'],
    // paddingBottom: spacing['Spacing-4xl'],
    // backgroundColor: colors.StatesWhite,
    borderRadius: radius.xs,
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    // paddingTop: 0,
  },
  title: {
    ...typography.bodySmall1Medium,
    color: colors.TextSecondaryDisabled,
    // marginBottom: spacing['Spacing-xl'],
    // paddingHorizontal: spacing['Spacing-m'],
    // marginTop: spacing['Spacing-m'],
  },
  content: {
    backgroundColor: colors.StatesWhite,
  },
  footer: {
    // marginTop: spacing['Spacing-5xl'],
  },
});
