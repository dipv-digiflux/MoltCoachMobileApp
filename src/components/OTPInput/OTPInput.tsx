import React, { useCallback, useRef } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, moderateScale, spacing, typography } from '@/theme';

import type { OTPInputProps } from './OTPInput.types';

// ─── Design tokens (from Figma) ────────────────────────────────────

const OTP_BORDER_RADIUS = moderateScale(2);

// ─── Component ──────────────────────────────────────────────────────

/**
 * Reusable OTP (One-Time Password) input component.
 * Renders a single bordered input box with digit positions inside (no per-cell borders).
 *
 * Styling per design:
 * - border-radius: 2px
 * - border: 1px solid States-outline (#EBEBEB)
 * - background: State-white (#FFF)
 *
 * @example
 * <OTPInput value={code} onChangeText={setCode} length={4} />
 */
export const OTPInput = ({
  value,
  onChangeText,
  length = 4,
  placeholder = '-',
  autoFocus = false,
  testID,
  style,
  accessibilityLabel = 'OTP input',
}: OTPInputProps): React.ReactElement => {
  const inputRef = useRef<TextInput | null>(null);

  const handleChangeText = useCallback(
    (text: string): void => {
      const numericOnly = text.replace(/[^0-9]/g, '');
      const truncated = numericOnly.slice(0, length);
      onChangeText(truncated);
    },
    [length, onChangeText],
  );

  const handleContainerPress = useCallback((): void => {
    inputRef.current?.focus();
  }, []);

  return (
    <Pressable
      onPress={handleContainerPress}
      style={[styles.container, style]}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
    >
      <View style={styles.row}>
        {Array.from({ length }).map((_, index) => {
          const char = value[index] ?? '';
          const display = char || placeholder;

          return (
            <View key={String(index)} style={styles.digitSlot}>
              <Text style={styles.digitText}>{display}</Text>
            </View>
          );
        })}
      </View>

      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChangeText}
        keyboardType="number-pad"
        maxLength={length}
        style={styles.hiddenInput}
        autoFocus={autoFocus}
      />
    </Pressable>
  );
};

// ─── Static styles ──────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    borderRadius: OTP_BORDER_RADIUS,
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    backgroundColor: colors.StatesWhite,
    paddingHorizontal: spacing['Spacing-13xl'],
    paddingVertical: spacing['Spacing-xl'],
    position: 'relative',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  digitSlot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  digitText: {
    ...typography.h6SemiBold,
    color: colors.TextPrimaryDefault,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
