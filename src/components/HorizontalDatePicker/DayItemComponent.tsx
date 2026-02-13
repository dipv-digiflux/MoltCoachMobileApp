import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

import { colors, moderateScale, spacing, typography } from '@/theme';

import { type DayItem } from './HorizontalDatePicker.types';

type DayItemComponentProps = {
  item: DayItem;
  isSelected: boolean;
  onPress: (item: DayItem) => void;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// ─── Design constants (from Figma) ────────────────────────────────────

const DAY_ITEM_WIDTH = moderateScale(52);
const DAY_ITEM_PADDING_V = spacing['Spacing-l']; // 6px
const DAY_ITEM_GAP = spacing['Spacing-sm']; // 2px between day name and number
const ITEM_GAP = spacing['Spacing-xl']; // 8px between items
const BORDER_RADIUS = moderateScale(2);

// ─── Component ────────────────────────────────────────────────────────

/**
 * Individual day item component with animations.
 * Memoized for performance optimization.
 */
export const DayItemComponent = memo<DayItemComponentProps>(
  ({ item, isSelected, onPress }) => {
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            scale: withSpring(isSelected ? 1 : 0.98, {
              damping: 15,
              stiffness: 200,
            }),
          },
        ],
      };
    }, [isSelected]);

    const containerStyle = [
      styles.container,
      isSelected ? styles.containerSelected : styles.containerUnselected,
      item.isDisabled && styles.containerDisabled,
    ];

    const dayNameStyle = [
      typography.bodySmall2Regular,
      isSelected
        ? { color: colors.StatesFill2 }
        : { color: colors.TextSecondaryDefault },
      item.isDisabled && styles.textDisabled,
    ];

    const dayNumberStyle = [
      typography.bodySmall1Bold,
      isSelected
        ? { color: colors.StatesFill2 }
        : { color: colors.TextSecondaryDefault },
      item.isDisabled && styles.textDisabled,
    ];

    return (
      <AnimatedPressable
        style={[animatedStyle, containerStyle]}
        onPress={() => {
          if (!item.isDisabled) {
            onPress(item);
          }
        }}
        disabled={item.isDisabled}
        accessibilityRole="button"
        accessibilityState={{
          selected: isSelected,
          disabled: item.isDisabled ?? false,
        }}
        accessibilityLabel={`${item.dayName} ${item.dayNumber}`}
      >
        <View style={styles.content}>
          <Text style={dayNameStyle}>{item.dayName}</Text>
          <Text style={dayNumberStyle}>{item.dayNumber}</Text>
        </View>
      </AnimatedPressable>
    );
  },
);

DayItemComponent.displayName = 'DayItemComponent';

// ─── Styles ────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    width: DAY_ITEM_WIDTH,
    paddingVertical: DAY_ITEM_PADDING_V,
    borderRadius: BORDER_RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: ITEM_GAP,
  },
  containerSelected: {
    backgroundColor: colors.PrimaryMain,
    borderWidth: 0,
  },
  containerUnselected: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.BorderPrimaryDisabled,
  },
  containerDisabled: {
    opacity: 0.4,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: DAY_ITEM_GAP,
  },
  textDisabled: {
    opacity: 0.5,
  },
});
