import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { BottomSheet } from '@/components';
import { colors, moderateScale, spacing, typography } from '@/theme';

import { NudgeIcon } from './TaskDetailsBottomSheet.icons';
import { TaskDetailsBottomSheetProps } from './TaskDetailsBottomSheet.types';
import { TaskItem } from './TaskItem';

export const TaskDetailsBottomSheet = ({
  isVisible,
  onClose,
  date,
  tasks,
  onToggleTask,
  onNudge,
}: TaskDetailsBottomSheetProps): React.ReactElement => {
  return (
    <BottomSheet
      visible={isVisible}
      onClose={onClose}
      header={{
        title: 'Task details',
        subtitle: date,
        showCloseButton: true,
      }}
      footer={{
        children: (
          <View style={styles.footer}>
            <TouchableOpacity style={styles.backButton} onPress={onClose}>
              <Text style={styles.backButtonText}>Go back</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.nudgeButton} onPress={onNudge}>
              <NudgeIcon width={moderateScale(16)} height={moderateScale(17)} />
              <Text style={styles.nudgeButtonText}>Nudge</Text>
            </TouchableOpacity>
          </View>
        ),
      }}
    >
      <View style={styles.content}>
        {tasks.map((task, index) => (
          <TaskItem
            key={`${task.name}-${index}`}
            name={task.name}
            description={task.description}
            completed={task.completed}
            onToggle={() => onToggleTask?.(task.name)}
          />
        ))}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing['Spacing-xl'],
  },
  footer: {
    flexDirection: 'row',
    gap: spacing['Spacing-xl'],
    paddingBottom: spacing['Spacing-4xl'],
    paddingTop: spacing['Spacing-2xl'],
  },
  backButton: {
    flex: 1,
    height: moderateScale(54),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    borderRadius: moderateScale(4),
    backgroundColor: colors.SurfacePrimaryDefault,
  },
  backButtonText: {
    ...typography.b1SemiBold,
    color: colors.TextPrimaryDefault,
  },
  nudgeButton: {
    flex: 1,
    height: moderateScale(54),
    backgroundColor: colors.PrimaryMain,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(4),
    gap: spacing['Spacing-l'],
  },
  nudgeButtonText: {
    ...typography.b1SemiBold,
    color: colors.StatesWhite,
  },
});
