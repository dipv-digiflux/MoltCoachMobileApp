import React, { type ReactElement } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  CheckedcircleWithBlackBgSvg,
  BackIconSvg,
  CalanderSvg,
  LocationSvg,
  AttendeesSvg,
} from '@/assets/images';
import { colors, spacing } from '@/theme';

import styles from './BookingConfirmedScreen.styles';
import {
  BookingDetailRowProps,
  CalendarButtonProps,
} from './BookingConfirmedScreen.types';
import { useBookingConfirmed } from './hooks/useBookingConfirmed';

export const BookingConfirmedScreen = (): ReactElement => {
  const insets = useSafeAreaInsets();
  const {
    navigation,
    translation,
    getFormattedDate,
    getFormattedTimeRange,
    getLocationLabel,
    handleLogout,
  } = useBookingConfirmed();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <BackIconSvg
            width={24}
            height={24}
            color={colors.TextPrimaryDefault}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.iconContainer}>
          <CheckedcircleWithBlackBgSvg width={48} height={48} />
        </View>

        <Text style={styles.title}>{translation.bookingConfirmMainText}</Text>
        <Text style={styles.description}>
          {translation.bookingConfirmSubText}
        </Text>

        <View style={styles.card}>
          <BookingDetailRow
            icon={<CalanderSvg width={20} height={20} />}
            label="Date & time"
            value={getFormattedDate()}
            subValue={getFormattedTimeRange()}
          />
          <View style={styles.divider} />
          <BookingDetailRow
            icon={<LocationSvg width={20} height={20} />}
            label="Location"
            value={getLocationLabel()}
            subValue="Link provided in confirmation email"
          />
          <View style={styles.divider} />
          <BookingDetailRow
            icon={<AttendeesSvg width={20} height={20} />}
            label="Attendees"
            value="Molt Onboarding Team"
          />
          <View style={styles.divider} />
          <View style={styles.calendarButtons}>
            <CalendarButton
              label="Google"
              icon={
                <CalanderSvg
                  width={16}
                  height={16}
                  color={colors.OverlayDark}
                />
              }
            />
            <CalendarButton
              label="Outlook"
              icon={
                <CalanderSvg
                  width={16}
                  height={16}
                  color={colors.OverlayDark}
                />
              }
            />
            <CalendarButton
              label="iCal"
              icon={
                <CalanderSvg
                  width={16}
                  height={16}
                  color={colors.OverlayDark}
                />
              }
            />
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          { paddingBottom: insets.bottom + spacing['Spacing-5xl'] },
        ]}
      >
        <View style={styles.footerActionBox}>
          <View style={styles.footerDot} />
          <View style={styles.footerTextContainer}>
            <Text style={styles.footerTitle}>Need to make a change?</Text>
            <Text style={styles.footerSubText}>
              Try logging out and signing in with another email.
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              void handleLogout();
            }}
          >
            <Text style={styles.logoutLink}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const BookingDetailRow = ({
  icon,
  label,
  value,
  subValue,
}: BookingDetailRowProps): ReactElement => (
  <View style={styles.row}>
    <View style={styles.rowIconContainer}>{icon}</View>
    <View style={styles.rowTextContainer}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
      {subValue ? <Text style={styles.rowSubValue}>{subValue}</Text> : null}
    </View>
  </View>
);

const CalendarButton = ({ label, icon }: CalendarButtonProps): ReactElement => (
  <TouchableOpacity style={styles.calendarButton}>
    <View style={styles.calendarButtonIcon}>{icon}</View>
    <Text style={styles.calendarButtonText}>{label}</Text>
  </TouchableOpacity>
);
