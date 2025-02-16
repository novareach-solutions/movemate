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
import {RootNavigationProp, RootRouteProp} from '../navigation/type';
import { useNavigation } from '@react-navigation/native';
import { AuthScreens, CustomerScreens } from '../navigation/ScreenNames';
import { Login, verifyOtp } from '../redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../redux/hook';

type OtpScreenProps = {
  route: RootRouteProp<'OtpScreen'>;
  navigation?: RootNavigationProp<'OtpScreen'>;
};

const OtpScreen: React.FC<OtpScreenProps> = ({route}) => {
  const {phoneNumber} = route.params;
  const isLogin = useAppSelector(state => state.auth.isLogin);
  const [otp, setOtp] = useState<string[]>(['', '', '', '','','']);
  const [timer, setTimer] = useState(60);
   const navigation = useNavigation();
  const [error, setError] = useState(false);
  const inputs = useRef<TextInput[]>([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (value: string, index: number) => {
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

  const handleVerify = async() => {
    // if (error) {
    //   setError(false);
    //   // setTimer(60);
    //   setOtp(['', '', '', '','','']);
    //   inputs.current[0]?.focus();
    // }
    const enteredOtp = otp.join('');
    try {
      if(isLogin){
        console.log('LoginAPI called')
        const response = await dispatch(Login({ phone: phoneNumber,otp:enteredOtp })).unwrap();
        console.log('response', response)
        // Navigate to the otp screen
        // navigation.navigate(CustomerScreens.AcceptOrder);
        // navigation.reset(({
        //   index: 0,
        //   routes: [{ name: CustomerScreens.AppLayoutScreen }],
        // }));
        navigation.reset(({
          index: 0,
          routes: [{ name: 'MainApp' }],
        }));

      }else{
        await dispatch(verifyOtp({ phone: phoneNumber,otp:enteredOtp }))
        .unwrap();
        // Navigate to the otp screen
        navigation.navigate(AuthScreens.CompleteProfileScreen,{phoneNumber});
      }
      
    } catch {
      console.log('Otp verification failed');
    }
  };

  const handleResend = () => {
    setTimer(60);
    setOtp(['', '', '', '','','']);
    setError(false);
    inputs.current[0]?.focus();
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.header}>Enter code</Text>
          <Text style={styles.subtext}>
            Enter the code sent to: {phoneNumber}
          </Text>

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
                Incorrect code, please try again
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
              {!error ? 'Verify Now' : 'Resend code'}
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
    marginTop: 60,
  },
  header: {
    fontSize: typography.fontSize.large,
    fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
    color: colors.text.primary,
    fontFamily: typography.fontFamily.regular,
    textAlign: 'left',
    marginBottom: 10,
  },
  subtext: {
    fontSize: typography.fontSize.medium,
    textAlign: 'left',
    marginBottom: 50,
    color: colors.text.subText,
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
