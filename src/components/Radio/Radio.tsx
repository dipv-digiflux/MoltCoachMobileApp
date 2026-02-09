import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, moderateScale, spacing, typography } from '@/theme';

import { type RadioProps, type RadioSize } from './Radio.types';

// ─── Design tokens ──────────────────────────────────────────────────

const FOCUS_RING_COLOR = '#EDEFF5';
const FOCUS_RING_WIDTH = 3;
const FOCUS_RING_GAP = 1;

type SizeTokens = {
  outer: number;
  dot: number;
};

const SIZE_TOKENS: Record<RadioSize, SizeTokens> = {
  default: {
    outer: moderateScale(20),
    dot: moderateScale(8),
  },
  small: {
    outer: moderateScale(16),
    dot: moderateScale(6.4),
  },
};

// ─── Component ──────────────────────────────────────────────────────

/**
 * Radio button with selected, unselected, and disabled states.
 * Supports optional label and description text.
 *
 * @example
 * <Radio selected={choice === 'a'} onPress={() => setChoice('a')} label="Option A" />
 * <Radio selected disabled size="small" />
 */
export const Radio = ({
  selected = false,
  disabled = false,
  label,
  description,
  size = 'default',
  onPress,
  testID,
  style,
  accessibilityLabel,
}: RadioProps): React.ReactElement => {
  const [focused, setFocused] = useState(false);

  const tokens = SIZE_TOKENS[size];

  // ── Colors ─────────────────────────────────────────────────────
  const outerBg = disabled
    ? selected
      ? colors.StatesFill1
      : colors.StatesWhite
    : selected
    ? colors.PrimaryMain
    : colors.StatesWhite;

  const outerBorder = disabled
    ? colors.BorderPrimaryDisabled
    : focused && !selected
    ? colors.PrimaryMain
    : selected
    ? 'transparent'
    : colors.BorderPrimaryDefault;

  const dotColor = disabled ? colors.TextPrimaryDisabled : colors.StatesWhite;
  const labelColor = disabled ? colors.TextPrimaryDisabled : colors.PrimaryMain;
  const descColor = disabled
    ? colors.TextPrimaryDisabled
    : colors.TextSecondaryHover;

  const showFocusRing = focused && !disabled;

  // ── Handlers ───────────────────────────────────────────────────
  const handlePress = useCallback((): void => {
    if (!disabled) {
      onPress?.();
    }
  }, [disabled, onPress]);

  const handleFocus = useCallback((): void => {
    if (!disabled) setFocused(true);
  }, [disabled]);

  const handleBlur = useCallback((): void => {
    setFocused(false);
  }, []);

  // ── Outer style ────────────────────────────────────────────────
  const outerStyle = useMemo(
    () => ({
      width: tokens.outer,
      height: tokens.outer,
      borderRadius: tokens.outer / 2,
      backgroundColor: outerBg,
      borderWidth: selected ? 0 : 1,
      borderColor: outerBorder,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      overflow: 'hidden' as const,
    }),
    [tokens, outerBg, outerBorder, selected],
  );

  const dotStyle = useMemo(
    () => ({
      width: tokens.dot,
      height: tokens.dot,
      borderRadius: tokens.dot / 2,
      backgroundColor: dotColor,
    }),
    [tokens.dot, dotColor],
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
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled }}
      accessibilityLabel={accessibilityLabel ?? label}
      testID={testID}
    >
      {/* Control + focus ring */}
      <View style={styles.controlWrapper}>
        <View style={outerStyle}>{selected && <View style={dotStyle} />}</View>

        {showFocusRing && (
          <View
            style={[
              styles.focusRing,
              {
                top: -ringOffset,
                left: -ringOffset,
                right: -ringOffset,
                bottom: -ringOffset,
                borderRadius: tokens.outer / 2 + ringOffset,
                borderColor: FOCUS_RING_COLOR,
              },
            ]}
            pointerEvents="none"
          />
        )}
      </View>

      {/* Label + description */}
      {hasLabel && (
        <View style={styles.labelColumn}>
          <Text style={[labelStyle, { color: labelColor }]}>{label}</Text>
          {description !== undefined && (
            <Text style={[descStyle, { color: descColor }]}>{description}</Text>
          )}
        </View>
      )}
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
    gap: spacing['Spacing-xs'],
  },
  focusRing: {
    position: 'absolute',
    borderWidth: FOCUS_RING_WIDTH,
  },
});
