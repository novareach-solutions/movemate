import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ImageSourcePropType,
  TextStyle,
} from 'react-native';
import { typography } from '../theme/typography';
import { colors } from '../theme/colors';
import { images } from '../assets/images/images';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthScreens, DeliverAPackage } from '../navigation/ScreenNames';

const { width, height } = Dimensions.get('window');

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
  description: string;
}

const slides: Slide[] = [
  {
    id: 0,
    title: 'Become our trusted service provider',
    subtitle: '',
    image: images.introImage1,
    description: 'Join us today!',
  },
];

const Onboarding: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const navigation = useNavigation();

  const updateSlidePosition = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const handleNavigation = () => {
    navigation.navigate(AuthScreens.SignupNumber);
    // navigation.navigate(DeliverAPackage.AddProfilePhoto);
    // navigation.navigate(DeliverAPackage.EnterVehicleDetails);
    // navigation.navigate(DeliverAPackage.EnterABN);
    // navigation.navigate(DeliverAPackage.AddProfilePhoto);
    // navigation.navigate(DeliverAPackage.UploadDocuments);
  };
  const handleLogin = () => {
    navigation.navigate(AuthScreens.Login);
    // navigation.navigate(DeliverAPackage.CompleteProfile);
    // navigation.navigate(DeliverAPackage.EnterVehicleDetails);
    // navigation.navigate(DeliverAPackage.EnterABN);
    // navigation.navigate(DeliverAPackage.AddProfilePhoto);
    // navigation.navigate(DeliverAPackage.UploadDocuments);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={updateSlidePosition}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>
              {item.title}
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleNavigation} style={styles.button}>
          <Text style={styles.buttonText}>
            {currentSlideIndex === slides.length - 1
              ? 'Get Started'
              : 'Continue >'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogin} style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  slide: { width, alignItems: 'flex-start', justifyContent: 'flex-start' },
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: height * 0.6,
  },
  title: {
    fontSize: typography.fontSize.large,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
    marginTop: 20,
    paddingHorizontal: 20,
  },
  subtitle: { color: colors.purple },
  description: {
    fontSize: typography.fontSize.medium,
    fontFamily: typography.fontFamily.regular,
    textAlign: 'left',
    marginTop: 10,
    color: colors.text.primary,
    paddingHorizontal: 20,
    fontWeight: typography.fontWeight.medium as TextStyle['fontWeight'],
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.purple,
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: colors.white,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.medium,
    fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: colors.purple,
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  secondaryButtonText: {
    color: colors.purple,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.medium,
    fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
  },
});

export default Onboarding;
