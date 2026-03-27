import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

import { CreditIconSvg } from '@/assets/images';
import { AnimatedProgressBar, InfoCard } from '@/components';
import { colors, radius, spacing, typography } from '@/theme';
import {
  AppStackNavigationProp,
  AppStackParamList,
} from '@/types/navigation.types';

export const GeneratingPlanScreen = (): ReactElement => {
  const navigation = useNavigation<AppStackNavigationProp>();
  const route = useRoute<RouteProp<AppStackParamList, 'GeneratingPlan'>>();
  const { clientName, inviteData, phoneNumber, countryCode } = route.params;

  const onProgressComplete = (): void => {
    // Navigate after a small delay to SuggestedPlan
    setTimeout(() => {
      if (route.params.skipSuggestedPlan) {
        navigation.navigate('InviteSent');
      } else {
        navigation.navigate('SuggestedPlan', {
          clientName,
          inviteData,
          phoneNumber,
          countryCode,
        });
      }
    }, 500);
  };

  return (
    <View style={styles.root}>
      <View style={styles.centerContainer}>
        <Text style={styles.name}>{clientName}</Text>
        <Text style={styles.subtitle}>
          Creating personalized plan based on provided metrics.
        </Text>

        <View style={styles.progressContainer}>
          <AnimatedProgressBar
            duration={3000}
            onComplete={onProgressComplete}
          />
          <Text style={styles.estimatedTime}>Estimated time: 2–3 seconds</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <InfoCard
          description="We're calculating calorie targets, macros, and lifestyle goals."
          icon={
            <View style={styles.iconContainer}>
              <CreditIconSvg
                width={20}
                height={20}
                color={colors.TextPrimaryDefault}
              />
            </View>
          }
          style={styles.infoCard}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.StatesWhite,
    paddingHorizontal: spacing['Spacing-5xl'],
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing['Spacing-11xl'],
  },
  name: {
    ...typography.h7SemiBold,
    color: colors.TextPrimaryStrong,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.bodySmall1Regular,
    color: colors.TextSecondaryDefault,
    textAlign: 'center',
    maxWidth: '80%',
  },
  progressContainer: {
    width: '100%',
    gap: spacing['Spacing-3xl'],
    marginTop: spacing['Spacing-2xl'],
  },
  estimatedTime: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
    textAlign: 'center',
  },
  footer: {
    paddingBottom: spacing['Spacing-16xl'],
  },
  infoCard: {
    backgroundColor: '#F3F5F7',
    borderWidth: 0,
    borderRadius: radius.xs,
  },
  iconContainer: {
    backgroundColor: colors.StatesWhite,
    padding: spacing['Spacing-m'],
    borderRadius: radius.xs,
  },
});
