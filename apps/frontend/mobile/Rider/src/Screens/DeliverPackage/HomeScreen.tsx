// src/screens/HomeScreen.tsx

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
import { images } from '../../assets/images/images';
import { colors } from '../../theme/colors';
import HelpButton from '../../components/HelpButton';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppScreens, AppScreensParamList, DeliverAPackage } from '../../navigation/ScreenNames';
import Header from '../../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AgentStatusEnum,
  updateAgentStatus,
} from '../../redux/slices/agentSlice';
import { showOrderModal, fetchOngoingOrder } from '../../redux/slices/orderSlice';
import { io } from 'socket.io-client';
import apiClient from '../../api/apiClient';
import apiEndPoints from '../../api/apiEndPoints';
import GetLocation from 'react-native-get-location';
import { RootState } from '../../redux/store';
import { OrderStatusEnum } from '../../redux/slices/types/enums';

const SOCKET_SERVER_URL = 'http://192.168.29.63:3001';

const HomeScreen: React.FC = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [drawerHeight] = useState(new Animated.Value(0));
  const [isLoading, setIsLoading] = useState(false);
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
    const socket = io(SOCKET_SERVER_URL);
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
    console.log("Ongoingon order value", ongoingOrder);
    if (ongoingOrder && !hasNavigated) {
      setHasNavigated(true);
      if (ongoingOrder.status===OrderStatusEnum.PICKEDUP_ORDER) {
        navigation.navigate(DeliverAPackage.DropOffOrderDetails, { order: ongoingOrder });
      }
      if (ongoingOrder.status===OrderStatusEnum.ACCEPTED || ongoingOrder.status===OrderStatusEnum.PENDING)
      {
        navigation.navigate(DeliverAPackage.PickUpOrderDetails, { order: ongoingOrder });
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
      <Header logo home />
      <View style={styles.mapContainer}>
        <Image source={images.map} style={styles.mapImage} />
      </View>
      <View style={styles.statusContainer}>
        <TouchableOpacity
          onPress={toggleStatus}
          style={[
            styles.statusButton,
            isOnline ? styles.stopButton : styles.goButton,
          ]}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator
              color={isOnline ? colors.white : colors.purple}
            />
          ) : (
            <Text
              style={[
                styles.statusButtonText,
                isOnline ? styles.stopText : styles.goText,
              ]}
            >
              {isOnline ? 'Stop' : 'GO'}
            </Text>
          )}
        </TouchableOpacity>
        <Text style={styles.statusText}>
          {isOnline ? "You're Online" : "You're Offline"}
        </Text>
      </View>
      <Animated.View style={[styles.drawer, { height: drawerHeight }]}>
        <View style={styles.statsContainer}>
          <StatCard icon={images.money} value="$50" label="EARNINGS" />
          <StatCard icon={images.cart} value="7" label="ORDERS" />
          <StatCard
            icon={images.directionIcon}
            value="30 Km"
            label="DISTANCE"
          />
        </View>
      </Animated.View>
      <View style={styles.helpButtonContainer}>
        <HelpButton
          onPress={() => {
            navigation.navigate(AppScreens.FAQScreen);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
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
    marginTop: -60,
    marginBottom: 20,
  },
  statusButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
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
  },
  helpButtonContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
});

export default HomeScreen;
