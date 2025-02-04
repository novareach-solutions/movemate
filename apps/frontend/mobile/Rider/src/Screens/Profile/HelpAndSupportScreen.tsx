import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { images } from '../../assets/images/images';
import Header from '../../components/Header';
import MessagesTab from '../../components/MessageTab';

// Support Categories Data
const supportCategories = [
  { id: 1, name: 'Account & Profile', icon: images.accountIcon },
  { id: 2, name: 'Payments & Billing', icon: images.paymentIcon },
  { id: 3, name: 'Cancellation & Refunds', icon: images.refundIcon },
  { id: 4, name: 'Ongoing Orders', icon: images.ordersIcon },
  { id: 5, name: 'Post-Order Support', icon: images.supportIcon },
  { id: 6, name: 'Promo Codes & Referrals', icon: images.promoIcon },
  { id: 7, name: 'Reports & Issue Management', icon: images.reportIcon },
  { id: 8, name: 'Buy From A Store', icon: images.storeIcon },
  { id: 9, name: 'Others', icon: images.otherIcon },
];

const HelpAndSupportScreen = () => {
  const [selectedTab, setSelectedTab] = useState('FAQ');

  const renderMenuItem = ({ item, index }) => (
    <TouchableOpacity style={[styles.menuItem, index === 0 && styles.firstItem]}>
      <View style={styles.iconContainer}>
        <Image source={item.icon} style={styles.icon} />
      </View>
      <Text style={styles.menuTitle}>{item.name}</Text>
      <Image source={images.blackArrow} style={styles.arrowIcon} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header isBack title="Help & Support" />

      {/* Tab Bar */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'FAQ' && styles.activeTab]}
          onPress={() => setSelectedTab('FAQ')}
        >
          <Text style={[styles.tabText, selectedTab === 'FAQ' && styles.activeTabText]}>
            FAQ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Messages' && styles.activeTab]}
          onPress={() => setSelectedTab('Messages')}
        >
          <Text style={[styles.tabText, selectedTab === 'Messages' && styles.activeTabText]}>
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
            keyExtractor={(item) => item.id.toString()}
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
    color: colors.gray,
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
});

export default HelpAndSupportScreen;
