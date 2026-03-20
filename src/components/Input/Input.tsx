import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  View,
  ViewStyle,
} from 'react-native';

import { colors, moderateScale, spacing, typography } from '@/theme';

import { type InputProps } from './Input.types';

// ─── Design tokens (from Figma) ────────────────────────────────────

const INPUT_BORDER_RADIUS = moderateScale(2);
const ICON_SIZE = moderateScale(24);

// ─── Component ──────────────────────────────────────────────────────

/**
 * A flexible text input that supports label, helper/error text,
 * left text add-on (e.g. "https://"), left/right icons, right text,
 * and a trailing button — all from one component via props.
 *
 * Label uses `b1.medium` (16 px) per project convention.
 * Error state shows a red border + red error message below.
 *
 * @example
 * <Input label="Email" placeholder="you@example.com" required />
 * <Input label="URL" leftText="https://" placeholder="example.com" />
 * <Input label="Search" rightIcon={<SearchIcon />} />
 * <Input label="Code" rightButton="Apply" onRightButtonPress={handleApply} />
 * <Input label="Password" error errorMessage="Too short" secureTextEntry />
 */
export const Input = ({
  value,
  placeholder,
  onChangeText,
  onFocus: onFocusProp,
  onBlur: onBlurProp,
  label,
  labelHint,
  required = false,
  showInfoIcon = false,
  onInfoPress,
  error = false,
  errorMessage,
  helperText,
  leftText,
  leftIcon,
  rightIcon,
  rightText,
  rightButton,
  onRightButtonPress,
  disabled = false,
  editable = true,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  maxLength,
  multiline,
  returnKeyType,
  onSubmitEditing,
  testID,
  style,
  autoFocus,
  accessibilityLabel,
  caretHidden,
  containerPress,
  labelTextStyle,
  inputContainerStyle: inputContainerStyleProp,
  textInputStyle,
}: InputProps): React.ReactElement => {
  const inputRef = useRef<RNTextInput>(null);
  const [focused, setFocused] = useState(false);

  // ── Derived state ──────────────────────────────────────────────
  const isDisabled = disabled;
  const showError = error && errorMessage !== undefined;
  const bottomText = showError ? errorMessage : helperText;
  const hasLeftText = leftText !== undefined;
  const hasRightButton = rightButton !== undefined;

  // ── Colors ─────────────────────────────────────────────────────
  const borderColor = useMemo((): string => {
    if (error) return colors.FeedbackWarningBorder;
    if (isDisabled) return colors.SurfaceSecondaryDisabled;
    if (focused) return colors.TextPrimaryDefault;
    return colors.SurfaceSecondaryHover;
  }, [error, isDisabled, focused]);

  const inputBg = isDisabled
    ? colors.SurfaceSecondaryDisabled
    : colors.StatesWhite;

  const textColor = isDisabled
    ? colors.TextPrimaryDisabled
    : colors.PrimaryMain;

  const placeholderColor = isDisabled
    ? colors.TextPrimaryDisabled
    : error
    ? colors.TextSecondaryDisabled
    : colors.TextSecondaryDefault;

  const bottomTextColor = showError
    ? colors.FeedbackWarningText
    : colors.TextSecondaryHover;

  // ── Handlers ───────────────────────────────────────────────────
  const handleFocus = useCallback((): void => {
    setFocused(true);
    onFocusProp?.();
  }, [onFocusProp]);

  const handleBlur = useCallback((): void => {
    setFocused(false);
    onBlurProp?.();
  }, [onBlurProp]);

  const handleContainerPress = useCallback((): void => {
    containerPress?.();
    inputRef.current?.focus();
  }, []);

  // ── Computed styles ────────────────────────────────────────────
  const inputContainerStyle = useMemo(
    (): StyleProp<ViewStyle> => [
      styles.inputContainer,
      {
        backgroundColor: inputBg,
        borderColor,
      },
      inputContainerStyleProp,
    ],
    [inputBg, borderColor, inputContainerStyleProp],
  );

  // ── Render ─────────────────────────────────────────────────────
  return (
    <View style={[styles.wrapper, style]} testID={testID}>
      {/* ── Label row ────────────────────────────────────────── */}
      {label !== undefined ? (
        <View style={styles.labelRow}>
          <Text style={[typography.b1Medium, styles.labelText, labelTextStyle]}>
            {label}
          </Text>

          {labelHint !== undefined ? (
            <Text style={[typography.b1Regular, styles.labelHint]}>
              {labelHint}
            </Text>
          ) : null}

          {required ? (
            <Text style={[typography.b1Regular, styles.requiredStar]}>*</Text>
          ) : null}

          {showInfoIcon ? (
            <Pressable
              onPress={onInfoPress}
              hitSlop={spacing['Spacing-xl']}
              style={styles.infoIconWrap}
              accessibilityRole="button"
              accessibilityLabel="More info"
            >
              <View style={styles.infoCircle}>
                <Text style={styles.infoLetter}>i</Text>
              </View>
            </Pressable>
          ) : null}
        </View>
      ) : null}

      {/* ── Input container ──────────────────────────────────── */}
      <Pressable
        style={inputContainerStyle}
        onPress={handleContainerPress}
        disabled={isDisabled}
        accessibilityLabel={accessibilityLabel ?? label}
      >
        {/* Left text add-on (external, with divider) */}
        {hasLeftText ? (
          <View style={styles.leftTextAddOn}>
            <Text
              style={[
                typography.bodySmall1Regular,
                { color: colors.TextSecondaryDefault },
              ]}
            >
              {leftText}
            </Text>
          </View>
        ) : null}

        {/* Left icon */}
        {leftIcon !== undefined ? (
          <View style={styles.iconWrapLeft}>{leftIcon}</View>
        ) : null}

        {/* Actual TextInput */}
        <RNTextInput
          autoFocus={autoFocus}
          ref={inputRef}
          style={[
            styles.textInput,
            typography.bodySmall1Regular,
            { color: textColor },
            textInputStyle,
          ]}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={editable}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          maxLength={maxLength}
          multiline={multiline}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          underlineColorAndroid={colors.Transparent}
          caretHidden={caretHidden}
        />

        {/* Right icon */}
        {rightIcon !== undefined ? (
          <View style={styles.iconWrapRight}>{rightIcon}</View>
        ) : null}

        {/* Right text add-on */}
        {rightText !== undefined ? (
          <View style={styles.rightTextAddOn}>
            <Text
              style={[
                typography.bodySmall1Regular,
                { color: colors.TextPrimaryDefault },
              ]}
            >
              {rightText}
            </Text>
          </View>
        ) : null}

        {/* Right button */}
        {hasRightButton ? (
          <Pressable
            style={styles.rightButton}
            onPress={onRightButtonPress}
            disabled={isDisabled}
            accessibilityRole="button"
          >
            <Text
              style={[
                typography.bodySmall1Medium,
                {
                  color: isDisabled
                    ? colors.TextPrimaryDisabled
                    : colors.PrimaryMain,
                },
              ]}
            >
              {rightButton}
            </Text>
          </Pressable>
        ) : null}
      </Pressable>

      {/* ── Helper / error text ──────────────────────────────── */}
      {bottomText !== undefined ? (
        <Text
          style={[typography.bodySmall1Regular, { color: bottomTextColor }]}
        >
          {bottomText}
        </Text>
      ) : null}
    </View>
  );
};

