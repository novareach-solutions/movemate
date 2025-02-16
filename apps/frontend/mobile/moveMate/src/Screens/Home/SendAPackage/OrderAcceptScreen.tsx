import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { images } from "../../../assets/images/images";
import { colors } from "../../../theme/colors";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { assignOrder, getOrederDetails } from "../../../redux/slices/deliverAPackageSlice";
import { useNavigation } from "@react-navigation/native";
import { CustomerScreens } from "../../../navigation/ScreenNames";
import Mapbox from '@rnmapbox/maps';
import { MAPBOX_ACCESS_TOKEN, MAPBOX_DRIVING_URL } from "../../../constants";
import Header from "../../../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);


const routeLineStyle = {
  lineColor: colors.purple,
  lineWidth: 3,
};

const OrderAcceptScreen = () => {
  const orderId = useAppSelector(state => state.deliverAPackage.id);
  const pickupLocationData = useAppSelector(state => state.deliverAPackage.pickupLocation);
  const [orderData, setOrderData] = useState(null);
  const dropLocationData = useAppSelector(state => state.deliverAPackage.dropLocation);

  console.log('pickupLocationData', pickupLocationData)
  console.log('dropLocationData', dropLocationData)

  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
  const [pickupLocation, setPickupLocation] = useState<[number, number]>([77.5946, 12.9716]);
  const [dropLocation, setDropLocation] = useState<[number, number]>([80.2707, 13.0827]);

  useEffect(() => {
    if (pickupLocationData?.latitude !== undefined && pickupLocationData?.longitude !== undefined) {
      setPickupLocation([pickupLocationData.longitude, pickupLocationData.latitude]);
    }
  }, [pickupLocationData]);

  useEffect(() => {
    if (dropLocationData?.latitude !== undefined && dropLocationData?.longitude !== undefined) {
      setDropLocation([dropLocationData.longitude, dropLocationData.latitude]);
    }
  }, [dropLocationData]);

  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const navigation = useNavigation()
  const dispatch = useAppDispatch();
  const fetchRoute = async () => {
    try {
      const response = await fetch(
        `${MAPBOX_DRIVING_URL}${pickupLocation[0]},${pickupLocation[1]};${dropLocation[0]},${dropLocation[1]}?geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`
      );
      const data = await response.json();
      if (data.routes.length) {
        setRouteCoords(data.routes[0].geometry.coordinates);
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      // if (pickupLocationData?.latitude && pickupLocationData?.longitude && dropLocationData?.latitude && dropLocationData?.longitude) {
      fetchRoute();
      console.log('executedRoute')
      // }
    }, 4500);

  }, [pickupLocation, dropLocation]);


  console.log('id', orderId)
  const getOrderDetails = async () => {
    if (orderId) {

      const response = await dispatch(getOrederDetails({ orderId: orderId })).unwrap();
      console.log('response####', response)
      setOrderData(response);
    }
  }

  useEffect(() => {
    if (orderId) {
      getOrderDetails()
    }
  }, [orderId])


  // useEffect(() => {
  //   if (orderId) {
  //     assignRider();
  //   }
  // }, [])
  // const assignRider = async () => {
  //   if (!pickupLocation || pickupLocation.pickupLattitude === null || pickupLocation.pickupLongitude === null) {
  //     Alert.alert('Pickup location data is missing.');
  //     return;
  //   }

  //   try {
  //     // await dispatch(assignOrder({
  //     //     pickupLatitude: pickupLocation.pickupLattitude ?? 0,
  //     //     pickupLongitude: pickupLocation.pickupLongitude ?? 0, 
  //     //     orderId:orderId ?? ""
  //     // }));
  //     // Alert.alert("We've Assigned a Delivery Agent for your order.")
  //   } catch (error) {
  //     console.log('Error assigning rider:', error);
  //   }
  // };

  const CancelOrder = () => {
    navigation.navigate(CustomerScreens.CancelOrderScreen);
  }

  const viewDetails = () => {
    navigation.navigate(CustomerScreens.OrderDetails);
    // navigation.navigate(CustomerScreens.ReportAnIssue);
  }
  const handleChat = () => {
    navigation.navigate(CustomerScreens.ChatScreen, {
      orderId: orderId,
      senderId: orderData?.customerId,
      headerTitle: orderData?.agent?.user?.firstName || "Abdul",
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header isBack help />
      {/* Map Section */}
      <View style={styles.mapContainer}>
        <View>
          <Mapbox.MapView style={styles.mapImage} styleURL="mapbox://styles/mapbox/light-v11">
            <Mapbox.Camera zoomLevel={12} centerCoordinate={pickupLocation || [151.209900, -33.865143]} />

            {/* Pickup Marker */}
            <Mapbox.PointAnnotation id="pickup" coordinate={pickupLocation}>
              <View style={styles.markerContainer}>
                <View style={[styles.marker, { borderColor: "green" }]} />
              </View>
            </Mapbox.PointAnnotation>

            {/* Drop Marker */}
            <Mapbox.PointAnnotation id="drop" coordinate={dropLocation}>
              <View style={styles.markerContainer}>
                <View style={[styles.marker, { borderColor: "red" }]} />
              </View>
            </Mapbox.PointAnnotation>

            {/* Route Line */}
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
          </Mapbox.MapView>

        </View>
        {/* <Image
          source={images.map}
          style={styles.mapImage}
        /> */}
      </View>

      {/* Details Section */}
      <View style={styles.detailsContainer}>
        <View style={styles.container1}>
          {/* Delivery Status */}
          <View style={styles.statusRow}>
            <Text style={styles.statusText}>Delivery partner is on the way to pick up</Text>
            <View style={styles.timeBadge}>
              <Text style={styles.timeText}>5 min</Text>
            </View>
          </View>

          {/* Partner Info */}
          <View style={styles.partnerCard}>
            <Image
              source={{ uri: "https://via.placeholder.com/50" }} // Replace with actual image URL
              style={styles.avatar}
            />
            <View style={styles.partnerInfo}>
              <Text style={styles.partnerName}>{orderData?.agent?.user?.firstName || 'Alexander V.'}</Text>
              <Text style={styles.rating}>⭐ 4.9</Text>
            </View>
            <View style={styles.iconRow}>
              <TouchableOpacity>
                <Text style={styles.iconText}>📞</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleChat}>
                <Text style={styles.iconText}>💬</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Pickup Info */}
          <View style={styles.footerStyle}>
            <View style={[styles.pickupContainer]}>
              <Text style={styles.pickupLabel}>Pickup from</Text>
              <View style={styles.pickupRow}>
                <Text style={styles.pickupAddress}>{pickupLocationData?.address || pickupLocationData?.addressLine1}</Text>
                <TouchableOpacity style={styles.detailButton} onPress={viewDetails}>
                  <Text style={styles.detailText}>View details</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>


      </View>
    </SafeAreaView>
  );
};

