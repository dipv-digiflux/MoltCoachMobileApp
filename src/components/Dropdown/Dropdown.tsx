import React, { useCallback, useEffect, useMemo } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { BottomSheet } from '@/components/BottomSheet';
import { colors, moderateScale, spacing, typography } from '@/theme';

import { DropdownItem } from './DropdownItem';
import { useDropdown } from './useDropdown';

import type { DropdownOption, DropdownProps } from '@/types/dropdown.types';

// ─── Design tokens (matching Input component) ───────────────────────

const INPUT_BORDER_RADIUS = moderateScale(2);
const ICON_SIZE = moderateScale(24);
const CHEVRON_SIZE = moderateScale(10);
const CHEVRON_STROKE = moderateScale(1.5);
const CHEVRON_ANIM_DURATION = 200;

// ─── Component ──────────────────────────────────────────────────────

/**
 * A production-ready dropdown that opens a BottomSheet with a scrollable
 * list of options. Supports single-select, multi-select (checkboxes),
 * search, loading/error/disabled states, and React Hook Form integration
 * through standard `value` / `onChange` props.
 *
 * @example
 * // Single select
 * <Dropdown
 *   label="Gender"
 *   options={[{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }]}
 *   value={gender}
 *   onChange={setGender}
 * />
 *
 * @example
 * // Multi select with search
 * <Dropdown
 *   label="Allergies"
 *   multiple
 *   searchable
 *   showSelectAll
 *   showClearButton
 *   options={allergyOptions}
 *   value={selectedAllergies}
 *   onChange={setSelectedAllergies}
 * />
 *
 * @example
 * // React Hook Form
 * <Controller
 *   name="gender"
 *   control={control}
 *   render={({ field: { onChange, value } }) => (
 *     <Dropdown
 *       label="Gender"
 *       options={genderOptions}
 *       value={value}
 *       onChange={onChange}
 *     />
 *   )}
 * />
 */
