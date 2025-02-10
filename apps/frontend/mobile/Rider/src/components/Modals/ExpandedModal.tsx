import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  Alert,
  TextStyle,
} from 'react-native';
import {colors} from '../../theme/colors';
import {formStyles} from '../../theme/form';
import {typography} from '../../theme/typography';
import ConfirmPhotoModal from './ConfirmPhotoModal';
import {useNavigation} from '@react-navigation/native';
import {AppScreens} from '../../navigation/ScreenNames';
import DeliverAPackage from '../../assets/icons/deliverAPackageIcon.svg';
import PurplePhone from '../../assets/icons/purplePhone.svg';
import PurpleMessage from '../../assets/icons/purpleMessage.svg';
import Cart from '../../assets/icons/cart.svg';
import {SendPackageOrder} from '../../redux/slices/types/sendAPackage';
import {
  fetchOngoingOrder,
  startOrder,
  updateItemVerifiedPhoto,
  updateOrderStatus,
} from '../../redux/slices/orderSlice';
import {useAppDispatch, useAppSelector} from '../../redux/hook';
import {RootState} from '../../redux/store';
import {OrderStatusEnum} from '../../redux/slices/types/enums';
import ImagePicker from 'react-native-image-crop-picker';
import {uploadMedia} from '../../redux/slices/authSlice';
import {InfoRow} from './Order/OrderModal';
import PhotoPickerModal from '../common/PhotoPickerModal';
import GreenCircle from '../../assets/icons/greenCircle.svg';
import PickupNotes from '../../assets/icons/pickupNotes.svg';

const SCREEN_HEIGHT = Dimensions.get('window').height;

interface ExpandedModalProps {
  isVisible: boolean;
  onClose: () => void;
  order: SendPackageOrder;
}

