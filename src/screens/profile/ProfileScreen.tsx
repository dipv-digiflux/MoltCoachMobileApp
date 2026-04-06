import React, { type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  AttendeesSvg,
  BackIconSvg,
  CheckCircleIconSvg,
  ContactBookSvg,
  CreditIconSvg,
  LocationSvg,
  NotificationBellSvg,
  ProfileIconSvg,
  ShieldIconSvg,
  StarIconSvg,
} from '@/assets/images';
import {
  PageHeaderScrollView,
  CreditBalanceCard,
  ActionCenter,
  SettingsSection,
  ReferAndEarnCard,
  ReferOptionBottomSheet,
} from '@/components';
import { colors, iconScale, spacing } from '@/theme';

import { LogoutBottomSheet } from './components/LogoutBottomSheet';
import { ProfileHeader } from './components/ProfileHeader';
import { TermsBottomSheet } from './components/TermsBottomSheet';

import type { AppStackNavigationProp } from '@/types/navigation.types';

export const ProfileScreen = (): ReactElement => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<AppStackNavigationProp>();

  const [notifications, setNotifications] = React.useState({
    newClient: true,
    profileCompleted: true,
    planReview: true,
    autoNudges: false,
  });

  const [isLogoutSheetVisible, setIsLogoutSheetVisible] = React.useState(false);
  const [isTermsSheetVisible, setIsTermsSheetVisible] = React.useState(false);
  const [isReferOptionSheetVisible, setIsReferOptionSheetVisible] =
    React.useState(false);

  const accountSettingsItems = [
    {
      id: 'manage-address',
      label: 'Manage Address',
      icon: (
        <LocationSvg
          width={iconScale(20)}
          height={iconScale(20)}
          color={colors.IconPrimaryDefault}
        />
      ),
      type: 'link' as const,
      onPress: () => console.log('Manage Address'),
    },
    {
      id: 'transaction-history',
      label: 'Transaction History',
      icon: (
        <CreditIconSvg
          width={iconScale(20)}
          height={iconScale(20)}
          color={colors.IconPrimaryDefault}
        />
      ),
      type: 'link' as const,
      onPress: () => navigation.navigate('TransactionHistory'),
    },
    {
      id: 'payment-methods',
      label: 'Payment methods',
      icon: (
        <CreditIconSvg
          width={iconScale(20)}
          height={iconScale(20)}
          color={colors.IconPrimaryDefault}
        />
      ),
      type: 'link' as const,
      onPress: () => navigation.navigate('PaymentMethods'),
    },
    {
      id: 'ownership-control',
      label: 'Ownership control',
      icon: (
        <StarIconSvg
          width={iconScale(20)}
          height={iconScale(20)}
          color={colors.IconPrimaryDefault}
        />
      ),
      type: 'link' as const,
      onPress: () => navigation.navigate('NewTransfer'),
    },
  ];

  const notificationItems = [
    {
      id: 'new-client',
      label: 'New client joined',
      icon: (
        <ProfileIconSvg
          width={iconScale(20)}
          height={iconScale(20)}
          color={colors.IconPrimaryDefault}
        />
      ),
      type: 'switch' as const,
      value: notifications.newClient,
      onValueChange: (val: boolean) =>
        setNotifications(prev => ({ ...prev, newClient: val })),
    },
    {
      id: 'profile-completed',
      label: 'Profile completed',
      icon: (
        <CheckCircleIconSvg
          width={iconScale(20)}
          height={iconScale(20)}
          color={colors.IconPrimaryDefault}
        />
      ),
      type: 'switch' as const,
      value: notifications.profileCompleted,
      onValueChange: (val: boolean) =>
        setNotifications(prev => ({ ...prev, profileCompleted: val })),
    },
    {
      id: 'plan-review',
      label: 'Plan awaiting review',
      icon: (
        <NotificationBellSvg
          width={iconScale(20)}
          height={iconScale(20)}
          color={colors.IconPrimaryDefault}
        />
      ),
      type: 'switch' as const,
      value: notifications.planReview,
      onValueChange: (val: boolean) =>
        setNotifications(prev => ({ ...prev, planReview: val })),
    },
    {
      id: 'auto-nudges',
      label: 'Auto nudges on inactivity',
      subtitle: 'Plan awaiting review',
      icon: (
        <ProfileIconSvg
          width={iconScale(20)}
          height={iconScale(20)}
          color={colors.IconPrimaryDefault}
        />
      ),
      type: 'switch' as const,
      value: notifications.autoNudges,
      onValueChange: (val: boolean) =>
        setNotifications(prev => ({ ...prev, autoNudges: val })),
    },
  ];

  const appSupportItems = [
    {
      id: 'contact-us',
      label: 'Contact us',
      icon: (
        <AttendeesSvg
          width={iconScale(20)}
          height={iconScale(20)}
          color={colors.IconPrimaryDefault}
        />
      ),
      type: 'link' as const,
      onPress: () => navigation.navigate('ContactUs'),
    },
    {
      id: 'terms-conditions',
      label: 'Terms & Conditions',
      icon: (
        <ContactBookSvg
          width={iconScale(20)}
          height={iconScale(20)}
          color={colors.IconPrimaryDefault}
        />
      ),
      type: 'link' as const,
      onPress: () => setIsTermsSheetVisible(true),
    },
    {
      id: 'privacy-policy',
      label: 'Privacy policy',
      icon: (
        <ShieldIconSvg
          width={iconScale(20)}
          height={iconScale(20)}
          color={colors.IconPrimaryDefault}
        />
      ),
      type: 'link' as const,
      onPress: () => console.log('Privacy policy'),
    },
    {
      id: 'log-out',
      label: 'Log out',
      icon: (
        <BackIconSvg
          width={iconScale(20)}
          height={iconScale(20)}
          color={colors.IconPrimaryDefault}
        />
      ),
      type: 'link' as const,
      onPress: () => setIsLogoutSheetVisible(true),
    },
  ];

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <PageHeaderScrollView
        header={{ title: '' }}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <View style={styles.scrollContent}>
          <ProfileHeader
            name="Alex Patel"
            email="John@gmail.com"
            id="129381"
            onEditPress={() => navigation.navigate('ProfileSettings')}
            onCopyIdPress={() => console.log('Copy ID')}
          />

          <CreditBalanceCard
            balance="2133"
            onPress={() => console.log('Credit pressed')}
          />

          <ActionCenter
            tabs={[
              { id: 'All', label: 'All', count: 5 },
              { id: 'Client', label: 'Client', count: 2 },
              { id: 'Coach', label: 'Coach', count: 3 },
            ]}
            actions={[
              {
                id: '1',
                title: 'Accept coach invite',
                description:
                  'Marcus Johnson invited you to join as a coach for two athletes.',
                onAccept: () => console.log('Accept 1'),
                onReject: () => console.log('Reject 1'),
              },
              {
                id: '2',
                title: 'Attendance',
                description: 'Verify attendance for the 6:00 PM session.',
                onAccept: () => console.log('Accept 2'),
                onReject: () => console.log('Reject 2'),
              },
            ]}
            onViewAll={() => console.log('View all pressed')}
          />
          <View style={styles.settingsContainer}>
            <SettingsSection
              title="Account & Settings"
              items={accountSettingsItems}
            />
            <SettingsSection
              title="Notifications & nudges"
              items={notificationItems}
              footerButtonLabel="Notification preferences"
              onFooterButtonPress={() =>
                console.log('Notification preferences')
              }
            />
            <SettingsSection title="App & Support" items={appSupportItems} />
          </View>

          <ReferAndEarnCard
            onPress={() => setIsReferOptionSheetVisible(true)}
          />
        </View>
      </PageHeaderScrollView>

      <LogoutBottomSheet
        visible={isLogoutSheetVisible}
        onClose={() => setIsLogoutSheetVisible(false)}
        onLogout={() => {
          console.log('Logging out...');
          setIsLogoutSheetVisible(false);
        }}
      />

      <TermsBottomSheet
        visible={isTermsSheetVisible}
        onClose={() => setIsTermsSheetVisible(false)}
      />

      <ReferOptionBottomSheet
        visible={isReferOptionSheetVisible}
        onClose={() => setIsReferOptionSheetVisible(false)}
        onReferCoach={() => navigation.navigate('ReferCoach')}
        onReferClient={() => console.log('Refer a client')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.StatesWhite,
  },
  contentContainerStyle: {
    paddingBottom: spacing['Spacing-16xl'],
  },
  scrollContent: {
    paddingHorizontal: spacing['Spacing-5xl'],
    gap: spacing['Spacing-10xl'],
  },
  settingsContainer: {
    gap: spacing['Spacing-10xl'],
  },
});
