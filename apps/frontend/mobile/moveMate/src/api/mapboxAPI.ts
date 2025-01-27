import axios from "axios";

const MAPBOX_API_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoidmFtb29zZSIsImEiOiJjbTVpc2V4d2cwcHNrMmpzZDJ3OHFveXRvIn0.4mZXHphedikVf0ctP0bsEw"; 

export const fetchPlaceSuggestions = async (query: string) => {
  try {
    const response = await axios.get(
      `${MAPBOX_API_URL}${encodeURIComponent(query)}.json?access_token=${MAPBOX_ACCESS_TOKEN}`
    );
    return response.data.features.map((place: any) => ({
      name: place.text,
      address: place.place_name,
      latitude: place.center[1],
      longitude: place.center[0],
    }));
  } catch (error) {
    console.error("Error fetching place suggestions:", error);
    return [];
  }
};