const OrderExpandedModal: React.FC<ExpandedModalProps> = ({
  isVisible,
  onClose,
  order,
}) => {
  const [height] = useState(new Animated.Value(SCREEN_HEIGHT * 0.2));
  const [isExpanded, setIsExpanded] = useState(false);
  const [isConfirmPhotoVisible, setIsConfirmPhotoVisible] = useState(false);
  const [isPhotoOptionVisible, setIsPhotoOptionVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (order) {
      // setCurrentOrder(order);
    }
  }, [order]);

  useEffect(() => {
    isVisible ? handleExpand() : handleCollapse();
  }, [isVisible]);

  const handleExpand = () => {
    setIsExpanded(true);
    Animated.timing(height, {
      toValue: SCREEN_HEIGHT * 0.8,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    Animated.timing(height, {
      toValue: SCREEN_HEIGHT * 0.23,
      duration: 300,
      useNativeDriver: false,
    }).start();
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
      await dispatch(
        updateItemVerifiedPhoto({
          orderId: currentOrder.id,
          url: uploadedImageUrl,
        }),
      ).unwrap();

      // ✅ Fetch updated order and update state
      const fetchResponse = await dispatch(fetchOngoingOrder()).unwrap();
      if (fetchResponse) {
        // setCurrentOrder(fetchResponse); // ✅ Update local state with new order details
      } else {
        Alert.alert('Warning', 'Photo updated, but order refresh failed.');
      }
    } catch (error: any) {
      console.error(
        'Failed to update itemVerifiedPhoto or refresh order:',
        error,
      );
      Alert.alert(
        'Error',
        error.message || 'Failed to update photo or refresh order.',
      );
    }

    setIsConfirmPhotoVisible(false);
  };

  const currentOrder = useAppSelector(
    (state: RootState) => state.order.ongoingOrder,
  ); // Sync with Redux store

  const handleOrderAction = async () => {
    if (currentOrder?.status === OrderStatusEnum.ACCEPTED) {
      try {
        await dispatch(startOrder({orderId: currentOrder.id})).unwrap();
        await dispatch(fetchOngoingOrder()).unwrap(); // Ensure we fetch updated data
      } catch (error: any) {
        console.error('Failed to start order:', error);
        Alert.alert('Error', error.message || 'Failed to start order.');
      }
    }

    if (currentOrder?.status !== OrderStatusEnum.ACCEPTED) {
      try {
        await dispatch(
          updateOrderStatus({
            orderId: currentOrder.id,
            status: OrderStatusEnum.PICKEDUP_ORDER,
          }),
        ).unwrap();
        await dispatch(fetchOngoingOrder()).unwrap();
        onClose();
        navigation.navigate(DeliverAPackage.DropOffOrderDetails, {
          order: currentOrder,
        });
      } catch (error: any) {
        console.error('Failed to update order status:', error);
        Alert.alert('Error', error.message || 'Failed to update order status.');
      }
    }
  };

  const getButtonText = () => {
    return currentOrder?.status === OrderStatusEnum.ACCEPTED
      ? 'I Have Arrived'
      : 'Order Picked Up';
  };

  const handleVerifyItems = () => {
    setIsPhotoOptionVisible(true);
  };

  const handleTakePhoto = () => {
    setIsPhotoOptionVisible(false);
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(photo => {
        setSelectedImage(photo.path);
        uploadPhoto(photo);
      })
      .catch(error => {
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
      .then(photo => {
        setSelectedImage(photo.path);
        uploadPhoto(photo);
      })
      .catch(error => {
        console.log('Gallery error:', error);
        Alert.alert('Error', 'Failed to select photo. Please try again.');
      });
  };

  const uploadPhoto = async (photo: any) => {
    const formData = new FormData();
    formData.append('file', {
      uri: photo.path,
      type: photo.mime,
      name: photo.filename || `photo_${Date.now()}.jpg`,
    });

    try {
      const response = await dispatch(uploadMedia(formData)).unwrap();
      if (response && response.url) {
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

  const isVerifyItemsDisabled =
    currentOrder?.status === OrderStatusEnum.ACCEPTED ||
    (currentOrder?.status === OrderStatusEnum.PENDING &&
      !currentOrder.itemVerifiedPhoto);

  const isOrderPickedUpDisabled =
    !currentOrder?.itemVerifiedPhoto &&
    currentOrder?.status !== OrderStatusEnum.ACCEPTED;

  return (
    <>
      <Modal
        visible={isVisible}
        transparent
        animationType="none"
        onRequestClose={handleCollapse}>
        <TouchableWithoutFeedback onPress={handleCollapse}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <Animated.View style={[styles.modalContainer, {height}]}>
                <TouchableOpacity
                  onPress={isExpanded ? handleCollapse : handleExpand}>
                  <View style={styles.dragIndicator} />
                </TouchableOpacity>

                <Text style={styles.title}>
                  {order.status === OrderStatusEnum.ACCEPTED
                    ? 'Order Accepted'
                    : 'Arriving in 10 mins'}
                </Text>

                <View style={styles.location}>
                  {!isExpanded && (
                    <InfoRow
                      iconSource={DeliverAPackage}
                      text={pickupAddress}
                    />
                  )}
                </View>

                {isExpanded && (
                  <>
                    <View style={styles.sectionContainer}>
                      <InfoRow
                        iconSource={GreenCircle}
                        text={'Pickup Details'}
                        bold
                      />
                      <View style={styles.pickUpDetails}>
                        <View style={styles.pickUpDetailsTextContainer}>
                          <Text style={styles.infoBoldText}>
                            {currentOrder?.senderName}
                          </Text>
                          <Text style={styles.infoText}>
                            {`${currentOrder.pickupLocation?.addressLine1} ${currentOrder.pickupLocation?.addressLine2}` ||
                              'N/A'}
                          </Text>
                        </View>
                        <View style={styles.pickupIcons}>
                          <PurplePhone />
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate(AppScreens.Chat);
                            }}>
                            <PurpleMessage />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

                    <View style={styles.sectionContainer}>
                      <InfoRow
                        iconSource={PickupNotes}
                        text={'Pickup Notes'}
                        bold
                      />
                      <View style={styles.pickUpDetails}>
                        <Text style={styles.infoText}>
                          {order.deliveryInstructions}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.sectionContainer}>
                      <InfoRow
                        iconSource={Cart}
                        text={'Items to Pickup'}
                        bold
                      />
                      <View
                        style={[
                          styles.itemsContainer,
                          styles.pickUpDetailsTextContainer,
                        ]}>
                        {items.map((item, index) => (
                          <Text key={index} style={styles.itemText}>
                            • {item}
                          </Text>
                        ))}
                        <TouchableOpacity
                          style={[
                            currentOrder.itemVerifiedPhoto
                              ? styles.viewImageButton
                              : styles.verifyItemsButton,
                            isVerifyItemsDisabled && styles.buttonDisabled,
                          ]}
                          onPress={() => {
                            if (!isVerifyItemsDisabled) {
                              if (currentOrder.itemVerifiedPhoto) {
                                setSelectedImage(
                                  currentOrder.itemVerifiedPhoto,
                                );
                                setIsConfirmPhotoVisible(true);
                              } else {
                                handleVerifyItems();
                              }
                            }
                          }}
                          disabled={isVerifyItemsDisabled}>
                          <Text
                            style={[
                              currentOrder.itemVerifiedPhoto
                                ? styles.viewImageText
                                : styles.verifyItemsText,
                              isVerifyItemsDisabled &&
                                styles.buttonTextDisabled,
                            ]}>
                            {currentOrder.itemVerifiedPhoto
                              ? 'View Image'
                              : 'Verify Items'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                )}

                <View style={styles.footer}>
                  <TouchableOpacity
                    style={[
                      formStyles.button,
                      isOrderPickedUpDisabled
                        ? styles.buttonDisabled
                        : formStyles.buttonSuccess,
                    ]}
                    onPress={handleOrderAction}
                    disabled={isOrderPickedUpDisabled}>
                    <Text
                      style={[
                        formStyles.buttonText,
                        isOrderPickedUpDisabled
                          ? styles.buttonTextDisabled
                          : formStyles.buttonTextEnabled,
                      ]}>
                      {getButtonText()}
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
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
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
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
  title: {
    fontSize: typography.fontSize.semiMedium,
    fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
    color: colors.text.primary,
    textAlign: 'center',
  },
  sectionContainer: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.primary,
    paddingBottom: 10,
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
  infoBoldText: {
    fontSize: typography.fontSize.medium,
    color: colors.text.primary,
    fontFamily: typography.fontFamily.regular,
    fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
  },
  itemsContainer: {
    padding: 20,
    backgroundColor: colors.lightButtonBackground,
    borderRadius: 20,
    marginTop: 10,
  },
  itemText: {
    fontSize: typography.fontSize.medium,
    color: colors.text.primary,
    marginBottom: 5,
    fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
  },
  location: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  pickUpDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  pickUpDetailsTextContainer: {
    flexDirection: 'column',
    gap: 5,
  },
  pickupIcon: {
    width: 22,
    height: 22,
  },
  pickupIcons: {
    flexDirection: 'row',
    gap: 20,
  },
  verifyItemsButton: {
    marginTop: 10,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  verifyItemsText: {
    color: colors.white,
    fontSize: typography.fontSize.medium,
    fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
  },
  viewImageButton: {
    marginTop: 10,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  viewImageText: {
    color: colors.primary,
    fontSize: typography.fontSize.medium,
    fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
  },
  buttonDisabled: {
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BDBDBD',
  },

  buttonTextDisabled: {
    color: '#9E9E9E',
    fontSize: typography.fontSize.medium,
    fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
  },
});

export default OrderExpandedModal;
