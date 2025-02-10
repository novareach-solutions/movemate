import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import deliverAPackageReducer from './slices/deliverAPackageSlice';
import commonReducer from './slices/commonSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    deliverAPackage: deliverAPackageReducer,
    common:commonReducer
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;