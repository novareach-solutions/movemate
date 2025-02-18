import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import Header from '../../components/Header';
import StepIndicator from '../../components/StepIndicator';
import TitleDescription from '../../components/TitleDescription';
import {formStyles} from '../../theme/form';
import {colors} from '../../theme/colors';
import {
  DeliverAPackage,
  DeliverAPackageParamList,
} from '../../navigation/ScreenNames';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../redux/hook';
import {setSignupData} from '../../redux/slices/authSlice';
import {z} from 'zod';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {ZABNSchema} from '../../utils/zod/Registration';

type FormFields = z.infer<typeof ZABNSchema>;

const EnterABNScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<DeliverAPackageParamList>>();

  const {
    control,
    handleSubmit,
    formState: {isValid, errors},
  } = useForm<FormFields>({
    resolver: zodResolver(ZABNSchema),
    mode: 'onChange',
    defaultValues: {abn: ''},
  });

  const onSubmit = async (data: FormFields) => {
    Keyboard.dismiss();

    const abnDetails = {
      abnNumber: data.abn,
    };

    await dispatch(setSignupData(abnDetails));
    navigation.navigate(DeliverAPackage.AddProfilePhoto);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header logo isBack />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <StepIndicator current={3} total={5} />
            <View style={styles.content}>
              <TitleDescription
                title="Enter your ABN details"
                description="Add your ABN to get started"
              />

              {/* ABN Input using Controller */}
              <Controller
                control={control}
                name="abn"
                render={({field: {onChange, onBlur, value}}) => (
                  <View style={formStyles.inputWrapper}>
                    <Text style={formStyles.inputLabel}>ABN</Text>
                    <TextInput
                      style={[
                        formStyles.input,
                        errors.abn && formStyles.errorInput,
                      ]}
                      placeholder="Enter your ABN"
                      placeholderTextColor={colors.text.subText}
                      keyboardType="numeric"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      returnKeyType="done"
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={Platform.OS === 'ios'}
                      maxLength={11}
                    />
                    {errors.abn && (
                      <Text style={formStyles.errorText}>
                        {errors.abn.message}
                      </Text>
                    )}
                  </View>
                )}
              />
            </View>

            {/* Fixed Footer with full-width Continue button */}
            <View style={styles.footer}>
              <TouchableOpacity
                style={[
                  formStyles.button,
                  styles.fullWidthButton,
                  isValid
                    ? formStyles.buttonEnabled
                    : formStyles.buttonDisabled,
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
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

export default EnterABNScreen;
