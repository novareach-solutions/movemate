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
import ConfirmPhotoModal from './ConfirmPhotoModal';
import { useNavigation } from '@react-navigation/native';
import { AppScreens } from '../../navigation/ScreenNames';
import PurplePhone from "../../assets/icons/purplePhone.svg"
import PurpleMessage from "../../assets/icons/purpleMessage.svg"
import PurpleDoNotRing from "../../assets/icons/purpleDoNotRing.svg"
import PurpleDoor from "../../assets/icons/purpleDoor.svg"
import Camera from "../../assets/icons/camera.svg"

interface DeliveryModalProps {
  isVisible: boolean;
  onClose: () => void;
  driverName: string;
  deliveryAddress: string;
  deliveryInstructions: string[];
  itemsToDeliver: string[];
}

const DeliveryModal: React.FC<DeliveryModalProps> = ({
  isVisible,
  onClose,
  driverName,
  deliveryAddress,
  deliveryInstructions,
  itemsToDeliver,
}) => {
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const navigation = useNavigation()

  const handleTakePhoto = () => {
    setIsTakingPhoto(true);
    console.log('Take Photo button clicked', isTakingPhoto); // Replace this with your camera logic
  };

  const handleOrderDelivered = () => {
    console.log('Order Delivered button clicked');
    onClose(); // Close the modal when delivered
  };

  return (
    <>
      <Modal
        visible={isVisible}
        animationType="slide"
        onRequestClose={onClose}
        transparent>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            {/* Header Section */}
            <View style={styles.header}>
              <View style={{
                width: "70%"
              }}>
                <Text style={styles.driverName}>{driverName}</Text>
                <Text style={styles.deliveryAddress}>{deliveryAddress}</Text>
              </View>
              <View style={styles.headerIcons}>
                <TouchableOpacity>
                  <PurplePhone style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(AppScreens.Chat);
                  }}>
                  <PurpleMessage
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Delivery Instructions */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Delivery Instructions</Text>
              <View style={styles.instructionsContainer}>
                {deliveryInstructions.map((instruction, index) => (
                  <View key={index} style={styles.instructionRow}>
                    {instruction === 'Do not ring the bell' ? <PurpleDoNotRing style={styles.instructionIcon} /> : <PurpleDoor style={styles.instructionIcon} />}
                    <Text style={styles.instructionText}>{instruction}</Text>
                  </View>
                ))}
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
              <Text style={styles.proofText}>
                Take a photo to confirm delivery
              </Text>
              <TouchableOpacity
                style={[formStyles.button, formStyles.buttonEnabled, {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center"
                }]}
                onPress={handleTakePhoto}>
                <Camera style={styles.cameraIcon} />
                <Text
                  style={[formStyles.buttonText, formStyles.buttonTextEnabled]}>
                  Take Photo
                </Text>
              </TouchableOpacity>
            </View>

            {/* Order Delivered Button */}
            <TouchableOpacity
              style={[formStyles.button, formStyles.buttonSuccess]}
              onPress={handleOrderDelivered}>
              <Text style={[formStyles.buttonText, formStyles.buttonTextEnabled]}>
                Order Delivered
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ConfirmPhotoModal
        isVisible={isTakingPhoto}
        onClose={() => setIsTakingPhoto(false)}
        onRetry={() => setIsTakingPhoto(false)}
        onDone={() => setIsTakingPhoto(false)}
      /></>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 20,
    backgroundColor: "#F6F6F6",
    borderRadius: 12
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
    objectFit: "contain",
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
  cameraIcon: {
    width: 20,
    height: 20, objectFit: "contain",
    tintColor: colors.white,
    marginRight: 10,
  },
});

export default DeliveryModal;
