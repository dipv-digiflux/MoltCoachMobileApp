import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import { colors, moderateScale, spacing, typography } from '@/theme';

import { TaskItemProps } from './TaskItem.types';

export const TaskItem = ({
  name,
  description,
  completed,
  onToggle,
  style,
}: TaskItemProps): React.ReactElement => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.textContainer}>
        <Text style={[styles.name, completed && styles.nameCompleted]}>
          {name}
        </Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Pressable
        onPress={() => onToggle?.(!completed)}
        style={[styles.checkbox, completed && styles.checkboxActive]}
      >
        {completed && <View style={styles.checkMark} />}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing['Spacing-4xl'],
    gap: spacing['Spacing-xl'],
  },
  textContainer: {
    flex: 1,
    gap: spacing['Spacing-xs'],
  },
  name: {
    ...typography.b1SemiBold,
    color: colors.TextPrimaryDefault,
  },
  nameCompleted: {
    color: colors.TextSecondaryDefault,
  },
  description: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
  },
  checkbox: {
    width: moderateScale(22),
    height: moderateScale(22),
    borderRadius: moderateScale(4),
    borderWidth: 1,
    borderColor: colors.BorderPrimaryDefault,
    backgroundColor: colors.StatesWhite,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: colors.PrimaryMain,
    borderColor: colors.PrimaryMain,
  },
  checkMark: {
    width: moderateScale(10),
    height: moderateScale(6),
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: colors.StatesWhite,
    transform: [{ rotate: '-45deg' }, { translateY: -1 }],
  },
});
