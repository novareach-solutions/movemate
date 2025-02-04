import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  TextStyle,
} from 'react-native';
import { colors } from '../../theme/colors';
import Header from '../../components/Header';
import { typography } from '../../theme/typography';

// Dummy order data
const orderData = {
  orderId: '1289745976',
  type: 'Send a Package',
  packageType: 'Documents',
  status: 'Delivered',
  date: '26/01/2024, 08:34 PM',
  pickup: '45 George Street, opposite Fat Boys Phillys, Syd 2000',
  dropoff: '120 Collins Street, Mel 3000',
  deliveryCharges: 12.34,
  tip: 12.34,
  duration: '55.34 mins',
  distance: '12.4 kms',
};

const OrderDetailsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header isBack title="Order Detail" help  />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Order ID */}
        <Text style={styles.orderId}>Order ID: {orderData.orderId}</Text>

        {/* Row: Image, Order Details, and Status */}
        <View style={styles.orderRow}>
          {/* Left: Order Image */}
          <Image
            source={{ uri: 'https://via.placeholder.com/80' }}
            style={styles.orderImage}
          />

          {/* Middle: Order Details */}
          <View style={styles.orderDetails}>
            <Text style={styles.orderType}>{orderData.type}</Text>
            <Text style={styles.orderDate}>{orderData.date}</Text>
            <Text style={styles.packageType}>
              Package Type: {orderData.packageType}
            </Text>
          </View>

          {/* Right: Order Status (aligned at the top) */}
          <View style={styles.orderStatusContainer}>
            <Text style={styles.orderStatus}>{orderData.status} ✅</Text>
          </View>
        </View>

        {/* Pickup & Dropoff Locations */}
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>📍 {orderData.pickup}</Text>
          <Text style={styles.locationText}>📍 {orderData.dropoff}</Text>
        </View>

        {/* Earning Details with Icon */}
        <View style={styles.earningDetails}>
          <View style={styles.earningDetailsHeader}>
            <Text style={styles.earningIcon}>💰</Text>
            <Text style={styles.sectionTitle}>Earning Details</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailRowLabel}>Delivery Charges:</Text>
            <Text style={styles.detailRowValue}>
              ${orderData.deliveryCharges.toFixed(2)}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailRowLabel}>Tip:</Text>
            <Text style={styles.detailRowValue}>
              ${orderData.tip.toFixed(2)}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>
              ${(orderData.deliveryCharges + orderData.tip).toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Duration and Distance Section */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailColumnLeft}>
            <Text style={styles.detailLabel}>Duration</Text>
            <Text style={[styles.detailValue, { color: colors.black }]}>
              {orderData.duration}
            </Text>
          </View>
          <View style={styles.detailColumnRight}>
            <Text style={styles.detailLabel}>Distance</Text>
            <Text style={[styles.detailValue, { color: colors.black }]}>
              {orderData.distance}
            </Text>
          </View>
        </View>

        {/* Stars (Replace with your SVG later) */}
        <Text style={styles.ratingPrompt}>
          You've not been rated for this order
        </Text>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, index) => (
            <Text key={index} style={styles.starIcon}>
              ☆
            </Text>
          ))}
        </View>

        {/* Buttons with text on left and arrow on right */}
        <TouchableOpacity style={styles.detailsButton}>
          <View style={styles.detailsButtonContent}>
            <Text style={styles.detailsButtonText}>View Images</Text>
            <Text style={styles.arrowIcon}>→</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.detailsButton}>
          <View style={styles.detailsButtonContent}>
            <Text style={styles.detailsButtonText}>
              Request for Document Update Assistance
            </Text>
            <Text style={styles.arrowIcon}>→</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightButtonBackground,
  },
  contentContainer: {
    padding: 16,
  },
  orderId: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.semiMedium,
    fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
    color: colors.purple,
    marginBottom: 8,
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  orderImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  orderDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  orderType: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.medium,
    fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
    color: colors.black,
  },
  orderDate: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.small,
    color: colors.gray,
    marginVertical: 4,
  },
  packageType: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.small,
    color: colors.gray,
  },
  orderStatusContainer: {
    alignSelf: 'flex-start',
  },
  orderStatus: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.medium,
    color: colors.green,
  },
  locationContainer: {
    marginVertical: 10,
  },
  locationText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.small,
    marginVertical: 4,
  },
  earningDetails: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  earningDetailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  earningIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.medium,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.subText,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  detailRowLabel: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.small,
    color: colors.gray,
  },
  detailRowValue: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.small,
    fontWeight: typography.fontWeight.bold,
    color: colors.black,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderTopWidth: 1,
    borderColor: colors.border.lightGray,
    marginTop: 6,
  },
  totalLabel: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.medium,
    fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
  },
  totalValue: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.medium,
    fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
  },
  // Duration & Distance container: border on top and bottom only with a vertical divider
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border.lightGray,
  },
  detailColumnLeft: {
    flex: 1,
    alignItems: 'flex-start', // Left aligned
    borderRightWidth: 1,
    borderColor: colors.border.lightGray,
    paddingRight: 10,
  },
  detailColumnRight: {
    flex: 1,
    alignItems: 'flex-start', // Left aligned
    paddingLeft: 10,
  },
  detailLabel: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.small,
    color: colors.gray,
  },
  detailValue: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.medium,
    fontWeight: typography.fontWeight.bold,
    color: colors.black,
  },
  ratingPrompt: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.medium,
    marginVertical: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Left aligned
    marginBottom: 10,
  },
  starIcon: {
    fontSize: 30,
    color: colors.yellow,
    marginHorizontal: 5,
  },
  // Button styles matching the provided sample with text on left and arrow on right
  detailsButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.purple,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  detailsButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  detailsButtonText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 16,
    color: colors.purple,
  },
  arrowIcon: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 16,
    color: colors.purple,
  },
});

export default OrderDetailsScreen;
