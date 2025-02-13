import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Alert,
} from 'react-native';
import { images } from '../../assets/images/images';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { CustomerScreens, ProfileScreens } from '../../navigation/ScreenNames';
import SearchIcon from "../../assets/images/searchWithLightPurple.svg";
import DeliveryBoy from "../../assets/images/delivery-boy.svg";
import WhiteArrow from "../../assets/images/whiteArrow.svg";
import LocationIcon from "../../assets/images/Location.svg";
import AccountIcon from "../../assets/images/Account.svg";
import { useNavigation } from '@react-navigation/native';
import { SvgProps } from 'react-native-svg';
import { gridButtons } from '../../constants/staticData';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { getOrderStatus, updateDropLoaction, updatePickupLoaction, updatePkgId } from '../../redux/slices/deliverAPackageSlice';
// Mock Data
// const address = '123 Main Street, Springfield, USA';
type SvgComponent = React.FC<SvgProps>;

const CustomerHomeScreen = () => {
    const navigation = useNavigation();
    const [isOngoingOrderModal, setIsOngoingOrderModal] = useState(true);
    const [orderDetails, setOrderDetails] = useState(null);
    const [orderStatus, setOrderstatus] = useState(null);
    const currentLocationData = useAppSelector(state => state.auth.currentLocation);

    const dispatch = useAppDispatch();

    const fetchOrderStatus = async () => {
        const response = await dispatch(getOrderStatus()).unwrap();
        setOrderDetails(response);
        const orderStatus = response?.data?.order?.status;
        setOrderstatus(orderStatus);
        dispatch(updatePkgId(response?.data?.order?.id));
        console.log('response?.data?.order?.pickupLocation', response?.data?.order?.pickupLocation)
        dispatch(updatePickupLoaction(response?.data?.order?.pickupLocation));
        dispatch(updateDropLoaction(response?.data?.order?.dropLocation));

        if (orderStatus) {
            setIsOngoingOrderModal(true);
        }
        console.log('Order-response', response?.data?.order)
    };

    useEffect(() => {
        const interval = setInterval(() => {
            fetchOrderStatus();
        }, 20000);

        return () => clearInterval(interval);
    }, [])

    const handleOngoingNavigation = () => {
        console.log('orderStatus', orderStatus)

        if (orderStatus === "PENDING") {
            navigation.navigate(CustomerScreens.DeliveryScreen)
        } else if (orderStatus === "ACCEPTED" || orderStatus === "IN_PROGRESS" || orderStatus === "PICKEDUP_ORDER") {
            navigation.navigate(CustomerScreens.AcceptOrder)
        } else {
            navigation.navigate(CustomerScreens.OrderCompletedScreen);
        }
    }

    const handleServiceNavigation = () => {
        if (orderStatus === "PENDING" || orderStatus === "IN_PROGRESS" || orderStatus === "ACCEPTED" || orderStatus === "PICKEDUP_ORDER") {
            Alert.alert("Order In-progress")
        } else {

            navigation.navigate(CustomerScreens.SAPDetailsScreen);

        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <View style={styles.rowButton}>
                    <TouchableOpacity style={styles.rowButton}>
                        {/* <Image style={styles.icon} source={images.location} /> */}
                        <images.Location width={25} height={25} />
                        <Text style={styles.homeText}>Home</Text>
                        <images.BackArrow width={15} height={15} style={styles.arrowStyle} />

                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: "60%", }} onPress={() => { navigation.navigate(ProfileScreens.ProfileScreen) }}>
                        <images.Account width={30} height={30} />
                    </TouchableOpacity>
                    {/* <Image
                        source={images.account}
                        style={{ marginLeft: "60%", height: 30, width: 30 }}
                    /> */}
                </View>

                <Text style={styles.address}>
                    {currentLocationData?.address
                        ? currentLocationData.address.length > 40
                            ? `${currentLocationData.address.slice(0, 40)}...`
                            : currentLocationData.address
                        : ""}
                </Text>

            </View>

            <View style={styles.bannerContainer}>
                <Image
                    source={images.banner} // Replace with a static banner image
                    style={styles.banner}
                    resizeMode="contain"
                />
                {/* <TouchableOpacity style={styles.bannerButton}>
                    <Text style={styles.bannerButtonText}>Claim Your Cashback</Text>
                </TouchableOpacity> */}
            </View>

            <View style={styles.gridContainer}>
                <FlatList
                    data={gridButtons}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                    renderItem={({ item }) => {
                        const SvgImage: SvgComponent = item.image;
                        return (
                            <TouchableOpacity
                                onPress={handleServiceNavigation
                                    //     () => {
                                    //     navigation.navigate(CustomerScreens.SAPDetailsScreen);
                                    // }
                                }
                                style={styles.gridButton}
                            >
                                <Text style={styles.gridButtonText}>{item.title}</Text>
                                <Text style={styles.gridButtonSubText}>{item.subTitle}</Text>
                                <SvgImage width={91} height={91} style={styles.gridButtonImage} />
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>

            {(isOngoingOrderModal && orderStatus !== "CANCELED") && (
                <View style={styles.ongoingOrderBanner}>
                    <TouchableOpacity style={styles.ongoingOrderButton} onPress={handleOngoingNavigation}>
                        {
                            orderStatus === "PENDING" && <><SearchIcon />
                                <Text style={styles.ongoingOrderText}>
                                    Looking for a delivery partner near you...
                                </Text></>
                        }
                        {
                            (orderStatus !== "PENDING" && orderStatus !== "CANCELED") && <>
                                <DeliveryBoy />
                                <Text style={styles.ongoingOrderText}>
                                    Delivery partner assigned! On the way..
                                </Text></>
                        }

                        <WhiteArrow />
                    </TouchableOpacity>
                </View>
            )}



            {/* <View style={styles.bannerContainer}>
                <Image
                    source={images.banner2} // Replace with a static banner image
                    style={styles.banner}
                    resizeMode="contain"
                />
               
            </View> */}
        </SafeAreaView>
    );
};

export default CustomerHomeScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.lightGrey,
    },
    header: {
        padding: 16,
        backgroundColor: colors.lightGrey,
        // borderBottomWidth: 1,
        // borderBottomColor: '#ddd',
    },
    rowButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 3,
    },
    icon: {
        fontSize: 18,
        marginHorizontal: 4,
    },
    ongoingOrderBanner: {
        position: 'absolute',
        bottom: 50,
        width: '100%',
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        backgroundColor: colors.purple,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ongoingOrderButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ongoingOrderText: {
        color: colors.white,
        fontSize: typography.fontSize.medium,
        fontWeight: typography.fontWeight.bold as any,
        marginHorizontal: 5
    },
    homeText: {
        fontSize: typography.fontSize.medium + 2,
        fontFamily: typography.fontFamily.regular,
        color: colors.purple,
        fontWeight: typography.fontWeight.bold as any,
    },
    address: {
        color: colors.grey,
        fontSize: typography.fontSize.medium - 2,
        fontWeight: typography.fontWeight.medium as any,
        fontFamily: typography.fontFamily.regular,
        paddingLeft: 22
    },
    bannerContainer: {
        margin: 16,
        borderRadius: 8,
        overflow: 'hidden',
    },
    gridContainer: {
        marginHorizontal: 10,
    },
    banner: {
        width: '100%',
        height: 150,
    },
    bannerButton: {
        position: 'absolute',
        bottom: 16,
        alignSelf: 'center',
        backgroundColor: colors.blue,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    bannerButtonText: {
        color: colors.white,
        fontWeight: typography.fontWeight.bold as any,
        fontSize: typography.fontSize.small - 1,
        fontFamily: typography.fontFamily.regular,
    },
    gridButton: {
        flex: 1,
        margin: 8,
        padding: 16,
        backgroundColor: colors.white,
        elevation: 5,
        borderRadius: 8,
    },
    gridButtonImage: {
        width: 91,
        height: 91,
        marginTop: 8,
        alignSelf: 'flex-end',
    },
    gridButtonText: {
        fontSize: typography.fontSize.medium - 2,

        color: colors.text.primary,
        fontFamily: typography.fontFamily.regular,
        fontWeight: typography.fontWeight.bold as any,
    },
    gridButtonSubText: {
        fontSize: typography.fontSize.medium,

        color: colors.grey,
        fontFamily: typography.fontFamily.regular,
        fontWeight: typography.fontWeight.medium as any,
    },
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowStyle: {
        transform: [{ rotate: '270deg' }],
        marginLeft: 5
    },
    loadingScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});