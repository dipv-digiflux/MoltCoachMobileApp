import React, { type ReactElement } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { CheckStoreSvg } from '@/assets/images';
import { colors, moderateScale } from '@/theme';

import { type SquareCheckboxProps } from './SquareCheckbox.types';

export const SquareCheckbox = ({
  checked,
  onPress,
  style,
}: SquareCheckboxProps): ReactElement => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        checked ? styles.checkedContainer : styles.uncheckedContainer,
        style,
      ]}
    >
      {checked && (
        <CheckStoreSvg
          width={moderateScale(12)}
          height={moderateScale(12)}
          color={colors.StatesWhite}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: moderateScale(22),
    height: moderateScale(22),
    borderRadius: moderateScale(2),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  checkedContainer: {
    backgroundColor: colors.PrimaryMain,
    borderColor: colors.PrimaryMain,
  },
  uncheckedContainer: {
    backgroundColor: colors.StatesWhite,
    borderColor: colors.StatesOutline,
  },
});
