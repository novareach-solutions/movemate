import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { images } from '../../assets/images/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';


const privacyPolicy = `MoveMate is your reliable, all-in-one solution for deliveries, towing, and moving services.Whether it's sending a package, buying from a store, or arranging home or vehicle transport,MoveMate ensures fast, secure, and hassle-free service. MoveMate is designed to make your life`

const termsOfService = `MoveMate is your reliable, all-in-one solution for deliveries, towing, and moving services.Whether it's sending a package, buying from a store, or arranging home or vehicle transport,MoveMate ensures fast, secure, and hassle-free service. MoveMate is designed to make your life`

const LegalAboutScreen: React.FC = () => {
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const toggleSection = (section: string) => {
        setExpandedSection((prevSection) => (prevSection === section ? null : section));
    };

    return (
        <SafeAreaView style={{flex:1, backgroundColor:colors.lightGrey}}>
             <Header isBack title='Legal & About' bgColor={colors.lightGrey} />
        <View style={styles.container}>
            {/* About App Section */}
            <View style={styles.section}>
                <Text style={styles.header}>About App</Text>
                <Text style={styles.description}>
                    MoveMate is your reliable, all-in-one solution for deliveries, towing, and moving services.
                    Whether it's sending a package, buying from a store, or arranging home or vehicle transport,
                    MoveMate ensures fast, secure, and hassle-free service. MoveMate is designed to make your life
                    easier by offering 24/7 availability and a user-friendly interface. From scheduling services to
                    tracking your orders in real-time, we prioritize convenience and efficiency, ensuring that every
                    task is handled with care and professionalism.
                </Text>
            </View>

            {/* Privacy Policy Section */}
            <View style={styles.accordion}>
                <TouchableOpacity
                    style={styles.accordionHeader}
                    onPress={() => toggleSection('Privacy Policy')}
                >
                    <Text style={styles.accordionTitle}>Privacy Policy</Text>
                    <View style={[styles.accordionIndicator,expandedSection === 'Privacy Policy' && styles.accordionIndicatorRotated]}>
                        <images.BackArrow width={15} height={15} />
                    </View>
                </TouchableOpacity>
                {expandedSection === 'Privacy Policy' && (
                    <View style={styles.accordionContent}>
                        <Text style={styles.contentText}>{privacyPolicy}</Text>
                    </View>
                )}
            </View>

            {/* Terms of Service Section */}
            <View style={styles.accordion}>
                <TouchableOpacity
                    style={styles.accordionHeader}
                    onPress={() => toggleSection('Terms of Service')}
                >
                    <Text style={styles.accordionTitle}>Terms Of Service</Text>
                    <View style={[styles.accordionIndicator,expandedSection === 'Terms of Service' && styles.accordionIndicatorRotated]}>
                        <images.BackArrow width={15} height={15} />
                    </View>
                </TouchableOpacity>
                {expandedSection === 'Terms of Service' && (
                    <View style={styles.accordionContent}>
                        <Text style={styles.contentText}>{termsOfService}</Text>
                    </View>
                )}
            </View>
        </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightGrey,
        padding: 20,
    },
    section: {
        marginBottom: 20,
    },
    header: {
        fontSize: typography.fontSize.large,
        fontWeight: 'bold',
        color: colors.text.primary,
        marginBottom: 10,
    },
    description: {
        fontSize: typography.fontSize.medium,
        lineHeight: 22,
        color: colors.black
    },
    accordion: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.border.lightGray,
        paddingBottom: 10,
    },
    accordionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    accordionTitle: {
        fontSize: typography.fontSize.medium,
        fontWeight: 'bold',
        color: colors.text.primary,
    },
    accordionContent: {
        marginTop: 10,
    },
    contentText: {
        fontSize: typography.fontSize.medium,
        lineHeight: 20,
    },
    accordionIndicatorRotated: {
        transform: [{ rotate: '270deg' }],
    },
    accordionIndicator: {
        transform: [{ rotate: '90deg' }],
    },
});

export default LegalAboutScreen;
