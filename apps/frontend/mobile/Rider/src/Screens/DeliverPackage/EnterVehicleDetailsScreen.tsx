import React, { useState } from 'react';
import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Text,
} from 'react-native';
import TitleDescription from '../../components/TitleDescription';
import Dropdown from '../../components/Dropdown';
import { formStyles } from '../../theme/form';
import { colors } from '../../theme/colors';
import StepIndicator from '../../components/StepIndicator';
import { DeliverAPackage } from '../../navigation/ScreenNames';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { setSignupData } from '../../redux/slices/authSlice';
import Header from '../../components/Header';

const EnterVehicleDetailsScreen: React.FC = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const vehicleMakes = ['Toyota', 'Honda', 'Ford', 'BMW'];
  const vehicleModels = ['Corolla', 'Civic', 'Mustang', 'X5'];
  const signupData = useAppSelector((state) => state.auth.signupData);
  const dispatch = useAppDispatch();
  console.log('signupData', signupData)
  const navigation = useNavigation();

  const handleContinue = async () => {
    const vehicleDetails = {
      vehicleMake: make,
      vehicleModel: model,
      vehicleYear: Number(year),
      agentType: "DELIVERY",
    };

    await dispatch(setSignupData(vehicleDetails));
    console.log({ make, model, year });
    navigation.navigate(DeliverAPackage.EnterABN);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header logo isBack />
      <View style={styles.container}>
        <StepIndicator current={2} total={5} />
        <ScrollView>
          <TitleDescription
            title="Enter your vehicle details"
            description="Add your details to get started"
          />
          <Dropdown
            label="Make"
            placeholder="Select make of your vehicle"
            options={vehicleMakes}
            selectedValue={make}
            onValueChange={setMake}
          />
          <Dropdown
            label="Model"
            placeholder="Select model of your vehicle"
            options={vehicleModels}
            selectedValue={model}
            onValueChange={setModel}
          />
          <View style={formStyles.inputWrapper}>
            <Text style={formStyles.inputLabel}>Year</Text>
            <TextInput
              style={formStyles.input}
              placeholder="Enter year of manufacture"
              keyboardType="numeric"
              value={year}
              onChangeText={setYear}
            />
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              formStyles.button,
              make && model && year ? formStyles.buttonEnabled : null,
            ]}
            onPress={handleContinue}
            disabled={!make || !model || !year}>
            <Text
              style={[
                formStyles.buttonText,
                make && model && year ? formStyles.buttonTextEnabled : null,
              ]}>
              Continue
            </Text>
          </TouchableOpacity>
          <Text style={formStyles.footerText}>
            By continuing you accept our{' '}
            <Text style={formStyles.link}>Terms of Service</Text> and{' '}
            <Text style={formStyles.link}>Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border.primary,
    backgroundColor: colors.white,
  },
});

export default EnterVehicleDetailsScreen;
