import React, { useState } from 'react';
import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
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
  const [errors, setErrors] = useState<{ make?: string; model?: string; year?: string }>({});

  const vehicleMakes = ['Toyota', 'Honda', 'Ford', 'BMW'];
  const vehicleModels = ['Corolla', 'Civic', 'Mustang', 'X5'];

  const signupData = useAppSelector(state => state.auth.signupData);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  console.log('signupData', signupData);

  const validateForm = () => {
    let newErrors: typeof errors = {};

    if (!make) newErrors.make = 'Vehicle make is required';
    if (!model) newErrors.model = 'Vehicle model is required';
    if (!year) {
      newErrors.year = 'Year of manufacture is required';
    } else if (!/^\d{4}$/.test(year)) {
      newErrors.year = 'Enter a valid 4-digit year';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = async () => {
    if (!validateForm()) return;

    Keyboard.dismiss(); 

    const vehicleDetails = {
      vehicleMake: make,
      vehicleModel: model,
      vehicleYear: Number(year),
      agentType: 'DELIVERY',
    };

    await dispatch(setSignupData(vehicleDetails));
    console.log({ make, model, year });
    navigation.navigate(DeliverAPackage.EnterABN);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header logo isBack />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <StepIndicator current={2} total={5} />
          <ScrollView keyboardShouldPersistTaps="handled">
            <TitleDescription
              title="Enter your vehicle details"
              description="Add your details to get started"
            />

            {/* Vehicle Make Dropdown */}
            <Dropdown
              label="Make"
              placeholder="Select make of your vehicle"
              options={vehicleMakes}
              selectedValue={make}
              onValueChange={setMake}
            />
            {errors.make && <Text style={formStyles.errorText}>{errors.make}</Text>}

            {/* Vehicle Model Dropdown */}
            <Dropdown
              label="Model"
              placeholder="Select model of your vehicle"
              options={vehicleModels}
              selectedValue={model}
              onValueChange={setModel}
            />
            {errors.model && <Text style={formStyles.errorText}>{errors.model}</Text>}

            {/* Year Input */}
            <View style={formStyles.inputWrapper}>
              <Text style={formStyles.inputLabel}>Year</Text>
              <TextInput
                style={formStyles.input}
                placeholder="Enter year of manufacture"
                keyboardType="numeric"
                value={year}
                onChangeText={setYear}
                placeholderTextColor={colors.text.subText}
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={Platform.OS === 'ios'}
                maxLength={4}
              />
              {errors.year && <Text style={formStyles.errorText}>{errors.year}</Text>}
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={[
                formStyles.button,
                make && model && year ? formStyles.buttonEnabled : formStyles.buttonDisabled,
              ]}
              onPress={handleContinue}
              disabled={!make || !model || !year}>
              <Text
                style={[
                  formStyles.buttonText,
                  make && model && year ? formStyles.buttonTextEnabled : formStyles.buttonTextDisabled,
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
      </TouchableWithoutFeedback>
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
