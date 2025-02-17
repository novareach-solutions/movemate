import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "../../api/apiClient";
import apiEndpoints from "../../api/apiEndPoints";
import axios from "axios";
import { saveToken } from "../../utils/manageToken";
import { SimpleToast } from "../../utils/helpers";

const dummyImageApi = "https://api.escuelajs.co/api/v1/files/upload";

interface AuthState {
  isAuthenticated: boolean;
  isLogin: boolean;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  isLogin: false,
  loading: false,
  error: null,
};

// Payload structure for signup
interface userSignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  suburb: string;
  state: string;
  postalCode: number;
}

interface agentDoc {
  name: string;
  description: string;
  url: string;
}

// otp request
export const requestOtp = createAsyncThunk(
  apiEndpoints.requestOtp,
  async ({ phone }: { phone: string }) => {
    try {
      const response = await apiClient.post(apiEndpoints.requestOtp, {
        phoneNumber: phone,
      });
      SimpleToast(response.data.message);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios error: Handle cases with and without a response
        if (error.response) {
          // The server responded with a status code outside the range of 2xx
          console.error("API Error:", error.response.data);
          throw new Error(error.response.data?.message || "Request failed");
        } else if (error.request) {
          // The request was made, but no response was received
          console.error("No response received:", error.request);
          throw new Error("No response from server. Please try again later.");
        }
      }

      // Non-Axios error (unexpected issues)
      console.error("Unexpected Error:", error);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  },
);

// uploadMedia
export const uploadMedia = createAsyncThunk(
  dummyImageApi,
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      const response = await axios.post(dummyImageApi, formData, {
        headers,
      });

      return response.data; // Assuming response contains the public URL
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  },
);

// verify otp
export const verifyOtp = createAsyncThunk(
  apiEndpoints.veryfyOtp,
  async ({ phone, otp }: { phone: string; otp: string }) => {
    try {
      const response = await apiClient.post(apiEndpoints.veryfyOtp, {
        phoneNumber: phone,
        otp,
      });
      // Store onboarding token if present in the response headers
      const onboardingToken = response.headers["onboarding_token"];
      if (onboardingToken) {
        await saveToken("onboardingToken", onboardingToken);
        console.log("Onboarding Token Stored:", onboardingToken);
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios error: Has response, request, and other properties
        console.error("API Error:", error.response?.data || error.message);
        throw error;
      } else {
        // Non-Axios error: Handle accordingly
        console.error("Unexpected Error:", error);
        throw new Error("An unexpected error occurred");
      }
    }
  },
);
// Login otp
export const Login = createAsyncThunk(
  apiEndpoints.login,
  async ({ phone, otp }: { phone: string; otp: string }) => {
    try {
      const response = await apiClient.post(apiEndpoints.login, {
        phoneNumber: phone,
        otp,
      });
      // Store onboarding token if present in the response headers
      const onboardingToken = response.headers["onboarding_token"];
      const accessToken = response.headers["access_token"];
      if (onboardingToken) {
        await saveToken("onboardingToken", onboardingToken);
        console.log("Onboarding Token Stored:", onboardingToken);
      }
      if (accessToken) {
        await saveToken("accessToken", accessToken);
        console.log("accessToken Stored:", accessToken);
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios error: Has response, request, and other properties
        console.error("API Error:", error.response?.data || error.message);
        throw error;
      } else {
        // Non-Axios error: Handle accordingly
        console.error("Unexpected Error:", error);
        throw new Error("An unexpected error occurred");
      }
    }
  },
);

// user signup
export const userSignup = createAsyncThunk(
  apiEndpoints.userSignup,
  async (payload: userSignupPayload) => {
    console.log("payload", payload);
    try {
      const response = await apiClient.post(apiEndpoints.userSignup, payload);
      await AsyncStorage.setItem("accessToken", response.data.accessToken);
      // await AsyncStorage.setItem('refreshToken', response.data.
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios error: Has response, request, and other properties
        console.error("API Error:", error.response?.data || error.message);
        throw error;
      } else {
        // Non-Axios error: Handle accordingly
        console.error("Unexpected Error:", error);
        throw new Error("An unexpected error occurred");
      }
    }
  },
);

export const uploadAgentDoc = createAsyncThunk(
  apiEndpoints.agentDoc,
  async (payload: agentDoc) => {
    console.log("payload", payload);
    try {
      const response = await apiClient.post(apiEndpoints.agentDoc, payload);
      return response.data;
    } catch (error) {
      console.error("Unexpected Error:", error);
      throw new Error("An unexpected error occurred");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      AsyncStorage.clear();
      state.isAuthenticated = false;
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userSignup.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(userSignup.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the reducer
export const { logout, setIsLogin } = authSlice.actions;
export default authSlice.reducer;
