import React, { isValidElement, useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors } from '@/theme';

import {
  FOCUS_RING_WIDTH,
  LOADING_CONTENT_OPACITY,
  SIZE_CONFIG,
  VARIANT_STATE_COLORS,
} from './Button.config';
import {
  type ButtonDefaultIconName,
  type ButtonIconProp,
  type ButtonInteractionState,
  type ButtonProps,
} from './Button.types';
import { ButtonDefaultIcon } from './ButtonDefaultIcon';

// ─── Helpers ────────────────────────────────────────────────────────

const isDefaultIconName = (value: unknown): value is ButtonDefaultIconName =>
  typeof value === 'string';

const resolveInteractionState = (
  disabled: boolean,
  loading: boolean,
  pressed: boolean,
  focused: boolean,
): ButtonInteractionState => {
  if (disabled) return 'disabled';
  if (loading) return 'loading';
  if (pressed) return 'hover';
  if (focused) return 'focus';
  return 'default';
};

// ─── Component ──────────────────────────────────────────────────────

/**
 * A fully-typed, multi-variant button component that mirrors the Figma
 * "Button component" spec (file `u022yCQNQNBnqNp6ZUmkvc`, node `6:22694`).
 *
 * ## Variants
 * `primary` | `secondary` | `minimal` | `destructive`
 *
 * ## Sizes
 * `small` (32 px) | `default` (44 px) | `large` (52 px)
 *
 * ## Icons
 * - Pass a built-in name (`"plus"`, `"arrow-right"`, …) or a custom `ReactElement`.
 * - Supported positions: left only, right only, both (different icons), or none.
 *
 * ## Interaction states
 * Default → Hover (on press-in) → Focus → Loading → Disabled.
 * When `loading` or `disabled`, hover and focus states are suppressed.
 *
 * @example
 * <Button label="Save" />
 * <Button label="Delete" variant="destructive" size="large" />
 * <Button label="Add" iconLeft="plus" iconRight="arrow-right" />
 * <Button iconLeft="plus" variant="secondary" />        // icon-only
 * <Button label="Saving…" loading />
 */
export const Button = ({
  label,
  variant = 'primary',
  size = 'default',
  loading = false,
  disabled = false,
  iconLeft,
  iconRight,
  onPress,
  testID,
  style,
  accessibilityLabel,
  fullWidth,
}: ButtonProps): React.ReactElement => {
  // ── Local state ──────────────────────────────────────────────────
  const [pressed, setPressed] = useState(false);
  const [focused, setFocused] = useState(false);

  const isDisabledOrLoading = disabled || loading;
  const isIconOnly =
    label === undefined && (iconLeft !== undefined || iconRight !== undefined);

  // ── Derived config ───────────────────────────────────────────────
  const interactionState = resolveInteractionState(
    disabled,
    loading,
    pressed,
    focused,
  );
  const sizeConfig = SIZE_CONFIG[size];
  const stateColors = VARIANT_STATE_COLORS[variant][interactionState];

  // ── Handlers ─────────────────────────────────────────────────────
  const handlePressIn = useCallback((): void => {
    if (!isDisabledOrLoading) {
      setPressed(true);
    }
  }, [isDisabledOrLoading]);

  const handlePressOut = useCallback((): void => {
    setPressed(false);
  }, []);

  const handleFocus = useCallback((): void => {
    if (!isDisabledOrLoading) {
      setFocused(true);
    }
  }, [isDisabledOrLoading]);

  const handleBlur = useCallback((): void => {
    setFocused(false);
  }, []);

  const handlePress = useCallback((): void => {
    onPress?.();
  }, [onPress]);

  // ── Icon renderer ────────────────────────────────────────────────
  const renderIcon = (icon: ButtonIconProp): React.ReactElement | null => {
    if (isDefaultIconName(icon)) {
      return (
        <ButtonDefaultIcon
          name={icon}
          size={sizeConfig.iconSize}
          color={stateColors.iconColor}
        />
      );
    }

    if (isValidElement(icon)) {
      return (
        <View
          style={{
            width: sizeConfig.iconSize,
            height: sizeConfig.iconSize,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </View>
      );
    }

    return null;
  };

  // ── Computed styles ──────────────────────────────────────────────
  const containerStyle = useMemo(
    () => [
      styles.container,
      {
        backgroundColor: stateColors.backgroundColor,
        borderColor: stateColors.borderColor,
        borderRadius: sizeConfig.borderRadius,
        height: isIconOnly ? sizeConfig.iconOnlySize : sizeConfig.height,
        width: isIconOnly ? sizeConfig.iconOnlySize : undefined,
        paddingHorizontal: isIconOnly ? 0 : sizeConfig.paddingHorizontal,
      },
    ],
    [stateColors, sizeConfig, isIconOnly],
  );

  const contentOpacity = loading ? LOADING_CONTENT_OPACITY : 1;

  const showFocusRing =
    interactionState === 'focus' &&
    stateColors.focusRingColor !== colors.Transparent;

  // ── Render ───────────────────────────────────────────────────────
  return (
    <View
      style={[
        styles.wrapper,
        fullWidth === true ? { alignSelf: 'stretch' } : null,
        style,
      ]}
      testID={testID}
    >
      <Pressable
        style={containerStyle}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={isDisabledOrLoading}
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabledOrLoading, busy: loading }}
        accessibilityLabel={accessibilityLabel ?? label}
      >
        {/* Content row – faded when loading */}
        <View
          style={[
            styles.contentRow,
            { opacity: contentOpacity, gap: sizeConfig.gap },
          ]}
        >
          {iconLeft !== undefined ? renderIcon(iconLeft) : null}

          {label !== undefined ? (
            <View style={styles.labelFrame}>
              <Text
                style={[
                  sizeConfig.labelStyle,
                  { color: stateColors.textColor },
                ]}
                numberOfLines={1}
              >
                {label}
              </Text>
            </View>
          ) : null}

          {iconRight !== undefined ? renderIcon(iconRight) : null}
        </View>

        {/* Loading spinner – absolute centered over content */}
        {loading ? (
          <View style={styles.spinnerOverlay}>
            <ActivityIndicator size="small" color={stateColors.spinnerColor} />
          </View>
        ) : null}
      </Pressable>

      {/* Focus ring – sits outside the button, zero layout impact */}
      {showFocusRing ? (
        <View
          style={[
            styles.focusRing,
            {
              borderColor: stateColors.focusRingColor,
              borderRadius: sizeConfig.borderRadius + FOCUS_RING_WIDTH,
            },
          ]}
          pointerEvents="none"
        />
      ) : null}
    </View>
  );
};

// ─── Static styles ──────────────────────────────────────────────────

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'flex-start',
    overflow: 'visible',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    overflow: 'hidden',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelFrame: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  spinnerOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusRing: {
    position: 'absolute',
    top: -FOCUS_RING_WIDTH,
    left: -FOCUS_RING_WIDTH,
    right: -FOCUS_RING_WIDTH,
    bottom: -FOCUS_RING_WIDTH,
    borderWidth: FOCUS_RING_WIDTH,
  },
});
