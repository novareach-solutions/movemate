import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import StepIndicator from '../../components/StepIndicator';
import TitleDescription from '../../components/TitleDescription';
import UploadPhoto from '../../components/UploadPhoto';
import {colors} from '../../theme/colors';
import {formStyles} from '../../theme/form';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { agentSignup, setSignupData } from '../../redux/slices/authSlice';
// import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';

const AddProfilePhotoScreen: React.FC = () => {
  // const navigation = useNavigation();
  const [image,setImage] =  useState('');
 const dispatch = useAppDispatch();
   const signupData = useAppSelector((state) => state.auth.signupData);
  const handleUpload = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });


    console.log('Upload button pressed');
    const profilePhotoDetails = {
      profilePhoto: 'https://example.com/profile-photo1.jpg',
    };

    dispatch(setSignupData(profilePhotoDetails));
    // Logic for opening the file picker or camera
  };

  const handleContinue = async() => {
    if (signupData) {
       try {
              await dispatch(agentSignup(signupData)).unwrap();
              console.log('Signup Success');

              // Navigate to the otp screen
              // navigation.navigate(AuthScreens.SelectService);
            } catch {
              console.log('Signup failed');
            }
          }
    console.log('Continue button pressed');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StepIndicator current={4} total={4} />
        <TitleDescription
          title="Add your Profile Photo"
          description="We encourage you to upload a latest picture"
        />
        <UploadPhoto onUpload={handleUpload} image={image} />
      </View>
      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[formStyles.button, formStyles.buttonEnabled]}
          onPress={handleContinue}>
          <Text style={[formStyles.buttonText, formStyles.buttonTextEnabled]}>
            Continue
          </Text>
        </TouchableOpacity>
        <Text style={formStyles.footerText}>
          By continuing you accept our{' '}
          <Text style={formStyles.link}>Terms of Service</Text> and{' '}
          <Text style={formStyles.link}>Privacy Policy</Text>
        </Text>
      </View>
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
    backgroundColor: colors.white,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border.primary,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
});

export default AddProfilePhotoScreen;
