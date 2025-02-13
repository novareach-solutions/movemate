import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
  ActivityIndicator,
  Alert,
} from 'react-native';
import StatCard from '../../components/StatCard';
import HelpButton from '../../components/HelpButton';
import { AppScreens, DeliverAPackage, ProfileScreens } from '../../navigation/ScreenNames';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AgentStatusEnum,
  updateAgentStatus,
} from '../../redux/slices/agentSlice';
import { MAPBOX_ACCESS_TOKEN } from "../../utils/constants";
import Mapbox from "@rmapbox/maps"
import { showOrderModal, fetchOngoingOrder } from '../../redux/slices/orderSlice';
import { io } from 'socket.io-client';
import apiClient from '../../api/apiClient';
import apiEndPoints from '../../api/apiEndPoints';
import { RootState } from '../../redux/store';
import { OrderStatusEnum } from '../../redux/slices/types/enums';
import { colors } from '../../theme/colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppScreensParamList } from '../../navigation/ScreenNames';
import Header from '../../components/Header';
import Money from '../../assets/icons/money.svg';
import Order from '../../assets/icons/orders.svg';
import Distance from '../../assets/icons/distance.svg';
import Warning from '../../assets/icons/warningWhite.svg';
import BlackArrow from '../../assets/icons/blackArrow.svg';

Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

