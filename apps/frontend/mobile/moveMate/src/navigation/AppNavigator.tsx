import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthScreens, AppScreens, CustomerScreens, ProfileScreens} from './ScreenNames';
import Onboarding from '../components/Onboarding';
import Login from '../Screens/LoginScreen';
import OtpScreen from '../Screens/OtpScreen';
import CompleteProfileScreen from '../Screens/CompleteProfileScreen';
import PrivacyPolicyScreen from '../Screens/PrivacyPolicyScreen';
import {RootStackParamList} from './type';
import AppLayoutScreen from '../Screens/AppLayoutScreen';
import AddCardScreen from '../Screens/Home/SendAPackage/AddCardScreen';
import PaymentSelectionScreen from '../Screens/Home/SendAPackage/PaymentSelectionScreen';
import CheckoutScreen from '../Screens/Home/SendAPackage/CheckOutScreen';
import EnterLocationDetailsScreen from '../Screens/Home/SendAPackage/EnterLocationDetailsScreen';
import SAPDetailsScreen from '../Screens/Home/SendAPackage/DetailsScreen';
import OrderScreen from '../Screens/Home/OrderScreen';
import NotificationScreen from '../Screens/Home/NotificationScreen';
import CustomerAccountScreen from '../Screens/Home/AccountSceen';
import CustomerHomeScreen from '../Screens/Home/HomeScreen';
import PaymentSuccessScreen from '../Screens/Home/SendAPackage/PaymentSuccessScreen';
import DeliveryScreen from '../Screens/Home/SendAPackage/DeliveryScreen';
import CancelOrderScreen from '../Screens/Home/SendAPackage/CancelOrderScreen';
import CancelSuccessScreen from '../Screens/Home/SendAPackage/CancelSuccessScreen';
import ProfileScreen from '../Screens/Profile/ProfileScreen';
import SavedAddressesScreen from '../Screens/Profile/SavedAddressScreen';
import LegalAboutScreen from '../Screens/Profile/LegalAndAbout';
import FeedbackScreen from '../Screens/Profile/FeedbackScreen';
import ReferFriendsScreen from '../Screens/Profile/ReferFriendScreen';
import InboxScreen from '../Screens/Profile/InboxScreen';
import OrderDetails from '../Screens/Home/SendAPackage/OrderDetails';
import OrderCompletedScreen from '../Screens/Home/SendAPackage/OrderCompletedScreen';
import ReportAnIssue from '../Screens/Home/SendAPackage/ReportAnIssue';
import HelpSupportScreen from '../Screens/Home/HelpSupportScreen';
import OrderAcceptScreen from '../Screens/Home/SendAPackage/OrderAcceptScreen';
import AuthStackNavigator from './AuthStackNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
       <AuthStackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
