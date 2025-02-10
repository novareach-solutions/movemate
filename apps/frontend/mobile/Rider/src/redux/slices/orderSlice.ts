// src/redux/slices/orderSlice.ts

import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import apiClient from '../../api/apiClient';
import apiEndPoints from '../../api/apiEndPoints';

// Import or define the SendPackageOrder type
import {SendPackageOrder} from './types/sendAPackage';
import {OrderStatusEnum} from './types/enums';

// Define the structure of the response from the backend
interface FetchOngoingOrderResponse {
  success: boolean;
  message: string;
  data: SendPackageOrder | null;
}

// Define the structure for order data used in modals
export interface OrderData {
  orderId: string;
  earnings: string;
  tip: string;
  time: string;
  distance: string;
  pickupAddress: string;
  dropoffAddress: string;
}

// Define the initial state structure
interface OrderState {
  isModalVisible: boolean;
  selectedOrder: OrderData | null;
  ongoingOrder: SendPackageOrder | null;
  loadingOngoingOrder: boolean;
  errorOngoingOrder: string | null;
  updatingItemVerifiedPhoto: boolean;
  errorUpdatingItemVerifiedPhoto: string | null;
  startingOrder: boolean;
  errorStartingOrder: string | null;
  acceptingOrder: boolean;
  errorAcceptingOrder: string | null;

  // **New State Properties**
  updatingOrderStatus: boolean;
  errorUpdatingOrderStatus: string | null;
  isDeliveryModalVisible: boolean;
  deliveryDetails: {
    dropoffAddress: string;
    // Add more fields as needed
  } | null;
}

interface UpdateOrderStatusArgs {
  orderId: number;
  status: OrderStatusEnum;
}

const initialState: OrderState = {
  isModalVisible: false,
  selectedOrder: null,
  ongoingOrder: null,
  loadingOngoingOrder: false,
  errorOngoingOrder: null,
  updatingItemVerifiedPhoto: false,
  errorUpdatingItemVerifiedPhoto: null,
  startingOrder: false,
  errorStartingOrder: null,
  updatingOrderStatus: false,
  errorUpdatingOrderStatus: null,
  isDeliveryModalVisible: false,
  deliveryDetails: null,
  acceptingOrder: false,
  errorAcceptingOrder: null,
};

// Async thunk to fetch the ongoing order
export const fetchOngoingOrder = createAsyncThunk<
  SendPackageOrder | null, // Return type
  void, // Argument type
  {rejectValue: string} // Rejected value type
>('order/fetchOngoingOrder', async (_, {rejectWithValue}) => {
  try {
    const response = await apiClient.get<FetchOngoingOrderResponse>(
      apiEndPoints.getOngoingOrder,
    );

    console.log('FETCHONGOINGORDER', response);

    if (response.data.success) {
      return response.data.data; // This could be SendPackageOrder or null
    } else {
      // Handle the case where the API call was successful but no ongoing order exists
      return null;
    }
  } catch (error: any) {
    let errorMessage = 'Failed to fetch ongoing order.';
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    Alert.alert('Error', errorMessage);
    return rejectWithValue(errorMessage);
  }
});

export const acceptOrder = createAsyncThunk<
  SendPackageOrder, // Return type
  {orderId: string}, // Argument type
  {rejectValue: string} // Rejected value type
>('order/acceptOrder', async ({orderId}, {rejectWithValue}) => {
  try {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
      data: SendPackageOrder;
    }>(apiEndPoints.acceptOrder(orderId));

    if (response.data.success) {
      return response.data.data;
    } else {
      Alert.alert('Error', response.data.message || 'Failed to accept order.');
      return rejectWithValue(
        response.data.message || 'Failed to accept order.',
      );
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || 'Failed to accept order.';
    Alert.alert('Error', errorMessage);
    return rejectWithValue(errorMessage);
  }
});

// Async thunk to update the itemVerifiedPhoto
export const updateItemVerifiedPhoto = createAsyncThunk<
  SendPackageOrder, // Return type
  {orderId: number; url: string}, // Argument type
  {rejectValue: string} // Rejected value type
