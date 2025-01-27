// import Toast from 'react-native-simple-toast';
// import { Platform, Linking } from 'react-native';
// import { check, request, openSettings, PERMISSIONS, RESULTS } from 'react-native-permissions';
// import Geolocation, { GeolocationResponse, GeolocationError } from '@react-native-community/geolocation';
// type PermissionStatus = 'denied' | 'granted' | 'blocked';
// // SimpleToast
// export function SimpleToast(message: string, toastTimer = false) {
//   Toast.show(message, toastTimer ? Toast.LONG : Toast.SHORT);
// }


// export const checkLocation = async (): Promise<boolean> => {
//   let LOCATION: string;
//   if (Platform.OS === 'android') {
//     LOCATION = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
//   } else {
//     LOCATION = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
//   }

//   try {
//     const status: PermissionStatus = await check(LOCATION);
//     console.log('------location check--------', status);

//     if (status === RESULTS.DENIED) {
//       return false; // Permission denied
//     } else if (status === RESULTS.GRANTED) {
//       return true; // Permission granted
//     } else if (status === RESULTS.BLOCKED) {
//       return false; // Permission blocked
//     }
//     return false; // Default case
//   } catch (error) {
//     console.error('Error checking location permission:', error);
//     return false;
//   }
// };

// export const requestLocation = async (): Promise<boolean> => {
//   let LOCATION: string;
//   if (Platform.OS === 'android') {
//     LOCATION = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
//   } else {
//     LOCATION = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
//   }

//   try {
//     const status: PermissionStatus = await request(LOCATION);

//     if (status === RESULTS.DENIED) {
//       return false; // Permission denied
//     } else if (status === RESULTS.GRANTED) {
//       return true; // Permission granted
//     } else if (status === RESULTS.BLOCKED) {
//       // Permission blocked, guide user to settings
//       if (Platform.OS === 'android') {
//         openSettings();
//       } else if (Platform.OS === 'ios') {
//         Linking.openSettings();
//       }
//       return false; // Permission blocked
//     }
//     return false; // Default case
//   } catch (error) {
//     console.error('Error requesting location permission:', error);
//     return false;
//   }
// };

// export const getCurrentLocation = (callback: (response: GeolocationResponse) => void): void => {
//   Geolocation.getCurrentPosition(
//     (response: GeolocationResponse) => {
//       if (callback) {
//         callback(response);
//       }
//     },
//     (error: GeolocationError) => {
//       console.error('--error in current location---', error);
//     },
//     {
//       enableHighAccuracy: true,
//       timeout: 15000,
//       maximumAge: 10000,
//       accuracy: { ios: 'bestForNavigation' },
//     },
//   );
// };
