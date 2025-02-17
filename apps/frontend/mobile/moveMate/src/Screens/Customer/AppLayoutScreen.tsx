import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet } from "react-native";
import { CustomerScreens } from "../../navigation/ScreenNames";
import { images } from "../../assets/images/images";
import HomeScreen from "./HomeScreen";
import OrderScreen from "./OrderScreen";
import NotificationScreen from "./NotificationScreen";
import AccountScreen from "./AccountSceen";
import { colors } from "../../theme/colors";

const Tab = createBottomTabNavigator();

const AppLayoutScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: colors.white },
        tabBarActiveTintColor: colors.purple,
        tabBarInactiveTintColor: colors.text.subText,
        tabBarLabelStyle: { fontSize: 12 },
        headerShown: false,
        tabBarLabelPosition: "above-icon",
        tabBarIcon: ({ focused, color }) => {
          // Common icon for active and inactive states
          let icon;
          if (route.name === CustomerScreens.HomeScreen) {
            icon = images.cart;
          } else if (route.name === CustomerScreens.OrderScreen) {
            icon = images.cart;
          } else if (route.name === CustomerScreens.NotificationScreen) {
            icon = images.cart;
          } else if (route.name === CustomerScreens.AccountScreen) {
            icon = images.cart;
          }
          return (
            <Image source={icon} style={[styles.icon, { tintColor: color }]} />
          );
        },
      })}
    >
      <Tab.Screen
        options={{ tabBarLabel: "Home" }}
        name={CustomerScreens.HomeScreen}
        component={HomeScreen}
      />
      <Tab.Screen
        options={{ tabBarLabel: "Orders" }}
        name={CustomerScreens.OrderScreen}
        component={OrderScreen}
      />
      <Tab.Screen
        options={{ tabBarLabel: "Notifications" }}
        name={CustomerScreens.NotificationScreen}
        component={NotificationScreen}
      />
      <Tab.Screen
        options={{ tabBarLabel: "Account" }}
        name={CustomerScreens.AccountScreen}
        component={AccountScreen}
      />
    </Tab.Navigator>
  );
};
export default AppLayoutScreen;

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
