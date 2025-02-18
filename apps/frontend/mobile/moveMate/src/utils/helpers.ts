import Toast from 'react-native-simple-toast';
import Geolocation, { GeoPosition, GeoError } from 'react-native-geolocation-service';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import {Linking, Platform} from 'react-native';
import EventSource from 'react-native-event-source';

export const isAndroid = Platform.OS === 'android';
let IS_TOKEN_EXPIRED = false;
let IS_NETWORK_ERROR = false;
// SimpleToast
export function SimpleToast(message:string, toastTimer = false) {
    Toast.show(message, toastTimer ? Toast.LONG : Toast.SHORT);
  }

export const replaceOrderId = (endpoint: string, orderId: string | number) =>
    endpoint.replace(':orderId', orderId.toString());


//location permission
export const checkLocation = async () => {
  let LOCATION;
  if (isAndroid) {
    LOCATION = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
  } else {
    LOCATION = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
  }
  const status = await check(LOCATION);
  console.log('------location check--------', status);
  if (status === RESULTS.DENIED) {
    //request for permission
    return false;
  } else if (status === RESULTS.GRANTED) {
    //do nothing
    return true;
  } else if (status === RESULTS.BLOCKED) {
    return false;
  }
};

export const requestLocation = async () => {
  let LOCATION;
  if (isAndroid) {
    LOCATION = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
  } else {
    LOCATION = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
  }
  try {
    console.log('LOCATION', LOCATION)
    const status = await request(LOCATION);
    console.log('status', status)
    if (status === RESULTS.DENIED) {
      //request for permission
      return false;
    } else if (status === RESULTS.GRANTED) {
      //do nothing
      return true;
    } else if (status === RESULTS.BLOCKED) {
      // Permission blocked, guide user to settings
      if (Platform.OS === 'android') {
        openSettings();
      } else if (Platform.OS === 'ios') {
        Linking.openSettings();
      }
      //deny and dont ask again
      //do nothing
      return false;
    }
    return true;
  } catch (err) {
    console.log('------location request-----------', err);
  }
};

export const getCurrentLocation = (callback?: (response: GeoPosition) => void): void => {
  Geolocation.getCurrentPosition(
    (response: GeoPosition) => {
      if (callback) {
        callback(response);
      }
    },
    (error: GeoError) => {
      console.log('--error in current location---', error);
    },
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
      accuracy: { ios: 'bestForNavigation' },
    },
  );
};

export const connectToNotifications = (userId: number) => {
  const eventSource = new EventSource(`https://your-server.com/api/notifications/events/${userId}`);

  eventSource.onopen = () => {
    console.log('SSE connection established');
  };

  eventSource.onerror = (error) => {
    console.error('SSE connection error:', error);
    eventSource.close();
  };

  return eventSource;
};

  