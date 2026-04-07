import React, { type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

import { PageHeaderScrollView } from '@/components/PageHeaderScrollView';
import { useAppSelector } from '@/store/hooks';
import { colors } from '@/theme';

export const TransactionDetailsScreen = (): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  return (
    <View style={styles.container}>
      <PageHeaderScrollView
        header={{ title: translation.importContactsHeaderTitle }}
        contentContainerStyle={styles.contentContainerStyle}
      ></PageHeaderScrollView>
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
