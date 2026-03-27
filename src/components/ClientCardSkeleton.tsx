import React, { useEffect, useRef, type ReactElement } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { colors, moderateScale, radius, spacing } from '@/theme';

const SkeletonBox = ({
  width,
  height,
  borderRadius = radius.sm,
  opacity,
}: {
  width: number | string;
  height: number;
  borderRadius?: number;
  opacity: Animated.Value;
}): React.ReactElement => (
  <Animated.View
    style={[
      {
        width: width as number,
        height,
        borderRadius,
        backgroundColor: colors.StatesDivider,
        opacity,
      },
    ]}
  />
);

export const ClientCardSkeleton = (): ReactElement => {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacity]);

  return (
    <View style={styles.card}>
      {/* Header row */}
      <View style={styles.headerRow}>
        <SkeletonBox
          width={56}
          height={56}
          borderRadius={radius.md}
          opacity={opacity}
        />
        <View style={styles.infoCol}>
          <SkeletonBox width={120} height={14} opacity={opacity} />
          <View style={styles.tagRow}>
            <SkeletonBox
              width={50}
              height={18}
              borderRadius={4}
              opacity={opacity}
            />
            <SkeletonBox
              width={80}
              height={18}
              borderRadius={4}
              opacity={opacity}
            />
          </View>
        </View>
      </View>
      {/* Row placeholders */}
      <SkeletonBox
        width="100%"
        height={36}
        borderRadius={4}
        opacity={opacity}
      />
      <View style={styles.gap} />
      <SkeletonBox
        width="100%"
        height={36}
        borderRadius={4}
        opacity={opacity}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.StatesWhite,
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    borderRadius: moderateScale(12),
    padding: spacing['Spacing-5xl'],
    marginBottom: spacing['Spacing-xl'],
    marginHorizontal: spacing['Spacing-5xl'],
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing['Spacing-5xl'],
    gap: spacing['Spacing-xl'],
  },
  infoCol: {
    flex: 1,
    gap: spacing['Spacing-m'],
  },
  tagRow: {
    flexDirection: 'row',
    gap: spacing['Spacing-m'],
  },
  gap: {
    height: spacing['Spacing-m'],
  },
});
