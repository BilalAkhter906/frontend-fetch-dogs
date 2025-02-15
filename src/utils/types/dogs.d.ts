export interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
}

export interface DogSearchResponse {
    resultIds: string[];
    total: number;
    next?: string;
    prev?: string;
}

export interface SearchDogs {
    breeds?: string[];
    zipCodes?: string[];
    ageMin?: number;
    ageMax?: number;
    size?: number;
    sort?: string;
}