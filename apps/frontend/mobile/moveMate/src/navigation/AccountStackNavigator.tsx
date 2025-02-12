import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/Customer/HomeScreen';
import SAPDetailsScreen from '../Screens/Customer/SendAPackage/DetailsScreen';
import EnterLocationDetailsScreen from '../Screens/Customer/SendAPackage/EnterLocationDetailsScreen';
import CheckoutScreen from '../Screens/Customer/SendAPackage/CheckOutScreen';
import PaymentSelectionScreen from '../Screens/Customer/SendAPackage/PaymentSelectionScreen';
import AddCardScreen from '../Screens/Customer/SendAPackage/AddCardScreen';
import PaymentSuccessScreen from '../Screens/Customer/SendAPackage/PaymentSuccessScreen';
import DeliveryScreen from '../Screens/Customer/SendAPackage/DeliveryScreen';
import CancelOrderScreen from '../Screens/Customer/SendAPackage/CancelOrderScreen';
import CancelSuccessScreen from '../Screens/Customer/SendAPackage/CancelSuccessScreen';

const Stack = createNativeStackNavigator();

export const AccountStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="SAPDetails" component={SAPDetailsScreen} />
      <Stack.Screen name="EnterLocationDetails" component={EnterLocationDetailsScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="PaymentSelection" component={PaymentSelectionScreen} />
      <Stack.Screen name="AddCard" component={AddCardScreen} />
      <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
      <Stack.Screen name="Delivery" component={DeliveryScreen} />
      <Stack.Screen name="CancelOrder" component={CancelOrderScreen} />
      <Stack.Screen name="CancelSuccess" component={CancelSuccessScreen} />
    </Stack.Navigator>
  );
};
