// src/api/apiClient.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiEndPoints from './apiEndPoints';
import {Alert} from 'react-native';
import store from '../redux/store';
import {logout} from '../redux/slices/authSlice';
import {navigate} from '../navigation/NavigationService';
import {AuthScreens} from '../navigation/ScreenNames';
import {generateCurlCommand} from '../utils/generateCurl';

export const apiClient = axios.create({
  baseURL: apiEndPoints.baseURL,
  timeout: 30000,
  withCredentials: true,
});

// Define endpoints that do not require authentication
const noAuthEndpoints = [
  apiEndPoints.agentSignup,
  apiEndPoints.requestOtp,
  apiEndPoints.verifyOtp,
  // Add other public endpoints here
];

// Request Interceptor
apiClient.interceptors.request.use(
  async config => {
    const accessToken = await AsyncStorage.getItem('accessToken');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }


    config.headers['Content-Type'] = 'application/json';

    const curlCommand = generateCurlCommand(config);
    console.log('cURL Command:', curlCommand);
    console.log('Request Headers:', config.headers);
    return config;
  },
  error => Promise.reject(error),
);

// Response Interceptor
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Retry flag
      try {
        const {data} = await axios.post(
          apiEndPoints.refreshToken,
          {},
          {withCredentials: true},
        );

        await AsyncStorage.setItem('accessToken', data.accessToken);

        apiClient.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('Token Refresh Error:', refreshError);

        await AsyncStorage.clear();
        store.dispatch(logout());
        Alert.alert('Session Expired', 'Please log in again.', [
          {
            text: 'OK',
            onPress: () => navigate(AuthScreens.Login), // Redirect to login screen
          },
        ]);
        return Promise.reject(refreshError);
      }
    }

    // Handle other types of errors
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred. Please try again.';
    console.log('Error', errorMessage);

    return Promise.reject(error);
  },
);

export default apiClient;
