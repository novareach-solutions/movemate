import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {formStyles} from '../../../theme/form';
import {colors} from '../../../theme/colors';
import {images} from '../../../assets/images/images';

const ReplaceVehicleScreen: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View>
          <Image
            style={{
              marginTop: 10,
            }}
            source={images.car}
          />
        </View>
        <View>
          <Text style={styles.vehicleTitle}>Toyota Corolla 2022</Text>
          <Text style={styles.vehicleDetails}>ABC-12345</Text>
          <Text style={styles.vehicleDetails}>Expiring on 2024-01-15</Text>
        </View>
      </View>

      {/* Replace Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[formStyles.button, formStyles.buttonEnabled]}
          onPress={openModal}>
          <Text style={[formStyles.buttonText, formStyles.buttonTextEnabled]}>
            Replace Vehicle
          </Text>
        </TouchableOpacity>
      </View>

      {/* Replace Vehicle Modal */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <View style={styles.dragIndicator} />
                <View style={styles.inputContainer}>
                  <View>
                    <Text style={formStyles.inputLabel}>Vehicle Make</Text>
                    <TextInput
                      style={formStyles.input}
                      placeholder="E.g., Toyota, Honda"
                      placeholderTextColor="#888"
                    />
                  </View>
                  <View>
                    <Text style={formStyles.inputLabel}>Vehicle Model</Text>
                    <TextInput
                      style={formStyles.input}
                      placeholder="E.g., Corolla, Civic"
                      placeholderTextColor="#888"
                    />
                  </View>
                  <View>
                    <Text style={formStyles.inputLabel}>
                      License Plate Number
                    </Text>
                    <TextInput
                      style={formStyles.input}
                      placeholder="E.g., ABC-1234"
                      placeholderTextColor="#888"
                    />
                  </View>
                  <View>
                    <Text style={formStyles.inputLabel}>
                      Registration Expiry Date
                    </Text>
                    <TextInput
                      style={formStyles.input}
                      placeholder="MM/DD/YYYY"
                      placeholderTextColor="#888"
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    formStyles.button,
                    formStyles.buttonEnabled,
                    {
                      width: '100%',
                    },
                  ]}
                  onPress={() => console.log('Replace Vehicle')}>
                  <Text
                    style={[
                      formStyles.buttonText,
                      formStyles.buttonTextEnabled,
                    ]}>
                    Replace Vehicle
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
    flexDirection: 'row',
    gap: 15,
  },
  vehicleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: colors.black,
  },
  vehicleDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  dragIndicator: {
    width: 50,
    height: 5,
    backgroundColor: '#CCCCCC',
    borderRadius: 3,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    flexDirection: 'column',
    gap: 10,
  },
});

export default ReplaceVehicleScreen;
