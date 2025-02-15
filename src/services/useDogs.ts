import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Dog, DogSearchResponse } from "../utils/types";

export const useDogs = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getBreeds = async (): Promise<string[]> => {
        try {
            setError("")
            setLoading(true);
            const response = await axiosInstance.get<string[]>("/dogs/breeds");
            return response.data;
        } catch (err) {
            console.error("Error is: ", err)
            setError("Failed to fetch breeds");
            return [];
        } finally {
            setLoading(false);
        }
    };

    const searchDogs = async (filters: {
        breeds?: string[];
        zipCodes?: string[];
        ageMin?: number;
        ageMax?: number;
        size?: number;
        from?: number;
        sort?: string;
    }): Promise<DogSearchResponse | null> => {
        try {
            setError("")
            setLoading(true);
            const response = await axiosInstance.get<DogSearchResponse>("/dogs/search", {
                params: filters,
            });
            return response.data;
        } catch (err) {
            console.error("Error is: ", err)
            setError("Failed to search dogs");
            return null;
        } finally {
            setLoading(false);
        }
    };

    const getDogsByIds = async (dogIds: string[]): Promise<Dog[]> => {
        try {
            setError("")
            setLoading(true);
            const response = await axiosInstance.post<Dog[]>("/dogs", dogIds);
            return response.data;
        } catch (err) {
            console.error("Error is: ", err)
            setError("Failed to fetch dog details");
            return [];
        } finally {
            setLoading(false);
        }
    };

    const matchDog = async (dogIds: string[]): Promise<string | null> => {
        try {
            setError("")
            setLoading(true);
            const response = await axiosInstance.post<{ match: string }>("/dogs/match", dogIds);
            return response.data.match;
        } catch (err) {
            console.error("Error is: ", err)
            setError("Failed to match dog");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        getBreeds,
        searchDogs,
        getDogsByIds,
        matchDog,
    };
};