import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, moderateScale, radius, spacing, typography } from '@/theme';

import { BellIcon, UpArrowIcon } from './ClientFloatingActions.icons';
import { type ClientFloatingActionsProps } from './ClientFloatingActions.types';

export const ClientFloatingActions = ({
  onScrollToTop,
  onNudge,
}: ClientFloatingActionsProps): React.ReactElement => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { bottom: insets.bottom + spacing['Spacing-5xl'] },
      ]}
      pointerEvents="box-none"
    >
      <Pressable
        style={({ pressed }) => [
          styles.scrollTopButton,
          pressed && styles.pressed,
        ]}
        onPress={onScrollToTop}
      >
        <UpArrowIcon />
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.nudgeButton, pressed && styles.pressed]}
        onPress={onNudge}
      >
        <BellIcon />
        {/* <Text style={styles.nudgeText}>Nudge</Text> */}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: spacing['Spacing-5xl'],
    right: spacing['Spacing-5xl'],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  scrollTopButton: {
    width: moderateScale(44),
    height: moderateScale(44),
    backgroundColor: colors.StatesWhite,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nudgeButton: {
    width: moderateScale(44),
    height: moderateScale(44),
    backgroundColor: colors.PrimaryMain,
    borderRadius: radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing['Spacing-m'],
  },
  nudgeText: {
    ...typography.bodySmall2Medium,
    color: colors.StatesWhite,
  },
  pressed: {
    opacity: 0.8,
  },
});
