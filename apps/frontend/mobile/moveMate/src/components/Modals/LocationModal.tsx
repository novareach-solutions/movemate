// LocationModal.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../assets/images/images";
import Header from "../Header";
import { colors } from "../../theme/colors";
import { fetchPlaceSuggestions } from "../../api/mapboxAPI";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from "react-native-svg";

export type ILocation = {
  addressLine1: string;
  addressLine2?: string;
  suburb: string;       // Added
  postalCode: string;   // Added
  landmark?: string;
  latitude: number;
  longitude: number;
};

interface LocationModalProps {
  isVisible: boolean;
  onClose: (locationData?: ILocation) => void;
  title: string;
  placeholder: string;
  type: "pickup" | "drop"; // New prop
}

interface LocationItem {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  icon?: any; // Optional property
}

const LocationModal: React.FC<LocationModalProps> = ({
  isVisible,
  onClose,
  title,
  placeholder,
  type,
}) => {
  const [query, setQuery] = useState("");
  const insets = useSafeAreaInsets();
  const [results, setResults] = useState<LocationItem[]>([]);
  const [isMapModalVisible, setIsMapModalVisible] = useState(false);
  console.log('isMapModalVisible', isMapModalVisible);
  console.log('isVisible', isVisible)
  const [selectedLocation, setSelectedLocation] = useState<LocationItem | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isAddressDetailsVisible, setIsAddressDetailsVisible] = useState(false);
  console.log('isAddressDetailsVisible', isAddressDetailsVisible)
  const [addressDetails, setAddressDetails] = useState({
    addressLine1: "",
    addressLine2: "",
    suburb: "",        // Added
    postalCode: "",    // Added
    landmark: "",
  });

  // Example saved locations array
  const savedLocations: LocationItem[] = [
    {
      name: 'Fed Square',
      address: '120 Waldeck Street, Arlington, Texas..',
      latitude: 19.0760,
      longitude: 72.8777,
    },
    {
      name: 'Fed Square',
      address: '120 Waldeck Street, Arlington, Texas..',
      latitude: 19.0760,
      longitude: 72.8777,
    },
  ];

  const handleSearch = async (text: string) => {
    setQuery(text);
    if (text) {
      try {
        const places = await fetchPlaceSuggestions(text);
        setResults(places);
      } catch (error) {
        console.error("Error fetching place suggestions:", error);
        setResults([]);
      }
    } else {
      setResults([]);
    }
  };

  const handleSelectLocation = (location: LocationItem) => {
    setSelectedLocation(location);
    setIsMapModalVisible(true);
  };

  const onConfirmAddress = () => {
    // if (!addressDetails.addressLine1) {
    //   alert("Please fill in the required fields.");
    //   return;
    // }

    // if (!selectedLocation) {
    //   alert("No location selected.");
    //   return;
    // }

    const completeLocationData: ILocation = {
      addressLine1: addressDetails.addressLine1,
      addressLine2: addressDetails.addressLine2 || undefined,
      suburb: addressDetails.suburb,         // Included
      postalCode: addressDetails.postalCode, // Included
      landmark: addressDetails.landmark || undefined,
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    };

    onClose(completeLocationData);
    // Reset the modal state
    setQuery("");
    setResults([]);
    setSelectedLocation(null);
    setIsAddressDetailsVisible(false);
    setAddressDetails({
      addressLine1: "",
      addressLine2: "",
      suburb: "",        // Reset
      postalCode: "",    // Reset
      landmark: "",
    });
  };


  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        {/* Header */}
        <Header isBack onClickButton={() => onClose()} title={title} />

        {/* Search Bar */}
        <View style={styles.header}>
          <TextInput
            style={styles.searchBar}
            placeholder={placeholder}
            placeholderTextColor={colors.grey}
            value={query}
            onChangeText={handleSearch}
          />
        </View>

        {/* Current Location Section */}
        <View style={styles.currentLocation}>
          <Image source={images.gps} style={styles.locationIcon} />
          <View>
            <Text style={styles.currentLocationText}>Current Location</Text>
            <Text style={styles.gpsText}>Using GPS</Text>
          </View>
        </View>

        {/* Saved Locations or Search Results */}
        <FlatList
          data={query ? results : savedLocations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => handleSelectLocation(item)}
            >
              <Image
                source={item.icon || images.locationBorder}
                style={styles.resultIcon}
              />
              <View style={styles.resultContent}>
                <Text style={styles.resultName}>{item.name}</Text>
                <Text style={styles.resultAddress}>{item.address}</Text>
              </View>
              {!query && (
                <TouchableOpacity>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            query ? <Text style={styles.noResults}>No results found...</Text> : null
          }
        />

        {/* Confirm Button */}
        <View style={styles.footer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => {
            if (selectedLocation) {
              // If a location is already selected, confirm it
              setIsMapModalVisible(false);
              setIsAddressDetailsVisible(true);
            } else {
              onClose();
            }
          }}
        >
          <Text style={styles.confirmButtonText}>Confirm Location</Text>
        </TouchableOpacity>
        </View>

        {/* Map Modal for location confirm */}
        {selectedLocation && (
          <Modal
            visible={isMapModalVisible}
            transparent
            animationType="slide"
            onRequestClose={() => setIsMapModalVisible(false)}
          >
            <View style={[styles.mapModalContainer, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
              <Header
                isBack
                onClickButton={() => setIsMapModalVisible(false)}
                title="Add Location"
              />
              <View style={styles.mapContainer}>
                <Image
                  source={images.map} // Replace with your map image
                  style={styles.mapImage}
                />
                <View style={styles.addressContainer}>
                  {/* Address Section */}
                  <View style={styles.addressRow}>
                    <Svg width={20} height={20} viewBox="0 0 24 24" fill="purple">
                      <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                    </Svg>
                    <Text style={styles.addressTitle}>18-8-224/5</Text>
                    <TouchableOpacity>
                      <Text style={styles.editText1}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.addressSubtitle}>
                    Plenty Rd, Bundoora VIC 30, Melbourne
                  </Text>

                  <View style={styles.addLocContainer}>
                  {/* Confirm Button */}
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      setIsMapModalVisible(false);
                      setIsAddressDetailsVisible(true); // Navigate to address details
                    }}
                  >
                    <Text style={styles.confirmButtonText}>Confirm</Text>
                  </TouchableOpacity></View>
                </View>
                {/* <View style={styles.addressContainer}>
                  <View>
                  <Text style={styles.addressDetails}>
                    {selectedLocation.address}
                  </Text>
                  <TouchableOpacity>
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                  </View>
                 
                </View>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={() => {
                    setIsMapModalVisible(false);
                    setIsAddressDetailsVisible(true); // Navigate to address details
                  }}
                >
                  <Text style={styles.confirmButtonText}>Confirm</Text>
                </TouchableOpacity> */}
              </View>
            </View>
          </Modal>
        )}

        {/* Address Details Modal */}
        {isAddressDetailsVisible && (
          <Modal
            visible={isAddressDetailsVisible}
            transparent={false}
            animationType="slide"
            onRequestClose={() => setIsAddressDetailsVisible(false)}
          >
            <View style={[styles.addressDetailsContainer, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
              <KeyboardAvoidingView 
                      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
                      style={{flex:1}}
                    >
              <Header
                isBack
                onClickButton={() => setIsAddressDetailsVisible(false)}
                title="Add Address Details"
              />

              <ScrollView contentContainerStyle={styles.addressForm}>
                <Image source={images.map} style={styles.detailAddressMapImage} />
                <View style={styles.addessInMap}>
                  <View style={styles.addressRow}>
                    <Svg width={20} height={20} viewBox="0 0 24 24" fill="purple">
                      <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                    </Svg>
                    <Text style={styles.addressTitle}>18-8-224/5</Text>
                    <TouchableOpacity>
                      <Text style={styles.editText1}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.addressSubtitle}>
                    Plenty Rd, Bundoora VIC 30, Melbourne
                  </Text></View>
                <Text style={styles.label}>Street Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Street Address"
                  value={addressDetails.addressLine1}
                  placeholderTextColor={colors.grey}
                  onChangeText={(text) =>
                    setAddressDetails({
                      ...addressDetails,
                      addressLine1: text,
                    })
                  }
                />

                <Text style={styles.label}>Address Line 2<Text style={styles.optional}>(optional)</Text></Text>
                <TextInput
                  style={styles.input}
                  placeholder="Address Line 2 (Optional)"
                  value={addressDetails.addressLine2}
                  placeholderTextColor={colors.grey}
                  onChangeText={(text) =>
                    setAddressDetails({
                      ...addressDetails,
                      addressLine2: text,
                    })
                  }
                />

                <Text style={styles.label}>Suburb</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Suburb"
                  value={addressDetails.suburb}
                  placeholderTextColor={colors.grey}
                  onChangeText={(text) =>
                    setAddressDetails({
                      ...addressDetails,
                      suburb: text,
                    })
                  }
                />
                <Text style={styles.label}>Postal Code</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Postal Code"
                  keyboardType="numeric"
                  placeholderTextColor={colors.grey}
                  value={addressDetails.postalCode}
                  onChangeText={(text) =>
                    setAddressDetails({
                      ...addressDetails,
                      postalCode: text,
                    })
                  }
                />
                <Text style={styles.label}>
                  Landmark <Text style={styles.optional}>(optional)</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Landmark (Optional)"
                  placeholderTextColor={colors.grey}
                  value={addressDetails.landmark}
                  onChangeText={(text) =>
                    setAddressDetails({
                      ...addressDetails,
                      landmark: text,
                    })
                  }
                />

                {/* Save Address Checkbox */}
                <View style={styles.checkboxRow}>
                  <CheckBox
                    value={isSaved}
                    onValueChange={setIsSaved}
                    tintColors={{ true: "#6200EE", false: "#8A8A8A" }} // Purple when checked, gray when unchecked
                    boxType="square" // Ensures it's a square checkbox (iOS only)
                    style={styles.checkbox}
                  />
                  <Text style={styles.checkboxText}>Add to saved addresses</Text>
                </View>
                {/* Address Tags */}
                <View style={styles.tagsContainer}>
                  {["Home", "Work", "Other"].map((tag) => (
                    <TouchableOpacity
                      key={tag}
                      style={[
                        styles.tag,
                        selectedTag === tag && styles.selectedTag,
                      ]}
                      onPress={() => setSelectedTag(tag)}
                    >
                      <Text
                        style={[
                          styles.tagText,
                          selectedTag === tag && styles.selectedTagText,
                        ]}
                      >
                        {tag}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={styles.cnfAddress}>
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={onConfirmAddress}
                  >
                    <Text style={styles.confirmButtonText}>Confirm Address</Text>
                  </TouchableOpacity></View>
              </ScrollView>
              </KeyboardAvoidingView>
            </View>
          </Modal>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  searchBar: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#F8F8F8",
  },
  currentLocation: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  locationIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  currentLocationText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.purple,
  },
  gpsText: {
    fontSize: 14,
    color: "#9E9E9E",
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.lightButtonBackground,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 12,
  },
  resultIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  resultContent: {
    flex: 1,
  },
  resultName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  resultAddress: {
    fontSize: 14,
    color: "#666",
  },
  noResults: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
    color: "#999",
  },
  editText: {
    color: colors.purple,
    fontSize: 14,
  },
  confirmButton: {
    backgroundColor: colors.purple,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    // margin: 16,
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  mapModalContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  mapContainer: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "70%",
    // marginBottom: 20,
  },
  detailAddressMapImage: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderRadius: 12,
    elevation: 6,
    borderColor: colors.grey,
    borderWidth: 0.25
    // height: "50%",
    // marginBottom: 20,
  },
  addressContainer: {
    padding: 16,
    // borderWidth:2,
    // borderColor:'red',
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

    // position: "absolute",
    bottom: 10,
    width: "100%",
    alignSelf: "center",
    elevation: 10,
  },
  addressDetails: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  editButtonText: {
    color: colors.purple,
    fontSize: 14,
    fontWeight: "bold",
  },
  addressDetailsContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  addressForm: {
    padding: 16,
  },
  addessInMap: {
    position: 'absolute',
    flex: 1,
    top: 100,
    left: 35,
    backgroundColor: colors.white,
    padding: 10,
    borderWidth: 0.25,
    borderColor: colors.grey,
    width: '90%',
    borderRadius: 12
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#F8F8F8",
  },
  addressRow: {
    paddingTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addressTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
    flex: 1,
  },
  editText1: {
    color: "purple",
    fontWeight: "bold",
  },
  addressSubtitle: {
    fontSize: 14,
    color: "gray",
    marginTop: 8,
  },
  // confirmButton1: {
  //   backgroundColor: "purple",
  //   // paddingVertical: 14,
  //   borderRadius: 10,
  //   alignItems: "center",
  //   marginTop: 20,
  // },
  confirmText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    padding:10,
    backgroundColor: colors.white,
    justifyContent: 'flex-end',
},
cnfAddress: {
    paddingVertical:20,
    backgroundColor: colors.white,
    justifyContent: 'flex-end',
},
addLocContainer: {
  marginTop:20,
    paddingVertical:10,
    backgroundColor: colors.white,
    justifyContent: 'flex-end',
},
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 5,
  },
  optional: {
    color: colors.grey,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
  },
  checkboxText: {
    fontSize: 14,
    marginLeft: 8,
  },
  tagsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tag: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 10,
    marginRight: 10,
  },
  selectedTag: {
    backgroundColor: colors.purple,
  },
  tagText: {
    color: "black",
  },
  selectedTagText: {
    color: "white",
  },
});

export default LocationModal;

