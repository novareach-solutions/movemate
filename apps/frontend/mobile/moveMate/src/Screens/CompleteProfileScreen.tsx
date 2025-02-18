import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardTypeOptions,
  SafeAreaView,
  TextStyle,
  ActivityIndicator,Alert,
  KeyboardAvoidingView,
  Platform,
  FlatList
} from 'react-native';
import Header from '../components/Header';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../redux/hook';
import { userSignup } from '../redux/slices/authSlice';
import { AuthScreens, CustomerScreens, HomeScreens } from '../navigation/ScreenNames';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formSchema } from '../utils/zod/signupValidation';
// import { fetchPlaceSuggestions } from '../api/mapboxAPI';
import { formStyles } from '../theme/form';
import { fetchPlaceSuggestions } from '../utils/fetchPlaceSuggestions';
import { RootNavigationProp, RootRouteProp } from '../navigation/type';


type FormFields = z.infer<typeof formSchema>;
type CompleteProfileProps = {
  route: RootRouteProp<'CompleteProfileScreen'>;
  navigation?: RootNavigationProp<'CompleteProfileScreen'>;
};

const CompleteProfileScreen: React.FC<CompleteProfileProps>  = ({route}) => {
  const {phoneNumber} = route.params;
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [focusedField, setFocusedField] = useState<string | null>(null);
const [loading, setLoading] = useState(false); 
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const address = watch("address");
  const suburb = watch("suburb");
  const state = watch("state");
  const postalCode = watch("postalCode");

  const handleAddressChange = async (text: string) => {
    setValue("address", text, { shouldValidate: true });

    if (text.length > 0) {
      const places = await fetchPlaceSuggestions(text);
      setSuggestions(places);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectAddress = (place: any) => {
    setValue("address", place.address, { shouldValidate: true });
    setValue("suburb", place.suburb, { shouldValidate: true });
    setValue("state", place.state, { shouldValidate: true });
    setValue("postalCode", place.postalCode, { shouldValidate: true });

    setShowSuggestions(false);
  };

  console.log('phoneNumber', phoneNumber)

  const onSubmit = async() => {

    const payload = {
      firstName: watch("firstName"),
      lastName: watch("lastName"),
      email: watch("email"),
      street: watch("address"),
      suburb: watch("suburb"),
      state: watch("state"),
      postalCode: Number(watch("postalCode")),
      phoneNumber:phoneNumber
    };

    console.log('payload', payload)

     setLoading(true); 
        try {
          await dispatch(userSignup(payload)).unwrap();
          // navigation.navigate(CustomerScreens.CustomerHomeScreen);
            // navigation.reset(({
            //         index: 0,
            //         routes: [{ name: CustomerScreens.CustomerHomeScreen }],
            //       }));
                  Alert.alert("Success", "Your account has been created!", [
                    { text: "OK", onPress: () =>  navigation.reset(({
                      index: 0,
                      routes: [{ name: 'MainApp'}],
                    }))}
                  ]);
                  
          // Alert.alert('Session Expired', 'Please log in again.');
        } catch {
          console.log('Request OTP failed');
        } finally {
          setLoading(false);
        }
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.lightGrey }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, padding: 16 }}>
            <Header logo bgColor={colors.lightGrey}/>
            <ScrollView contentContainerStyle={{ paddingBottom: 20,paddingTop:20 }}>
              <Text style={styles.title}>Complete your Profile</Text>
              <Text style={styles.subTitle}>Add your details to get started</Text>
              <View style={formStyles.inputWrapper}>
              <Text style={formStyles.inputLabel}>First Name</Text>
              <TextInput
                placeholder="Enter your first name"
                placeholderTextColor={colors.text.subText}
                style={[formStyles.input, errors.firstName && formStyles.errorInput,focusedField === "firstName" && { borderColor: colors.purple, borderWidth: 1 }]}
                onFocus={() => setFocusedField("firstName")}
                onBlur={() => setFocusedField(null)}
                onChangeText={(text) => setValue("firstName", text, { shouldValidate: true })}
              />
              {errors.firstName && <Text style={formStyles.errorText}>{errors.firstName.message}</Text>}
            </View>

            {/* Last Name */}
            <View style={formStyles.inputWrapper}>
              <Text style={formStyles.inputLabel}>Last Name</Text>
              <TextInput
                placeholder="Enter your last name"
                placeholderTextColor={colors.text.subText}
                style={[formStyles.input, errors.lastName && formStyles.errorInput,focusedField === "lastName" && { borderColor: colors.purple, borderWidth: 1 }]}
                onFocus={() => setFocusedField("lastName")}
                onBlur={() => setFocusedField(null)}
                onChangeText={(text) => setValue("lastName", text, { shouldValidate: true })}
              />
              {errors.lastName && <Text style={formStyles.errorText}>{errors.lastName.message}</Text>}
            </View>

            {/* Email Address */}
            <View style={formStyles.inputWrapper}>
              <Text style={formStyles.inputLabel}>Email Address</Text>
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor={colors.text.subText}
                keyboardType="email-address"
                autoCapitalize="none"
                style={[formStyles.input, errors.email && formStyles.errorInput,focusedField === "email" && { borderColor: colors.purple, borderWidth: 1 }]}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                onChangeText={(text) => {
                  setValue("email", text, { shouldValidate: true })}}
              />
              {errors.email && <Text style={formStyles.errorText}>{errors.email.message}</Text>}
            </View>

            {/* Address Input */}
            <View style={formStyles.inputWrapper}>
              <Text style={formStyles.inputLabel}>Street Address</Text>
              <TextInput
                placeholder="Enter your address"
                placeholderTextColor={colors.text.subText}
                style={[formStyles.input, errors.address && formStyles.errorInput,focusedField === "address" && { borderColor: colors.purple, borderWidth: 1 }]}
                onFocus={() => setFocusedField("address")}
                onBlur={() => setFocusedField(null)}
                onChangeText={handleAddressChange}
                value={address}
              />
              {errors.address && <Text style={formStyles.errorText}>{errors.address.message}</Text>}

              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <View style={formStyles.suggestionBox}>
                  <FlatList
                    data={suggestions}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={formStyles.suggestionItem}
                        onPress={() => handleSelectAddress(item)}
                      >
                        <Text style={formStyles.suggestionText}>{item.address}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
            </View>

            {/* Auto-fill Inputs */}
            <View style={formStyles.inputWrapper}>
              <Text style={formStyles.inputLabel}>Suburb</Text>
              <TextInput
                placeholder="Enter your suburb"
                placeholderTextColor={colors.text.subText}
                style={[formStyles.input, errors.suburb && formStyles.errorInput,focusedField === "suburb" && { borderColor: colors.purple, borderWidth: 1 }]}
                value={suburb}
                onFocus={() => setFocusedField("suburb")}
                onBlur={() => setFocusedField(null)}
                onChangeText={(text) => setValue("suburb", text, { shouldValidate: true })}
              />
            </View>

            <View style={formStyles.inputWrapper}>
              <Text style={formStyles.inputLabel}>State</Text>
              <TextInput
                placeholder="Enter your state"
                placeholderTextColor={colors.text.subText}
                style={[formStyles.input, errors.state && formStyles.errorInput,focusedField === "state" && { borderColor: colors.purple, borderWidth: 1 }]}
                onFocus={() => setFocusedField("state")}
                onBlur={() => setFocusedField(null)}
                value={state}
                onChangeText={(text) => setValue("state", text, { shouldValidate: true })}
              />
            </View>

            <View style={formStyles.inputWrapper}>
              <Text style={formStyles.inputLabel}>Postal Code</Text>
              <TextInput
                placeholder="Enter your postal code"
                placeholderTextColor={colors.text.subText}
                keyboardType="numeric"
                style={[formStyles.input, errors.postalCode && formStyles.errorInput,focusedField === "postalCode" && { borderColor: colors.purple, borderWidth: 1 }]}
                value={postalCode}
                onFocus={() => setFocusedField("postalCode")}
                onBlur={() => setFocusedField(null)}
                onChangeText={(text) => setValue("postalCode", text, { shouldValidate: true })}
              />
            </View>
          {/* </ScrollView> */}

          {/* Fixed Footer & Button */}
          <View style={formStyles.footerContainer}>
            <TouchableOpacity
              style={[formStyles.button, isValid ? formStyles.buttonEnabled : formStyles.buttonDisabled]}
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid}
            >
              <Text style={[formStyles.buttonText, isValid ? formStyles.buttonTextEnabled : formStyles.buttonTextDisabled]}>
                Continue
              </Text>
            </TouchableOpacity>

            <Text style={formStyles.footerText}>
              By continuing, you accept our <TouchableOpacity onPress={()=>navigation.navigate(AuthScreens.PrivacyPolicyScreen)}><Text style={formStyles.link}>Terms of Service</Text></TouchableOpacity> and <TouchableOpacity onPress={()=>navigation.navigate(AuthScreens.PrivacyPolicyScreen)}><Text style={formStyles.link}>Privacy Policy</Text></TouchableOpacity>
            </Text>
          </View>
       
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardAvoid: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  formContainer: {
    padding: 20,
  },
  inputLabel: {
    fontSize: typography.fontSize.semiMedium,
    fontWeight: typography.fontWeight.semiBold as TextStyle['fontWeight'],
    fontFamily: typography.fontFamily.regular,
    color: colors.text.primaryGrey,
    marginBottom: 7,
    
  },
  title: {
    fontSize: typography.fontSize.large,
    color: colors.text.primaryGrey,
    fontFamily: typography.fontFamily.regular,
    fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
  },
  subTitle: {
    fontSize: typography.fontSize.medium,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.subText,
    marginBottom: 50,
    marginTop: 10,
    fontWeight: typography.fontWeight.medium as TextStyle['fontWeight'],
  },
  inputWrapper: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    backgroundColor:colors.white,
    borderColor: colors.border.light,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    height:55,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    borderWidth: 1,
    borderColor: colors.purple,
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonEnabled: {
    backgroundColor: colors.purple,
  },
  buttonText: {
    color: colors.text.primaryGrey,
    fontSize: typography.fontSize.medium,
    fontFamily: typography.fontFamily.regular,
    fontWeight: typography.fontWeight.semiBold as TextStyle['fontWeight'],
  },
  buttonTextEnabled: {
    color: colors.white,
    fontSize: typography.fontSize.medium,
    fontWeight: typography.fontWeight.semiBold as TextStyle['fontWeight'],
    fontFamily: typography.fontFamily.regular,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: typography.fontSize.small,
    color: colors.text.primaryGrey,
    fontFamily: typography.fontFamily.regular,
    fontWeight: typography.fontWeight.regular as TextStyle['fontWeight'],
    textAlign: 'center',
    marginHorizontal: 25,
  },
  link: {
    color: 'purple',
    textDecorationLine: 'underline',
    fontSize: typography.fontSize.small,
  },
});

export default CompleteProfileScreen;
