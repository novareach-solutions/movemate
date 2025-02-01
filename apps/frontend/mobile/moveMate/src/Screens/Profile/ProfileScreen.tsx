import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { ProfileScreens } from '../../navigation/ScreenNames';
import { images } from '../../assets/images/images';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { images } from '../../assets/images/images';

const profileData = [
    // {
    //     id: '1',
    //     title: 'Refunds',
    //     icon: images.profileInbox,
    //     screen: ProfileScreens.Inbox,
    //     notificationCount: 3,
    // },
    {
        id: '2',
        title: 'Manage Addresses',
        icon: images.profileEarnings,
        screen: ProfileScreens.SavedAddressesScreen,
    },
    {
        id: '3',
        title: 'Refer Friends',
        icon: images.profileReferFriend,
        screen: ProfileScreens.ReferFriendsScreen,
    },
    {
        id: '4',
        title: 'Legal & About',
        icon: images.profileWallet,
        screen: ProfileScreens.LegalAboutScreen,
    },
    {
        id: '5',
        title: 'Give A Feedback',
        icon: images.profileEarningMode,
        screen: ProfileScreens.FeedbackScreen,
    },
    // {
    //     id: '6',
    //     title: 'Invite Friends',
    //     icon: images.profileRewards,
    //     screen: ProfileScreens.Rewards,
    // },
    // {
    //     id: '7',
    //     title: 'Log Out',
    //     icon: images.profileLogout,
    //     screen: ProfileScreens.Logout,
    //     isLogout: true,
    // },
];

const ProfileScreen: React.FC = () => {
    const navigation = useNavigation();

    const renderItem = ({ item }: { item: (typeof profileData)[0] }) => (
        <TouchableOpacity
            style={[styles.listItem]}
            onPress={() => navigation.navigate(item.screen as never)}>
            <Image source={item.icon} />
            <Text style={[styles.itemText]}>{item.title}</Text>
            {/* {item.notificationCount && (
                <View style={styles.notificationBadge}>
                    <Text style={styles.notificationText}>{item.notificationCount}</Text>
                </View>
            )} */}
            <View>
                <Image source={images.arrow} />
            </View>
        </TouchableOpacity>
    );

    return (
         <SafeAreaView style={styles.container}>
        <View>
            {/* Profile Header */}
            <View style={styles.header}>
                <View style={styles.headerContainer}>
                    <Text style={styles.profileName}>SYED MUSTAFA ALI</Text>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: 'space-between',
                        marginVertical: 10
                    }}><View style={styles.contactItem}>
                            <Image source={images.phoneWhite} />
                            <Text style={styles.contactText}>+61-123456789</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.contactItem}>
                            <Image source={images.messageWhite} />
                            <Text style={styles.contactText}>syedmustafa@gmail.com</Text>
                        </View></View>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate(ProfileScreens.ManageAccount)
                    }} style={styles.editProfileButton}>
                        <Text style={styles.editProfileText}>Edit profile</Text>
                    </TouchableOpacity>
                </View>

            </View>

            {/* Menu List */}
            <FlatList
                data={profileData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
            />
        </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightButtonBackground,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.border.primary,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    profileName: {
        fontSize: 23,
        fontWeight: 'semibold',
        color: colors.white,
    },
    profileDetails: {
        fontSize: typography.fontSize.small,
        color: colors.white,
    },
    membership: {
        fontSize: typography.fontSize.small,
        color: colors.green,
        marginTop: 5,
    },
    subscriptionPlan: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: colors.lightPurple,
        marginHorizontal: 15,
        borderRadius: 12,
        marginTop: 10,
    },
    subscriptionText: {
        fontSize: typography.fontSize.medium,
        color: colors.text.primary,
        fontWeight: 'bold',
    },
    subscriptionBadge: {
        backgroundColor: colors.green,
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    subscriptionBadgeText: {
        color: colors.white,
        fontSize: typography.fontSize.small,
        fontWeight: 'bold',
    },
    listContainer: {
        paddingHorizontal: 15,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        borderWidth: 1.2,
        borderColor: colors.border.lightGray,
        paddingHorizontal: 10,
        backgroundColor: colors.white,
        marginVertical: 10,
        borderRadius: 12,
    },

    icon: {
        fontSize: typography.fontSize.large,
        color: colors.text.primary,
    },
    itemText: {
        flex: 1,
        marginLeft: 15,
        fontSize: typography.fontSize.medium,
        color: colors.text.primary,
        fontFamily: typography.fontWeight.semiBold,
    },
    notificationBadge: {
        backgroundColor: colors.purple,
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 2,
        alignSelf: 'flex-start',
    },
    notificationText: {
        color: colors.white,
        fontSize: typography.fontSize.small,
    },
    logoutItem: {
        backgroundColor: colors.error,
        borderRadius: 8,
    },
    logoutText: {
        color: colors.error,
        fontWeight: 'bold',
    },
    headerContainer: {
        flex: 1,
        backgroundColor: colors.purple,
        padding: 25,
        borderRadius: 12,
    },
    profileEmail: {
        fontSize: typography.fontSize.small,
        color: colors.white,
    },
    editProfileButton: {
        marginTop: 10,
        alignSelf: 'flex-start',
    },
    editProfileText: {
        fontSize: typography.fontSize.medium,
        color: colors.white, // Adjust this to match your button text color
        textDecorationLine: 'underline',
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
        gap: 5
    },
    contactText: {
        fontSize: typography.fontSize.small,
        color: colors.white,
    },
    divider: {
        width: 1,
        height: 20,
        backgroundColor: colors.white,
        marginHorizontal: 10,
    },
});

export default ProfileScreen;
