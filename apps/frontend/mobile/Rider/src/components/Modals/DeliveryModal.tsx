import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  TextStyle,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../theme/colors';
import { formStyles } from '../../theme/form';
import { typography } from '../../theme/typography';
import { images } from '../../assets/images/images';
import { SendPackageOrder } from '../../redux/slices/types/sendAPackage';
import { uploadMedia } from '../../redux/slices/authSlice';
import {
  completeOrder,
  fetchOngoingOrder,
  updateItemVerifiedPhoto,
  uploadProofOfDelivery,
} from '../../redux/slices/orderSlice';
import ConfirmPhotoModal from './ConfirmPhotoModal';
import PhotoPickerModal from '../common/PhotoPickerModal';
import { RootState } from '../../redux/store';
import { useNavigation } from '@react-navigation/native';
import { DeliverAPackage } from '../../navigation/ScreenNames';

interface DeliveryModalProps {
  isVisible: boolean;
  onClose: () => void;
  order: SendPackageOrder;
}

const DeliveryModal: React.FC<DeliveryModalProps> = ({
  isVisible,
  onClose,
  order,
}) => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [isConfirmPhotoVisible, setIsConfirmPhotoVisible] = useState(false);
  const [isPhotoOptionVisible, setIsPhotoOptionVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigation=useNavigation()

  const currentOrder = useSelector(
    (state: RootState) => state.order.ongoingOrder
  );

  const dispatch = useDispatch();

  // ------------------
  // OPEN PHOTO PICKER
  // ------------------
  const openPhotoPickerModal = () => {
    setIsPhotoOptionVisible(true);
  };

  // ------------------
  // TAKE PHOTO
  // ------------------
  const handleTakePhoto = () => {
    setIsPhotoOptionVisible(false);
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(async (photo) => {
        await uploadAndSetPhoto(photo);
      })
      .catch((error) => {
        console.log('Camera error:', error);
        Alert.alert('Error', 'Failed to take photo. Please try again.');
      });
  };

  // ------------------
  // CHOOSE FROM GALLERY
  // ------------------
  const handleChooseFromGallery = () => {
    setIsPhotoOptionVisible(false);
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(async (photo) => {
        await uploadAndSetPhoto(photo);
      })
      .catch((error) => {
        console.log('Gallery error:', error);
        Alert.alert('Error', 'Failed to select photo. Please try again.');
      });
  };

  // -----------------------------------
  // UPLOAD PHOTO => SHOW CONFIRM MODAL
  // -----------------------------------
  const uploadAndSetPhoto = async (photo: any) => {
    const formData = new FormData();
    formData.append('file', {
      uri: photo.path,
      type: photo.mime,
      name: photo.filename || `photo_${Date.now()}.jpg`,
    });

    try {
      const response = await dispatch(uploadMedia(formData)).unwrap();
      if (response && response.url) {
        setSelectedImage(photo.path);
        setUploadedImageUrl(response.url);
        setIsConfirmPhotoVisible(true);
      } else {
        Alert.alert('Upload Failed', 'No URL returned from the server.');
      }
    } catch (error: any) {
      console.error('Upload failed:', error);
      Alert.alert('Upload Failed', error.message || 'Please try again.');
    }
  };

  // ------------------
  // RETRY
  // ------------------
  const handleRetry = () => {
    setIsConfirmPhotoVisible(false);
    setIsPhotoOptionVisible(true);
  };

  // ------------------
  // DONE
  // ------------------
  const handleDone = async () => {
    if (!uploadedImageUrl) {
      Alert.alert('Error', 'No image uploaded.');
      return;
    }
    try {
      // Example: Here we call uploadProofOfDelivery. Adjust as needed:
      await dispatch(
        uploadProofOfDelivery({ orderId: order.id, url: uploadedImageUrl })
      ).unwrap();

      // Optionally refresh:
      await dispatch(fetchOngoingOrder()).unwrap();
    } catch (error) {
      console.error('Failed to upload proof of delivery:', error);
      Alert.alert('Error', 'Failed to upload proof of delivery.');
    }
    setIsConfirmPhotoVisible(false);
  };

  // ------------------
  // VIEW PHOTO
  // ------------------
  const handleViewPhoto = () => {
    // If there's a final "completionPhoto" from the order, use that
    // or if you'd prefer the local "uploadedImageUrl"
    const finalPhotoUrl = currentOrder?.completionPhoto || uploadedImageUrl;

    if (!finalPhotoUrl) {
      Alert.alert('Error', 'No photo to view.');
      return;
    }
    setSelectedImage(finalPhotoUrl);
    setIsConfirmPhotoVisible(true);
  };

  // -----------------------
  // ORDER DELIVERED (OPT'L)
  // -----------------------
  const handleOrderDelivered = async () => {
    try {
      // Dispatch the completeOrder thunk
      await dispatch(completeOrder({ orderId: currentOrder.id })).unwrap();
  
      // On success, navigate to EarningsDetails
      navigation.navigate(DeliverAPackage.EarningsDetails);
    } catch (error) {
      console.error('Error completing order:', error);
      // The slice already shows an alert on error, but you could do another if desired
    }
  };

  // If there's a final photo on the server or local, show "View Photo"
  const hasPhoto = !!currentOrder?.completionPhoto;

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
      transparent
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header Section */}
          <View style={styles.header}>
            <View>
              <Text style={styles.driverName}>
                {order.customer?.firstName}
              </Text>
              <Text style={styles.deliveryAddress}>
                {order.dropLocation?.addressLine1}
              </Text>
            </View>
            <View style={styles.headerIcons}>
              <TouchableOpacity>
                <Image source={images.phone} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={images.message} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Delivery Instructions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Delivery Instructions</Text>
            <View style={styles.instructionsContainer}>
              <Text style={styles.instructionText}>
                {order.deliveryInstructions}
              </Text>
            </View>
          </View>

          {/* Items to Deliver */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Items to Deliver</Text>
            <Text style={styles.itemText}>• {order.packageType}</Text>
          </View>

          {/* Proof of Delivery */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Proof of Delivery</Text>
            <Text style={styles.proofText}>Take a photo to confirm delivery</Text>

            {/* CHANGED LOGIC: show 'View Photo' or 'Take Photo' */}
            <TouchableOpacity
              style={hasPhoto ? styles.viewPhotoButton : [formStyles.button, formStyles.buttonEnabled]}
              onPress={hasPhoto ? handleViewPhoto : openPhotoPickerModal}
            >
              {!hasPhoto &&  <Image source={images.camera} style={styles.cameraIcon} />}
             
              <Text
                style={
                  hasPhoto
                    ? styles.viewPhotoText
                    : [formStyles.buttonText, formStyles.buttonTextEnabled]
                }
              >
                {hasPhoto ? 'View Photo' : 'Take Photo'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Order Delivered Button (Optional) */}
          <TouchableOpacity
            style={[
              formStyles.button,
              formStyles.buttonSuccess,
              { opacity: hasPhoto ? 1 : 0.5 },
            ]}
            onPress={handleOrderDelivered}
            disabled={!hasPhoto}
          >
            <Text style={formStyles.buttonText}>Order Delivered</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Confirm Photo Modal */}
      <ConfirmPhotoModal
        isVisible={isConfirmPhotoVisible}
        onClose={() => setIsConfirmPhotoVisible(false)}
        onRetry={handleRetry}
        onDone={handleDone}
        image={selectedImage}
      />

      {/* Photo Picker Modal */}
      <PhotoPickerModal
        isVisible={isPhotoOptionVisible}
        onClose={() => setIsPhotoOptionVisible(false)}
        onTakePhoto={handleTakePhoto}
        onChooseFromGallery={handleChooseFromGallery}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#F6F6F6',
    borderRadius: 12,
  },
  driverName: {
    fontSize: typography.fontSize.large,
    fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
    color: colors.text.primary,
  },
  deliveryAddress: {
    fontSize: typography.fontSize.medium,
    color: colors.text.primaryGrey,
    marginBottom: 10,
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: colors.text.primary,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: typography.fontSize.medium,
    fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
    color: colors.text.primary,
    marginBottom: 10,
  },
  instructionsContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  instructionText: {
    fontSize: typography.fontSize.medium,
    color: colors.text.primaryGrey,
  },
  itemText: {
    fontSize: typography.fontSize.medium,
    color: colors.text.primary,
    marginBottom: 5,
  },
  proofText: {
    fontSize: typography.fontSize.small,
    color: colors.text.primaryGrey,
    marginBottom: 10,
  },
  cameraIcon: {
    width: 20,
    height: 20,
    tintColor: colors.white,
    marginRight: 10,
  },

  /* Styles for the View Photo button */
  viewPhotoButton: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.purple,
    backgroundColor: 'transparent',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  viewPhotoText: {
    color: colors.purple,
    fontSize: typography.fontSize.medium,
    fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
  },
});

export default DeliveryModal;
