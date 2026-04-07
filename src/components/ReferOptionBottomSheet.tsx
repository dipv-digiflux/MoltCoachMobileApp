import React, { type ReactElement } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { RightIndicationArrowSvg } from '@/assets/images';
import { BottomSheet } from '@/components';
import { useAppSelector } from '@/store/hooks';
import { colors, radius, spacing, typography } from '@/theme';

import type { ReferOptionBottomSheetProps } from './ReferOptionBottomSheet.types';

export const ReferOptionBottomSheet = ({
  visible,
  onClose,
  onReferClient,
  onReferCoach,
}: ReferOptionBottomSheetProps): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  const options = [
    {
      label: translation.referOptionClientLabel,
      onPress: onReferClient,
    },
    {
      label: translation.referOptionCoachLabel,
      onPress: onReferCoach,
    },
  ];

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      header={{ title: translation.referOptionHeaderTitle }}
    >
      <View style={styles.container}>
        {options.map((option, index) => (
          <Pressable
            key={index}
            style={styles.optionRow}
            onPress={() => {
              option.onPress();
              onClose();
            }}
          >
            <Text style={styles.optionLabel}>{option.label}</Text>
            <RightIndicationArrowSvg
              width={spacing['Spacing-5xl']}
              height={spacing['Spacing-5xl']}
              color={colors.IconTertiarySubtle}
            />
          </Pressable>
        ))}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing['Spacing-xl'],
    paddingBottom: spacing['Spacing-xl'],
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing['Spacing-8xl'],
    borderWidth: 1,
    borderColor: colors.DividerSubtleOverlay,
    borderRadius: radius.xs,
    backgroundColor: colors.StatesWhite,
  },
  optionLabel: {
    ...typography.h8Bold,
    color: colors.TextPrimaryStrong,
  },
});
