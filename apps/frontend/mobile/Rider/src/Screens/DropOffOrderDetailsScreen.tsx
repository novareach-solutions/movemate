import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {SendPackageOrder} from '../redux/slices/types/sendAPackage';
import {colors} from '../theme/colors';
import DeliveryModal from '../components/Modals/DeliveryModal';

const DropOffOrderDetailsScreen: React.FC = () => {
  const route = useRoute();
  const {order} = route.params as {order: SendPackageOrder};

  const [isDeliveryModalVisible, setIsDeliveryModalVisible] =
    useState<boolean>(true);

  if (!order) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Order not found.</Text>
      </View>
    );
  }

  const handleOpenDeliveryModal = () => {
    setIsDeliveryModalVisible(true);
  };

  const handleCloseDeliveryModal = () => {
    setIsDeliveryModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.openModalButton}
        onPress={handleOpenDeliveryModal}>
        <Text style={styles.openModalButtonText}>View Delivery Details</Text>
      </TouchableOpacity>

      {/* Delivery Modal */}
      <DeliveryModal
        isVisible={isDeliveryModalVisible}
        onClose={handleCloseDeliveryModal}
        order={order}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: colors.error,
  },
  openModalButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
  },
  openModalButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DropOffOrderDetailsScreen;
