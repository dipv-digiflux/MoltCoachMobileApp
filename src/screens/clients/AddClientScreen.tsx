import React, { type ReactElement, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useForm, useWatch } from 'react-hook-form';

import { Button, LiquidFooter, PageHeaderScrollView } from '@/components';
import { useAppSelector } from '@/store/hooks';
import { useAppDispatch } from '@/store/hooks';
import { inviteClientThunk, sendInviteSmsThunk } from '@/store/thunks';
import { spacing } from '@/theme';
import { AppStackNavigationProp } from '@/types/navigation.types';
import { AddClientContainer } from '@screens/clients/components/AddClientContainer';
import { AddClientDivider } from '@screens/clients/components/AddClientDivider';
import { ImportFromContactsCard } from '@screens/clients/components/ImportFromContactsCard';

import { AddClientSchema } from './utils/addClientSchema';
import {
  type AddClientFormValues,
  defaultAddClientValues,
} from './utils/addClientSchema.types';

import type { AddClientPayload } from '@/types/api.types';

export const AddClientScreen = (): ReactElement => {
  const translation = useAppSelector(state => state.translation);
  const clientState = useAppSelector(state => state.client);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<AppStackNavigationProp>();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddClientFormValues>({
    resolver: zodResolver(AddClientSchema),
    defaultValues: defaultAddClientValues,
  });

  const clientType = useWatch({
    control,
    name: 'clientType',
  });

  useEffect(() => {
    if (clientType === 'addClientFilterExistingClient') {
      setValue('sessionsEnabled', true);
    }
  }, [clientType, setValue]);

  const onSubmit = async (data: AddClientFormValues): Promise<void> => {
    const type =
      data.clientType === 'addClientFilterPotentialLead' ? 'Lead' : 'Client';

    const payload: AddClientPayload = {
      status: 'Invite Send',
      type,
      name: data.name || '',
      phone_number: data.phone,
      country_code: '+971', // Default country code
      mode: data.sessionsEnabled
        ? data.sessions.type === 'addSessionsPackageOnline'
          ? 'Online'
          : 'Physical'
        : undefined,
      number_of_month:
        data.sessionsEnabled &&
        data.sessions.type === 'addSessionsPackageOnline' &&
        data.sessions.total
          ? Number(data.sessions.total)
          : undefined,
      start_date: data.sessionsEnabled ? data.sessions.startDate : undefined,
      total_sessions:
        data.sessionsEnabled &&
        data.sessions.type === 'addSessionsPackagePhysical' &&
        data.sessions.total
          ? Number(data.sessions.total)
          : undefined,
      sessions_left:
        data.sessionsEnabled && data.sessions.left
          ? Number(data.sessions.left)
          : undefined,
      sex: data.healthEnabled
        ? data.health.sex === 'sexMale'
          ? 'Male'
          : data.health.sex === 'sexFemale'
          ? 'Female'
          : 'Other'
        : undefined,
      birth_date:
        data.healthEnabled && data.health.dob
          ? data.health.dob.split('-').reverse().join('/')
          : undefined,
      height:
        data.healthEnabled && data.health.height
          ? Number(data.health.height)
          : undefined,
      height_unit: data.healthEnabled ? 'cm' : undefined,
      weight:
        data.healthEnabled && data.health.weight
          ? Number(data.health.weight)
          : undefined,
      weight_unit: data.healthEnabled ? 'kg' : undefined,
      daily_activity: data.healthEnabled ? data.health.activity : undefined,
      primary_goal: data.healthEnabled ? data.health.goal : undefined,
      chronic_condition: data.healthEnabled
        ? data.health.conditions
        : undefined,
    };

    const filteredPayload = Object.fromEntries(
      Object.entries(payload).filter(([_, v]) => v !== '' && v !== undefined),
    ) as AddClientPayload;

    console.log('Sending Add Client Payload:', filteredPayload);

    try {
      const response = await dispatch(inviteClientThunk(filteredPayload));
      if (response && response.status) {
        const inviteResponseData = response.data;

        // Check if we have a suggested plan (either in nutrition_draft or nutrients)
        const firstItem = inviteResponseData?.[0];
        const hasNutrients =
          !!firstItem?.invite?.nutrition_draft ||
          !!firstItem?.onboarding?.nutrients;

        if (!hasNutrients && data.phone) {
          // Trigger SMS immediately as requested for null nutrients case
          void dispatch(
            sendInviteSmsThunk({
              phone_numbers: [data.phone],
              country_code: '+971',
            }),
          );
        }

        navigation.navigate('GeneratingPlan', {
          clientName: data.name || '',
          inviteData: response.data,
          phoneNumber: data.phone,
          countryCode: '971', // As requested for SMS payload
          skipSuggestedPlan: !hasNutrients,
        });
      }
    } catch (error) {
      console.error('Failed to add client:', error);
    }
  };

  return (
    <>
      <PageHeaderScrollView
        header={{ title: translation.addClientHeaderTitle }}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <ImportFromContactsCard
            title={translation.addClientImportFromContactsTitle}
            subtitle={translation.addClientImportFromContactsSubtitle}
            onPress={() => navigation.navigate('ImportContacts')}
          />

          <AddClientDivider label={translation.addClientDividerLabel} />

          <AddClientContainer control={control} errors={errors} />
        </View>
      </PageHeaderScrollView>
      <LiquidFooter showTopBorder>
        <Button
          label={translation.addClientButtonLabel}
          onPress={() => {
            void handleSubmit(onSubmit, err => {
              console.log('Add Client Validation Errors:', err);
            })();
          }}
          loading={clientState.operations.inviteClient.status === 'loading'}
          variant="primary"
          size="large"
          fullWidth={true}
        />
      </LiquidFooter>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-5xl'],
    paddingBottom: spacing['Spacing-16xl'],
    gap: spacing['Spacing-5xl'],
  },
});
