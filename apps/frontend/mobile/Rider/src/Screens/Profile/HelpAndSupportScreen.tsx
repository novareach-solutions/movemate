import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import {colors} from '../../theme/colors';
import {typography} from '../../theme/typography';
import Header from '../../components/Header';
import MessagesTab from '../../components/MessageTab';
import AccountAndProfile from '../../assets/icons/accountAndProfile.svg';
import Billing from '../../assets/icons/billing.svg';
import Refunds from '../../assets/icons/refunds.svg';
import OngoingOrders from '../../assets/icons/ongoingOrders.svg';
import PostOrders from '../../assets/icons/postOrder.svg';
import PromoCodes from '../../assets/icons/promoCodes.svg';
import Warning from '../../assets/icons/warning.svg';
import TrippleDots from '../../assets/icons/trippleDots.svg';
import BlackArrow from '../../assets/icons/blackArrow.svg';
import {SvgProps} from 'react-native-svg';

interface MenuItem {
  icon: React.FC<SvgProps>;
  name: string;
}

// Support Categories Data
const supportCategories = [
  {id: 1, name: 'Account & Profile', icon: AccountAndProfile},
  {id: 2, name: 'Payments & Billing', icon: Billing},
  {id: 3, name: 'Cancellation & Refunds', icon: Refunds},
  {id: 4, name: 'Ongoing Orders', icon: OngoingOrders},
  {id: 5, name: 'Post-Order Support', icon: PostOrders},
  {id: 6, name: 'Promo Codes & Referrals', icon: PromoCodes},
  {id: 7, name: 'Reports & Issue Management', icon: Warning},
  {id: 8, name: 'Buy From A Store', icon: AccountAndProfile},
  {id: 9, name: 'Others', icon: TrippleDots},
];

const HelpAndSupportScreen = () => {
  const [selectedTab, setSelectedTab] = useState('FAQ');

  const renderMenuItem = ({item, index}: {item: MenuItem; index: number}) => (
    <TouchableOpacity
      style={[styles.menuItem, index === 0 && styles.firstItem]}>
      <View style={styles.iconContainer}>
        <item.icon style={styles.icon} />
      </View>
      <Text style={styles.menuTitle}>{item.name}</Text>
      <BlackArrow style={styles.arrowIcon} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header isBack title="Help & Support" />

      {/* Tab Bar */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'FAQ' && styles.activeTab]}
          onPress={() => setSelectedTab('FAQ')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'FAQ' && styles.activeTabText,
            ]}>
            FAQ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Messages' && styles.activeTab]}
          onPress={() => setSelectedTab('Messages')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'Messages' && styles.activeTabText,
            ]}>
            Messages
          </Text>
        </TouchableOpacity>
      </View>

      {/* Show either FAQ list or Messages tab */}
      {selectedTab === 'FAQ' ? (
        <>
          <Text style={styles.heading}>Having trouble with your order?</Text>
          <FlatList
            data={supportCategories}
            keyExtractor={item => item.id.toString()}
            renderItem={renderMenuItem}
            contentContainerStyle={styles.listContainer}
          />
        </>
      ) : (
        <MessagesTab />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightButtonBackground,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border.lightGray,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.purple,
  },
  tabText: {
    fontSize: 16,
    color: colors.text.primaryGrey,
    fontFamily: typography.fontFamily.regular,
  },
  activeTabText: {
    color: colors.purple,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: typography.fontSize.medium,
    fontWeight: 'bold',
    paddingVertical: 16,
    color: colors.black,
    paddingHorizontal: 16,
  },
  listContainer: {
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.lightGray,
  },
  firstItem: {
    borderTopWidth: 1,
    borderTopColor: colors.border.lightGray,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: colors.text.primaryGrey,
  },
  menuTitle: {
    flex: 1,
    fontSize: typography.fontSize.medium,
    color: colors.black,
  },
  arrowIcon: {
    transform: [{rotate: '180deg'}],
  },
});

export default HelpAndSupportScreen;
