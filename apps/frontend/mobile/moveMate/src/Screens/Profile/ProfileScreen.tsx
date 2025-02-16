import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../theme/colors";
import { typography } from "../../theme/typography";
import { AuthScreens, ProfileScreens } from "../../navigation/ScreenNames";
import { images } from "../../assets/images/images";
import { SafeAreaView } from "react-native-safe-area-context";
import { profileData } from "../../constants/staticData";
import Header from "../../components/Header";
import { SvgProps } from "react-native-svg";
type SvgComponent = React.FC<SvgProps>;
// import { images } from '../../assets/images/images';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: (typeof profileData)[0] }) => {
    const SvgImage: SvgComponent = item.icon;
    return (
      <TouchableOpacity
        style={[styles.listItem]}
        onPress={() => navigation.navigate(item.screen as never)}
      >
        {/* <Image source={item.icon} /> */}
        <SvgImage />
        <Text
          style={item.title === "Log Out" ? styles.LogoutText : styles.itemText}
        >
          {item.title}
        </Text>
        {/* {item.notificationCount && (
                <View style={styles.notificationBadge}>
                    <Text style={styles.notificationText}>{item.notificationCount}</Text>
                </View>
            )} */}
        {item.title !== "Log Out" && (
          <View>
            <images.ForwardArrow />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header isBack title="Profile" bgColor="#F6F6F6" />
      <View>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.headerContainer}>
            <Text style={styles.profileName}>SYED MUSTAFA ALI</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginVertical: 10,
              }}
            >
              <View style={styles.contactItem}>
                <images.PhoneIcon />
                {/* <Image source={images.phoneWhite} /> */}
                <Text style={styles.contactText}>+61-123456789</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.contactItem}>
                <images.EmailIcon />
                {/* <Image source={images.messageWhite} /> */}
                <Text style={styles.contactText}>syedmustafa@gmail.com</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ProfileScreens.ManageAccount);
              }}
              style={styles.editProfileButton}
            >
              <Text style={styles.editProfileText}>Edit profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu List */}
        <FlatList
          data={profileData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGrey,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: colors.border.primary,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileName: {
    fontSize: 23,
    fontWeight: "semibold",
    color: colors.white,
  },
  profileDetails: {
    fontSize: typography.fontSize.small,
    color: colors.white,
  },
  membership: {
    fontSize: typography.fontSize.small,
    color: colors.green,
    marginTop: 5,
  },
  subscriptionPlan: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: colors.lightPurple,
    marginHorizontal: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  subscriptionText: {
    fontSize: typography.fontSize.medium,
    color: colors.text.primary,
    fontWeight: "bold",
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
    fontWeight: "bold",
  },
  listContainer: {
    paddingHorizontal: 15,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderWidth: 1.2,
    borderColor: colors.border.lightGray,
    // paddingHorizontal: 10,
    backgroundColor: colors.white,
    marginVertical: 7,
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
  LogoutText: {
    flex: 1,
    marginLeft: 15,
    fontSize: typography.fontSize.medium,
    color: colors.red,
    fontFamily: typography.fontWeight.semiBold,
  },
  notificationBadge: {
    backgroundColor: colors.purple,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: "flex-start",
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
    fontWeight: "bold",
  },
  headerContainer: {
    flex: 1,
    backgroundColor: colors.purple,
    padding: 25,
    borderRadius: 12,
  },
  profileEmail: {
    fontSize: typography.fontSize.small,
    color: colors.white,
  },
  editProfileButton: {
    marginTop: 10,
    alignSelf: "flex-start",
  },
  editProfileText: {
    fontSize: typography.fontSize.medium,
    color: colors.white,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    gap: 5,
  },
  contactText: {
    fontSize: typography.fontSize.small,
    color: colors.white,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: colors.white,
    marginHorizontal: 10,
  },
});

export default ProfileScreen;
