import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextStyle,
  SafeAreaView,
} from 'react-native';
import {colors} from '../../../theme/colors';
import {typography} from '../../../theme/typography';
import PurpleCheck from '../../../assets/icons/purpleCheck.svg';
import Header from '../../../components/Header';

interface BenefitItemProps {
  title: string;
  description: string;
}

export const BenefitItem: React.FC<BenefitItemProps> = ({
  title,
  description,
}) => {
  return (
    <View style={styles.benifitContainer}>
      <PurpleCheck />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const SubscriptionPlansScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Weekend' | 'Weekly' | 'Monthly'>(
    'Monthly',
  );

  const plansData = {
    Weekend: {
      title: 'Weekend Plan',
      price: '$9.99',
      oldPrice: '$14.99',
      benefits: [
        {
          title: 'Designed for Weekend Riders',
          description:
            'If you’re working part-time over the weekend, this plan is ideal for you.',
        },
        {
          title: 'Save More, Earn More',
          description:
            'Unused subscription hours roll over to the next week, ensuring you never waste a single hour.',
        },
      ],
    },
    Weekly: {
      title: 'Weekly Plan',
      price: '$14.99',
      oldPrice: '$19.99',
      benefits: [
        {
          title: 'Designed for Weekly Riders',
          description:
            'If you’re riding weekly and want to maximize earnings, this plan is perfect for you.',
        },
        {
          title: 'Save More, Earn More',
          description:
            'Unused subscription hours roll over to the next week, ensuring you never waste a single hour.',
        },
      ],
    },
    Monthly: {
      title: 'Monthly Plan',
      price: '$19.99',
      oldPrice: '$24.99',
      benefits: [
        {
          title: 'Designed for Full-Time Riders',
          description:
            'If you’re working full-time and ready to maximize your earnings, this plan is for you.',
        },
        {
          title: 'Save More, Earn More',
          description:
            'Unused subscription hours roll over to the next week, ensuring you never waste a single hour.',
        },
      ],
    },
  };

  const activePlan = plansData[activeTab];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#2a1d3d',
      }}>
      <Header isBack earningScreen />
      <View style={styles.container}>
        <Text style={styles.title}>Boost Earnings with</Text>
        <Text style={styles.subtitle}>0% Commission!</Text>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {(['Weekend', 'Weekly', 'Monthly'] as const).map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text
          style={{
            color: colors.white,
            textAlign: 'center',
            marginVertical: 10,
            fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
            marginHorizontal: 15,
          }}>
          Select a plan that fits your schedule to maximize your earnings{' '}
        </Text>

        {/* Plan Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{activePlan.title}</Text>
          <Text style={styles.cardPrice}>{activePlan.price}</Text>
          <Text style={styles.cardOldPrice}>{activePlan.oldPrice}</Text>

          {/* Map benefits */}
          <View style={styles.benefitsContainer}>
            {activePlan.benefits.map((benefit, index) => (
              <BenefitItem
                key={index}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.getStartedButton}>
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2a1d3d',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSize.large,
    fontWeight: 'bold',
    color: colors.white,
    marginTop: 40,
  },
  subtitle: {
    fontSize: typography.fontSize.large,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 30,
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
    // backgroundColor: 'linear-gradient(45deg, #6735FF, #A05CF5, #FC9BE5)',
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
  },
  cardTitle: {
    fontSize: typography.fontSize.large,
    fontWeight: 'bold',
    color: '#B068DD',
    marginBottom: 10,
  },
  cardPrice: {
    fontSize: 45,
    fontWeight: 'bold',
    color: colors.white,
  },
  cardOldPrice: {
    fontSize: typography.fontSize.medium,
    textDecorationLine: 'line-through',
    marginBottom: 20,
    color: colors.text.subText,
  },
  benefitsContainer: {
    marginBottom: 20,
  },
  getStartedButton: {
    backgroundColor: '#9365E6',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  getStartedText: {
    fontSize: typography.fontSize.medium,
    color: colors.white,
    fontWeight: 'bold',
  },
  benifitContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    gap: 10,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: colors.purple,
    marginRight: 10,
    marginTop: 5,
  },
  textContainer: {
    flex: 1,
  },
  description: {
    fontSize: typography.fontSize.small,
    color: colors.white,
    marginTop: 4,
    lineHeight: 20,
  },
});

export default SubscriptionPlansScreen;
