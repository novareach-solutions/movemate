import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors } from '../../theme/colors';

interface PhotoPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onTakePhoto: () => void;
  onChooseFromGallery: () => void;
}

const PhotoPickerModal: React.FC<PhotoPickerModalProps> = ({
  visible,
  onClose,
  onTakePhoto,
  onChooseFromGallery,
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Photo</Text>
          <TouchableOpacity style={styles.modalButton} onPress={onTakePhoto}>
            <Text style={styles.modalButtonText}>Take a Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={onChooseFromGallery}
          >
            <Text style={styles.modalButtonText}>Choose from Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalCancelButton}
            onPress={onClose}
          >
            <Text style={styles.modalCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: 'rgba(0, 0, 0, 0.5)',
   },
   modalContainer: {
     width: '80%',
     backgroundColor: colors.white,
     borderRadius: 8,
     padding: 16,
     alignItems: 'center',
   },
   modalTitle: {
     fontSize: 18,
     fontWeight: 'bold',
     marginBottom: 16,
   },
   modalButton: {
     width: '100%',
     padding: 12,
     backgroundColor: colors.purple,
     borderRadius: 8,
     alignItems: 'center',
     marginBottom: 8,
   },
   modalButtonText: {
     color: colors.white,
     fontSize: 16,
     fontWeight: 'bold',
   },
   modalCancelButton: {
     marginTop: 8,
   },
   modalCancelText: {
     color: colors.black,
     fontSize: 16,
   },
});

export default PhotoPickerModal;
