export interface Coordinates {
    lat: number;
    lon: number;
}

export interface Location {
    zip_code: string;
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    county: string;
}

export interface LocationResponse {
    results: Location[];
    total: number;
}

export interface SearchLocation {
    city?: string;
    states?: string[];
    size?: number;
}