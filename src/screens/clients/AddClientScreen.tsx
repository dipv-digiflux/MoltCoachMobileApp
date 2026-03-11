import React, { type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components';
import { LiquidFooter } from '@/components/LiquidFooter';
import { PageHeaderScrollView } from '@/components/PageHeaderScrollView';
import { useAppSelector } from '@/store/hooks';
import { spacing } from '@/theme';
import { AddClientContainer } from '@screens/clients/components/AddClientContainer';
import { AddClientDivider } from '@screens/clients/components/AddClientDivider';
import { ImportFromContactsCard } from '@screens/clients/components/ImportFromContactsCard';

export const AddClientScreen = (): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  return (
    // <View style={styles.container}>
    <>
      <PageHeaderScrollView
        header={{ title: translation.addClientHeaderTitle }}
        style={styles.scrollView}
        // contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <ImportFromContactsCard
            title={translation.addClientImportFromContactsTitle}
            subtitle={translation.addClientImportFromContactsSubtitle}
            onPress={() => {}}
          />

          <AddClientDivider label={translation.addClientDividerLabel} />

          <AddClientContainer />
        </View>
      </PageHeaderScrollView>
      <LiquidFooter showTopBorder>
        {/* Footer content (e.g., buttons) can be passed from the screen. */}
        <Button
          label={translation.addClientButtonLabel}
          onPress={() => {}}
          variant="primary"
          size="large"
          fullWidth={true}
        />
      </LiquidFooter>
    </>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-5xl'],
    gap: spacing['Spacing-5xl'],
  },
});
