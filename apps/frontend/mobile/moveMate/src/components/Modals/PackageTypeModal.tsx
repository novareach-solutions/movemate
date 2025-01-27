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
  TextInput,
} from 'react-native';
import { colors } from '../../theme/colors';

interface PackageTypeModalProps {
  isVisible: boolean;
  onClose: (selectedType?: string) => void;
}

const PackageTypeModal: React.FC<PackageTypeModalProps> = ({
  isVisible,
  onClose,
}) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [otherType, setOtherType] = useState('');

  const packageOptions = [
    'Documents',
    'Food',
    'Electric Item',
    'Laundry',
    'Others',
  ];

  const handleSelect = (type: string) => {
    setSelectedType(type);
    if (type === 'Others') {
      setIsOtherSelected(true);
    } else {
      setIsOtherSelected(false);
      setOtherType('');
    }
  };

  const handleDone = () => {
    if (selectedType) {
      if (selectedType === 'Others' && !otherType.trim()) {
        alert('Please specify the package type.');
        return;
      }
      const finalType = selectedType === 'Others' ? otherType.trim() : selectedType;
      onClose(finalType);
      setSelectedType(null);
      setOtherType('');
      setIsOtherSelected(false);
    } else {
      alert('Please select a package type.');
    }
  };

  const handleClose = () => {
    onClose();
    setSelectedType(null);
    setOtherType('');
    setIsOtherSelected(false);
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
                <Text style={styles.headerTitle}>Select Package Type</Text>
              </View>

              {/* Package Options */}
              {packageOptions.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.optionContainer}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.optionText}>{item}</Text>
                  <View style={styles.radioCircle}>
                    {selectedType === item && <View style={styles.selectedRb} />}
                  </View>
                </TouchableOpacity>
              ))}

              {/* If "Others" is selected, show a TextInput */}
              {isOtherSelected && (
                <View style={styles.otherInputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Please specify"
                    value={otherType}
                    onChangeText={setOtherType}
                  />
                </View>
              )}

              {/* Done Button */}
              <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
                <Text style={styles.doneButtonText}>Done</Text>
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
    justifyContent: 'flex-end', // Align modal at the bottom
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 12, // Top left radius
    borderTopRightRadius: 12, // Top right radius
    padding: 20,
    paddingBottom: 30, // Extra padding for the Done button
    // Height is dynamic based on content, no fixed height
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
    color: colors.purple,
  },
  closeButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.purple,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space between text and radio button
    alignItems: 'center',
    paddingVertical: 20,
  },
  optionText: {
    fontSize: 18,
    color: '#333',
    flex: 1, // Ensure text takes up available space
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.purple,
  },
  otherInputContainer: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#F8F8F8',
    fontSize: 16,
    width: '100%',
  },
  doneButton: {
    backgroundColor: colors.purple,
    borderRadius: 8,
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

export default PackageTypeModal;
