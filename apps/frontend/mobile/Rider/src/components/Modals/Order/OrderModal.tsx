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
  TextStyle,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { acceptOrder, hideOrderModal } from '../../../redux/slices/orderSlice';
import { colors } from '../../../theme/colors';
import { SendPackageOrder } from '../../../redux/slices/types/sendAPackage';
import { useNavigation } from '@react-navigation/native';
import { DeliverAPackage } from '../../../navigation/ScreenNames';
import Alarm from '../../../assets/icons/alarm.svg';
import Cycle from '../../../assets/icons/cycle.svg';
import RedCircle from '../../../assets/icons/redCircle.svg';
import GreenCircle from '../../../assets/icons/greenCircle.svg';
import { SvgProps } from 'react-native-svg';
import { typography } from '../../../theme/typography';

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

interface InfoRowProps {
  iconSource: React.FC<SvgProps>;
  text: string;
  bold?: boolean;
}

export const InfoRow: React.FC<InfoRowProps> = ({
  iconSource: Icon,
  text,
  bold,
}) => (
  <View style={styles.infoRow}>
    <Icon width={15} height={15} style={styles.infoIcon} />
    <Text
      style={[
        styles.infoText,
        bold && {
          fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
        },
      ]}>
      {text}
    </Text>
  </View>
);

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
  const navigation = useNavigation();

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
      const acceptedOrder = await dispatch(acceptOrder({ orderId })).unwrap();
      onAcceptOrderSuccess(acceptedOrder);
      navigation.navigate(DeliverAPackage.PickUpOrderDetails, {
        order: acceptedOrder,
      });
      dispatch(hideOrderModal());
    } catch (error) {
      console.error('Accept Order Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const handleCancelOrder = () => {
    dispatch(hideOrderModal());
  }

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}><Text style={styles.totalEarningsLabel}>Total Earning</Text>
            <View style={styles.deliveryType}>
              <Text style={styles.deliveryTypeText}>Tip: 4$</Text>
            </View>
          </View>
          <View style={styles.earning}>
            <Text style={styles.totalEarnings}>24$</Text>
            <View style={styles.tipBadge}>
              <Text style={styles.tipBadgeText}>Tip: 4$</Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <InfoRow iconSource={Alarm} text={`${time} to deliver`} />
            <InfoRow iconSource={Cycle} text={`${distance}`} />
          </View>

          <View style={styles.addressContainer}>
            <InfoRow iconSource={RedCircle} text={pickupAddress} />
            <InfoRow iconSource={GreenCircle} text={dropoffAddress} />
          </View>

          {/* Accept Order Button */}
          <View style={styles.buttonContainer}>
            {/* Accept Order Button - 80% Width */}
            <View style={styles.acceptButtonContainer}>
              <View style={styles.darkBackground} />
              <Animated.View
                style={[
                  styles.timerButtonBackground,
                  { width: widthInterpolation },
                ]}
              />
              <TouchableOpacity
                style={styles.acceptOrderButton}
                onPress={handleAcceptOrder}>
                <Text style={styles.acceptOrderText}>Accept Order</Text>
              </TouchableOpacity>
            </View>

            {/* Cancel Order Button - 20% Width */}
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelOrder}>
              <Text style={styles.cancelButtonText}>X</Text>
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
    borderWidth: 1,
    borderColor: colors.purple,
    padding: 25,
    position: "relative"
  },
  tipBadge: {
    backgroundColor: colors.lightPurple,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  deliveryType: {
    backgroundColor: colors.purple,
    color: colors.white,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tipBadgeText: {
    color: colors.purple,
    fontSize: 12,
    fontWeight: 'bold',
  },
  deliveryTypeText: {
    color: colors.white,
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
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 20,
    flexDirection: "row",
    gap: 15
  },
  cancelButtonContainer: {
    position: 'relative',
    height: 50,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 20,
    flexDirection: "row",
    gap: 15
  },
  darkBackground: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.error,
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
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    gap:10
  },

  acceptButtonContainer: {
    flex: 0.8,
    position: 'relative',
    height: 50,
    borderRadius: 8,
    overflow: 'hidden',
  },

  cancelButton: {
    flex: 0.2,
    height: 50,
    borderRadius: 8,
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cancelButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OrderModal;
