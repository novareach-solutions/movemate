import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";
import apiEndpoints from "../../api/apiEndPoints";
import { SimpleToast } from "../../utils/helpers";

// Types
interface PaymentState {
  loading: boolean;
  error: string | null;
  paymentSuccess: boolean;
  paymentHistory: Payment[];
  currentPayment: {
    clientSecret: string | null;
    paymentIntentId: string | null;
    amount: number | null;
    currency: string | null;
    status: string | null;
  };
}

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  failureReason?: string;
}

interface CreatePaymentIntentRequest {
  amount: number;
  currency: string;
  description?: string;
}

interface RefundRequest {
  amount?: number;
  reason?: string;
}

// Initial state
const initialState: PaymentState = {
  loading: false,
  error: null,
  paymentSuccess: false,
  paymentHistory: [],
  currentPayment: {
    clientSecret: null,
    paymentIntentId: null,
    amount: null,
    currency: null,
    status: null,
  },
};

// Thunks
export const createPaymentIntent = createAsyncThunk(
  "payment/createIntent",
  async (data: CreatePaymentIntentRequest, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(
        apiEndpoints.createPaymentIntent,
        data,
      );
      return response.data.data;
    } catch (error: any) {
      SimpleToast(
        error.response?.data?.message || "Payment intent creation failed",
      );
      return rejectWithValue(
        error.response?.data?.message || "Payment intent creation failed",
      );
    }
  },
);

export const getPaymentHistory = createAsyncThunk(
  "payment/history",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/payments/history");
      return response.data.data;
    } catch (error: any) {
      SimpleToast(
        error.response?.data?.message || "Failed to fetch payment history",
      );
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch payment history",
      );
    }
  },
);

export const getPaymentStatus = createAsyncThunk(
  "payment/status",
  async (paymentId: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(
        apiEndpoints.paymentStatus.replace(":paymentId", paymentId),
      );
      return response.data.data;
    } catch (error: any) {
      SimpleToast(
        error.response?.data?.message || "Failed to fetch payment status",
      );
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch payment status",
      );
    }
  },
);

export const requestRefund = createAsyncThunk(
  "payment/refund",
  async (
    { paymentId, data }: { paymentId: string; data: RefundRequest },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiClient.post(
        apiEndpoints.requestRefund.replace(":paymentId", paymentId),
        data,
      );
      SimpleToast(response.data.message);
      return response.data.data;
    } catch (error: any) {
      SimpleToast(error.response?.data?.message || "Refund request failed");
      return rejectWithValue(
        error.response?.data?.message || "Refund request failed",
      );
    }
  },
);

// Slice
const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    resetPaymentState: (state) => {
      state.loading = false;
      state.error = null;
      state.paymentSuccess = false;
      state.currentPayment = {
        clientSecret: null,
        paymentIntentId: null,
        amount: null,
        currency: null,
        status: null,
      };
    },
  },
  extraReducers: (builder) => {
    // Create Payment Intent
    builder
      .addCase(createPaymentIntent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPayment = {
          clientSecret: action.payload.clientSecret,
          paymentIntentId: action.payload.paymentIntentId,
          amount: action.payload.amount,
          currency: action.payload.currency,
          status: action.payload.status,
        };
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get Payment History
    builder
      .addCase(getPaymentHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPaymentHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentHistory = action.payload;
      })
      .addCase(getPaymentHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get Payment Status
    builder
      .addCase(getPaymentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPaymentStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPayment = {
          ...state.currentPayment,
          status: action.payload.status,
        };
      })
      .addCase(getPaymentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Request Refund
    builder
      .addCase(requestRefund.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestRefund.fulfilled, (state) => {
        state.loading = false;
        // You might want to update the payment status or history here
      })
      .addCase(requestRefund.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
