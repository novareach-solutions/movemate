import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { colors } from '../../../theme/colors';
import Header from '../../../components/Header';

const earningsData = {
  daily: { amount: 45, orderEarnings: 40, tips: 5 },
  weekly: { amount: 317, orderEarnings: 300, tips: 17 },
  monthly: { amount: 1280, orderEarnings: 1200, tips: 80 },
};

const orders = [
  { type: 'Send a Package', status: 'Delivered', amount: 25, date: 'Dec 20, 2024, 2:15 PM', success: true },
  { type: 'Buy from a Store', status: 'Canceled', amount: 25, date: 'Dec 20, 2024, 2:15 PM', success: false },
];

const EarningsScreen = () => {
  const [activeTab, setActiveTab] = useState('weekly');

  return (
    <SafeAreaView style={styles.container}>
      <Header isBack title='Earnings' />

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {['daily', 'weekly', 'monthly'].map((tab) => (
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

      {/* Earnings Summary */}
      <View style={styles.earningsContainer}>
        <Text style={styles.earningsAmount}>${earningsData[activeTab].amount}</Text>
        <Text style={styles.earningsSubText}>{earningsData[activeTab].orderEarnings} Order Earnings</Text>
        <Text style={styles.earningsSubText}>{earningsData[activeTab].tips} Tips</Text>
      </View>

      <ScrollView style={styles.ordersContainer}>
        <Text style={styles.ordersHeader}>Today, Mon, Dec 20</Text>
        {orders.map((order, index) => (
          <View key={index} style={styles.orderCard}>
            <View>
              <Text style={styles.orderType}>{order.type}</Text>
              <Text style={styles.orderDate}>{order.date}</Text>
            </View>
            <Text style={[styles.orderAmount, order.success ? styles.success : styles.error]}>
              {order.success ? '+' : '-'}${order.amount}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.black,
    padding: 20,
    textAlign: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: colors.border.primary,
    paddingVertical: 10,
  },
  tab: {
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 16,
    color: colors.text.primaryGrey,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  earningsContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  earningsAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
  },
  earningsSubText: {
    fontSize: 16,
    color: colors.text.subText,
    marginVertical: 2,
  },
  ordersContainer: {
    paddingHorizontal: 20,
  },
  ordersHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 10,
  },
  orderCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.lightButtonBackground,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border.primary,
  },
  orderType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  orderDate: {
    fontSize: 14,
    color: colors.text.subText,
  },
  orderAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  success: {
    color: colors.green,
  },
  error: {
    color: colors.error,
  },
});

export default EarningsScreen;
