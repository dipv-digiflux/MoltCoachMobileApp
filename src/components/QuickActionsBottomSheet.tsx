import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { BottomSheet } from '@/components';
import { colors, moderateScale, spacing, typography } from '@/theme';

import {
  CalendarDaysIcon,
  FitnessIcon,
  RightArrowIcon,
  TrashIcon,
  DeleteUserIcon,
} from './QuickActionsBottomSheet.icons';
import { QuickActionsBottomSheetProps } from './QuickActionsBottomSheet.types';

export const QuickActionsBottomSheet = ({
  isVisible,
  onClose,
  onChangeFitnessPhase,
  onChangeSessions,
  onDeleteUser,
}: QuickActionsBottomSheetProps): React.ReactElement => {
  const actions = [
    {
      id: 'fitness-phase',
      label: 'Change fitness phase',
      icon: <FitnessIcon />,
      rightIcon: <RightArrowIcon />,
      onPress: () => {
        onChangeFitnessPhase?.();
        onClose();
      },
    },
    {
      id: 'sessions',
      label: 'Change number of sessions',
      icon: <CalendarDaysIcon />,
      rightIcon: <RightArrowIcon />,
      onPress: () => {
        onChangeSessions?.();
        onClose();
      },
    },
    {
      id: 'delete',
      label: 'Delete user',
      icon: <DeleteUserIcon />,
      rightIcon: (
        <TrashIcon width={moderateScale(17)} height={moderateScale(18.5)} />
      ),
      onPress: () => {
        onDeleteUser?.();
        onClose();
      },
    },
  ];

  return (
    <BottomSheet
      visible={isVisible}
      onClose={onClose}
      header={{
        title: 'Quick actions',
        showCloseButton: true,
      }}
    >
      <View style={styles.content}>
        {actions.map(action => (
          <TouchableOpacity
            key={action.id}
            style={styles.actionItem}
            onPress={action.onPress}
          >
            <View style={styles.leftContent}>
              <View style={styles.iconContainer}>{action.icon}</View>
              <Text style={styles.label}>{action.label}</Text>
            </View>
            <View style={styles.rightIconContainer}>{action.rightIcon}</View>
          </TouchableOpacity>
        ))}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing['Spacing-10xl'],
    gap: spacing['Spacing-xl'],
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing['Spacing-4xl'],
    borderWidth: 1,
    borderColor: colors.BorderPrimaryDefault,
    borderRadius: moderateScale(4),
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-xl'],
  },
  iconContainer: {
    width: moderateScale(32),
    height: moderateScale(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIconContainer: {
    width: moderateScale(32),
    height: moderateScale(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    ...typography.b1Medium,
    color: colors.TextPrimaryDefault,
  },
});
