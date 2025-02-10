import axios from "axios";
import { Platform } from "react-native";
import MapboxGL from '@rnmapbox/maps';
const MAPBOX_API_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoidmFtb29zZSIsImEiOiJjbTVpc2V4d2cwcHNrMmpzZDJ3OHFveXRvIn0.4mZXHphedikVf0ctP0bsEw"; 

MapboxGL.setWellKnownTileServer(Platform.OS === 'ios' ? 'mapbox' : 'Mapbox');
MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);

const MAPBOXURL = 'https://api.mapbox.com'; //baseurl

export const mapSuggestions = (longitude:number, latitude:number, responseCallback:(r:any)=>void) => {
  const url = `${MAPBOXURL}/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_ACCESS_TOKEN}`;
  axios
    .get(url, {
      // access_token: tokenmapbox,
    })
    .then(r => {
      responseCallback(r.data.features?.[0]);
    })
    .catch(e => console.log('--------e', e));
};

export const fetchPlaceSuggestions = async (query: string) => {
  try {
    const response = await axios.get(
      `${MAPBOX_API_URL}${encodeURIComponent(query)}.json`,{
        params: {
          access_token: MAPBOX_ACCESS_TOKEN,
          limit: 5,
          country: 'in,au',
        },
      }
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
