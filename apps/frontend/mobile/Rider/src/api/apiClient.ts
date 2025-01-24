import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiEndpoints from './apiEndPoints';
import { generateCurlCommand } from '../utils/generateCurl';
import { Alert } from 'react-native'; // Import Alert from React Native

const apiClient = axios.create({
  baseURL: apiEndpoints.baseURL,
  timeout: 30000,
});

// Request Interceptor
apiClient.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const onboardingToken = await AsyncStorage.getItem('onboardingToken');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (onboardingToken) {
      config.headers['onboarding_token'] = onboardingToken;
    }
    config.headers['Content-Type'] = 'text/plain';

    const curlCommand = generateCurlCommand(config);
    console.log('cURL Command:', curlCommand);
    console.log('Request Headers:', config.headers);
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log('Response Headers:', response.headers);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors and refresh tokens
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const { data } = await axios.post(apiEndpoints.refreshToken, {
            refreshToken,
          });
          await AsyncStorage.setItem('accessToken', data.accessToken);
          console.log('New Access Token:', data.accessToken);
          apiClient.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
          return apiClient(originalRequest);
        } catch (err) {
          console.error('Token Refresh Error:', err);
          await AsyncStorage.clear();
          Alert.alert('Session Expired', 'Please log in again.');
          // Redirect to login screen
          return Promise.reject(err);
        }
      } else {
        await AsyncStorage.clear();
        Alert.alert('Session Expired', 'Please log in again.');
        // Redirect to login screen
        return Promise.reject(error);
      }
    }

    // Handle 403 Forbidden errors
    if (error.response.status === 403) {
      await AsyncStorage.clear();
      Alert.alert('Access Denied', 'You are not authorized to access this resource.');
      console.warn('Access forbidden: Logging out');
      return Promise.reject(error);
    }

    // General error handling
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
    console.error('Response Error:', error);
    Alert.alert('Error', errorMessage); // Show alert with error message
    return Promise.reject(error);
  },
);

export default apiClient;
