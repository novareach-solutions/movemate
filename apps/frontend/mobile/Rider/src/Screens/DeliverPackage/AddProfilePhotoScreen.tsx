import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
} from 'react-native';
import StepIndicator from '../../components/StepIndicator';
import TitleDescription from '../../components/TitleDescription';
import UploadPhoto from '../../components/UploadPhoto';
import {colors} from '../../theme/colors';
import {formStyles} from '../../theme/form';
import {useAppDispatch, useAppSelector} from '../../redux/hook';
import {
  setSignupData,
  uploadMedia,
} from '../../redux/slices/authSlice';
import ImagePicker from 'react-native-image-crop-picker';
import PhotoPickerModal from '../../components/common/PhotoPickerModal';
import Header from '../../components/Header';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  AuthScreens,
  DeliverAPackage,
  DeliverAPackageParamList,
} from '../../navigation/ScreenNames';

const AddProfilePhotoScreen: React.FC = () => {
  const [image, setImage] = useState('');
  const [isPhotoOptionVisible, setIsPhotoOptionVisible] = useState(false);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<any>>();

  const signupData = useAppSelector(state => state.auth.signupData);
  const handleUpload = () => {
    setIsPhotoOptionVisible(true);

    console.log('Upload button pressed');
    const profilePhotoDetails = {
      profilePhoto: 'https://example.com/profile-photo1.jpg',
    };

    dispatch(setSignupData(profilePhotoDetails));
  };

  const handleTakePhoto = () => {
    setIsPhotoOptionVisible(false);
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(photo => {
        const formData = new FormData();
        formData.append('file', {
          uri: photo.path,
          type: photo.mime,
          name: photo.filename || `photo_${Date.now()}.jpg`,
        });

        dispatch(uploadMedia(formData))
          .unwrap()
          .then(response => {
            if (response) {
              const profilePhotoDetails = {
                profilePhoto: response?.url,
              };

              dispatch(setSignupData(profilePhotoDetails));
            }
          })
          .catch(error => {
            console.error('Upload failed:', error);
          });
        setImage(photo.path);
      })
      .catch(error => {
        console.log('Camera error:', error);
      });
  };

  const handleChooseFromGallery = () => {
    setIsPhotoOptionVisible(false);
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(photo => {
        const formData = new FormData();
        formData.append('file', {
          uri: photo.path, 
          type: photo.mime, 
          name: photo.filename || `photo_${Date.now()}.jpg`,
        });

        // Perform the upload via Redux or direct API call
        dispatch(uploadMedia(formData))
          .unwrap()
          .then(response => {
            console.log('success', response);
            if (response) {
              const profilePhotoDetails = {
                profilePhoto: response?.url,
              };

              dispatch(setSignupData(profilePhotoDetails));
            }
          })
          .catch(error => {
            console.error('Upload failed:', error);
          });
        setImage(photo.path);
      })
      .catch(error => {
        console.log('Gallery error:', error);
      });
  };

  const handleContinue = async () => {
    if (signupData) {
      try {
        // await dispatch(agentSignup(signupData)).unwrap();
        // Navigate to DeliverPackage.home on success
        navigation.navigate(DeliverAPackage.UploadDocuments);
      } catch {
        console.log('Signup failed');
        // Navigate to Appscreen.onboarding on failure
        navigation.navigate(AuthScreens.Onboarding);
      }
    }
    console.log('Continue button pressed');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header logo isBack />
      <View style={styles.container}>
        <StepIndicator current={4} total={5} />
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
            Create Account
          </Text>
        </TouchableOpacity>
        <Text style={formStyles.footerText}>
          By continuing you accept our{' '}
          <Text style={formStyles.link}>Terms of Service</Text> and{' '}
          <Text style={formStyles.link}>Privacy Policy</Text>
        </Text>
      </View>
      {/* Photo Options Modal */}
      <PhotoPickerModal
        visible={isPhotoOptionVisible}
        onClose={() => setIsPhotoOptionVisible(false)}
        onTakePhoto={handleTakePhoto}
        onChooseFromGallery={handleChooseFromGallery}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
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