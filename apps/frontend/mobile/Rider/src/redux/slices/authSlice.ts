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

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  signupData: null,
};

// Payload structure for signup
interface AgentSignupPayload {
  user: {
    role: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
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

interface agentDoc {
  name:string;
  description:string;
  url:string;
}

// otp request
export const requestOtp = createAsyncThunk(
  apiEndpoints.requestOtp,
  async ({ phone }: { phone: string }) => {
    try {
      const response = await apiClient.post(apiEndpoints.requestOtp, { phoneNumber: phone });
      SimpleToast(response.data.message);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios error: Handle cases with and without a response
        if (error.response) {
          // The server responded with a status code outside the range of 2xx
          console.error('API Error:', error.response.data);
          throw new Error(error.response.data?.message || 'Request failed');
        } else if (error.request) {
          // The request was made, but no response was received
          console.error('No response received:', error.request);
          throw new Error('No response from server. Please try again later.');
        }
      }

      // Non-Axios error (unexpected issues)
      console.error('Unexpected Error:', error);
      throw new Error('An unexpected error occurred. Please try again.');
    }
  }
);

// uploadMedia
export const uploadMedia = createAsyncThunk(
  dummyImageApi,
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

// verify otp    
export const verifyOtp = createAsyncThunk(
  apiEndpoints.veryfyOtp,
  async ({ phone,otp }: { phone: string;otp: string }) => {
    try {
      const response = await apiClient.post(apiEndpoints.veryfyOtp, { phoneNumber:phone,otp });
       // Store onboarding token if present in the response headers
       const onboardingToken = response.headers['onboarding_token'];
       if (onboardingToken) {
         await saveToken('onboardingToken', onboardingToken);
         console.log('Onboarding Token Stored:', onboardingToken);
       }
 
       return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios error: Has response, request, and other properties
        console.error('API Error:', error.response?.data || error.message);
        throw error;
      } else {
        // Non-Axios error: Handle accordingly
        console.error('Unexpected Error:', error);
        throw new Error('An unexpected error occurred');
      }
    }
  }
);

// agent signup
export const agentSignup = createAsyncThunk(
  apiEndpoints.agentSignup,
  async (payload: AgentSignupPayload) => {
    console.log('payload', payload)
    try {
      const response = await apiClient.post(apiEndpoints.agentSignup, payload);
      await AsyncStorage.setItem('accessToken', response.data.accessToken);
      // await AsyncStorage.setItem('refreshToken', response.data.
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios error: Has response, request, and other properties
        console.error('API Error:', error.response?.data || error.message);
        throw error;
      } else {
        // Non-Axios error: Handle accordingly
        console.error('Unexpected Error:', error);
        throw new Error('An unexpected error occurred');
      }
    }
  }
);

export const uploadAgentDoc = createAsyncThunk(
  apiEndpoints.agentDoc,
  async (payload: agentDoc) => {
    console.log('payload', payload)
    try {
      const response = await apiClient.post(apiEndpoints.agentDoc, payload);
      return response.data;
    } catch (error) {
        console.error('Unexpected Error:', error);
        throw new Error('An unexpected error occurred');
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
         // Merge with existing data
        state.signupData = { ...state.signupData, ...action.payload };
      } else {
         // Initialize if null
        state.signupData = action.payload as AgentSignupPayload;
      }
    },
    
  },
  extraReducers: (builder) => {
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
  },
});

// Export the reducer
export const { logout,setSignupData } = authSlice.actions;
export default authSlice.reducer;
