import React, { type ReactElement, useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { colors, radius } from '@/theme';

import { AnimatedProgressBarProps } from './AnimatedProgressBar.types';

export const AnimatedProgressBar = ({
  duration,
  onComplete,
  height = 8,
  backgroundColor = colors.StatesFill1,
  progressColor = colors.PrimaryMain,
}: AnimatedProgressBarProps): ReactElement => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: duration,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished && onComplete) {
        onComplete();
      }
    });
  }, [animatedValue, duration, onComplete]);

  const width = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.container, { height, backgroundColor }]}>
      <Animated.View
        style={[
          styles.progress,
          {
            width,
            backgroundColor: progressColor,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
  },
});
