import React, { useMemo, useState, type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

import { BottomSheet } from '@/components/BottomSheet';
import { spacing } from '@/theme';

import { ClientListItem } from './ClientListItem';
import {
  type Client,
  type SearchClientBottomSheetProps,
} from './SearchClientBottomSheet.types';

export const SearchClientBottomSheet = ({
  visible,
  onClose,
  clients,
  onSelect,
  selectedClientId,
  title = 'Search Client',
  placeholder = 'Search clients...',
  selectButtonLabel = 'Select',
}: SearchClientBottomSheetProps): ReactElement => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | undefined>(
    clients.find(c => c.id === selectedClientId),
  );

  const filteredClients = useMemo(() => {
    if (!searchQuery) return clients;
    return clients.filter(client =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [clients, searchQuery]);

  const handleSelect = (client: Client): void => {
    setSelectedClient(client);
  };

  const handleConfirm = (): void => {
    if (selectedClient) {
      onSelect(selectedClient);
      onClose();
    }
  };

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      header={{ title }}
      variant="default"
      search={{
        value: searchQuery,
        onChangeText: setSearchQuery,
        placeholder,
      }}
      footer={{
        primaryLabel: selectButtonLabel,
        onPrimaryPress: handleConfirm,
        primaryDisabled: !selectedClient,
      }}
    >
      <View style={styles.container}>
        <View style={styles.listContainer}>
          {filteredClients.map(client => (
            <ClientListItem
              key={client.id}
              client={client}
              isSelected={selectedClient?.id === client.id}
              onPress={handleSelect}
            />
          ))}
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing['Spacing-3xl'],
  },
  listContainer: {
    gap: spacing['Spacing-m'],
  },
});
