// src/redux/slices/authSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../../api/apiClient';
import apiEndPoints from '../../api/apiEndPoints';
import axios from 'axios';
import { saveToken } from '../../utils/manageToken';
import { SimpleToast } from '../../utils/helpers';
import { Alert } from 'react-native'; // Import Alert

const dummyImageApi = 'https://api.escuelajs.co/api/v1/files/upload';

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  signupData: AgentSignupPayload | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  signupData: null,
};

interface AgentSignupPayload {
  user: {
    role: string;
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    suburb: string;
    state: string;
    postalCode: number;
  };
  agentType: string;
  abnNumber: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: number;
  profilePhoto: string;
}

interface AgentDoc {
  name: string;
  description: string;
  url: string;
}

// Request OTP
export const requestOtp = createAsyncThunk(
  'auth/requestOtp',
  async ({ phone }: { phone: string }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(apiEndPoints.requestOtp, {
        phoneNumber: phone,
      });
      SimpleToast(response.data.message);
      return response.data;
    } catch (error: any) {
      console.log(error);
      let errorMessage = 'An unexpected error occurred. Please try again.';
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('API Error:', error.response.data);
          errorMessage = error.response.data?.message || 'Request failed';
        } else if (error.request) {
          console.error('No response received:', error.request);
          errorMessage = 'No response from server. Please try again later.';
        }
      } else {
        console.error('Unexpected Error:', error);
      }
      Alert.alert('Request OTP Error', errorMessage); // Display an alert for the error
      return rejectWithValue(errorMessage);
    }
  },
);

// Upload Media
export const uploadMedia = createAsyncThunk(
  'auth/uploadMedia',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const headers = {
        'Content-Type': 'multipart/form-data',
      };
      const response = await axios.post(apiEndPoints.uploadMedia, formData, {
        headers,
      });

      return response.data; // Assuming response contains the public URL
    } catch (error: any) {
      let errorMessage = 'Something went wrong.';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || 'Upload failed.';
      } else {
        errorMessage = 'An unexpected error occurred.';
      }
      Alert.alert('Upload Media Error', errorMessage); // Display an alert for the error
      return rejectWithValue(errorMessage);
    }
  },
);

// Verify OTP
export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ phone, otp }: { phone: string; otp: string }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(apiEndPoints.verifyOtp, {
        phoneNumber: phone,
        otp,
      });
      // Store onboarding token if present in the response headers
      const onboardingToken = response.headers['onboarding_token'];
      if (onboardingToken) {
        await saveToken('onboardingToken', onboardingToken);
        console.log('Onboarding Token Stored:', onboardingToken);
      }

      return response.data;
    } catch (error: any) {
      let errorMessage = 'An unexpected error occurred.';
      if (axios.isAxiosError(error)) {
        console.error('API Error:', error.response?.data || error.message);
        errorMessage =
          error.response?.data?.message || 'OTP verification failed';
      } else {
        console.error('Unexpected Error:', error);
      }
      Alert.alert('Verify OTP Error', errorMessage); // Display an alert for the error
      return rejectWithValue(errorMessage);
    }
  },
);

// Login
export const login = createAsyncThunk(
  'auth/login',
  async ({ phone, otp }: { phone: string; otp: string }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(
        apiEndPoints.login,
        { phoneNumber: phone, otp },
        {
          headers: {
            role: 'AGENT',
          },
        },
      );

      // Assuming the response contains tokens
      const { accessToken, agentId, userId } = response.data.data;
      if (accessToken) {
        console.log(
          'saving access token',
          response.data.data.agentId,
          response.data.data.userId,
        );
        await saveToken('accessToken', accessToken);
        await saveToken('userId', userId.toString());
        await saveToken('agentId', agentId.toString());
      }
      SimpleToast('Login successful!');
      return response.data;
    } catch (error: any) {
      let errorMessage = 'An unexpected error occurred. Please try again.';
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('API Error:', error.response.data);
          errorMessage = error.response.data?.message || 'Login failed';
        } else if (error.request) {
          console.error('No response received:', error.request);
          errorMessage = 'No response from server. Please try again later.';
        }
      } else {
        console.error('Unexpected Error:', error);
      }
      Alert.alert('Login Error', errorMessage); // Display an alert for the error
      return rejectWithValue(errorMessage);
    }
  },
);

