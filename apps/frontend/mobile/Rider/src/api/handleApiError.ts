import {NavigationProp} from '@react-navigation/native';
import {Alert} from 'react-native';
import store from '../redux/store';
import {logout} from '../redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const handleApiError = (
  error: any,
  navigation: NavigationProp<any>,
  customHandlers?: Record<string, () => void>,
): void => {
  if (!error.response) {
    // Network or unexpected errors
    Alert.alert('Error', 'Something went wrong. Please try again.');
    return;
  }

  const {status, data} = error.response;
  const errorName = data?.error?.name;

  if (customHandlers && errorName && customHandlers[errorName]) {
    customHandlers[errorName]();
    return;
  }

  switch (status) {
    case 401: // Unauthorized
      Alert.alert('Session Expired', 'Please log in again.');
      AsyncStorage.clear();
      store.dispatch(logout());
      navigation.navigate('LoginScreen'); // Navigate to login
      break;

    case 403: // Forbidden
      if (errorName === 'AccessDeniedError') {
        Alert.alert('Access Denied', 'You do not have the required access.');
      } else {
        Alert.alert(
          'Access Denied',
          data?.message || "You don't have permission.",
        );
      }
      break;

    default:
      // Handle other errors or generic responses
      const errorMessage = data?.message || 'An unexpected error occurred.';
      Alert.alert('Error', errorMessage);
      break;
  }
};
