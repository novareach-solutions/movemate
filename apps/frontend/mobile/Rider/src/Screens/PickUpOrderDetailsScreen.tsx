// src/screens/PickUpOrderDetailsScreen.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SendPackageOrder } from '../redux/slices/types/sendAPackage';
import { colors } from '../theme/colors';
import OrderExpandedModal from '../components/Modals/ExpandedModal';

const PickUpOrderDetailsScreen: React.FC = () => {
  const route = useRoute();
  const { order } = route.params as { order: SendPackageOrder };

  if (!order) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Order not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Always render the modal as visible and disable closing */}
      <OrderExpandedModal
        isVisible={true}
        onClose={() => {}}
        order={order}
        disableClose={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
});

export default PickUpOrderDetailsScreen;
