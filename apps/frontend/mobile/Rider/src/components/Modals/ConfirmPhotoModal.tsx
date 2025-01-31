// src/components/ConfirmPhotoModal.tsx

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  TextStyle,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { formStyles } from '../../theme/form';
import { ImageSourcePropType } from 'react-native';

interface ConfirmPhotoModalProps {
  isVisible: boolean;
  onClose: () => void;
  onRetry: () => void;
  onDone: () => void;
  image: string | null; // URI of the selected image
}

const ConfirmPhotoModal: React.FC<ConfirmPhotoModalProps> = ({
  isVisible,
  onClose,
  onRetry,
  onDone,
  image,
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>Confirm Photo</Text>

        {/* Display Selected Image */}
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Text style={styles.noImageText}>No Image Selected</Text>
          )}
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={onRetry}
            style={[styles.retryButton, formStyles.button]}>
            <Text style={[formStyles.buttonText, styles.retryText]}>Retry</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onDone}
            style={[
              formStyles.button,
              formStyles.buttonEnabled,
              styles.doneButton,
            ]}>
            <Text style={[formStyles.buttonText, formStyles.buttonTextEnabled]}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: typography.fontSize.large,
    fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
    color: colors.text.primary,
    marginBottom: 20,
  },
  imageContainer: {
    width: 300,
    height: 400,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 40,
    backgroundColor: colors.lightButtonBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  noImageText: {
    fontSize: typography.fontSize.medium,
    color: colors.text.secondary,
  },
  buttonContainer: {
    flexDirection: 'column',
    width: '100%',
  },
  retryButton: {
    borderWidth: 2,
    borderColor: colors.purple,
    backgroundColor: colors.white,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  retryText: {
    color: colors.purple,
    fontWeight: typography.fontWeight.semiBold as TextStyle['fontWeight'],
  },
  doneButton: {
    backgroundColor: colors.purple,
    paddingVertical: 12,
    borderRadius: 8,
  },
});

export default ConfirmPhotoModal;
