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
// import { fetchPlaceSuggestions } from "../../api/mapboxAPI";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from "react-native-svg";
import Mapbox from '@rnmapbox/maps';
import { getCurrentLocation, requestLocation } from "../../utils/helpers";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { updateDropLoaction, updatePickupLoaction } from "../../redux/slices/deliverAPackageSlice";
import { fetchPlaceSuggestions } from "../../utils/fetchPlaceSuggestions";
import { MAPBOX_ACCESS_TOKEN } from "../../constants";

Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

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
  const locationStatus = useAppSelector(state => state.common.locationStatus);
  const [query, setQuery] = useState("");
  const insets = useSafeAreaInsets();
  const [results, setResults] = useState<LocationItem[]>([]);
  const [isMapModalVisible, setIsMapModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationItem | null>(null);

  const [isSaved, setIsSaved] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isAddressDetailsVisible, setIsAddressDetailsVisible] = useState(false);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [addressDetails, setAddressDetails] = useState({
    addressLine1: "",
    addressLine2: "",
    suburb: "",        // Added
    postalCode: "",    // Added
    landmark: "",
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {

      requestLocationpermission();
    }, 1000);
  }, [])

  const responseCallback = (placenameData: any) => {
    let getPlacename = placenameData?.data?.features[0]?.place_name;
    console.log('placenameData', placenameData)
  };



  const requestLocationpermission = () => {
    // if (locationStatus) {
    //   getCurrentLocation(callback);
    // } else {
    getLocationPermission();
    // }
  };

  const getLocationPermission = async () => {
    const isAllowed = await requestLocation();
    if (isAllowed) {
      await getCurrentLocation(callback);
    }
  };

  const callback = async (data: any) => {
    console.log('-----callback------', data);
    if (data?.coords) {
      const latitude = await data?.coords?.latitude;
      const longitude = await data?.coords?.longitude;
      const altitude = await data?.coords?.altitude;
      const horizontal_accuracy = await data?.coords?.accuracy;
      const vertical_accuracy = await data?.coords?.altitudeAccuracy;
      const heading = await data?.coords?.heading;
      const timestamp = await data?.timestamp;
      if (latitude && longitude) {
        const isAllowed = await requestLocation();

      }
    }
  };

  // Example saved locations array
  const savedLocations: LocationItem[] = [
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
    setCoordinates([location.longitude, location.latitude]);
    setIsMapModalVisible(true);
  };

  const onConfirmAddress = () => {

    const completeLocationData: ILocation = {
      addressLine1: addressDetails.addressLine1,
      addressLine2: addressDetails.addressLine2 || undefined,
      suburb: addressDetails.suburb,         // Included
      postalCode: addressDetails.postalCode, // Included
      landmark: addressDetails.landmark || undefined,
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    };
    if (type === 'pickup') {
      console.log('pickup')
      dispatch(updatePickupLoaction(selectedLocation));
    } else {
      dispatch(updateDropLoaction(selectedLocation));
    }
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
              {/* <Image
                source={item.icon || images.locationBorder}
                style={styles.resultIcon}
              /> */}
              <images.Marker style={styles.resultIcon} />
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
            <View style={[styles.mapModalContainer, { paddingTop: insets.top }]}>
              <Header
                isBack
                onClickButton={() => setIsMapModalVisible(false)}
                title="Add Location"
              />
              <View style={styles.mapContainer}>
                <View>
                  <Mapbox.MapView style={styles.mapImage} styleURL="mapbox://styles/mapbox/light-v11">
                    <Mapbox.Camera zoomLevel={14} centerCoordinate={coordinates || [0, 0]} />

                    {coordinates && (
                      <Mapbox.PointAnnotation id={`marker-${coordinates[0]}-${coordinates[1]}`} coordinate={coordinates}>
                        <View style={styles.markerContainer}>
                          <View style={styles.marker} />
                        </View>
                      </Mapbox.PointAnnotation>
                    )}
                  </Mapbox.MapView>

                </View>
                <View style={styles.addressContainer}>
                  {/* Address Section */}
                  <View style={styles.addressRow}>
                    <Svg width={20} height={20} viewBox="0 0 24 24" fill="purple">
                      <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                    </Svg>
                    <Text style={styles.addressTitle}>{selectedLocation?.name}</Text>
                    <TouchableOpacity>
                      <Text style={styles.editText1}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.addressSubtitle}>
                    {selectedLocation?.address}
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
                style={{ flex: 1 }}
              >
                <Header
                  isBack
                  bgColor={colors.lightGrey}
                  onClickButton={() => setIsAddressDetailsVisible(false)}
                  title="Add Address Details"
                />

                <ScrollView contentContainerStyle={styles.addressForm}>
                  <View style={styles.addMapContainer}>
                    <Mapbox.MapView style={styles.detailAddressMapImage} styleURL="mapbox://styles/mapbox/light-v11">
                      <Mapbox.Camera zoomLevel={14} centerCoordinate={coordinates || [0, 0]} />

                      {coordinates && (
                        <Mapbox.PointAnnotation id={`marker-${coordinates[0]}-${coordinates[1]}`} coordinate={coordinates}>
                          <View style={styles.markerContainer}>
                            <View style={styles.marker} />
                          </View>
                        </Mapbox.PointAnnotation>
                      )}
                    </Mapbox.MapView>

                  </View>
                  <View style={styles.addessInMap}>
                    <View style={styles.addressRow}>
                      <Svg width={20} height={20} viewBox="0 0 24 24" fill="purple">
                        <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                      </Svg>
                      <Text style={styles.addressTitle}>{selectedLocation?.name}</Text>
                      <TouchableOpacity>
                        <Text style={styles.editText1}>Edit</Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.addressSubtitle}>
                      {selectedLocation?.address}
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
                      tintColors={{ true: "#6200EE", false: "#8A8A8A" }} 
                      boxType="square"
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
    // borderBottomWidth: 1,
    // borderBottomColor: "#E0E0E0",
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
    marginHorizontal: 16,
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
    backgroundColor: colors.lightGrey,
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

  },
  markerContainer: { alignItems: "center", justifyContent: "center" },
  marker: { width: 20, height: 20, borderRadius: 10, backgroundColor: colors.white, borderWidth: 5, borderColor: colors.purple },
  mapImage: {
    width: "100%",
    height: 550,
    // marginBottom: 20,
  },
  addMapContainer:{
    borderRadius:12
  },
  detailAddressMapImage: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderRadius: 20,
    elevation: 6,
    borderColor: colors.grey,
    borderWidth: 0.25
  },
  addressContainer: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    bottom: 20,
    width: "100%",
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
    backgroundColor: "#F8F8F8",
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
    borderColor: "#D4D4D4",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#FDFDFD",
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
  confirmText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    padding: 10,
    backgroundColor: colors.white,
    justifyContent: 'flex-end',
  },
  cnfAddress: {
    paddingVertical: 20,
    backgroundColor: colors.lightGrey,
    justifyContent: 'flex-end',
  },
  addLocContainer: {
    marginTop: 20,
    paddingVertical: 10,
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
    marginVertical: 20,
  },
  tag: {
    padding: 10,
    backgroundColor: "#EAEAEA",
    borderWidth:1,
    borderColor:'#D3D3D3',
    borderRadius: 12,
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

