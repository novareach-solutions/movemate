// src/screens/PickUpOrderDetailsScreen.tsx

import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {SendPackageOrder} from '../redux/slices/types/sendAPackage';
import {colors} from '../theme/colors';
// import Mapbox from "@rnmapbox/maps"
import OrderExpandedModal from '../components/Modals/ExpandedModal';

// import Mapbox from '@rnmapbox/maps';
import {MAPBOX_ACCESS_TOKEN, MAPBOX_DRIVING_URL} from '../utils/constants';
import {useAppSelector} from '../redux/hook';
const routeLineStyle = {
  lineColor: colors.purple,
  lineWidth: 3,
};
// Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);
const PickUpOrderDetailsScreen: React.FC = () => {
  const currentLocationData = useAppSelector(
    state => state.auth.currentLocation,
  );
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
  const route = useRoute();
  const {order} = route.params as {order: SendPackageOrder};

  if (!order) {
    return null;
  }

  // const order = {
  //   pickupLocation:{
  //     longitude:-122.416797,
  //     latitude:37.773609,
  //   }
  // }
  // const fetchRoute = async () => {
  //   try {
  //     const response = await fetch(
  //       `${MAPBOX_DRIVING_URL}${currentLocationData.longitude},${currentLocationData.latitude};${order?.pickupLocation?.longitude},${order?.pickupLocation?.latitude}?geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`
  //     );
  //     console.log('order?.pickupLocation?.latitude', order?.pickupLocation?.latitude);
  //     console.log('currentLocationData.latitude', currentLocationData.latitude)
  //     const data = await response.json();
  //     console.log('data', data)
  //     if (data?.routes?.length) {
  //       setRouteCoords(data.routes[0].geometry.coordinates);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching route:", error);
  //   }
  // };

  // useEffect(() => {
  //   setTimeout(() => {
  //     // if (pickupLocationData?.latitude && pickupLocationData?.longitude && dropLocationData?.latitude && dropLocationData?.longitude) {
  //       fetchRoute();
  //       console.log('executedRoute')
  //     // }
  //   }, 4500);

  // }, []);
  // console.log('currentLocationData', currentLocationData)

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {/* <Mapbox.MapView style={styles.mapImage} styleURL="mapbox://styles/mapbox/light-v11">
                         <Mapbox.Camera zoomLevel={14} centerCoordinate={ [currentLocationData.longitude,currentLocationData.latitude]} />
            <Mapbox.PointAnnotation id="currentLocation" coordinate={[currentLocationData.longitude,currentLocationData.latitude]}>
              <View style={styles.markerContainer}>
                <View style={[styles.marker, { borderColor: "green" }]} />
              </View>
            </Mapbox.PointAnnotation>

            <Mapbox.PointAnnotation id="drop" coordinate={[order?.pickupLocation?.longitude || -122.416797,order?.pickupLocation?.latitude ||37.773609 ]}>
              <View style={styles.markerContainer}>
                <View style={[styles.marker, { borderColor: "red" }]} />
              </View>
            </Mapbox.PointAnnotation>

            {routeCoords.length > 0 && (
              <Mapbox.ShapeSource
                id="routeSource"
                shape={{
                  type: "Feature",
                  geometry: {
                    type: "LineString",
                    coordinates: routeCoords,
                  },
                  properties: {},
                }}
              >
                <Mapbox.LineLayer id="routeLayer" style={routeLineStyle} />
              </Mapbox.ShapeSource>

            )}
                       </Mapbox.MapView> */}
      </View>
      {/* Render the expanded order details component */}
      <OrderExpandedModal order={order} disableClose={true} />
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
  markerContainer: {alignItems: 'center', justifyContent: 'center'},
  marker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 5,
    backgroundColor: colors.white,
  },
});

export default PickUpOrderDetailsScreen;
