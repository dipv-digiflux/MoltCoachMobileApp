import React, { type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ShieldIconSvg } from '@/assets/images';
import {
  ApplicationNotApprovedMessage,
  Button,
  WhyNotApprovedInfo,
} from '@/components';
import { colors, spacing } from '@/theme';

const SHIELD_ICON_SIZE = 26;
const ICON_CONTAINER_RADIUS = 26;

export const ApplicationNotApprovedScreen = (): ReactElement => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + spacing['Spacing-10xl'],
          paddingBottom: Math.max(insets.bottom, spacing['Spacing-10xl']),
        },
      ]}
    >
      <View style={styles.main}>
        <View style={styles.shieldBlock}>
          <ShieldIconSvg
            width={SHIELD_ICON_SIZE}
            height={SHIELD_ICON_SIZE}
            color={colors.FeedbackWarningIcon}
          />
        </View>
        <ApplicationNotApprovedMessage
          title="Application Not Approved"
          description="After careful review of your profile and verification call, we are unable to approve your coach application at this time."
        />
        <WhyNotApprovedInfo />
        <View style={styles.buttonsBlock}>
          <Button
            label="Contact Support"
            variant="primary"
            size="default"
            onPress={() => {}}
            style={styles.fullWidthButton}
          />
          <Button
            label="Read our Guidelines"
            variant="outline"
            size="default"
            onPress={() => {}}
            style={styles.fullWidthButton}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.StatesWhite,
    paddingHorizontal: spacing['Spacing-5xl'],
  },
  main: {
    flex: 1,
    gap: spacing['Spacing-10xl'],
  },
  shieldBlock: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.FeedbackWarningSurface,
    borderRadius: ICON_CONTAINER_RADIUS,
    padding: spacing['Spacing-4xl'],
  },
  block: {
    flex: 1,
  },
  buttonsBlock: {
    alignSelf: 'stretch',
    gap: spacing['Spacing-3xl'], // 12px
  },
  fullWidthButton: {
    alignSelf: 'stretch',
  },
});