export default OrderAcceptScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  mapContainer: {
    flex: 3,
    backgroundColor: "#f5f5f5",
  },
  mapImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  detailsContainer: {
    flex: 2,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 16,
    bottom: 25,
    // shadowColor: "#000",
    // shadowOpacity: 0.1,
    // shadowRadius: 8,
    // shadowOffset: { width: 0, height: -2 },
    // elevation: 5,
  },
  deliveryBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.lightGrey,
    padding: 20,
    // paddingHorizontal:10,
    borderRadius: 10,
    marginVertical: 10
  },
  deliveryImage: {
    width: 40,
    height: 40,
    objectFit: 'contain'
  },
  headingText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 16,
    flex: 1,
    alignItems: 'center',
  },
  addressContainer: {
    marginBottom: 16,
    marginTop: 16,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  addressTextContainer: {
    flex: 1,
  },
  addressTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333333",
  },
  addressSubtitle: {
    fontSize: 12,
    color: "#666666",
  },
  viewDetailsText: {
    fontSize: 12,
    color: "#7F8CFF",
    fontWeight: "600",
  },

  footerStyle: {
    // flex:0.25,
    marginTop: 20,
    // flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
    // backgroundColor: '#fff',
  },
  textContainer: {
    // flex: 1,
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  paymentInfo: {
    fontSize: 14,
    color: '#666',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: colors.red,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  cancelText: {
    color: colors.red,
    fontSize: 14,
    fontWeight: 'bold',
  },
  detailButton: {
    borderWidth: 1,
    borderColor: colors.purple,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  detailText: {
    color: colors.purple,
    fontSize: 14,
    fontWeight: 'bold',
  },
  markerContainer: { alignItems: "center", justifyContent: "center" },
  marker: { width: 20, height: 20, borderRadius: 10, borderWidth: 5, backgroundColor: colors.white },

  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    padding: 20,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    width: '70%'
  },
  timeBadge: {
    backgroundColor: "#E6D7FB",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  timeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#6C47FF",
  },
  partnerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    padding: 20,
    borderRadius: 10,
    marginBottom: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  partnerInfo: {
    flex: 1,
  },
  partnerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  rating: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 4,
    color: "#777",
  },
  iconRow: {
    flexDirection: "row",
    gap: 16,
  },
  iconText: {
    fontSize: 20, // Adjust size for better visibility
    color: "#6C47FF",
  },
  pickupContainer: {
    borderTopWidth: 1,
    borderTopColor: "#EAEAEA",
    paddingTop: 12,
  },
  pickupLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#777",
  },
  pickupRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
    width:'100%',
  },
  pickupAddress: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
   width:"50%"
  },
  detailsButton: {
    backgroundColor: "#F3E8FF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  detailsText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6C47FF",
  },
  // routeLine: { lineColor: "blue", lineWidth: 3 },
});



