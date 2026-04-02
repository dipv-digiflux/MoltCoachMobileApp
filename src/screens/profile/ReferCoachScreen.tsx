import React, { type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

import { PageHeaderScrollView } from '@/components';
import { useAppSelector } from '@/store/hooks';
import { colors } from '@/theme';

import { HowItWorksCard } from './components/HowItWorksCard';
import { ReferralFooter } from './components/ReferralFooter';

export const ReferCoachScreen = (): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  return (
    <View style={styles.container}>
      <PageHeaderScrollView
        header={{ title: translation.referCoachHeaderTitle }}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <HowItWorksCard />
      </PageHeaderScrollView>
      <ReferralFooter />
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
  },
});
