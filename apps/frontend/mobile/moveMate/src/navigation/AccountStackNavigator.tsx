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
import { ProfileScreens } from './ScreenNames';
import ProfileScreen from '../Screens/Profile/ProfileScreen';
import FeedbackScreen from '../Screens/Profile/FeedbackScreen';
import InboxScreen from '../Screens/Profile/InboxScreen';
import LegalAboutScreen from '../Screens/Profile/LegalAndAbout';
import ReferFriendsScreen from '../Screens/Profile/ReferFriendScreen';
import SavedAddressesScreen from '../Screens/Profile/SavedAddressScreen';

const Stack = createNativeStackNavigator();

export const AccountStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ProfileScreens.ProfileScreen} component={ProfileScreen} />
      <Stack.Screen name={ProfileScreens.FeedbackScreen} component={FeedbackScreen} />
      <Stack.Screen name={ProfileScreens.Inbox} component={InboxScreen} />
      <Stack.Screen name={ProfileScreens.LegalAboutScreen} component={LegalAboutScreen} />
      <Stack.Screen name={ProfileScreens.ReferFriendsScreen} component={ReferFriendsScreen} />
      <Stack.Screen name={ProfileScreens.SavedAddressesScreen} component={SavedAddressesScreen} />
      {/* <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
      <Stack.Screen name="Delivery" component={DeliveryScreen} />
      <Stack.Screen name="CancelOrder" component={CancelOrderScreen} />
      <Stack.Screen name="CancelSuccess" component={CancelSuccessScreen} /> */}
    </Stack.Navigator>
  );
};
