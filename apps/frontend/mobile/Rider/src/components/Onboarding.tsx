import React, {useEffect, useState} from 'react';
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
import {typography} from '../theme/typography';
import {colors} from '../theme/colors';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthScreens, DeliverAPackage} from '../navigation/ScreenNames';
import { getCurrentLocation, requestLocation } from '../utils/helpers';
import { mapSuggestions } from '../api/mapboxApi';
import { updateCurrentLocation } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
const {width, height} = Dimensions.get('window');

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
}

const slides: Slide[] = [
  {
    id: 0,
    title: 'Become our trusted service provider',
    subtitle: '',
    description: 'Join us today!',
  },
];

const Onboarding: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const navigation = useNavigation();
  const dispatch = useDispatch();
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
    navigation.navigate(AuthScreens.SignupNumber);
    // navigation.navigate(DeliverAPackage.EnterVehicleDetails);
    // navigation.navigate(DeliverAPackage.EnterABN);
    // navigation.navigate(DeliverAPackage.DropOffOrderDetails);
    // navigation.navigate(DeliverAPackage.PickUpOrderDetails);
    // navigation.navigate(DeliverAPackage.EarningsDetails);
    // navigation.navigate(DeliverAPackage.AddProfilePhoto);
    // navigation.navigate(DeliverAPackage.UploadDocuments);
  };
  const handleLogin = () => {
    navigation.navigate(AuthScreens.Login);
    // navigation.navigate(DeliverAPackage.Home);
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
        renderItem={({item}) => (
          <View style={styles.slide}>
            <Image
              source={require('../assets/images/womanHoldingPackage.png')}
              style={styles.image}
            />
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
  container: {flex: 1, backgroundColor: colors.white},
  slide: {width, alignItems: 'flex-start', justifyContent: 'flex-start'},
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
  subtitle: {color: colors.purple},
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
