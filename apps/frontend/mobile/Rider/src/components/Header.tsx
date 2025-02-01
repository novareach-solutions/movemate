// Header.tsx

import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text, TextStyle } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { images } from '../assets/images/images';
import { AppScreens, AuthScreensParamList } from '../navigation/ScreenNames';
import { typography } from '../theme/typography';

interface HeaderProps {
  isBack?: boolean;
  logo?: boolean;
  home?: boolean;
  title?: string;
  earningScreen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isBack, logo, home, title, earningScreen }) => {
  const navigation = useNavigation<NavigationProp<AuthScreensParamList>>();

  const handleHomePress = () => {
    navigation.navigate(AppScreens.Profile);
  };

  return (
    <View style={!earningScreen ? styles.container : {
      backgroundColor: '#2a1d3d',
      height: 60,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      position: 'relative',
    }}>
      {/* Back Button */}
      {isBack && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image source={images.arrow} style={styles.arrow} />
        </TouchableOpacity>
      )}

      {/* Logo */}
      {logo && (
        <View style={styles.logoContainer}>
          <Image source={images.logo} style={styles.logo} />
        </View>
      )}

      {/* Home/Profile Button */}
      {home && (
        <TouchableOpacity style={styles.homeButton} onPress={handleHomePress}>
          <Image source={images.profileAccount} style={styles.profileIcon} />
        </TouchableOpacity>
      )}

      {title && (
        <Text style={styles.title}>{title}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.primary,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  arrow: {
    transform: [{ rotate: '180deg' }],
    resizeMode: 'contain',
  },
  logoContainer: {
    position: 'absolute',
    alignSelf: 'center',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  homeButton: {
    // No additional styling as per requirement
    // Position it to the right side
    position: 'absolute',
    left: 20,
  },
  profileIcon: {
    resizeMode: 'contain',
  },
  title: {
    fontSize: typography.fontSize.semiMedium,
    marginLeft: 30,
    fontWeight: typography.fontWeight.bold as TextStyle["fontWeight"],
    color: colors.black
  }
});

export default Header;
