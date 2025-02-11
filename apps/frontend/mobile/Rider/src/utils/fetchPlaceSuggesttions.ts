import axios from "axios";
import { MAPBOX_ACCESS_TOKEN, MAPBOX_API_URL } from "./constants";

export const fetchPlaceSuggestions = async (query: string) => {
    try {
        const response = await axios.get(
            `${MAPBOX_API_URL}${encodeURIComponent(query)}.json?country=AU&types=address&access_token=${MAPBOX_ACCESS_TOKEN}`
        );

        console.log("Response", response.data.features.map((place: any) => ({
            name: place.text,
            address: place.place_name,
            latitude: place.center[1],
            longitude: place.center[0],
            suburb: place.context?.find((c: any) => c.id.includes("place"))?.text || "",
            state: place.context?.find((c: any) => c.id.includes("region"))?.text || "",
            postalCode: place.context?.find((c: any) => c.id.includes("postcode"))?.text || "",
        })))

        return response.data.features.map((place: any) => ({
            name: place.text,
            address: place.place_name,
            latitude: place.center[1],
            longitude: place.center[0],
            suburb: place.context?.find((c: any) => c.id.includes("place"))?.text || "",
            state: place.context?.find((c: any) => c.id.includes("region"))?.text || "",
            postalCode: place.context?.find((c: any) => c.id.includes("postcode"))?.text || "",
        }));
    } catch (error) {
        console.error("Error fetching place suggestions:", error);
        return [];
    }
};
