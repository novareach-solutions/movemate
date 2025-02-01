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
import {colors} from '../../../theme/colors';
import {typography} from '../../../theme/typography';
import {images} from '../../../assets/images/images';
import Header from '../../../components/Header';

const PayoutOption: React.FC<{
  title: string;
  description: string;
  icon: any;
  isSelected: boolean;
  onPress: () => void;
}> = ({title, description, icon, isSelected, onPress}) => {
  return (
    <View>
      <TouchableOpacity
        style={[styles.optionContainer, isSelected && styles.selectedOption]}
        onPress={onPress}>
        <Text style={styles.optionTitle}>{title}</Text>
        <View style={styles.checkbox}>
          {isSelected && <View style={styles.checkboxInner} />}
        </View>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Image source={icon} />
        <Text style={styles.optionDescription}>{description}</Text>
      </View>
    </View>
  );
};

const PayoutScreen: React.FC = () => {
  const [selectedPayoutType, setSelectedPayoutType] = useState<
    'Instant' | 'Normal' | null
  >(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    'Visa' | null
  >(null);

  return (
    <SafeAreaView style={styles.container}>
      <Header title='Payout' isBack />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Amount Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Amount</Text>
          <Text style={styles.amount}>$62.14</Text>
        </View>

        {/* Payout Type Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Payout type</Text>

          <PayoutOption
            title="Instant Payout"
            description="Funds will be transferred within 2-3 minutes at 5% transfer rate"
            icon={images.lightningIcon}
            isSelected={selectedPayoutType === 'Instant'}
            onPress={() => setSelectedPayoutType('Instant')}
          />

          <PayoutOption
            title="Normal Payout"
            description="Funds will be transferred within 2-3 hours at 0% transfer rate"
            icon={images.helpIcon}
            isSelected={selectedPayoutType === 'Normal'}
            onPress={() => setSelectedPayoutType('Normal')}
          />
        </View>

        {/* Payout Method Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Payout method</Text>

          <TouchableOpacity
            style={[
              styles.optionContainer,
              selectedPaymentMethod === 'Visa' && styles.selectedOption,
            ]}
            onPress={() => setSelectedPaymentMethod('Visa')}>
            <View
              style={{
                flexDirection: 'row',
                gap: 20,
                alignItems: 'center',
              }}>
              <Image source={images.visaIcon} />
              <View>
                <Text style={styles.optionTitle}>Bank of Melbourne</Text>
                <Text style={styles.optionDescription}>**** 1234</Text>
              </View>
            </View>
            <View style={styles.checkbox}>
              {selectedPaymentMethod === 'Visa' && (
                <View style={styles.checkboxInner} />
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* Note Section */}
        <Text style={styles.note}>
          Once you confirm, the funds will usually be sent within minutes.
          However, please note that the transfer time may vary and is not
          guaranteed.
        </Text>
      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightButtonBackground,
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: typography.fontSize.medium,
    color: colors.text.primary,
    marginBottom: 10,
  },
  amount: {
    fontSize: typography.fontSize.large,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  optionContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border.lightGray,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedOption: {
    borderColor: colors.primary,
  },
  optionTitle: {
    fontSize: typography.fontSize.medium,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  optionDescription: {
    fontSize: typography.fontSize.small,
    color: colors.text.primaryGrey,
    marginTop: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.border.lightGray,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxInner: {
    width: 10,
    height: 10,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  note: {
    fontSize: typography.fontSize.small,
    color: colors.text.primaryGrey,
    marginBottom: 20,
    lineHeight: 18,
  },
  footer: {
    backgroundColor: colors.lightButtonBackground,
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: colors.border.lightGray,
  },
  confirmButton: {
    backgroundColor: colors.green,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: typography.fontSize.medium,
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default PayoutScreen;
