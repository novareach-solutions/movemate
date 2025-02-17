import React, { useState } from "react";
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
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Header from "../components/Header";
import { colors } from "../theme/colors";
import { typography } from "../theme/typography";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../redux/hook";
import { userSignup } from "../redux/slices/authSlice";
import { CustomerScreens } from "../navigation/ScreenNames";
type FormFields = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  suburb: string;
  state: string;
  postalCode: string;
};

type Errors = Partial<Record<keyof FormFields, string>>;

const CompleteProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormFields>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    suburb: "",
    state: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [focusedField, setFocusedField] = useState<keyof FormFields | null>(
    null,
  );

  // const validateForm = () => {
  //   const newErrors: Errors = {};
  //   if (!form.firstName) newErrors.firstName = 'First Name is required';
  //   if (!form.lastName) newErrors.lastName = 'Last Name is required';
  //   if (!form.email) newErrors.email = 'Email is required';
  //   if (!form.address) newErrors.address = 'Street Address is required';
  //   if (!form.suburb) newErrors.suburb = 'Suburb is required';
  //   if (!form.state) newErrors.state = 'State is required';
  //   if (!form.postalCode) {
  //     newErrors.postalCode = 'Postal Code is required';
  //   } else if (!/^\d+$/.test(form.postalCode)) {
  //     newErrors.postalCode = 'Postal Code must be numeric';
  //   }
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleSubmit = async () => {
    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      street: form.address,
      suburb: form.suburb,
      state: form.state,
      postalCode: Number(form.postalCode),
    };
    setLoading(true);
    try {
      // await dispatch(userSignup(payload)).unwrap();
      navigation.navigate(CustomerScreens.CustomerHomeScreen);
      // Alert.alert('Session Expired', 'Please log in again.');
    } catch {
      console.log("Request OTP failed");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormFields, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear error for this field
  };

  const inputFields: {
    label: string;
    field: keyof FormFields;
    keyboardType?: KeyboardTypeOptions;
  }[] = [
    { label: "First Name", field: "firstName" },
    { label: "Last Name", field: "lastName" },
    { label: "Email Address", field: "email", keyboardType: "email-address" },
    { label: "Street Address", field: "address" },
    { label: "Suburb", field: "suburb" },
    { label: "State", field: "state" },
    { label: "Postal Code", field: "postalCode", keyboardType: "numeric" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Header logo />

            <ScrollView contentContainerStyle={styles.formContainer}>
              <Text style={styles.title}>Complete your Profile</Text>
              <Text style={styles.subTitle}>
                Add your details to get started
              </Text>

              {inputFields.map((input, index) => (
                <View key={index} style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>{input.label}</Text>
                  <TextInput
                    placeholder={`Enter your ${input.label.toLowerCase()}`}
                    style={[
                      styles.input,
                      focusedField === input.field && {
                        borderColor: colors.purple,
                      },
                      errors[input.field] && { borderColor: colors.error },
                    ]}
                    placeholderTextColor={colors.grey}
                    onFocus={() => setFocusedField(input.field)}
                    onBlur={() => setFocusedField(null)}
                    keyboardType={input.keyboardType || "default"}
                    value={form[input.field]}
                    onChangeText={(text) =>
                      handleInputChange(input.field, text)
                    }
                  />
                  {errors[input.field] && (
                    <Text style={styles.errorText}>{errors[input.field]}</Text>
                  )}
                </View>
              ))}

              <TouchableOpacity
                style={[
                  styles.button,
                  Object.values(form).every((value) => value) &&
                    styles.buttonEnabled,
                ]}
                onPress={handleSubmit}
                disabled={
                  !Object.values(form).every((value) => value) || loading
                }
              >
                {loading ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  <Text
                    style={[
                      styles.buttonText,
                      Object.values(form).every((value) => value) &&
                        styles.buttonTextEnabled,
                    ]}
                  >
                    Sign Up
                  </Text>
                )}
              </TouchableOpacity>

              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  By continuing you accept our{" "}
                  <Text style={styles.link}>Terms of Service</Text> and{" "}
                  <Text
                    style={styles.link}
                    onPress={() =>
                      navigation.navigate(AuthScreens.PrivacyPolicyScreen)
                    }
                  >
                    Privacy Policy
                  </Text>
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
    backgroundColor: "#F8F8F8",
  },
  formContainer: {
    padding: 20,
  },
  inputLabel: {
    fontSize: typography.fontSize.medium,
    fontWeight: typography.fontWeight.semiBold as TextStyle["fontWeight"],
    fontFamily: typography.fontFamily.regular,
    color: colors.text.primaryGrey,
    marginBottom: 7,
  },
  title: {
    fontSize: typography.fontSize.large,
    color: colors.text.primaryGrey,
    fontFamily: typography.fontFamily.regular,
    fontWeight: typography.fontWeight.bold as TextStyle["fontWeight"],
  },
  subTitle: {
    fontSize: typography.fontSize.medium,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.subText,
    marginBottom: 20,
    marginTop: 10,
    fontWeight: typography.fontWeight.medium as TextStyle["fontWeight"],
  },
  inputWrapper: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
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
    alignItems: "center",
  },
  buttonEnabled: {
    backgroundColor: colors.purple,
  },
  buttonText: {
    color: colors.text.primaryGrey,
    fontSize: typography.fontSize.medium,
    fontFamily: typography.fontFamily.regular,
    fontWeight: typography.fontWeight.semiBold as TextStyle["fontWeight"],
  },
  buttonTextEnabled: {
    color: colors.white,
    fontSize: typography.fontSize.medium,
    fontWeight: typography.fontWeight.semiBold as TextStyle["fontWeight"],
    fontFamily: typography.fontFamily.regular,
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: typography.fontSize.small,
    color: colors.text.primaryGrey,
    fontFamily: typography.fontFamily.regular,
    fontWeight: typography.fontWeight.regular as TextStyle["fontWeight"],
    textAlign: "center",
    marginHorizontal: 25,
  },
  link: {
    color: "purple",
    textDecorationLine: "underline",
  },
});

export default CompleteProfileScreen;
