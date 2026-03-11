import React, { useState, type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, FilterTabs } from '@/components';
import { LiquidFooter } from '@/components/LiquidFooter';
import { PageHeaderScrollView } from '@/components/PageHeaderScrollView';
import { useContacts } from '@/hooks/useContacts';
import { ContactInfoRow } from '@/screens/clients/components/ContactInfoRow';
import { SelectContactsMainContainer } from '@/screens/clients/components/SelectContactsMainContainer';
import { SelectedContactsHeader } from '@/screens/clients/components/SelectedContactsHeader';
import { colors, radius, spacing, typography } from '@/theme';

export const AddedClientsScreen = (): ReactElement => {
  const insets = useSafeAreaInsets();
  const [relationshipTab, setRelationshipTab] = useState<'Lead' | 'Client'>(
    'Client',
  );
  const { contacts: _contacts } = useContacts();

  return (
    <View style={styles.container}>
      <PageHeaderScrollView
        header={{ title: 'Added clients' }}
        contentContainerStyle={[
          styles.contentContainerStyle,
          { paddingBottom: insets.bottom },
        ]}
      >
        <SelectedContactsHeader />
        <SelectContactsMainContainer>
          <View style={styles.contactRowWithTabs}>
            <ContactInfoRow
              avatarSource={{
                uri: 'https://randomuser.me/api/portraits/women/1.jpg',
              }}
              name="Alice Smith"
              phoneNumber="+1 (555) 123-4567"
            />
            <FilterTabs
              tabs={['Lead', 'Client']}
              activeTab={relationshipTab}
              onTabChange={tab => setRelationshipTab(tab as 'Lead' | 'Client')}
              style={styles.filterTabsCompact}
              tabsWrapperStyle={styles.filterTabsWrapper}
              tabButtonStyle={styles.filterTabsButton}
              tabTextStyle={styles.filterTabsText}
            />
          </View>
        </SelectContactsMainContainer>
      </PageHeaderScrollView>
      <LiquidFooter showTopBorder>
        <Button
          label="Invite 5 clients"
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
  contactRowWithTabs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterTabsCompact: {
    marginHorizontal: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderWidth: 0,
    backgroundColor: colors.Transparent,
  },
  filterTabsWrapper: {
    // use default background and radius from FilterTabs,
    // but remove any extra horizontal growth
    alignSelf: 'flex-start',
  },
  filterTabsButton: {
    paddingHorizontal: spacing['Spacing-2_5xl'], // 11px
    paddingVertical: spacing['Spacing-l'], // 6px
    borderRadius: radius['xs'], // 2px
    borderWidth: 0,
    backgroundColor: colors.Transparent,
    borderColor: colors.SurfaceSecondaryDefault,
  },
  filterTabsText: {
    ...typography.bodySmall2SemiBold, // 14px
    lineHeight: 18,
    color: colors.TextSecondaryDefault,
  },
});