// ─── Static styles ──────────────────────────────────────────────────

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing['Spacing-xl'],
  },

  // ── Label ─────────────────────────────────────────────────────
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-m'],
  },
  labelText: {
    color: colors.PrimaryMain,
  },
  labelHint: {
    color: colors.TextSecondaryHover,
  },
  requiredStar: {
    color: colors.FeedbackWarningText,
  },
  infoIconWrap: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCircle: {
    width: moderateScale(16),
    height: moderateScale(16),
    borderRadius: moderateScale(8),
    borderWidth: 1.5,
    borderColor: colors.TextSecondaryDefault,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoLetter: {
    ...typography.bodySmall3SemiBold,
    color: colors.TextSecondaryDefault,
  },

  // ── Input container ───────────────────────────────────────────
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // height: INPUT_HEIGHT,
    borderWidth: 1,
    borderRadius: INPUT_BORDER_RADIUS,
    overflow: 'hidden',
  },

  // ── Left text add-on (external) ───────────────────────────────
  leftTextAddOn: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: spacing['Spacing-5xl'],
    borderRightWidth: 1,
    borderRightColor: colors.SurfaceSecondaryHover,
  },

  // ── Icons ─────────────────────────────────────────────────────
  iconWrapLeft: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing['Spacing-m'],
  },
  iconWrapRight: {
    // width: ICON_SIZE,
    // height: ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing['Spacing-m'],
  },

  // ── TextInput ─────────────────────────────────────────────────
  textInput: {
    flex: 1,
    paddingHorizontal: spacing['Spacing-2xl'],
    paddingVertical: spacing['Spacing-5xl'],
    // verticalAlign: 'middle',
  },

  // ── Right text add-on ─────────────────────────────────────────
  rightTextAddOn: {
    paddingHorizontal: spacing['Spacing-xl'],
  },

  // ── Right button ──────────────────────────────────────────────
  rightButton: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: spacing['Spacing-3xl'],
    borderLeftWidth: 1,
    borderLeftColor: colors.StatesOutline,
  },
});
