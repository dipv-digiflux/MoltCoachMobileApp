import React, { type ReactElement, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useForm, useWatch } from 'react-hook-form';

import { Button, LiquidFooter, PageHeaderScrollView } from '@/components';
import { useAppSelector } from '@/store/hooks';
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

export const AddClientScreen = (): ReactElement => {
  const translation = useAppSelector(state => state.translation);
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
      setValue('healthEnabled', true);
    }
  }, [clientType, setValue]);

  const onSubmit = (data: AddClientFormValues): void => {
    console.log('Add Client Data:', data);
    // TODO: Implement API call to save client
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
            void handleSubmit(onSubmit)();
          }}
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
