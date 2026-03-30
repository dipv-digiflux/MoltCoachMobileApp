import React, {
  useCallback,
  useMemo,
  useState,
  type ReactElement,
} from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components';
import { LiquidFooter } from '@/components/LiquidFooter';
import { PageHeaderScrollView } from '@/components/PageHeaderScrollView';
import { useContacts } from '@/hooks/useContacts';
import { ContactInfoRow } from '@/screens/clients/components/ContactInfoRow';
import { SelectContactsSearchBar } from '@/screens/clients/components/SelectContactsSearchBar';
import { SelectContactsSectionHeader } from '@/screens/clients/components/SelectContactsSectionHeader';
import { useAppSelector } from '@/store/hooks';
import { colors, spacing } from '@/theme';
import { AppStackNavigationProp } from '@/types/navigation.types';

export const SelectContactScreen = (): ReactElement => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<AppStackNavigationProp>();
  const translations = useAppSelector(state => state.translation);

  const { contacts, loading } = useContacts();
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const filteredContacts = useMemo(() => {
    if (!searchValue) return contacts;
    const lowerSearch = searchValue.toLowerCase();
    return contacts.filter(
      c =>
        (c.displayName?.toLowerCase() || '').includes(lowerSearch) ||
        c.phoneNumbers.some(p => p.number.includes(searchValue)),
    );
  }, [contacts, searchValue]);

  const toggleSelection = useCallback((id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleImport = useCallback(() => {
    const selectedContacts = contacts.filter(c => selectedIds.has(c.recordID));
    navigation.navigate('AddedClients', { selectedContacts });
  }, [contacts, selectedIds, navigation]);

  const selectedCount = selectedIds.size;

  return (
    <View style={styles.container}>
      <PageHeaderScrollView
        header={{
          title: translations.selectContactsHeaderTitle,
        }}
        contentContainerStyle={[
          styles.contentContainerStyle,
          { paddingBottom: insets.bottom + spacing['Spacing-16xl'] },
        ]}
      >
        <SelectContactsSearchBar
          value={searchValue}
          onChangeText={setSearchValue}
          placeholder={translations.selectContactsSearchPlaceholder}
        />

        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.PrimaryMain}
            style={styles.loader}
          />
        ) : (
          <>
            <SelectContactsSectionHeader
              label={translations.selectContactsSectionHeaderLabel}
            />
            {filteredContacts.map(contact => (
              <ContactInfoRow
                key={contact.recordID}
                avatarSource={
                  contact.thumbnailPath
                    ? { uri: contact.thumbnailPath }
                    : undefined
                }
                name={contact.displayName || ''}
                phoneNumber={contact.phoneNumbers[0]?.number || ''}
                onPress={() => toggleSelection(contact.recordID)}
                selected={selectedIds.has(contact.recordID)}
                showCheckbox
              />
            ))}
          </>
        )}
      </PageHeaderScrollView>
      <LiquidFooter showTopBorder>
        <Button
          label={
            selectedCount > 0
              ? `Import ${selectedCount} Clients`
              : 'Import Clients'
          }
          variant="primary"
          size="large"
          fullWidth
          disabled={selectedCount === 0}
          onPress={handleImport}
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
  },
  loader: {
    marginTop: spacing['Spacing-16xl'],
  },
});
