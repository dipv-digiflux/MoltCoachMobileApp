import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { colors, moderateScale, spacing, typography } from '@/theme';

import { StatusChipProps } from './StatusChip.types';

const WarningIcon = () => (
  <Svg width={12} height={11} viewBox="0 0 12 11" fill="none">
    <Path
      d="M6 1L11 10H1L6 1Z"
      stroke={colors.TagErrorText}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6 4V6"
      stroke={colors.TagErrorText}
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <Path
      d="M6 8V8.01"
      stroke={colors.TagErrorText}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </Svg>
);

export const StatusChip = ({
  label,
  type = 'neutral',
  containerStyle,
}: StatusChipProps): React.ReactElement => {
  const isSuccess = type === 'success';
  const isWarning = type === 'warning';

  return (
    <View
      style={[
        styles.container,
        isSuccess && styles.successContainer,
        isWarning && styles.warningContainer,
        containerStyle,
      ]}
    >
      {isWarning && (
        <View style={styles.iconContainer}>
          <WarningIcon />
        </View>
      )}
      <Text
        style={[
          styles.label,
          isSuccess && styles.successLabel,
          isWarning && styles.warningLabel,
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing['Spacing-m'],
    paddingVertical: spacing['Spacing-xs'],
    borderRadius: moderateScale(4),
    backgroundColor: colors.SurfaceSecondaryDisabled,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    height: moderateScale(32),
  },
  successContainer: {
    backgroundColor: colors.TagSuccessSurface,
  },
  warningContainer: {
    backgroundColor: colors.TagWarningSurface,
    borderRadius: moderateScale(2),
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(8),
  },
  iconContainer: {
    marginRight: moderateScale(6),
  },
  label: {
    ...typography.bodySmall3Medium,
    color: colors.IconPrimaryDefault,
    fontSize: moderateScale(10),
  },
  successLabel: {
    color: colors.TagSuccessText,
  },
  warningLabel: {
    ...typography.bodySmall3Medium,
    color: colors.TagErrorText,
    fontSize: moderateScale(13),
    fontWeight: '600',
    lineHeight: moderateScale(13),
  },
});
