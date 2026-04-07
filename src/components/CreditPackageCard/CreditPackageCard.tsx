import React, { type ReactElement } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { Badge } from '@/components';
import { useAppSelector } from '@/store/hooks';
import {
  borderWidth,
  colors,
  iconScale,
  radius,
  spacing,
  typography,
} from '@/theme';

import type { CreditPackageCardProps } from './CreditPackageCard.types';

// ── Icons ────────────────────────────────────────────────────────────

const ClockIcon = ({ color = colors.AccentOrangeDark }): ReactElement => (
  <Svg
    width={iconScale(16)}
    height={iconScale(16)}
    viewBox="0 0 24 24"
    fill="none"
  >
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <Path
      d="M12 6V12L16 14"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CheckIcon = ({ color = colors.FeedbackSuccessText }): ReactElement => (
  <Svg
    width={iconScale(16)}
    height={iconScale(16)}
    viewBox="0 0 24 24"
    fill="none"
  >
    <Circle cx="12" cy="12" r="10" fill={color} />
    <Path
      d="M8 12L11 15L16 9"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ── Component ────────────────────────────────────────────────────────

/**
 * A card component that displays a credit package with its count,
 * status (e.g. In Progress, Completed), and price.
 */
export const CreditPackageCard = ({
  credits,
  status = 'none',
  price,
  currency,
  onPress,
  style,
  testID,
}: CreditPackageCardProps): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  const formattedCredits = translation.creditPackageCreditsCount.replace(
    '{{count}}',
    credits.toString(),
  );

  const formattedPrice = translation.creditPackagePrice
    .replace('{{price}}', price.toFixed(2))
    .replace('{{currency}}', currency);

  const renderStatusBadge = (): ReactElement | null => {
    switch (status) {
      case 'inProgress':
        return (
          <Badge
            label={translation.creditPackageInProgress}
            icon={<ClockIcon />}
            iconGap="Spacing-m"
            backgroundColor="AccentOrangeLight"
            textColor="AccentOrangeDark"
            radius="xs"
            paddingHorizontal="Spacing-xl"
            paddingVertical="Spacing-m"
            typographyToken="bodySmall2SemiBold"
          />
        );
      case 'completed':
        return (
          <Badge
            label={translation.creditPackageCompleted}
            icon={<CheckIcon />}
            iconGap="Spacing-m"
            backgroundColor="TagSuccessSurface"
            textColor="FeedbackSuccessText"
            radius="xs"
            paddingHorizontal="Spacing-xl"
            paddingVertical="Spacing-m"
            typographyToken="bodySmall2SemiBold"
          />
        );
      default:
        return null;
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        style,
      ]}
      testID={testID}
      accessibilityRole="button"
    >
      <View style={styles.topSection}>
        <Text style={styles.title}>{formattedCredits}</Text>
        {renderStatusBadge()}
      </View>

      <Badge
        label={formattedPrice}
        backgroundColor="StatesFill1"
        textColor="TextPrimaryDefault"
        radius="xs"
        paddingHorizontal="Spacing-xl"
        paddingVertical="Spacing-m"
        typographyToken="bodySmall1SemiBold"
        style={styles.priceBadge}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.StatesWhite,
    borderWidth: borderWidth.hairline,
    borderColor: colors.StatesOutline,
    borderRadius: radius.xs,
    padding: spacing['Spacing-5xl'],
  },
  pressed: {
    backgroundColor: colors.StatesFill1,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing['Spacing-5xl'],
  },
  title: {
    ...typography.h4Bold,
    color: colors.TextPrimaryStrong,
  },
  priceBadge: {
    alignSelf: 'flex-start',
  },
});
