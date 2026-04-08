import React from 'react';
import { LayoutChangeEvent, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';

import { ShieldIconSvg } from '@/assets/images';
import { useAppSelector } from '@/store/hooks';
import {
  colors,
  iconScale,
  moderateScale,
  spacing,
  typography,
  radius,
} from '@/theme';

import type { NutrientSliderProps } from './DailyNutritionTargetsBottomSheet.types';

const THUMB_SIZE = moderateScale(24);
const TRACK_HEIGHT = moderateScale(8);

export const NutrientSlider: React.FC<NutrientSliderProps> = ({
  label,
  value,
  percent,
  unit,
  recommendedValue,
  minValue,
  maxValue,
  onValueChange,
  isLocked = false,
  style,
}) => {
  const translation = useAppSelector(state => state.translation);
  const trackWidth = useSharedValue(0);
  const translateX = useSharedValue(0);

  // Initial position calculation after layout
  const onTrackLayout = (event: LayoutChangeEvent): void => {
    const width = event.nativeEvent.layout.width;
    trackWidth.value = width;
    translateX.value = ((value - minValue) / (maxValue - minValue)) * width;
  };

  const panGesture = Gesture.Pan()
    .enabled(!isLocked)
    .onUpdate(event => {
      const newX = Math.max(0, Math.min(event.x, trackWidth.value));
      translateX.value = newX;

      const newValue = Math.round(
        minValue + (newX / trackWidth.value) * (maxValue - minValue),
      );
      runOnJS(onValueChange)(newValue);
    });

  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value - THUMB_SIZE / 2 }],
  }));

  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: translateX.value,
  }));

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          {isLocked && (
            <ShieldIconSvg
              width={iconScale(16)}
              height={iconScale(16)}
              color={colors.IconSecondaryDefault}
              style={styles.lockIcon}
            />
          )}
        </View>
      </View>

      <View style={styles.valueRow}>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{value.toLocaleString()}</Text>
          {percent !== undefined && (
            <Text style={styles.percent}>{percent}%</Text>
          )}
        </View>
        <Text style={styles.unit}>{unit}</Text>
      </View>

      <View style={styles.sliderContainer}>
        <View style={styles.track} onLayout={onTrackLayout}>
          <Animated.View style={[styles.progress, animatedProgressStyle]} />
        </View>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.thumb, animatedThumbStyle]} />
        </GestureDetector>
      </View>

      <Text style={styles.recommended}>
        {translation.dailyNutritionRecommendedLabel.replace(
          '{{value}}',
          recommendedValue,
        )}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing['Spacing-m'],
    marginBottom: spacing['Spacing-xl'],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-m'],
  },
  label: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
  },
  lockIcon: {
    marginLeft: spacing['Spacing-xs'],
  },
  valueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing['Spacing-m'],
  },
  value: {
    ...typography.h10Bold,
    color: colors.TextPrimaryDefault,
  },
  percent: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
  },
  unit: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
  },
  sliderContainer: {
    height: THUMB_SIZE,
    justifyContent: 'center',
    marginVertical: spacing['Spacing-m'],
  },
  track: {
    height: TRACK_HEIGHT,
    backgroundColor: colors.StatesOutline,
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: colors.MatrixMain,
  },
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: colors.StatesWhite,
    borderWidth: 4,
    borderColor: colors.MatrixMain,
    // Shadow for thumb
    shadowColor: colors.ShadowDefault,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  recommended: {
    ...typography.bodySmall3Regular,
    color: colors.TextSecondaryDisabled,
  },
});
