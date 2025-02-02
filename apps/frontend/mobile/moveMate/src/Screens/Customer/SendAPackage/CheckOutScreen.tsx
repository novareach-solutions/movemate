import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import Header from "../../../components/Header";
import { images } from "../../../assets/images/images";
import { CustomerScreens } from "../../../navigation/ScreenNames";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../theme/colors";

const CheckoutScreen = () => {
  const [tip, setTip] = useState(null);
  const [selectedInstruction, setSelectedInstruction] = useState(null);
  const navigation=useNavigation()

  const deliveryInstructions = [
    { label: "OTP Verification", icon: images.pickUpNotesIcon },
    { label: "Do not ring the bell", icon: images.doNotRing },
    { label: "Drop-off at the door", icon: images.doorDropOff },
    { label: "Avoid calling", icon: images.phone },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header isBack title="Checkout" bgColor={colors.lightGrey} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* From and To Section */}
        <View style={styles.addressContainer}>
          <View style={styles.addressRow}>
            <Text style={styles.label}>From:</Text>
            <Text style={styles.address}>120 Waldeck Street, 26301 (home)</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.addressRow}>
            <Text style={styles.label}>To:</Text>
            <Text style={styles.address}>120 Berkshire RG1, 2RI (work)</Text>
          </View>
        </View>

        {/* Delivery Details Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.greenText}>PICKUP IN 10 MINS</Text>
          <Text style={styles.detailText}>25-30 mins delivery</Text>
          <Text style={styles.detailText}>Total distance 5 kms</Text>
        </View>

        {/* Delivery Instructions Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Delivery Instructions</Text>
          <View style={styles.tagContainer}>
            {deliveryInstructions.map((instruction, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.tag,
                  selectedInstruction === instruction.label && styles.tagSelected,
                ]}
                onPress={() =>
                  setSelectedInstruction(
                    selectedInstruction === instruction.label ? null : instruction.label
                  )
                }
              >
                <Image source={instruction.icon} style={styles.icon} />
                <Text
                  style={
                    selectedInstruction === instruction.label
                      ? styles.tagTextSelected
                      : styles.tagText
                  }
                >
                  {instruction.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Tip Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Thank your partner with a tip</Text>
          <Text style={styles.tipSubText}>Tip goes directly to the driver</Text>
          <View style={styles.tipContainer}>
            {[2, 4, 6].map((amount) => (
              <TouchableOpacity
                key={amount}
                style={[
                  styles.tipButton,
                  tip === amount && styles.tipButtonSelected,
                ]}
                onPress={() => setTip(amount)}
              >
                <Text
                  style={
                    tip === amount
                      ? styles.tipTextSelected
                      : styles.tipText
                  }
                >
                  ${amount}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bill Details Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.billText}>Handling Fee: $2</Text>
          <Text style={styles.billText}>Delivery Fee for 5 kms: $25</Text>
          <View style={styles.divider} />
          <Text style={styles.totalText}>To Pay: $27</Text>
        </View>

        {/* Payment Button */}
        <TouchableOpacity style={styles.paymentButton} onPress={()=>{
            navigation.navigate(CustomerScreens.PaymentSelectionScreen)
        }}>
          <Text style={styles.paymentButtonText}>Make Payment | $27</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  contentContainer: {
    padding: 16,
  },
  addressContainer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  addressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
    color: "#000",
  },
  address: {
    color: "#555",
  },
  divider: {
    height: 1,
    backgroundColor: "#DDD",
    marginVertical: 8,
  },
  sectionContainer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  greenText: {
    color: "#28A745",
    fontWeight: "bold",
  },
  detailText: {
    color: "#555",
    marginBottom: 4,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000",
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    padding: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  tagSelected: {
    backgroundColor: "#28A745",
  },
  tagText: {
    color: "#555",
    marginLeft: 8,
  },
  tagTextSelected: {
    color: "#FFF",
  },
  icon: {
    width: 20,
    height: 20,
    objectFit:"contain"
  },
  tipContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  tipButton: {
    backgroundColor: "#F0F0F0",
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  tipButtonSelected: {
    backgroundColor: "#28A745",
  },
  tipText: {
    color: "#555",
  },
  tipTextSelected: {
    color: "#FFF",
  },
  billText: {
    marginBottom: 4,
    color: "#555",
  },
  totalText: {
    fontWeight: "bold",
    color: "#000",
  },
  paymentButton: {
    backgroundColor: "#28A745",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  paymentButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default CheckoutScreen;
