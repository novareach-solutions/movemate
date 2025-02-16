// screens/EnterVehicleDetailsScreen.tsx
import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Header from '../../components/Header';
import StepIndicator from '../../components/StepIndicator';
import { colors } from '../../theme/colors';
import { formStyles } from '../../theme/form';
import {
  DeliverAPackage,
  DeliverAPackageParamList,
} from '../../navigation/ScreenNames';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../../redux/hook';
import { setSignupData } from '../../redux/slices/authSlice';
import { australianCarData } from '../../utils/australianCarData';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZVehicleSchema } from '../../utils/zod/Registration';
import TitleDescription from '../../components/TitleDescription';
// Note: AutoCompleteInput is imported from the file for dropdown autocomplete
import AutoCompleteInput from '../../components/Dropdown';

type FormFields = {
  make: string;
  model: string;
  year: string;
  licensePlate: string;
  registrationExpiry: string;
};

const EnterVehicleDetailsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<DeliverAPackageParamList>>();

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid, errors },
  } = useForm<FormFields>({
    resolver: zodResolver(ZVehicleSchema),
    mode: 'onChange',
    defaultValues: {
      make: '',
      model: '',
      year: '',
      licensePlate: '',
      registrationExpiry: '',
    },
  });

  const selectedMake = watch('make');

  const vehicleMakes = australianCarData.map(item => item.make);

  // Get the models for the selected make
  const vehicleModels =
    selectedMake && australianCarData.find(item => item.make === selectedMake)
      ? australianCarData.find(item => item.make === selectedMake)!.models
      : [];

  // onSubmit handler
  const onSubmit = async (data: FormFields) => {
    Keyboard.dismiss();
    const vehicleDetails = {
      vehicleMake: data.make,
      vehicleModel: data.model,
      vehicleYear: Number(data.year),
      licensePlate: data.licensePlate,
      registrationExpiry: data.registrationExpiry,
      agentType: 'DELIVERY',
    };

    await dispatch(setSignupData(vehicleDetails));
    navigation.navigate(DeliverAPackage.EnterABN);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header logo isBack />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
          <StepIndicator current={2} total={5} />
          {/* Wrap fields in a ScrollView to allow scrolling */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled">
            <TitleDescription
              title="Enter your vehicle details"
              description="Add your details to get started"
            />

            {/* Make AutoComplete Input */}
            <Controller
              control={control}
              name="make"
              render={({ field: { onChange, value } }) => (
                <AutoCompleteInput
                  label="Make"
                  placeholder="Type to search for your vehicle make"
                  suggestions={vehicleMakes}
                  value={value}
                  onValueChange={(val) => onChange(val)}
                />
              )}
            />
            {errors.make && (
              <Text style={formStyles.errorText}>{errors.make.message}</Text>
            )}

            {/* Model AutoComplete Input */}
            <Controller
              control={control}
              name="model"
              render={({ field: { onChange, value } }) => (
                <AutoCompleteInput
                  label="Model"
                  placeholder="Type to search for your vehicle model"
                  suggestions={vehicleModels}
                  value={value}
                  onValueChange={onChange}
                />
              )}
            />
            {errors.model && (
              <Text style={formStyles.errorText}>{errors.model.message}</Text>
            )}

            {/* Year Input */}
            <Controller
              control={control}
              name="year"
              render={({ field: { onChange, value } }) => (
                <View style={formStyles.inputWrapper}>
                  <Text style={formStyles.inputLabel}>Year</Text>
                  <TextInput
                    style={formStyles.input}
                    placeholder="Enter year of manufacture"
                    keyboardType="numeric"
                    value={value}
                    onChangeText={onChange}
                    placeholderTextColor={colors.text.subText}
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                    blurOnSubmit={Platform.OS === 'ios'}
                    maxLength={4}
                  />
                </View>
              )}
            />
            {errors.year && (
              <Text style={formStyles.errorText}>{errors.year.message}</Text>
            )}

            {/* License Plate Number Input */}
            <Controller
              control={control}
              name="licensePlate"
              render={({ field: { onChange, value } }) => (
                <View style={formStyles.inputWrapper}>
                  <Text style={formStyles.inputLabel}>License Plate Number</Text>
                  <TextInput
                    style={formStyles.input}
                    placeholder="Enter your license plate number"
                    value={value}
                    onChangeText={onChange}
                    placeholderTextColor={colors.text.subText}
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                  />
                </View>
              )}
            />
            {errors.licensePlate && (
              <Text style={formStyles.errorText}>
                {errors.licensePlate.message}
              </Text>
            )}

            {/* Registration Expiry Date Input */}
            <Controller
              control={control}
              name="registrationExpiry"
              render={({ field: { onChange, value } }) => (
                <View style={formStyles.inputWrapper}>
                  <Text style={formStyles.inputLabel}>
                    Registration Expiry Date
                  </Text>
                  <TextInput
                    style={formStyles.input}
                    placeholder="MM/YYYY"
                    value={value}
                    onChangeText={onChange}
                    placeholderTextColor={colors.text.subText}
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                  />
                </View>
              )}
            />
            {errors.registrationExpiry && (
              <Text style={formStyles.errorText}>
                {errors.registrationExpiry.message}
              </Text>
            )}

            {/* Extra bottom padding so content doesn't get hidden */}
            <View style={{ height: 100 }} />
          </ScrollView>

          {/* Footer with Continue button */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={[
                formStyles.button,
                styles.fullWidthButton,
                isValid ? formStyles.buttonEnabled : formStyles.buttonDisabled,
              ]}
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid}>
              <Text
                style={[
                  formStyles.buttonText,
                  isValid
                    ? formStyles.buttonTextEnabled
                    : formStyles.buttonTextDisabled,
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
        </KeyboardAvoidingView>
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
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    paddingVertical: 20,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border.primary,
    backgroundColor: colors.white,
    paddingVertical: 15,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  fullWidthButton: {
    width: '100%',
  },
});

export default EnterVehicleDetailsScreen;
