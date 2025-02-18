import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {colors} from '../../theme/colors';
import {typography} from '../../theme/typography';
import Header from '../../components/Header';
import ReferalBG from '../../assets/images/referalBG.svg';
import GoldCoin from '../../assets/icons/goldCoin.svg';

const ReferFriendsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Invite Friend' | 'Status'>(
    'Invite Friend',
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <Header isBack title="Refer A Friend" />
      <View style={styles.container}>
        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'Invite Friend' && styles.activeTab,
            ]}
            onPress={() => setActiveTab('Invite Friend')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'Invite Friend' && styles.activeTabText,
              ]}>
              Invite Friend
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Status' && styles.activeTab]}
            onPress={() => setActiveTab('Status')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'Status' && styles.activeTabText,
              ]}>
              Status
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'Invite Friend' && (
          <View style={styles.content}>
            {/* Friends Circle */}
            <View style={styles.circleImageContainer}>
              <ReferalBG style={styles.circleImage} />
            </View>

            <View
              style={{
                width: '100%',
              }}>
              {/* Referral Card */}
              <View style={styles.referralCard}>
                <GoldCoin style={styles.icon} />
                <Text style={styles.referralText}>
                  Refer your friends and earn $30 for every successful referral!
                </Text>
              </View>

              {/* Footer Invite Button */}
              <View style={styles.footer}>
                <TouchableOpacity style={styles.inviteButton}>
                  <Text style={styles.inviteButtonText}>Invite Friends</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {activeTab === 'Status' && (
          <View style={{flex: 1, paddingHorizontal: 20}}>
            {/* Summary Card */}
            <View style={styles.summaryCard}>
              <GoldCoin style={styles.icon} />
              <View>
                <Text style={styles.summaryText}>
                  ₹2,000 earned from 4 referrals
                </Text>
                <Text style={styles.subSummaryText}>
                  Total rewards earned so far
                </Text>
              </View>
            </View>

            {/* Referral Status List */}
            <Text style={styles.referralStatusHeading}>
              Your Referral Status
            </Text>
            <View style={{flex: 1}}>
              <View style={styles.statusItem}>
                <View>
                  <Text style={styles.amountText}>$30</Text>
                  <Text style={styles.dateText}>1/11/2024</Text>
                </View>
                <View style={[styles.statusBadge, styles.pendingBadge]}>
                  <Text style={[styles.statusText, styles.pendingText]}>
                    Pending
                  </Text>
                </View>
              </View>
              <View style={styles.statusItem}>
                <View>
                  <Text style={styles.amountText}>$30</Text>
                  <Text style={styles.dateText}>1/11/2024</Text>
                </View>
                <View style={[styles.statusBadge, styles.earnedBadge]}>
                  <Text style={[styles.statusText, styles.earnedText]}>
                    Earned
                  </Text>
                </View>
              </View>
              <View style={styles.statusItem}>
                <View>
                  <Text style={styles.amountText}>$30</Text>
                  <Text style={styles.dateText}>1/11/2024</Text>
                </View>
                <View style={[styles.statusBadge, styles.pendingBadge]}>
                  <Text style={[styles.statusText, styles.pendingText]}>
                    Pending
                  </Text>
                </View>
              </View>
              <View style={styles.statusItem}>
                <View>
                  <Text style={styles.amountText}>$30</Text>
                  <Text style={styles.dateText}>1/11/2024</Text>
                </View>
                <View style={[styles.statusBadge, styles.earnedBadge]}>
                  <Text style={[styles.statusText, styles.earnedText]}>
                    Earned
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightButtonBackground,
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
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: typography.fontSize.medium,
    color: colors.text.primaryGrey,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circleImageContainer: {
    marginVertical: 40,
  },
  circleImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  referralCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border.lightGray,
    padding: 15,
    borderRadius: 12,
    width: '100%',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  referralText: {
    fontSize: typography.fontSize.medium,
    color: colors.text.primary,
    flex: 1,
  },
  footer: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: colors.white,
  },
  inviteButton: {
    backgroundColor: colors.purple,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  inviteButtonText: {
    fontSize: typography.fontSize.medium,
    color: colors.white,
    fontWeight: 'bold',
  },
  statusContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    color: colors.text.primaryGrey,
    fontSize: typography.fontSize.small,
    fontWeight: 'bold',
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border.lightGray,
    padding: 15,
    borderRadius: 12,
    marginVertical: 20,
  },
  summaryText: {
    fontSize: typography.fontSize.medium,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  subSummaryText: {
    fontSize: typography.fontSize.small,
    color: colors.text.primaryGrey,
  },
  referralStatusHeading: {
    fontSize: typography.fontSize.medium,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 10,
  },
  statusItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border.lightGray,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  amountText: {
    fontSize: typography.fontSize.medium,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  dateText: {
    fontSize: typography.fontSize.small,
    color: colors.text.primaryGrey,
  },
  statusBadge: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  pendingBadge: {
    backgroundColor: colors.yellow,
    borderRadius: 15,
  },
  earnedBadge: {
    backgroundColor: colors.green,
  },
  pendingText: {
    color: colors.text.darkYellow,
    borderRadius: 15,
  },
  earnedText: {
    color: colors.white,
  },
});

export default ReferFriendsScreen;
