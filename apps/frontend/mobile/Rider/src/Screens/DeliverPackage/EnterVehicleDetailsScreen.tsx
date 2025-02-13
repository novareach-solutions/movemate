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
} from 'react-native';
import Header from '../../components/Header';
import StepIndicator from '../../components/StepIndicator';
import Dropdown from '../../components/Dropdown';
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
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZVehicleSchema } from '../../utils/zod/Registration';

type FormFields = z.infer<typeof ZVehicleSchema>;

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
    },
  });

  const selectedMake = watch('make');

  const vehicleMakes = australianCarData.map(item => item.make);

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
      agentType: 'DELIVERY',
    };

    await dispatch(setSignupData(vehicleDetails));
    navigation.navigate(DeliverAPackage.EnterABN);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header logo isBack />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <StepIndicator current={2} total={5} />
          {/* Replace ScrollView with a plain View so the whole screen isn’t scrollable */}
          <View style={styles.content}>
            <Text style={styles.title}>Enter your vehicle details</Text>

            {/* Make Dropdown */}
            <Controller
              control={control}
              name="make"
              render={({ field: { onChange, value } }) => (
                <Dropdown
                  label="Make"
                  placeholder="Select the make of your vehicle"
                  options={vehicleMakes}
                  selectedValue={value}
                  onValueChange={(val) => {
                    onChange(val);
                  }}
                />
              )}
            />
            {errors.make && (
              <Text style={formStyles.errorText}>{errors.make.message}</Text>
            )}

            {/* Model Dropdown */}
            <Controller
              control={control}
              name="model"
              render={({ field: { onChange, value } }) => (
                <Dropdown
                  label="Model"
                  placeholder="Select the model of your vehicle"
                  options={vehicleModels}
                  selectedValue={value}
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
          </View>

          {/* Fixed Footer with full-width Continue button */}
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
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: colors.text.primary,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border.primary,
    backgroundColor: colors.white,
    paddingVertical: 15,
    alignItems: 'center',
  },
  fullWidthButton: {
    width: '100%',
  },
});

export default EnterVehicleDetailsScreen;
