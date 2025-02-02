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
  TextStyle,ActivityIndicator,
  SafeAreaView
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';
import {images} from '../assets/images/images';
import { useNavigation } from '@react-navigation/native';
import { AuthScreens } from '../navigation/ScreenNames';
import { useAppDispatch } from '../redux/hook';
import { requestOtp } from '../redux/slices/authSlice';


const {width} = Dimensions.get('window');

const Login: React.FC = () => {
  const phoneInput = useRef<PhoneInput>(null);
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isFilled, setIsFilled] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // Track focus state
  const [loading, setLoading] = useState(false); 
  const dispatch = useAppDispatch();
  const handlePhoneNumberChange = (number: string) => {
    setIsFocused(true);
    setPhoneNumber(number);
    setIsFilled(number.length > 0);
  };

  const handleSendCode = async () => {
    setLoading(true); 
    try {
      // await dispatch(requestOtp({ phone: phoneNumber })).unwrap();
      navigation.navigate(AuthScreens.OtpScreen, { phoneNumber });
    } catch {
      console.log('Request OTP failed');
    } finally {
      setLoading(false);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={{flex:1,backgroundColor:colors.white}}>
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        {/* <Image source={images.logo} style={styles.logo} /> */}
         <images.Logo width={width * 0.3} height={width * 0.3} style={styles.logo} />
        <Text style={styles.heading}>Enter phone number for verification</Text>
        <Text style={styles.subheading}>
          We'll send you a verification code
        </Text>
        <PhoneInput
          ref={phoneInput}
          defaultValue={phoneNumber}
          defaultCode="AU" // Default country code: Australia (+61)
          layout="first"
          onChangeFormattedText={handlePhoneNumberChange}
          containerStyle={[
            styles.phoneContainer,
            isFocused && {borderColor: colors.purple}, // Change border color on focus
          ]}
          textContainerStyle={styles.textInput}
          textInputStyle={styles.textInputStyle}
          placeholder="Phone Number"
          textInputProps={{
            onFocus: () => setIsFocused(true),
            onBlur: () => setIsFocused(false),
            placeholderTextColor: 'gray',
          }}
        />

<TouchableOpacity
        style={[
          styles.button,
          isFilled ? styles.buttonFilled : styles.buttonOutlined,
        ]}
        onPress={handleSendCode}
        disabled={!isFilled || loading} // Disable button during loading
      >
        {loading ? (
          <ActivityIndicator color={colors.white} /> // Render spinner
        ) : (
          <Text
            style={[
              styles.buttonText,
              isFilled ? styles.buttonTextFilled : styles.buttonTextOutlined,
            ]}
          >
            Send Code
          </Text>
        )}
      </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback></SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  logo: {
    marginBottom: 30,
    alignSelf: 'center',
  },
  heading: {
    fontSize: typography.fontSize.large,
    fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
    color: colors.text.primary,
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
  },
  textInputStyle: {
    fontSize: typography.fontSize.medium,
    color: colors.text.primary,
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

export default Login;
