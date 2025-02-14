import ProfileScreen from '../Screens/AccountScreen';
import ChatScreen from '../Screens/Home/ChatScreen';
import CancelSuccessScreen from '../Screens/Home/SendAPackage/CancelSuccessScreen';
import DeliveryScreen from '../Screens/Home/SendAPackage/DeliveryScreen';
import PaymentSuccessScreen from '../Screens/Home/SendAPackage/PaymentSuccessScreen';
import {AuthStackParamList, AppStackParamList} from './type';

export const AuthScreens: Record<
  keyof AuthStackParamList,
  keyof AuthStackParamList
> = {
  OnboardingScreen: 'OnboardingScreen',
  LoginScreen: 'LoginScreen',
  OtpScreen: 'OtpScreen',
  Login:'Login',
  CompleteProfileScreen: 'CompleteProfileScreen',
  PrivacyPolicyScreen: 'PrivacyPolicyScreen',
  CustomerScreens:'CustomerScreens'
};

export const AppScreens: Record<
  keyof AppStackParamList,
  keyof AppStackParamList
> = {
  HomeScreen: 'HomeScreen',
  OrderScreen: 'OrderScreen',
  NotificationScreen: 'NotificationScreen',
  AccountScreen: 'AccountScreen',
  AppLayoutScreen: 'AppLayoutScreen',
};

export type AppScreensParamList = {
  HomeScreen: undefined;
  DashboardScreen: undefined;
  DocumentReviewScreen: undefined;
  FAQScreenScreen: undefined;
  CancellationReasonScreen: undefined;
  ChatScreen: undefined;
  ProfileScreen: undefined;
  CustomerScreens:undefined;
  HomeScreens:undefined;
};

export const CustomerScreens = {
  CustomerHomeScreen: 'CustomerHomeScreen',
  OrderScreen: 'OrderScreen',
  NotificationScreen: 'NotificationScreen',
  CustomerAccountScreen: 'CustomerAccountScreen',
  AppLayoutScreen: 'AppLayoutScreen',
  SAPDetailsScreen: 'SAPDetailsScreen',
  EnterLocationDetailsScreen: 'EnterLocationDetailsScreen',
  CheckoutScreen: 'CheckoutScreen',
  PaymentSelectionScreen: 'PaymentSelectionScreen',
  PaymentSuccessScreen:'PaymentSuccessScreen',
  AddCardScreen: 'AddCardScreen',
  DeliveryScreen:'DeliveryScreen',
  CancelOrderScreen:'CancelOrderScreen',
  CancelSuccessScreen:'CancelSuccessScreen',
  OrderDetails:'OrderDetails',
  OrderCompletedScreen:'OrderCompleted',
  ReportAnIssue:'Report an issue ',
  HelpSupportScreen:'HelpSupportScreen',
  AcceptOrder:'accept order',
  ChatScreen:'Chat screen'
}
export const HomeScreens = {
  HomeScreen: 'HomeScreen',
  OrderScreen: 'OrderScreen',
  NotificationScreen: 'NotificationScreen',
  CustomerAccountScreen: 'CustomerAccountScreen',
  AppLayoutScreen: 'AppLayoutScreen',
  SAPDetailsScreen: 'SAPDetailsScreen',
  EnterLocationDetailsScreen: 'EnterLocationDetailsScreen',
  CheckoutScreen: 'CheckoutScreen',
  PaymentSelectionScreen: 'PaymentSelectionScreen',
  PaymentSuccessScreen:'PaymentSuccessScreen',
  AddCardScreen: 'AddCardScreen',
  DeliveryScreen:'DeliveryScreen',
  CancelOrderScreen:'CancelOrderScreen',
  CancelSuccessScreen:'CancelSuccessScreen',
  OrderDetails:'OrderDetails',
  OrderCompletedScreen:'OrderCompleted',
  ReportAnIssue:'Report an issue ',
  HelpSupportScreen:'HelpSupportScreen',
  AcceptOrder:'accept order',
  ChatScreen:'Chat screen'
}

export const ProfileScreens = {
  ProfileScreen:'Profile',
  LegalAboutScreen:'Legal About',
  SavedAddressesScreen:'Saved Addresses',
  FeedbackScreen:'Feedback',
  ReferFriendsScreen:'Refer Friends',
  Inbox:'Inbox'
}