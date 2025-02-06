import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import ProfileForm from '../../components/ProfileForm';
import StepIndicator from '../../components/StepIndicator';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import {
  DeliverAPackage,
  DeliverAPackageParamList,
} from '../../navigation/ScreenNames';
import { useAppDispatch } from '../../redux/hook';
import { setSignupData } from '../../redux/slices/authSlice';
import Header from '../../components/Header';

type FormFields = {
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  suburb: string;
  state: string;
  postalCode: number;
};

const DAPCompleteProfileScreen = () => {
  const navigation = useNavigation<NavigationProp<DeliverAPackageParamList>>();
  const dispatch = useAppDispatch();
  const handleFormSubmit = async (formData: FormFields) => {
    console.log('Form submitted:', formData);
    const user = {
      role: 'AGENT',
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      street: formData.address,
      suburb: formData.suburb,
      state: formData.state,
      postalCode: Number(formData.postalCode),
    };

    console.log('user', user);

    await dispatch(setSignupData({ user }));
    navigation.navigate(DeliverAPackage.EnterVehicleDetails);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header logo isBack />
      <View style={styles.container}>
        <StepIndicator current={1} total={5} />
        <ProfileForm
          title="Complete your Profile"
          description="Add your details to get started"
          onSubmit={handleFormSubmit}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
});

export default DAPCompleteProfileScreen;
