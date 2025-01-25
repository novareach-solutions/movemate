// authSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../../api/apiClient';
import apiEndpoints from '../../api/apiEndPoints';
import axios from 'axios';
import { saveToken } from '../../utils/manageToken';
import { SimpleToast } from '../../utils/helpers';

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
  async ({ phone }: { phone: string }) => {
    try {
      const response = await apiClient.post(apiEndpoints.requestOtp, { phoneNumber: phone });
      SimpleToast(response.data.message);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('API Error:', error.response.data);
          throw new Error(error.response.data?.message || 'Request failed');
        } else if (error.request) {
          console.error('No response received:', error.request);
          throw new Error('No response from server. Please try again later.');
        }
      }
      console.error('Unexpected Error:', error);
      throw new Error('An unexpected error occurred. Please try again.');
    }
  }
);

// Upload Media
export const uploadMedia = createAsyncThunk(
  'auth/uploadMedia',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const headers = {
        'Content-Type': 'multipart/form-data',
      };
      const response = await axios.post(dummyImageApi, formData, {
        headers,
      });

      return response.data; // Assuming response contains the public URL
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

// Verify OTP
export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ phone, otp }: { phone: string; otp: string }) => {
    try {
      const response = await apiClient.post(apiEndpoints.veryfyOtp, { phoneNumber: phone, otp });
      // Store onboarding token if present in the response headers
      const onboardingToken = response.headers['onboarding_token'];
      if (onboardingToken) {
        await saveToken('onboardingToken', onboardingToken);
        console.log('Onboarding Token Stored:', onboardingToken);
      }

      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error('API Error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'OTP verification failed');
      } else {
        console.error('Unexpected Error:', error);
        throw new Error('An unexpected error occurred');
      }
    }
  }
);

// Login
export const login = createAsyncThunk(
  'auth/login',
  async (
    { phone, otp }: { phone: string; otp: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.post(
        apiEndpoints.login,
        { phoneNumber: phone, otp },
        {
          headers: {
            role: 'AGENT',
          },
        }
      );
      // Assuming the response contains tokens
      const { accessToken, refreshToken } = response.data;
      if (accessToken && refreshToken) {
        await saveToken('accessToken', accessToken);
        await saveToken('refreshToken', refreshToken);
      }
      SimpleToast('Login successful!');
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('API Error:', error.response.data);
          return rejectWithValue(error.response.data?.message || 'Login failed');
        } else if (error.request) {
          console.error('No response received:', error.request);
          return rejectWithValue('No response from server. Please try again later.');
        }
      }
      console.error('Unexpected Error:', error);
      return rejectWithValue('An unexpected error occurred. Please try again.');
    }
  }
);

// Agent Signup
export const agentSignup = createAsyncThunk(
  'auth/agentSignup',
  async (payload: AgentSignupPayload, { rejectWithValue }) => {
    console.log('payload', payload);
    try {
      const response = await apiClient.post(apiEndpoints.agentSignup, payload);
      await AsyncStorage.setItem('accessToken', response.data.accessToken);
      SimpleToast(response.data.message);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error('API Error:', error.response?.data || error.message);
        return rejectWithValue(error.response?.data?.message || 'Signup failed');
      } else {
        console.error('Unexpected Error:', error);
        return rejectWithValue('An unexpected error occurred. Please try again.');
      }
    }
  }
);

// Upload Agent Document
export const uploadAgentDoc = createAsyncThunk(
  'auth/uploadAgentDoc',
  async (payload: AgentDoc, { rejectWithValue }) => {
    console.log('payload', payload);
    try {
      const response = await apiClient.post(apiEndpoints.agentDoc, payload);
      return response.data;
    } catch (error: any) {
      console.error('Unexpected Error:', error);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      AsyncStorage.clear();
      state.isAuthenticated = false;
    },
    setSignupData: (state, action: PayloadAction<Partial<AgentSignupPayload>>) => {
      if (state.signupData) {
        state.signupData = { ...state.signupData, ...action.payload };
      } else {
        state.signupData = action.payload as AgentSignupPayload;
      }
    },
  },
  extraReducers: (builder) => {
    // Handle agentSignup
    builder
      .addCase(agentSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(agentSignup.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(agentSignup.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle requestOtp
    builder
      .addCase(requestOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(requestOtp.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle verifyOtp
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyOtp.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the actions and reducer
export const { logout, setSignupData } = authSlice.actions;
export default authSlice.reducer;
