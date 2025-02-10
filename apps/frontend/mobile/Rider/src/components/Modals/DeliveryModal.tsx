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
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { colors } from '../../theme/colors';
import { formStyles } from '../../theme/form';
import { typography } from '../../theme/typography';
import ConfirmPhotoModal from './ConfirmPhotoModal';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
  AppScreens,
  AppScreensParamList,
  DeliverAPackage,
} from '../../navigation/ScreenNames';
import PurplePhone from '../../assets/icons/purplePhone.svg';
import PurpleMessage from '../../assets/icons/purpleMessage.svg';
import PurpleDoNotRing from '../../assets/icons/purpleDoNotRing.svg';
import PurpleDoor from '../../assets/icons/purpleDoor.svg';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import ImagePicker from 'react-native-image-crop-picker';
import { RootState } from '../../redux/store';
import {
  completeOrder,
  fetchOngoingOrder,
  uploadProofOfDelivery,
} from '../../redux/slices/orderSlice';
import { SendPackageOrder } from '../../redux/slices/types/sendAPackage';
import { uploadMedia } from '../../redux/slices/authSlice';
import Camera from '../../assets/icons/camera.svg';
import PhotoPickerModal from '../common/PhotoPickerModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Get screen height
const SCREEN_HEIGHT = Dimensions.get('window').height;

/**  
 * A simple InfoRow component (as seen in OrderExpandedModal)  
 * that shows an icon and some text.
 */
