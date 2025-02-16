// src/screens/DropOffOrderDetailsScreen.tsx

import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {SendPackageOrder} from '../redux/slices/types/sendAPackage';
import {colors} from '../theme/colors';
import DeliveryModal from '../components/Modals/DeliveryModal';

const DropOffOrderDetailsScreen: React.FC = () => {
  const route = useRoute();
  const {order} = route.params as {order: SendPackageOrder};

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Image
          source={require('../assets/images/Map.png')}
          style={styles.mapImage}
        />
      </View>
      {/* Render the delivery details component (no button, no modal) */}
      <DeliveryModal order={order} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  mapContainer: {
    flex: 1,
  },
  mapImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default DropOffOrderDetailsScreen;
