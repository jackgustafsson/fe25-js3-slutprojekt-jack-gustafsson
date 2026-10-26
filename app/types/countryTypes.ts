export type Country = {
    names: { common: string };
    codes: { alpha_3: string };
    region: string;
    capitals: { name: string }[];
    flag: { url_svg: string };
    population: number;
    area: { kilometers: number };
};

export type RestCountriesResponse = {
    data: {
        objects: Country[];
        meta: {
            more: boolean;
        }
    }
}

export type DetailedCountry = {
    names: {
        common: string;
        official: string;
    };
    flag: { url_svg: string };
    region: string;
    capitals: {
        name: string;
        coordinates: {
            lat: number;
            lng: number;
        }
    }[];
    languages: { name: string }[];
    subregion: string;
    codes: {
        alpha_2: string;
        alpha_3: string
    };
    currencies: { name: string; }[];
    population: number;
}


export type DetailedCountryResponse = {
    data: {
        objects: DetailedCountry[];
    };
};