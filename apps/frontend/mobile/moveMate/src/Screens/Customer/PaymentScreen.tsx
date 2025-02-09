import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

interface PaymentMethod {
  id: string;
  type: 'card' | 'wallet';
  name: string;
  icon: any;
  lastFour?: string;
  bank?: string;
}

const PaymentScreen = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');

  const cards: PaymentMethod[] = [
    {
      id: 'visa_1',
      type: 'card',
      name: 'VISA',
      icon: require('../assets/visa.png'),
      lastFour: '1234',
      bank: 'Bank of Melbourne',
    },
    {
      id: 'mastercard_1',
      type: 'card',
      name: 'Mastercard',
      icon: require('../assets/mastercard.png'),
      lastFour: '1234',
      bank: 'Bank of Melbourne',
    },
  ];

  const wallets: PaymentMethod[] = [
    {
      id: 'paypal',
      type: 'wallet',
      name: 'PayPal',
      icon: require('../assets/paypal.png'),
    },
    {
      id: 'applepay',
      type: 'wallet',
      name: 'Apple Pay',
      icon: require('../assets/applepay.png'),
    },
  ];

  const handlePayment = () => {
    // Implement payment logic
    console.log('Processing payment with method:', selectedMethod);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}}>
          <Image 
            source={require('../assets/back-arrow.png')} 
            style={styles.backIcon} 
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Make payment</Text>
          <Text style={styles.headerSubtitle}>Total $27</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Credit/Debit Cards Section */}
        <Text style={styles.sectionTitle}>Credit/debit card</Text>
        <View style={styles.cardsContainer}>
          {cards.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={[
                styles.cardItem,
                selectedMethod === card.id && styles.selectedItem,
              ]}
              onPress={() => setSelectedMethod(card.id)}
            >
              <Image source={card.icon} style={styles.cardIcon} />
              <View style={styles.cardDetails}>
                <Text style={styles.bankName}>{card.bank}</Text>
                <Text style={styles.cardNumber}>**** {card.lastFour}</Text>
              </View>
              <View style={styles.radioButton}>
                {selectedMethod === card.id && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity style={styles.addCardButton}>
            <Text style={styles.addCardText}>+ Add new card</Text>
          </TouchableOpacity>
        </View>

        {/* Wallets Section */}
        <Text style={styles.sectionTitle}>Wallets</Text>
        <View style={styles.walletsContainer}>
          {wallets.map((wallet) => (
            <TouchableOpacity
              key={wallet.id}
              style={[
                styles.walletItem,
                selectedMethod === wallet.id && styles.selectedItem,
              ]}
              onPress={() => setSelectedMethod(wallet.id)}
            >
              <Image source={wallet.icon} style={styles.walletIcon} />
              <Text style={styles.walletName}>{wallet.name}</Text>
              <View style={styles.radioButton}>
                {selectedMethod === wallet.id && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.termsText}>
          By confirming, I agree that this order does not include illegal items.{' '}
          <Text style={styles.termsLink}>View T&C</Text>
        </Text>
        <TouchableOpacity 
          style={styles.payButton}
          onPress={handlePayment}
        >
          <Text style={styles.payButtonText}>Proceed To Pay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  cardsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  selectedItem: {
    backgroundColor: '#F8F9FA',
  },
  cardIcon: {
    width: 40,
    height: 25,
    marginRight: 12,
  },
  cardDetails: {
    flex: 1,
  },
  bankName: {
    fontSize: 16,
    fontWeight: '500',
  },
  cardNumber: {
    fontSize: 14,
    color: '#666',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
  },
  addCardButton: {
    paddingVertical: 12,
  },
  addCardText: {
    color: '#6200EE',
    fontSize: 16,
  },
  walletsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  walletItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  walletIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  walletName: {
    flex: 1,
    fontSize: 16,
  },
  footer: {
    padding: 16,
    backgroundColor: 'white',
  },
  termsText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  termsLink: {
    color: '#6200EE',
  },
  payButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  payButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PaymentScreen;