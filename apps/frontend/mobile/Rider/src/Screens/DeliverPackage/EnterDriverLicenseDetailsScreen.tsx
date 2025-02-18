import React, {useState} from 'react';
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
import {colors} from '../../theme/colors';
import {formStyles} from '../../theme/form';
import {
  DeliverAPackage,
  DeliverAPackageParamList,
} from '../../navigation/ScreenNames';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../redux/hook';
import {setSignupData} from '../../redux/slices/authSlice';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import TitleDescription from '../../components/TitleDescription';
import {ZDriverLicenseSchema} from '../../utils/zod/Registration';
import DatePicker from 'react-native-date-picker';

type FormFields = {
  driverLicenseNumber: string;
  driverLicenseExpiryDate: string;
};

const EnterDriverLicenseDetailsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<DeliverAPackageParamList>>();
  const [open, setOpen] = useState(false);
  const [driverLicenseExpiryDate, setDriverLicenseExpiryDate] =
    useState<Date | null>(null);

  const {
    control,
    handleSubmit,
    formState: {isValid, errors},
  } = useForm<FormFields>({
    resolver: zodResolver(ZDriverLicenseSchema),
    mode: 'onChange',
    defaultValues: {
      driverLicenseNumber: '',
      driverLicenseExpiryDate: '',
    },
  });

  // onSubmit handler
  const onSubmit = async (data: FormFields) => {
    Keyboard.dismiss();
    const driverLicenseDetails = {
      driverLicenseNumber: data.driverLicenseNumber,
      driverLicenseExpiryDate: data.driverLicenseExpiryDate,
    };

    await dispatch(setSignupData(driverLicenseDetails));
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
          <StepIndicator current={1} total={5} />
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled">
            <TitleDescription
              title="Enter Your Driver's License Details"
              description="Provide your driver’s license number and expiry date"
            />

            {/* Driver License Number Input */}
            <Controller
              control={control}
              name="driverLicenseNumber"
              render={({field: {onChange, value}}) => (
                <View style={formStyles.inputWrapper}>
                  <Text style={formStyles.inputLabel}>
                    Driver's License Number
                  </Text>
                  <TextInput
                    style={formStyles.input}
                    placeholder="Enter your driver’s license number"
                    value={value}
                    onChangeText={onChange}
                    placeholderTextColor={colors.text.subText}
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                  />
                </View>
              )}
            />
            {errors.driverLicenseNumber && (
              <Text style={formStyles.errorText}>
                {errors.driverLicenseNumber.message}
              </Text>
            )}

            {/* Driver License Expiry Date Input */}
            {/* Driver License Expiry Date Input */}
            <Controller
              control={control}
              name="driverLicenseExpiryDate"
              render={({field: {onChange, value}}) => (
                <View style={formStyles.inputWrapper}>
                  <Text style={formStyles.inputLabel}>
                    Driver's License Expiry Date
                  </Text>
                  <TouchableOpacity
                    onPress={() => setOpen(true)}
                    style={formStyles.input}>
                    <Text
                      style={{
                        color: value
                          ? colors.text.primary
                          : colors.text.subText,
                      }}>
                      {value
                        ? new Date(value).toLocaleDateString('en-AU')
                        : 'Select a date'}
                    </Text>
                  </TouchableOpacity>
                  <DatePicker
                    modal
                    open={open}
                    date={driverLicenseExpiryDate || new Date()}
                    mode="date" // Ensures only the date is selected
                    minimumDate={new Date()} // Prevents past dates
                    onConfirm={date => {
                      setOpen(false);
                      setDriverLicenseExpiryDate(date);
                      onChange(date.toISOString().split('T')[0]); // Stores only the date part
                    }}
                    onCancel={() => setOpen(false)}
                  />
                </View>
              )}
            />

            {errors.driverLicenseExpiryDate && (
              <Text style={formStyles.errorText}>
                {errors.driverLicenseExpiryDate.message}
              </Text>
            )}

            <View style={{height: 100}} />
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

export default EnterDriverLicenseDetailsScreen;
