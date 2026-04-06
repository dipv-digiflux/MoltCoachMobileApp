import React, { type ReactElement } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle, Path } from 'react-native-svg';

import { Button, PageHeaderScrollView, LiquidFooter } from '@/components';
import { useAppSelector } from '@/store/hooks';
import { colors, moderateScale, spacing, typography } from '@/theme';

import { NudgeSuccessCard } from './components/NudgeSuccessCard';

import type {
  AppStackNavigationProp,
  AppStackParamList,
} from '@/types/navigation.types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

const SuccessBigIcon = (): React.ReactElement => (
  <Svg
    width={moderateScale(120)}
    height={moderateScale(120)}
    viewBox="0 0 120 120"
    fill="none"
  >
    <Circle cx="60" cy="60" r="50" fill={colors.FeedbackSuccessSurface} />
    <Circle cx="60" cy="60" r="40" fill="#DCFCE7" />
    <Path
      d="M75 48L55.75 67.25L45 56.5"
      stroke={colors.FeedbackSuccessIcon}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const NudgeSentScreen = ({
  route,
}: NativeStackScreenProps<AppStackParamList, 'NudgeSent'>): ReactElement => {
  const translation = useAppSelector(state => state.translation);
  const navigation = useNavigation<AppStackNavigationProp>();
  const { clientId, clientName, messages } = route.params;

  const onReturnToDashboard = (): void => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'BottomTabs', params: { screen: 'HomeTab' } }],
    });
  };

  const onViewClientProfile = (): void => {
    navigation.navigate('ClientDetail', { clientId, clientName });
  };

  const subtitle = translation.nudgeSentSuccessSubtitle.replace(
    '{{clientName}}',
    clientName,
  );

  return (
    <View style={styles.container}>
      <PageHeaderScrollView
        header={{
          title: translation.nudgeSentHeaderTitle,
          onPressBack: () => navigation.goBack(),
        }}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <View style={styles.headerSection}>
          <SuccessBigIcon />
          <Text style={styles.title}>Nudge Sent!</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        <NudgeSuccessCard clientName={clientName} messages={messages} />
      </PageHeaderScrollView>
      <LiquidFooter showTopBorder>
        <Button
          label={translation.nudgeSentReturnToDashboardButton}
          variant="primary"
          size="large"
          fullWidth
          onPress={onReturnToDashboard}
          style={styles.primaryButton}
        />
        <Button
          label={translation.nudgeSentViewClientProfileButton}
          variant="secondary"
          size="large"
          fullWidth
          onPress={onViewClientProfile}
        />
      </LiquidFooter>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.StatesWhite,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingBottom: spacing['Spacing-10xl'],
  },
  headerSection: {
    alignItems: 'center',
    paddingTop: moderateScale(40),
    marginBottom: spacing['Spacing-12xl'],
  },
  title: {
    ...typography.h7Bold,
    color: '#111827',
    marginTop: spacing['Spacing-10xl'],
    textAlign: 'center',
  },
  subtitle: {
    ...typography.b2TallRegular,
    color: '#6B7280',
    marginTop: spacing['Spacing-m'],
    textAlign: 'center',
    paddingHorizontal: spacing['Spacing-10xl'],
  },
  primaryButton: {
    marginBottom: spacing['Spacing-m'],
  },
});
