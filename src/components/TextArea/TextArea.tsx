import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  View,
} from 'react-native';

import { colors, moderateScale, spacing, typography } from '@/theme';

import { type TextAreaProps } from './TextArea.types';

// ─── Design tokens (from Figma) ────────────────────────────────────

const TEXTAREA_BORDER_RADIUS = moderateScale(2);
const TEXTAREA_MIN_HEIGHT = moderateScale(176);
const TEXTAREA_PADDING_H = spacing['Spacing-5xl'];
const TEXTAREA_PADDING_V = spacing['Spacing-xl'];
const ICON_SIZE = moderateScale(24);

// ─── Component ──────────────────────────────────────────────────────

/**
 * A multiline text input (textarea) that supports label, helper/error text,
 * and all standard input states (placeholder, filled, hover, focus, disabled, error).
 *
 * Label uses `b1.medium` (16 px) per project convention.
 * Error state shows a red border + red error message below.
 *
 * @example
 * <TextArea label="Description" placeholder="Enter your message" />
 * <TextArea label="Comments" required minHeight={120} />
 * <TextArea label="Feedback" error errorMessage="Required field" />
 * <TextArea label="Notes" disabled value="Cannot edit" />
 */
export const TextArea = ({
  value,
  placeholder,
  onChangeText,
  label,
  labelHint,
  required = false,
  showInfoIcon = false,
  onInfoPress,
  error = false,
  errorMessage,
  helperText,
  disabled = false,
  editable = true,
  autoCapitalize,
  maxLength,
  minHeight = TEXTAREA_MIN_HEIGHT,
  maxHeight,
  returnKeyType,
  onSubmitEditing,
  testID,
  style,
  accessibilityLabel,
}: TextAreaProps): React.ReactElement => {
  const inputRef = useRef<RNTextInput>(null);
  const [focused, setFocused] = useState(false);

  // ── Derived state ──────────────────────────────────────────────
  const isDisabled = disabled || !editable;
  const showError = error && errorMessage !== undefined;
  const bottomText = showError ? errorMessage : helperText;

  // ── Colors ─────────────────────────────────────────────────────
  const borderColor = useMemo((): string => {
    if (error) return colors.FeedbackWarningBorder;
    if (isDisabled) return colors.BorderPrimaryDisabled;
    if (focused) return colors.StatesOutline;
    return colors.BorderPrimaryDefault;
  }, [error, isDisabled, focused]);

  const textareaBg = isDisabled ? colors.StatesFill2 : colors.StatesWhite;

  const textColor = isDisabled
    ? colors.TextPrimaryDisabled
    : colors.PrimaryMain;

  const placeholderColor = isDisabled
    ? colors.TextPrimaryDisabled
    : error
    ? colors.TextSecondaryDisabled
    : colors.TextSecondaryDisabled;

  const bottomTextColor = showError
    ? colors.FeedbackWarningText
    : colors.TextSecondaryHover;

  // ── Handlers ───────────────────────────────────────────────────
  const handleFocus = useCallback((): void => {
    setFocused(true);
  }, []);

  const handleBlur = useCallback((): void => {
    setFocused(false);
  }, []);

  const handleContainerPress = useCallback((): void => {
    inputRef.current?.focus();
  }, []);

  // ── Computed styles ────────────────────────────────────────────
  const textareaContainerStyle = useMemo(
    () => [
      styles.textareaContainer,
      {
        backgroundColor: textareaBg,
        borderColor,
        minHeight,
        ...(maxHeight !== undefined && { maxHeight }),
      },
    ],
    [textareaBg, borderColor, minHeight, maxHeight],
  );

  // ── Render ─────────────────────────────────────────────────────
  return (
    <View style={[styles.wrapper, style]} testID={testID}>
      {/* ── Label row ────────────────────────────────────────── */}
      {label !== undefined ? (
        <View style={styles.labelRow}>
          <Text style={[typography.b1Medium, styles.labelText]}>{label}</Text>

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

      {/* ── Textarea container ──────────────────────────────────── */}
      <Pressable
        style={textareaContainerStyle}
        onPress={handleContainerPress}
        disabled={isDisabled}
        accessibilityLabel={accessibilityLabel ?? label}
      >
        <RNTextInput
          ref={inputRef}
          style={[
            styles.textInput,
            typography.bodySmall1Regular,
            { color: textColor },
          ]}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={!isDisabled}
          multiline
          textAlignVertical="top"
          autoCapitalize={autoCapitalize}
          maxLength={maxLength}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          underlineColorAndroid={colors.Transparent}
        />
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

  // ── Textarea container ───────────────────────────────────────────
  textareaContainer: {
    borderWidth: 1,
    borderRadius: TEXTAREA_BORDER_RADIUS,
    overflow: 'hidden',
  },

  // ── TextInput ─────────────────────────────────────────────────
  textInput: {
    flex: 1,
    paddingHorizontal: TEXTAREA_PADDING_H,
    paddingVertical: TEXTAREA_PADDING_V,
  },
});
