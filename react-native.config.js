/**
 * React Native CLI configuration.
 * Used by react-native-asset to link font files from assets/fonts to native projects.
 */
module.exports = {
  project: {
    ios: {},
    android: {
      packageName: 'com.molt.coach',
    },
  },
  assets: ['./assets/fonts'],
};
