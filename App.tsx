import React, { type ReactElement } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { firebase } from '@react-native-firebase/app';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootNavigator } from '@navigation/RootNavigator';

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
    <View style={styles.container}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