const InfoRow = ({
  iconSource,
  text,
  bold,
}: {
  iconSource: any;
  text: string;
  bold?: boolean;
}) => (
  <View style={styles.infoRow}>
    <Image source={iconSource} style={styles.infoIcon} />
    <Text
      style={[
        styles.infoText,
        bold ? { fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'] } : {},
      ]}>
      {text}
    </Text>
  </View>
);

interface DeliveryModalProps {
  isVisible: boolean;
  onClose: () => void;
  order: SendPackageOrder;
}

const DeliveryModal: React.FC<DeliveryModalProps> = ({ isVisible, onClose, order }) => {
  // Use animated height values similar to OrderExpandedModal.
  const [height] = useState(new Animated.Value(SCREEN_HEIGHT * 0.22)); // collapsed height
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(true);
    Animated.timing(height, {
      toValue: SCREEN_HEIGHT * 0.8, // expanded height
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    Animated.timing(height, {
      toValue: SCREEN_HEIGHT * 0.22, // collapsed height
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // Photo-related state.
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [isConfirmPhotoVisible, setIsConfirmPhotoVisible] = useState(false);
  const [isPhotoOptionVisible, setIsPhotoOptionVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<AppScreensParamList>>();

  const currentOrder = useAppSelector((state: RootState) => state.order.ongoingOrder);
  const dispatch = useAppDispatch();

  const openPhotoPickerModal = () => {
    setIsPhotoOptionVisible(true);
  };

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

  const handleRetry = () => {
    setIsConfirmPhotoVisible(false);
    setIsPhotoOptionVisible(true);
  };

  const handleDone = async () => {
    if (!uploadedImageUrl) {
      Alert.alert('Error', 'No image uploaded.');
      return;
    }
    try {
      await dispatch(uploadProofOfDelivery({ orderId: order.id, url: uploadedImageUrl })).unwrap();
      await dispatch(fetchOngoingOrder()).unwrap();
    } catch (error) {
      console.error('Failed to upload proof of delivery:', error);
      Alert.alert('Error', 'Failed to upload proof of delivery.');
    }
    setIsConfirmPhotoVisible(false);
  };

  const handleViewPhoto = () => {
    const finalPhotoUrl = currentOrder?.completionPhoto || uploadedImageUrl;
    if (!finalPhotoUrl) {
      Alert.alert('Error', 'No photo to view.');
      return;
    }
    setSelectedImage(finalPhotoUrl);
    setIsConfirmPhotoVisible(true);
  };

  const handleOrderDelivered = async () => {
    try {
      await dispatch(completeOrder({ orderId: currentOrder.id })).unwrap();
      navigation.navigate(DeliverAPackage.EarningsDetails);
    } catch (error) {
      console.error('Error completing order:', error);
    }
  };

  const navigateChatScreen = async () => {
    try {
      // Retrieve the sender ID from AsyncStorage.
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert('Error', 'User not logged in.');
        return;
      }
      navigation.navigate(AppScreens.Chat, {
        orderId: order.id,
        senderId: userId,
        headerTitle: order.customer?.firstName,
      });
    } catch (error) {
      console.error('Error fetching user ID from AsyncStorage:', error);
      Alert.alert('Error', 'Failed to retrieve user information.');
    }
  };

  const hasPhoto = !!currentOrder?.completionPhoto;

  return (
    <>
      <Modal visible={isVisible} animationType="slide" onRequestClose={onClose} transparent>
        <View style={styles.overlay}>
          {/* Use Animated.View to control modal height */}
          <Animated.View style={[styles.modalContainer, { height }]}>
            {/* Drag indicator toggles expand/collapse */}
            <TouchableOpacity onPress={isExpanded ? handleCollapse : handleExpand}>
              <View style={styles.dragIndicator} />
            </TouchableOpacity>

            {/* Conditionally show summary info when collapsed */}
            <View style={styles.location}>
              {!isExpanded && (
                <InfoRow
                  iconSource={require('../../assets/icons/package.png')} 
                  text={`${order.customer?.firstName} (${order.dropLocation?.addressLine1})`}
                />
              )}
            </View>

            {/* Header Section */}
            <View style={styles.header}>
              <View style={{ width: '70%' }}>
                <Text style={styles.driverName}>{order.customer?.firstName}</Text>
                <Text style={styles.deliveryAddress}>{order.dropLocation?.addressLine1}</Text>
              </View>
              <View style={styles.headerIcons}>
                <TouchableOpacity>
                  <PurplePhone style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateChatScreen}>
                  <PurpleMessage style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Delivery Instructions */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Delivery Instructions</Text>
              <View style={styles.instructionsContainer}>
                <View style={styles.instructionRow}>
                  {order.deliveryInstructions === 'Do not ring the bell' ? (
                    <PurpleDoNotRing style={styles.instructionIcon} />
                  ) : (
                    <PurpleDoor style={styles.instructionIcon} />
                  )}
                  <Text style={styles.instructionText}>{order.deliveryInstructions}</Text>
                </View>
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
              <TouchableOpacity
                style={
                  hasPhoto
                    ? styles.viewPhotoButton
                    : [formStyles.button, formStyles.buttonEnabled]
                }
                onPress={hasPhoto ? handleViewPhoto : openPhotoPickerModal}>
                {!hasPhoto && <Camera />}
                <Text
                  style={
                    hasPhoto
                      ? styles.viewPhotoText
                      : [formStyles.buttonText, formStyles.buttonTextEnabled]
                  }>
                  {hasPhoto ? 'View Photo' : 'Take Photo'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Order Delivered Button */}
            <TouchableOpacity
              style={[
                formStyles.button,
                formStyles.buttonSuccess,
                { opacity: hasPhoto ? 1 : 0.5 },
              ]}
              onPress={handleOrderDelivered}
              disabled={!hasPhoto}>
              <Text style={formStyles.buttonText}>Order Delivered</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>

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
    </>
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
    overflow: 'hidden', // ensures content does not bleed outside during animation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  dragIndicator: {
    width: 50,
    height: 5,
    backgroundColor: colors.text.subText,
    alignSelf: 'center',
    borderRadius: 3,
    marginBottom: 10,
  },
  location: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 20,
    backgroundColor: '#F6F6F6',
    borderRadius: 12,
  },
  driverName: {
    fontSize: 20,
    fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
    color: colors.text.primary,
  },
  deliveryAddress: {
    fontSize: 14,
    color: colors.text.primaryGrey,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 20,
  },
  icon: {
    width: 23,
    height: 23,
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
  instructionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructionIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
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
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  infoIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  infoText: {
    fontSize: typography.fontSize.medium,
    color: colors.text.primary,
    fontFamily: typography.fontFamily.regular,
  },
});

export default DeliveryModal;
