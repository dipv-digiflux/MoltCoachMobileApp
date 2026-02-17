import Toast from 'react-native-toast-message';

/**
 * Show a success toast notification.
 */
export const showSuccessToast = (message: string): void => {
  Toast.show({
    type: 'success',
    text1: message,
    position: 'bottom',
    bottomOffset: 100,
    avoidKeyboard: true,
  });
};

/**
 * Show an error toast notification.
 * Use for API errors, validation failures, etc.
 */
export const showErrorToast = (message: string): void => {
  Toast.show({
    type: 'error',
    text1: message,
    position: 'bottom',
    bottomOffset: 100,
    avoidKeyboard: true,
  });
};
