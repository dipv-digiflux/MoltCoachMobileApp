import React, { type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components';
import { LiquidFooter } from '@/components/LiquidFooter';
import { PageHeaderScrollView } from '@/components/PageHeaderScrollView';
import { SelectedContactCard } from '@/screens/clients/components/SelectedContactCard/SelectedContactCard';
import { SelectedContactsHeader } from '@/screens/clients/components/SelectedContactsHeader';
import { addedClientsSchema } from '@/screens/clients/utils/addedClientsSchema';
import { type AddedClientsFormValues } from '@/screens/clients/utils/addedClientsSchema.types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  inviteBulkClientsThunk,
  sendInviteSmsThunk,
} from '@/store/thunks/clientThunks';
import { colors, spacing } from '@/theme';
import { AppStackNavigationProp } from '@/types/navigation.types';

import { AddedClientsRouteProp } from './AddedClients.types';

import type {
  InviteBulkClientsPayload,
  InviteSmsPayload,
  ClientItem,
} from '@/types/api.types';

export const AddedClientsScreen = (): ReactElement => {
  const insets = useSafeAreaInsets();
  const route = useRoute<AddedClientsRouteProp>();
  const navigation = useNavigation<AppStackNavigationProp>();
  const dispatch = useAppDispatch();
  const operations = useAppSelector(state => state.client.operations);
  const loading = Object.values(operations).some(op => op.status === 'loading');
  const selectedContacts = route.params?.selectedContacts || [];

  const methods = useForm<AddedClientsFormValues>({
    resolver: zodResolver(addedClientsSchema),
    defaultValues: {
      contacts: selectedContacts.map(c => ({
        recordID: c.recordID,
        name: c.displayName || '',
        phoneNumber: c.phoneNumbers[0]?.number || '',
        thumbnailPath: c.thumbnailPath,
        relationship: 'Client',
        addSessions: false,
        sessionType: 'Online',
        months: '',
        startDate: '',
        totalSessions: '',
        sessionsLeft: '',
      })),
    },
    // Validate on Invite button click; then revalidate while editing
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const { control, handleSubmit } = methods;

  const { fields } = useFieldArray({
    control,
    name: 'contacts',
  });

  const onSubmit = async (data: AddedClientsFormValues): Promise<void> => {
    try {
      // Map form values to bulk invite payload
      const clientItems: ClientItem[] = data.contacts.map(c => {
        const isClient = c.relationship === 'Client';
        const isOnline = c.sessionType === 'Online';
        const showSessions = isClient || c.addSessions;

        const item: ClientItem = {
          type: c.relationship,
          phone_number: c.phoneNumber.replace(/\D/g, ''),
          country_code: '+971',
          name: c.name,
          mode: '',
          total_sessions: '',
          sessions_left: '',
          number_of_month: '',
          start_date: '',
          status: 'Invite Send',
        };

        if (showSessions) {
          item.mode = c.sessionType;
          if (isOnline) {
            if (c.months) item.number_of_month = String(c.months);
            if (c.startDate) {
              // Ensure YYYY-MM-DD
              item.start_date = c.startDate.split('T')[0];
            }
          } else {
            // Physical
            if (c.relationship !== 'Lead') {
              if (c.totalSessions)
                item.total_sessions = Number(c.totalSessions);
              if (c.sessionsLeft) item.sessions_left = Number(c.sessionsLeft);
            }
          }
        }

        // Filter out empty strings/values
        return Object.fromEntries(
          Object.entries(item).filter(
            ([_, v]) => v !== '' && v !== null && v !== undefined,
          ),
        ) as ClientItem;
      });

      const payload: InviteBulkClientsPayload = {
        items: clientItems,
      };

      const result = await dispatch(inviteBulkClientsThunk(payload));

      if (result.status) {
        // Prepare SMS payload
        const phoneNumbers = clientItems.map(c => c.phone_number);
        const smsPayload: InviteSmsPayload = {
          phone_numbers: phoneNumbers,
          country_code: '+971',
        };

        const smsResult = await dispatch(sendInviteSmsThunk(smsPayload));
        if (smsResult.status) {
          navigation.navigate('InviteSent');
        }
      }
    } catch (error) {
      console.error('Failed to send invites:', error);
    }
  };

  const onError = (): void => {
    // Errors are rendered inline inside each card
  };

  return (
    <View style={styles.container}>
      <FormProvider {...methods}>
        <PageHeaderScrollView
          header={{ title: 'Added clients' }}
          contentContainerStyle={[
            styles.contentContainerStyle,
            { paddingBottom: insets.bottom + spacing['Spacing-16xl'] },
          ]}
        >
          <SelectedContactsHeader />

          <View style={styles.cardsContainer}>
            {fields.map((field, index) => {
              return (
                <SelectedContactCard
                  key={field.id}
                  avatarSource={
                    field.thumbnailPath
                      ? { uri: field.thumbnailPath }
                      : undefined
                  }
                  name={field.name}
                  phoneNumber={field.phoneNumber}
                  index={index}
                />
              );
            })}
          </View>
        </PageHeaderScrollView>
      </FormProvider>
      <LiquidFooter showTopBorder>
        <Button
          label={`Invite ${fields.length} clients`}
          variant="primary"
          size="large"
          fullWidth
          onPress={() => {
            void handleSubmit(onSubmit, onError)();
          }}
          disabled={fields.length === 0 || loading}
          loading={
            operations.inviteBulkClients.status === 'loading' ||
            operations.sendInviteSms.status === 'loading'
          }
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
  cardsContainer: {
    paddingHorizontal: spacing['Spacing-5xl'],
  },
});
