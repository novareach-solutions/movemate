import React from "react";
import { View,Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { images } from "../../assets/images/images";

interface SuccessMessageProps {
  title: string;
  description: string;
  linkText?: string; // Optional
  onLinkPress?: () => void; // Optional function
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ title, description, linkText, onLinkPress }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
         <Image source={images.success} width={200} height={200}/>
        </View>

        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Description */}
        <Text style={styles.description}>{description}</Text>

        {/* Link (Optional) */}
        {linkText && onLinkPress && (
          <TouchableOpacity onPress={onLinkPress} style={styles.linkContainer}>
            <Text style={styles.linkText}>{linkText}</Text>
          </TouchableOpacity>
        )}
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

export default SuccessMessage;
