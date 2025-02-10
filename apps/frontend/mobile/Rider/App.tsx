import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';
import GlobalOrderModal from './src/components/Modals/Order/GlobalOrderModal';
import io from 'socket.io-client';
import {showOrderModal} from './src/redux/slices/orderSlice';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => (
  <Provider store={store}>
    <SafeAreaProvider>
      <AppNavigator>
        <GlobalOrderModal />
      </AppNavigator>
    </SafeAreaProvider>
  </Provider>
);

export default App;
