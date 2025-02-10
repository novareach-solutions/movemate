import ProfileScreen from '../Screens/AccountScreen';
import CancelSuccessScreen from '../Screens/Customer/SendAPackage/CancelSuccessScreen';
import DeliveryScreen from '../Screens/Customer/SendAPackage/DeliveryScreen';
import PaymentSuccessScreen from '../Screens/Customer/SendAPackage/PaymentSuccessScreen';
import {AuthStackParamList, AppStackParamList} from './type';

export const AuthScreens: Record<
  keyof AuthStackParamList,
  keyof AuthStackParamList
> = {
  OnboardingScreen: 'OnboardingScreen',
  LoginScreen: 'LoginScreen',
  OtpScreen: 'OtpScreen',
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
  AcceptOrder:'accept order'
}

export const ProfileScreens = {
  ProfileScreen:'Profile',
  LegalAboutScreen:'Legal About',
  SavedAddressesScreen:'Saved Addresses',
  FeedbackScreen:'Feedback',
  ReferFriendsScreen:'Refer Friends',
  Inbox:'Inbox'
}