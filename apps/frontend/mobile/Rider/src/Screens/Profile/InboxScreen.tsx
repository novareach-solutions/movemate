import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {colors} from '../../theme/colors';
import {typography} from '../../theme/typography';

const InboxScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Notifications' | 'Messages'>(
    'Notifications',
  );

  const notifications = [
    {
      id: '1',
      message:
        'Payment for your completed trip has been processed and added to your wallet.',
      date: '1/11/2024',
      resolved: false,
    },
    {
      id: '2',
      message:
        'Refer a friend and both of you earn $20 when they complete their first trip!',
      date: '1/11/2024',
      resolved: false,
    },
    {
      id: '3',
      message: 'Earn an extra $50 for completing 5 trips today.',
      date: '1/11/2024',
      resolved: false,
    },
    {
      id: '4',
      message:
        'Payment for your completed trip has been processed and added to your wallet.',
      date: '1/11/2024',
      resolved: true,
    },
    {
      id: '5',
      message:
        'Refer a friend and both of you earn $20 when they complete their first trip!',
      date: '1/11/2024',
      resolved: true,
    },
  ];

  const filteredNotifications = notifications.filter(item => !item.resolved);
  const resolvedNotifications = notifications.filter(item => item.resolved);

  const renderNotification = ({item}: {item: (typeof notifications)[0]}) => (
    <View style={styles.notificationItem}>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationDate}>{item.date}</Text>
      </View>
      <View style={styles.notificationDot} />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'Notifications' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('Notifications')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Notifications' && styles.activeTabText,
            ]}>
            Notifications
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Messages' && styles.activeTab]}
          onPress={() => setActiveTab('Messages')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Messages' && styles.activeTabText,
            ]}>
            Messages
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView>
        {activeTab === 'Notifications' && (
          <View>
            <FlatList
              data={filteredNotifications}
              renderItem={renderNotification}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.notificationList}
            />
            <Text style={styles.resolvedText}>Resolved</Text>
            <FlatList
              data={resolvedNotifications}
              renderItem={renderNotification}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.notificationList}
            />
          </View>
        )}
        {activeTab === 'Messages' && (
          <View style={styles.messagesContainer}>
            <Text style={styles.emptyMessage}>No messages available.</Text>
          </View>
        )}
      </ScrollView>

      {/* Footer Note */}
      <Text style={styles.footerNote}>
        All notifications will be automatically deleted after 60 days.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.primary,
  },
  backArrow: {
    fontSize: 24,
    color: colors.text.primary,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: typography.fontSize.large,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.border.primary,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.purple,
  },
  tabText: {
    fontSize: typography.fontSize.medium,
    color: colors.text.primaryGrey,
  },
  activeTabText: {
    color: colors.purple,
    fontWeight: 'bold',
  },
  notificationList: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border.primary,
    paddingVertical: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationMessage: {
    fontSize: typography.fontSize.medium,
    color: colors.text.primary,
    marginBottom: 5,
  },
  notificationDate: {
    fontSize: typography.fontSize.small,
    color: colors.text.primaryGrey,
  },
  notificationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.purple,
  },
  resolvedText: {
    padding: 20,
    fontSize: typography.fontSize.medium,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  messagesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 20,
  },
  emptyMessage: {
    fontSize: typography.fontSize.medium,
    color: colors.text.primaryGrey,
  },
  footerNote: {
    textAlign: 'center',
    fontSize: typography.fontSize.small,
    color: colors.text.primaryGrey,
    marginVertical: 20,
  },
});

export default InboxScreen;
