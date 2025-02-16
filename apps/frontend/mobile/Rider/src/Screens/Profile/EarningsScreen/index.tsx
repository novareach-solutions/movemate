import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TextStyle,
} from 'react-native';
import {colors} from '../../../theme/colors';
import Header from '../../../components/Header';
import {typography} from '../../../theme/typography';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  ProfileScreens,
  ProfileScreensParamList,
} from '../../../navigation/ScreenNames';
import BlackArrow from '../../../assets/icons/blackArrow.svg';

// Data for earnings and orders
const earningsData = {
  daily: {amount: 45, orderEarnings: 40, tips: 5},
  weekly: {amount: 317, orderEarnings: 300, tips: 17},
  monthly: {amount: 1280, orderEarnings: 1200, tips: 80},
};

const orders = [
  {
    id: 0,
    type: 'Send a Package',
    status: 'Delivered',
    amount: 25,
    date: 'Dec 20, 2024, 2:15 PM',
    success: true,
  },
  {
    id: 1,
    type: 'Buy from a Store',
    status: 'Canceled',
    amount: 25,
    date: 'Dec 20, 2024, 2:15 PM',
    success: false,
  },
];

// Helper functions to format dates
const formatDaily = (date: Date) =>
  date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

const formatWeekly = (start: Date) => {
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  const startStr = start.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  const endStr = end.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });
  return `${startStr} - ${endStr}`;
};

const formatMonthly = (date: Date) =>
  date.toLocaleDateString('en-US', {month: 'short', year: 'numeric'});

const EarningsScreen = () => {
  const navigation = useNavigation<NavigationProp<ProfileScreensParamList>>();
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>(
    'weekly',
  );
  const [dailyDate, setDailyDate] = useState(new Date());
  const [weeklyStartDate, setWeeklyStartDate] = useState(
    new Date(2024, 11, 15),
  );
  const [monthlyDate, setMonthlyDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );

  let displayDate = '';
  if (activeTab === 'daily') {
    displayDate = formatDaily(dailyDate);
  } else if (activeTab === 'weekly') {
    displayDate = formatWeekly(weeklyStartDate);
  } else if (activeTab === 'monthly') {
    displayDate = formatMonthly(monthlyDate);
  }

  const handleLeftArrow = () => {
    if (activeTab === 'daily') {
      const newDate = new Date(dailyDate);
      newDate.setDate(newDate.getDate() - 1);
      setDailyDate(newDate);
    } else if (activeTab === 'weekly') {
      const newStart = new Date(weeklyStartDate);
      newStart.setDate(newStart.getDate() - 7);
      setWeeklyStartDate(newStart);
    } else if (activeTab === 'monthly') {
      const newMonth = new Date(monthlyDate);
      newMonth.setMonth(newMonth.getMonth() - 1);
      setMonthlyDate(newMonth);
    }
  };

  const handleRightArrow = () => {
    if (activeTab === 'daily') {
      const newDate = new Date(dailyDate);
      newDate.setDate(newDate.getDate() + 1);
      setDailyDate(newDate);
    } else if (activeTab === 'weekly') {
      const newStart = new Date(weeklyStartDate);
      newStart.setDate(newStart.getDate() + 7);
      setWeeklyStartDate(newStart);
    } else if (activeTab === 'monthly') {
      const newMonth = new Date(monthlyDate);
      newMonth.setMonth(newMonth.getMonth() + 1);
      setMonthlyDate(newMonth);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header isBack title="Earnings" />
      <View style={styles.container}>
        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {(['daily', 'weekly', 'monthly'] as const).map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Earnings Summary Card */}
        <View style={styles.earningsCard}>
          <View style={styles.earningsTopRow}>
            {/* Left Arrow */}
            <TouchableOpacity onPress={handleLeftArrow}>
              <BlackArrow width={30} height={30} />
            </TouchableOpacity>
            <View style={styles.earningsInfo}>
              <Text style={styles.dateRange}>{displayDate}</Text>
              <Text style={styles.earningsAmount}>
                ${earningsData[activeTab].amount}
              </Text>
              <Text style={styles.earningsTime}>25hr 47 mins online</Text>
            </View>
            {/* Right Arrow */}
            <TouchableOpacity onPress={handleRightArrow}>
              <BlackArrow width={30} height={30} style={styles.arrow} />
            </TouchableOpacity>
          </View>

          {/* Earnings Breakdown */}
          <View style={styles.earningsBottom}>
            <View style={styles.earningsBreakdown}>
              <Text style={styles.breakdownText}>Order Earnings</Text>
              <Text style={styles.breakdownAmount}>
                ${earningsData[activeTab].orderEarnings}
              </Text>
            </View>
            <View style={styles.earningsBreakdown}>
              <Text style={styles.breakdownText}>Tips</Text>
              <Text style={styles.breakdownAmount}>
                ${earningsData[activeTab].tips}
              </Text>
            </View>
          </View>
        </View>

        {/* See Details Button */}
        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>See details</Text>
        </TouchableOpacity>

        {/* Orders List */}
        <ScrollView style={styles.ordersContainer}>
          <Text style={styles.ordersHeader}>Today, Mon, Dec 20</Text>
          {orders.map(order => (
            <TouchableOpacity
              key={order.id}
              style={styles.orderCard}
              onPress={() =>
                navigation.navigate(ProfileScreens.OrderDetails, {
                  orderId: order.id,
                })
              }>
              <View style={styles.orderInfo}>
                <Text style={styles.orderType}>{order.type}</Text>
                <Text style={styles.orderDate}>{order.date}</Text>
              </View>
              <View style={styles.orderRight}>
                <Text
                  style={[
                    styles.orderStatus,
                    order.success ? styles.delivered : styles.canceled,
                  ]}>
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
    overflow: 'visible', // Allow children to overflow
  },
  tab: {
    paddingVertical: 8,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: colors.purple,
    marginBottom: -11, // Adjust negative margin for proper overlap
    zIndex: 1,
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
    padding: 10,
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
    fontWeight: typography.fontWeight.extraBold as TextStyle['fontWeight'],
    color: colors.purple,
  },
  earningsTime: {
    fontSize: 14,
    color: colors.text.subText,
  },
  arrow: {
    transform: [{rotate: '180deg'}],
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
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.purple,
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
});

export default EarningsScreen;
