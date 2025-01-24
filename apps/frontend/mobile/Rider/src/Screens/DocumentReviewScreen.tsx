import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { colors } from '../theme/colors';
import { formStyles } from '../theme/form';
import StepIndicator from '../components/StepIndicator';
import TitleDescription from '../components/TitleDescription';
import PhotoPickerModal from '../components/common/PhotoPickerModal';
import ImagePicker from 'react-native-image-crop-picker';
import { uploadAgentDoc, uploadMedia } from '../redux/slices/authSlice';
import { useAppDispatch } from '../redux/hook';
interface DocumentReviewProps {
  route: {
    params: {
      title: string;
      uploadedImage: string;
    };
  };
}

const DocumentReviewScreen: React.FC<DocumentReviewProps> = ({ route }) => {
  const { title, uploadedImage } = route.params;
  const [image, setImage] = useState(uploadedImage);
  const [isPhotoOptionVisible, setIsPhotoOptionVisible] = useState(false);
  const dispatch = useAppDispatch();
  const documents = [
    { id: '1', title: 'Police Verification', value: "POLICE_VERIFICATION" },
    { id: '2', title: 'Driver’s License', value: "DRIVER_LICENSE" },
    { id: '3', title: 'Australian ID Proof', value: "AUSTRALIAN_ID_PROOF" },
  ];
  
  const handleSubmit = async () => {
    // Find the document object matching the provided title
    const selectedDocument = documents.find(doc => doc.title === title);
  
    // If a matching document is found, use its value; otherwise, default to a generic name
    const payload = {
      name: selectedDocument ? selectedDocument.value : 'UNKNOWN_DOCUMENT',
      description: selectedDocument 
        ? `${selectedDocument.title} front and back` 
        : 'Unknown document',
      url: image
    };

  
    try {
      await dispatch(uploadAgentDoc(payload)).unwrap();
      // navigate to success screen
      console.log('Agent Doc upload successful');
      // Navigate to the OTP screen or desired screen
    } catch (error) {
      console.log('Request Otp failed', error);
    }
  };
  

  const handleRetry = () => {
    setIsPhotoOptionVisible(true)
    console.log('Retry')
  }

  const handleTakePhoto = () => { }

  const handleChooseFromGallery = () => {
    setIsPhotoOptionVisible(false);
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((photo) => {
      // Construct FormData for upload
      const formData = new FormData();
      formData.append('file', {
        uri: photo.path, // Use the file path
        type: photo.mime, // File type (e.g., image/jpeg)
        name: photo.filename || `photo_${Date.now()}.jpg`, // Use filename or fallback to a generated one
      });

      // Perform the upload via Redux or direct API call
      dispatch(uploadMedia(formData))
        .unwrap()
        .then((response) => {
          if (response) {
            setImage(response?.location)
          }
        })
        .catch((error) => {
          console.error('Upload failed:', error);
        });

    }).catch((error) => {
      console.log('Gallery error:', error);
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TitleDescription
          title={title}
          description="Review your uploaded document below"
        />
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={[formStyles.button, styles.halfButton]} onPress={handleRetry}>
            <Text style={formStyles.buttonText}>Retry</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              formStyles.button,
              formStyles.buttonEnabled,
              styles.halfButton,
            ]} onPress={handleSubmit}
          >
            <Text style={[formStyles.buttonText, formStyles.buttonTextEnabled]}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: 200,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  halfButton: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default DocumentReviewScreen;
