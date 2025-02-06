// PackageTypeModal.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { colors } from '../../theme/colors';
import { images } from '../../assets/images/images';

interface PackageTypeModalProps {
  isVisible: boolean;
  onClose: (selectedType?: string) => void;
}

const CancellationPolicyModal: React.FC<PackageTypeModalProps> = ({
  isVisible,
  onClose,
}) => {
  

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      {/* Overlay to detect taps outside the modal content */}
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.overlay}>
          {/* Prevent taps inside the modal content from closing the modal */}
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              {/* Drag Handle */}
              <View style={styles.dragHandle} />

              {/* Header */}
              <View style={styles.header}>
                <View style={styles.redDot}>
                    <images.cancelGuide />
                </View>
                <Text style={styles.headerTitle}>Cancellation Policy</Text>
                
              </View>
              <Text>We understand that plans can change, and we aim to keep our cancellation process fair for both users and delivery partners.</Text>

              <View style={styles.policyItem}>
                <images.timeJar style={styles.icon} />
                <Text style={styles.policyText}>
                Cancel within <Text style={styles.darkText}>60 seconds</Text> of placing the order for a <Text style={styles.darkText}> Full Refund.</Text> 
                </Text>

              </View>
              <View style={styles.policyItem}>
              <images.refundIcon style={styles.icon} />
                <Text style={styles.policyText}>
                Cancel before the rider arrives at the store/pickup location, and a <Text style={styles.darkText}> 50% cancellation fee </Text> applies.
                </Text>

              </View>
              <View style={styles.policyItem}>
              <images.sad style={styles.icon} />
                <Text style={styles.policyText}>
                If the rider reaches the pickup location or the store, <Text style={styles.darkText}>100% cancellation fee applies</Text>. No cancellations after pickup.
                </Text>

              </View>


              {/* Done Button */}
              <TouchableOpacity style={styles.doneButton} onPress={handleClose}>
                <Text style={styles.doneButtonText}>I understand , proceed with the order</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  icon: {
    marginRight: 15
  },
  redDot:{
    backgroundColor:'#D81A00',
    borderRadius:50,
    padding:15
  },
  darkText:{
    fontWeight:800,
    fontSize:12
  },
  policyItem:{
    backgroundColor:'#FCF4FF',
    borderColor:'#8123AD',
    borderRadius:12,
    padding:10,
    borderWidth:1,
    marginVertical:10,
    flexDirection:'row',
    alignItems: 'center', 
  },
  policyTextContainer: {
    flex: 1, // Makes sure text takes up remaining space
  },
  policyText: {
    flexWrap: 'wrap', // Ensures text wraps properly
    fontSize: 14,
    color: '#333',
    width: '90%', // Ensures text doesn’t overflow container
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    paddingBottom: 30,
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    paddingVertical: 10
  },
  doneButton: {
    backgroundColor: colors.lightGreen,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  doneButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CancellationPolicyModal;
