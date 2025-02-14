import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../theme/colors";
import Header from "../../components/Header";
import { supportOptions } from "../../constants/staticData";
import { images } from "../../assets/images/images";

type MessageProps = {
    orderId?: string;
    category: string;
    message: string;
    date?: string;
    isActive: boolean;
  };
  
  const MessageComponent: React.FC<MessageProps> = ({ orderId, category, message, date, isActive }) => {
    return (
      <View style={[styles.messageContainer,styles.pastMessage]}>
        {orderId && <Text style={styles.orderId}>Order ID: {orderId}</Text>}
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.messageText}>{message}</Text>
        {date && <Text style={styles.messageDate}>{date}</Text>}
        {isActive && <View style={styles.activeIndicator} />}
      </View>
    );
  };

const HelpSupportScreen = () => {
    const [activeTab, setActiveTab] = useState("FAQ");
    const renderItem = ({ item }: { item: { id: string; title: string; icon: React.FC<any> } }) => {
        const IconComponent = item.icon; 
        return (
          <TouchableOpacity style={styles.item} onPress={() => console.log(`Selected: ${item.title}`)}>
            <IconComponent style={styles.imageStyle} />
            <Text style={styles.text}>{item.title}</Text>
            <images.ForwardArrow />
          </TouchableOpacity>
        );
      };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
        <Header isBack bgColor={colors.lightGrey} title="Help & Support"/>
        <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab("FAQ")} style={[styles.tab, activeTab === "FAQ" && styles.activeTab]}>
          <Text style={activeTab === "FAQ" ? styles.activeTabText : styles.tabText}>FAQ</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("Messages")} style={[styles.tab, activeTab === "Messages" && styles.activeTab]}>
          <Text style={activeTab === "Messages" ? styles.activeTabText : styles.tabText}>Messages</Text>
        </TouchableOpacity>
      </View>
      {
         activeTab === "FAQ" &&    <View style={styles.container}>
         <Text style={styles.header}>Having trouble with your order?</Text>
         <FlatList
           data={supportOptions}
           keyExtractor={(item) => item.id}
           renderItem={renderItem}
           contentContainerStyle={styles.list}
         />
       </View>
      }
 

    { activeTab === "Messages" &&
        <ScrollView>
            <View style={styles.messageSection}>

           
        <Text style={styles.sectionHeader}>Active Conversations</Text>
        <MessageComponent orderId="12345" category="Account" message="Request for Document Update Assistance" isActive={true} />
        <MessageComponent orderId="12345" category="Post order support" message="Where is my order?" isActive={true} />
        <Text style={styles.sectionHeader}>Past Conversations</Text>
        <MessageComponent orderId="12345" category="Account" message="Request for Document Update Assistance" date="11/2/24" isActive={false} />
        <MessageComponent category="Account" message="Request for Document Update Assistance" date="11/2/24" isActive={false} />
        </View>
      </ScrollView>
    }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGrey,
  },
  safeAreaContainer:{
    flex:1,
    backgroundColor: colors.lightGrey,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  list: {
    paddingVertical: 10,
  },
  imageStyle:{marginRight:20},
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingVertical:20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  icon: {
    marginRight: 16,
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
  tabContainer: { flexDirection: "row", justifyContent: "space-around", marginBottom: 20 },
  tab: { paddingVertical: 10, paddingHorizontal: 20, borderBottomWidth: 2, borderBottomColor: "transparent" },
  activeTab: { borderBottomColor: colors.purple_ad },
  tabText: { color: colors.grey_77,fontSize:16, fontWeight: "bold"  },
  activeTabText: { color: "#8123AD", fontWeight: "bold" ,fontSize:16 },
  sectionHeader: { fontSize: 18, fontWeight: "bold", color: "#8123AD", marginVertical: 10 },
  messageContainer: { padding: 15, borderRadius: 10, backgroundColor: "#f9f9f9", marginBottom: 10, position: "relative" },
  messageSection:{paddingHorizontal:20},
  activeMessage: { borderWidth: 1, borderColor: "#8123AD" },
  pastMessage: { borderWidth: 1, borderColor: "#ddd" },
  orderId: { fontSize: 14, color: "#666" },
  category: { fontSize: 16, fontWeight: "bold", marginVertical: 5 },
  messageText: { fontSize: 14, color: "#333" },
  messageDate: { fontSize: 12, color: "#999", marginTop: 5 },
  activeIndicator: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#8123AD", position: "absolute", top: 10, right: 10 },
});

export default HelpSupportScreen;
