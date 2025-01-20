import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { images } from '../assets/images/images';

const PlanCard = ({
    planTitle,
    price,
    originalPrice,
    benefits,
    isSelected,
    onToggle,
}) => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.planTitle}>{planTitle}</Text>
                <TouchableOpacity onPress={onToggle}>
                    <View
                        style={[
                            styles.checkbox,
                            isSelected && styles.checkboxSelected,
                        ]}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.priceContainer}>
                <Text style={styles.price}>${price}</Text>
                {originalPrice && (
                    <Text style={styles.originalPrice}>${originalPrice}</Text>
                )}
            </View>

            <View style={styles.benefitsContainer}>
                {benefits.map((benefit, index) => (
                    <View key={index} style={styles.benefitItem}>
                        <Image
                            source={images.checkIcon} // Replace with your check icon
                            style={styles.benefitIcon}
                        />
                        <Text style={styles.benefitText}>
                            <Text style={styles.benefitTitle}>
                                {benefit.title}:{' '}
                            </Text>
                            {benefit.description}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    planTitle: {
        fontSize: typography.fontSize.medium,
        fontWeight: 'bold',
        color: colors.purple,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: colors.white,
        backgroundColor: 'transparent',
    },
    checkboxSelected: {
        backgroundColor: colors.green,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 20,
    },
    price: {
        fontSize: typography.fontSize.large,
        fontWeight: 'bold',
        color: colors.white,
    },
    originalPrice: {
        fontSize: typography.fontSize.small,
        color: colors.text.primaryGrey,
        textDecorationLine: 'line-through',
        marginLeft: 10,
    },
    benefitsContainer: {
        marginTop: 10,
    },
    benefitItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    benefitIcon: {
        width: 16,
        height: 16,
        tintColor: colors.purple,
        marginRight: 10,
    },
    benefitText: {
        fontSize: typography.fontSize.small,
        color: colors.white,
        lineHeight: 20,
    },
    benefitTitle: {
        fontWeight: 'bold',
    },
});

export default PlanCard;
