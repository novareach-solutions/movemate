import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiEndpoints from './apiEndPoints';
import { generateCurlCommand } from '../utils/generateCurl';

const apiClient = axios.create({
  baseURL: apiEndpoints.baseURL,
  timeout: 30000,
});

// Request Interceptor
apiClient.interceptors.request.use(
  async (config) => {
    // Retrieve tokens from AsyncStorage
    const accessToken = await AsyncStorage.getItem('accessToken');
    const onboardingToken = await AsyncStorage.getItem('onboardingToken');

    // Add Authorization header if accessToken exists
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Add Onboarding-Token header if onboardingToken exists
    if (onboardingToken) {
      config.headers['onboarding_token'] = onboardingToken;
    }

    // Generate and log cURL command
    const curlCommand = generateCurlCommand(config);
    console.log('cURL Command:', curlCommand);

    console.log('Request Headers:', config.headers); // Debugging headers
    return config;
  },
  (error) => Promise.reject(error),
);

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Log response headers
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
          // Redirect to login screen
          return Promise.reject(err);
        }
      } else {
        await AsyncStorage.clear();
        // Redirect to login screen
        return Promise.reject(error);
      }
    }

    // Handle 403 Forbidden errors
    if (error.response.status === 403) {
      await AsyncStorage.clear();
      console.warn('Access forbidden: Logging out');
      return Promise.reject(error);
    }

    console.error('Response Error:', error);
    return Promise.reject(error);
  },
);

export default apiClient;
