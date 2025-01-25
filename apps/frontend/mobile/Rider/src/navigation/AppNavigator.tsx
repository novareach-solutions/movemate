import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AppScreens,
  AuthScreens,
  BuyFromStore,
  DeliverAPackage,
  ProfileScreens,
} from './ScreenNames';
import Onboarding from '../components/Onboarding';
import Login from '../Screens/SignupNumberScreen';
import OtpScreen from '../Screens/OtpScreen';
import SelectServiceScreen from '../Screens/SelectServiceScreen';
import DAPCompleteProfileScreen from '../Screens/DeliverPackage/CompleteProfileScreen';
import DAPUploadDocumentDetailsScreen from '../Screens/DeliverPackage/UploadDocumentDetailsScreen';
import DAPUploadDocumentsScreen from '../Screens/DeliverPackage/UploadDocumentsScreen';
import DocumentReviewScreen from '../Screens/DocumentReviewScreen';
import EnterVehicleDetailsScreen from '../Screens/DeliverPackage/EnterVehicleDetailsScreen';
import EnterABNScreen from '../Screens/DeliverPackage/EnterABN';
import AddProfilePhotoScreen from '../Screens/DeliverPackage/AddProfilePhotoScreen';
import HomeScreen from '../Screens/DeliverPackage/HomeScreen';
import FAQScreen from '../Screens/FaqScreen';
import CancellationReasonScreen from '../Screens/CancellationReasonScreen';
import ItemsReviewScreen from '../Screens/BuyFromStore/ItemsReviewScreen';
import ProfileScreen from '../Screens/Profile';
import InboxScreen from '../Screens/Profile/InboxScreen';
import ReferFriendsScreen from '../Screens/Profile/ReferFriendScreen';
import WalletScreen from '../Screens/Profile/WalletScreen';
import PayoutScreen from '../Screens/Profile/WalletScreen/PayoutScreen';
import AccountScreen from '../Screens/Profile/AccountScreen';
import DocumentsScreen from '../Screens/Profile/AccountScreen/DocumentsScreen';
import ManageAccountScreen from '../Screens/Profile/AccountScreen/ManageAccountScreen';
import EarningsModeScreen from '../Screens/Profile/EarningModeScreens';
import SubscriptionPlansScreen from '../Screens/Profile/EarningModeScreens/SubscriptionPlansScreen';
import SignupNumberScreen from '../Screens/SignupNumberScreen';
import LoginScreen from '../Screens/LoginScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={AuthScreens.Onboarding}>
        <Stack.Screen
          name={AuthScreens.Onboarding}
          component={Onboarding}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={AuthScreens.Login}
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={AuthScreens.SignupNumber}
          component={SignupNumberScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={AuthScreens.Otp}
          component={OtpScreen as React.FC}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={AuthScreens.SelectService}
          component={SelectServiceScreen}
          options={{headerShown: false}}
        />

        {/* Deliver a Package */}
        <Stack.Screen
          name={DeliverAPackage.CompleteProfile}
          component={DAPCompleteProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={DeliverAPackage.UploadDocuments}
          component={DAPUploadDocumentsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={DeliverAPackage.UploadDocumentDetails}
          component={DAPUploadDocumentDetailsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={DeliverAPackage.EnterVehicleDetails}
          component={EnterVehicleDetailsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={DeliverAPackage.EnterABN}
          component={EnterABNScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={DeliverAPackage.AddProfilePhoto}
          component={AddProfilePhotoScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={DeliverAPackage.Home}
          component={HomeScreen}
          options={{headerShown: false}}
        />

        {/* Buy From Store */}
        <Stack.Screen
          name={BuyFromStore.ItemsReviewScreen}
          component={ItemsReviewScreen}
          options={{headerShown: false}}
        />

        {/* Profile */}
        <Stack.Screen
          name={ProfileScreens.Inbox}
          component={InboxScreen as React.FC}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ProfileScreens.ReferFriends}
          component={ReferFriendsScreen as React.FC}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ProfileScreens.Wallet}
          component={WalletScreen as React.FC}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ProfileScreens.Payout}
          component={PayoutScreen as React.FC}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ProfileScreens.Account}
          component={AccountScreen as React.FC}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ProfileScreens.Documents}
          component={DocumentsScreen as React.FC}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ProfileScreens.ManageAccount}
          component={ManageAccountScreen as React.FC}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ProfileScreens.EarningMode}
          component={EarningsModeScreen as React.FC}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ProfileScreens.SubscriptionPlans}
          component={SubscriptionPlansScreen as React.FC}
          options={{headerShown: false}}
        />

        {/* App */}
        <Stack.Screen
          name={AppScreens.DocumentReview}
          component={DocumentReviewScreen as React.FC}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={AppScreens.FAQScreen}
          component={FAQScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={AppScreens.CancellationReason}
          component={CancellationReasonScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={AppScreens.Profile}
          component={ProfileScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
