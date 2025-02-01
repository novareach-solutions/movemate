import React, { useState } from 'react';
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
} from 'react-native';
import TitleDescription from '../../components/TitleDescription';
import { formStyles } from '../../theme/form';
import { colors } from '../../theme/colors';
import StepIndicator from '../../components/StepIndicator';
import { useNavigation } from '@react-navigation/native';
import { DeliverAPackage } from '../../navigation/ScreenNames';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { setSignupData } from '../../redux/slices/authSlice';
import Header from '../../components/Header';

const EnterABNScreen: React.FC = () => {
  const [abn, setAbn] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const signupData = useAppSelector(state => state.auth.signupData);
  console.log('signupData>>>>', signupData);
  const navigation = useNavigation();

  const validateABN = () => {
    if (!abn) {
      setError('ABN is required');
      return false;
    } else if (!/^\d{11}$/.test(abn)) {
      setError('ABN must be exactly 11 digits');
      return false;
    }
    setError('');
    return true;
  };

  const handleContinue = async () => {
    if (!validateABN()) return;

    Keyboard.dismiss(); // Dismiss keyboard on submit

    const abnDetails = {
      abnNumber: abn,
    };

    await dispatch(setSignupData(abnDetails));
    navigation.navigate(DeliverAPackage.AddProfilePhoto);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header logo isBack />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <StepIndicator current={3} total={5} />
          <View style={styles.content}>
            <TitleDescription
              title="Enter your ABN details"
              description="Add your ABN to get started"
            />
            <View style={formStyles.inputWrapper}>
              <Text style={formStyles.inputLabel}>ABN</Text>
              <TextInput
                style={[
                  formStyles.input,
                  error ? formStyles.errorInput : null,
                ]}
                placeholder="Enter your ABN"
                placeholderTextColor={colors.text.subText} 
                keyboardType="numeric"
                value={abn}
                onChangeText={text => {
                  setAbn(text);
                  setError(''); // Clear error on change
                }}
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={Platform.OS === 'ios'}
                maxLength={11} // ✅ Ensure ABN is 11 digits max
              />
              {error ? <Text style={formStyles.errorText}>{error}</Text> : null}
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={[
                formStyles.button,
                abn && !error ? formStyles.buttonEnabled : formStyles.buttonDisabled,
              ]}
              onPress={handleContinue}
              disabled={!abn || !!error}>
              <Text
                style={[
                  formStyles.buttonText,
                  abn && !error ? formStyles.buttonTextEnabled : formStyles.buttonTextDisabled,
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
  content: {
    flex: 1,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border.primary,
    backgroundColor: colors.white,
  },
});

export default EnterABNScreen;
