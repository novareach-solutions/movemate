import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextStyle,
  SafeAreaView,
} from 'react-native';
import {colors} from '../../../theme/colors';
import {typography} from '../../../theme/typography';
import {images} from '../../../assets/images/images';
import ProfileScreen from '..';
import {ProfileScreens} from '../../../navigation/ScreenNames';
import {useNavigation} from '@react-navigation/native';
import Header from '../../../components/Header';

const historyData = [
  {
    amount: '$127',
    cardDetails: 'Card ending with 5024',
    date: 'Nov 22, 2024, 2:15 PM',
    status: 'Successful',
  },
  {
    amount: '$80',
    cardDetails: 'Card ending with 1234',
    date: 'Nov 20, 2024, 11:00 AM',
    status: 'Successful',
  },
  {
    amount: '$50',
    cardDetails: 'Card ending with 5678',
    date: 'Nov 18, 2024, 4:30 PM',
    status: 'Successful',
  },
];

const WalletScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Wallet' | 'Virtual Card'>(
    'Wallet',
  );
  const [payoutFilter, setPayoutFilter] = useState('Week');
  const navigation = useNavigation();

  const renderHistoryCard = (item: (typeof historyData)[0], index: number) => (
    <View key={index} style={styles.historyCard}>
      <View style={styles.historyDetailsContainer}>
        <Text style={styles.historyAmount}>{item.amount}</Text>
        <Text style={styles.historyDetails}>{item.cardDetails}</Text>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
            marginTop: 30,
          }}>
          <Text style={styles.viewDetails}>View details</Text>
          <Image style={styles.viewicon} source={images.arrow} />
        </View>
      </View>
      <View style={styles.historyRightContainer}>
        <Text style={styles.historyDate}>{item.date}</Text>
        <View style={styles.successContainer}>
          <Text style={styles.successText}>{item.status}</Text>
          <Image source={images.successIcon} style={styles.successIcon} />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>

      <Header title='Wallet' isBack />
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Wallet' && styles.activeTab]}
          onPress={() => setActiveTab('Wallet')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Wallet' && styles.activeTabText,
            ]}>
            Wallet
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Virtual Card' && styles.activeTab]}
          onPress={() => setActiveTab('Virtual Card')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Virtual Card' && styles.activeTabText,
            ]}>
            Virtual Card
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'Wallet' && (
        <ScrollView contentContainerStyle={styles.content}>
          {/* Available Balance Card */}
          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Available balance</Text>
            <Text style={styles.balanceAmount}>$62.14</Text>
            <TouchableOpacity style={styles.manageMethods}>
              <Text style={styles.manageMethodsText}>
                Manage payment methods
              </Text>
              <Image source={images.whiteArrow} style={styles.arrowIcon} />
            </TouchableOpacity>
          </View>

          {/* Payout Scheduled */}
          <View style={styles.payoutSchedule}>
            <Image source={images.payoutCalender} />
            <Text style={styles.payoutScheduleText}>
              Payout scheduled: 9th Dec
            </Text>
          </View>

          {/* Pay Out Button */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ProfileScreens.Payout);
            }}
            style={styles.payoutButton}>
            <Text style={styles.payoutButtonText}>Pay out</Text>
          </TouchableOpacity>

          {/* Payout History */}
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>Payout history</Text>
            <TouchableOpacity style={styles.dropdownButton}>
              <Text style={styles.dropdownText}>{payoutFilter}</Text>
              <Image source={images.arrow} style={styles.dropdownIcon} />
            </TouchableOpacity>
          </View>
          {historyData.map(renderHistoryCard)}
        </ScrollView>
      )}

      {activeTab === 'Virtual Card' && (
        <View style={styles.virtualCardContent}>
          <Text style={styles.virtualCardText}>
            Virtual Card feature coming soon!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightButtonBackground,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.border.primary,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: typography.fontSize.medium,
    color: colors.text.primaryGrey,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  balanceCard: {
    backgroundColor: colors.purple,
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: typography.fontSize.medium,
    color: colors.white,
    marginBottom: 5,
  },
  balanceAmount: {
    fontSize: typography.fontSize.large,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 10,
  },
  manageMethods: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 70,
  },
  manageMethodsText: {
    fontSize: typography.fontSize.small,
    color: colors.white,
  },
  arrowIcon: {
    tintColor: colors.white,
    marginLeft: 5,
  },
  payoutSchedule: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.border.lightGray,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  payoutScheduleText: {
    fontSize: typography.fontSize.medium,
    color: colors.text.primary,
  },
  payoutButton: {
    backgroundColor: colors.green,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  payoutButtonText: {
    fontSize: typography.fontSize.medium,
    color: colors.white,
    fontWeight: 'bold',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  historyTitle: {
    fontSize: typography.fontSize.medium,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.lightGray,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  dropdownText: {
    fontSize: typography.fontSize.medium,
    color: colors.primary,
    marginRight: 5,
  },
  dropdownIcon: {
    tintColor: colors.primary,
    width: 10,
    height: 10,
  },
  historyCard: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border.lightGray,
  },
  historyDetailsContainer: {
    flex: 2,
  },
  historyAmount: {
    fontSize: typography.fontSize.medium,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  historyDetails: {
    fontSize: typography.fontSize.small,
    color: colors.text.primaryGrey,
  },
  historyRightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  historyDate: {
    fontSize: typography.fontSize.small,
    color: colors.text.subText,
  },
  successContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    gap: 6,
  },
  successText: {
    fontSize: typography.fontSize.medium,
    color: colors.green,
  },
  successIcon: {
    width: 16,
    height: 16,
    tintColor: colors.green,
  },
  viewDetails: {
    fontSize: typography.fontSize.medium,
    color: colors.primary,
  },
  virtualCardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  virtualCardText: {
    fontSize: typography.fontSize.medium,
    color: colors.text.primaryGrey,
  },
  viewicon:{
    width:12,
    height:12,
    objectFit:"contain"
  }
});

export default WalletScreen;
