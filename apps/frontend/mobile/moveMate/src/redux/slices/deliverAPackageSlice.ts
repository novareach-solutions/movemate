import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../../api/apiClient';
import apiEndpoints from '../../api/apiEndPoints';
import axios from 'axios';
import { replaceOrderId, SimpleToast } from '../../utils/helpers';

interface DeliverPkgState {
  id: number | null;
  pickupLocation: pickupLocation |null;
  dropLocation: pickupLocation |null;
}

// Initial state
const initialState: DeliverPkgState = {
  id: null,
  pickupLocation:null,
  dropLocation:null
};

interface orderPayload {
    senderName: string;
    senderPhoneNumber: string;
    receiverName: string;
    receiverPhoneNumber: string;
    packageType: string;
    deliveryInstructions: string;
    pickupLocation: {
        addressLine1: string;
        addressLine2: string;
        landmark: string;
        latitude: number;
        longitude: number;
      };
      dropLocation: {
        addressLine1: string;
        latitude: number;
        longitude: number;
      };
    estimatedDistance: number;
    estimatedTime: number;
}

interface pickupLocation {
  latitude:number,
  longitude:number,
  name:string,
  address:string
}

// create order
export const createOrder = createAsyncThunk(
    apiEndpoints.createOrder,
    async (payload: orderPayload) => {
      try {
        const response = await apiClient.post(apiEndpoints.createOrder, payload);
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

// cancel order
export const cancelOrder = createAsyncThunk(
    apiEndpoints.cancelOrder,
    async ({reason,orderId}:{reason:string,orderId:string|number}) => {
      try {
        const endpoint = replaceOrderId(apiEndpoints.cancelOrder, orderId);
        const response = await apiClient.post(endpoint, {reason});
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
// assign order
export const assignOrder = createAsyncThunk(
    apiEndpoints.assignRider,
    async ({pickupLatitude,pickupLongitude,orderId}:{pickupLatitude:number,pickupLongitude:number,orderId:string|number}) => {
      try {
        const endpoint = replaceOrderId(apiEndpoints.assignRider, orderId);
        const response = await apiClient.post(endpoint, {pickupLatitude,pickupLongitude});
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

  //Report agent
export const reportAgent = createAsyncThunk(
    apiEndpoints.reportAgent,
    async ({reason,details,orderId}:{reason:string,details:string,orderId:string|number}) => {
      try {
        const endpoint = replaceOrderId(apiEndpoints.reportAgent, orderId);
        const response = await apiClient.post(endpoint, {reason,details});
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

// Leave Review
export const leaveAReviewApi = createAsyncThunk(
  apiEndpoints.leaveAReview,
  async ({rating,comment,orderId}:{rating:number,comment:string,orderId:string|number}) => {
    try {
      const endpoint = replaceOrderId(apiEndpoints.leaveAReview, orderId);
      const response = await apiClient.post(endpoint, {rating,comment});
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

// getOrder details
export const getOrederDetails = createAsyncThunk(
  apiEndpoints.getOrderDetails,
  async ({orderId}:{orderId:string|number}) => {
    try {
      const endpoint = replaceOrderId(apiEndpoints.getOrderDetails, orderId);
      const response = await apiClient.get(endpoint);
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

const deliverAPackage = createSlice({
  name: 'deliverAPackage',
  initialState,
  reducers: {
    updatePkgId:(state,action)=>{
      state.id = action.payload;
    },
    updatePickupLoaction:(state,action)=>{
      state.pickupLocation = action.payload;
    },
    updateDropLoaction:(state,action)=>{
      state.dropLocation = action.payload;
    }
    
  }
});

// Export the reducer
export const { updatePkgId,updatePickupLoaction,updateDropLoaction } = deliverAPackage.actions;
export default deliverAPackage.reducer;