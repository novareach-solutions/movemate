import AsyncStorage from "@react-native-async-storage/async-storage";

// function to save token
export const saveToken = async (tokenKey: string, tokenValue: string) => {
  try {
    await AsyncStorage.setItem(tokenKey, tokenValue);
  } catch (error) {
    console.error("Error saving token:", error);
  }
};
