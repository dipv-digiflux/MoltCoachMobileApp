import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BottomSheet, Button } from '@/components';
import { colors, spacing, typography } from '@/theme';

import { type LogoutBottomSheetProps } from './LogoutBottomSheet.types';

export const LogoutBottomSheet = ({
  visible,
  onClose,
  onLogout,
}: LogoutBottomSheetProps): React.ReactElement => {
  return (
    <BottomSheet visible={visible} onClose={onClose} variant="form">
      <View style={styles.content}>
        <Text style={styles.title}>Log out?</Text>
        <Text style={styles.description}>
          Are you sure you want to log out of your account?
        </Text>
        <Text style={styles.note}>
          You’ll be signed out of your account and won’t see client updates
          until you log back in
        </Text>
      </View>

      <View style={styles.footer}>
        <Button
          label="Cancel"
          variant="outline"
          size="default"
          onPress={onClose}
          style={styles.button}
        />
        <Button
          label="Log out"
          variant="primary"
          size="default"
          onPress={onLogout}
          style={styles.button}
        />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingTop: spacing['Spacing-xl'],
    paddingBottom: spacing['Spacing-3xl'],
  },
  title: {
    ...typography.h0SemiBold,
    color: colors.TextPrimaryDefault,
    marginBottom: spacing['Spacing-6xl'],
  },
  description: {
    ...typography.b1Regular,
    color: colors.TextPrimaryDefault,
    marginBottom: spacing['Spacing-m'],
  },
  note: {
    ...typography.bodySmall1TallRegular,
    color: colors.TextSecondaryDefault,
    marginBottom: spacing['Spacing-10xl'],
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
