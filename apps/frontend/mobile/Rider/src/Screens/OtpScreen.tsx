import React, { useEffect, useRef, useState } from 'react';
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
  Alert,
} from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthScreens, DeliverAPackage } from '../navigation/ScreenNames';
import { useAppDispatch } from '../redux/hook';
import { verifyOtp, requestOtp } from '../redux/slices/authSlice';
import Header from '../components/Header';

interface OtpScreenProps {
  route: {
    params: { phoneNumber: string; login: boolean };
  };
}

const OtpScreen: React.FC<OtpScreenProps> = ({ route }) => {
  const { phoneNumber } = route.params;
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState(false);
  const inputs = useRef<TextInput[]>([]);
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // Allow only digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value) {
      // Move to next input if current input is filled
      if (index < otp.length - 1) {
        inputs.current[index + 1]?.focus();
      }
    } else {
      // Move to previous input if the input is empty
      if (index > 0) {
        inputs.current[index - 1]?.focus();
      }
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (event.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join('');
    try {
      // Always dispatch verifyOtp, regardless of login vs. signup
      const response = await dispatch(
        verifyOtp({ phone: phoneNumber, otp: enteredOtp })
      ).unwrap();
      console.log('OTP Verification Successful!', response);

      // Navigate based on the status returned from the API
      if (response.data.status === 'existing_user') {
        navigation.navigate(DeliverAPackage.Home);
      } else {
        navigation.navigate(AuthScreens.SelectService);
      }
    } catch (err: any) {
      console.log('OTP Verification failed', err);
      setError(true);
      Alert.alert('Error', 'OTP Verification failed, please try again.');
    }
  };

  const handleResend = async () => {
    setTimer(60);
    setOtp(['', '', '', '', '', '']);
    setError(false);
    inputs.current[0]?.focus();

    try {
      await dispatch(requestOtp({ phone: phoneNumber })).unwrap();
      console.log('OTP Resent Successfully!');
    } catch (error) {
      console.log('OTP Resend Failed', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <Header logo isBack />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.titleDesccontainer}>
            <Text style={styles.header}>Enter verification code</Text>
            <Text style={styles.subtext}>
              Enter the 4-digit verification code sent to your phone: {phoneNumber}
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.changeHighlight}>Change</Text>
              </TouchableOpacity>
            </Text>
          </View>

          <View style={{ marginBottom: 30 }}>
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputs.current[index] = ref!)}
                  style={[
                    styles.input,
                    error
                      ? { borderColor: colors.error }
                      : digit
                      ? { borderColor: colors.purple }
                      : { borderColor: colors.border.primary },
                  ]}
                  keyboardType="numeric"
                  maxLength={1}
                  value={digit}
                  selectTextOnFocus
                  onChangeText={(value) => handleChange(value, index)}
                  onKeyPress={(event) => handleKeyPress(event, index)}
                />
              ))}
            </View>

            {error && (
              <Text
                style={{
                  fontSize: 14,
                  color: colors.error,
                  marginVertical: 10,
                }}
              >
                An error occurred, please try again.
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              otp.every((digit) => digit) && styles.buttonFilled,
            ]}
            onPress={handleVerify}
          >
            <Text
              style={[
                styles.buttonText,
                otp.every((digit) => digit) && styles.buttonTextFilled,
              ]}
            >
              Verify Now
            </Text>
          </TouchableOpacity>

          <Text style={styles.timerText}>
            {timer > 0 ? (
              <>
                Resend code in <Text style={styles.timer}>{timer} secs</Text>
              </>
            ) : (
              <TouchableOpacity onPress={handleResend}>
                <Text style={styles.timer}>Resend</Text>
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
  changeHighlight: {
    color: colors.purple,
    fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
    marginLeft: 5,
  },
  titleDesccontainer: {
    marginBottom: 20,
  },
  header: {
    fontSize: typography.fontSize.large,
    fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
    color: colors.purple,
    fontFamily: typography.fontFamily.regular,
    textAlign: 'left',
    marginBottom: 10,
  },
  subtext: {
    fontSize: typography.fontSize.medium,
    color: colors.text.subText,
    textAlign: 'left',
  },
});

export default OtpScreen;
