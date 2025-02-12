import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from '../components/Onboarding';
import Login from '../Screens/LoginScreen';
import OtpScreen from '../Screens/OtpScreen';
import CompleteProfileScreen from '../Screens/CompleteProfileScreen';
import PrivacyPolicyScreen from '../Screens/PrivacyPolicyScreen';
import AppLayoutScreen from '../Screens/AppLayoutScreen';
import { AuthScreens } from './ScreenNames';

const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={AuthScreens.OnboardingScreen} component={Onboarding} />
      <Stack.Screen name={AuthScreens.LoginScreen} component={Login} />
      <Stack.Screen name={AuthScreens.OtpScreen} component={OtpScreen} />
      <Stack.Screen name="CompleteProfile" component={CompleteProfileScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="MainApp" component={AppLayoutScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
