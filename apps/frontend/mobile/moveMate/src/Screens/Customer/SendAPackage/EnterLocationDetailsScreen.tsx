// EnterLocationDetailsScreen.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../../assets/images/images";
import Header from "../../../components/Header";
import LocationModal, { ILocation } from "../../../components/Modals/LocationModal";
import PackageTypeModal from "../../../components/Modals/PackageTypeModal"; // New import
import SenderReceiverModal from "../../../components/Modals/SenderRecieverModal";
import { CustomerScreens } from "../../../navigation/ScreenNames";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../../redux/hook";
import { createOrder, updatePickupLoaction, updatePkgId } from "../../../redux/slices/deliverAPackageSlice";

const EnterLocationDetailsScreen = () => {
  interface orderPayload {
    senderName: string;
    senderPhoneNumber: string;
    receiverName: string;
    receiverPhoneNumber: string;
    packageType: string;
    deliveryInstructions: string;
    pickupLocation: {
        addressLine1: string;
        addressLine2: string;
        landmark: string;
        latitude: number;
        longitude: number;
      };
      dropLocation: {
        addressLine1: string;
        latitude: number;
        longitude: number;
      };
    estimatedDistance: number;
    estimatedTime: number;
}
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalPlaceholder, setModalPlaceholder] = useState("");
  const [currentType, setCurrentType] = useState<"pickup" | "drop">("pickup");
  const [pickupLocation, setPickupLocation] = useState<ILocation | null>(null);
  const [dropLocation, setDropLocation] = useState<ILocation | null>(null);
  const [pickupNotes, setPickupNotes] = useState("");

  // States for Sender and Receiver Details Modals
  const [isSenderModalVisible, setIsSenderModalVisible] = useState(false);
  const [isReceiverModalVisible, setIsReceiverModalVisible] = useState(false);
  const [senderDetails, setSenderDetails] = useState<{ name: string; phoneNumber: string } | null>(null);
  const [receiverDetails, setReceiverDetails] = useState<{ name: string; phoneNumber: string } | null>(null);

    const dispatch = useAppDispatch();

  // States for Package Type Modal
  const [isPackageTypeModalVisible, setIsPackageTypeModalVisible] = useState(false);
  const [packageType, setPackageType] = useState<string | null>(null);

  const navigation=useNavigation()

  const openLocationModal = (type: "pickup" | "drop") => {
    setCurrentType(type);
    if (type === "pickup") {
      setModalTitle("Enter Pick-Up Location");
      setModalPlaceholder("Search for a pick-up location");
    } else {
      setModalTitle("Enter Drop-Off Location");
      setModalPlaceholder("Search for a drop-off location");
    }
    setIsLocationModalVisible(true);
  };

  const closeLocationModal = (locationData?: ILocation) => {
    setIsLocationModalVisible(false);
    if (locationData) {
      if (currentType === "pickup") {
        const pickupLocation = {
          pickupLattitude:locationData.latitude,
          pickupLongitude:locationData.longitude
        }
        setPickupLocation(locationData);
        dispatch(updatePickupLoaction(pickupLocation));
      } else {
        setDropLocation(locationData);
      }
    }
  };

  const openDetailsModal = (type: "sender" | "receiver") => {
    if (type === "sender") {
      setIsSenderModalVisible(true);
    } else {
      setIsReceiverModalVisible(true);
    }
  };

  const closeDetailsModal = (type: "sender" | "receiver", details?: { name: string; phoneNumber: string }) => {
    if (type === "sender") {
      setIsSenderModalVisible(false);
      if (details) {
        setSenderDetails(details);
      }
    } else {
      setIsReceiverModalVisible(false);
      if (details) {
        setReceiverDetails(details);
      }
    }
  };

  const openPackageTypeModal = () => {
    setIsPackageTypeModalVisible(true);
  };

  const closePackageTypeModal = (selectedType?: string) => {
    setIsPackageTypeModalVisible(false);
    if (selectedType) {
      setPackageType(selectedType);
    }
  };

  console.log('pickupLocation', pickupLocation)

  const confirmOrder = async() => {
    // Validate required fields
    if (!pickupLocation || !dropLocation || !senderDetails || !receiverDetails || !packageType) {
      Alert.alert("Error", "Please provide all required fields.");
      return;
    }
  
    // // Construct the TSendPackageOrder object
    const payload: orderPayload = {
      senderName: senderDetails?.name ?? "", 
      senderPhoneNumber: senderDetails?.phoneNumber ?? "",
      receiverName: receiverDetails?.name ?? "",
      receiverPhoneNumber: receiverDetails?.phoneNumber ?? "",
      packageType: packageType ?? "",
      deliveryInstructions: pickupNotes,
      pickupLocation: {
        addressLine1: pickupLocation?.addressLine1 ?? "",
        addressLine2: pickupLocation?.addressLine2 ?? "",
        landmark: pickupLocation?.landmark ?? "",
        latitude: pickupLocation?.latitude ?? 0,
        longitude: pickupLocation?.longitude ?? 0,
      },
      dropLocation: {
        addressLine1: dropLocation?.addressLine1 ?? "",
        latitude: dropLocation?.latitude ?? 0,
        longitude: dropLocation?.longitude ?? 0,
      },
      estimatedDistance: 10, 
      estimatedTime: 30, 
    };
    

    //     try {
    //       const response = await dispatch(createOrder(payload)).unwrap();
    //       if(response){

    //         dispatch(updatePkgId(response?.data?.id))
    //       }
    //       Alert.alert("Success", "Order confirmed!");

    //       navigation.navigate(CustomerScreens.CheckoutScreen);
    //           // Reset form (optional)
    // resetForm();
    //     } catch {
    //       console.log('Request OTP failed');
    //     }
    // Console log the object
    console.log("Send Package Order:", payload);
    navigation.navigate(CustomerScreens.CheckoutScreen);

    // Optionally, navigate to another screen or reset the form

    

  };

  const resetForm = () => {
    setPickupLocation(null);
    setDropLocation(null);
    setSenderDetails(null);
    setReceiverDetails(null);
    setPackageType(null);
    setPickupNotes("");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
      <Header isBack logo />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Send It Fast, Send It Easy</Text>
          <Text style={styles.subHeader}>Just Pack It, We'll Do the Rest</Text>
        </View>

        {/* Location Steps */}
        <View style={styles.stepsContainer}>
          {/* Step Image */}
          <Image
            source={images.locaionSteps} // Replace with your actual image path
            style={styles.stepsImage}
          />

          {/* Step Content */}
          <View style={styles.fieldsContainer}>
            {/* Pickup Location and Sender Details */}
            <View style={styles.fieldGroup}>
              <TouchableOpacity
                onPress={() => openLocationModal("pickup")}
                style={styles.fieldButton}
              >
                {pickupLocation ? (
                  <Text style={styles.locationText}>
                    {pickupLocation.addressLine1}
                  </Text>
                ) : (
                  <Text style={styles.fieldText}>Add Pick-Up Location</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.subFieldButton}
                onPress={() => openDetailsModal("sender")}
              >
                {senderDetails ? (
                  <Text style={styles.locationText}>
                    {senderDetails.name} ({senderDetails.phoneNumber})
                  </Text>
                ) : (
                  <Text style={styles.fieldText}>Add Sender's Details</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Drop Location and Receiver Details */}
            <View style={styles.fieldGroup}>
              <TouchableOpacity
                onPress={() => openLocationModal("drop")}
                style={styles.fieldButton}
              >
                {dropLocation ? (
                  <Text style={styles.locationText}>
                    {dropLocation.addressLine1}
                  </Text>
                ) : (
                  <Text style={styles.fieldText}>Add Drop-Off Location</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.subFieldButton}
                onPress={() => openDetailsModal("receiver")}
              >
                {receiverDetails ? (
                  <Text style={styles.locationText}>
                    {receiverDetails.name} ({receiverDetails.phoneNumber})
                  </Text>
                ) : (
                  <Text style={styles.fieldText}>Add Receiver's Details</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* What are you sending */}
            <TouchableOpacity style={styles.singleFieldButton} onPress={openPackageTypeModal}>
              {packageType ? (
                <Text style={styles.locationText}>{packageType}</Text>
              ) : (
                <Text style={styles.fieldText}>What are you sending?</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Pickup Notes */}
        <View style={styles.notesContainer}>
          <Text style={styles.notesLabel}>Pickup Notes (optional)</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Add any special pickup instructions (e.g., handle with care)"
            multiline
            value={pickupNotes}
            onChangeText={(text) => setPickupNotes(text)}
          />
        </View>

        {/* Confirm Button */}
        <TouchableOpacity style={styles.confirmButton} onPress={confirmOrder}>
          <Text style={styles.confirmButtonText}>Confirm Order</Text>
        </TouchableOpacity>

        {/* Location Modal */}
        <LocationModal
          isVisible={isLocationModalVisible}
          onClose={closeLocationModal}
          title={modalTitle}
          placeholder={modalPlaceholder}
          type={currentType}
        />

        {/* Sender Details Modal */}
        <SenderReceiverModal
          isVisible={isSenderModalVisible}
          onClose={(details) => closeDetailsModal("sender", details)}
          type="sender"
        />

        {/* Receiver Details Modal */}
        <SenderReceiverModal
          isVisible={isReceiverModalVisible}
          onClose={(details) => closeDetailsModal("receiver", details)}
          type="receiver"
        />

        {/* Package Type Modal */}
        <PackageTypeModal
          isVisible={isPackageTypeModalVisible}
          onClose={closePackageTypeModal}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
  const styles = StyleSheet.create({
    container: {
      padding: 16,
      flexGrow: 1,
    },
    headerContainer: {
      marginBottom: 16,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#6C2DBE", // Purple color
      textAlign: "left",
      marginBottom: 4,
    },
    subHeader: {
      fontSize: 14,
      color: "#9E9E9E", // Gray color
      textAlign: "left",
    },
    stepsContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 20,
    },
    stepsImage: {
      width: 20,
      height: "100%", // Adjust height based on your image
      marginRight: 16,
    },
    fieldsContainer: {
      flex: 1,
    },
    fieldGroup: {
      backgroundColor: "#FFFFFF",
      borderWidth: 1,
      borderColor: "#E0E0E0",
      borderRadius: 8,
      marginBottom: 12,
      overflow: "hidden",
    },
    fieldButton: {
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#E0E0E0",
    },
    subFieldButton: {
      padding: 14,
      borderBottomWidth: 1,
      borderBottomColor: "#E0E0E0",
    },
    singleFieldButton: {
      backgroundColor: "#FFFFFF",
      padding: 14,
      borderWidth: 1,
      borderColor: "#E0E0E0",
      borderRadius: 8,
      marginBottom: 12,
    },
    fieldText: {
      fontSize: 14,
      color: "#9E9E9E",
    },
    locationText: {
      fontSize: 12,
      color: "#333",
      marginTop: 4,
    },
    notesContainer: {
      marginBottom: 20,
    },
    notesLabel: {
      fontSize: 14,
      color: "#6C2DBE",
      marginBottom: 8,
    },
    notesInput: {
      backgroundColor: "#FFFFFF",
      borderWidth: 1,
      borderColor: "#E0E0E0",
      borderRadius: 8,
      padding: 12,
      minHeight: 80,
      textAlignVertical: "top",
    },
    confirmButton: {
      backgroundColor: "#6C2DBE",
      borderRadius: 8,
      paddingVertical: 16,
      alignItems: "center",
      justifyContent: "center",
      margin: 16,
    },
    confirmButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "bold",
    },
  });

  export default EnterLocationDetailsScreen;
