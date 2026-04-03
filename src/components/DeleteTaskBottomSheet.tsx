import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomSheet } from '@/components';
import { colors, moderateScale, spacing, typography } from '@/theme';
import { DeleteTaskBottomSheetProps } from './DeleteTaskBottomSheet.types';
import { DeleteTaskIcon } from './DeleteTaskBottomSheet.icons';

export const DeleteTaskBottomSheet = ({
  isVisible,
  onClose,
  onDelete,
  taskTitle,
}: DeleteTaskBottomSheetProps): React.ReactElement => {
  return (
    <BottomSheet
      visible={isVisible}
      onClose={onClose}
      header={{
        title: '',
        showCloseButton: true,
      }}
      footer={{
        children: (
          <View style={styles.footer}>
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
              <Text style={styles.deleteButtonText}>Delete Task</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ),
      }}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <DeleteTaskIcon />
        </View>

        <Text style={styles.title}>Delete this task?</Text>

        <Text style={styles.description}>
          his can’t be undone. You’ll need to create a new task if you want it
          again.
        </Text>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing['Spacing-xl'],
  },
  iconContainer: {
    marginBottom: spacing['Spacing-4xl'],
  },
  title: {
    ...typography.h8SemiBold,
    color: colors.TextPrimaryDefault,
    marginBottom: spacing['Spacing-xl'],
  },
  description: {
    ...typography.bodySmall1Regular,
    color: colors.TextSecondaryDefault,
    lineHeight: moderateScale(16),
  },
  footer: {
    flexDirection: 'row',
    gap: spacing['Spacing-xl'],
    paddingBottom: spacing['Spacing-4xl'],
    paddingTop: spacing['Spacing-2xl'],
  },
  deleteButton: {
    flex: 1,
    height: moderateScale(54),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.TextPrimaryDefault,
    borderRadius: moderateScale(4),
    backgroundColor: colors.StatesWhite,
  },
  deleteButtonText: {
    ...typography.b1SemiBold,
    color: colors.TextPrimaryDefault,
  },
  cancelButton: {
    flex: 1,
    height: moderateScale(54),
    backgroundColor: colors.PrimaryMain,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(4),
  },
  cancelButtonText: {
    ...typography.b1SemiBold,
    color: colors.StatesWhite,
  },
});
