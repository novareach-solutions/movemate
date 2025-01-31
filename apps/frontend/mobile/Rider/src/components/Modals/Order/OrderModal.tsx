// src/components/Modals/OrderModal.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
  Modal,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { hideOrderModal } from '../../../redux/slices/orderSlice';
import { colors } from '../../../theme/colors';
import { images } from '../../../assets/images/images';
import apiClient from '../../../api/apiClient';
import apiEndPoints from '../../../api/apiEndPoints';
import { SendPackageOrder } from '../../../redux/slices/types/sendAPackage'; // Ensure correct import

interface ModalComponentProps {
  isVisible: boolean;
  onClose: () => void;
  earnings: string;
  tip: string;
  time: string;
  distance: string;
  pickupAddress: string;
  dropoffAddress: string;
  orderId: string;
  onAcceptOrderSuccess: (order: SendPackageOrder) => void; // New Callback Prop
}

const OrderModal: React.FC<ModalComponentProps> = ({
  isVisible,
  onClose,
  earnings,
  tip,
  time,
  distance,
  pickupAddress,
  dropoffAddress,
  orderId,
  onAcceptOrderSuccess, // Destructure the new prop
}) => {
  const dispatch = useDispatch();
  const [progress] = useState(new Animated.Value(0));
  const timerDuration = 40000; // 40 seconds

  useEffect(() => {
    if (isVisible) {
      Animated.timing(progress, {
        toValue: 1,
        duration: timerDuration,
        useNativeDriver: false,
      }).start(() => {
        onClose(); // Close modal when the timer ends
      });
    } else {
      progress.setValue(0);
    }
  }, [isVisible, progress, timerDuration, onClose]);

  const widthInterpolation = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['100%', '0%'],
  });

  const handleAcceptOrder = async () => {
    if (!orderId) {
      Alert.alert('Error', 'Order ID is missing.');
      return;
    }

    try {
      const response = await apiClient.post(apiEndPoints.acceptOrder(orderId));

      if (response.status === 200 && response.data.success) {
        Alert.alert('Success', 'Order accepted successfully.');
        dispatch(hideOrderModal());

        const acceptedOrder: SendPackageOrder = response.data.data;
        onAcceptOrderSuccess(acceptedOrder);
      } else {
        Alert.alert('Error', response.data.message || 'Failed to accept order.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.error('Accept Order Error:', error);
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.totalEarningsLabel}>Total Earning</Text>
          <View style={styles.earning}>
            <Text style={styles.totalEarnings}>{earnings}</Text>
            <View style={styles.tipBadge}>
              <Text style={styles.tipBadgeText}>Tip: {tip}</Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Image source={images.distanceIcon} style={styles.infoIcon} />
              <Text style={styles.infoText}>{`${time} time to deliver`}</Text>
            </View>
            <View style={styles.infoRow}>
              <Image source={images.towing} style={styles.infoIcon} />
              <Text style={styles.infoText}>{`${distance} kms`}</Text>
            </View>
          </View>

          <View style={styles.addressContainer}>
            <View style={styles.infoRow}>
              <Image source={images.greenCircle} style={styles.infoIcon} />
              <Text style={styles.infoText}>{pickupAddress}</Text>
            </View>
            <View style={styles.infoRow}>
              <Image source={images.greenCircle} style={styles.infoIcon} />
              <Text style={styles.infoText}>{dropoffAddress}</Text>
            </View>
          </View>

          {/* Accept Order Button */}
          <View style={styles.timerButtonContainer}>
            <View style={styles.darkBackground} />
            <Animated.View
              style={[styles.timerButtonBackground, { width: widthInterpolation }]}
            />
            <TouchableOpacity
              style={styles.acceptOrderButton}
              onPress={handleAcceptOrder}>
              <Text style={styles.acceptOrderText}>Accept Order</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 3,
    borderColor: colors.purple,
    padding: 20,
  },
  tipBadge: {
    backgroundColor: colors.lightPurple,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tipBadgeText: {
    color: colors.purple,
    fontSize: 12,
    fontWeight: 'bold',
  },
  earning: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  totalEarningsLabel: {
    color: colors.text.subText,
    fontSize: 16,
  },
  totalEarnings: {
    fontSize: 24,
    color: colors.purple,
    fontWeight: 'bold',
  },
  infoContainer: {
    marginVertical: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  infoIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    resizeMode: 'contain',
  },
  infoText: {
    fontSize: 16,
    color: colors.text.primary,
  },
  addressContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border.primary,
    marginTop: 10,
    paddingVertical: 20,
  },
  timerButtonContainer: {
    position: 'relative',
    height: 50,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 20,
  },
  darkBackground: {
    position: 'absolute',
    backgroundColor: colors.darkGreen,
    borderRadius: 8,
    width: '100%',
    height: '100%',
  },
  timerButtonBackground: {
    position: 'absolute',
    backgroundColor: colors.green,
    borderRadius: 8,
    width: '100%',
    height: '100%',
  },
  acceptOrderButton: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', 
    width: '100%',
  },
  acceptOrderText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderModal;
