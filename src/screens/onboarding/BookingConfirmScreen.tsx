import React, { type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import Config from 'react-native-config';

import {
  BookingConfirmCalendly,
  BookingConfirmHeader,
  PageHeaderScrollView,
} from '@/components';
import { colors } from '@/theme';

export const BookingConfirmScreen = (): ReactElement => {
  const calendlyUrl = Config.CALENDLY_URL;

  return (
    <PageHeaderScrollView
      header={{ title: '' }}
      style={{
        flex: 1,
        backgroundColor: colors.StatesWhite,
      }}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: colors.StatesWhite,
      }}
    >
      <View style={styles.cardContainer}>
        <BookingConfirmHeader />
        {calendlyUrl ? <BookingConfirmCalendly url={calendlyUrl} /> : null}
      </View>
    </PageHeaderScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.StatesWhite,
    flex: 1,
  },
});
