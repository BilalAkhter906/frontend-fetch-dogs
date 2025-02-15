import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Coordinates, LocationResponse } from "../utils/types";

export const useLocation = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getLocationsByZip = async (zipCodes: string[]): Promise<Location[]> => {
        try {
            setError("")
            setLoading(true);
            const response = await axiosInstance.post<Location[]>("/locations", zipCodes);
            return response.data;
        } catch (err) {
            console.error("Error is: ", err)
            setError("Failed to fetch locations");
            return [];
        } finally {
            setLoading(false);
        }
    };

    const searchLocations = async (filters: {
        city?: string;
        states?: string[];
        geoBoundingBox?: {
            top?: Coordinates;
            left?: Coordinates;
            bottom?: Coordinates;
            right?: Coordinates;
            bottom_left?: Coordinates;
            top_left?: Coordinates;
        };
        size?: number;
        from?: number;
    }): Promise<LocationResponse | null> => {
        try {
            setError("")
            setLoading(true);
            const response = await axiosInstance.post<LocationResponse>("/locations/search", filters);
            return response.data;
        } catch (err) {
            console.error("Error is: ", err)
            setError("Failed to search locations");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        getLocationsByZip,
        searchLocations,
    };
};