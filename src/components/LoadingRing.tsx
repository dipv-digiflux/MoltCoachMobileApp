import React, { useEffect, type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import {
  LOADING_RING_DEFAULT_BORDER_WIDTH,
  LOADING_RING_DEFAULT_DURATION_MS,
  LOADING_RING_DEFAULT_SIZE,
} from '@/const';
import { colors, moderateScale } from '@/theme';

import type { LoadingRingProps } from '@/types/loadingRing.types';

/**
 * Circular loading indicator: grey track (#EBEBEB) with a dark segment (#101610)
 * that rotates around the ring. Uses react-native-reanimated for the animation.
 *
 * Design: width/height 44, border-radius 22 (circle), border-width 2px.
 */
export const LoadingRing = ({
  size = moderateScale(LOADING_RING_DEFAULT_SIZE),
  borderWidth = LOADING_RING_DEFAULT_BORDER_WIDTH,
  durationMs = LOADING_RING_DEFAULT_DURATION_MS,
}: LoadingRingProps): ReactElement => {
  const rotation = useSharedValue(0);
  const radius = size / 2;

  useEffect(() => {
    rotation.value = withRepeat(
      withSequence(
        withTiming(360, {
          duration: durationMs,
          easing: Easing.linear,
        }),
        withTiming(0, { duration: 0 }),
      ),
      -1,
      false,
    );
  }, [durationMs, rotation]);

  const arcStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value % 360}deg` }],
  }));

  return (
    <View
      style={[
        styles.baseCircle,
        {
          width: size,
          height: size,
          borderRadius: radius,
          borderWidth,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.arc,
          arcStyle,
          {
            width: size,
            height: size,
            borderRadius: radius,
            borderWidth,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  baseCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.Transparent,
    borderColor: colors.StatesOutline,
  },
  arc: {
    position: 'absolute',
    borderColor: colors.Transparent,
    borderTopColor: colors.PrimaryMain,
  },
});
