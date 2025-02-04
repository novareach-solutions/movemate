import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  // Image, // Uncomment when adding tick/wrong icons
} from 'react-native';
import { colors } from '../../../theme/colors';
import Header from '../../../components/Header';
import { typography } from '../../../theme/typography';
import { useNavigation } from '@react-navigation/native';
import { ProfileScreens } from '../../../navigation/ScreenNames';

const earningsData = {
  daily: { amount: 45, orderEarnings: 40, tips: 5 },
  weekly: { amount: 317, orderEarnings: 300, tips: 17 },
  monthly: { amount: 1280, orderEarnings: 1200, tips: 80 },
};

const orders = [
  {
    id:0,
    type: 'Send a Package',
    status: 'Delivered',
    amount: 25,
    date: 'Dec 20, 2024, 2:15 PM',
    success: true,
  },
  {
    id:1,
    type: 'Buy from a Store',
    status: 'Canceled',
    amount: 25,
    date: 'Dec 20, 2024, 2:15 PM',
    success: false,
  },
];

const EarningsScreen = () => {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [dateRange, setDateRange] = useState('15 - 21 Dec');
  const navigation=useNavigation()

  return (
    <SafeAreaView style={{
      flex: 1
    }}>
      <Header isBack title='Earnings' />
      <View style={styles.container}>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {(['daily', 'weekly', 'monthly'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}>
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Earnings Summary Card */}
        <View style={styles.earningsCard}>
          {/* Top Row: Arrows and Earnings Info */}
          <View style={styles.earningsTopRow}>
            <TouchableOpacity>
              <Text style={styles.arrow}>{'<'}</Text>
            </TouchableOpacity>
            <View style={styles.earningsInfo}>
              <Text style={styles.dateRange}>{dateRange}</Text>
              <Text style={styles.earningsAmount}>${earningsData[activeTab].amount}</Text>
              <Text style={styles.earningsTime}>25hr 47 mins online</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.arrow}>{'>'}</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Section: Order Earnings and Tips */}
          <View style={styles.earningsBottom}>
            <View style={styles.earningsBreakdown}>
              <Text style={styles.breakdownText}>Order Earnings</Text>
              <Text style={styles.breakdownAmount}>${earningsData[activeTab].orderEarnings}</Text>
            </View>
            <View style={styles.earningsBreakdown}>
              <Text style={styles.breakdownText}>Tips</Text>
              <Text style={styles.breakdownAmount}>${earningsData[activeTab].tips}</Text>
            </View>
          </View>
        </View>

        {/* See Details Button */}
        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>See details</Text>
        </TouchableOpacity>

        <ScrollView style={styles.ordersContainer}>
          <Text style={styles.ordersHeader}>Today, Mon, Dec 20</Text>
          {orders.map((order) => (
            <TouchableOpacity
              key={order.id}
              style={styles.orderCard}
              onPress={() => navigation.navigate(ProfileScreens.OrderDetails, { orderId: order.id })}
            >
              <View style={styles.orderInfo}>
                <Text style={styles.orderType}>{order.type}</Text>
                <Text style={styles.orderDate}>{order.date}</Text>
              </View>
              <View style={styles.orderRight}>
                <Text style={[styles.orderStatus, order.success ? styles.delivered : styles.canceled]}>
                  {order.status}
                </Text>
                <Text style={styles.orderAmount}>+${order.amount}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightButtonBackground,
    paddingHorizontal: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderColor: colors.border.lightGray,
    borderBottomWidth: 1,
  },
  tab: {
    paddingVertical: 8,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: colors.purple,
  },
  tabText: {
    fontSize: 16,
    color: colors.text.primaryGrey,
  },
  activeTabText: {
    color: colors.purple,
    fontWeight: 'bold',
  },
  earningsCard: {
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 16,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: colors.border.lightGray,
    paddingTop: 20,
  },
  earningsTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  earningsInfo: {
    alignItems: 'center',
  },
  dateRange: {
    fontSize: 16,
    color: colors.text.primaryGrey,
  },
  earningsAmount: {
    fontSize: 30,
    fontWeight: typography.fontWeight.extraBold,
    color: colors.purple,
  },
  earningsTime: {
    fontSize: 14,
    color: colors.text.subText,
  },
  arrow: {
    fontSize: 26,
    color: colors.purple,
  },
  earningsBottom: {
    marginTop: 35,
  },
  earningsBreakdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  breakdownText: {
    fontSize: 16,
    color: colors.text.primary,
  },
  breakdownAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  detailsButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.purple,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 12,
  },
  detailsButtonText: {
    color: colors.purple,
    fontSize: 16,
  },
  ordersContainer: {
    marginTop: 16,
  },
  ordersHeader: {
    fontSize: 16, // Slightly smaller
    fontWeight: 'bold',
    color: colors.purple, // Purple text
    marginBottom: 12,
  },
  orderCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border.primary,
  },
  orderInfo: {
    flex: 1,
  },
  orderType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  orderDate: {
    fontSize: 14,
    color: colors.text.primaryGrey,
  },
  orderRight: {
    alignItems: 'flex-end',
  },
  orderStatus: {
    fontSize: 14,
    marginBottom: 4,
    // Additional styling for the status text can be added here
  },
  delivered: {
    color: colors.green,
  },
  canceled: {
    color: colors.error,
  },
  orderAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  // Uncomment and adjust the size when you add the status icons
  // statusIcon: {
  //   width: 16,
  //   height: 16,
  //   marginRight: 4,
  // },
});

export default EarningsScreen;
