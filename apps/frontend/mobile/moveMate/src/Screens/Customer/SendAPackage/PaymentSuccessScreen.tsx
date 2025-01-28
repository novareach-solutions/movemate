import { Image, SafeAreaView, StyleSheet, Text, TextStyle, View } from 'react-native';
import React, { useEffect } from 'react';
import { colors } from '../../../theme/colors';
import { images } from '../../../assets/images/images';
import { useNavigation } from '@react-navigation/native';
import { CustomerScreens } from '../../../navigation/ScreenNames';

const PaymentSuccessScreen = () => {
    const navigation = useNavigation();
    useEffect(() => {
        // Set a timeout to navigate after 5 seconds
        const timer = setTimeout(() => {
            navigation.navigate(CustomerScreens.DeliveryScreen);
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigation]);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={images.paymentSuccess} style={{ width: 300, height: 300 }} />
            </View>
        </SafeAreaView>
    );
};

export default PaymentSuccessScreen;