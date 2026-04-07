import React, { type ReactElement, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

import {
  Button,
  DailyNutritionTargetCard,
  LiquidFooter,
  PageHeader,
  ConfirmModal,
} from '@/components';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/store';
import { sendInviteSmsThunk } from '@/store/thunks';
import { colors, spacing } from '@/theme';
import {
  AppStackNavigationProp,
  AppStackParamList,
} from '@/types/navigation.types';

export const SuggestedPlanScreen = (): ReactElement => {
  const navigation = useNavigation<AppStackNavigationProp>();
  const dispatch = useAppDispatch();
  const clientState = useAppSelector((state: RootState) => state.client);
  const smsOperation = clientState.operations.sendInviteSms;
  const route = useRoute<RouteProp<AppStackParamList, 'SuggestedPlan'>>();
  const { clientName, inviteData, phoneNumber, countryCode } = route.params;
  const invite = inviteData?.[0]?.invite;
  const nutrients =
    invite?.nutrition_draft || inviteData?.[0]?.onboarding?.nutrients;
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

  // Dynamic Macro Percentage Calculation
  const proteinKcal = (nutrients?.protein || 0) * 4;
  const carbKcal = (nutrients?.carb || 0) * 4;
  const fatKcal = (nutrients?.fat || 0) * 9;
  const totalKcalForMacros = proteinKcal + carbKcal + fatKcal || 1;

  const proteinPercent = Math.round((proteinKcal / totalKcalForMacros) * 100);
  const carbPercent = Math.round((carbKcal / totalKcalForMacros) * 100);
  const fatPercent = 100 - proteinPercent - carbPercent;

  // Formatting helper
  const capitalize = (s?: string): string =>
    s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : '';

  // Plan data for the suggested plan
  const planData = {
    title: 'Daily nutrition target',
    actionLabel: 'Fine-tune',
    kcal: nutrients?.target_calories
      ? `${nutrients.target_calories.toLocaleString()} kcal`
      : '2,450 kcal',
    subValue: invite?.session_package?.sessions_left
      ? `${invite.session_package.sessions_left} Sessions Left`
      : undefined,
    tags: [
      nutrients?.type ? capitalize(nutrients.type) : 'High Protein',
      nutrients?.goal
        ? `${capitalize(nutrients.goal.replace('_', ' '))} Mode`
        : 'Fat Loss Mode',
    ],
    macroTargets: {
      protein: {
        value: nutrients?.protein ? `${nutrients.protein}g` : '180g',
        percent: nutrients ? proteinPercent : 33,
      },
      fat: {
        value: nutrients?.fat ? `${nutrients.fat}g` : '180g',
        percent: nutrients ? fatPercent : 33,
      },
      carb: {
        value: nutrients?.carb ? `${nutrients.carb}g` : '180g',
        percent: nutrients ? carbPercent : 34,
      },
    },
    lifestyleTitle: 'Lifestyle targets',
    lifestyleActionLabel: 'Fine-tune',
    lifestyleTargets: {
      waterIntake: nutrients?.water_intake_liters
        ? `${nutrients.water_intake_liters} Liters`
        : '3.5 Liters',
      steps: nutrients?.steps ? nutrients.steps.toLocaleString() : '12,500',
      activeCalorieBurn: nutrients?.active_calorie_burn
        ? `${nutrients.active_calorie_burn} kcal`
        : '250 kcal',
    },
    planTip: nutrients?.goal
      ? `This plan is optimized for ${nutrients.goal.toLowerCase()}.`
      : 'This plan can help you lose 4.2 kg in 12 weeks.',
  };

  return (
    <View style={styles.root}>
      <PageHeader
        title={`Suggested Plan for ${clientName}`}
        subtitle="Based on the client's metrics. You can customize before sending."
        onPressBack={() => navigation.goBack()}
        alignTitleLeft
        variant="stacked"
        fallbackBackgroundColor={colors.SurfaceSecondaryDefault}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <DailyNutritionTargetCard {...planData} />
      </ScrollView>

      <LiquidFooter showTopBorder>
        <Button
          label="Send Plan to Client"
          onPress={() => {
            setIsConfirmModalVisible(true);
          }}
          variant="primary"
          size="large"
          fullWidth
        />
      </LiquidFooter>

      <ConfirmModal
        visible={isConfirmModalVisible}
        onClose={() => setIsConfirmModalVisible(false)}
        onConfirm={() => {
          void (async () => {
            if (phoneNumber && countryCode) {
              try {
                await dispatch(
                  sendInviteSmsThunk({
                    phone_numbers: [phoneNumber],
                    country_code: countryCode.startsWith('+')
                      ? countryCode
                      : `+${countryCode}`,
                  }),
                );
              } catch (error) {
                console.error('Failed to send SMS invite:', error);
              }
            }
            setIsConfirmModalVisible(false);
            navigation.navigate('BottomTabs', {
              screen: 'HomeTab',
              params: { screen: 'HomeDashboard' },
            });
          })();
        }}
        title="Send Plan to Client?"
        description="This will notify the client and lock this version of the plan. The client must approve you to activate coaching."
        confirmLabel="Send & Notify Client"
        cancelLabel="Go Back & Edit"
        loading={smsOperation.status === 'loading'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.SurfaceSecondaryDefault,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.SurfaceSecondaryDefault, // Matches image background
  },
  contentContainer: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-10xl'], // Corrected token
    paddingBottom: spacing['Spacing-16xl'],
    gap: spacing['Spacing-5xl'],
  },
});
