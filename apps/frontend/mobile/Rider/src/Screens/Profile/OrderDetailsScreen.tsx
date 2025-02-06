import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    TextStyle,
} from 'react-native';
import { colors } from '../../theme/colors';
import Header from '../../components/Header';
import { typography } from '../../theme/typography';
import IconWithImage from '../../components/IconWithImage';
import DeliverAPackage from '../../assets/icons/deliverAPackageIcon.svg';

// Import the new SVG icons for stars and arrow
import StarFilled from '../../assets/icons/starFilled.svg';
import StarOutlined from '../../assets/icons/starOutlined.svg';
import Arrow from '../../assets/icons/blackArrow.svg';

import StatusBadge from '../../components/StatusBadge';
import EarningRow from '../../components/EarningRow';

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

const earnings = {
    totalEarnings: 12.34,
    tip: 12.3,
    commissionRate: 10,
    finalEarnings: 14.64,
};

const OrderDetailsScreen = () => {
    // If you eventually have a rating value, you can update this array.
    // Here, for an unrated order, we’ll show all outlined stars.
    const rating = 0;
    const totalStars = 5;

    return (
        <SafeAreaView style={styles.container}>
            <Header isBack title="Order Detail" help />
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {/* Order ID */}
                <Text style={styles.orderId}>Order ID: {orderData.orderId}</Text>

                {/* Row: Image, Order Details, and Status */}
                <View style={styles.orderRow}>
                    {/* Left: Order Image */}
                    <IconWithImage IconComponent={DeliverAPackage} margin />

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
                        <StatusBadge success={orderData.status === 'Delivered'} />
                    </View>
                </View>

                {/* Earnings Section */}
                <View style={styles.earningsContainer}>
                    {/* Header */}
                    <Text style={styles.sectionTitle}>Your Earning</Text>

                    {/* Earnings Mode */}
                    <View style={styles.earningModeRow}>
                        <Text style={styles.earningMode}>Mode of earning</Text>
                        <Text style={styles.commissionModel}>Commission model</Text>
                    </View>

                    {/* Earnings Breakdown using EarningRow Component */}
                    <EarningRow
                        label="Total Earning"
                        value={`$${earnings.totalEarnings}`}
                    />
                    <EarningRow
                        label="Tip"
                        value={`$${earnings.tip.toFixed(2)}`}
                    />
                    <EarningRow
                        label={`Commission Deducted (${earnings.commissionRate}%)`}
                        value={`$${earnings.commissionRate}`}
                        isRed
                        isDashed
                    />
                    <EarningRow
                        label="Your Earnings"
                        value={`$${earnings.finalEarnings}`}
                        isGreen
                        isBold
                    />
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

                {/* Rating Section */}
                <Text style={styles.ratingPrompt}>
                    You've not been rated for this order
                </Text>
                <View style={styles.ratingContainer}>
                    {Array.from({ length: totalStars }, (_, index) => {
                        // If a rating exists, show filled stars; otherwise, show outlined stars.
                        return rating > index ? (
                            <StarFilled key={index} width={30} height={30} style={styles.starIcon} />
                        ) : (
                            <StarOutlined key={index} width={30} height={30} style={styles.starIcon} />
                        );
                    })}
                </View>

                {/* Buttons with text on left and arrow (using SVG) on right */}
                <TouchableOpacity style={styles.detailsButton}>
                    <View style={styles.detailsButtonContent}>
                        <Text style={styles.detailsButtonText}>View Images</Text>
                        <Arrow width={16} height={16} style={{
                            transform: [{ rotate: '180deg' }],
                        }}/>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.detailsButton}>
                    <View style={styles.detailsButtonContent}>
                        <Text style={styles.detailsButtonText}>
                            Request for Document Update Assistance
                        </Text>
                        <Arrow width={16} height={16} style={{
                            transform: [{ rotate: '180deg' }],
                        }} />
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
        // Ensure all content is aligned to the left
        alignItems: 'flex-start',
    },
    orderId: {
        fontFamily: typography.fontFamily.regular,
        fontSize: typography.fontSize.semiMedium,
        fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
        color: colors.purple,
        marginBottom: 8,
        alignSelf: 'stretch',
    },
    orderRow: {
        flexDirection: 'row',
        alignItems: 'flex-start', // Align items at the top so text is in line with the image
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 8,
        marginBottom: 16,
        alignSelf: 'stretch',
    },
    orderDetails: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 10,
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
        color: colors.text.primaryGrey,
        marginVertical: 4,
    },
    packageType: {
        fontFamily: typography.fontFamily.regular,
        fontSize: typography.fontSize.small,
        color: colors.text.primaryGrey,
    },
    orderStatusContainer: {
        // Align status badge to the top-right of the order row
        alignSelf: 'flex-start',
    },
    locationContainer: {
        marginVertical: 10,
        alignSelf: 'stretch',
    },
    locationText: {
        fontFamily: typography.fontFamily.regular,
        fontSize: typography.fontSize.small,
        marginVertical: 4,
    },
    earningsContainer: {
        alignSelf: 'stretch',
        marginVertical: 16,
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 8,
    },
    earningModeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        alignSelf: 'stretch',
    },
    earningMode: {
        fontSize: typography.fontSize.small,
        color: colors.purple,
        fontWeight: 'bold',
    },
    commissionModel: {
        fontSize: typography.fontSize.small,
        color: colors.purple,
        fontWeight: 'bold',
    },
    earningDetails: {
        marginVertical: 10,
        padding: 10,
        borderRadius: 8,
        backgroundColor: 'transparent',
        alignSelf: 'stretch',
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
        fontWeight: typography.fontWeight.bold as TextStyle["fontWeight"],
        color: colors.text.subText,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
        alignSelf: 'stretch',
    },
    detailRowLabel: {
        fontFamily: typography.fontFamily.regular,
        fontSize: typography.fontSize.small,
        color: colors.text.primaryGrey,
    },
    detailRowValue: {
        fontFamily: typography.fontFamily.regular,
        fontSize: typography.fontSize.small,
        fontWeight: typography.fontWeight.bold as TextStyle["fontWeight"],
        color: colors.black,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 6,
        borderTopWidth: 1,
        borderColor: colors.border.lightGray,
        marginTop: 6,
        alignSelf: 'stretch',
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
        alignSelf: 'stretch',
    },
    detailColumnLeft: {
        flex: 1,
        alignItems: 'flex-start',
        borderRightWidth: 1,
        borderColor: colors.border.lightGray,
        paddingRight: 10,
    },
    detailColumnRight: {
        flex: 1,
        alignItems: 'flex-start',
        paddingLeft: 10,
    },
    detailLabel: {
        fontFamily: typography.fontFamily.regular,
        fontSize: typography.fontSize.small,
        color: colors.text.primaryGrey,
    },
    detailValue: {
        fontFamily: typography.fontFamily.regular,
        fontSize: typography.fontSize.medium,
        fontWeight: typography.fontWeight.bold as TextStyle["fontWeight"],
    },
    ratingPrompt: {
        fontFamily: typography.fontFamily.regular,
        fontSize: typography.fontSize.medium,
        marginVertical: 10,
        alignSelf: 'stretch',
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
    },
    starIcon: {
        marginHorizontal: 5,
    },
    detailsButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.purple,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
        marginVertical: 12,
        paddingHorizontal: 16,
        alignSelf: 'stretch',
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
