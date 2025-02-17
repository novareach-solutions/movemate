import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Linking,
  Alert,
  SafeAreaView,
} from "react-native";
import { colors } from "../../theme/colors";
import { typography } from "../../theme/typography";
import Header from "../../components/Header";

const FeedbackScreen: React.FC = () => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (feedback.trim()) {
      console.log("Feedback submitted:", feedback);
      setFeedback(""); // Clear feedback input after submission
    } else {
    }
  };

  const openSupportSection = () => {
    Linking.openURL("https://support.example.com"); // Replace with your support section URL
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.lightGrey }}>
      <Header isBack title="Give a Feedback" bgColor={colors.lightGrey} />
      <View style={styles.container}>
        <Text style={styles.infoText}>
          We welcome your feedback on what works and how we can improve. Please
          note, we cannot respond to individual comments. For support, visit our{" "}
          <Text style={styles.linkText} onPress={openSupportSection}>
            Support Section
          </Text>
          .
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter feedback"
          placeholderTextColor={colors.text.primaryGrey}
          multiline
          value={feedback}
          onChangeText={setFeedback}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.lightGrey,
    // backgroundColor: colors.lightButtonBackground,
    // padding: 20,borderColor:'red',borderWidth:2
  },
  infoText: {
    fontSize: typography.fontSize.medium,
    color: colors.text.primary,
    marginBottom: 20,
    lineHeight: 22,
  },
  linkText: {
    color: colors.purple,
    textDecorationLine: "underline",
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.border.lightGray,
    borderRadius: 8,
    padding: 15,
    fontSize: typography.fontSize.medium,
    color: colors.text.primary,
    marginBottom: 20,
    minHeight: 200,
    textAlignVertical: "top",
    backgroundColor: "#FDFDFD",
  },
  submitButton: {
    backgroundColor: colors.purple,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitText: {
    color: colors.white,
    fontSize: typography.fontSize.medium,
    fontWeight: "bold",
  },
});

export default FeedbackScreen;
