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
import AddCardScreen from '../Screens/Customer/SendAPackage/AddCardScreen';
import PaymentSelectionScreen from '../Screens/Customer/SendAPackage/PaymentSelectionScreen';
import CheckoutScreen from '../Screens/Customer/SendAPackage/CheckOutScreen';
import EnterLocationDetailsScreen from '../Screens/Customer/SendAPackage/EnterLocationDetailsScreen';
import SAPDetailsScreen from '../Screens/Customer/SendAPackage/DetailsScreen';
import OrderScreen from '../Screens/Customer/OrderScreen';
import NotificationScreen from '../Screens/Customer/NotificationScreen';
import CustomerAccountScreen from '../Screens/Customer/AccountSceen';
import CustomerHomeScreen from '../Screens/Customer/HomeScreen';
import PaymentSuccessScreen from '../Screens/Customer/SendAPackage/PaymentSuccessScreen';
import DeliveryScreen from '../Screens/Customer/SendAPackage/DeliveryScreen';
import CancelOrderScreen from '../Screens/Customer/SendAPackage/CancelOrderScreen';
import CancelSuccessScreen from '../Screens/Customer/SendAPackage/CancelSuccessScreen';
import ProfileScreen from '../Screens/Profile/ProfileScreen';
import SavedAddressesScreen from '../Screens/Profile/SavedAddressScreen';
import LegalAboutScreen from '../Screens/Profile/LegalAndAbout';
import FeedbackScreen from '../Screens/Profile/FeedbackScreen';
import ReferFriendsScreen from '../Screens/Profile/ReferFriendScreen';
import InboxScreen from '../Screens/Profile/InboxScreen';
import OrderDetails from '../Screens/Customer/SendAPackage/OrderDetails';
import OrderCompletedScreen from '../Screens/Customer/SendAPackage/OrderCompletedScreen';
import ReportAnIssue from '../Screens/Customer/SendAPackage/ReportAnIssue';
import HelpSupportScreen from '../Screens/Customer/HelpSupportScreen';
import OrderAcceptScreen from '../Screens/Customer/SendAPackage/OrderAcceptScreen';
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
