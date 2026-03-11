import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, moderateScale, spacing, typography } from '@/theme';

import { type CheckboxProps, type CheckboxSize } from './Checkbox.types';

import type { CheckboxSizeTokens } from '@/types/components.types';

// ─── Design tokens ──────────────────────────────────────────────────

const FOCUS_RING_COLOR = '#EDEFF5';
const FOCUS_RING_WIDTH = 3;
const FOCUS_RING_GAP = 1;

const SIZE_TOKENS: Record<CheckboxSize, CheckboxSizeTokens> = {
  default: {
    box: moderateScale(20),
    borderRadius: moderateScale(2),
    stroke: moderateScale(2),
    checkLong: moderateScale(9),
    checkShort: moderateScale(5),
  },
  small: {
    box: moderateScale(16),
    borderRadius: moderateScale(2),
    stroke: moderateScale(1.5),
    checkLong: moderateScale(7),
    checkShort: moderateScale(4),
  },
};

// ─── Component ──────────────────────────────────────────────────────

/**
 * Checkbox with checked, unchecked, mixed (indeterminate), and disabled states.
 * Supports optional label and description text.
 *
 * @example
 * <Checkbox checked={isAccepted} onChange={setIsAccepted} label="Accept terms" />
 * <Checkbox checked mixed disabled size="small" />
 */
export const Checkbox = ({
  checked = false,
  mixed = false,
  disabled = false,
  label,
  description,
  size = 'default',
  onChange,
  testID,
  style,
  accessibilityLabel,
}: CheckboxProps): React.ReactElement => {
  const [focused, setFocused] = useState(false);

  const tokens = SIZE_TOKENS[size];
  const isActive = checked || mixed;

  // ── Colors ─────────────────────────────────────────────────────
  const boxBg = disabled
    ? isActive
      ? colors.StatesFill1
      : colors.StatesWhite
    : isActive
    ? colors.PrimaryMain
    : colors.StatesWhite;

  const boxBorder = disabled
    ? colors.BorderPrimaryDisabled
    : focused && !isActive
    ? colors.PrimaryMain
    : isActive
    ? colors.Transparent
    : colors.SurfaceSecondaryHover;

  const iconColor = disabled ? colors.TextPrimaryDisabled : colors.StatesWhite;
  const labelColor = disabled ? colors.TextPrimaryDisabled : colors.PrimaryMain;
  const descColor = disabled
    ? colors.TextPrimaryDisabled
    : colors.TextSecondaryHover;

  const showFocusRing = focused && !disabled;

  // ── Handlers ───────────────────────────────────────────────────
  const handlePress = useCallback((): void => {
    if (!disabled) {
      onChange?.(!checked);
    }
  }, [disabled, checked, onChange]);

  const handleFocus = useCallback((): void => {
    if (!disabled) setFocused(true);
  }, [disabled]);

  const handleBlur = useCallback((): void => {
    setFocused(false);
  }, []);

  // ── Box style ──────────────────────────────────────────────────
  const boxStyle = useMemo(
    () => ({
      width: tokens.box,
      height: tokens.box,
      borderRadius: tokens.borderRadius,
      backgroundColor: boxBg,
      borderWidth: isActive ? 0 : 1,
      borderColor: boxBorder,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      overflow: 'hidden' as const,
    }),
    [tokens, boxBg, boxBorder, isActive],
  );

  const labelStyle =
    size === 'default' ? typography.b1Regular : typography.bodySmall2Regular;

  const descStyle =
    size === 'default'
      ? typography.bodySmall1Regular
      : typography.bodySmall2Regular;

  const hasLabel = label !== undefined;
  const ringOffset = FOCUS_RING_WIDTH + FOCUS_RING_GAP;

  // ── Render ─────────────────────────────────────────────────────
  return (
    <Pressable
      style={[styles.wrapper, hasLabel && styles.wrapperWithLabel, style]}
      onPress={handlePress}
      onFocus={handleFocus}
      onBlur={handleBlur}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: mixed ? 'mixed' : checked, disabled }}
      accessibilityLabel={accessibilityLabel ?? label}
      testID={testID}
    >
      {/* Control + focus ring */}
      <View style={styles.controlWrapper}>
        <View style={boxStyle}>
          {/* Checkmark */}
          {checked && !mixed ? (
            <View
              style={{
                width: tokens.checkLong,
                height: tokens.checkShort,
                borderBottomWidth: tokens.stroke,
                borderLeftWidth: tokens.stroke,
                borderColor: iconColor,
                transform: [{ rotate: '-45deg' }],
                marginTop: -tokens.checkShort * 0.2,
              }}
            />
          ) : null}

          {/* Indeterminate dash */}
          {mixed ? (
            <View
              style={{
                width: tokens.box * 0.5,
                height: tokens.stroke,
                backgroundColor: iconColor,
                borderRadius: tokens.stroke / 2,
              }}
            />
          ) : null}
        </View>

        {showFocusRing ? (
          <View
            style={[
              styles.focusRing,
              {
                top: -ringOffset,
                left: -ringOffset,
                right: -ringOffset,
                bottom: -ringOffset,
                borderRadius: tokens.borderRadius + ringOffset,
                borderColor: FOCUS_RING_COLOR,
              },
            ]}
            pointerEvents="none"
          />
        ) : null}
      </View>

      {/* Label + description */}
      {hasLabel ? (
        <View style={styles.labelColumn}>
          <Text style={[labelStyle, { color: labelColor }]}>{label}</Text>
          {description !== undefined ? (
            <Text style={[descStyle, { color: descColor }]}>{description}</Text>
          ) : null}
        </View>
      ) : null}
    </Pressable>
  );
};

// ─── Styles ─────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'flex-start',
  },
  wrapperWithLabel: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing['Spacing-xl'],
  },
  controlWrapper: {
    paddingTop: spacing['Spacing-sm'],
  },
  labelColumn: {
    flexShrink: 1,
    gap: spacing['Spacing-sm'],
  },
  focusRing: {
    position: 'absolute',
    borderWidth: FOCUS_RING_WIDTH,
  },
});
