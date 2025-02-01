// LocationModal.tsx

import React, { useState } from "react";
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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../assets/images/images";
import Header from "../Header";
import { colors } from "../../theme/colors";
import { fetchPlaceSuggestions } from "../../api/mapboxAPI";

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
  const [results, setResults] = useState<LocationItem[]>([]);
  const [isMapModalVisible, setIsMapModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationItem | null>(null);
  const [isAddressDetailsVisible, setIsAddressDetailsVisible] = useState(false);
  const [addressDetails, setAddressDetails] = useState({
    addressLine1: "",
    addressLine2: "",
    suburb: "",        // Added
    postalCode: "",    // Added
    landmark: "",
  });

  // Example saved locations array
  const savedLocations: LocationItem[] = [
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
    if (!addressDetails.addressLine1) {
      alert("Please fill in the required fields.");
      return;
    }

    if (!selectedLocation) {
      alert("No location selected.");
      return;
    }

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
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <Header isBack onPress={() => onClose()} title={title} />

        {/* Search Bar */}
        <View style={styles.header}>
          <TextInput
            style={styles.searchBar}
            placeholder={placeholder}
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

        {/* Map Modal */}
        {selectedLocation && (
          <Modal
            visible={isMapModalVisible}
            transparent
            animationType="slide"
            onRequestClose={() => setIsMapModalVisible(false)}
          >
            <SafeAreaView style={styles.mapModalContainer}>
              <Header
                isBack
                onPress={() => setIsMapModalVisible(false)}
                title="Add Location"
              />
              <View style={styles.mapContainer}>
                <Image
                  source={images.map} // Replace with your map image
                  style={styles.mapImage}
                />
                <View style={styles.addressContainer}>
                  <Text style={styles.addressDetails}>
                    {selectedLocation.address}
                  </Text>
                  <TouchableOpacity>
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={() => {
                    setIsMapModalVisible(false);
                    setIsAddressDetailsVisible(true); // Navigate to address details
                  }}
                >
                  <Text style={styles.confirmButtonText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
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
            <SafeAreaView style={styles.addressDetailsContainer}>
              <Header
                isBack
                onPress={() => setIsAddressDetailsVisible(false)}
                title="Add Address Details"
              />

              <ScrollView contentContainerStyle={styles.addressForm}>
                <Image source={images.map} style={styles.mapImage} />

                <TextInput
                  style={styles.input}
                  placeholder="Street Address"
                  value={addressDetails.addressLine1}
                  onChangeText={(text) =>
                    setAddressDetails({
                      ...addressDetails,
                      addressLine1: text,
                    })
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="Address Line 2 (Optional)"
                  value={addressDetails.addressLine2}
                  onChangeText={(text) =>
                    setAddressDetails({
                      ...addressDetails,
                      addressLine2: text,
                    })
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="Suburb"
                  value={addressDetails.suburb}
                  onChangeText={(text) =>
                    setAddressDetails({
                      ...addressDetails,
                      suburb: text,
                    })
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="Postal Code"
                  keyboardType="numeric"
                  value={addressDetails.postalCode}
                  onChangeText={(text) =>
                    setAddressDetails({
                      ...addressDetails,
                      postalCode: text,
                    })
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="Landmark (Optional)"
                  value={addressDetails.landmark}
                  onChangeText={(text) =>
                    setAddressDetails({
                      ...addressDetails,
                      landmark: text,
                    })
                  }
                />

                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={onConfirmAddress}
                >
                  <Text style={styles.confirmButtonText}>Confirm Address</Text>
                </TouchableOpacity>
              </ScrollView>
            </SafeAreaView>
          </Modal>
        )}
      </SafeAreaView>
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
    margin: 16,
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
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "60%",
    marginBottom: 20,
  },
  addressContainer: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 100,
    width: "90%",
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
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#F8F8F8",
  },
});

export default LocationModal;
