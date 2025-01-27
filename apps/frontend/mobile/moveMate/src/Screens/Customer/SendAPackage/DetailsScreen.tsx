import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { images } from '../../../assets/images/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomerScreens } from '../../../navigation/ScreenNames';
import { useNavigation } from '@react-navigation/native';

const SAPDetailsScreen = () => {
    const address = '123 Main Street, Springfield, USA';

    const beforeYouSendPoints = [
        'Avoid sending expensive or fragile items',
        'Items should weigh less than 8 kg and fit comfortably in a car.',
        'No alcohol, illegal, or restricted items',
    ];

    const navigation=useNavigation()

    const renderPoint = ({ item }) => (
        <View style={styles.pointContainer}>
            <Text style={styles.checkmark}>✔</Text>
            <Text style={styles.pointText}>{item}</Text>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* Header Section */}
            <View style={styles.header}>
                <View style={styles.rowButton}>
                    <TouchableOpacity style={styles.rowButton}>
                        <Image style={styles.icon} source={images.location} />
                        <Text style={styles.homeText}>Home</Text>
                        <Text style={styles.icon}>⬇</Text>
                    </TouchableOpacity>
                    <Image
                        source={images.account}
                        style={{ marginLeft: '60%', height: 30, width: 30 }}
                    />
                </View>
                <Text style={styles.address}>{address}</Text>
            </View>

            {/* Main Content */}
            <View style={styles.container}>
                <Text style={styles.headerTitle}>Send A Package</Text>
                <Text style={styles.subHeader}>Quick, reliable, and safe parcel delivery</Text>

                <View style={styles.availabilityContainer}>
                    <Text style={styles.availabilityText}>8:00 AM – 10:00 PM</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Before you send</Text>
                    <FlatList
                        data={beforeYouSendPoints}
                        renderItem={renderPoint}
                        keyExtractor={(item, index) => index.toString()}
                        style={styles.listContainer}
                    />
                </View>
            </View>

            {/* Footer Section */}
            <View style={styles.footer}>
                <TouchableOpacity onPress={(()=>{
                    navigation.navigate(CustomerScreens.EnterLocationDetailsScreen)
                })} style={styles.pickupButton}>
                    <Text style={styles.pickupButtonText}>Add pick up & drop location</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 20,
    },
    header: {
        padding: 16,
        backgroundColor: colors.white,
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
        paddingLeft: 22,
    },
    headerTitle: {
        fontSize: typography.fontSize.large,
        fontWeight: 'bold',
        color: colors.purple,
        marginBottom: 5,
    },
    subHeader: {
        fontSize: typography.fontSize.medium,
        color: colors.text.primaryGrey,
        marginBottom: 20,
    },
    availabilityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    availabilityText: {
        fontSize: typography.fontSize.medium,
        color: colors.green,
    },
    divider: {
        height: 1,
        backgroundColor: colors.border.primary,
        marginVertical: 15,
    },
    sectionTitle: {
        fontSize: typography.fontSize.medium,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    listContainer: {
        marginBottom: 20,
    },
    pointContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkmark: {
        fontSize: 16,
        color: colors.green,
        marginRight: 10,
    },
    pointText: {
        fontSize: typography.fontSize.medium,
        color: colors.text.primary,
    },
    pickupButton: {
        backgroundColor: colors.purple,
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        marginHorizontal: 20,
    },
    pickupButtonText: {
        color: colors.white,
        fontSize: typography.fontSize.medium,
        fontWeight: 'bold',
    },
    sectionContainer: {
        borderWidth: 1, 
        borderColor: colors.border.lightGray, 
        borderRadius: 12, 
        padding: 16, 
        backgroundColor: colors.white, 
        marginBottom: 20, 
    },
    footer: {
        paddingVertical:10,
        backgroundColor: colors.white,
        justifyContent: 'flex-end',
    },
});

export default SAPDetailsScreen;
