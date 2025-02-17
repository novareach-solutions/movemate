import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { images } from "../../../assets/images/images";
import Header from "../../../components/Header";
import { CustomerScreens } from "../../../navigation/ScreenNames";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../theme/colors";
import { SvgProps } from "react-native-svg";
import { cards, wallets } from "../../../constants/staticData";
type SvgComponent = React.FC<SvgProps>;
const PaymentSelectionScreen = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const navigation = useNavigation();
  const handlePayment = () => {
    navigation.navigate(CustomerScreens.PaymentSuccessScreen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header isBack title="Make payment" bgColor={colors.lightGrey} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Credit/Debit Card Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Credit/debit card</Text>
          {cards.map((card) => {
            const SvgImage: SvgComponent = card.icon;
            return (
              <TouchableOpacity
                key={card.id}
                style={[
                  styles.cardContainer,
                  selectedMethod === card.id && styles.selectedContainer,
                ]}
                onPress={() => setSelectedMethod(card.id)}
              >
                <SvgImage style={styles.icon} />
                {/* <Image source={card.icon} style={styles.icon} /> */}
                <View style={styles.cardDetails}>
                  <Text style={styles.cardText}>{card.bank}</Text>
                  <Text style={styles.cardText}>**** {card.last4}</Text>
                </View>
                <View style={styles.radioButton}>
                  {selectedMethod === card.id && (
                    <View style={styles.radioInner} />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(CustomerScreens.AddCardScreen);
            }}
            style={styles.addNewCard}
          >
            <Text style={styles.addCardText}>+ Add new card</Text>
          </TouchableOpacity>
        </View>

        {/* Wallets Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Wallets</Text>
          {wallets.map((wallet) => {
            const SvgImage: SvgComponent = wallet.icon;
            return (
              <TouchableOpacity
                key={wallet.id}
                style={[
                  styles.walletContainer,
                  selectedMethod === wallet.id && styles.selectedContainer,
                ]}
                onPress={() => setSelectedMethod(wallet.id)}
              >
                <SvgImage style={styles.icon} />
                <Text style={styles.walletText}>{wallet.name}</Text>
                <View style={styles.radioButton}>
                  {selectedMethod === wallet.id && (
                    <View style={styles.radioInner} />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.footer}>
          {/* Terms and Conditions */}
          <Text style={styles.termsText}>
            By confirming, I agree that this order does not include illegal or
            restricted items. <Text style={styles.termsLink}>View T&C</Text>
          </Text>

          {/* Proceed to Pay Button */}
          <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
            <Text style={styles.payButtonText}>Proceed To Pay</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  footer: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: "flex-end",
  },
  contentContainer: {
    flex: 1,
    // padding: 16,
  },
  sectionContainer: {
    // backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 12,
    color: "#000",
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    backgroundColor: colors.white,
    borderColor: "#DDD",
    borderRadius: 8,
    marginBottom: 12,
  },
  walletContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    backgroundColor: colors.white,
    borderColor: "#DDD",
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedContainer: {
    borderColor: "#28A745",
  },
  icon: {
    width: 40,
    height: 40,
    objectFit: "contain",
    marginRight: 12,
  },
  cardDetails: {
    flex: 1,
  },
  cardText: {
    fontSize: 14,
    color: "#555",
  },
  walletText: {
    flex: 1,
    fontSize: 14,
    color: "#555",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#28A745",
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#28A745",
  },
  addNewCard: {
    alignItems: "flex-start",
    marginTop: 12,
  },
  addCardText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  termsText: {
    fontSize: 12,
    color: "#555",
    marginTop: 16,
    textAlign: "center",
    marginHorizontal: 10,
  },
  termsLink: {
    color: "#007BFF",
    textDecorationLine: "underline",
  },
  payButton: {
    backgroundColor: "#28A745",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    marginHorizontal: 10,
  },
  payButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PaymentSelectionScreen;
