export type AuthScreensParamList = {
  OnboardingScreen: undefined;
  LoginScreen: undefined;
  OtpScreen: {
    phoneNumber: string;
  };
  SelectServiceScreen: undefined;
};

export const AuthScreens = {
  Onboarding: 'OnboardingScreen',
  Login: 'LoginScreen',
  Otp: 'OtpScreen',
  SelectService: 'SelectServiceScreen',
} as const;

export type AppScreensParamList = {
  HomeScreen: undefined;
  DashboardScreen: undefined;
  DocumentReviewScreen: undefined;
  FAQScreenScreen: undefined;
  CancellationReasonScreen: undefined;
  ChatScreen: undefined;
  ProfileScreen: undefined;
  ComingSoonScreen: undefined;
};

export const AppScreens = {
  Home: 'HomeScreen',
  Dashboard: 'DashboardScreen',
  DocumentReview: 'DocumentReviewScreen',
  FAQScreen: 'FAQScreenScreen',
  CancellationReason: 'CancellationReasonScreen',
  Chat: 'ChatScreen',
  Profile: 'ProfileScreen',
  ComingSoon: 'ComingSoonScreen',
} as const;

export type DeliverAPackageParamList = {
  CompleteProfileScreen: undefined;
  UploadDocumentDetails: undefined;
  UploadDocumentsScreen: undefined;
  DashboardScreen: undefined;
  EnterVehicleDetailsScreen: undefined;
  EnterABNScreen: undefined;
  AddProfilePhotoScreen: undefined;
  HomeScreen: undefined;
};

export const DeliverAPackage = {
  CompleteProfile: 'CompleteProfileScreen',
  UploadDocumentDetails: 'UploadDocumentDetails',
  UploadDocuments: 'UploadDocumentsScreen',
  Dashboard: 'DashboardScreen',
  EnterVehicleDetails: 'EnterVehicleDetailsScreen',
  EnterABN: 'EnterABNScreen',
  AddProfilePhoto: 'AddProfilePhotoScreen',
  Home: 'HomeScreen',
} as const;

export type BuyFromStoreParamList = {
  ItemsReviewScreen: undefined;
};

export const BuyFromStore = {
  ItemsReviewScreen: 'ItemsReviewScreen',
} as const;

export type ProfileScreensParamList = {
  InboxScreen: undefined;
  EarningsScreen: undefined;
  WalletScreen: undefined;
  EarningModeScreen: undefined;
  ReferFriendsScreen: undefined;
  RewardsScreen: undefined;
  AccountScreen: undefined;
  LogoutScreen: undefined;
};

export const ProfileScreens = {
  Inbox: 'InboxScreen',
  Earnings: 'EarningsScreen',
  Wallet: 'WalletScreen',
  EarningMode: 'EarningModeScreen',
  ReferFriends: 'ReferFriendsScreen',
  Rewards: 'RewardsScreen',
  Account: 'AccountScreen',
  Logout: 'LogoutScreen',
  Payout: 'PayoutScreen',
  Vehicles: 'VehiclesScreen',
  Documents: 'DocumentsScreen',
  BankDetails: 'BankDetailsScreen',
  ManageAccount: 'ManageAccountScreen',
  AppSettings: 'AppSettingsScreen',
  SubscriptionPlans: 'SubscriptionPlansScreen',
  ReplaceVehicle: 'ReplaceVehicleScreen',
} as const;
