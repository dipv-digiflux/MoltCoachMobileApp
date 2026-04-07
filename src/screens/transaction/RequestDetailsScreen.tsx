import React, { type ReactElement } from 'react';
import { View, StyleSheet } from 'react-native';

import { InfoIconSvg } from '@/assets/images';
import {
  PageHeaderScrollView,
  LiquidFooter,
  Button,
  CreditPackageCard,
  ProgressTracker,
  InfoCard,
} from '@/components';
import { useAppSelector } from '@/store/hooks';
import { colors, spacing, iconScale } from '@/theme';

export const RequestDetailsScreen = (): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  return (
    <View style={styles.container}>
      <PageHeaderScrollView
        header={{ title: translation.requestDetailsHeaderTitle }}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <View style={styles.cardWrapper}>
          <CreditPackageCard
            credits={100}
            status="inProgress"
            price={45}
            currency="AED"
          />
        </View>

        <View style={styles.trackerWrapper}>
          <ProgressTracker
            title={translation.progressTrackerTitle}
            steps={[
              {
                label: translation.progressTrackerStep1Label,
                description: translation.progressTrackerStep1Desc,
                status: 'completed',
              },
              {
                label: translation.progressTrackerStep2Label,
                description: translation.progressTrackerStep2Desc,
                status: 'active',
              },
              {
                label: translation.progressTrackerStep3Label,
                description: translation.progressTrackerStep3Desc,
                status: 'pending',
              },
            ]}
          />
        </View>

        <View style={styles.infoWrapper}>
          <InfoCard
            description={translation.requestDetailsInfoBanner}
            icon={
              <InfoIconSvg
                width={iconScale(24)}
                height={iconScale(24)}
                color={colors.TextPrimaryStrong}
              />
            }
            style={styles.infoCard}
          />
        </View>
      </PageHeaderScrollView>
      <LiquidFooter showTopBorder>
        <Button
          label={translation.requestDetailsFooterButton}
          variant="primary"
          size="large"
          fullWidth
          onPress={() => {}}
        />
      </LiquidFooter>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.StatesWhite,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  cardWrapper: {
    padding: spacing['Spacing-5xl'],
  },
  trackerWrapper: {
    padding: spacing['Spacing-5xl'],
    paddingTop: 0,
  },
  infoWrapper: {
    padding: spacing['Spacing-5xl'],
    paddingTop: 0,
  },
  infoCard: {
    backgroundColor: colors.AccentTealLight,
    borderWidth: 0,
    borderRadius: spacing['Spacing-sm'],
  },
});
