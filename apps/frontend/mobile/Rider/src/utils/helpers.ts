import Toast from 'react-native-simple-toast';

// SimpleToast
export function SimpleToast(message: string, toastTimer = false) {
  Toast.show(message, toastTimer ? Toast.LONG : Toast.SHORT);
}
