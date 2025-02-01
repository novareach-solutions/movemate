import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { images } from '../../assets/images/images';

const SavedAddressesScreen: React.FC = () => {
    const savedAddresses = [
        {
            id: 1,
            title: 'Home',
            address: '120 Waldeck Street, Arlington, Texas, 75760',
            icon: images.profileAccount,
        },
        {
            id: 2,
            title: 'Office',
            address: '120 Waldeck Street, Arlington, Texas, 75760',
            icon: images.profileAccount,
        },
    ];

    const renderAddressItem = ({ item }: { item: typeof savedAddresses[0] }) => (
        <View style={styles.addressCard}>
            <View style={styles.addressContent}>
                <View style={styles.iconContainer}>
                    <Image source={item.icon} style={styles.icon} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.address}>{item.address}</Text>
                </View>
            </View>
            <View style={styles.actionsContainer}>
                <TouchableOpacity>
                    <Text style={styles.editText}>EDIT</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.deleteText}>DELETE</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Saved Address</Text>
            <FlatList
                data={savedAddresses}
                renderItem={renderAddressItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
            />
            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>Add New Address</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightButtonBackground,
        padding: 20,
    },
    header: {
        fontSize: typography.fontSize.large,
        fontWeight: 'bold',
        color: colors.text.primary,
        marginBottom: 20,
    },
    listContainer: {
        paddingBottom: 20,
    },
    addressCard: {
        backgroundColor: '#F6F6F6',
        borderRadius: 10,
        paddingTop: 15,
        paddingHorizontal: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    addressContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    iconContainer: {
        marginRight: 15,
    },
    icon: {
        width: 30,
        height: 30,
        tintColor: colors.primary,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: typography.fontSize.semiMedium,
        fontWeight: 'bold',
        color: colors.text.primary,
    },
    address: {
        fontSize: typography.fontSize.medium,
        color: colors.text.primary,
        marginTop: 5,
    },
    actionsContainer: {
        flexDirection: 'row',
        paddingVertical: 20,
        borderTopWidth: 1,
        gap:20,
        borderTopColor: colors.border.lightGray,
        marginTop:20
    },
    editText: {
        fontSize: typography.fontSize.medium,
        color: colors.purple,
        fontWeight: 'bold',
    },
    deleteText: {
        fontSize: typography.fontSize.medium,
        color: colors.error,
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: colors.purple,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: typography.fontSize.medium,
        color: colors.white,
        fontWeight: 'bold',
    },
});

export default SavedAddressesScreen;
