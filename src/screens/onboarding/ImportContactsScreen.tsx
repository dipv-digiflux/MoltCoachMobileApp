import React, { type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

import { PageHeaderScrollView } from '@/components';
import { ImportContactsButtonGroup } from '@/screens/onboarding/components/ImportContactsButtonGroup';
import { ImportContactsContent } from '@/screens/onboarding/components/ImportContactsContent';
import { useAppSelector } from '@/store/hooks';
import { colors } from '@/theme';

export const ImportContactsScreen = (): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  return (
    <View style={styles.container}>
      <PageHeaderScrollView
        header={{ title: translation.importContactsHeaderTitle }}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <ImportContactsContent />
      </PageHeaderScrollView>
      <ImportContactsButtonGroup />
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
