import React, { useEffect } from "react";
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
import { assignOrder } from "../../../redux/slices/deliverAPackageSlice";

const DeliveryTrackingScreen = () => {
     const orderId = useAppSelector(state => state.deliverAPackage.id);
     const pickupLocation = useAppSelector(state => state.deliverAPackage.pickupLocation);
const dispatch = useAppDispatch();
    useEffect(()=>{
        if(orderId){
            assignRider();
        }
    },[])
    const assignRider = async () => {
        if (!pickupLocation || pickupLocation.pickupLattitude === null || pickupLocation.pickupLongitude === null) {
            Alert.alert('Pickup location data is missing.');
            return;
        }
    
        try {
            // await dispatch(assignOrder({
            //     pickupLatitude: pickupLocation.pickupLattitude ?? 0,
            //     pickupLongitude: pickupLocation.pickupLongitude ?? 0, 
            //     orderId:orderId ?? ""
            // }));
            Alert.alert("We've Assigned a Delivery Agent for your order.")
        } catch (error) {
            console.log('Error assigning rider:', error);
        }
    };
    
  return (
    <SafeAreaView style={styles.container}>
      {/* Map Section */}
      <View style={styles.mapContainer}>
        <Image
          source={images.map}
          style={styles.mapImage}
        />
      </View>

      {/* Details Section */}
      <View style={styles.detailsContainer}>
        <View style={styles.deliveryBox}>
            <Text style={styles.headingText}>Looking for a delivery partner near you...</Text>
            <Image source={images.deliveryMan} style={styles.deliveryImage}/>
        </View>
        

        {/* Address Details */}
        <View style={styles.addressContainer}>
          {/* Pickup Address */}
          <View style={styles.addressRow}>
            <View style={[styles.dot, { backgroundColor: "green" }]} />
            <View style={styles.addressTextContainer}>
              <Text style={styles.addressTitle}>88 Zurab Gorgiladze St</Text>
              <Text style={styles.addressSubtitle}>Georgia, Batumi</Text>
            </View>
            <TouchableOpacity style={styles.detailButton}>
              <Text style={styles.detailText}>View details</Text>
            </TouchableOpacity>
          </View>

          {/* Drop Address */}
          <View style={styles.addressRow}>
            <View style={[styles.dot, { backgroundColor: "red" }]} />
            <View style={styles.addressTextContainer}>
              <Text style={styles.addressTitle}>5 Noe Zhordania St</Text>
              <Text style={styles.addressSubtitle}>Georgia, Batumi</Text>
            </View>
          </View>
        </View>

        <View style={styles.footerStyle}>
      <View style={styles.textContainer}>
        <Text style={styles.amountText}>$36</Text>
        <Text style={styles.paymentInfo}>Paid via card ending in 8930</Text>
      </View>
      <TouchableOpacity style={styles.cancelButton}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
        </View>

       
      </View>
    </SafeAreaView>
  );
};

export default DeliveryTrackingScreen;

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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 5,
  },
  deliveryBox:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    backgroundColor:colors.lightGrey,
    padding:20,
    // paddingHorizontal:10,
    borderRadius:10,
    marginBottom:10
  },
  deliveryImage:{
    width:40,
    height:40,
    objectFit:'contain'
  },
  headingText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 16,
    flex:1,
    alignItems:'center',
  },
  addressContainer: {
    marginBottom: 16,
    marginTop:16,
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

  footerStyle:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
  },
  textContainer: {
    flex: 1,
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
});