const HomeScreen: React.FC = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [drawerHeight] = useState(new Animated.Value(0));
  const [isLoading, setIsLoading] = useState(false);
  // Flag to control error rendering
  const [hasError, setHasError] = useState(false);
  const [agentId, setAgentId] = useState<string | null>(null);
  // Measured height of error content
  const [measuredErrorHeight, setMeasuredErrorHeight] = useState(0);

  const navigation = useNavigation<NavigationProp<AppScreensParamList>>();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const ongoingOrder = useSelector(
    (state: RootState) => state.order.ongoingOrder,
  );
  const [hasNavigated, setHasNavigated] = useState(false);

  // Define your error items
  const errorItemsData = [
    {
      id: 'accountNotApproved',
      heading: 'Account Not Approved',
      text: 'Your account is not approved yet. Please Contact Admin',
      target: AppScreens.FAQScreen,
    }
    
  ];

  const updateLocationAPI = async (latitude: number, longitude: number) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) throw new Error('Access token not found.');
      const response = await apiClient.patch(apiEndPoints.updateLocation, {
        latitude,
        longitude,
      });
      console.log('Location updated:', response.data);
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  useEffect(() => {
    let locationInterval: NodeJS.Timeout | null = null;
    if (isOnline) {
      locationInterval = setInterval(() => {
        updateLocationAPI(40.712579, -74.218993);
      }, 15000);
    } else if (locationInterval) {
      clearInterval(locationInterval);
    }
    return () => {
      if (locationInterval) clearInterval(locationInterval);
    };
  }, [isOnline]);

  const toggleStatus = async () => {
    if (!isAuthenticated) {
      Alert.alert('Not Authenticated', 'Please log in to perform this action.');
      return;
    }

    const newStatus = !isOnline;
    setIsLoading(true);
    // Clear previous error state
    setHasError(false);

    try {
      const statusEnum = newStatus ? AgentStatusEnum.ONLINE : AgentStatusEnum.OFFLINE;
      await updateAgentStatus(statusEnum);
      console.log(`✅ Agent status set to ${statusEnum}`);
      setIsOnline(newStatus);

      // Close drawer if no error
      Animated.timing(drawerHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } catch (error) {
      console.error('❌ Failed to update status:', error);
      // Set error flag so that the error drawer is shown.
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Animate the drawer when the measured error height changes
  useEffect(() => {
    if (hasError && measuredErrorHeight > 0) {
      Animated.timing(drawerHeight, {
        toValue: measuredErrorHeight,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [hasError, measuredErrorHeight, drawerHeight]);

  useEffect(() => {
    const fetchAgentId = async () => {
      const storedAgentId = await AsyncStorage.getItem('agentId');
      setAgentId(storedAgentId);
    };
    fetchAgentId();
  }, []);

  useEffect(() => {
    if (!agentId) return;
    const numericAgentId = parseInt(agentId, 10);
    if (isNaN(numericAgentId)) {
      console.error('Invalid agentId: Unable to convert to number.');
      return;
    }
    const socket = io(apiEndPoints.baseURL);
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      socket.emit('joinRoom', { agentId: numericAgentId });
      console.log(`Joined room for agentId: ${numericAgentId}`);
    });
    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });
    socket.on('newRequest', (data: any) => {
      console.log('Received newRequest:', data);
      dispatch(
        showOrderModal({
          orderId: data.orderId,
          earnings: `${data.earnings}$`,
          tip: `${data.tip}$`,
          time: data.estimatedTime,
          distance: data.estimatedDistance,
          pickupAddress: data.pickupAddress,
          dropoffAddress: data.dropAddress,
        }),
      );
    });
    return () => {
      socket.disconnect();
    };
  }, [agentId, dispatch]);

  useEffect(() => {
    if (agentId) {
      dispatch(fetchOngoingOrder());
    }
  }, [agentId, dispatch]);

  useEffect(() => {
    console.log('Ongoing order value', ongoingOrder);
    if (ongoingOrder && !hasNavigated) {
      setHasNavigated(true);
      if (ongoingOrder.status === OrderStatusEnum.PICKEDUP_ORDER) {
        navigation.navigate(DeliverAPackage.DropOffOrderDetails, {
          order: ongoingOrder,
        });
      }
      else {
        navigation.navigate(DeliverAPackage.PickUpOrderDetails, {
          order: ongoingOrder,
        });
      }
    }
  }, [ongoingOrder, hasNavigated, navigation]);

  const renderErrorContent = useCallback(() => (
    <View>
      <View style={styles.errorTitleContainer}>
        <View style={styles.errorTitle}><Warning width={25} height={25} /><Text style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: colors.white
        }}> Actions Required</Text></View>
      </View>
      <View style={styles.errorContainer}>
        {errorItemsData.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.errorItem}
            onPress={() => navigation.navigate(item.target)}>
            <View style={styles.errorItemContent}>
              <View style={styles.errorTextContainer}>
                <Text style={styles.errorHeading}>{item.heading}</Text>
                <Text style={styles.errorText}>{item.text}</Text>
              </View>
              <BlackArrow
                style={{
                  transform: [{ rotate: '180deg' }]
                }}
              />

            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  ), [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header logo home help />
      {/* Map Image */}
      <View style={styles.mapContainer}>
        <Mapbox.MapView style={styles.mapImage} styleURL="mapbox://styles/mapbox/light-v11">
          <Mapbox.Camera zoomLevel={14} centerCoordinate={[151.209900, -33.865143]} />
        </Mapbox.MapView>
      </View>

      <View style={styles.statsContainer}>
        <StatCard icon={Money} value="$50" label="EARNINGS" />
        <StatCard icon={Order} value="7" label="ORDERS" />
        <StatCard icon={Distance} value="30 Km" label="DISTANCE" />
      </View>

      {/* Status Button */}
      <View style={styles.statusContainer}>
        <TouchableOpacity
          disabled={isLoading}
          onPress={toggleStatus}
          style={[
            styles.statusButton,
            isOnline ? styles.stopButton : styles.goButton,
          ]}>
          {isLoading ? (
            <ActivityIndicator
              size="small"
              color={isOnline ? colors.white : colors.purple}
            />
          ) : (
            <Text
              style={[
                styles.statusButtonText,
                isOnline ? styles.stopText : styles.goText,
              ]}>
              {isOnline ? 'Stop' : 'GO'}
            </Text>
          )}
        </TouchableOpacity>
        <Text style={styles.statusText}>
          {isOnline ? "You're Online" : "You're Offline"}
        </Text>
      </View>

      {/* Sliding Drawer */}
      <Animated.View style={[styles.drawer, { height: drawerHeight }]}>
        {hasError && renderErrorContent()}
      </Animated.View>

      {/* Hidden container to measure error content */}
      {hasError && (
        <View
          style={styles.hiddenContainer}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            // Only update if height has changed and is greater than zero
            if (height > 0 && measuredErrorHeight !== height) {
              setMeasuredErrorHeight(height);
            }
          }}>
          {renderErrorContent()}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.lightButtonBackground,
  },
  mapContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  statusContainer: {
    alignItems: 'center',
    marginTop: -100,
    backgroundColor: colors.white,
  },
  statusButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginTop: -40,
  },
  stopButton: {
    backgroundColor: colors.error,
    borderColor: colors.error,
  },
  goButton: {
    backgroundColor: colors.white,
    borderColor: colors.purple,
  },
  statusButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  stopText: {
    color: colors.white,
  },
  goText: {
    color: colors.purple,
  },
  statusText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "#FBF4FF",
    position: "absolute",
    top: 80,
    width: "95%",
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border.lightGray,
  },
  helpButtonContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  drawer: {
    backgroundColor: colors.white,
    overflow: 'hidden',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: -2 },
    paddingHorizontal: 0,
    paddingTop: 10,
  },
  errorTitleContainer: {
    backgroundColor: "#D81A00",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  errorContainer: {
    backgroundColor: "#FFF3F3",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  errorItem: {
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 5,
  },
  errorItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorTextContainer: {
    flex: 1,
    gap:10
  },
  errorHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  errorText: {
    fontSize: 14,
    color: colors.black,
  },
  arrow: {
    fontSize: 18,
    color: '#D32F2F',
    marginLeft: 10,
  },
  // Hidden container for measurement (placed off-screen)
  hiddenContainer: {
    position: 'absolute',
    top: -1000,
    left: 0,
    right: 0,
    opacity: 0,
  },
});

export default HomeScreen;
