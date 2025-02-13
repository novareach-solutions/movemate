import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  TextInput,
} from "react-native";
import Header from "../../../components/Header";
import { images } from "../../../assets/images/images";
import { CustomerScreens } from "../../../navigation/ScreenNames";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../theme/colors";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getOrederDetails } from "../../../redux/slices/deliverAPackageSlice";

const OrderDetails = () => {
  const navigation = useNavigation()
  const pickupLocationData = useAppSelector(state => state.deliverAPackage.pickupLocation);
  const dropLocationData = useAppSelector(state => state.deliverAPackage.dropLocation);
  const [orderData, setOrderData] = useState(null);
  const orderId = useAppSelector(state => state.deliverAPackage.id);
  console.log('id', orderId)
  const dispatch = useAppDispatch();
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

  return (
    <SafeAreaView style={styles.container}>
      <Header isBack title="Order Detail" bgColor={colors.lightGrey} help />
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          {
            orderData?.status === "PENDING" && <Text>Looking for a delivery partner near you...</Text>
          }
          {
            orderData?.status === "COMPLETED" && <Text>Order has been completed.
            </Text>
          }
          {
            (orderData?.status !== "PENDING" && orderData?.status !== "CANCELLED") && <Text>Delivery partner assigned! On the way..</Text>
          }

        </View>

        <View style={styles.addressContainer}>
          <Text style={styles.label}>
            <Text style={{ color: 'green', fontWeight: 'bold' }}>From: </Text>
            {pickupLocationData?.address || pickupLocationData?.addressLine1}
          </Text>

          <View style={styles.dashedLine}></View>

          <Text style={styles.label}>
            <Text style={{ color: 'red', fontWeight: 'bold' }}>To: </Text>
            {dropLocationData?.address || dropLocationData?.addressLine1}
          </Text>
        </View>

        {/* Bill Details */}
        <View style={styles.billContainer}>
          <Text style={styles.sectionTitle}>Bill Details</Text>
          <View style={styles.billRow}>
            <Text style={styles.billText}>Handling Fee</Text>
            <Text style={styles.billText}>$2</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billText}>Delivery Fee for 5 kms</Text>
            <Text style={styles.billText}>$25</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.billRow}>
            <Text style={styles.toPayText}>To Pay</Text>
            <Text style={styles.toPayAmount}>$27</Text>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.paymentContainer}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.cardContainer}>
            <images.VisaIcon width={50} height={20} style={styles.cardIcon} />
            <View style={styles.cardDetails}>
              <Text style={styles.cardBank}>Bank of Melbourne</Text>
              <Text style={styles.cardNumber}>**** 1234</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  dashedLine: {
    borderWidth: 0.75,
    borderStyle: 'dashed',
    marginVertical: 20,
    borderColor: '#77777766'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#000',
  },
  addressContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#000',
  },
  swapIcon: {
    alignSelf: 'center',
    marginVertical: 8,
  },
  billContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  billText: {
    fontSize: 14,
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
  },
  toPayText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  toPayAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  paymentContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    width: 50,
    height: 20,
    resizeMode: 'contain',
    marginRight: 12,
  },
  cardDetails: {
    flexDirection: 'column',
  },
  cardBank: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardNumber: {
    fontSize: 12,
    color: '#A0A0A0',
  },
});

export default OrderDetails;
