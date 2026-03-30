import React, { type ReactElement, useCallback } from 'react';
import { PermissionsAndroid, Platform, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { PageHeaderScrollView } from '@/components';
import { ImportContactsButtonGroup } from '@/screens/onboarding/components/ImportContactsButtonGroup';
import { ImportContactsContent } from '@/screens/onboarding/components/ImportContactsContent';
import { useAppSelector } from '@/store/hooks';
import { colors } from '@/theme';
import { AppStackNavigationProp } from '@/types/navigation.types';

export const ImportContactsScreen = (): ReactElement => {
  const translation = useAppSelector(state => state.translation);
  const navigation = useNavigation<AppStackNavigationProp>();

  const handleAllowAccess = useCallback(async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title:
              translation.importContactsPermissionTitle ||
              'Contacts Permission',
            message:
              translation.importContactsPermissionMessage ||
              'This app would like to view your contacts.',
            buttonPositive:
              translation.importContactsPermissionPositive || 'Accept',
          },
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          // Handle denial if needed, but usually we just navigate or show a message
          console.log('Contacts permission denied');
          return;
        }
      }
      // On iOS, permissions are handled by the library when calling getAll()
      // Navigating to selection screen where useContacts will be called
      navigation.navigate('SelectContact');
    } catch (err) {
      console.error('Error requesting contacts permission:', err);
    }
  }, [navigation, translation]);

  const handleNotNow = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <PageHeaderScrollView
        header={{ title: translation.importContactsHeaderTitle }}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <ImportContactsContent />
      </PageHeaderScrollView>
      <ImportContactsButtonGroup
        onAllowAccess={() => {
          void handleAllowAccess();
        }}
        onNotNow={handleNotNow}
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
    flexGrow: 1,
  },
});
