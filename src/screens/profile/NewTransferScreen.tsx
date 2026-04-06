import React, { type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, LiquidFooter, PageHeaderScrollView } from '@/components';
import { colors, spacing } from '@/theme';

import { InstructionsCard } from './components/NewTransfer/InstructionsCard';
import { NewTransferCard } from './components/NewTransfer/NewTransferCard';
import { TransferTermsCard } from './components/NewTransfer/TransferTermsCard';

export const NewTransferScreen = (): ReactElement => {
  return (
    <View style={styles.container}>
      <PageHeaderScrollView
        header={{ title: 'New Transfer' }}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.content}>
          <View style={styles.selectCardContainer}>
            <NewTransferCard
              label="Who are you transferring?"
              value="Select client"
            />
            <NewTransferCard label="Destination Coach" value="Select Coach" />
          </View>
          <TransferTermsCard />
          <InstructionsCard text="You will regain ownership automatically after the duration ends. The client will be notified." />
        </View>
      </PageHeaderScrollView>

      <LiquidFooter>
        <Button
          disabled
          label="Send Request"
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
    backgroundColor: colors.StatesWhite,
  },
  contentContainer: {
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: spacing['Spacing-5xl'],
  },
  selectCardContainer: { marginTop: spacing['Spacing-10xl'] },
});
