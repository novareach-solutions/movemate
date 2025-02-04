import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { typography } from '../theme/typography';
import { colors } from '../theme/colors';

// Dummy Messages Data
const activeConversations = [
    { id: 1, orderId: '12345', message: 'Request for Document Update Assistance', unread: true },
    { id: 2, orderId: '12345', message: 'Where is my order?', unread: true },
];

const pastConversations = [
    { id: 3, orderId: '12345', message: 'Request for Document Update Assistance', date: '11/2/24' },
    { id: 4, orderId: '12345', message: 'Request for Document Update Assistance', date: '11/2/24' },
    { id: 5, orderId: '12345', message: 'Request for Document Update Assistance', date: '11/2/24' },
];

const MessagesTab = () => {
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                {/* Active Conversations */}
                <Text style={styles.sectionTitle}>Active Conversations</Text>
                {activeConversations.map((item) => (
                    <TouchableOpacity key={item.id} style={styles.messageContainer}>
                        <View style={styles.messageContent}>
                            <Text style={styles.orderId}>Order ID: {item.orderId}</Text>
                            <Text style={styles.messageText}>{item.message}</Text>
                        </View>
                        {item.unread && <View style={styles.unreadIndicator} />}
                    </TouchableOpacity>
                ))}

                {/* Past Conversations */}
                <Text style={styles.sectionTitle}>Past Conversations</Text>
                {pastConversations.map((item) => (
                    <TouchableOpacity key={item.id} style={styles.messageContainer}>
                        <View style={styles.messageContent}>
                            <Text style={styles.orderId}>Order ID: {item.orderId}</Text>
                            <Text style={styles.messageText}>{item.message}</Text>
                            <Text style={styles.dateText}>{item.date}</Text>
                        </View>
                    </TouchableOpacity>
                ))}

                {/* Load More Button */}
                <TouchableOpacity style={styles.loadMoreButton}>
                    <Text style={styles.loadMoreText}>Load more</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 20, // Ensure extra space at bottom
    },
    container: {
        paddingHorizontal: 16,
        backgroundColor: colors.lightButtonBackground,
    },
    sectionTitle: {
        fontSize: typography.fontSize.medium,
        fontWeight: 'bold',
        color: colors.purple,
        marginTop: 20,
        paddingVertical: 10,
    },
    messageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.white,
        paddingVertical: 15,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: colors.border.lightGray,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // For Android shadow
    },
    messageContent: {
        flex: 1,
    },
    orderId: {
        fontSize: typography.fontSize.small,
        fontWeight: 'bold',
        color: colors.black,
    },
    messageText: {
        fontSize: typography.fontSize.medium,
        color: colors.black,
        marginVertical: 4,
    },
    dateText: {
        fontSize: typography.fontSize.small,
        color: colors.gray,
    },
    unreadIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.purple,
    },
    loadMoreButton: {
        alignItems: 'center',
        marginTop: 20,
        paddingVertical: 10,
    },
    loadMoreText: {
        fontSize: typography.fontSize.medium,
        color: colors.purple,
        fontWeight: 'bold',
    },
});

export default MessagesTab;
