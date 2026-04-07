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

import { type WhatsAppBottomSheetProps } from './WhatsAppBottomSheet.types';

export const WhatsAppBottomSheet = ({
  visible,
  onClose,
}: WhatsAppBottomSheetProps): React.ReactElement => {
  const phoneNumber = '+971 526899935';

  const handleCopy = (): void => {
    Clipboard.setString(phoneNumber);
  };

  const handleOpenWhatsApp = (): void => {
    const url = `whatsapp://send?phone=${phoneNumber.replace(/\s/g, '')}`;
    Linking.openURL(url).catch(() => {
      Linking.openURL(
        `https://wa.me/${phoneNumber.replace(/\s/g, '').replace('+', '')}`,
      );
    });
  };

  return (
    <BottomSheet visible={visible} onClose={onClose} variant="form">
      <View style={styles.content}>
        <View style={styles.iconWrapper}>
          <View style={styles.iconBackground}>
            <Text style={styles.placeholderIcon}>💬</Text>
          </View>
        </View>

        <Text style={styles.title}>Start a Whatsapp Chat</Text>
        <Text style={styles.description}>
          You will be redirected to WhatsApp to chat with our support team. Our
          team typically replies within a few hours.
        </Text>

        <TouchableOpacity style={styles.copyContainer} onPress={handleCopy}>
          <Text style={styles.phoneNumber}>{phoneNumber}</Text>
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
          label="Open WhatsApp"
          variant="primary"
          onPress={handleOpenWhatsApp}
          style={styles.button}
        />
      </View>
    </BottomSheet>
  );
};

WhatsAppBottomSheet.displayName = 'WhatsAppBottomSheet';

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
  phoneNumber: {
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
