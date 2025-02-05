import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from 'react-native';
import {colors} from '../../theme/colors';
import DetailRow from '../DetailRow';
import SuccessGreenTick from "../../assets/icons/successGreenTick.svg"
import PurpleTime from "../../assets/icons/purpleTime.svg"
import PurpleDistance from "../../assets/icons/purpleDistance.svg"
import PurpleCoin from "../../assets/icons/purpleCoin.svg"
import PurpleTip from "../../assets/icons/purpleTip.svg"

interface EarningsModalProps {
  isVisible: boolean;
  onClose: () => void;
  tripTime: string;
  tripDistance: string;
  tripPay: number;
  tip: number;
  totalEarnings: number;
}

const EarningsModal: React.FC<EarningsModalProps> = ({
  isVisible,
  onClose,
  tripTime,
  tripDistance,
  tripPay,
  tip,
  totalEarnings,
}) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
      transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header Section */}
          <View style={styles.headerContainer}>
            <SuccessGreenTick style={styles.successIcon} />
            <Text style={styles.headerText}>You earned</Text>
            <Text style={styles.earningsText}>${totalEarnings}</Text>
          </View>

          {/* Earnings Details Section */}
          <View style={styles.detailsContainer}>
            <DetailRow
              icon={PurpleTime}
              label="Trip time"
              value={tripTime}
            />
            <DetailRow
              icon={PurpleDistance}
              label="Trip distance"
              value={`${tripDistance} km`}
            />
            <View style={styles.separator}>
              <Text></Text>
            </View>
            <DetailRow
              icon={PurpleCoin}
              label="Trip pay"
              value={`$${tripPay}`}
            />
            <DetailRow icon={PurpleTip} label="Tip" value={`$${tip}`} />
            <DetailRow label="Total earnings" value={`$${totalEarnings}`} />
          </View>

          {/* Done Button */}
          <TouchableOpacity style={styles.doneButton} onPress={onClose}>
            <Text style={styles.doneButtonText}>Done</Text>
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
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 3,
    borderColor: colors.purple,
    borderBottomWidth: 0,
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  successIcon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border.primary,
    marginVertical: 10,
  },
  headerText: {
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 5,
  },
  earningsText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.purple,
  },
  detailsContainer: {
    marginVertical: 20,
    backgroundColor: colors.lightButtonBackground,
    padding: 20,
    borderRadius: 30,
    borderWidth:1,
    borderColor:colors.border.lightGray
  },
  doneButton: {
    backgroundColor: colors.purple,
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  doneButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EarningsModal;
