import React from "react";
import { View, Text,Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { images } from "../../../assets/images/images";

const CancelSuccessScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <Image source={images.success} width={200} height={200}/>
        </View>

        {/* Title */}
        <Text style={styles.title}>Order Successfully Cancelled</Text>

        {/* Description */}
        <Text style={styles.description}>
          The order has been cancelled. Thank you for providing the necessary details. If further action is required, our
          support team will reach out to you.
        </Text>

        {/* Refund Status Button */}
        <TouchableOpacity onPress={() => console.log("Check Refund Status")} style={styles.linkContainer}>
          <Text style={styles.linkText}>Check Refund Status</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginVertical: 10,
  },
  linkContainer: {
    marginTop: 10,
  },
  linkText: {
    fontSize: 16,
    color: "#6A0DAD",
    textDecorationLine: "underline",
  },
});

export default CancelSuccessScreen;
