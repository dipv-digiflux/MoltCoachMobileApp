import React, { type ReactElement } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CheckCircleIcon from '@/assets/images/svg/check-circle-icon.svg';
import InfoIcon from '@/assets/images/svg/infoicon.svg';
import { Button } from '@/components';
import { colors, spacing, typography } from '@/theme';

import type { AppStackNavigationProp } from '@/types/navigation.types';

export const InviteSentScreen = (): ReactElement => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<AppStackNavigationProp>();

  const onGoToHomepage = (): void => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'BottomTabs',
          state: {
            index: 0,
            routes: [{ name: 'HomeTab' }],
          },
        },
      ],
    });
  };

  const onAddMoreClients = (): void => {
    navigation.navigate('AddClient');
  };

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: insets.bottom + spacing['Spacing-5xl'] },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <CheckCircleIcon width={80} height={80} />
        </View>

        <Text style={styles.title}>Invite Sent</Text>

        <Text style={styles.subtitle}>
          Your invitations have been successfully{'\n'}
          sent to the selected contacts.
        </Text>

        <View style={styles.infoBox}>
          <InfoIcon width={24} height={24} style={styles.infoIcon} />
          <Text style={styles.infoText}>
            If you want to track the progress, you{'\n'}
            can check on the Homepage as well as{'\n'}
            the Add Client page.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          label="Go to Homepage"
          variant="primary"
          size="large"
          fullWidth
          onPress={onGoToHomepage}
          style={styles.primaryButton}
        />
        <Button
          label="Add More Clients"
          variant="outline"
          size="large"
          fullWidth
          onPress={onAddMoreClients}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.StatesWhite,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing['Spacing-5xl'],
  },
  iconContainer: {
    marginBottom: spacing['Spacing-5xl'],
    backgroundColor: '#E8F5E9',
    borderRadius: 60,
    padding: spacing['Spacing-m'],
  },
  title: {
    ...typography.h4Bold,
    color: colors.TextPrimaryDefault,
    marginBottom: spacing['Spacing-sm'],
    textAlign: 'center',
  },
  subtitle: {
    ...typography.b1Regular,
    color: colors.TextSecondaryDefault,
    textAlign: 'center',
    marginBottom: spacing['Spacing-8xl'],
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: colors.StatesWhite,
    borderWidth: 1,
    borderColor: colors.BorderPrimaryDefault,
    padding: spacing['Spacing-4xl'],
    borderRadius: spacing['Spacing-m'],
    width: '100%',
  },
  infoIcon: {
    marginRight: spacing['Spacing-m'],
    marginTop: spacing['Spacing-xs'],
  },
  infoText: {
    ...typography.b2Regular,
    color: colors.TextPrimaryDefault,
    flex: 1,
  },
  footer: {
    paddingHorizontal: spacing['Spacing-5xl'],
    width: '100%',
  },
  primaryButton: {
    marginBottom: spacing['Spacing-m'],
  },
});
