// OtpScreen.tsx

import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
  TextStyle,
} from 'react-native';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';
import TitleDescription from '../components/TitleDescription';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  AuthScreens,
  AuthScreensParamList,
  DeliverAPackage,
} from '../navigation/ScreenNames';
import {useAppDispatch} from '../redux/hook';
import {verifyOtp, login} from '../redux/slices/authSlice';
import Header from '../components/Header';

interface OtpScreenProps {
  route: {
    params: {phoneNumber: string; login: boolean};
  };
}

const OtpScreen: React.FC<OtpScreenProps> = ({route}) => {
  const {phoneNumber, login: isLogin} = route.params;
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState(false);
  const inputs = useRef<TextInput[]>([]);
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (value: string, index: number) => {
    // Allow only numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus handling
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    } else if (!value && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join('');

    try {
      if (isLogin) {
        // Dispatch login thunk
        const response = await dispatch(
          login({phone: phoneNumber, otp: enteredOtp}),
        ).unwrap();
        console.log('Login Successful!', response);
        // Navigate to the main app screen or dashboard
        navigation.navigate(DeliverAPackage.Home);
      } else {
        const response = await dispatch(
          verifyOtp({phone: phoneNumber, otp: enteredOtp}),
        ).unwrap();
        console.log('Login Successful!', response);
        navigation.navigate(AuthScreens.SelectService);
      }
    } catch (err: any) {
      console.log('OTP Verification/Login failed', err);
      setError(true);
    }
  };

  const handleResend = () => {
    setTimer(60);
    setOtp(['', '', '', '', '', '']);
    setError(false);
    inputs.current[0]?.focus();
    // Optionally, you can dispatch requestOtp again here
  };

  return (
    <SafeAreaView style={{flex: 1,backgroundColor: colors.white}}>
      <Header logo isBack />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TitleDescription
            title="Enter verification code"
            description={`Enter the code sent to: ${phoneNumber}`}
          />

          <View style={{marginBottom: 30}}>
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={ref => (inputs.current[index] = ref!)}
                  style={[
                    styles.input,
                    error
                      ? {borderColor: colors.error}
                      : digit
                        ? {borderColor: colors.purple}
                        : {borderColor: colors.border.primary},
                  ]}
                  keyboardType="numeric"
                  maxLength={1}
                  value={digit}
                  onChangeText={value => handleChange(value, index)}
                />
              ))}
            </View>

            {error && (
              <Text
                style={{fontSize: 14, color: colors.error, marginVertical: 10}}>
                An error, please try again
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              otp.every(digit => digit) && styles.buttonFilled,
            ]}
            onPress={handleVerify}>
            <Text
              style={[
                styles.buttonText,
                otp.every(digit => digit) && styles.buttonTextFilled,
              ]}>
              {isLogin ? 'Login' : 'Verify Now'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.timerText}>
            {timer > 0 ? (
              <>
                Resend code in <Text style={styles.timer}>{timer} secs</Text>
              </>
            ) : (
              <TouchableOpacity onPress={handleResend}>
                <Text>
                  Resend code <Text style={styles.timer}>again</Text>
                </Text>
              </TouchableOpacity>
            )}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
    paddingTop: 60,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
  },
  button: {
    borderWidth: 1,
    borderColor: colors.purple,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonFilled: {
    backgroundColor: colors.purple,
  },
  buttonText: {
    textAlign: 'center',
    color: colors.text.primary,
    fontSize: typography.fontSize.medium,
    fontWeight: typography.fontWeight.semiBold as TextStyle['fontWeight'],
  },
  buttonTextFilled: {
    color: colors.white,
  },
  timerText: {
    textAlign: 'center',
    marginTop: 20,
    color: colors.text.primary,
    alignSelf: 'center',
  },
  timer: {
    color: colors.purple,
  },
});

export default OtpScreen;
