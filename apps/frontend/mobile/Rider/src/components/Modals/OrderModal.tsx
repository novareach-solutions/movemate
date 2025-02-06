import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
  Modal,
  TextStyle,
} from 'react-native';
import { colors } from '../../theme/colors';
import Alarm from "../../assets/icons/alarm.svg"
import Cycle from "../../assets/icons/cycle.svg"
import RedCircle from "../../assets/icons/redCircle.svg"
import GreenCircle from "../../assets/icons/greenCircle.svg"
import { SvgProps } from 'react-native-svg';
import { typography } from '../../theme/typography';

interface ModalComponentProps {
  isVisible: boolean;
  onClose: () => void;
  earnings: string;
  tip: string;
  time: string;
  distance: string;
  pickupAddress: string;
  dropoffAddress: string;
}

interface InfoRowProps {
  iconSource: React.FC<SvgProps>;
  text: string;
  bold?: boolean
}

export const InfoRow: React.FC<InfoRowProps> = ({ iconSource: Icon, text, bold }) => (
  <View style={styles.infoRow}>
    <Icon width={15} height={15} style={styles.infoIcon} />
    <Text style={[styles.infoText, bold && {
      fontWeight: typography.fontWeight.bold as TextStyle['fontWeight']
    }]}>{text}</Text>
  </View>
);

const TipBadge: React.FC<{ tip: string }> = ({ tip }) => (
  <View style={styles.tipBadge}>
    <Text style={styles.tipBadgeText}>Tip: {tip}</Text>
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
}) => {
  const [progress] = useState(new Animated.Value(0));
  const timerDuration = 20000; // 20 seconds

  useEffect(() => {
    if (isVisible) {
      // Start the timer animation
      Animated.timing(progress, {
        toValue: 1,
        duration: timerDuration,
        useNativeDriver: false,
      }).start(() => {
        onClose(); // Close modal when the timer ends
      });
    } else {
      // Reset the progress bar when the modal is closed
      progress.setValue(0);
    }
  }, [isVisible]);

  const widthInterpolation = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['100%', '0%'], // Moves background from right to left
  });

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Tip Badge */}
          <Text style={styles.totalEarningsLabel}>Total Earning</Text>
          <View style={styles.earning}>
            <Text style={styles.totalEarnings}>{earnings}</Text>
            <TipBadge tip={tip} />
          </View>

          <View style={styles.infoContainer}>
            <InfoRow
              iconSource={Alarm}
              text={`${time} to deliver`}
            />
            <InfoRow iconSource={Cycle} text={`${distance}`} />
          </View>

          <View style={styles.addressContainer}>
            <InfoRow iconSource={RedCircle} text={pickupAddress} />
            <InfoRow iconSource={GreenCircle} text={dropoffAddress} />
          </View>

          {/* Button at the Bottom */}
          <View style={styles.timerButtonContainer}>
            <View style={styles.darkBackground} />
            <Animated.View
              style={[
                styles.timerButtonBackground,
                { width: widthInterpolation },
              ]}
            />
            <TouchableOpacity
              style={styles.acceptOrderButton}
              onPress={onClose}>
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
    borderBottomWidth: 0,
    padding: 20,
    justifyContent: 'space-between',
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
    flexDirection: 'column',
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
  },
  darkBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.darkGreen,
    borderRadius: 8,
  },
  timerButtonBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: colors.green,
    borderRadius: 8,
  },
  acceptOrderButton: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptOrderText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderModal;
