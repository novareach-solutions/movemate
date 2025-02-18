import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {colors} from '../theme/colors';
import {formStyles} from '../theme/form';
import TitleDescription from '../components/TitleDescription';
import PhotoPickerModal from '../components/common/PhotoPickerModal';
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';
import {DeliverAPackage} from '../navigation/ScreenNames';
import Header from '../components/Header';
import {SimpleToast} from '../utils/helpers';
import {uploadAgentDoc} from '../redux/slices/authSlice';
import {useAppDispatch} from '../redux/hook';
interface DocumentReviewProps {
  route: {
    params: {
      title: string;
      uploadedImage: string;
      onUploadSuccess: () => any;
      value: string;
    };
  };
}

const DocumentReviewScreen: React.FC<DocumentReviewProps> = ({route}) => {
  const {title, uploadedImage, onUploadSuccess, value} = route.params;
  const [image, setImage] = useState(uploadedImage);
  const [isPhotoOptionVisible, setIsPhotoOptionVisible] = useState(false);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handleSubmit = async () => {
    const payload = {
      name: value,
      description: `${title} front and back`,
      url: image,
    };

    try {
      await dispatch(uploadAgentDoc(payload)).unwrap();
      SimpleToast('Document uploaded successfully!', true);

      // Notify the parent screen of the success
      onUploadSuccess && onUploadSuccess(title);

      // Navigate to DeliverAPackage.UploadDocuments
      navigation.navigate(DeliverAPackage.UploadDocuments);
    } catch (error) {
      SimpleToast('Failed to upload the document. Please try again.', true);
      navigation.goBack();
    }
    navigation.navigate(DeliverAPackage.UploadDocuments);
  };

  const handleRetry = () => {
    setIsPhotoOptionVisible(true);
  };

  const handleTakePhoto = () => {
    // Placeholder for taking a new photo
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
      })
      .catch(error => {
        console.log('Gallery error:', error);
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header logo isBack />
      <View style={styles.container}>
        <TitleDescription
          title={title}
          description="Review your uploaded document below"
        />
        <View style={styles.imageContainer}>
          <Image
            source={
              image
                ? {uri: image}
                : require('../assets/icons/placeHolderProfile.svg')
            }
            style={styles.image}
          />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              formStyles.button,
              styles.halfButton,
              {
                borderWidth: 1,
                borderColor: colors.purple,
              },
            ]}
            onPress={handleRetry}>
            <Text style={formStyles.buttonText}>Retry</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              formStyles.button,
              formStyles.buttonEnabled,
              styles.halfButton,
            ]}
            onPress={handleSubmit}>
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
        isVisible={isPhotoOptionVisible}
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
