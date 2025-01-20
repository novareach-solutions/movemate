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

const profileData = [
    { id: '1', title: 'Inbox', icon: images.profileInbox, screen: ProfileScreens.Inbox, notificationCount: 3 },
    { id: '2', title: 'Earnings', icon: images.profileEarnings, screen: ProfileScreens.Earnings },
    { id: '3', title: 'Wallet', icon: images.profileWallet, screen: ProfileScreens.Wallet },
    { id: '4', title: 'Earning Mode', icon: images.profileEarningMode, screen: ProfileScreens.EarningMode },
    { id: '5', title: 'Refer Friends', icon: images.profileReferFriend, screen: ProfileScreens.ReferFriends },
    { id: '6', title: 'Rewards', icon: images.profileRewards, screen: ProfileScreens.Rewards },
    { id: '7', title: 'Account', icon: images.profileAccount, screen: ProfileScreens.Account },
    { id: '8', title: 'Log Out', icon: images.profileLogout, screen: ProfileScreens.Logout, isLogout: true },
];

const ProfileScreen: React.FC = () => {
    const navigation = useNavigation();

    const renderItem = ({ item }: { item: typeof profileData[0] }) => (
        <TouchableOpacity
            style={[styles.listItem]}
            onPress={() => navigation.navigate(item.screen as never)}>
                <Image source={item.icon} />
                <Text style={[styles.itemText]}>
                {item.title}
            </Text>
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
        <View style={styles.container}>
            {/* Profile Header */}
            <View style={styles.header}>
                <Image
                    source={{ uri: 'https://i.pravatar.cc/100' }}
                    style={styles.profileImage}
                />
                <View>
                    <Text style={styles.profileName}>John Doe</Text>
                    <Text style={styles.profileDetails}>
                        +61 6783940545
                    </Text>
                    <Text style={styles.membership}>Membership valid till 23rd February</Text>
                </View>
            </View>

            {/* Subscription Plan */}
            <TouchableOpacity style={styles.subscriptionPlan}>
                <Text style={styles.subscriptionText}>Weekly subscription plan</Text>
                <View style={styles.subscriptionBadge}>
                    <Text style={styles.subscriptionBadgeText}>ACTIVE</Text>
                </View>
            </TouchableOpacity>

            {/* Menu List */}
            <FlatList
                data={profileData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
        </View>
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
        fontSize: typography.fontSize.large,
        fontWeight: 'bold',
        color: colors.text.primary,
    },
    profileDetails: {
        fontSize: typography.fontSize.medium,
        color: colors.text.primaryGrey,
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
        fontFamily:typography.fontWeight.semiBold
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
});


export default ProfileScreen;
