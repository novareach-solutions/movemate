// src/redux/slices/orderSlice.ts

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface OrderData {
  orderId: string;
  earnings: string;
  tip: string;
  time: string;
  distance: string;
  pickupAddress: string;
  dropoffAddress: string;
}

interface OrderState {
  isModalVisible: boolean;
  selectedOrder: OrderData | null;
}

const initialState: OrderState = {
  isModalVisible: false,
  selectedOrder: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    showOrderModal: (state, action: PayloadAction<OrderData>) => {
      state.isModalVisible = true;
      state.selectedOrder = action.payload;
    },
    hideOrderModal: state => {
      state.isModalVisible = false;
      state.selectedOrder = null;
    },
  },
});

export const {showOrderModal, hideOrderModal} = orderSlice.actions;

export default orderSlice.reducer;
