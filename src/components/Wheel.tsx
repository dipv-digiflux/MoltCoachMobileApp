import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

import { colors, moderateScale, spacing, typography } from '@/theme';

export interface WheelProps {
  data: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  width?: number;
  itemHeight?: number;
  containerStyle?: StyleProp<ViewStyle>;
  itemTextStyle?: StyleProp<TextStyle>;
  activeItemTextStyle?: StyleProp<TextStyle>;
}

export const ITEM_HEIGHT = moderateScale(44);

export const Wheel = ({
  data,
  selectedValue,
  onValueChange,
  width = moderateScale(40),
  itemHeight = ITEM_HEIGHT,
  containerStyle,
  itemTextStyle,
  activeItemTextStyle,
}: WheelProps) => {
  const scrollRef = useRef<ScrollView>(null);

  // Padding items to keep selected value centered in a 5-row layout
  // We want the selected item in the middle (Row 3), so we need 2 padding items at each end
  const extendedData = useMemo(() => ['', '', ...data, '', ''], [data]);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = event.nativeEvent.contentOffset.y;
      const index = Math.round(y / itemHeight);
      const safeIndex = Math.max(0, Math.min(index, data.length - 1));
      const newValue = data[safeIndex];
      if (newValue !== undefined) {
        onValueChange(newValue);
      }
    },
    [data, onValueChange, itemHeight],
  );

  useEffect(() => {
    const index = data.indexOf(selectedValue);
    if (index !== -1) {
      // Small delay ensures ScrollView is laid out
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          y: index * itemHeight,
          animated: false,
        });
      }, 0);
    }
  }, [data, selectedValue, itemHeight]);

  return (
    <View
      style={[
        styles.wheelContainer,
        { width, height: itemHeight * 5 },
        containerStyle,
      ]}
    >
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        onMomentumScrollEnd={onScroll}
        decelerationRate="fast"
        scrollEventThrottle={16}
        snapToAlignment="start"
        nestedScrollEnabled={true}
      >
        {extendedData.map((item, index) => {
          const isSelected = item === selectedValue;
          const isPadding = item === '';

          // Determine distance from center (index 2 in viewport if we scrolled to 'index')
          // Wait, if we scroll to y = index * itemHeight, then extendedData[index] is at Row 1.
          // We want data[index] to be at Row 3 (index index+2 in extendedData).
          // So y = index * itemHeight puts extendedData[index] at top.
          // Viewport Rows:
          // Row 1: extendedData[idx]
          // Row 2: extendedData[idx+1]
          // Row 3: extendedData[idx+2] (This should be data[idx])
          // Row 4: extendedData[idx+3]
          // Row 5: extendedData[idx+4]

          // Since data[0] is at extendedData[2], then if index=0, y=0:
          // Row 3 is extendedData[2] which is data[0]. Correct!

          return (
            <View
              key={`${item}-${index}`}
              style={[styles.itemWrapper, { height: itemHeight }]}
            >
              <Text
                style={[
                  styles.itemText,
                  itemTextStyle,
                  isSelected
                    ? [styles.itemTextActive, activeItemTextStyle]
                    : styles.itemTextFaded,
                  isPadding && { opacity: 0 },
                ]}
              >
                {item}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wheelContainer: {
    overflow: 'hidden',
  },
  itemWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    ...typography.b1Medium,
    textAlign: 'center',
    fontSize: moderateScale(18),
  },
  itemTextActive: {
    color: colors.TextPrimaryDefault,
  },
  itemTextFaded: {
    color: colors.TextSecondaryDisabled,
    opacity: 0.3,
  },
});
