import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  TextStyle,
} from 'react-native';
import { colors } from '../../theme/colors';
import { formStyles } from '../../theme/form';
import { typography } from '../../theme/typography';
import { images } from '../../assets/images/images';
import { SendPackageOrder } from '../../redux/slices/types/sendAPackage';

interface DeliveryModalProps {
  isVisible: boolean;
  onClose: () => void;
  driverName: string;
  deliveryAddress: string;
  deliveryInstructions: string;
  itemsToDeliver: string[];
  order: SendPackageOrder;
}

const DeliveryModal: React.FC<DeliveryModalProps> = ({
  isVisible,
  onClose,
  driverName,
  deliveryAddress,
  deliveryInstructions,
  itemsToDeliver,
  order,
}) => {
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false);

  const handleTakePhoto = () => {
    setIsTakingPhoto(true);
    setTimeout(() => {
      setIsTakingPhoto(false);
      setPhotoTaken(true);
    }, 1000);
    console.log('Take Photo button clicked');
  };

  const handleOrderDelivered = () => {
    if (photoTaken) {
      console.log('Order Delivered button clicked');
      onClose();
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose} transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header Section */}
          <View style={styles.header}>
            <View>
              <Text style={styles.driverName}>{order.customer?.firstName}</Text>
              <Text style={styles.deliveryAddress}>{order.dropLocation?.addressLine1}</Text>
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
              <Text style={styles.instructionText}>{deliveryInstructions}</Text>
            </View>
          </View>

          {/* Items to Deliver */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Items to Deliver</Text>
            {itemsToDeliver.map((item, index) => (
              <Text key={index} style={styles.itemText}>
                • {item}
              </Text>
            ))}
          </View>

          {/* Proof of Delivery */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Proof of Delivery</Text>
            <Text style={styles.proofText}>Take a photo to confirm delivery</Text>
            <TouchableOpacity
              style={[formStyles.button, formStyles.buttonEnabled]}
              onPress={handleTakePhoto}>
              <Image source={images.camera} style={styles.cameraIcon} />
              <Text style={[formStyles.buttonText, formStyles.buttonTextEnabled]}>
                {photoTaken ? 'Photo Taken' : 'Take Photo'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Order Delivered Button - Slightly Grayed Out When Disabled */}
          <TouchableOpacity
            style={[
              formStyles.button,
              formStyles.buttonSuccess,
              { opacity: photoTaken ? 1 : 0.5 }, // Grayed out effect
            ]}
            onPress={handleOrderDelivered}
            disabled={!photoTaken} // Disable if no photo taken
          >
            <Text style={formStyles.buttonText}>
              Order Delivered
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
    objectFit: 'contain',
  },
});

export default DeliveryModal;
