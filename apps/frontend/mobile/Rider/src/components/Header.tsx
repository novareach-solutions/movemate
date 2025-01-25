import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { images } from '../assets/images/images';

interface HeaderProps {
    isBack?: boolean;
    logo?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isBack, logo }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {isBack && (
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Image source={images.arrow} style={styles.arrow} />
                </TouchableOpacity>
            )}
            {logo && (
                <View style={styles.logoContainer}>
                    <Image source={images.logo} style={styles.logo} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.border.primary,
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        left: 20,
    },
    arrow: {
        transform: [{ rotate: '180deg' }],
    },
    logoContainer: {
        position: 'absolute',
        alignSelf: 'center',
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 100, // Adjust logo size as needed
        height: 40,
        resizeMode: 'contain',
    },
});

export default Header;
