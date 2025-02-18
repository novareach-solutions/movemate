import React, {useState} from 'react';
import DocumentUpload from '../../components/DocumentUpload';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {AppScreens, AppScreensParamList} from '../../navigation/ScreenNames';
import {SafeAreaView} from 'react-native';
import Header from '../../components/Header';
import PhotoPickerModal from '../../components/common/PhotoPickerModal';
import ImagePicker from 'react-native-image-crop-picker';
import {colors} from '../../theme/colors';
import { requestCameraPermission, requestPhotoLibraryPermission } from '../../utils/helpers';

const DAPUploadDocumentDetailsScreen = () => {
  const route = useRoute();
  const {title, value} = route.params;
  const navigation = useNavigation<NavigationProp<AppScreensParamList>>();
  const [image, setImage] = useState('');
  const [isPhotoOptionVisible, setIsPhotoOptionVisible] = useState(false);

  const handleUpload = () => {
    setIsPhotoOptionVisible(true);
  };

  const handleTakePhoto = async () => {
    // console.log('Opening camera...');
  
    // // Request camera permission
    // const hasPermission = await requestCameraPermission();
    // console.log('Camera permission granted:', hasPermission);
  
    // if (!hasPermission) {
    //   console.log('Permission denied. Cannot open camera.');
    //   return;
    // }
  
    try {
      // Open camera
      const photo = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      });
  
      console.log('Captured Image:', photo.path);
  
      // Set image and navigate
      setImage(photo.path);
      navigation.navigate(AppScreens.DocumentReview, {
        title,
        value,
        uploadedImage: photo.path,
      });
  
      // Close modal AFTER capturing photo
      setIsPhotoOptionVisible(false);
    } catch (error) {
      console.log('Camera error:', error);
    }
  };

  const handleChooseFromGallery = async () => {
    console.log('Opening gallery picker...');
  
    // Check for permission
    const hasPermission = await requestPhotoLibraryPermission();
    console.log('Gallery permission granted:', hasPermission);
  
    if (!hasPermission) {
      console.log('Permission denied. Cannot open gallery.');
      return;
    }
  
    try {
      // Clean up previous selections (prevents caching issues)
      await ImagePicker.clean();
      
      // Open gallery picker
      const photo = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
  
      console.log('Selected Image:', photo.path);
  
      // Set image and navigate
      setImage(photo.path);
      navigation.navigate(AppScreens.DocumentReview, {
        title,
        value,
        uploadedImage: photo.path,
      });

       /*
  //       const formData = new FormData();
  //       formData.append('file', {
  //         uri: photo.path,
  //         type: photo.mime,
  //         name: photo.filename || `photo_${Date.now()}.jpg`,
  //       });

  //       dispatch(uploadMedia(formData))
  //         .unwrap()
  //         .then(response => {
  //           if (response) {
  //             const uploadedImage = response.url;
  //             navigation.navigate(AppScreens.DocumentReview, { title, uploadedImage });
  //           }
  //         })
  //         .catch(error => {
  //           console.error('Upload failed:', error);
  //         });
  //       */
  
      // Close modal AFTER selection
      setIsPhotoOptionVisible(false);
    } catch (error) {
      console.log('Gallery error:', error);
    }
  };
  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
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
      {isPhotoOptionVisible && (
        <PhotoPickerModal
          isVisible={isPhotoOptionVisible}
          onClose={() => setIsPhotoOptionVisible(false)}
          onTakePhoto={handleTakePhoto}
          onChooseFromGallery={handleChooseFromGallery}
        />
      )}
    </SafeAreaView>
  );
};

export default DAPUploadDocumentDetailsScreen;
