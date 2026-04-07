import React, { type ReactElement } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import {
  CreditIconSvg,
  HandGrabingBanner,
  ProfileIconSvg,
} from '@/assets/images';
import { useAppSelector } from '@/store/hooks';
import {
  colors,
  iconScale,
  radius,
  spacing,
  typography,
} from '@/theme';

const assetSource = Image.resolveAssetSource(HandGrabingBanner);
const bannerAspectRatio = assetSource.width / assetSource.height;

const InfinityIcon = ({
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
      d="M18.11 8C16.89 8 15.77 8.46 14.91 9.21L9.08 14.79C8.22 15.54 7.1 16 5.88 16C3.74 16 2 14.21 2 12C2 9.79 3.74 8 5.88 8C7.1 8 8.22 8.46 9.08 9.21L10.5 10.57M13.5 13.43L14.91 14.79C15.77 15.54 16.89 16 18.11 16C20.26 16 22 14.21 22 12C22 9.79 20.26 8 18.11 8Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const HowItWorksCard = (): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  const steps = [
    {
      id: 1,
      title: translation.referCoachStep1Title,
      description: translation.referCoachStep1Description,
      icon: (
        <ProfileIconSvg
          width={iconScale(20)}
          height={iconScale(20)}
          color={colors.IconPrimaryHover}
        />
      ),
    },
    {
      id: 2,
      title: translation.referCoachStep2Title,
      description: translation.referCoachStep2Description,
      icon: (
        <CreditIconSvg
          width={iconScale(20)}
          height={iconScale(20)}
          color={colors.IconPrimaryHover}
        />
      ),
    },
    {
      id: 3,
      title: translation.referCoachStep3Title,
      description: translation.referCoachStep3Description,
      icon: (
        <InfinityIcon
          width={iconScale(20)}
          height={iconScale(20)}
          color={colors.IconPrimaryHover}
        />
      ),
    },
  ];

  return (
    <View style={styles.container}>
      <ImageBackground
        source={HandGrabingBanner}
        style={styles.banner}
        resizeMode="center"
      ></ImageBackground>

      <View style={styles.contentContainer}>
        <View style={styles.bannerContent}>
          <Text style={styles.mainTitle}>
            {translation.referCoachMainTitle}
          </Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {translation.referCoachBadgeText}
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            {translation.referCoachHowItWorksTitle}
          </Text>
          <View style={styles.stepsContainer}>
            {steps.map(step => (
              <View key={step.id} style={styles.stepRow}>
                <View style={styles.iconContainer}>{step.icon}</View>
                <View style={styles.stepTextContent}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDescription}>{step.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: spacing['Spacing-5xl'],
    // paddingTop: spacing['Spacing-5xl'],
    // gap: spacing['Spacing-5xl'],
  },
  banner: {
    width: '100%',
    aspectRatio: bannerAspectRatio,
    // maxHeight: spacingScale(220), // Increased slightly for content
  },
  bannerContent: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-10xl'],
    gap: spacing['Spacing-5xl'],
  },
  contentContainer: {
    gap: spacing['Spacing-5xl'],
  },
  mainTitle: {
    ...typography.h4Bold,
    color: colors.TextPrimaryDefault,
  },
  badge: {
    backgroundColor: colors.PrimaryMain,
    paddingVertical: spacing['Spacing-m'],
    paddingHorizontal: spacing['Spacing-l'],
    borderRadius: radius.xs,
    alignSelf: 'flex-start',
  },
  badgeText: {
    ...typography.bodySmall1Medium,
    color: colors.StatesWhite,
  },
  card: {
    backgroundColor: colors.StatesWhite,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.BorderSecondaryDisabled,
    padding: spacing['Spacing-8xl'],
    marginTop: spacing['Spacing-5xl'],
  },
  cardTitle: {
    ...typography.h7Bold,
    color: colors.TextPrimaryDefault,
    marginBottom: spacing['Spacing-5xl'],
  },
  stepsContainer: {
    gap: spacing['Spacing-10xl'],
  },
  stepRow: {
    flexDirection: 'row',
    gap: spacing['Spacing-5xl'],
  },
  iconContainer: {
    width: spacing['Spacing-12xl'],
    height: spacing['Spacing-12xl'],
    borderRadius: radius.full,
    backgroundColor: colors.SurfacePrimaryDefault,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepTextContent: {
    flex: 1,
    gap: spacing['Spacing-xs'],
  },
  stepTitle: {
    ...typography.b1SemiBold,
    color: colors.TextPrimaryDefault,
  },
  stepDescription: {
    ...typography.bodySmall4TallRegular,
    color: colors.TextSecondaryDefault,
  },
});
