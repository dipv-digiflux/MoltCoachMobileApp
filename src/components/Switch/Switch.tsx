import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, moderateScale, spacing, typography } from '@/theme';

import { type SwitchProps, type SwitchSize } from './Switch.types';

// ─── Design tokens ──────────────────────────────────────────────────

const FOCUS_RING_COLOR = '#EDEFF5';
const FOCUS_RING_WIDTH = 3;
const FOCUS_RING_GAP = 1;
const THUMB_INSET = moderateScale(2);
const ANIMATION_DURATION = 200;

type SizeTokens = {
  trackWidth: number;
  trackHeight: number;
  thumb: number;
  onTranslateX: number;
};

const buildSizeTokens = (
  trackW: number,
  trackH: number,
  thumbD: number,
): SizeTokens => {
  const tw = moderateScale(trackW);
  const th = moderateScale(trackH);
  const td = moderateScale(thumbD);
  return {
    trackWidth: tw,
    trackHeight: th,
    thumb: td,
    onTranslateX: tw - td - THUMB_INSET * 2,
  };
};

const SIZE_TOKENS: Record<SwitchSize, SizeTokens> = {
  default: buildSizeTokens(32, 20, 16),
  small: buildSizeTokens(24, 16, 12),
};

// ─── Component ──────────────────────────────────────────────────────

/**
 * Custom toggle switch with on/off and disabled states.
 * Includes a smooth slide animation for the thumb.
 * Supports optional label and description text.
 *
 * @example
 * <Switch on={isEnabled} onChange={setIsEnabled} label="Notifications" />
 * <Switch on disabled size="small" />
 */
export const Switch = ({
  on = false,
  disabled = false,
  label,
  description,
  size = 'default',
  onChange,
  testID,
  style,
  accessibilityLabel,
}: SwitchProps): React.ReactElement => {
  const [focused, setFocused] = useState(false);
  const tokens = SIZE_TOKENS[size];

  // ── Thumb animation ────────────────────────────────────────────
  const translateX = useRef(
    new Animated.Value(on ? tokens.onTranslateX : 0),
  ).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: on ? tokens.onTranslateX : 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  }, [on, tokens.onTranslateX, translateX]);

  // ── Colors ─────────────────────────────────────────────────────
  const trackBg = disabled
    ? on
      ? colors.StatesFill1
      : colors.SurfacePrimaryDisabled
    : on
    ? colors.PrimaryMain
    : colors.SurfacePrimaryActive;

  const labelColor = disabled ? colors.TextPrimaryDisabled : colors.PrimaryMain;
  const descColor = disabled
    ? colors.TextPrimaryDisabled
    : colors.TextSecondaryHover;

  const showFocusRing = focused && !disabled;

  // ── Handlers ───────────────────────────────────────────────────
  const handlePress = useCallback((): void => {
    if (!disabled) {
      onChange?.(!on);
    }
  }, [disabled, on, onChange]);

  const handleFocus = useCallback((): void => {
    if (!disabled) setFocused(true);
  }, [disabled]);

  const handleBlur = useCallback((): void => {
    setFocused(false);
  }, []);

  // ── Track style ────────────────────────────────────────────────
  const trackStyle = useMemo(
    () => ({
      width: tokens.trackWidth,
      height: tokens.trackHeight,
      borderRadius: tokens.trackHeight / 2,
      backgroundColor: trackBg,
      justifyContent: 'center' as const,
      overflow: 'hidden' as const,
    }),
    [tokens, trackBg],
  );

  const thumbStyle = useMemo(
    () => ({
      width: tokens.thumb,
      height: tokens.thumb,
      borderRadius: tokens.thumb / 2,
      backgroundColor: colors.StatesWhite,
      position: 'absolute' as const,
      left: THUMB_INSET,
      top: (tokens.trackHeight - tokens.thumb) / 2,
    }),
    [tokens],
  );

  const labelTextStyle =
    size === 'default' ? typography.b1Regular : typography.bodySmall2Regular;

  const descTextStyle =
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
      accessibilityRole="switch"
      accessibilityState={{ checked: on, disabled }}
      accessibilityLabel={accessibilityLabel ?? label}
      testID={testID}
    >
      {/* Track + thumb + focus ring */}
      <View style={styles.controlWrapper}>
        <View style={trackStyle}>
          <Animated.View
            style={[thumbStyle, { transform: [{ translateX }] }]}
          />
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
                borderRadius: tokens.trackHeight / 2 + ringOffset,
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
          <Text style={[labelTextStyle, { color: labelColor }]}>{label}</Text>
          {description !== undefined ? (
            <Text style={[descTextStyle, { color: descColor }]}>
              {description}
            </Text>
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
    gap: spacing['Spacing-xs'],
  },
  focusRing: {
    position: 'absolute',
    borderWidth: FOCUS_RING_WIDTH,
  },
});
