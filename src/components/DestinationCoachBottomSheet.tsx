import React, {
  type ReactElement,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AppStackNavigationProp } from '@/navigation/types';
import { useAppSelector } from '@/store/hooks';
import { colors, spacing, typography } from '@/theme';

import { BottomSheet } from './BottomSheet';
import { Button } from './Button';
import { DestinationCoachBottomSheetProps } from './DestinationCoachBottomSheet.types';
import { FilterTabs } from './FilterTabs';
import { Input } from './Input';

/**
 * Bottom sheet for adding a destination coach.
 * Allows switching between manual entry and contact import.
 */
export const DestinationCoachBottomSheet = ({
  visible,
  onClose,
}: DestinationCoachBottomSheetProps): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  const [activeTab, setActiveTab] = useState(
    translation.destinationCoachEnterDetails,
  );
  const [email, setEmail] = useState('');
  const [coachId, setCoachId] = useState('');

  const tabs = useMemo(
    () => [
      translation.destinationCoachEnterDetails,
      translation.destinationCoachFromContacts,
    ],
    [
      translation.destinationCoachEnterDetails,
      translation.destinationCoachFromContacts,
    ],
  );

  const navigation = useNavigation<AppStackNavigationProp>();

  const handleAddPress = useCallback(() => {
    // Action logic would go here
    navigation.navigate('TransferStatus');
  }, [navigation]);

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      header={{
        title: translation.destinationCoachTitle,
      }}
    >
      <View style={styles.container}>
        {/* Tab Selection */}
        <FilterTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          style={styles.tabsContainer}
          tabsWrapperStyle={styles.tabsWrapper}
          tabButtonStyle={styles.tabButton}
        />

        {/* Form Section */}
        <View style={styles.formContainer}>
          <Input
            label={translation.destinationCoachEmailLabel}
            placeholder={translation.destinationCoachEmailPlaceholder}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* OR Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>
              {translation.destinationCoachOrDivider}
            </Text>
            <View style={styles.dividerLine} />
          </View>

          <Input
            label={translation.destinationCoachIdLabel}
            placeholder={translation.destinationCoachIdPlaceholder}
            value={coachId}
            onChangeText={setCoachId}
            autoCapitalize="characters"
          />
        </View>

        {/* Action Button */}
        <Button
          label={translation.destinationCoachAddButton}
          onPress={handleAddPress}
          variant="secondary"
          fullWidth
          style={styles.addButton}
          testID="destination-coach-add-button"
        />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing['Spacing-xl'],
    paddingBottom: spacing['Spacing-10xl'],
  },
  tabsContainer: {
    marginHorizontal: 0,
    borderWidth: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginBottom: spacing['Spacing-10xl'],
  },
  tabsWrapper: {
    flex: 1,
  },
  formContainer: {
    gap: spacing['Spacing-10xl'],
    marginBottom: spacing['Spacing-15xl'],
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-4xl'],
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.StatesDivider,
  },
  dividerText: {
    ...typography.bodySmall2Medium,
    color: colors.TextSecondaryDefault,
    textTransform: 'uppercase',
  },
  addButton: {},
  tabButton: {
    flex: 1,
    paddingVertical: spacing['Spacing-3xl'],
  },
});
