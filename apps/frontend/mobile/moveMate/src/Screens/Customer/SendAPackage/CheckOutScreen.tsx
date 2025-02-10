import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  TextInput,
} from "react-native";
import Header from "../../../components/Header";
import { AuthScreens, CustomerScreens } from "../../../navigation/ScreenNames";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../theme/colors";
import { deliveryInstructions } from "../../../constants/staticData";
import { useAppSelector } from "../../../redux/hook";
import { formStyles } from "../../../theme/form";
import { images } from "../../../assets/images/images";
import CancellationPolicyModal from "../../../components/Modals/CancellationPolicyModal";

const CheckoutScreen = () => {
  const pickupLocationData = useAppSelector(state => state.deliverAPackage.pickupLocation);
  const dropLocationData = useAppSelector(state => state.deliverAPackage.dropLocation);
  const [tip, setTip] = useState<number | "custom" | null>(null);
  const [customTip, setCustomTip] = useState("");
  const [isCancelVisible, setIsCancelVisible] = useState(false);
  const [selectedInstructions, setSelectedInstructions] = useState<string[]>([]);
  const navigation = useNavigation();


  const toggleInstruction = (instructionLabel: string) => {
    setSelectedInstructions((prev) => {
      if (prev.includes(instructionLabel)) {
        return prev.filter((label) => label !== instructionLabel);
      } else {
        return [...prev, instructionLabel];
      }
    });
  };

  const isDisabled = (instructionLabel: string) => {
    if (selectedInstructions.includes("OTP Verification")) {
      return instructionLabel === "Drop-off at the door" || instructionLabel === "Avoid calling";
    }
    if (selectedInstructions.includes("Avoid calling")) {
      return instructionLabel === "OTP Verification";
    }
    if (selectedInstructions.includes("Drop-off at the door")) {
      return instructionLabel === "OTP Verification";
    }
    return false;
  };


  return (
    <SafeAreaView style={styles.container}>
      <Header isBack title="Checkout" bgColor={colors.lightGrey} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* From and To Section */}
        <View style={styles.addressContainer}>
          <View style={styles.addressRow}>
            <Text style={styles.fromText}>From:</Text>
            <Text style={styles.address}>{pickupLocationData?.address}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.addressRow}>
            <Text style={styles.toText}>To:</Text>
            <Text style={styles.address}>{dropLocationData?.address}</Text>
          </View>
        </View>
        <Text style={formStyles.inputLabel}>Delivery Details</Text>
        {/* Delivery Details Section */}
        <View style={styles.sectionContainer}>

          <View style={styles.pickupContainer}>

            <Text style={styles.greenText}>PICKUP IN <Text style={styles.darkMin}>10 MINS</Text></Text>
          </View>
          <View style={styles.pickupWrapper}>
            <images.clock style={styles.tipIcon} />
            <Text style={styles.detailText}>25-30 mins delivery</Text>
          </View>
          <View style={styles.pickupWrapper}>
            <images.distance style={styles.tipIcon} />
            <Text style={styles.detailText}>Total distance 5 kms</Text>
          </View>

        </View>

        {/* Delivery Instructions Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.tipTextContainer}>
            <images.deliveryBoy style={styles.tipIcon} />
            <View> <Text style={styles.sectionTitle}>Delivery Instructions</Text>
              <Text>Add any special delivery notes</Text></View>
          </View>
          <View style={styles.divider} />
          <View style={styles.tagContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tagScrollView}
              snapToAlignment="start"
              decelerationRate="fast"
              snapToInterval={120} // Adjust card width
            >
              {deliveryInstructions.map((instruction, index) => {
                const isSelected = selectedInstructions.includes(instruction.label);
                const disabled = isDisabled(instruction.label);
                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.tag, isSelected && styles.tagSelected, disabled && styles.tagDisabled]}
                    onPress={() => !disabled && toggleInstruction(instruction.label)}
                    disabled={disabled}
                  >
                    <Image
                      source={instruction.icon}
                      style={[
                        styles.icon,
                        { tintColor: isSelected ? "#8123AD" : disabled ? "#ccc" : "#333" },
                      ]}
                    />
                    <Text style={isSelected ? styles.tagTextSelected : disabled ? styles.tagTextDisabled : styles.tagText}>
                      {instruction.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>

        {/* Tip Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.tipTextContainer}>

            <images.tipIcon style={styles.tipIcon} />
            <View>
              <Text style={styles.sectionTitle}>Thank your partner with a tip</Text>
              <Text style={styles.tipSubText}>Tip goes directly to the driver</Text>
            </View>
          </View>

          <View style={styles.tipContainer}>
            {[2, 4, 6, "custom"].map((amount) => (
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
                  {amount === "custom" ? "Custom" : `$${amount}`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {tip === "custom" && (
            <TextInput
              style={styles.customTipInput}
              placeholder="Enter custom amount"
              keyboardType="numeric"
              value={customTip}
              onChangeText={setCustomTip}
            />
          )}
        </View>
        <Text style={formStyles.inputLabel}>Bill Details</Text>
        {/* Bill Details Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.billText}>Handling Fee: $2</Text>
          <Text style={styles.billText}>Delivery Fee for 5 kms: $25</Text>
          <View style={styles.divider} />
          <Text style={styles.totalText}>To Pay: $27</Text>
        </View>

        <View style={[styles.sectionContainer, { backgroundColor: colors.lightGrey }]}>
          <Text style={formStyles.inputLabel}>Review details to avoid cancellation</Text>
          <Text>At Vamoose, we value the time and effort of our riders and believe in fair compensation for their work.</Text>
          <TouchableOpacity style={styles.cancelPolicyBtn} onPress={() => {
            setIsCancelVisible(true)
          }}>
            <Text style={styles.cancelPolicyBtnTxt}>READ CANCELATION POLICY</Text>
          </TouchableOpacity>
        </View>

        <Text>By confirming, I agree that this order does not include illegal or restricted items.   <TouchableOpacity onPress={() => {
          navigation.navigate(AuthScreens.PrivacyPolicyScreen)
        }}><Text style={styles.purpleText}>View T&C</Text></TouchableOpacity></Text>

        {/* Payment Button */}
        <TouchableOpacity style={styles.paymentButton} onPress={() => {
          navigation.navigate(CustomerScreens.PaymentSelectionScreen)
        }}>
          <Text style={styles.paymentButtonText}>Make Payment | $27</Text>
        </TouchableOpacity>
      </ScrollView>

      <CancellationPolicyModal onClose={() => { setIsCancelVisible(false) }} isVisible={isCancelVisible} />
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
  tagTextDisabled: { color: "#999", fontSize: 12, },
  tagDisabled: { backgroundColor: "#e0e0e0" },
  pickupContainer: {
    backgroundColor: '#DDFBEF',
    padding: 10,
    width: 160
  },
  purpleText: {
    color: colors.purple,
    fontWeight: 'bold'
  },
  fromText: {
    color: colors.green_72,
    fontWeight: 'bold'
  },
  toText: {
    color: colors.red_00,
    fontWeight: 'bold'
  },
  pickupWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    color: '#333'
  },
  addressContainer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    borderColor: colors.border.greyD3,
    borderWidth: 1,
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
  tipTextContainer: {
    flexDirection: 'row',
    marginBottom: 10
  },
  tipIcon: {
    marginRight: 10
  },
  cancelPolicyBtn: {
    // padding:10,
    paddingBottom: 5,
    // borderBottomColor:colors.purple,
    // borderBottomWidth:1,
    // borderStyle:'dashed'
    // textDecorationLine:'line-through',

  },
  cancelPolicyBtnTxt: {
    marginTop: 10,
    color: colors.purple,
    // textDecorationLine:'underline',
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
    borderWidth: 1,
    borderColor: '#D4D4D4'
  },
  greenText: {
    color: "#28A745",
    fontWeight: "bold",
  },
  darkMin: {
    fontWeight: 900
  },
  detailText: {
    color: "#232525",
    marginBottom: 4,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 16,
    color: "#000",
  },
  // tagContainer: {
  //   flexDirection: "row",
  //   flexWrap: "wrap",
  // },
  tagScrollView: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  tag: {
    width: 88,
    height: 80,
    flexDirection: "column",
    // alignItems: "center",
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: colors.border.greyD3,
    padding: 10,
    borderRadius: 12,
    marginRight: 10,
    backgroundColor: "#FFF",
  },
  tagSelected: {
    borderColor: "#8123AD",
    backgroundColor: "#FCF4FF",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 6,
    resizeMode: "contain",
  },
  tagText: {
    fontSize: 12,
    color: "#333",
  },
  tagTextSelected: {
    color: "#8123AD",
    fontSize: 12,
    // fontWeight: "bold",
  },
  tipContainer: {
    flexDirection: "row",
    marginTop: 8,
    justifyContent: 'space-between'
  },
  tipButton: {
    backgroundColor: colors.whiteFd,
    borderWidth: 1,
    borderColor: colors.border.greyD3,
    color: '#232525',
    padding: 12,
    borderRadius: 12,
    // marginRight: 8,

  },
  tipButtonSelected: {
    backgroundColor: "#FCF4FF",
    borderWidth: 1,
    borderColor: '#8123AD'
  },
  tipText: {
    color: "#555",
  },
  tipTextSelected: {
    color: "#8123AD",
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
    backgroundColor: colors.lightGreen,
    padding: 16,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  paymentButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  customTipInput: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 10, marginTop: 10, textAlign: "center" },

});

export default CheckoutScreen;
