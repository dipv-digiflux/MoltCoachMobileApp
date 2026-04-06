import React, { type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  AddAddressForm,
  Button,
  LiquidFooter,
  PageHeaderScrollView,
} from '@/components';
import { useAppSelector } from '@/store/hooks';
import { colors } from '@/theme';

export const AddAddress = (): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  return (
    <View style={styles.container}>
      <PageHeaderScrollView
        header={{ title: translation.addAddressHeaderTitle }}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <AddAddressForm />
      </PageHeaderScrollView>
      <LiquidFooter showTopBorder>
        <Button
          label={translation.addAddressFooterButton}
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
