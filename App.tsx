import React, { type ReactElement } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { firebase } from '@react-native-firebase/app';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';

import { configureGoogleSignIn } from '@/services/authService';
import { store } from '@/store/store';
import { RootNavigator } from '@navigation/RootNavigator';

// Configure Google Sign-In at app startup
configureGoogleSignIn();

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
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <NavigationContainer>
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
