import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';
import apiEndpoints from '../../api/apiEndPoints';
import axios from 'axios';
import {SimpleToast} from '../../utils/helpers';

interface PaymentState {
  loading: boolean;
  error: string | null;
  paymentSuccess: boolean;
  paymentIntentId: string | null;
  orderDetails: {
    packageType: string;
    deliveryInstructions: string;
    senderInfo: {
      name: string;
      phone: string;
    };
    receiverInfo: {
      name: string;
      phone: string;
    };
  } | null;
}

// Initial state
const initialState: PaymentState = {
  loading: false,
  error: null,
  paymentSuccess: false,
  paymentIntentId: null,
  orderDetails: null,
};

// Payload structure for payment
interface PaymentPayload {
  amount: number;
  paymentMethod: string;
  cardDetails: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
}

interface CreatePaymentIntentPayload {
  amount: number;
  currency: string;
  orderDetails: PaymentState['orderDetails'];
}

interface ConfirmPaymentPayload {
  paymentMethodId: string;
  returnUrl: string;
}

// Process payment
export const processPayment = createAsyncThunk(
  apiEndpoints.processPayment,
  async (payload: PaymentPayload, {rejectWithValue}) => {
    try {
      const response = await apiClient.post(
        apiEndpoints.processPayment,
        payload,
      );
      SimpleToast(response.data.message);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('API Error:', error.response.data);
          return rejectWithValue(
            error.response.data?.message || 'Payment failed',
          );
        } else if (error.request) {
          console.error('No response received:', error.request);
          return rejectWithValue(
            'No response from server. Please try again later.',
          );
        }
      }
      console.error('Unexpected Error:', error);
      return rejectWithValue('An unexpected error occurred. Please try again.');
    }
  },
);

export const createPaymentIntent = createAsyncThunk(
  'payment/createPaymentIntent',
  async (payload: CreatePaymentIntentPayload, {rejectWithValue}) => {
    try {
      const response = await apiClient.post(apiEndpoints.createPaymentIntent, {
        amount: payload.amount,
        currency: payload.currency,
        metadata: {
          orderDetails: JSON.stringify(payload.orderDetails),
        },
      });
      return response.data;
    } catch (error) {
      return handlePaymentError(error, rejectWithValue);
    }
  },
);

export const confirmPayment = createAsyncThunk(
  'payment/confirmPayment',
  async (payload: ConfirmPaymentPayload, {rejectWithValue, getState}) => {
    try {
      const response = await apiClient.post(apiEndpoints.confirmPayment, {
        paymentIntentId: getState().payment.paymentIntentId,
        paymentMethodId: payload.paymentMethodId,
        returnUrl: payload.returnUrl,
      });
      SimpleToast(response.data.message);
      return response.data;
    } catch (error) {
      return handlePaymentError(error, rejectWithValue);
    }
  },
);

const handlePaymentError = (error: any, rejectWithValue: any) => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || 'Payment failed';
    SimpleToast(message);
    return rejectWithValue(message);
  }
  SimpleToast('Payment processing failed');
  return rejectWithValue('An unexpected error occurred');
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    resetPaymentState: state => {
      state.loading = false;
      state.error = null;
      state.paymentSuccess = false;
      state.paymentIntentId = null;
      state.orderDetails = null;
    },
  },
  extraReducers: builder => {
    // Process Payment
    builder
      .addCase(processPayment.pending, state => {
        state.loading = true;
        state.error = null;
        state.paymentSuccess = false;
      })
      .addCase(processPayment.fulfilled, state => {
        state.loading = false;
        state.paymentSuccess = true;
      })
      .addCase(processPayment.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.paymentSuccess = false;
      });

    // Create Payment Intent
    builder
      .addCase(createPaymentIntent.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentIntentId = action.payload.paymentIntentId;
        state.orderDetails = action.payload.orderDetails;
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Confirm Payment
    builder
      .addCase(confirmPayment.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmPayment.fulfilled, state => {
        state.loading = false;
        state.paymentSuccess = true;
      })
      .addCase(confirmPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export the reducer
export const {resetPaymentState} = paymentSlice.actions;
export default paymentSlice.reducer;
