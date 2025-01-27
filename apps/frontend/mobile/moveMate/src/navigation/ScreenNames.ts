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
  AddCardScreen: 'AddCardScreen',
}