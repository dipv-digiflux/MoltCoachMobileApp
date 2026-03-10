import React, { useState, type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components';
import { LiquidFooter } from '@/components/LiquidFooter';
import { PageHeaderScrollView } from '@/components/PageHeaderScrollView';
import { SelectContactListItem } from '@/screens/clients/components/SelectContactListItem';
import { SelectContactsSearchBar } from '@/screens/clients/components/SelectContactsSearchBar';
import { SelectContactsSectionHeader } from '@/screens/clients/components/SelectContactsSectionHeader';
import { useAppSelector } from '@/store/hooks';
import { colors } from '@/theme';

export const SelectContactScreen = (): ReactElement => {
  const insets = useSafeAreaInsets();
  const [searchValue, setSearchValue] = useState<string>('');
  const translations = useAppSelector(state => state.translation);

  return (
    <View style={styles.container}>
      <PageHeaderScrollView
        header={{
          title: translations.selectContactsHeaderTitle,
        }}
        contentContainerStyle={[
          styles.contentContainerStyle,
          { paddingBottom: insets.bottom },
        ]}
      >
        <SelectContactsSearchBar
          value={searchValue}
          onChangeText={setSearchValue}
          placeholder={translations.selectContactsSearchPlaceholder}
        />
        <SelectContactsSectionHeader
          label={translations.selectContactsSectionHeaderLabel}
        />
        <SelectContactListItem
          name="Alice Smith"
          phoneNumber="+1 (555) 123-4567"
          isSelected
        />
      </PageHeaderScrollView>
      <LiquidFooter showTopBorder>
        <Button
          label="Import 3 Clients"
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
  contentContainerStyle: {
    flexGrow: 1,
  },
});
