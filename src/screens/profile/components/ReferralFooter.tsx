import React, { type ReactElement } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import { Button, LiquidFooter } from '@/components';
import { useAppSelector } from '@/store/hooks';
import { colors, iconScale, spacing, typography } from '@/theme';

const ShareIcon = ({
  width,
  height,
  color,
}: {
  width: number;
  height: number;
  color: string;
}): ReactElement => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.59 13.51L15.42 17.49"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.41 6.51L8.59 10.49"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CopyIcon = ({
  width,
  height,
  color,
}: {
  width: number;
  height: number;
  color: string;
}): ReactElement => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Rect
      x="9"
      y="9"
      width="13"
      height="13"
      rx="2"
      ry="2"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ReferralFooter = (): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  return (
    <LiquidFooter
      showTopBorder
      paddingVertical="Spacing-5xl"
      paddingHorizontal="Spacing-5xl"
    >
      <View style={styles.container}>
        <Button
          label={translation.referCoachShareLinkLabel}
          variant="primary"
          size="large"
          fullWidth
          onPress={() => {}}
          iconRight={
            <ShareIcon
              width={iconScale(20)}
              height={iconScale(20)}
              color={colors.StatesWhite}
            />
          }
        />
        <Button
          label={translation.referCoachCopyLinkLabel}
          variant="secondary"
          size="large"
          fullWidth
          onPress={() => {}}
          iconRight={
            <CopyIcon
              width={iconScale(20)}
              height={iconScale(20)}
              color={colors.TextPrimaryDefault}
            />
          }
        />
        <TouchableOpacity onPress={() => {}} style={styles.termsButton}>
          <Text style={styles.termsText}>
            {translation.referCoachTermsLink}
          </Text>
        </TouchableOpacity>
      </View>
    </LiquidFooter>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing['Spacing-5xl'],
    alignItems: 'center',
  },
  termsButton: {
    paddingVertical: spacing['Spacing-m'],
  },
  termsText: {
    ...typography.bodySmall1Medium,
    color: colors.TextPrimaryDefault,
    textDecorationLine: 'underline',
  },
});
