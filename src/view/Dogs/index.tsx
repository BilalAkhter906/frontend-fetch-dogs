import { useEffect, useState } from "react";
import { useDogs } from "../../services/useDogs";
import { useAuth } from "../../services/useUser";
import { APP_Routes } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { Dog, SearchDogs } from "../../utils/types";

export const Dogs = () => {
    const { getBreeds, searchDogs, getDogsByIds, matchDog, loading, error } = useDogs();
    const { handleLogout, loading: authLoading } = useAuth();
    const [breeds, setBreeds] = useState<string[]>([]);
    const [selectedBreed, setSelectedBreed] = useState<string>("");
    const [zipCode, setZipCode] = useState<string>("");
    const [ageMin, setAgeMin] = useState<number | "">("");
    const [numberOfDogs, setNumberOfDogs] = useState<string>("");
    const [ageMax, setAgeMax] = useState<number | "">("");
    const [sortField, setSortField] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<string>("");
    const [selectedDogs, setSelectedDogs] = useState<Dog[]>([]);
    const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBreeds();
    }, []);

    const fetchBreeds = async () => {
        const data = await getBreeds();
        setBreeds(data);
    };

    const onLogout = async () => {
        const success = await handleLogout();
        if (success) {
            navigate(APP_Routes.Login);
        }
    };

    const handleSearch = async () => {
        if (!selectedBreed && !zipCode && ageMin === "" && ageMax === "" && sortField === "" && sortOrder === "") return;

        const filters: SearchDogs = {
            breeds: selectedBreed ? [selectedBreed] : undefined,
            zipCodes: zipCode ? [zipCode] : undefined,
            ageMin: ageMin !== "" ? ageMin : undefined,
            ageMax: ageMax !== "" ? ageMax : undefined,
            size: numberOfDogs !== "" ? Number(numberOfDogs) : undefined,
            sort: sortField && sortOrder ? `${sortField}:${sortOrder}` : undefined,
        };

        const results = await searchDogs(filters);
        if (results?.resultIds.length) {
            const details = await getDogsByIds(results.resultIds);
            setSelectedDogs(details);
        }
    };

    const handleMatch = async () => {
        if (selectedDogs.length === 0) return;
        const dogIds = selectedDogs.map(dog => dog.id);
        const matchedDogId = await matchDog(dogIds);

        if (matchedDogId) {
            const matchedDogDetails = selectedDogs.find(dog => dog.id === matchedDogId);
            setMatchedDog(matchedDogDetails || null);
        }
    };
    return (
        <div className="w-full mx-auto p-6 rounded-lg">
            <div className="mb-3 flex items-center justify-end">
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate(APP_Routes.Location)}
                        className="w-fit rounded-md bg-black px-3 py-3 text-white focus:bg-gray-600 focus:outline-none cursor-pointer"
                    >
                        Location
                    </button>
                    <button
                        onClick={onLogout}
                        disabled={authLoading}
                        className="w-fit whitespace-nowrap bg-red-500 text-white rounded-md px-3 py-3 hover:bg-red-600 transition"
                    >
                        {loading ? "Logging out..." : "Logout"}
                    </button>
                </div>
            </div>

            <div className="mb-6">
                <h1 className="w-full text-3xl font-bold text-center text-gray-800">🐶 Dog Adoption Portal</h1>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Select Breed:</label>
                    <select
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedBreed}
                        onChange={(e) => setSelectedBreed(e.target.value)}
                    >
                        <option value="">-- Select a Breed --</option>
                        {breeds.map((breed) => (
                            <option key={breed} value={breed}>
                                {breed}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Enter Zip Code:</label>
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Zip Code"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Min Age:</label>
                    <input
                        type="number"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Min Age"
                        value={ageMin}
                        onChange={(e) => setAgeMin(e.target.value ? Number(e.target.value) : "")}
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Max Age:</label>
                    <input
                        type="number"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Max Age"
                        value={ageMax}
                        onChange={(e) => setAgeMax(e.target.value ? Number(e.target.value) : "")}
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Sort By:</label>
                    <select
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={sortField}
                        onChange={(e) => setSortField(e.target.value)}
                    >
                        <option value="">-- Select Field --</option>
                        <option value="breed">Breed</option>
                        <option value="name">Name</option>
                        <option value="age">Age</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Order:</label>
                    <select
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="">-- Select Order --</option>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Number of Dogs:</label>
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Number of Dogs"
                        value={numberOfDogs}
                        onChange={(e) => setNumberOfDogs(e.target.value)}
                    />
                </div>
                <div className="">
                    <button
                        onClick={handleSearch}
                        disabled={loading}
                        className="w-full mt-8 rounded-md bg-black px-3 py-3 text-white focus:bg-gray-600 focus:outline-none cursor-pointer"
                    >
                        {loading ? "Searching..." : "🔍 Search Dogs"}
                    </button>
                </div>
            </div>


            {selectedDogs.length > 0 && <button
                onClick={handleMatch}
                disabled={loading}
                className="w-full bg-red-500 text-white py-3 rounded-md mt-4 hover:bg-red-600 transition"
            >
                {loading ? "Matching..." : "❤️ Find Your Match"}
            </button>}

            {matchedDog && (
                <p className="text-green-700 font-bold text-center mt-4 text-lg">
                    🎉 You have been matched with: <span className="text-blue-600">{matchedDog.name} ({matchedDog.breed})</span>!
                </p>
            )}

            {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

            {selectedDogs.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-800">Dog Details:</h2>
                    <div className="grid grid-cols-3 gap-4 mt-3">
                        {selectedDogs.map((dog) => (
                            <article key={dog.id} className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm w-full mx-auto">
                                <img src={dog.img} alt={dog.name} className="absolute inset-0 h-full w-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                                <h3 className="z-10 mt-3 text-3xl font-bold text-white">{dog.name}</h3>
                                <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                                    <p className="text-sm text-white">({dog.breed})</p>
                                    <p className="text-sm text-white">Age: {dog.age}</p>
                                </div>
                            </article>

                        ))}
                    </div>

                </div>
            )}
        </div>
    );
};