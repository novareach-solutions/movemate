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

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={AuthScreens.OnboardingScreen}>
        {/* Auth Screens */}
        <Stack.Screen
          name={AuthScreens.OnboardingScreen}
          component={Onboarding}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={AuthScreens.LoginScreen}
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={AuthScreens.OtpScreen}
          component={OtpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={AuthScreens.CompleteProfileScreen}
          component={CompleteProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={AuthScreens.PrivacyPolicyScreen}
          component={PrivacyPolicyScreen}
          options={{headerShown: false}}
        />

        {/* App Screens */}
        {/* <Stack.Screen
          name={AppScreens.AppLayoutScreen}
          component={AppLayoutScreen}
          options={{headerShown: false}}
        /> */}
      

      <Stack.Screen
          name={CustomerScreens.CustomerHomeScreen}
          component={CustomerHomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={CustomerScreens.CustomerAccountScreen}
          component={CustomerAccountScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={CustomerScreens.NotificationScreen}
          component={NotificationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={CustomerScreens.OrderScreen}
          component={OrderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={CustomerScreens.SAPDetailsScreen}
          component={SAPDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={CustomerScreens.EnterLocationDetailsScreen}
          component={EnterLocationDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={CustomerScreens.CheckoutScreen}
          component={CheckoutScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={CustomerScreens.PaymentSelectionScreen}
          component={PaymentSelectionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={CustomerScreens.AddCardScreen}
          component={AddCardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={CustomerScreens.PaymentSuccessScreen}
          component={PaymentSuccessScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={CustomerScreens.DeliveryScreen}
          component={DeliveryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={CustomerScreens.CancelOrderScreen}
          component={CancelOrderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={CustomerScreens.CancelSuccessScreen}
          component={CancelSuccessScreen}
          options={{ headerShown: false }}
        />

<Stack.Screen
          name={ProfileScreens.ProfileScreen}
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ProfileScreens.SavedAddressesScreen}
          component={SavedAddressesScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name={ProfileScreens.LegalAboutScreen}
          component={LegalAboutScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name={ProfileScreens.FeedbackScreen}
          component={FeedbackScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name={ProfileScreens.ReferFriendsScreen}
          component={ReferFriendsScreen}
          options={{ headerShown: true }}
        />


        <Stack.Screen name={CustomerScreens.AppLayoutScreen} component={AppLayoutScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