>(
  'order/updateItemVerifiedPhoto',
  async ({orderId, url}, {rejectWithValue}) => {
    try {
      const response = await apiClient.patch<{
        success: boolean;
        message: string;
        data: SendPackageOrder;
      }>(
        apiEndPoints.verifyItemsPhoto(orderId),
        {url: url},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data.success) {
        return response.data.data;
      } else {
        // Handle the case where the API call was successful but the update failed
        Alert.alert(
          'Error',
          response.data.message || 'Failed to update photo.',
        );
        return rejectWithValue(
          response.data.message || 'Failed to update photo.',
        );
      }
    } catch (error: any) {
      let errorMessage = 'Failed to update item verified photo.';
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }
      Alert.alert('Error', errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

// New async thunk to start the order
export const startOrder = createAsyncThunk<
  SendPackageOrder, // Return type
  {orderId: number}, // Argument type
  {rejectValue: string} // Rejected value type
>('order/startOrder', async ({orderId}, {rejectWithValue}) => {
  try {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
      data: SendPackageOrder;
    }>(apiEndPoints.startOrder(orderId));

    if (response.data.success) {
      return response.data.data;
    } else {
      Alert.alert('Error', response.data.message || 'Failed to start order.');
      return rejectWithValue(response.data.message || 'Failed to start order.');
    }
  } catch (error: any) {
    let errorMessage = 'Failed to start order.';
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    Alert.alert('Error', errorMessage);
    return rejectWithValue(errorMessage);
  }
});

export const uploadProofOfDelivery = createAsyncThunk<
  SendPackageOrder, // Return type
  {orderId: number; url: string}, // Argument type
  {rejectValue: string} // Rejected value type
>('order/uploadProofOfDelivery', async ({orderId, url}, {rejectWithValue}) => {
  try {
    const response = await apiClient.patch<{
      success: boolean;
      message: string;
      data: SendPackageOrder;
    }>(
      apiEndPoints.proofOfDelivery(orderId),
      {url},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.data.success) {
      return response.data.data;
    } else {
      Alert.alert(
        'Error',
        response.data.message || 'Failed to upload proof of delivery.',
      );
      return rejectWithValue(
        response.data.message || 'Failed to upload proof of delivery.',
      );
    }
  } catch (error: any) {
    let errorMessage = 'Failed to upload proof of delivery.';
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    Alert.alert('Error', errorMessage);
    return rejectWithValue(errorMessage);
  }
});

export const updateOrderStatus = createAsyncThunk<
  SendPackageOrder, // Return type
  UpdateOrderStatusArgs, // Argument type
  {rejectValue: string} // Rejected value type
>('order/updateOrderStatus', async ({orderId, status}, {rejectWithValue}) => {
  try {
    const response = await apiClient.patch<{
      success: boolean;
      message: string;
      data: SendPackageOrder;
    }>(
      apiEndPoints.updateOrderStatus(orderId),
      {status},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.data.success) {
      return response.data.data;
    } else {
      Alert.alert(
        'Error',
        response.data.message || 'Failed to update order status.',
      );
      return rejectWithValue(
        response.data.message || 'Failed to update order status.',
      );
    }
  } catch (error: any) {
    let errorMessage = 'Failed to update order status.';
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    Alert.alert('Error', errorMessage);
    return rejectWithValue(errorMessage);
  }
});

export const completeOrder = createAsyncThunk<
  SendPackageOrder, // Return type
  {orderId: number}, // Args type
  {rejectValue: string} // Rejected type
>('order/completeOrder', async ({orderId}, {rejectWithValue}) => {
  try {
    // Make the POST request
    const response = await apiClient.post<{
      success: boolean;
      message: string;
      data: SendPackageOrder;
    }>(apiEndPoints.completeOrder(orderId));

    if (response.data.success) {
      return response.data.data; // The updated SendPackageOrder
    } else {
      Alert.alert(
        'Error',
        response.data.message || 'Failed to complete order.',
      );
      return rejectWithValue(
        response.data.message || 'Failed to complete order.',
      );
    }
  } catch (error: any) {
    let errorMessage = 'Failed to complete order.';
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    Alert.alert('Error', errorMessage);
    return rejectWithValue(errorMessage);
  }
});

// Create the order slice
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // Action to show the order modal with selected order data
    showOrderModal: (state, action: PayloadAction<OrderData>) => {
      state.isModalVisible = true;
      state.selectedOrder = action.payload;
    },
    // Action to hide the order modal and clear selected order data
    hideOrderModal: state => {
      state.isModalVisible = false;
      state.selectedOrder = null;
    },
  },
  extraReducers: builder => {
    // Handle fetchOngoingOrder thunk actions
    builder
      .addCase(fetchOngoingOrder.pending, state => {
        state.loadingOngoingOrder = true;
        state.errorOngoingOrder = null;
      })
      .addCase(
        fetchOngoingOrder.fulfilled,
        (state, action: PayloadAction<SendPackageOrder | null>) => {
          state.loadingOngoingOrder = false;
          state.ongoingOrder = action.payload;
        },
      )
      .addCase(fetchOngoingOrder.rejected, (state, action) => {
        state.loadingOngoingOrder = false;
        state.errorOngoingOrder =
          action.payload || 'Failed to fetch ongoing order.';
      })
      // Handle updateItemVerifiedPhoto thunk actions
      .addCase(updateItemVerifiedPhoto.pending, state => {
        state.updatingItemVerifiedPhoto = true;
        state.errorUpdatingItemVerifiedPhoto = null;
      })
      .addCase(
        updateItemVerifiedPhoto.fulfilled,
        (state, action: PayloadAction<SendPackageOrder>) => {
          state.updatingItemVerifiedPhoto = false;
          state.ongoingOrder = action.payload;
        },
      )
      .addCase(updateItemVerifiedPhoto.rejected, (state, action) => {
        state.updatingItemVerifiedPhoto = false;
        state.errorUpdatingItemVerifiedPhoto =
          action.payload || 'Failed to update item verified photo.';
      })
      // Handle startOrder thunk actions
      .addCase(startOrder.pending, state => {
        state.startingOrder = true;
        state.errorStartingOrder = null;
      })
      .addCase(
        startOrder.fulfilled,
        (state, action: PayloadAction<SendPackageOrder>) => {
          state.startingOrder = false;
          state.ongoingOrder = action.payload;
        },
      )
      .addCase(startOrder.rejected, (state, action) => {
        state.startingOrder = false;
        state.errorStartingOrder = action.payload || 'Failed to start order.';
      })
      // Handle updateOrderStatus thunk actions
      .addCase(updateOrderStatus.pending, state => {
        state.updatingOrderStatus = true;
        state.errorUpdatingOrderStatus = null;
      })
      .addCase(
        updateOrderStatus.fulfilled,
        (state, action: PayloadAction<SendPackageOrder>) => {
          state.updatingOrderStatus = false;
          state.ongoingOrder = action.payload;

          // Check if the new status is PICKEDUP_ORDER to trigger DeliveryModal
          if (action.payload.status === OrderStatusEnum.PICKEDUP_ORDER) {
            state.isDeliveryModalVisible = true;
            state.deliveryDetails = {
              dropoffAddress:
                action.payload.dropLocation?.addressLine1 || 'N/A',
              // Add more dropoff details as needed
            };
          }
        },
      )
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.updatingOrderStatus = false;
        state.errorUpdatingOrderStatus =
          action.payload || 'Failed to update order status.';
      })
      .addCase(uploadProofOfDelivery.pending, state => {
        state.updatingOrderStatus = true;
        state.errorUpdatingOrderStatus = null;
      })
      .addCase(
        uploadProofOfDelivery.fulfilled,
        (state, action: PayloadAction<SendPackageOrder>) => {
          state.updatingOrderStatus = false;
          state.ongoingOrder = action.payload;
        },
      )
      .addCase(uploadProofOfDelivery.rejected, (state, action) => {
        state.updatingOrderStatus = false;
        state.errorUpdatingOrderStatus =
          action.payload || 'Failed to upload proof of delivery.';
      })
      .addCase(completeOrder.pending, state => {
        // optional: set a loading flag or something
        state.updatingOrderStatus = true;
        state.errorUpdatingOrderStatus = null;
      })
      .addCase(
        completeOrder.fulfilled,
        (state, action: PayloadAction<SendPackageOrder>) => {
          state.updatingOrderStatus = false;
          state.ongoingOrder = action.payload;
          // The UI can now navigate to DeliverAPackage.EarningsDetails
        },
      )
      .addCase(completeOrder.rejected, (state, action) => {
        state.updatingOrderStatus = false;
        state.errorUpdatingOrderStatus =
          action.payload || 'Failed to complete order.';
      })
      .addCase(acceptOrder.pending, state => {
        state.acceptingOrder = true;
        state.errorAcceptingOrder = null;
      })
      .addCase(
        acceptOrder.fulfilled,
        (state, action: PayloadAction<SendPackageOrder>) => {
          state.acceptingOrder = false;
          state.ongoingOrder = action.payload;
        },
      )
      .addCase(acceptOrder.rejected, (state, action) => {
        state.acceptingOrder = false;
        state.errorAcceptingOrder = action.payload || 'Failed to accept order.';
      });
  },
});

// Export the actions generated by createSlice
export const {showOrderModal, hideOrderModal} = orderSlice.actions;

// Export the reducer to be included in the store
export default orderSlice.reducer;
