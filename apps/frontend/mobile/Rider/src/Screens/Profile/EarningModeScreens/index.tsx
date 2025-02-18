import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import {colors} from '../../../theme/colors';
import {typography} from '../../../theme/typography';
import {
  ProfileScreens,
  ProfileScreensParamList,
} from '../../../navigation/ScreenNames';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Header from '../../../components/Header';
import {BenefitItem} from './SubscriptionPlansScreen';

const EarningsModeScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Subscription' | 'Commission'>(
    'Subscription',
  );
  const navigation = useNavigation<NavigationProp<ProfileScreensParamList>>();

  const renderContent = () => {
    if (activeTab === 'Subscription') {
      return (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Subscription</Text>
            <View style={styles.popularTag}>
              <Text style={styles.popularText}>POPULAR</Text>
            </View>
          </View>
          <Text style={styles.cardDescription}>
            Access premium features with a standard subscription. Choose this
            plan to unlock a wide range of benefits.
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ProfileScreens.SubscriptionPlans);
            }}
            style={styles.button}>
            <Text style={styles.buttonText}>View Plans</Text>
          </TouchableOpacity>
          <View style={styles.benefitsContainer}>
            <BenefitItem
              title={'0% Commission'}
              description={'Keep 100% of what you earn'}
            />
            <BenefitItem
              title={'Special Perks'}
              description={
                'Get exclusive benefits like priority rides, free cancellations, and more.'
              }
            />
            <BenefitItem
              title={'Roll-Over Policy'}
              description={
                'Unused subscription hours roll over to the next cycle.'
              }
            />
          </View>
        </View>
      );
    } else if (activeTab === 'Commission') {
      return (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Commission</Text>
          <Text style={styles.cardDescription}>
            Opt for our pay-as-you-go model with 10% commission charged per ride
            and enjoy flexibility without upfront costs.
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Activate</Text>
          </TouchableOpacity>
          <View style={styles.benefitsContainer}>
            <BenefitItem
              title={'Only 10% Commission'}
              description={'Pay a small fee per ride; no subscription needed.'}
            />
            <BenefitItem
              title={'No Commitment'}
              description={
                'Ideal for part-time drivers or occasional deliveries.'
              }
            />
          </View>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#2a1d3d'}}>
      <Header isBack earningScreen />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>
          {activeTab === 'Subscription'
            ? 'Boost Earnings with'
            : 'Deliver and earn with'}
        </Text>
        <Text style={styles.subtitle}>
          {activeTab === 'Subscription' ? '0% Commission!' : '10% Commission!'}
        </Text>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'Subscription' && styles.activeTab,
            ]}
            onPress={() => setActiveTab('Subscription')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'Subscription' && styles.activeTabText,
              ]}>
              Subscription
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Commission' && styles.activeTab]}
            onPress={() => setActiveTab('Commission')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'Commission' && styles.activeTabText,
              ]}>
              Commission
            </Text>
          </TouchableOpacity>
        </View>

        {/* Dynamic Content */}
        {renderContent()}
        {/* <Image source={images.subscriptionBanner} /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2a1d3d',
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 40, // Added bottom padding here
  },
  title: {
    fontSize: typography.fontSize.large,
    fontWeight: 'bold',
    color: colors.white,
    marginTop: 40,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.fontSize.large,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 30,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 12,
    padding: 5,
    marginHorizontal: 30,
    borderWidth: 0.5,
    borderColor: colors.white,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: colors.purple,
  },
  tabText: {
    fontSize: typography.fontSize.medium,
    color: colors.white,
  },
  activeTabText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    width: '100%',
    borderWidth: 1,
    borderColor: '#FC9BE5',
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#B068DD',
    marginBottom: 10,
  },
  popularTag: {
    backgroundColor: colors.green,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  popularText: {
    fontSize: typography.fontSize.small,
    color: '#fff',
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: typography.fontSize.medium,
    color: '#fff',
    marginBottom: 20,
    lineHeight: 25,
  },
  button: {
    backgroundColor: '#9365E6',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: typography.fontSize.medium,
    color: '#fff',
    fontWeight: 'bold',
  },
  benefitsContainer: {
    marginTop: 10,
  },
  benefit: {
    fontSize: typography.fontSize.medium,
    color: '#fff',
    marginBottom: 10,
    lineHeight: 20,
  },
  bullet: {
    fontWeight: 'bold',
    marginRight: 5,
  },
});

export default EarningsModeScreen;
