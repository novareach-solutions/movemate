import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../../api/apiClient';
import apiEndpoints from '../../api/apiEndPoints';
import axios from 'axios';
import { saveToken } from '../../utils/manageToken';
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

// otp request
export const requestOtp = createAsyncThunk(
  apiEndpoints.requestOtp,
  async ({ phone }: { phone: string }) => {
    try {
      const response = await apiClient.post(apiEndpoints.requestOtp, { phoneNumber:phone });
      console.log('OTPresponse', response)
      // console.log('OTPresponse', response)
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
