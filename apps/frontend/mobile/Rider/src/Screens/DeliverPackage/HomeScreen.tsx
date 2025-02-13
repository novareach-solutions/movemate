import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Animated,
  ActivityIndicator,
  Alert,
} from 'react-native';
import StatCard from '../../components/StatCard';
import HelpButton from '../../components/HelpButton';
import { AppScreens, DeliverAPackage } from '../../navigation/ScreenNames';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AgentStatusEnum,
  updateAgentStatus,
} from '../../redux/slices/agentSlice';
// import Mapbox from '@rnmapbox/maps';
import { MAPBOX_ACCESS_TOKEN } from "../../utils/constants";
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
// Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);
const HomeScreen: React.FC = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [drawerHeight] = useState(new Animated.Value(0));
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigation = useNavigation<NavigationProp<AppScreensParamList>>();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const ongoingOrder = useSelector(
    (state: RootState) => state.order.ongoingOrder,
  );
  const [hasNavigated, setHasNavigated] = useState(false);
  const [agentId, setAgentId] = useState<string | null>(null);

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
    setIsOnline(newStatus);
    setIsLoading(true);
    Animated.timing(drawerHeight, {
      toValue: newStatus ? 120 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    const currentAccessToken = await AsyncStorage.getItem('accessToken');
    console.log('🔍 Current Access Token:', currentAccessToken);
    try {
      const statusEnum = newStatus
        ? AgentStatusEnum.ONLINE
        : AgentStatusEnum.OFFLINE;
      await updateAgentStatus(statusEnum);
      console.log(`✅ Agent status set to ${statusEnum}`);
    } catch (error) {
      console.log('Error', error);
      setIsOnline(!newStatus);
      Animated.timing(drawerHeight, {
        toValue: !newStatus ? 120 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      console.error('❌ Failed to update status:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
    console.log('Ongoingon order value', ongoingOrder);
    if (ongoingOrder && !hasNavigated) {
      setHasNavigated(true);
      if (ongoingOrder.status === OrderStatusEnum.PICKEDUP_ORDER) {
        navigation.navigate(DeliverAPackage.DropOffOrderDetails, {
          order: ongoingOrder,
        });
      }
      if (
        ongoingOrder.status === OrderStatusEnum.ACCEPTED ||
        ongoingOrder.status === OrderStatusEnum.PENDING || OrderStatusEnum.IN_PROGRESS
      ) {
        navigation.navigate(DeliverAPackage.PickUpOrderDetails, {
          order: ongoingOrder,
        });
      }
    }
  }, [ongoingOrder, hasNavigated, navigation]);

  const handleTakePhoto = () => {
    console.log('Taking a photo for proof...');
  };

  const handleOrderDelivered = () => {
    console.log('Order marked as delivered.');
  };

  const handleAcceptOrder = () => {
    // Additional logic can be added here
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header logo home help />
      {/* Map Image */}
      {/* <View style={styles.mapContainer}>
        <Mapbox.MapView style={styles.mapImage} styleURL="mapbox://styles/mapbox/light-v11">
          <Mapbox.Camera zoomLevel={14} centerCoordinate={[151.209900, -33.865143]} />

        </Mapbox.MapView>
      </View> */}

      {/* Status Button */}
      <View style={styles.statusContainer}>
        <TouchableOpacity
          onPress={toggleStatus}
          style={[
            styles.statusButton,
            isOnline ? styles.stopButton : styles.goButton,
          ]}>
          <Text
            style={[
              styles.statusButtonText,
              isOnline ? styles.stopText : styles.goText,
            ]}>
            {isOnline ? 'Stop' : 'GO'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.statusText}>
          {isOnline ? "You're Online" : "You're Offline"}
        </Text>
      </View>

      {/* Status Container */}
      <View style={styles.statsContainer}>
        <StatCard icon={Money} value="$50" label="EARNINGS" />
        <StatCard icon={Order} value="7" label="ORDERS" />
        <StatCard icon={Distance} value="30 Km" label="DISTANCE" />
      </View>

      {/* Sliding Drawer */}
      <Animated.View style={[styles.drawer, { height: drawerHeight }]}>
        <View style={styles.warningContainer}>
          <Text style={styles.warningTitle}>Unable to go online</Text>
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>⚠️ Account Not Approved</Text>
          </View>
          <Text style={styles.helpText}>
            Your account has not been Approved.
          </Text>
          <Text style={styles.contactText}>
            To resolve this, please contact our <Text style={styles.linkText}>Support Team</Text>
            and provide the necessary information for verification.
          </Text>
        </View>
      </Animated.View>
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
  drawer: {
    backgroundColor: colors.white,
    overflow: 'hidden',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: -2 },
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FBF4FF',
    position: "absolute",
    top: 25,
    width: "100%",
    borderRadius: 12

  },
  helpButtonContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  warningContainer: {
    padding: 16,
    alignItems: 'center',
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 10,
  },
  errorBanner: {
    backgroundColor: colors.error,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  errorText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  helpText: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 5,
  },
  contactText: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.text.secondary,
  },
  linkText: {
    color: colors.purple,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
