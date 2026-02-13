import React, { type ReactElement } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootNavigator } from '@navigation/RootNavigator';

const App = (): ReactElement => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'dark-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
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
