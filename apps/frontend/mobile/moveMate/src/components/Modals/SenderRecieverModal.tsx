// SenderReceiverModal.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { colors } from '../../theme/colors';
import { images } from '../../assets/images/images';
import { SafeAreaView } from 'react-native-safe-area-context';

interface DetailsModalProps {
  isVisible: boolean;
  onClose: (details?: { name: string; phoneNumber: string }) => void;
  type: 'sender' | 'receiver';
}

const { height } = Dimensions.get('window');

const SenderReceiverModal: React.FC<DetailsModalProps> = ({
  isVisible,
  onClose,
  type,
}) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (!isVisible) {
      // Reset fields when modal is closed
      setName('');
      setPhoneNumber('');
    }
  }, [isVisible]);

  const handleConfirm = () => {
    if (!name.trim() || !phoneNumber.trim()) {
      alert('Please enter both name and phone number.');
      return;
    }

    // Validate phone number (example: 10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber.trim())) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    onClose({ name: name.trim(), phoneNumber: phoneNumber.trim() });
  };

  const title =
    type === 'sender' ? 'Add sender’s details' : 'Add receiver’s details';

  return (
    <SafeAreaView style={{flex:1}}>
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={() => onClose()}
    >
      <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
              style={styles.keyboardAvoid}
            >
      {/* Overlay to detect taps outside the modal content */}
      <TouchableWithoutFeedback onPress={() => onClose()}>
        <View style={styles.overlay}>
          {/* Prevent taps inside the modal content from closing the modal */}
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              {/* Drag Handle */}
              <View style={styles.dragHandle} />

              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.headerTitle}>{title}</Text>
                <TouchableOpacity onPress={() => onClose()}>
                  <Image source={images.closeIcon} style={styles.closeIcon} />
                </TouchableOpacity>
              </View>

              {/* Input Fields */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  value={name}
                  placeholderTextColor={colors.grey}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  value={phoneNumber}
                  placeholderTextColor={colors.grey}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                />
              </View>

              {/* Confirm Button */}
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirm}
              >
                <Text style={styles.confirmButtonText}>Add Details</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback></KeyboardAvoidingView>
    </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end', // Align modal at the bottom
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  keyboardAvoid: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  modalContainer: {
    height: height * 0.35, // 35% of screen height, adjust as needed
    backgroundColor: colors.white,
    borderTopLeftRadius: 40, // Top left radius
    borderTopRightRadius: 40, // Top right radius
    padding: 20,
    elevation: 10,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    paddingVertical:10
  },
  closeIcon: {
    width: 24,
    height: 24,
    tintColor: colors.purple,
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fdfdfd',
  },
  confirmButton: {
    backgroundColor: colors.purple,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  confirmButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SenderReceiverModal;
