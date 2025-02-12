import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderScreen from '../Screens/Customer/OrderScreen';
import OrderDetails from '../Screens/Customer/SendAPackage/OrderDetails';
import OrderCompletedScreen from '../Screens/Customer/SendAPackage/OrderCompletedScreen';
import ReportAnIssue from '../Screens/Customer/SendAPackage/ReportAnIssue';

const Stack = createNativeStackNavigator();

export const OrderStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OrdersMain" component={OrderScreen} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
      <Stack.Screen name="OrderCompleted" component={OrderCompletedScreen} />
      <Stack.Screen name="ReportAnIssue" component={ReportAnIssue} />
    </Stack.Navigator>
  );
};
