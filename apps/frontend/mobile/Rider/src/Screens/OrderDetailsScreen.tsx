import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SendPackageOrder } from '../redux/slices/types/sendAPackage';
import { colors } from '../theme/colors';
import OrderExpandedModal from '../components/Modals/ExpandedModal';
import DeliveryModal from '../components/Modals/DeliveryModal';
import { OrderStatusEnum } from '../redux/slices/types/enums';

const OrderDetailsScreen: React.FC = () => {
  const route = useRoute();
  const { order } = route.params as { order: SendPackageOrder };

  const [isExpandedModalVisible, setIsExpandedModalVisible] = useState<boolean>(false);
  const [isDeliveryModalVisible, setIsDeliveryModalVisible] = useState<boolean>(
    order.status === OrderStatusEnum.PICKEDUP_ORDER
  );
  const [shouldOpenDeliveryModal, setShouldOpenDeliveryModal] = useState(false);


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
    setShouldOpenDeliveryModal(true); 
  };
  

  const handleOpenDeliveryModal = () => {
    setIsDeliveryModalVisible(true);
  };

  const handleCloseDeliveryModal = () => {
    setIsDeliveryModalVisible(false);
  };

  useEffect(() => {
    if (!isExpandedModalVisible && shouldOpenDeliveryModal) {
      setIsDeliveryModalVisible(true); // ✅ Open the Delivery Modal
      setShouldOpenDeliveryModal(false); // ✅ Reset the flag
    }
  }, [isExpandedModalVisible, shouldOpenDeliveryModal]);
  

  return (
    <View style={styles.container}>
      {order.status !== OrderStatusEnum.PICKEDUP_ORDER ? (
        <>
          <TouchableOpacity style={styles.openModalButton} onPress={handleOpenExpandedModal}>
            <Text style={styles.openModalButtonText}>View Expanded Details</Text>
          </TouchableOpacity>

          {/* Order Expanded Modal */}
          <OrderExpandedModal
            isVisible={isExpandedModalVisible}
            onClose={handleCloseExpandedModal}
            onOpenDeliveryModal={handleOpenDeliveryModal} // ✅ Ensuring this function is passed correctly
            driverName={order.agent?.user?.firstName || 'N/A'}
            pickupAddress={order.pickupLocation?.addressLine1 || 'N/A'}
            pickupNotes={order.deliveryInstructions || 'No notes'}
            items={[order.packageType]}
            orderStatus={order.status}
            order={order}
          />
        </>
      ) : (
        <DeliveryModal
          isVisible={isDeliveryModalVisible}
          onClose={handleCloseDeliveryModal}
          driverName={order.agent?.user?.firstName || 'N/A'}
          deliveryAddress={order.dropLocation?.addressLine1 || 'N/A'}
          deliveryInstructions={order.deliveryInstructions || 'No instructions'}
          itemsToDeliver={[order.packageType]}
          order={order}
        />
      )}
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

export default OrderDetailsScreen;
