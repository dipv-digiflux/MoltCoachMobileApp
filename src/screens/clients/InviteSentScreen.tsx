import React, { useMemo, type ReactElement } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';

import InfoIcon from '@/assets/images/svg/infoicon.svg';
import {
  Button,
  VerticalStepper,
  type VerticalStepperStep,
} from '@/components';
import { colors, moderateScale, spacing } from '@/theme';

import { getStyles } from './InviteSentScreen.styles';

import type { AppStackNavigationProp } from '@/types/navigation.types';

const SuccessBigIcon = (): React.ReactElement => (
  <Svg
    width={moderateScale(120)}
    height={moderateScale(120)}
    viewBox="0 0 120 120"
    fill="none"
  >
    <Circle cx="60" cy="60" r="50" fill={colors.FeedbackSuccessSurface} />
    <Circle cx="60" cy="60" r="40" fill={colors.TagSuccessSurface} />
    <Path
      d="M75 48L55.75 67.25L45 56.5"
      stroke={colors.FeedbackSuccessIcon}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const InviteSentScreen = (): ReactElement => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<AppStackNavigationProp>();
  const styles = useMemo(() => getStyles(), []);

  const onViewClientStatus = (): void => {
    // Reset to BottomTabs and navigate to appropriate tab if needed
    navigation.reset({
      index: 0,
      routes: [{ name: 'BottomTabs' }],
    });
  };

  const onAddAnotherClient = (): void => {
    navigation.navigate('AddClient');
  };

  const steps: VerticalStepperStep[] = [
    { label: 'Invite Sent', status: 'completed' },
    { label: 'Profile Completed', status: 'completed' },
    { label: 'Coach Approval', status: 'pending' },
  ];

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: insets.bottom + spacing['Spacing-10xl'] },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <SuccessBigIcon />
          <Text style={styles.title}>Plan Sent Successfully</Text>
        </View>
        <View style={styles.stepperSection}>
          <VerticalStepper steps={steps} />
        </View>
        <View style={styles.infoBox}>
          <InfoIcon
            width={20}
            height={20}
            color={colors.IconSecondaryDefault}
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>
            The client must download the app and approve you to activate
            coaching.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          label="View Client Status"
          variant="primary"
          size="large"
          fullWidth
          onPress={onViewClientStatus}
          style={styles.primaryButton}
        />
        <Button
          label="Add Another Client"
          variant="secondary"
          size="large"
          fullWidth
          onPress={onAddAnotherClient}
        />
      </View>
    </View>
  );
};
