import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  TextStyle,
  SafeAreaView,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';
import {images} from '../assets/images/images';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthScreens, AuthScreensParamList} from '../navigation/ScreenNames';
import {requestOtp} from '../redux/slices/authSlice';
import {useAppDispatch} from '../redux/hook';
import Header from '../components/Header';

const {width} = Dimensions.get('window');

const LoginScreen: React.FC = () => {
  const phoneInput = useRef<PhoneInput>(null);
  const navigation = useNavigation<NavigationProp<AuthScreensParamList>>();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isFilled, setIsFilled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useAppDispatch();

  const handlePhoneNumberChange = (number: string) => {
    setIsFocused(true);
    setPhoneNumber(number);
    setIsFilled(number.length > 0);
  };

  const handleSendCode = async () => {
    try {
      // await dispatch(requestOtp({phone: phoneNumber})).unwrap();
      navigation.navigate(AuthScreens.Otp, {phoneNumber, login: true});
    } catch {
      console.log('Request Otp failed');
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
  <SafeAreaView style={{
      flex:1
    }}>
      <Header isBack />
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.container}>
          <Image source={images.logo} style={styles.logo} />
          <Text style={styles.heading}>Login</Text>
          <Text style={styles.subheading}>
            Enter phone number and we’ll send you a verification code
          </Text>
          <PhoneInput
            ref={phoneInput}
            defaultValue={phoneNumber}
            defaultCode="AU"
            layout="first"
            onChangeFormattedText={handlePhoneNumberChange}
            containerStyle={[
              styles.phoneContainer,
              isFocused && {borderColor: colors.purple},
            ]}
            textContainerStyle={styles.textInput}
            textInputStyle={styles.textInputStyle}
            placeholder="Phone Number"
            textInputProps={{
              onFocus: () => setIsFocused(true),
              onBlur: () => setIsFocused(false),
            }}
          />

          <TouchableOpacity
            style={[
              styles.button,
              isFilled ? styles.buttonFilled : styles.buttonOutlined,
            ]}
            onPress={handleSendCode}
            disabled={!isFilled}>
            <Text
              style={[
                styles.buttonText,
                isFilled ? styles.buttonTextFilled : styles.buttonTextOutlined,
              ]}>
              Send Code
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
  logo: {
    width: width * 0.3,
    height: width * 0.3,
    resizeMode: 'contain',
    marginBottom: 30,
    alignSelf: 'center',
  },
  heading: {
    fontSize: typography.fontSize.large,
    fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
    color: colors.black,
    textAlign: 'left',
    marginBottom: 10,
  },
  subheading: {
    fontSize: typography.fontSize.medium,
    color: colors.text.subText,
    fontFamily: typography.fontFamily.regular,
    textAlign: 'left',
    marginBottom: 30,
  },
  phoneContainer: {
    width: '100%',
    height: 60,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border.primary,
  },
  textInput: {
    backgroundColor: colors.white,
    borderRadius: 8,
    height: '100%',
    paddingVertical: 0,
  },
  textInputStyle: {
    fontSize: typography.fontSize.medium,
    color: colors.text.primary,
    height: '100%',
    textAlignVertical: 'center',
  },
  button: {
    marginTop: 40,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonOutlined: {
    borderWidth: 1,
    borderColor: colors.purple,
    backgroundColor: colors.white,
  },
  buttonFilled: {
    backgroundColor: colors.purple,
  },
  buttonText: {
    fontSize: typography.fontSize.medium,
    fontWeight: 'bold',
  },
  buttonTextOutlined: {
    color: colors.text.primaryGrey,
    fontSize: typography.fontSize.medium,
    fontFamily: typography.fontFamily.regular,
  },
  buttonTextFilled: {
    color: colors.white,
  },
});

export default LoginScreen;
