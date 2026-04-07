import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BottomSheet, Button } from '@/components';
import { useAppSelector } from '@/store/hooks';
import { colors, spacing, typography } from '@/theme';

import { type DeleteAccountBottomSheetProps } from './DeleteAccountBottomSheet.types';

export const DeleteAccountBottomSheet = ({
  visible,
  onClose,
  onDelete,
}: DeleteAccountBottomSheetProps): React.ReactElement => {
  const translations = useAppSelector(state => state.translation);

  return (
    <BottomSheet visible={visible} onClose={onClose} variant="form">
      <View style={styles.content}>
        <Text style={styles.title}>{translations.deleteAccountSheetTitle}</Text>
        <Text style={styles.description}>
          {translations.deleteAccountSheetDescription}
        </Text>
        <Text style={styles.note}>{translations.deleteAccountSheetNote}</Text>
      </View>

      <View style={styles.footer}>
        <Button
          label={translations.deleteAccountSheetCancel}
          variant="outline"
          size="default"
          onPress={onClose}
          style={styles.button}
        />
        <Button
          label={translations.deleteAccountSheetDelete}
          variant="destructive"
          size="default"
          onPress={onDelete}
          style={[styles.button, styles.deleteButton]}
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
  deleteButton: {
    backgroundColor: colors.FeedbackWarningText, // Force solid red background
    borderColor: colors.FeedbackWarningText,
  },
});
