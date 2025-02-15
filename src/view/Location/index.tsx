import { useState } from "react";
import { useLocation } from "../../services/useLocation";
import { Location, SearchLocation } from "../../utils/types";

export const Locations = () => {
    const { getLocationsByZip, searchLocations, loading, error } = useLocation();
    const [zipCodes, setZipCodes] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [locations, setLocations] = useState<Location[]>([]);

    const fetchLocationsByZip = async () => {
        if (!zipCodes.trim()) return;
        const zipList = zipCodes.split(",").map(zip => zip.trim());
        const results = await getLocationsByZip(zipList);
        setLocations(results || []);
    };

    const handleSearch = async () => {
        const filters: SearchLocation = {
            city: city || undefined,
            states: state ? [state] : undefined,
            size: 10,
        };
        const results = await searchLocations(filters);
        setLocations(results?.results || []);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">📍 Location Search</h1>

            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Enter ZIP Codes (comma-separated):</label>
                <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. 10001, 20002"
                    value={zipCodes}
                    onChange={(e) => setZipCodes(e.target.value)}
                />
                <button
                    onClick={fetchLocationsByZip}
                    disabled={loading}
                    className="w-full mt-2 bg-black text-white p-2 rounded-md hover:bg-gray-700 transition"
                >
                    {loading ? "Fetching..." : "🔍 Get Locations"}
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">City:</label>
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter city name"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">State (2-letter):</label>
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. NY, CA"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </div>
            </div>
            <button
                onClick={handleSearch}
                disabled={loading}
                className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-700 transition"
            >
                {loading ? "Searching..." : "🔍 Search Locations"}
            </button>

            {locations.length > 0 ? (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-800">Matching Locations:</h2>
                    <ul className="grid grid-cols-1 gap-4 mt-3">
                        {locations.map((loc) => (
                            <li key={loc.zip_code} className="p-4 bg-gray-100 rounded-md">
                                <p><strong>{loc.city}, {loc.state}</strong> ({loc.zip_code})</p>
                                <p className="text-sm text-gray-600">County: {loc.county}</p>
                                <p className="text-sm text-gray-600">Latitude: {loc.latitude}, Longitude: {loc.longitude}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="text-gray-500 mt-4 text-center">No locations found.</p>
            )}

            {error && <p className="text-red-600 mt-4">{error}</p>}
        </div>
    );
};