import React, { useState } from 'react';
import DocumentUpload from '../../components/DocumentUpload';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppScreens } from '../../navigation/ScreenNames';
import { SafeAreaView } from 'react-native';
import Header from '../../components/Header';
import PhotoPickerModal from '../../components/common/PhotoPickerModal';
import ImagePicker from 'react-native-image-crop-picker';

const DAPUploadDocumentDetailsScreen = () => {
  const route = useRoute();
  const { title } = route.params as { title: string };
  const navigation = useNavigation();
  const [image, setImage] = useState('');
  const [isPhotoOptionVisible, setIsPhotoOptionVisible] = useState(false);

  const handleUpload = () => {
    setIsPhotoOptionVisible(true);
  };

  const handleTakePhoto = () => {
    // Placeholder for camera functionality
  };

  const handleChooseFromGallery = () => {
    setIsPhotoOptionVisible(false);
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(photo => {
        setImage(photo.path);
        // Navigation will happen without uploading
        navigation.navigate(AppScreens.DocumentReview, {
          title,
          uploadedImage: photo.path, // Passing selected image to review screen
        });

        // Commented out the API call
        /*
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
              const uploadedImage = response.url;
              navigation.navigate(AppScreens.DocumentReview, { title, uploadedImage });
            }
          })
          .catch(error => {
            console.error('Upload failed:', error);
          });
        */
      })
      .catch(error => {
        console.log('Gallery error:', error);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header logo isBack />
      <DocumentUpload
        title={title}
        guidelines={[
          'Accepted: Passport, Medicare card, or government-issued ID card.',
          'Validity: Must be current and not expired.',
          'File Types: PDF, JPEG, PNG (max 5MB).',
          'Confidentiality: Your document will be securely stored and used only for verification.',
        ]}
        uploadInstructions={[
          'Scan or photograph your ID proof.',
          'Ensure all details are clearly visible.',
          'Click "Upload" to submit your document.',
        ]}
        onUpload={handleUpload}
      />
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

export default DAPUploadDocumentDetailsScreen;
