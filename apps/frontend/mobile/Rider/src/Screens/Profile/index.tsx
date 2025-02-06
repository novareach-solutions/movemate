import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { colors } from "../../theme/colors";
import { typography } from "../../theme/typography";
import {
  AuthScreens,
  ProfileScreens,
} from "../../navigation/ScreenNames";
import Header from "../../components/Header";
import Crown from "../../assets/icons/crown.svg";
import Wallet from "../../assets/icons/wallet.svg";
import Earnings from "../../assets/icons/earnings.svg";
import Inbox from "../../assets/icons/inbox.svg";
import Help from "../../assets/icons/blackHelp.svg";
import Logout from "../../assets/icons/logout.svg";
import Account from "../../assets/icons/account.svg";
import Refer from "../../assets/icons/refer.svg";
import BlackArrow from "../../assets/icons/blackArrow.svg";

const profileData = [
  {
    id: "1",
    title: "Earnings",
    icon: Earnings,
    screen: ProfileScreens.Earnings,
  },
  {
    id: "2",
    title: "Wallet",
    icon: Wallet,
    screen: ProfileScreens.Wallet,
  },
  {
    id: "3",
    title: "Earning Mode",
    icon: Crown,
    screen: ProfileScreens.EarningMode,
  },
  {
    id: "4",
    title: "Refer & Earn",
    icon: Refer,
    screen: ProfileScreens.ReferFriends,
  },
  {
    id: "5",
    title: "Notifications",
    icon: Inbox,
    screen: ProfileScreens.Inbox,
  },
  {
    id: "6",
    title: "Ratings",
    icon: Inbox,
    screen: ProfileScreens.Ratings,
    notificationCount: 3,
  },
  {
    id: "7",
    title: "Help & Support",
    icon: Help,
    screen: ProfileScreens.HelpAndSupport,
    notificationCount: 2,
  },
  {
    id: "8",
    title: "Account",
    icon: Account,
    screen: ProfileScreens.Account,
  },
  {
    id: "9",
    title: "Log Out",
    icon: Logout,
    screen: AuthScreens.Onboarding,
    isLogout: true,
  },
];

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const renderItem = ({ item }: { item: (typeof profileData)[0] }) => (
    <TouchableOpacity
      style={[styles.listItem]}
      onPress={() => navigation.navigate(item.screen)}>
      <item.icon width={24} height={24} />
      <Text style={[styles.itemText]}>{item.title}</Text>
      {/* {item.notificationCount && (
                <View style={styles.notificationBadge}>
                    <Text style={styles.notificationText}>{item.notificationCount}</Text>
                </View>
            )} */}
      <View>
        <BlackArrow style={{ transform: [{ rotate: '180deg' }], }} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header logo isBack />
      {/* Fixed Profile Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/100' }}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileDetails}>+61 6783940545</Text>
          <Text style={styles.membership}>
            Membership valid till 23rd February
          </Text>
        </View>
      </View>

      {/* Scrollable Area */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        {/* Weekly Subscription Plan (Now Scrollable) */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ProfileScreens.EarningMode);
          }}
          style={styles.subscriptionPlan}>
          <Text style={styles.subscriptionText}>Weekly subscription plan</Text>
          <View style={styles.subscriptionBadge}>
            <Text style={styles.subscriptionBadgeText}>ACTIVE</Text>
          </View>
        </TouchableOpacity>

        {/* Scrollable Menu List */}
        <FlatList
          data={profileData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          scrollEnabled={false} // FlatList should not have its own scrolling
        />
      </ScrollView>
    </SafeAreaView>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightButtonBackground,
    paddingBottom: 30
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.primary,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileName: {
    fontSize: typography.fontSize.large,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  profileDetails: {
    fontSize: typography.fontSize.medium,
    color: colors.text.primaryGrey,
  },
  membership: {
    fontSize: typography.fontSize.small,
    color: colors.green,
    marginTop: 5,
  },
  subscriptionPlan: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: colors.lightPurple,
    marginHorizontal: 15,
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.border.lightGray
  },
  subscriptionText: {
    fontSize: typography.fontSize.medium,
    color: colors.purple,
    fontWeight: 'bold',
  },
  subscriptionBadge: {
    backgroundColor: colors.green,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  subscriptionBadgeText: {
    color: colors.white,
    fontSize: typography.fontSize.small,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingHorizontal: 15,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderWidth: 1.2,
    borderColor: colors.border.lightGray,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    marginVertical: 10,
    borderRadius: 12,
  },

  icon: {
    fontSize: typography.fontSize.large,
    color: colors.text.primary,
  },
  itemText: {
    flex: 1,
    marginLeft: 15,
    fontSize: typography.fontSize.medium,
    color: colors.text.primary,
    fontFamily: typography.fontWeight.semiBold,
  },
  notificationBadge: {
    backgroundColor: colors.purple,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  notificationText: {
    color: colors.white,
    fontSize: typography.fontSize.small,
  },
  logoutItem: {
    backgroundColor: colors.error,
    borderRadius: 8,
  },
  logoutText: {
    color: colors.error,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
