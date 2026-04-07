import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, radius as radiusTokens, spacing, typography } from '@/theme';

import type { SpacingToken } from '@/theme/spacing';
import type { BadgeProps } from '@/types/badge.types';

const getSpacingValue = (token?: SpacingToken): number | undefined =>
  token ? spacing[token] : undefined;

export const Badge: React.FC<BadgeProps> = ({
  children,
  label,
  icon,
  iconGap,
  padding = 'Spacing-m',
  paddingHorizontal,
  paddingVertical,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  radius = 'md',
  backgroundColor = 'TagSuccessSurface',
  textColor = 'TextPrimaryDefault',
  typographyToken = 'tagLabel',
  fullWidth = false,
  style,
  testID,
  accessibilityLabel,
}) => {
  const textNode =
    label !== undefined ? (
      <Text style={[typography[typographyToken], { color: colors[textColor] }]}>
        {label}
      </Text>
    ) : null;

  const iconNode = icon ? (
    <>
      {icon}
      {iconGap !== undefined && <View style={{ width: spacing[iconGap] }} />}
    </>
  ) : null;

  const content =
    children ??
    (iconNode || textNode ? (
      <>
        {iconNode}
        {textNode}
      </>
    ) : null);

  if (!content) {
    return null;
  }

  const containerStyle = {
    padding: getSpacingValue(padding),
    paddingHorizontal: getSpacingValue(paddingHorizontal),
    paddingVertical: getSpacingValue(paddingVertical),
    paddingTop: getSpacingValue(paddingTop),
    paddingRight: getSpacingValue(paddingRight),
    paddingBottom: getSpacingValue(paddingBottom),
    paddingLeft: getSpacingValue(paddingLeft),
    borderRadius: radiusTokens[radius],
    backgroundColor: colors[backgroundColor],
  } as const;

  return (
    <View
      style={[
        styles.base,
        fullWidth && styles.fullWidth,
        containerStyle,
        style,
      ]}
      testID={testID}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="text"
    >
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
});
