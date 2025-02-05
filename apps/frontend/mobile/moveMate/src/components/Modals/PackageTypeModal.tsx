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
import { images } from '../../assets/images/images';
import { SvgProps } from 'react-native-svg';
import { packageOptions } from '../../constants/staticData';
type SvgComponent = React.FC<SvgProps>;
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
              {packageOptions.map((item) => {
                const SvgImage: SvgComponent = item.icon;
                return (
                  <TouchableOpacity
                    key={item.title}
                    style={styles.optionContainer}
                    onPress={() => handleSelect(item.title)}
                  >
                    <SvgImage style={styles.icon} />
                    <Text style={styles.optionText}>{item.title}</Text>
                    <View style={styles.radioCircle}>
                      {selectedType === item.title && <View style={styles.selectedRb} />}
                    </View>
                  </TouchableOpacity>
                )
              }

              )}

              {/* If "Others" is selected, show a TextInput */}
              {isOtherSelected && (
                <View style={styles.otherInputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor={colors.grey}
                    placeholder="What's in your package?"
                    value={otherType}
                    multiline
                    numberOfLines={5}
                    onChangeText={setOtherType}
                  />
                  <View style={styles.weightInfo}>
                    <images.pkgWeightIcon style={styles.icon} />
                    <Text >The package weight must be under 10 kg</Text>
                  </View>

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
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  weightInfo: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center'
  },
  icon: {
    marginRight: 10
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    paddingVertical: 10
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
    borderColor: '#D4D4D4',
    borderRadius: 8,
    padding: 12,
    minHeight: 120,
    backgroundColor: '#FFFFFF',
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