// Agent Signup
export const agentSignup = createAsyncThunk(
  'auth/agentSignup',
  async (payload: AgentSignupPayload, { rejectWithValue }) => {
    console.log('🚀 Initiating Agent Signup...');
    console.log('📤 Request Payload:', JSON.stringify(payload, null, 2)); // Log the request body

    try {
      const response = await apiClient.post(apiEndPoints.agentSignup, payload);

      console.log('✅ API Response:', JSON.stringify(response.data, null, 2)); // Log the entire response

      // Correctly access the accessToken in the nested response
      const accessToken = response.data?.data?.accessToken;
      const agentId = response.data?.data?.agent.id.toString();
      const userId = response.data?.data?.agent.userId.toString();

      if (accessToken) {
        console.log('🔑 Access Token Received:', accessToken);
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('userId', userId);
        await AsyncStorage.setItem('agentId', agentId);
      } else {
        console.error('❌ No Access Token Found in Response');
        throw new Error('AccessToken is missing in the server response');
      }

      SimpleToast(response.data.message);
      console.log('🎉 Signup Successful:', response.data.message);
      return response.data;
    } catch (error: any) {
      let errorMessage = 'An unexpected error occurred. Please try again.';
      if (axios.isAxiosError(error)) {
        console.error('🛑 API Error Details:', {
          message: error.message,
          responseData: error.response?.data,
          requestConfig: error.config,
        });
        errorMessage = error.response?.data?.message || 'Signup failed';
      } else {
        console.error('🛑 Unexpected Error:', error);
      }
      Alert.alert('Signup Error', errorMessage); // Display an alert for the error
      return rejectWithValue(errorMessage);
    }
  },
);

// Upload Agent Document
export const uploadAgentDoc = createAsyncThunk(
  'auth/uploadAgentDoc',
  async (payload: AgentDoc, { rejectWithValue }) => {
    console.log('payload', payload);
    try {
      const response = await apiClient.post(apiEndPoints.agentDoc, payload);
      return response.data;
    } catch (error: any) {
      let errorMessage = 'An unexpected error occurred.';
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message || 'Agent document upload failed.';
      }
      console.error('Unexpected Error:', error);
      Alert.alert('Upload Agent Document Error', errorMessage); // Display an alert for the error
      return rejectWithValue(errorMessage);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      AsyncStorage.clear();
      state.isAuthenticated = false;
      Alert.alert('Logged Out', 'You have been successfully logged out.');
    },
    setSignupData: (
      state,
      action: PayloadAction<Partial<AgentSignupPayload>>,
    ) => {
      if (state.signupData) {
        state.signupData = { ...state.signupData, ...action.payload };
      } else {
        state.signupData = action.payload as AgentSignupPayload;
      }
    },
  },
  extraReducers: builder => {
    // Handle agentSignup
    builder
      .addCase(agentSignup.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(agentSignup.fulfilled, state => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(agentSignup.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        Alert.alert('Signup Error', action.payload || 'An error occurred.');
      });

    // Handle requestOtp
    builder
      .addCase(requestOtp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestOtp.fulfilled, state => {
        state.loading = false;
      })
      .addCase(requestOtp.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        Alert.alert(
          'Request OTP Error',
          action.payload || 'An error occurred.',
        );
      });

    // Handle verifyOtp
    builder
      .addCase(verifyOtp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, state => {
        state.loading = false;
      })
      .addCase(verifyOtp.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        Alert.alert('Verify OTP Error', action.payload || 'An error occurred.');
      });

    // Handle login
    builder
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, state => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        Alert.alert('Login Error', action.payload || 'An error occurred.');
      });

    // Handle uploadMedia
    builder
      .addCase(uploadMedia.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadMedia.fulfilled, state => {
        state.loading = false;
      })
      .addCase(uploadMedia.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        Alert.alert(
          'Upload Media Error',
          action.payload || 'An error occurred.',
        );
      });

    // Handle uploadAgentDoc
    builder
      .addCase(uploadAgentDoc.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadAgentDoc.fulfilled, state => {
        state.loading = false;
      })
      .addCase(uploadAgentDoc.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        Alert.alert(
          'Upload Agent Document Error',
          action.payload || 'An error occurred.',
        );
      });
  },
});

// Export the actions and reducer
export const { logout, setSignupData } = authSlice.actions;
export default authSlice.reducer;
