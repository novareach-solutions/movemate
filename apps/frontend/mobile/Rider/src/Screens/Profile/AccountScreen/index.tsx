import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { images } from '../../../assets/images/images';
import { useNavigation } from '@react-navigation/native';
import { AppScreens, ProfileScreens } from '../../../navigation/ScreenNames';
import Header from '../../../components/Header';

const AccountScreen: React.FC = () => {
  const navigation = useNavigation();

  const menuItems = [
    {
      id: 1,
      title: 'Vehicles',
      icon: images.vehicleIcon,
      screen: ProfileScreens.ReplaceVehicle,
    },
    {
      id: 2,
      title: 'Documents',
      icon: images.documentIcon,
      screen: ProfileScreens.Documents,
    },
    {
      id: 3,
      title: 'Bank Details',
      icon: images.bankIcon,
      screen: AppScreens.ComingSoon,
    },
    {
      id: 4,
      title: 'Manage Account',
      icon: images.profileAccount,
      screen: ProfileScreens.ManageAccount,
    },
    {
      id: 5,
      title: 'App Settings',
      icon: images.settingsIcon,
      screen: AppScreens.ComingSoon,
    },
  ];

  const renderMenuItem = (item: (typeof menuItems)[0]) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={() => navigation.navigate(item.screen)}>
      <View style={styles.iconContainer}>
        <Image source={item.icon} style={styles.icon} />
      </View>
      <Text style={styles.menuTitle}>{item.title}</Text>
      <Image source={images.blackArrow} style={styles.arrowIcon} />
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
