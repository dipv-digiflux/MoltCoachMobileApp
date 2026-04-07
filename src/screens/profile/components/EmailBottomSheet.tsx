/* eslint-disable @typescript-eslint/no-floating-promises */
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Clipboard,
} from 'react-native';

import { BottomSheet, Button } from '@/components';
import { colors, spacing, typography, moderateScale, iconScale } from '@/theme';

import { type EmailBottomSheetProps } from './EmailBottomSheet.types';

export const EmailBottomSheet = ({
  visible,
  onClose,
}: EmailBottomSheetProps): React.ReactElement => {
  const email = 'support@molt.com';

  const handleCopy = (): void => {
    Clipboard.setString(email);
  };

  const handleOpenEmail = (): void => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <BottomSheet visible={visible} onClose={onClose} variant="form">
      <View style={styles.content}>
        <View style={styles.iconWrapper}>
          <View style={styles.iconBackground}>
            <Text style={styles.placeholderIcon}>✉️</Text>
          </View>
        </View>

        <Text style={styles.title}>Send us an Email</Text>
        <Text style={styles.description}>
          If your query requires more details, you can contact our support team
          by email. We typically respond within 24 hours.
        </Text>

        <TouchableOpacity style={styles.copyContainer} onPress={handleCopy}>
          <Text style={styles.emailText}>{email}</Text>
          <View style={styles.copyIcon}>
            <Text style={styles.copyText}>📄</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Button
          label="Cancel"
          variant="outline"
          onPress={onClose}
          style={styles.button}
        />
        <Button
          label="Open Gmail app"
          variant="primary"
          onPress={handleOpenEmail}
          style={styles.button}
        />
      </View>
    </BottomSheet>
  );
};

EmailBottomSheet.displayName = 'EmailBottomSheet';

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-xl'],
    paddingBottom: spacing['Spacing-3xl'],
  },
  iconWrapper: {
    marginBottom: spacing['Spacing-6xl'],
  },
  iconBackground: {
    width: moderateScale(48),
    height: moderateScale(48),
    backgroundColor: colors.SurfaceSecondaryDefault,
    borderRadius: spacing['Spacing-m'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderIcon: {
    fontSize: iconScale(24),
  },
  title: {
    ...typography.h0SemiBold,
    color: colors.TextPrimaryDefault,
    marginBottom: spacing['Spacing-6xl'],
  },
  description: {
    ...typography.bodySmall1TallRegular,
    color: colors.TextSecondaryDefault,
    marginBottom: spacing['Spacing-7xl'],
  },
  copyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-m'],
  },
  emailText: {
    ...typography.h0Bold,
    color: colors.TextPrimaryDefault,
  },
  copyIcon: {
    padding: spacing['Spacing-xs'],
  },
  copyText: {
    fontSize: iconScale(16),
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingBottom: spacing['Spacing-7xl'],
    gap: spacing['Spacing-xl'],
  },
  button: {
    flex: 1,
  },
});
