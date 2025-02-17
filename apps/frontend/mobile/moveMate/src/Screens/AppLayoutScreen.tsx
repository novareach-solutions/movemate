import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppScreens } from "../navigation/ScreenNames";
import OrderScreen from "./OrderScreen";
// import NotificationScreen from './Offerscreen';
import AccountScreen from "./AccountScreen";
import { Image, StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { images } from "../assets/images/images";
import HomeScreen from "./Home/HomeScreen";
import ProfileScreen from "./Profile/ProfileScreen";
import NotificationScreen from "./Notification/NotificationScreen";

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
        // Removed invalid `tabBarLabelPosition`
        tabBarIcon: ({ color }) => {
          // Assigning icons based on the route name
          let icon;
          if (route.name === AppScreens.HomeScreen) {
            icon = images.outlineHome;
          } else if (route.name === AppScreens.OrderScreen) {
            icon = images.orders;
          } else if (route.name === AppScreens.NotificationScreen) {
            icon = images.outlineNotification;
          } else if (route.name === AppScreens.AccountScreen) {
            icon = images.outlineAccount;
          }
          return (
            <Image source={icon} style={[styles.icon, { tintColor: color }]} />
          );
        },
      })}
    >
      <Tab.Screen
        options={{ tabBarLabel: "Home" }}
        name={AppScreens.HomeScreen}
        component={HomeScreen}
      />
      <Tab.Screen
        options={{ tabBarLabel: "Orders" }}
        name={AppScreens.OrderScreen}
        component={NotificationScreen}
      />
      <Tab.Screen
        options={{ tabBarLabel: "Notifications" }}
        name={AppScreens.NotificationScreen}
        component={NotificationScreen}
      />
      <Tab.Screen
        options={{ tabBarLabel: "Account" }}
        name={AppScreens.AccountScreen}
        component={ProfileScreen}
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
