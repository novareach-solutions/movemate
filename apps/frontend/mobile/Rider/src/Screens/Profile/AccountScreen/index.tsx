import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppScreens, ProfileScreens } from '../../../navigation/ScreenNames';
import Header from '../../../components/Header';
import Vehicle from "../../../assets/icons/vehicle.svg"
import Documents from "../../../assets/icons/documents.svg"
import Bank from "../../../assets/icons/bank.svg"
import AccountAndProfile from "../../../assets/icons/accountAndProfile.svg"
import Settings from "../../../assets/icons/settings.svg"
import BlackArrow from "../../../assets/icons/blackArrow.svg"

const AccountScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const menuItems = [
    {
      id: 1,
      title: 'Vehicles',
      icon: Vehicle,
      screen: ProfileScreens.ReplaceVehicle,
    },
    {
      id: 2,
      title: 'Documents',
      icon: Documents,
      screen: ProfileScreens.Documents,
    },
    {
      id: 3,
      title: 'Bank Details',
      icon: Bank,
      screen: AppScreens.ComingSoon,
    },
    {
      id: 4,
      title: 'Manage Account',
      icon: AccountAndProfile,
      screen: ProfileScreens.ManageAccount,
    },
    {
      id: 5,
      title: 'App Settings',
      icon: Settings,
      screen: AppScreens.ComingSoon,
    },
  ];

  const renderMenuItem = (item: (typeof menuItems)[0]) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={() => navigation.navigate(item.screen)}>
      <View style={styles.iconContainer}>
        <item.icon />
      </View>
      <Text style={styles.menuTitle}>{item.title}</Text>
      <BlackArrow style={{
        transform: [{ rotate: '180deg' }]
      }} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{
      flex: 1
    }}>
      <Header isBack title='Account' />
      <View style={styles.container}>
        <View style={styles.menuContainer}>{menuItems.map(renderMenuItem)}</View>
      </View></SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightButtonBackground,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: typography.fontSize.large,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 20,
  },
  menuContainer: {
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.lightGray,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    tintColor: colors.text.primaryGrey,
  },
  menuTitle: {
    flex: 1,
    marginLeft: 15,
    fontSize: typography.fontSize.medium,
    color: colors.text.primary,
  },
  arrowIcon: {
    tintColor: colors.text.primaryGrey,
  },
});

export default AccountScreen;
