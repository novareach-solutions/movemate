import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/Home/HomeScreen';
import SAPDetailsScreen from '../Screens/Home/SendAPackage/DetailsScreen';
import EnterLocationDetailsScreen from '../Screens/Home/SendAPackage/EnterLocationDetailsScreen';
import CheckoutScreen from '../Screens/Home/SendAPackage/CheckOutScreen';
import PaymentSelectionScreen from '../Screens/Home/SendAPackage/PaymentSelectionScreen';
import AddCardScreen from '../Screens/Home/SendAPackage/AddCardScreen';
import PaymentSuccessScreen from '../Screens/Home/SendAPackage/PaymentSuccessScreen';
import DeliveryScreen from '../Screens/Home/SendAPackage/DeliveryScreen';
import CancelOrderScreen from '../Screens/Home/SendAPackage/CancelOrderScreen';
import CancelSuccessScreen from '../Screens/Home/SendAPackage/CancelSuccessScreen';
import { CustomerScreens, HomeScreens } from './ScreenNames';
import ChatScreen from '../Screens/Home/ChatScreen';
import OrderCompletedScreen from '../Screens/Home/SendAPackage/OrderCompletedScreen';
import OrderAcceptScreen from '../Screens/Home/SendAPackage/OrderAcceptScreen';
import OrderDetails from '../Screens/Home/SendAPackage/OrderDetails';

const Stack = createNativeStackNavigator();

export const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={HomeScreens.HomeScreen} component={HomeScreen} />
      <Stack.Screen name={HomeScreens.SAPDetailsScreen} component={SAPDetailsScreen} />
      <Stack.Screen name={HomeScreens.EnterLocationDetailsScreen} component={EnterLocationDetailsScreen} />
      <Stack.Screen name={HomeScreens.CheckoutScreen} component={CheckoutScreen} />
      <Stack.Screen name={HomeScreens.OrderCompletedScreen} component={OrderCompletedScreen} />
      <Stack.Screen name={HomeScreens.AcceptOrder} component={OrderAcceptScreen} />
      <Stack.Screen name={HomeScreens.OrderDetails} component={OrderDetails} />
      <Stack.Screen name={HomeScreens.PaymentSelectionScreen} component={PaymentSelectionScreen} />
      <Stack.Screen name={HomeScreens.AddCardScreen} component={AddCardScreen} />
      <Stack.Screen name={HomeScreens.PaymentSuccessScreen} component={PaymentSuccessScreen} />
      <Stack.Screen name={HomeScreens.DeliveryScreen} component={DeliveryScreen} />
      <Stack.Screen name={HomeScreens.CancelOrderScreen} component={CancelOrderScreen} />
      <Stack.Screen name={HomeScreens.CancelSuccessScreen} component={CancelSuccessScreen} />
      <Stack.Screen
          name={HomeScreens.ChatScreen}
          component={ChatScreen}
          options={{ headerShown: false }}
        />
    </Stack.Navigator>
  );
};
