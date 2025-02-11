import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { formStyles } from '../theme/form';
import TitleDescription from './TitleDescription';
import { colors } from '../theme/colors';
import { ZCreateAccountSchema } from '../utils/zod/Registration';
import { fetchPlaceSuggestions } from '../utils/fetchPlaceSuggesttions';

type FormFields = z.infer<typeof ZCreateAccountSchema>;

interface ProfileFormProps {
  title: string;
  description: string;
  onSubmit: (formData: FormFields) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  title,
  description,
  onSubmit,
}) => {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormFields>({
    resolver: zodResolver(ZCreateAccountSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      suburb: '',
      state: '',
      postalCode: '',
      role: 'AGENT', // Added default value for role so it passes validation
    },
  });

  // Log errors and validity whenever they change
  useEffect(() => {
    console.log('Form errors:', errors);
    console.log('Form is valid:', isValid);
  }, [errors, isValid]);

  // Log all form values on each render
  useEffect(() => {
    console.log('Current form values:', {
      firstName: watch('firstName'),
      lastName: watch('lastName'),
      email: watch('email'),
      address: watch('address'),
      suburb: watch('suburb'),
      state: watch('state'),
      postalCode: watch('postalCode'),
      role: watch('role'),
    });
  });

  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const address = watch('address');
  const suburb = watch('suburb');
  const state = watch('state');
  const postalCode = watch('postalCode');

  const handleAddressChange = async (text: string) => {
    console.log('handleAddressChange - text:', text);
    setValue('address', text, { shouldValidate: true, shouldTouch: true });

    if (text.length > 2) {
      const places = await fetchPlaceSuggestions(text);
      console.log('Fetched suggestions:', places);
      setSuggestions(places);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectAddress = (place: any) => {
    console.log('Selected address:', place);
    setValue('address', place.address, { shouldValidate: true });
    setValue('suburb', place.suburb, { shouldValidate: true });
    setValue('state', place.state, { shouldValidate: true });
    setValue('postalCode', place.postalCode, { shouldValidate: true });

    setShowSuggestions(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <TitleDescription title={title} description={description} />

            {/* First Name */}
            <View style={formStyles.inputWrapper}>
              <Text style={formStyles.inputLabel}>First Name</Text>
              <TextInput
                placeholder="Enter your first name"
                placeholderTextColor={colors.text.subText}
                style={[
                  formStyles.input,
                  errors.firstName && formStyles.errorInput,
                ]}
                onChangeText={(text) =>
                  setValue('firstName', text, {
                    shouldValidate: true,
                    shouldTouch: true,
                  })
                }
              />
              {errors.firstName && (
                <Text style={formStyles.errorText}>
                  {errors.firstName.message}
                </Text>
              )}
            </View>

            {/* Last Name */}
            <View style={formStyles.inputWrapper}>
              <Text style={formStyles.inputLabel}>Last Name</Text>
              <TextInput
                placeholder="Enter your last name"
                placeholderTextColor={colors.text.subText}
                style={[
                  formStyles.input,
                  errors.lastName && formStyles.errorInput,
                ]}
                onChangeText={(text) =>
                  setValue('lastName', text, {
                    shouldValidate: true,
                    shouldTouch: true,
                  })
                }
              />
              {errors.lastName && (
                <Text style={formStyles.errorText}>
                  {errors.lastName.message}
                </Text>
              )}
            </View>

            {/* Email Address */}
            <View style={formStyles.inputWrapper}>
              <Text style={formStyles.inputLabel}>Email Address</Text>
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor={colors.text.subText}
                keyboardType="email-address"
                style={[
                  formStyles.input,
                  errors.email && formStyles.errorInput,
                ]}
                onChangeText={(text) =>
                  setValue('email', text, {
                    shouldValidate: true,
                    shouldTouch: true,
                  })
                }
              />
              {errors.email && (
                <Text style={formStyles.errorText}>
                  {errors.email.message}
                </Text>
              )}
            </View>

            {/* Address Input */}
            <View style={formStyles.inputWrapper}>
              <Text style={formStyles.inputLabel}>Street Address</Text>
              <TextInput
                placeholder="Enter your address"
                placeholderTextColor={colors.text.subText}
                style={[
                  formStyles.input,
                  errors.address && formStyles.errorInput,
                ]}
                onChangeText={handleAddressChange}
                value={address}
              />
              {errors.address && (
                <Text style={formStyles.errorText}>
                  {errors.address.message}
                </Text>
              )}

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
                        <Text style={formStyles.suggestionText}>
                          {item.address}
                        </Text>
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
                style={[
                  formStyles.input,
                  errors.suburb && formStyles.errorInput,
                ]}
                value={suburb}
                onChangeText={(text) =>
                  setValue('suburb', text, {
                    shouldValidate: true,
                    shouldTouch: true,
                  })
                }
              />
            </View>

            <View style={formStyles.inputWrapper}>
              <Text style={formStyles.inputLabel}>State</Text>
              <TextInput
                placeholder="Enter your state"
                placeholderTextColor={colors.text.subText}
                style={[
                  formStyles.input,
                  errors.state && formStyles.errorInput,
                ]}
                value={state}
                onChangeText={(text) =>
                  setValue('state', text, {
                    shouldValidate: true,
                    shouldTouch: true,
                  })
                }
              />
            </View>

            <View style={formStyles.inputWrapper}>
              <Text style={formStyles.inputLabel}>Postal Code</Text>
              <TextInput
                placeholder="Enter your postal code"
                placeholderTextColor={colors.text.subText}
                keyboardType="numeric"
                style={[
                  formStyles.input,
                  errors.postalCode && formStyles.errorInput,
                ]}
                value={postalCode}
                onChangeText={(text) =>
                  setValue('postalCode', text.replace(/[^0-9]/g, ''), {
                    shouldValidate: true,
                    shouldTouch: true,
                  })
                }
              />
              {errors.postalCode && (
                <Text style={formStyles.errorText}>
                  {errors.postalCode.message}
                </Text>
              )}
            </View>
          </ScrollView>

          {/* Fixed Footer & Button */}
          <View>
            <TouchableOpacity
              style={[
                formStyles.button,
                isValid ? formStyles.buttonEnabled : formStyles.buttonDisabled,
              ]}
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid}
            >
              <Text
                style={[
                  formStyles.buttonText,
                  isValid
                    ? formStyles.buttonTextEnabled
                    : formStyles.buttonTextDisabled,
                ]}
              >
                Continue
              </Text>
            </TouchableOpacity>

            <Text style={formStyles.footerText}>
              By continuing, you accept our{' '}
              <Text style={formStyles.link}>Terms of Service</Text> and{' '}
              <Text style={formStyles.link}>Privacy Policy</Text>
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ProfileForm;
