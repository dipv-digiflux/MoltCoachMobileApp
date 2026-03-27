import React, {
  type ReactElement,
  useMemo,
  useState,
  useCallback,
} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  Controller,
  useFormContext,
  useWatch,
  type FieldPath,
} from 'react-hook-form';

import { CalendarIconSvg } from '@/assets/images';
import {
  FilterTabs,
  Input,
  Switch,
  DateSelectionBottomSheet,
} from '@/components';
import { useAppSelector } from '@/store/hooks';
import { colors, radius, spacing, typography } from '@/theme';

import { ContactInfoRow } from '../ContactInfoRow';

import type { SelectedContactCardProps } from './SelectedContactCard.types';
import type { AddedClientsFormValues } from '@/screens/clients/utils/addedClientsSchema.types';

export const SelectedContactCard = ({
  avatarSource,
  name,
  phoneNumber,
  index,
}: SelectedContactCardProps): ReactElement => {
  const {
    control,
    formState: { errors },
  } = useFormContext<AddedClientsFormValues>();
  const translation = useAppSelector(state => state.translation);
  const fieldPath = `contacts.${index}`;
  const [dateSheetVisible, setDateSheetVisible] = useState(false);

  const formatIsoToDisplay = useCallback((iso: string): string => {
    if (!iso) return '';
    const [y, m, d] = iso.split('-').map(Number);
    const date = new Date(y, (m ?? 1) - 1, d);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    });
  }, []);

  const relationship = useWatch({
    control,
    name: `${fieldPath}.relationship` as FieldPath<AddedClientsFormValues>,
  });

  const sessionType = useWatch({
    control,
    name: `${fieldPath}.sessionType` as FieldPath<AddedClientsFormValues>,
  });

  const addSessions = useWatch({
    control,
    name: `${fieldPath}.addSessions` as FieldPath<AddedClientsFormValues>,
  });

  const isClient = relationship === 'Client';
  const showSessions = isClient || addSessions;
  const isOnline = sessionType === 'Online';

  const contactErrors = useMemo(() => {
    return errors.contacts?.[index];
  }, [errors.contacts, index]);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <ContactInfoRow
          avatarSource={avatarSource}
          name={name}
          phoneNumber={phoneNumber}
          containerStyle={styles.contactInfo}
        />
        <Controller
          control={control}
          name={
            `${fieldPath}.relationship` as FieldPath<AddedClientsFormValues>
          }
          render={({ field: { onChange, value } }) => (
            <FilterTabs
              tabs={['Lead', 'Client']}
              activeTab={value as 'Lead' | 'Client'}
              onTabChange={onChange}
              style={styles.relationshipTabs}
              tabsWrapperStyle={styles.relationshipTabsWrapper}
              tabButtonStyle={styles.relationshipTabButton}
              tabTextStyle={styles.relationshipTabText}
            />
          )}
        />
      </View>

      {!isClient ? (
        <View style={styles.leadToggleRow}>
          <Text style={styles.toggleLabel}>
            {translation.contactCardAddSessionsPackage}
          </Text>
          <Controller
            control={control}
            name={
              `${fieldPath}.addSessions` as FieldPath<AddedClientsFormValues>
            }
            render={({ field: { onChange, value } }) => (
              <Switch on={value as boolean} onChange={onChange} />
            )}
          />
        </View>
      ) : null}

      {showSessions ? (
        <View style={styles.clientConfig}>
          <Controller
            control={control}
            name={
              `${fieldPath}.sessionType` as FieldPath<AddedClientsFormValues>
            }
            render={({ field: { onChange, value } }) => (
              <FilterTabs
                tabs={['Online', 'Physical']}
                activeTab={value as 'Online' | 'Physical'}
                onTabChange={onChange}
                style={styles.sessionTabs}
                tabsWrapperStyle={styles.sessionTabsWrapper}
                tabButtonStyle={styles.sessionTabButton}
                tabTextStyle={styles.sessionTabText}
              />
            )}
          />

          <View style={styles.inputsRow}>
            {isOnline ? (
              <React.Fragment>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>
                    {translation.contactCardMonths}
                  </Text>
                  <Controller
                    control={control}
                    name={
                      `${fieldPath}.months` as FieldPath<AddedClientsFormValues>
                    }
                    render={({ field: { onChange, value } }) => (
                      <Input
                        value={value as string}
                        onChangeText={onChange}
                        placeholder="4"
                        keyboardType="numeric"
                        error={contactErrors?.months !== undefined}
                        errorMessage={contactErrors?.months?.message}
                        style={styles.inputContainer}
                        textInputStyle={styles.textInput}
                      />
                    )}
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>
                    {translation.contactCardStartDate}
                  </Text>
                  <Controller
                    control={control}
                    name={
                      `${fieldPath}.startDate` as FieldPath<AddedClientsFormValues>
                    }
                    render={({ field: { onChange, value } }) => (
                      <>
                        <Input
                          value={
                            value ? formatIsoToDisplay(value as string) : ''
                          }
                          placeholder="24 Feb"
                          editable={false}
                          containerPress={() => setDateSheetVisible(true)}
                          error={contactErrors?.startDate !== undefined}
                          errorMessage={contactErrors?.startDate?.message}
                          rightIcon={
                            <CalendarIconSvg
                              width={20}
                              height={20}
                              color={colors.IconPrimaryActive}
                            />
                          }
                          style={styles.inputContainer}
                          textInputStyle={styles.textInput}
                        />
                        <DateSelectionBottomSheet
                          visible={dateSheetVisible}
                          onClose={() => setDateSheetVisible(false)}
                          onDateSelect={iso => {
                            onChange(iso);
                            setDateSheetVisible(false);
                          }}
                          initialSelectedDate={value as string}
                        />
                      </>
                    )}
                  />
                </View>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>
                    {translation.contactCardTotalSessions}
                  </Text>
                  <Controller
                    control={control}
                    name={
                      `${fieldPath}.totalSessions` as FieldPath<AddedClientsFormValues>
                    }
                    render={({ field: { onChange, value } }) => (
                      <Input
                        value={value as string}
                        onChangeText={onChange}
                        placeholder="8"
                        keyboardType="numeric"
                        error={contactErrors?.totalSessions !== undefined}
                        errorMessage={contactErrors?.totalSessions?.message}
                        style={styles.inputContainer}
                        textInputStyle={styles.textInput}
                      />
                    )}
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>
                    {translation.contactCardSessionsLeft}
                  </Text>
                  <Controller
                    control={control}
                    name={
                      `${fieldPath}.sessionsLeft` as FieldPath<AddedClientsFormValues>
                    }
                    render={({ field: { onChange, value } }) => (
                      <Input
                        value={value as string}
                        onChangeText={onChange}
                        placeholder="4"
                        keyboardType="numeric"
                        error={contactErrors?.sessionsLeft !== undefined}
                        errorMessage={contactErrors?.sessionsLeft?.message}
                        style={styles.inputContainer}
                        textInputStyle={styles.textInput}
                      />
                    )}
                  />
                </View>
              </React.Fragment>
            )}
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.StatesWhite,
    borderRadius: radius['md'], // 8px
    padding: spacing['Spacing-5xl'], // 16px
    borderWidth: 1,
    borderColor: colors.BorderPrimaryDisabled,
    marginBottom: spacing['Spacing-5xl'],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing['Spacing-3xl'],
  },
  contactInfo: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  relationshipTabs: {
    marginHorizontal: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: colors.Transparent,
  },
  relationshipTabsWrapper: {
    backgroundColor: colors.SurfaceSecondaryDisabled,
    borderRadius: radius['xs'],
    padding: spacing['Spacing-sm'],
  },
  relationshipTabButton: {
    paddingHorizontal: spacing['Spacing-3xl'],
    paddingVertical: spacing['Spacing-l'],
    borderRadius: radius['xs'],
    borderWidth: 0,
  },
  relationshipTabText: {
    ...typography.bodySmall2SemiBold,
    color: colors.TextSecondaryDefault,
  },
  leadToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-5xl'],
    borderTopWidth: 1,
    borderTopColor: colors.BorderPrimaryDisabled,
  },
  toggleLabel: {
    ...typography.b2Bold,
    color: colors.TextPrimaryStrong,
  },
  clientConfig: {
    marginTop: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-5xl'],
    borderTopWidth: 1,
    borderTopColor: colors.BorderPrimaryDisabled,
    gap: spacing['Spacing-5xl'],
  },
  sessionTabs: {
    marginHorizontal: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: colors.Transparent,
  },
  sessionTabsWrapper: {
    alignSelf: 'flex-start',
    backgroundColor: colors.Transparent,
    gap: spacing['Spacing-xl'],
  },
  sessionTabButton: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingVertical: spacing['Spacing-xl'],
    borderRadius: radius['xs'],
    borderWidth: 1,
    borderColor: colors.BorderPrimaryDisabled,
  },
  sessionTabText: {
    ...typography.bodySmall2SemiBold,
    color: colors.TextPrimaryDefault,
  },
  inputsRow: {
    flexDirection: 'row',
    gap: spacing['Spacing-3xl'],
  },
  inputWrapper: {
    flex: 1,
    gap: spacing['Spacing-xl'],
  },
  inputLabel: {
    ...typography.b2Bold,
    color: colors.TextPrimaryStrong,
  },
  inputContainer: {
    marginTop: 0,
  },
  textInput: {
    ...typography.b2Regular,
    color: colors.TextPrimaryStrong,
  },
});
