import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { setBackgroundMessageHandler } from './src/services/pushNotificationService';

// Must be set at top-level before app is registered (required for background/quit FCM handling)
setBackgroundMessageHandler(async _message => {
  // Optional: handle data-only messages when app is in background or quit.
  // Keep work minimal; do not run long tasks or navigate here.
});

AppRegistry.registerComponent(appName, () => App);
