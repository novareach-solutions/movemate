import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface commonState {
  locationStatus: boolean | false;
}

// Initial state
const initialState: commonState = {
  locationStatus: false,
};

const commonReducer = createSlice({
  name: "commonStore",
  initialState,
  reducers: {
    updateLocationState: (state, action) => {
      state.locationStatus = action.payload;
    },
  },
});

// Export the reducer
export const { updateLocationState } = commonReducer.actions;
export default commonReducer.reducer;
