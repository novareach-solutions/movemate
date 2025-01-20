import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { images } from '../../../assets/images/images';

const ManageAccountScreen: React.FC = () => {
    const [email, setEmail] = useState('johndoe@gmail.com');
    const [isEmailEditable, setIsEmailEditable] = useState(false);

    const handleEmailSubmit = () => {
        // Handle email validation and submission
        setIsEmailEditable(false);
    };

    const handleEmailCancel = () => {
        setIsEmailEditable(false);
    };

    return (
        <View style={styles.container}>

            {/* Profile Picture */}
            <View style={styles.profileContainer}>
                <Image source={images.placeholderprofile} style={styles.profileImage} />
                <Text style={styles.editProfileText}>EDIT</Text>
            </View>

            {/* Name */}
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Name</Text>
                <View style={styles.infoRow}>
                    <Text style={styles.value}>John Doe</Text>
                    <TouchableOpacity>
                        <Text style={styles.editText}>EDIT</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Phone Number */}
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Phone Number</Text>
                <View style={styles.infoRow}>
                    <Text style={styles.value}>123456789</Text>
                    <TouchableOpacity>
                        <Text style={styles.editText}>EDIT</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Email Address */}
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Email Address</Text>
                <View style={styles.infoRow}>
                    <Text style={styles.value}>ahad@gmail.com</Text>
                    <TouchableOpacity>
                        <Text style={styles.editText}>EDIT</Text>
                    </TouchableOpacity>
                </View>
            </View>


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
    profileContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    editProfileText: {
        fontSize: typography.fontSize.small,
        color: colors.primary,
        fontWeight: 'bold',
    },
    infoContainer: {
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    label: {
        fontSize: typography.fontSize.small,
        color: colors.text.primaryGrey,
        marginBottom: 5,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    value: {
        fontSize: typography.fontSize.medium,
        color: colors.text.primary,
    },
    editText: {
        fontSize: typography.fontSize.small,
        color: colors.primary,
        fontWeight: 'bold',
    },
    emailContainer: {
        borderColor: colors.primary,
        borderWidth: 1,
    },
    emailInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
    emailInput: {
        flex: 1,
        fontSize: typography.fontSize.medium,
        color: colors.text.primary,
    },
    icon: {
        width: 20,
        height: 20,
        tintColor: colors.primary,
        marginLeft: 10,
    },
});

export default ManageAccountScreen;
