import React, { type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BookingConfirmHeader } from '@/components';
import { BookingConfirmCalendly } from '@/features/onboarding/components/BookingConfirmCalendly';
import { useBookingConfirm } from '@/features/onboarding/hooks/useBookingConfirm';
import { useAppSelector } from '@/store/hooks';
import { colors } from '@/theme';

export const BookingConfirmScreen = (): ReactElement => {
  const coach = useAppSelector(state => state.booking.coach);
  const { handleEventScheduled } = useBookingConfirm();

  const calendlyUrl = 'https://calendly.com/tech-molt';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.cardContainer}>
        <BookingConfirmHeader />

        <BookingConfirmCalendly
          url={calendlyUrl}
          name={coach?.first_name}
          email={coach?.email}
          phoneNumber={coach?.phone_number}
          onEventScheduled={handleEventScheduled}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.StatesWhite,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: colors.StatesWhite,
  },
});
