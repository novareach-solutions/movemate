import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TextStyle,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ImageSourcePropType,
} from 'react-native';
import { typography } from '../theme/typography';
import { colors } from '../theme/colors';
import { images } from '../assets/images/images';
import { useNavigation } from '@react-navigation/native';
import { AuthScreens, CustomerScreens, ProfileScreens } from '../navigation/ScreenNames';
import { useAppDispatch } from '../redux/hook';
import { setIsLogin, updateCurrentLocation } from '../redux/slices/authSlice';
import { SvgProps } from 'react-native-svg';
import Onboarding1 from "../assets/images/onboarding/onboarding1.png";
import Onboarding2 from "../assets/images/onboarding/onboarding2.png";
import Onboarding3 from "../assets/images/onboarding/onboarding3.png";
import Onboarding4 from "../assets/images/onboarding/onboarding4.png";
import { getCurrentLocation, requestLocation } from '../utils/helpers';
import { mapSuggestions } from '../api/mapboxAPI';
type SvgComponent = React.FC<SvgProps>;
const { width, height } = Dimensions.get('window');
interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: any;
  description: string;
}

const slides: Slide[] = [
  {
    id: 0,
    title: 'Send a',
    subtitle: 'Package',
    image: Onboarding1,
    description:
      'Quickly send packages with ease. Choose pickup and delivery, and we handle the rest',
  },
  {
    id: 1,
    title: 'Buy from a',
    subtitle: 'Store',
    image: Onboarding2,
    description:
      'Shop from your favorite stores effortlessly. Select, pay, and have it delivered right to your door.',
  },
  {
    id: 2,
    title: 'Car',
    subtitle: 'Towing',
    image: Onboarding3,
    description:
      'Shop from your favorite stores effortlessly. Select, pay, and have it delivered right to your door.',
  },
  {
    id: 3,
    title: 'Home',
    subtitle: 'Moving',
    image: Onboarding4,
    description:
      'Quickly send packages with ease. Choose pickup and delivery, and we handle the rest',
  },
];

const Onboarding: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const updateSlidePosition = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  useEffect(() => {
    setTimeout(() => {

      requestLocationpermission();
    }, 1000);
  }, [])

  const requestLocationpermission = () => {
    // if (locationStatus) {
    //   getCurrentLocation(callback);
    // } else {
    getLocationPermission();
    // }
  };

  const getLocationPermission = async () => {
    const isAllowed = await requestLocation();
    if (isAllowed) {
      await getCurrentLocation(callback);
    }
  };

  const callback = async (data: any) => {
    console.log('-----callback------', data);
    if (data?.coords) {
      const latitude = await data?.coords?.latitude;
      const longitude = await data?.coords?.longitude;
      mapSuggestions(longitude, latitude, responseCallback)
      const altitude = await data?.coords?.altitude;
      const horizontal_accuracy = await data?.coords?.accuracy;
      const vertical_accuracy = await data?.coords?.altitudeAccuracy;
      const heading = await data?.coords?.heading;
      const timestamp = await data?.timestamp;
      if (latitude && longitude) {
        const isAllowed = await requestLocation();

      }
    }
  };

  const responseCallback = async (data: any) => {
    const locationData = {
      name: data.text,
      address: data.place_name,
      latitude: data.center[1],
      longitude: data.center[0],
      suburb: data.context?.find((c: any) => c.id.includes("place"))?.text || "",
      state: data.context?.find((c: any) => c.id.includes("region"))?.text || "",
      postalCode: data.context?.find((c: any) => c.id.includes("postcode"))?.text || "",
    }
    dispatch(updateCurrentLocation(locationData));
  }

  const handleNavigation = () => {
    dispatch(setIsLogin(false))
    navigation.navigate(AuthScreens.LoginScreen);
    // navigation.navigate(AuthScreens.CompleteProfileScreen);
  };
  const handleLogin = () => {
    dispatch(setIsLogin(true))
    navigation.navigate(AuthScreens.LoginScreen);
    // navigation.navigate(CustomerScreens.DeliveryScreen);
    // navigation.navigate(ProfileScreens.ProfileScreen);
  };
  const Footer = () => (
    <View style={styles.footer}>
      <View style={styles.indicatorContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index <= currentSlideIndex ? styles.activeIndicator : {},
            ]}
          />
        ))}
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={handleNavigation} style={styles.button}>
          <Text style={styles.buttonText}>
            {currentSlideIndex === slides.length - 1
              ? 'Get Started'
              : 'Continue >'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogin}
          style={[
            styles.button,
            {
              backgroundColor: colors.lightButtonBackground,
              bottom: 10,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={updateSlidePosition}
        renderItem={({ item }) => {
          const SvgImage: SvgComponent = item.image;
          return (
            <View style={styles.slide}>
              {/* <SvgImage /> */}
              <Image source={item.image} style={styles.image} />
              <Text style={styles.title}>
                {item.title} <Text style={styles.subtitle}>{item.subtitle}</Text>
              </Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          )
        }

        }
      />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  slide: { width },
  image: { height: height * 0.53, width: "100%", resizeMode: 'contain' },
  title: {
    fontSize: typography.fontSize.large,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
    paddingHorizontal: 20,
  },
  btnContainer: { width, alignItems: 'center', justifyContent: 'space-between', height: 130 },
  subtitle: { color: colors.purple },
  description: {
    fontSize: typography.fontSize.medium,
    fontFamily: typography.fontFamily.regular,
    // textAlign: 'center',
    marginTop: 10,
    color: colors.text.primary,
    paddingHorizontal: 20,
    paddingRight: 100,
    fontWeight: typography.fontWeight.medium as TextStyle['fontWeight'],
  },
  footer: {
    height: height * 0.35,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20
  },
  indicatorContainer: { flexDirection: 'row', marginTop: 10 },
  indicator: {
    height: 10,
    width: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeIndicator: { backgroundColor: colors.purple },
  button: {
    backgroundColor: colors.purple,
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: colors.white,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.medium,
    fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
  },
  skip: {
    color: colors.purple,
    fontSize: typography.fontSize.medium,
    fontWeight: typography.fontWeight.medium as TextStyle['fontWeight'],
  },
});

export default Onboarding;
