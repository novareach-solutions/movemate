import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SendPackageOrder } from '../redux/slices/types/sendAPackage';
import { colors } from '../theme/colors';
import OrderExpandedModal from '../components/Modals/ExpandedModal';

const PickUpOrderDetailsScreen: React.FC = () => {
  const route = useRoute();
  const { order } = route.params as { order: SendPackageOrder };

  const [isExpandedModalVisible, setIsExpandedModalVisible] = useState<boolean>(true);


  if (!order) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Order not found.</Text>
      </View>
    );
  }

  const handleOpenExpandedModal = () => {
    setIsExpandedModalVisible(true);
  };

  const handleCloseExpandedModal = () => {
    setIsExpandedModalVisible(false);
  };
  

  return (
    <View style={styles.container}>
        <>
          <TouchableOpacity style={styles.openModalButton} onPress={handleOpenExpandedModal}>
            <Text style={styles.openModalButtonText}>View Expanded Details</Text>
          </TouchableOpacity>

          {/* Order Expanded Modal */}
          <OrderExpandedModal
            isVisible={isExpandedModalVisible}
            onClose={handleCloseExpandedModal}
            order={order}
          />
        </>
  
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

export default PickUpOrderDetailsScreen;
