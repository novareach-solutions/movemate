import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {colors} from '../../../theme/colors';
import Header from '../../../components/Header';

const payoutDetails = {
  totalTransferAmount: 127,
  payoutType: 'Instant Payout',
  payoutMethod: 'Payout to xxxx34',
  totalAmount: 129,
  transferDeductions: 2,
  status: 'Completed / Pending',
  dateTime: '13/09/23 , 09:25pm',
};

const PayoutSummaryScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <Header isBack title="Payout Summary" help />
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Total Transfer Amount</Text>
          <Text style={styles.amount}>
            ${payoutDetails.totalTransferAmount}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.label}>Payout type</Text>
          <Text style={styles.subText}>{payoutDetails.payoutType}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Payout method</Text>
          <Text style={styles.subText}>{payoutDetails.payoutMethod}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.summaryTitle}>Payout Summary</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.summaryRow}>
          <Text style={styles.label}>Total Amount</Text>
          <Text style={styles.value}>${payoutDetails.totalAmount}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.label}>Transfer deductions</Text>
          <Text style={styles.negativeValue}>
            -${payoutDetails.transferDeductions}
          </Text>
        </View>

        <View style={styles.transferAmountContainer}>
          <View style={styles.transferAmountRow}>
            <Text style={styles.summaryTitle}>Transfer Amount</Text>
            <Text style={styles.value}>
              ${payoutDetails.totalTransferAmount}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Status</Text>
          <Text style={styles.subText}>{payoutDetails.status}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Date & Time</Text>
          <Text style={styles.subText}>{payoutDetails.dateTime}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.lightGray,
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: colors.text.primaryGrey,
  },
  subText: {
    fontSize: 16,
    color: colors.text.subText,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  negativeValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.error,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.purple,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  transferAmountContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border.lightGray,
    paddingVertical: 10,
    marginVertical: 10,
  },
  transferAmountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default PayoutSummaryScreen;
