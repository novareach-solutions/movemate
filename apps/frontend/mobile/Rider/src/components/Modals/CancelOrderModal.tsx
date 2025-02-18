import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextStyle,
} from 'react-native';
import {colors} from '../../theme/colors';
import {typography} from '../../theme/typography';

interface CancelOrderModalProps {
  isVisible: boolean;
  onClose: () => void;
  onRejectOrder: () => void;
}

const CancelOrderModal: React.FC<CancelOrderModalProps> = ({
  isVisible,
  onClose,
  onRejectOrder,
}) => {
  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="slide" // Makes it slide in from bottom
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Are you sure?</Text>
          <Text style={styles.description}>
            Rejection may impact your acceptance rate, which can affect your
            overall performance score.
          </Text>

          <TouchableOpacity style={styles.goBackButton} onPress={onClose}>
            <Text style={styles.goBackText}>Go Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.rejectButton} onPress={onRejectOrder}>
            <Text style={styles.rejectText}>Reject Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end', // Align modal at the bottom
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    width: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    // paddingBottom: 30,
  },
  title: {
    fontSize: typography.fontSize.large,
    fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
    color: colors.text.primary,
    // marginBottom: 10,
  },
  description: {
    fontSize: typography.fontSize.medium,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  goBackButton: {
    width: '100%',
    backgroundColor: colors.purple,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  goBackText: {
    color: colors.white,
    fontSize: typography.fontSize.medium,
    fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
  },
  rejectButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.error,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  rejectText: {
    color: colors.error,
    fontSize: typography.fontSize.medium,
    fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
  },
});

export default CancelOrderModal;
