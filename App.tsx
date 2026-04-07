import React, { type ReactElement } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { firebase } from '@react-native-firebase/app';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';

import { configureGoogleSignIn } from '@/services/authService';
import {
  parseNotificationPayload,
  setupPushNotificationListeners,
} from '@/services/pushNotificationService';
import { store } from '@/store/store';
import { getCoachBookingsThunk } from '@/store/thunks/bookingThunks';
import { rootNavigationRef } from '@navigation/navigationRef';
import { handleNotificationOpen } from '@navigation/notificationNavigation';
import { RootNavigator } from '@navigation/RootNavigator';

// Configure Google Sign-In at app startup
configureGoogleSignIn();

// Listeners only: handle notification opened / foreground. Permission + token requested after login.
setupPushNotificationListeners({
  onNotificationOpened: message => {
    const payload = parseNotificationPayload(message);
    if (__DEV__) console.log('Notification opened:', payload);
    handleNotificationOpen(rootNavigationRef, payload);
  },
});

const App = (): ReactElement => {
  const isDarkMode = useColorScheme() === 'dark';
  console.log('🔥 Firebase Project ID:', firebase.app().options.projectId);
  console.log('🔥 Firebase App ID:', firebase.app().options.appId);

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'dark-content' : 'dark-content'} />
        <AppContent />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const AppContent = (): ReactElement => {
  React.useEffect(() => {
    const token = store.getState().auth.token;
    console.log('token', token);

    if (token) {
      void store.dispatch(getCoachBookingsThunk());
    }
  }, []);

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <NavigationContainer
          ref={rootNavigationRef}
          onStateChange={() => {
            const token = store.getState().auth.token;
            if (token) {
              void store.dispatch(getCoachBookingsThunk());
            }
          }}
        >
          <RootNavigator />
        </NavigationContainer>
        <Toast />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
