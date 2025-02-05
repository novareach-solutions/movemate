import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text, TextStyle } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { AppScreens, AuthScreensParamList } from '../navigation/ScreenNames';
import { typography } from '../theme/typography';
import HelpButton from './HelpButton';
import BlackArrow from "../assets/icons/blackArrow.svg"
import Logo from "../assets/icons/logo.svg"
import Hamburger from "../assets/icons/hamburger.svg"
import WhiteArrow from "../assets/icons/whiteArrow.svg"

interface HeaderProps {
  isBack?: boolean;
  logo?: boolean;
  home?: boolean;
  title?: string;
  earningScreen?: boolean;
  help?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isBack, logo, home, title, earningScreen, help }) => {
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
          {earningScreen ? <WhiteArrow style={{
            transform: [{ rotate: '180deg' }]
          }} /> : <BlackArrow />}
        </TouchableOpacity>
      )}

      {/* Logo */}
      {logo && (
        <View style={styles.logoContainer}>
          <Logo style={styles.logo} />
        </View>
      )}

      {/* Home/Profile Button */}
      {home && (
        <TouchableOpacity style={styles.homeButton} onPress={handleHomePress}>
          <Hamburger />
        </TouchableOpacity>
      )}

      {/* Title */}
      {title && (
        <Text style={styles.title}>{title}</Text>
      )}


      {/* Help/FAQ */}
      {help && (
        <View style={styles.helpBtnContainer}>
          <HelpButton
            onPress={() => {
              navigation.navigate(AppScreens.FAQScreen);
            }}
          />
        </View>

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
    left: 10,
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
  },
  helpBtnContainer: {
    position: "absolute",
    right: 10
  }
});

export default Header;
