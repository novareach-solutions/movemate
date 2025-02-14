import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextStyle, View } from 'react-native';
import React, { useEffect } from 'react';
import { colors } from '../../../theme/colors';
import { images } from '../../../assets/images/images';
import { useNavigation } from '@react-navigation/native';
import { CustomerScreens } from '../../../navigation/ScreenNames';

const PaymentSuccessScreen = () => {
    const navigation = useNavigation();
    useEffect(() => {
        // Set a timeout to navigate after 4 seconds
        const timer = setTimeout(() => {
            // navigation.navigate(CustomerScreens.DeliveryScreen);
            navigation.reset(({
                      index: 0,
                      routes: [{ name: CustomerScreens.DeliveryScreen }],
                    }));
        }, 4000);

        return () => clearTimeout(timer);
    }, [navigation]);
    return (
         <SafeAreaView style={styles.safeArea}>
             <ScrollView contentContainerStyle={styles.container}>
               {/* Success Icon */}
               <View style={styles.iconContainer}>
                <images.SuccessGreen width={200} height={200} />
               </View>
       
               {/* Title */}
               <Text style={styles.title}>Payment Successful</Text>
       
               {/* Description */}
               <Text style={styles.description}>
               Payment complete! We're getting your delivery partner ready
               </Text>
             </ScrollView>
           </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: "#fff",
    },
    container: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    iconContainer: {
      marginBottom: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      color: "#000",
    },
    description: {
      fontSize: 16,
      textAlign: "center",
      color: "#666",
      marginVertical: 10,
    },
    linkContainer: {
      marginTop: 10,
    },
    linkText: {
      fontSize: 16,
      color: "#6A0DAD",
      textDecorationLine: "underline",
    },
  });
export default PaymentSuccessScreen;