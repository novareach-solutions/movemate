import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import EarningsModal from '../components/Modals/EarningsModal';
import { colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { DeliverAPackage } from '../navigation/ScreenNames';
import Mapbox from '@rnmapbox/maps';
import { MAPBOX_ACCESS_TOKEN } from "../utils/constants";
Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);
const EarningsDetailsScreen: React.FC = () => {
  const [isEarningsModalVisible, setIsEarningsModalVisible] =
    useState<boolean>(true);
  const navigation = useNavigation();

  const handleOpenEarningsModal = () => {
    setIsEarningsModalVisible(true);
  };

  const handleCloseEarningsModal = () => {
    navigation.navigate(DeliverAPackage.Home);
    setIsEarningsModalVisible(false);
  };

  const tripTime = '30 minutes';
  const tripDistance = '15';
  const tripPay = 20;
  const tip = 5;
  const totalEarnings = 25;

  return (
    <View style={styles.container}>
       <View style={styles.mapContainer}>
                       <Mapbox.MapView style={styles.mapImage} styleURL="mapbox://styles/mapbox/light-v11">
                                     <Mapbox.Camera zoomLevel={14} centerCoordinate={ [151.209900, -33.865143]} />
                 
                                   </Mapbox.MapView>
                       </View>

      <EarningsModal
        isVisible={isEarningsModalVisible}
        onClose={handleCloseEarningsModal}
        tripTime={tripTime}
        tripDistance={tripDistance}
        tripPay={tripPay}
        tip={tip}
        totalEarnings={totalEarnings}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: colors.white,
    // justifyContent: 'center',
    // alignItems: 'center',
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
  mapContainer: {
    flex: 1,
  },
  mapImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default EarningsDetailsScreen;
