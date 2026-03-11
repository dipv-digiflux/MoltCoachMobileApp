import React, { useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, moderateScale, spacing, typography } from '@/theme';

import type { DropdownItemProps } from '@/types/dropdown.types';

// ─── Design tokens ──────────────────────────────────────────────────

const CHECKBOX_SIZE = moderateScale(18);
const CHECKBOX_RADIUS = moderateScale(2);
const CHECK_STROKE = moderateScale(1.5);
const CHECK_LONG = moderateScale(8);
const CHECK_SHORT = moderateScale(4);

const SINGLE_CHECK_LONG = moderateScale(9);
const SINGLE_CHECK_SHORT = moderateScale(5);
const SINGLE_CHECK_STROKE = moderateScale(2);

// ─── Component ──────────────────────────────────────────────────────

const DropdownItemComponent = ({
  option,
  selected,
  multiple,
  onSelect,
  testID,
}: DropdownItemProps): React.ReactElement => {
  const handlePress = useCallback((): void => {
    if (option.disabled !== true) {
      onSelect(option.value);
    }
  }, [option.value, option.disabled, onSelect]);

  const isDisabled = option.disabled === true;
  const textColor = isDisabled
    ? colors.TextPrimaryDisabled
    : colors.TextPrimaryDefault;

  const checkColor = isDisabled
    ? colors.TextPrimaryDisabled
    : colors.StatesWhite;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.item,
        pressed && !isDisabled && styles.itemPressed,
      ]}
      onPress={handlePress}
      disabled={isDisabled}
      accessibilityRole={multiple ? 'checkbox' : 'radio'}
      accessibilityState={{ selected, disabled: isDisabled }}
      accessibilityLabel={option.label}
      testID={testID}
    >
      {/* Multi-select checkbox indicator */}
      {multiple ? (
        <View
          style={[
            styles.checkbox,
            selected && styles.checkboxChecked,
            isDisabled && selected && styles.checkboxDisabledChecked,
            isDisabled && !selected && styles.checkboxDisabled,
          ]}
        >
          {selected ? (
            <View style={[styles.checkmark, { borderColor: checkColor }]} />
          ) : null}
        </View>
      ) : null}

      <Text
        style={[
          selected ? typography.bodySmall1Medium : typography.bodySmall1Regular,
          { color: textColor, flex: 1 },
        ]}
        numberOfLines={1}
      >
        {option.label}
      </Text>

      {/* Single-select check indicator */}
      {!multiple && selected ? (
        <View style={styles.singleCheckWrap}>
          <View style={styles.singleCheckmark} />
        </View>
      ) : null}
    </Pressable>
  );
};

export const DropdownItem = React.memo(DropdownItemComponent);

// ─── Styles ─────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing['Spacing-3xl'],
    paddingVertical: spacing['Spacing-4xl'],
    gap: spacing['Spacing-xl'],
  },
  itemPressed: {
    backgroundColor: colors.SurfacePrimaryHover,
  },

  // ── Multi-select checkbox ────────────────────────────────────────
  checkbox: {
    width: CHECKBOX_SIZE,
    height: CHECKBOX_SIZE,
    borderRadius: CHECKBOX_RADIUS,
    borderWidth: 1,
    borderColor: colors.SurfaceSecondaryHover,
    backgroundColor: colors.StatesWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.PrimaryMain,
    borderColor: colors.PrimaryMain,
  },
  checkboxDisabledChecked: {
    backgroundColor: colors.StatesFill1,
    borderColor: colors.BorderPrimaryDisabled,
  },
  checkboxDisabled: {
    borderColor: colors.BorderPrimaryDisabled,
  },
  checkmark: {
    width: CHECK_LONG,
    height: CHECK_SHORT,
    borderBottomWidth: CHECK_STROKE,
    borderLeftWidth: CHECK_STROKE,
    transform: [{ rotate: '-45deg' }],
    marginTop: -CHECK_SHORT * 0.2,
  },

  // ── Single-select check indicator ────────────────────────────────
  singleCheckWrap: {
    width: moderateScale(20),
    height: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleCheckmark: {
    width: SINGLE_CHECK_LONG,
    height: SINGLE_CHECK_SHORT,
    borderBottomWidth: SINGLE_CHECK_STROKE,
    borderLeftWidth: SINGLE_CHECK_STROKE,
    borderColor: colors.PrimaryMain,
    transform: [{ rotate: '-45deg' }],
    marginTop: -SINGLE_CHECK_SHORT * 0.2,
  },
});
