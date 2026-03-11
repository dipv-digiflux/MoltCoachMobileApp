import React from 'react';
import { StyleSheet, View } from 'react-native';

import type { ButtonDefaultIconProps } from '@/types/button.types';

// ─── Shared constants ───────────────────────────────────────────────

const STROKE_RATIO = 0.1; // stroke width relative to icon size
const LINE_RATIO = 0.55; // line length relative to icon size

const getStrokeWidth = (size: number): number =>
  Math.max(1.5, size * STROKE_RATIO);

// ─── Individual icon renderers ──────────────────────────────────────

const PlusIcon = ({
  size,
  color,
}: {
  size: number;
  color: string;
}): React.ReactElement => {
  const sw = getStrokeWidth(size);
  const length = size * LINE_RATIO;
  return (
    <View style={[styles.iconContainer, { width: size, height: size }]}>
      <View
        style={{
          position: 'absolute',
          width: length,
          height: sw,
          backgroundColor: color,
          borderRadius: sw / 2,
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: sw,
          height: length,
          backgroundColor: color,
          borderRadius: sw / 2,
        }}
      />
    </View>
  );
};

const CloseIcon = ({
  size,
  color,
}: {
  size: number;
  color: string;
}): React.ReactElement => {
  const sw = getStrokeWidth(size);
  const length = size * LINE_RATIO;
  return (
    <View style={[styles.iconContainer, { width: size, height: size }]}>
      <View
        style={{
          position: 'absolute',
          width: length,
          height: sw,
          backgroundColor: color,
          borderRadius: sw / 2,
          transform: [{ rotate: '45deg' }],
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: length,
          height: sw,
          backgroundColor: color,
          borderRadius: sw / 2,
          transform: [{ rotate: '-45deg' }],
        }}
      />
    </View>
  );
};

const CheckIcon = ({
  size,
  color,
}: {
  size: number;
  color: string;
}): React.ReactElement => {
  const sw = getStrokeWidth(size);
  const shortArm = size * 0.25;
  const longArm = size * 0.45;
  return (
    <View style={[styles.iconContainer, { width: size, height: size }]}>
      <View
        style={{
          width: longArm,
          height: shortArm,
          borderBottomWidth: sw,
          borderLeftWidth: sw,
          borderColor: color,
          transform: [{ rotate: '-45deg' }],
          marginTop: -shortArm * 0.25,
        }}
      />
    </View>
  );
};

const ArrowRightIcon = ({
  size,
  color,
}: {
  size: number;
  color: string;
}): React.ReactElement => {
  const sw = getStrokeWidth(size);
  const arm = size * 0.3;
  return (
    <View style={[styles.iconContainer, { width: size, height: size }]}>
      <View
        style={{
          width: arm,
          height: arm,
          borderRightWidth: sw,
          borderTopWidth: sw,
          borderColor: color,
          transform: [{ rotate: '45deg' }],
          marginLeft: -arm * 0.2,
        }}
      />
    </View>
  );
};

const ArrowLeftIcon = ({
  size,
  color,
}: {
  size: number;
  color: string;
}): React.ReactElement => {
  const sw = getStrokeWidth(size);
  const arm = size * 0.3;
  return (
    <View style={[styles.iconContainer, { width: size, height: size }]}>
      <View
        style={{
          width: arm,
          height: arm,
          borderLeftWidth: sw,
          borderBottomWidth: sw,
          borderColor: color,
          transform: [{ rotate: '45deg' }],
          marginRight: -arm * 0.2,
        }}
      />
    </View>
  );
};

const SearchIcon = ({
  size,
  color,
}: {
  size: number;
  color: string;
}): React.ReactElement => {
  const sw = getStrokeWidth(size);
  const circleSize = size * 0.48;
  const handleLength = size * 0.22;
  return (
    <View style={[styles.iconContainer, { width: size, height: size }]}>
      <View
        style={{
          position: 'absolute',
          width: circleSize,
          height: circleSize,
          borderRadius: circleSize / 2,
          borderWidth: sw,
          borderColor: color,
          top: size * 0.14,
          left: size * 0.14,
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: handleLength,
          height: sw,
          backgroundColor: color,
          borderRadius: sw / 2,
          bottom: size * 0.2,
          right: size * 0.15,
          transform: [{ rotate: '45deg' }],
        }}
      />
    </View>
  );
};

// ─── Dispatcher ─────────────────────────────────────────────────────

/**
 * Renders one of the built-in button icons by name.
 * These are lightweight View-based icons; replace with an icon library
 * (e.g. react-native-vector-icons) for production use.
 */
export const ButtonDefaultIcon = ({
  name,
  size,
  color,
}: ButtonDefaultIconProps): React.ReactElement | null => {
  switch (name) {
    case 'plus':
      return <PlusIcon size={size} color={color} />;
    case 'close':
      return <CloseIcon size={size} color={color} />;
    case 'check':
      return <CheckIcon size={size} color={color} />;
    case 'arrow-right':
      return <ArrowRightIcon size={size} color={color} />;
    case 'arrow-left':
      return <ArrowLeftIcon size={size} color={color} />;
    case 'search':
      return <SearchIcon size={size} color={color} />;
    default:
      return null;
  }
};

// ─── Styles ─────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