export const Dropdown = ({
  options,
  multiple = false,
  value,
  defaultValue,
  onChange,
  searchable = false,
  searchPlaceholder = 'Search…',
  placeholder = 'Select…',
  label,
  labelHint,
  required = false,
  showInfoIcon = false,
  onInfoPress,
  disabled = false,
  loading = false,
  error = false,
  errorMessage,
  helperText,
  closeOnSelect,
  showSelectAll = false,
  showClearButton = false,
  sheetTitle,
  renderItem: customRenderItem,
  keyExtractor: customKeyExtractor,
  testID,
  style,
  accessibilityLabel,
}: DropdownProps): React.ReactElement => {
  const resolvedCloseOnSelect = closeOnSelect ?? !multiple;

  const dropdown = useDropdown({
    options,
    multiple,
    value,
    defaultValue,
    onChange,
    closeOnSelect: resolvedCloseOnSelect,
  });

  // ── Derived state ──────────────────────────────────────────
  const showError = error && errorMessage !== undefined;
  const bottomText = showError ? errorMessage : helperText;
  const hasValue = dropdown.displayText.length > 0;

  // ── Chevron rotation animation ─────────────────────────────
  const chevronRotation = useSharedValue(0);

  useEffect(() => {
    chevronRotation.value = withTiming(dropdown.isOpen ? 180 : 0, {
      duration: CHEVRON_ANIM_DURATION,
    });
  }, [dropdown.isOpen, chevronRotation]);

  const chevronAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${chevronRotation.value}deg` }],
  }));

  // ── Colors ─────────────────────────────────────────────────
  const borderColor = useMemo((): string => {
    if (error) return colors.FeedbackWarningBorder;
    if (disabled) return colors.SurfaceSecondaryDisabled;
    if (dropdown.isOpen) return colors.TextPrimaryDefault;
    return colors.SurfaceSecondaryHover;
  }, [error, disabled, dropdown.isOpen]);

  const inputBg = disabled
    ? colors.SurfaceSecondaryDisabled
    : colors.StatesWhite;

  const textColor = disabled
    ? colors.TextPrimaryDisabled
    : hasValue
    ? colors.PrimaryMain
    : colors.TextSecondaryDefault;

  const bottomTextColor = showError
    ? colors.FeedbackWarningText
    : colors.TextSecondaryHover;

  const chevronColor = disabled
    ? colors.IconPrimaryDisabled
    : colors.IconSecondaryDefault;

  // ── Handlers ──────────────────────────────────────────────
  const handleTriggerPress = useCallback((): void => {
    if (!disabled) dropdown.open();
  }, [disabled, dropdown]);

  const defaultKeyExtractor = useCallback(
    (item: DropdownOption): string => String(item.value),
    [],
  );

  const resolvedKeyExtractor = customKeyExtractor ?? defaultKeyExtractor;

  // ── Computed styles ─────────────────────────────────────────
  const triggerStyle = useMemo(
    () => [styles.trigger, { backgroundColor: inputBg, borderColor }],
    [inputBg, borderColor],
  );

  // ── BottomSheet configuration ──────────────────────────────
  const sheetHeader = useMemo(
    () => ({ title: sheetTitle ?? label ?? 'Select', showCloseButton: true }),
    [sheetTitle, label],
  );

  const sheetFooter = useMemo(() => {
    if (!multiple) return undefined;
    return { primaryLabel: 'Done', onPrimaryPress: dropdown.close };
  }, [multiple, dropdown.close]);

  const sheetSearch = useMemo(() => {
    if (!searchable) return undefined;
    return {
      placeholder: searchPlaceholder,
      value: dropdown.searchTerm,
      onChangeText: dropdown.setSearchTerm,
    };
  }, [
    searchable,
    searchPlaceholder,
    dropdown.searchTerm,
    dropdown.setSearchTerm,
  ]);

  // ── Render ─────────────────────────────────────────────────
  return (
    <View style={[styles.wrapper, style]} testID={testID}>
      {/* ── Label row ─────────────────────────────────────── */}
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

      {/* ── Trigger ───────────────────────────────────────── */}
      <Pressable
        style={triggerStyle}
        onPress={handleTriggerPress}
        disabled={disabled}
        accessibilityRole="combobox"
        accessibilityState={{ expanded: dropdown.isOpen, disabled }}
        accessibilityLabel={accessibilityLabel ?? label}
      >
        <Text
          style={[
            typography.bodySmall1Regular,
            styles.triggerText,
            { color: textColor },
          ]}
          numberOfLines={1}
        >
          {hasValue ? dropdown.displayText : placeholder}
        </Text>

        {loading ? (
          <ActivityIndicator
            size="small"
            color={colors.IconSecondaryDefault}
            style={styles.chevronArea}
          />
        ) : (
          <Animated.View style={[styles.chevronArea, chevronAnimatedStyle]}>
            <View style={[styles.chevron, { borderColor: chevronColor }]} />
          </Animated.View>
        )}
      </Pressable>

      {/* ── Helper / error text ────────────────────────────── */}
      {bottomText !== undefined ? (
        <Text
          style={[typography.bodySmall1Regular, { color: bottomTextColor }]}
        >
          {bottomText}
        </Text>
      ) : null}

      {/* ── Bottom Sheet ───────────────────────────────────── */}
      <BottomSheet
        visible={dropdown.isOpen}
        onClose={dropdown.close}
        variant="list"
        header={sheetHeader}
        footer={sheetFooter}
        search={sheetSearch}
        loading={loading}
        emptyMessage="No options found"
      >
        {/* Select All / Clear actions */}
        {multiple && (showSelectAll || showClearButton) ? (
          <View style={styles.actionRow}>
            {showSelectAll ? (
              <Pressable
                onPress={dropdown.selectAll}
                style={styles.actionButton}
                accessibilityRole="button"
                accessibilityLabel="Select all"
              >
                <Text style={[typography.bodySmall1Medium, styles.actionText]}>
                  Select all
                </Text>
              </Pressable>
            ) : null}
            {showClearButton && dropdown.selectedValues.length > 0 ? (
              <Pressable
                onPress={dropdown.clearSelection}
                style={styles.actionButton}
                accessibilityRole="button"
                accessibilityLabel="Clear selection"
              >
                <Text
                  style={[typography.bodySmall1Medium, styles.actionClearText]}
                >
                  Clear
                </Text>
              </Pressable>
            ) : null}
          </View>
        ) : null}

        {/* Options list */}
        {dropdown.filteredOptions.map(option => {
          const key = resolvedKeyExtractor(option);
          if (customRenderItem !== undefined) {
            return (
              <Pressable
                key={key}
                onPress={(): void => dropdown.toggleOption(option.value)}
              >
                {customRenderItem(option, dropdown.isSelected(option.value))}
              </Pressable>
            );
          }
          return (
            <DropdownItem
              key={key}
              option={option}
              selected={dropdown.isSelected(option.value)}
              multiple={multiple}
              onSelect={dropdown.toggleOption}
            />
          );
        })}

        {/* Empty state when filtered results are empty */}
        {dropdown.filteredOptions.length === 0 && !loading ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No options found</Text>
          </View>
        ) : null}
      </BottomSheet>
    </View>
  );
};

// ─── Static styles ──────────────────────────────────────────────────

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing['Spacing-xl'],
  },

  // ── Label (matches Input) ────────────────────────────────────────
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

  // ── Trigger (matches Input container) ────────────────────────────
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: INPUT_BORDER_RADIUS,
    overflow: 'hidden',
  },
  triggerText: {
    flex: 1,
    paddingHorizontal: spacing['Spacing-2xl'],
    paddingVertical: spacing['Spacing-5xl'],
  },

  // ── Chevron ──────────────────────────────────────────────────────
  chevronArea: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing['Spacing-m'],
  },
  chevron: {
    width: CHEVRON_SIZE,
    height: CHEVRON_SIZE,
    borderBottomWidth: CHEVRON_STROKE,
    borderRightWidth: CHEVRON_STROKE,
    transform: [{ rotate: '45deg' }],
    marginTop: -CHEVRON_SIZE * 0.25,
  },

  // ── Action row (Select All / Clear) ──────────────────────────────
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing['Spacing-3xl'],
    paddingVertical: spacing['Spacing-xl'],
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.StatesOutline,
  },
  actionButton: {
    paddingVertical: spacing['Spacing-m'],
    paddingHorizontal: spacing['Spacing-xl'],
  },
  actionText: {
    color: colors.PrimaryMain,
  },
  actionClearText: {
    color: colors.FeedbackWarningText,
  },

  // ── Empty state ──────────────────────────────────────────────────
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['Spacing-15xl'],
  },
  emptyText: {
    ...typography.bodySmall1Regular,
    color: colors.TextSecondaryDefault,
  },
});
