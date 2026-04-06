import React, { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, LiquidFooter, PageHeaderScrollView } from '@/components';
import { DestinationCoachBottomSheet } from '@/components/DestinationCoachBottomSheet';
import { SearchClientBottomSheet } from '@/components/SearchClientBottomSheet';
import { type Client } from '@/components/SearchClientBottomSheet/SearchClientBottomSheet.types';
import { colors, spacing } from '@/theme';

import { InstructionsCard } from './components/NewTransfer/InstructionsCard';
import { NewTransferCard } from './components/NewTransfer/NewTransferCard';
import { TransferTermsCard } from './components/NewTransfer/TransferTermsCard';

export const NewTransferScreen = (): ReactElement => {
  const [isClientSheetVisible, setIsClientSheetVisible] = React.useState(false);
  const [isCoachSheetVisible, setIsCoachSheetVisible] = React.useState(false);

  const [selectedClient, setSelectedClient] = React.useState<Client | null>(
    null,
  );

  const mockClients: Client[] = [
    {
      id: '1',
      name: 'Sarah Jenkins',
      status: 'Active • 3 sessions/week',
    },
    {
      id: '2',
      name: 'Michael Foster',
      status: 'Active • 4 sessions/week',
    },
    {
      id: '3',
      name: 'David Miller',
      status: 'Active • 4 sessions/week',
    },
    {
      id: '4',
      name: 'Lisa Ray',
      status: 'Active • 4 sessions/week',
    },
  ];

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
              value={selectedClient?.name || 'Select client'}
              onPress={() => {
                setIsClientSheetVisible(true);
              }}
            />
            <NewTransferCard
              label="Destination Coach"
              value="Select Coach"
              onPress={() => {
                setIsCoachSheetVisible(true);
              }}
            />
          </View>
          <TransferTermsCard />
          <InstructionsCard text="You will regain ownership automatically after the duration ends. The client will be notified." />
        </View>
      </PageHeaderScrollView>

      <LiquidFooter>
        <Button
          disabled={!selectedClient}
          label="Send Request"
          variant="primary"
          size="large"
          fullWidth
          onPress={() => console.log('Send Request')}
        />
      </LiquidFooter>

      <SearchClientBottomSheet
        visible={isClientSheetVisible}
        onClose={() => setIsClientSheetVisible(false)}
        clients={mockClients}
        selectedClientId={selectedClient?.id}
        onSelect={setSelectedClient}
      />

      <DestinationCoachBottomSheet
        visible={isCoachSheetVisible}
        onClose={() => setIsCoachSheetVisible(false)}
      />
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
