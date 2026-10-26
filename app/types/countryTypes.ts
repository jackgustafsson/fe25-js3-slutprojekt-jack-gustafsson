export type Country = {
    name: string;
    alpha3Code: string;
    region: string;
    capital: string;
    flags: {
        png: string;
        svg: string;
    };
    population: number;
    area: number;
};

export type DetailedCountry = {
    name: string;
    flags: {
        png: string;
        svg: string;
    };
    region: string;
    capital: string;
    languages: {
        name: string;
        nativeName: string;
    }[];
    subregion: string;
    alpha2Code: string;
    alpha3Code: string;
    currencies: {
        code: string;
        name: string;
        symbol: string;
    }[];
    nativeName: string;
    population: number;
}
