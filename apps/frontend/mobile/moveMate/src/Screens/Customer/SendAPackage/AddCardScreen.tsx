import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Header from "../../../components/Header";
import { colors } from "../../../theme/colors";

const AddCardScreen = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Header isBack />
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.headerTitle}>Add Card Details</Text>

        {/* Form */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Card Number</Text>
          <TextInput
            style={styles.input}
            placeholder="1234 XXXX XXXX 5678"
            keyboardType="numeric"
            placeholderTextColor={colors.grey}
            value={cardNumber}
            onChangeText={setCardNumber}
          />

          <Text style={styles.label}>Card Holder Name</Text>
          <TextInput
            style={styles.input}
            placeholder="John Doe"
            value={cardHolderName}
            placeholderTextColor={colors.grey}
            onChangeText={setCardHolderName}
          />

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Expiry</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/YY"
                placeholderTextColor={colors.grey}
                keyboardType="numeric"
                value={expiry}
                onChangeText={setExpiry}
              />
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={styles.input}
                placeholder="XXX"
                keyboardType="numeric"
                placeholderTextColor={colors.grey}
                secureTextEntry
                value={cvv}
                onChangeText={setCvv}
              />
            </View>
          </View>
        </View>

        {/* Add Card Button */}
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>Add Card</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 18,
    color: "#000",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 32,
  },
  formContainer: {
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#000",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  column: {
    flex: 1,
  },
  addButton: {
    backgroundColor: "#7D3FDB", // Purple button
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
});

export default AddCardScreen;
